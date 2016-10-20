import * as Errors        from '../../errors'
import * as Config        from '../../config'
import { User }           from '../model'
import RemoteOperation    from './RemoteOperation'

export default class RetrieveUserOperation extends RemoteOperation {

  constructor(props) {
    super(props)

    // Initialize the operation
    this.operationMethod   = Config.API_GET_METHOD
    this.operationIsSecure = true
  }

  operationFinishedWithSuccess(json) {
    return new Promise((resolve, reject) => {

      // Let's build our user from the remote data
      let user = new User(json.data)

      resolve(user)
    });
  }

  operationFinishedWithError(error) {
    return Errors.COULD_NOT_RETRIEVE_USER
  }

  operationFinishedWithInvalidStatusCode(statusCode) {
    return Errors.COULD_NOT_RETRIEVE_USER
  }
}
