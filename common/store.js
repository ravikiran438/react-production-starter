import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import createReducer from './createReducer'

export function configureStore (options) {
  const {
    initialState,
    platformMiddleware = [],
    platformReducers = {}
  } = options
  const middleware = [
    thunk.withExtraArgument({ axios }),
    ...platformMiddleware
  ]
  let store = createStore(createReducer(platformReducers), initialState, compose(
    applyMiddleware(...middleware),

    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  ))
  store.platformReducers = platformReducers
  store.asyncReducers = {}

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () => {
        const createReducer = require('./createReducer').default
        store.replaceReducer(createReducer(platformReducers))
      })
    }
  }

  return store
}

export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.platformReducers, store.asyncReducers))
}
