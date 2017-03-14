import http from 'http'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import hpp from 'hpp'
import throng from 'throng'
import mongoose from 'mongoose'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import GraphqlSchema from './examples/northwind/graphqlSchema'
import createApolloClient from '../common/createApolloClient'
// import getNetworkInterface from './transport'
import { createBatchingNetworkInterface } from 'apollo-client'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { trigger } from 'redial'
import Helm from 'react-helmet' // because we are already using helmet
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import DefaultServerConfig from './config'
import webpackConfig from '../tools/webpack.client.dev'
import { compileDev, startDev } from '../tools/dx'
import { configureStore } from '../common/store'
import createRoutes from '../common/routes/root'
import createInitialState from './createInitialState'
import { Provider as Fela } from 'react-fela'
import configureFela from '../common/configureFela'

mongoose.Promise = Promise

export const createServer = (config) => {
  const __PROD__ = config.nodeEnv === 'production'
  const __TEST__ = config.nodeEnv === 'test'

  const API_HOST = `http://${config.host}:${config.port}`

  const app = express()
  let assets = null
  app.disable('x-powered-by')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  if (__PROD__ || __TEST__) {
    app.use(morgan('combined'))
    app.use(helmet())
    app.use(hpp())
    app.use(compression())
    if (__PROD__) {
      assets = require('../assets.json')
    }
  } else {
    app.use(morgan('dev'))
    const compiler = compileDev((webpack(webpackConfig)), config.port)
    app.use(webpackDevMiddleware(compiler, {
      quiet: true,
      watchOptions: {
        ignored: /node_modules/
      }
    }))
    app.use(webpackHotMiddleware(compiler, { log: console.log }))
  }

  app.use(express.static('public'))
  app.use('/api/v0/posts', require('./api/posts'))
  app.use('/graphql', graphqlExpress((req) => {
    // Get the query, the same way express-graphql does it
    // https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
    const query = req.query.query || req.body.query
    if (query && query.length > 2000) {
      // None of our app's queries are this long
      // Probably indicates someone trying to send an overly expensive query
      throw new Error('Query too large.')
    }
    return {
      schema: GraphqlSchema
    }
  }))
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
  // createInitialState loads files, so it must be called once.
  const initialState = createInitialState()
  app.get('*', (req, res) => {
    /*
    const apolloClient = createApolloClient({
      ssrMode: true,
      networkInterface: getNetworkInterface(API_HOST, { cookie: req.header('Cookie') })
    })
    */
    const apolloClient = createApolloClient({
      ssrMode: true,
      queryDeduplication: true,
      networkInterface: createBatchingNetworkInterface({
        uri: `${API_HOST}/graphql`,
        opts: {
          credentials: 'same-origin',
          // transfer request headers to networkInterface so that they're
          // accessible to proxy server
          // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
          headers: req.headers
        },
        batchInterval: 20
      })
    })
    const store = configureStore({
      initialState: {
        ...initialState,
        device: {
          ...initialState.device,
          protocol: req.headers['x-forwarded-proto'] || req.protocol,
          host: req.headers.host
        }
      },
      platformReducers: { apollo: apolloClient.reducer() },
      platformMiddleware: [ apolloClient.middleware() ]
    })
    const routes = createRoutes(store)
    const history = createMemoryHistory(req.originalUrl)
    const { dispatch } = store

    match({routes, history}, (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Internal server error')
      }

      if (!renderProps) {
        return res.status(404).send('Not found')
      }

      const { components } = renderProps

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch
      }

      const felaRenderer = configureFela()
      const InitialView = (
        <ApolloProvider store={store} client={apolloClient}>
          <Fela renderer={felaRenderer}>
            <RouterContext {...renderProps} />
          </Fela>
        </ApolloProvider>
      )

      trigger('fetch', components, locals)
      .then(() => {
        return getDataFromTree(InitialView)
      })
      .then(() => {
        const html = ReactDOM.renderToString(InitialView)
        const appCSS = felaRenderer.renderToString()
        const fontCSS = felaRenderer.fontRenderer.renderToString()
        const head = Helm.rewind()
        res.status(200).send(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charSet="utf-8">
              <meta httpEquiv="X-UA-Compatible" content="IE=edge">
              ${head.title.toString()}
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="shortcut icon" href="/favicon.ico">
              ${head.meta.toString()}
              ${head.link.toString()}
              <style id="stylesheet">${appCSS}</style>
              <style id="font-stylesheet">${fontCSS}</style>
            </head>
            <body>
              <div id="root">${html}</div>
              <script>window.INITIAL_STATE = ${JSON.stringify(store.getState())};</script>
              <script src="${__PROD__ ? assets.vendor.js : '/vendor.js'}"></script>
              <script async src="${__PROD__ ? assets.main.js : '/main.js'}" ></script>
            </body>
          </html>
        `)
      })
      .catch(e => console.log(e))
    })
  })

  const server = http.createServer(app)

  // Heroku dynos automatically timeout after 30s. Set our
  // own timeout here to force sockets to close before that.
  // https://devcenter.heroku.com/articles/request-timeout
  if (config.timeout) {
    server.setTimeout(config.timeout, (socket) => {
      const message = `Timeout of ${config.timeout}ms exceeded`

      socket.end([
        'HTTP/1.1 503 Service Unavailable',
        `Date: ${(new Date).toGMTString()}`,  // eslint-disable-line
        'Content-Type: text/plain',
        `Content-Length: ${message.length}`,
        'Connection: close',
        '',
        message
      ].join(`\r\n`))
    })
  }

  return server
}

const connect = (config) => {
  return mongoose.connect(config.mongoUri, config.mongooseOptions).connection
}

export const startServer = (serverConfig) => {
  const config = {...DefaultServerConfig, ...serverConfig}
  const server = createServer(config)
  connect(config)
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', () => {
    console.log(`MongoDB successfully connected to ${config.mongoUri}`)
    server.listen(config.port, (err) => {
      if (config.nodeEnv === 'production' || config.nodeEnv === 'test') {
        if (err) console.log(err)
        console.log(`server ${config.id} listening on port ${config.port}`)
      } else {
        startDev(config.port, err)
      }
    })
  })
}

if (require.main === module) {
  throng({
    start: (id) => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity
  })
}
