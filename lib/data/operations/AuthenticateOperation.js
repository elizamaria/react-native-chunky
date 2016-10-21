import { AsyncStorage }   from 'react-native'
import Base64             from 'base-64'
import RemoteOperation    from './RemoteOperation'
import { Token }          from '../model'
import * as Errors        from '../../errors'
import * as Config        from '../../config'

export default class AuthenticateOperation extends RemoteOperation {

  constructor(props) {
    super(props)

    // Sign the request with a Basic Base64 Authorization token
    let token = Base64.encode(`${props.email}:${props.password}`)
    this._headers.Authorization = `Basic ${token}`

    // Initialize the operation
    this.operationMethod = Config.API_GET_METHOD
    this.operationEndpoint = props.config.apiAuthEndpoint
  }

  operationFinishedWithSuccess(json) {
    return new Promise((resolve, reject) => {

      // Let's build our token from the remote data
      let token = new Token(json)

      // Next, we want to save the token
      AsyncStorage.setItem(Config.AUTH_TOKEN_CACHE_KEY, token.accessToken, (error) => {

        if (error) {
          // Something went wrong when saving the token
          reject(error)
          return;
        }

        // We're good to go, let's send back the newly received token
        resolve(token.accessToken)
      })
    })
  }

  operationFinishedWithInvalidStatusCode(statusCode) {
    return Errors.INVALID_LOGIN_ERROR
  }

  operationFinishedWithError(error) {
    return Errors.INVALID_LOGIN_ERROR
  }
}
