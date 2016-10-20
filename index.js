import App                from './lib/core/App'
import React              from 'react'
import { AppRegistry }    from 'react-native'

export function startApp(props) {
  const Main = () => (<App {...props}/>)
  AppRegistry.registerComponent(props.name, () => Main)
}
