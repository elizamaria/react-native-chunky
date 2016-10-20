import * as Errors from '../../errors'
import * as Config from '../../config'

export default class RemoteOperation {

  constructor(props) {
    // Keep track of the operation properties
    this.props = props

    // Initialize the basic headers required for all operations
    this._headers = {
      'Content-Type':  Config.API_CONTENT_TYPE,
      'Accept':        Config.API_CONTENT_TYPE,
      'Cache-Control': 'no-cache'
    }

    this.operationServerUrl = props.serverUrl
    this.operationMethod    = Config.API_POST_METHOD
    this.operationIsSecure  = false
    this.operationTimeout   = Config.API_TIMEOUT
  }

  retrieveAuthToken() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(Config.AUTH_TOKEN_CACHE_KEY, (error, authToken) => {
        if (error || !authToken) {
          // The token was not found locally
          reject(Errors.COULD_NOT_RETRIEVE_CACHED_TOKEN)
          return
        }
        resolve(authToken)
      })
    })
  }

  beforeStart() {
    return Promise.resolve()
  }

  start() {
    return this.beforeStart().
         then(() => this.doStart()).
         catch(error => Promise.reject(this.operationFinishedWithError(error)))
  }

  doStart() {
    this._headers['X-APP-ID']     = this.props.apiKey
    this._headers['X-APP-SECRET'] = this.props.apiSecret

    if (this.operationIsSecure && this.props.authToken) {
      // Let's use the user token if we have one
      this._headers.Authorization = `Bearer ${this.props.authToken}`
    }

    // Perform the actual call
    return this.startAsyncRemoteCall()
  }

  operationFinishedWithError(error){
    return Errors.GENERIC_ERROR
  }

  operationFinishedWithInvalidStatusCode(statusCode) {
    return Errors.GENERIC_ERROR
  }

  operationFinishedWithSuccess(json) {
    return Promise.resolve(json);
  }

  operationReceivedTimeout() {}

  get options () {
    var opts = {
       method: this.operationMethod,
       headers: this.headers
    }

    if (this.operationBody) {
      opts.body = JSON.stringify(this.operationBody)
    }

    return opts
  }

  get headers () {
    return this._headers
  }

  startAsyncRemoteCall() {
    if (!this.operationEndpoint) {
      // Make sure we've got ourselves a valid endpoint
      return Promise.reject(Errors.GENERIC_ERROR)
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Make sure the operation is responsive within the custom timeout limit
        this.operationReceivedTimeout()

        // Stop the operation right away
        reject(Errors.TIMEOUT_ERROR)
      }, this.operationTimeout)

      // Perform the remote operation
      this.performAsyncRemoteCall().

          // Allow the operation to parse the JSON
          then(json => this.operationFinishedWithSuccess(json)).

          // Propagate the parsed result
          then(data => resolve(data)).

          // Also propagate errors, if necessary
          catch(error => reject(this.operationFinishedWithError(error)))
    });
  }

  performAsyncRemoteCall() {
    return new Promise((resolve, reject) => {
       fetch(`${this.operationServerUrl}${this.operationEndpoint}`, this.options).then(response => {
           if (response.status >= 400) {
             // The operation failed so let's reject this call
             return response.json().then(json => reject(this.operationFinishedWithInvalidStatusCode(json)))
           }
           // The response was successful, let's proceed with the data parsing
           resolve(response.json())
         });
     });
  }
}
