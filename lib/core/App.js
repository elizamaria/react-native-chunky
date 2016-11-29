import React, { Component } from 'react'
import * as Errors          from '../errors'
import { UserContainer }    from 'react-chunky'

import {
  Platform,
  StyleSheet,
  Navigator,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StatusBar
} from 'react-native'

class App extends Component {

  constructor(props) {
    super(props)
  }

  configureScene(route, stack) {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  componentDidMount() {
   if(this.props.splashScreen) {
     if(Platform.OS === this.props.splashScreen.platform) {
       this.props.splashScreen.splashObject.hide();
     }
   }
 }

  onAppSuccessfulAuthentication() {
    this.props.retrieveUser()
  }

  renderScene(route, navigator) {
    if (!route.screen) {
      throw Errors.UNABLE_TO_LOAD_ROUTE(route.path, "the route has no screen")
    }

    // Load the screen as defined by the route
    const Screen = route.screen
    const routeProps = route.props || {}
    const props = Object.assign({
      navigator,
      routePath: route.path,
      onAppSuccessfulAuthentication: this.onAppSuccessfulAuthentication.bind(this)
    }, routeProps, this.props)

    return (<Screen {...props} />)
  }

  renderError() {
      return (<View>
        <Text style={styles.error}>
          { this.props.getUserError() }
        </Text>
        <TouchableOpacity style={[styles.retry]}
          activeOpacity={0.8}
          onPress={this.onRetryPressed.bind(this)}>
            <Text style={styles.retryText}>
              Try again
            </Text>
         </TouchableOpacity>
      </View>)
  }

  renderContent() {
    if (this.props.hasUserError()) {
      return this.renderError()
    }

    return (
        <View style={this.props.styles.Containers.STATUSBAR}>
          <StatusBar barStyle="light-content"/>
            <Navigator initialRoute={this.props.initialRoute}
                       ref="navigator"
                       configureScene={this.configureScene}
                       renderScene={this.renderScene.bind(this)}/>
         </View>
    )
  }

  render() {
    return (<View style={ styles.container }>
        {this.renderContent()}
      </View>)
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#333333",
    justifyContent: "center"
  },
  retry: {
    flexDirection: 'row',
    marginHorizontal: Platform.OS == 'ios' ? 15 : 30,
    marginTop: 15,
    backgroundColor: "#ff0000",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  error: {
    alignSelf: "center",
    color: "#ffffff",
    margin: 10
  },
  retryText: {
    color: "#ffffff"
  }
})

export default UserContainer(App)
