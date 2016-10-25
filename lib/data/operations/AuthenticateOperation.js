import Base64              from 'base-64'
import RemoteOperation     from './RemoteOperation'
import { Token }           from '../model'
import * as Errors         from '../../errors'
import * as Config         from '../../config'
import { cacheAuthToken }  from '../cache'

export default class AuthenticateOperation extends RemoteOperation {

  constructor(props) {
    super(props)

    // Sign the request with a Basic Base64 Authorization token
    let token = Base64.encode(`${props.username}:${props.password}`)
    this._headers.Authorization = `Basic ${token}`

    // Initialize the operation
    this.operationEndpoint = props.config.apiAuthEndpoint
  }

  operationFinishedWithSuccess(json) {
    // Let's build our token from the remote data
    return cacheAuthToken(new Token(json))
  }

  operationFinishedWithInvalidStatusCode(statusCode) {
    return Errors.INVALID_LOGIN_ERROR
  }

  operationFinishedWithError(error) {
    return Errors.INVALID_LOGIN_ERROR
  }
}
