import AppContainer       from './lib/core/AppContainer'
import React              from 'react'
import * as Config        from './lib/config'
import * as Errors        from './lib/errors'
import {
  AppRegistry,
  AsyncStorage
} from 'react-native'

// Allow the host app to start from this entry point
export function startApp(props) {
  const Main = () => (<AppContainer {...props}/>)
  AppRegistry.registerComponent(props.name, () => Main)
}

// Give apps a starter for error handling
export { default as AppError } from './lib/core/Error'

// Allow the app to define custom containers
export { default as Container } from './lib/core/Container'

// Make the common containers available to the host app
export * from './lib/data/containers'

// Expose operations to the host app
export { default as RemoteOperation } from './lib/data/operations/RemoteOperation'

// Allow host apps to access common configurations
export { Config }

// Give apps access to the common cache
export * from './lib/data/cache'
