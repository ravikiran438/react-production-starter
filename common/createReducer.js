import { combineReducers } from 'redux'
import device from './device/reducer'

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (platformReducers, asyncReducers) {
  return combineReducers({
    ...platformReducers,
    ...asyncReducers,
    device
  })
}
