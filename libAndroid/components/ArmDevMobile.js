import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions
} from 'react-native';
import Registration from './registration';
import SignIn from './signIn';
import SignUp from './signUp';
import Feed from './feed';
import Post from './post';
import You from './you';
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
      case 'Feed':
        return <Feed  navigator={navigator} {...route.passProps} />;
        break;
      case 'Post':
        return <Post navigator={navigator} {...route.passProps} />;
        break;
      case 'You':
        return <You navigator={navigator} {...route.passProps} />;
        break;
    }
  }
  configureScene(route, routeStack){
    switch (route.name) {
      case 'Post':
        return Navigator.SceneConfigs.FadeAndroid
        break;
      default:
        return Navigator.SceneConfigs.PushFromRight;
        break;
    }
  }
  // componentWillMount(){
  //   const options = {
  //     
  //   }
  //   const request_options = {
  //     method: 'post',
  //     headers: new Headers({
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //     body:JSON.stringify({
  //       fullName : 'Edgar Khanzadian',
  //       email : 'some.email@hey.ru',
  //       password: '123123',
  //     }),
  //   };
  //   const hey = fetch('http://192.168.1.160:8080/user_registration', request_options)
  //   console.log(hey);
  // }
  render() {
    return(
      <Navigator
        initialRoute={{ name: 'Registration'}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={style.navigationBar}
          />
        }
      />
    );
  }
}
let NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return(
      <View>{route.leftButton}</View>
    );
  },
  RightButton(route, navigator, index, navState) {
    return(
      <View>
        {route.rightButton}
      </View>
    );
  },
  Title(route, navigator, index, navState) {
    console.log(route);
    return(
      <Text></Text>
    );
  },
}
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#bf0e0e',
    height: 0.05 * height,
  },
});