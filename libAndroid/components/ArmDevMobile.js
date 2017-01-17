import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Registration from './registration';
import SignIn from './signIn';
import SignUp from './signUp';
export default 
class ArmDevMobile extends Component {
  renderScene(route, navigator) {
    switch (route.name) {
      case 'Registration':
        return <Registration navigator={navigator} {...route.passProps} />;
        break;
      case 'SignIn':
        return <SignIn navigator={navigator} {...route.passProps} />;
        break;
      case 'SignUp':
        return <SignUp navigator={navigator} {...route.passProps} />;
        break;
    }
  }
  configureScene(route, routeStack){
    switch (route.name) {
      default:
        return Navigator.SceneConfigs.PushFromRight;
        break;
    }
  }
  render() {
    return(
      <Navigator
        initialRoute={{ name: 'Registration'}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
      />
    );
  }
}