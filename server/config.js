const config = {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 5000,
  host: process.env.WEBSITE_HOSTNAME || 'localhost',
  timeout: 29000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-compose-mongoose',
  mongooseOptions: {
    server: {
      reconnectTries: Number.MAX_VALUE,
      socketOptions: {
        keepAlive: 300000
      }
    },
    replset: {
      reconnectTries: Number.MAX_VALUE,
      socketOptions: {
        keepAlive: 300000
      }
    }
  },
  persistedQueries: false
}

module.exports = config
