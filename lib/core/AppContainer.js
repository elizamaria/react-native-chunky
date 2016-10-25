import ErrorStackParser     from 'error-stack-parser'
import React, { Component } from 'react'
import { Provider }         from 'react-redux'
import DataStore            from '../data/store'
import * as Errors          from '../errors'
import App                  from './App'

import {
  Platform,
  StyleSheet,
  Navigator,
  View,
  StatusBar
} from 'react-native'

export default class AppContainer extends Component {

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

  render() {
    return (
      <Provider store={this.state.store}>
        <App {...this.props}/>
      </Provider>
    )
  }
}
