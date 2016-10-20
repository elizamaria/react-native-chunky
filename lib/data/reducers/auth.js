import * as ACTIONS from '../actions'

// The Auth Reducer, in charge of User Authentication
export default function auth (state = {}, action) {
  return Object.assign({}, state, {
    error: action.error,
    user: action.user,
    type: action.type
  })
}
