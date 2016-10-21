import App                from './lib/core/App'
import React              from 'react'
import * as Config        from './lib/config'
import * as Errors        from './lib/errors'
import {
  AppRegistry,
  AsyncStorage
} from 'react-native'

// Allow the host app to start from this entry point
export function startApp(props) {
  const Main = () => (<App {...props}/>)
  AppRegistry.registerComponent(props.name, () => Main)
}

// Allow the app to define custom containers
export { default as Container } from './lib/core/Container'

// Make the common containers available to the host app
export * from './lib/data/containers'

// Expose operations to the host app
export { default as RemoteOperation } from './lib/data/operations'

// Allow host apps to access common configurations
export * from './lib/config'

// Give host apps the ability to fetch the token
export function retrieveAuthToken() {
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
