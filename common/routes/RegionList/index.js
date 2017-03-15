if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
// import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'regions',
    getComponents (location, cb) {
      require.ensure([
        './containers/RegionList'
        // './reducer'
      ], (require) => {
        let RegionListPage = require('./containers/RegionList').default
        // let postReducer = require('./reducer').default
        // injectAsyncReducer(store, 'posts', postReducer)
        cb(null, RegionListPage)
      })
    }
  }
}
