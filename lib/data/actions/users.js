import { AsyncStorage }          from 'react-native'
import { User }                  from '../model'
import { AuthenticateOperation } from '../operations'

export const START_GETTING_USER          = 'START_GETTING_USER'
export const RECEIVED_USER               = 'RECEIVED_USER'
export const FAILED_TO_RECEIVE_USER      = 'FAILED_TO_RECEIVE_USER'
const START_GETTING_USER_ACTION          = ()      => ({ type: START_GETTING_USER })
const FAILED_TO_RECEIVE_USER_ACTION      = (error) => ({ type: FAILED_TO_RECEIVE_USER, error })
const RECEIVED_USER_ACTION               = (user)  => ({ type: RECEIVED_USER, user })

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
