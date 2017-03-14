import deviceReducer from '../common/device/reducer'

const createInitialState = () => ({
  device: deviceReducer()
})

export default createInitialState
