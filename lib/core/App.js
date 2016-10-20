import ErrorStackParser     from 'error-stack-parser'
import React, { Component } from 'react'
import { Provider }         from 'react-redux'
import DataStore            from '../data/store'
import * as Errors          from '../errors'
import {
  Platform,
  StyleSheet,
  Navigator,
  View,
  StatusBar
} from 'react-native'

export default class App extends Component {

  constructor(props) {
    super(props)

    // Initialize the store with customer app reducers
    this.state = { store: DataStore(this.props.reducers) }
  }

  enableGlobalErrorHandler() {
    const self = this
    ErrorUtils.setGlobalHandler((e, isFatal) => {
      // Extract a meaningful stack trace
      const stack = ErrorStackParser.parse(e)

      // Notify the app that an error has occured
      self.setState({ error: e, isErrorFatal: isFatal, errorStack: stack })
    });
  }

  componentDidMount() {
    // this.enableGlobalErrorHandler()
  }

  configureScene(route, stack) {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    if (!route.screen) {
      throw Errors.UNABLE_TO_LOAD_ROUTE(route.path, "the route has no screen")
    }

    // Load the screen as defined by the route
    const Screen = route.screen
    const props = Object.assign({ navigator }, this.props)
    return (<Screen {...props} />)
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <View style={this.props.styles.Containers.STATUSBAR}>
          <StatusBar barStyle="light-content"/>
            <Navigator initialRoute={this.props.initialRoute}
                       ref="navigator"
                       configureScene={this.configureScene}
                       renderScene={this.renderScene.bind(this)}/>
         </View>
     </Provider>
    );
  }
}
