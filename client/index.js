import 'babel-polyfill'
import { trigger } from 'redial'

import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import match from 'react-router/lib/match'
import browserHistory from 'react-router/lib/browserHistory'

import { ApolloProvider } from 'react-apollo'
import createApolloClient from '../common/createApolloClient'
// import getNetworkInterface from '../server/transport'
import { createBatchingNetworkInterface } from 'apollo-client'
import { configureStore } from '../common/store'
import { Provider as Fela } from 'react-fela'
import configureFela from '../common/configureFela'

const initialState = window.INITIAL_STATE || {}

const networkInterface = createBatchingNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  },
  batchInterval: 20
})

const apolloClient = createApolloClient({
  // networkInterface: getNetworkInterface(),
  networkInterface,
  initialState,
  ssrForceFetchDelay: 100
})

// Set up Redux (note: this API requires redux@>=3.1.0):
const store = configureStore({
  initialState,
  platformReducers: { apollo: apolloClient.reducer() },
  platformMiddleware: [ apolloClient.middleware() ]
})
const { dispatch } = store

const container = document.getElementById('root')

const felaRenderer = configureFela(document.getElementById('font-stylesheet'))

const mountNode = document.getElementById('stylesheet')

const render = () => {
  const { pathname, search, hash } = window.location
  const location = `${pathname}${search}${hash}`

  // We need to have a root route for HMR to work.
  const createRoutes = require('../common/routes/root').default
  const routes = createRoutes(store)

  // Pull child routes using match. Adjust Router for vanilla webpack HMR,
  // in development using a new key every time there is an edit.
  match({ routes, location }, () => {
    // Render app with Redux and router context to container element.
    // We need to have a random in development because of `match`'s dependency on
    // `routes.` Normally, we would want just one file from which we require `routes` from.
    ReactDOM.render(
      <ApolloProvider store={store} client={apolloClient}>
        <Fela renderer={felaRenderer} mountNode={mountNode}>
          <Router routes={routes} history={browserHistory} key={Math.random()} />
        </Fela>
      </ApolloProvider>,
      container
    )
  })

  return browserHistory.listen(location => {
    // Match routes based on location object:
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) console.log(error)
      // Get array of route handler components:
      const { components } = renderProps

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch
      }

      // Don't fetch data for initial route, server has already done the work:
      if (window.INITIAL_STATE) {
        // Delete initial data so that subsequent data fetches can occur:
        delete window.INITIAL_STATE
      } else {
        // Fetch mandatory data dependencies for 2nd route change onwards:
        trigger('fetch', components, locals)
      }

      // Fetch deferred, client-only data dependencies:
      trigger('defer', components, locals)
    })
  })
}

const unsubscribeHistory = render()

if (module.hot) {
  module.hot.accept('../common/routes/root', () => {
    unsubscribeHistory()
    setTimeout(render)
  })
}
