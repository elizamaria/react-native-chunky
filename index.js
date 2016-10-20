import App                from './lib/core/App'
import React              from 'react'
import { AppRegistry }    from 'react-native'

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
