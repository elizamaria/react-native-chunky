import { combineReducers } from 'redux'

// Load common reducers
import auth from './auth'
const commonReducers = { auth }

// Create the root reducer
const reducers = (appReducers) => combineReducers(Object.assign(commonReducers, appReducers))

export default reducers
