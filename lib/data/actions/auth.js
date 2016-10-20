import { AsyncStorage }          from 'react-native'
import { Token }                 from '../model'
import { AuthenticateOperation } from '../operations'

export const START_LOGIN                 = 'START_LOGIN'
export const SUCCESSFUL_LOGIN            = 'SUCCESSFUL_LOGIN'
export const FAILED_LOGIN                = 'FAILED_LOGIN'

const START_LOGIN_ACTION                 = ()      => ({ type: START_LOGIN })
const FAILED_LOGIN_ACTION                = (error) => ({ type: FAILED_LOGIN, error })
const SUCCESSFUL_LOGIN_ACTION            = (token) => ({ type: SUCCESSFUL_LOGIN, token })

export function authenticate (email, password) {
  return (dispatch) => {
    // First, inform the store we're about to fetch the cars
    dispatch(START_LOGIN_ACTION)

    // Perform the actual login to the remote API
    new AuthenticateOperation({ email, password }).start().

        // This looks like a successful login attempt
        then (token => dispatch(SUCCESSFUL_LOGIN_ACTION(token))).

        // Propagate errors
        catch(error => dispatch(FAILED_LOGIN_ACTION(error)));
  }
}
