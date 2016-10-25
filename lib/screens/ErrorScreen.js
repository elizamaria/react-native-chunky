import React, { Component }  from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native'

export default class Screen extends BaseScreen {

  constructor (props) {
    super(props)
  }

  // componentWillReceiveProps(nextProps) {
  //   const user  = nextProps.getUserData()
  //   const route = routeWithProps(DASHBOARD_ROUTE, { user })
  //   this.props.navigator.replace(route)
  // }

  // startLoading() {
  //   this.props.retrieveUser()
  // }
  //
  // onRetryPressed() {
  //   this.startLoading()
  // }

  renderContent() {
    return (<View>
      <UndoiText style={styles.error}
        fontFamily="semiBold">
        { this.props.getUserError() }
      </UndoiText>
      <TouchableOpacity style={[styles.retry]}
        activeOpacity={0.8}
        onPress={this.onRetryPressed.bind(this)}>
          <UndoiText style={styles.retryText}
            fontFamily="semiBold">
            { Strings.Main.RETRY }
          </UndoiText>
       </TouchableOpacity>
    </View>)
  }

  render() {
    return (
      <View style={ styles.container }>
          {this.renderContent()}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: (Platform.OS === 'ios') ? null : "#333333",
    justifyContent: "center"
  },
  retry: {
    flexDirection: 'row',
    marginHorizontal: Platform.OS == 'ios' ? 15 : 30,
    marginTop: 15
    backgroundColor: Colors.ORANGE,
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
