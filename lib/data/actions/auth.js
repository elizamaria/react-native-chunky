import { AsyncStorage }   from 'react-native'
import { User }           from '../model'
import * as Errors        from '../../errors'
import {
  AuthenticateOperation,
  RetrieveUserOperation
} from '../operations'

export const START_LOGIN                 = 'START_LOGIN'
export const SUCCESSFUL_LOGIN            = 'SUCCESSFUL_LOGIN'
export const FAILED_LOGIN                = 'FAILED_LOGIN'
export const START_GETTING_USER          = 'START_GETTING_USER'
export const RECEIVED_USER               = 'RECEIVED_USER'
export const FAILED_TO_RECEIVE_USER      = 'FAILED_TO_RECEIVE_USER'

const START_GETTING_USER_ACTION     = ()      => ({ type: START_GETTING_USER })
const FAILED_TO_RECEIVE_USER_ACTION = (error) => ({ type: FAILED_TO_RECEIVE_USER, error })
const RECEIVED_USER_ACTION          = (user)  => ({ type: RECEIVED_USER, user })
const START_LOGIN_ACTION            = ()      => ({ type: START_LOGIN })
const FAILED_LOGIN_ACTION           = (error) => ({ type: FAILED_LOGIN, error })
const SUCCESSFUL_LOGIN_ACTION       = (token) => ({ type: SUCCESSFUL_LOGIN, token })

export function retrieveUser () {
  return (dispatch) => {
    // First, inform the store we're about to fetch the user
    dispatch(START_GETTING_USER_ACTION)

    return new Promise((resolve, reject) => {
        // Now let's fetch the remote user data
        new RetrieveUserOperation({ authToken }).start().

            // The user was successfully retrieved
            then(user => dispatch(RECEIVED_USER_ACTION(user))).

            // Something happened during fetching, so let's propagate errors
            catch(error => dispatch(FAILED_TO_RECEIVE_USER_ACTION(error)))
    })
   }
}

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
