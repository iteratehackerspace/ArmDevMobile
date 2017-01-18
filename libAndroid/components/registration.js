import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  StatusBar,
  Linking
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default
class Registration extends Component {
  _navigate(propName, name) {
    if(propName === 'toSignIn'){
      this.props.navigator.push({
        name: 'SignIn',
        passProps: {
        },
      });
    }else if(propName === 'toSignUp'){
      this.props.navigator.push({
        name: 'SignUp',
        passProps: {
        },
      });
    }
  }
  openGitLink() {
    const url = 'https://github.com/iteratehackerspace/ArmDevMobile';
    Linking.openURL(url)
    .catch(err => console.error('An error occurred', err));
  }
  render(){
    return(
      <View style={style.container}>
       <StatusBar backgroundColor="#bf0e0e" barStyle="light-content" />
        <View style={style.smallContainer}>
          <View style={style.titleContainer}>
            <Text style={style.title}>ArmDev</Text>
          </View>
          <View style={style.phraseContainer}>
            <Text style={style.phrase}>The best community for Armenian developers</Text>
          </View>
          <View style={style.button}>
            <Button 
              title='Sign in'
              onPress={() => this._navigate('toSignIn')}
            />
          </View>
          <View style={style.button}>
            <Button 
              title='Sign up'
              onPress={() => this._navigate('toSignUp')}
            />
          </View>
          <View style={style.openSourceContainer}>
            <Text style={style.openSource}>Our project is fully open-source,</Text>
            <Text style={style.openSource}>you can find it:</Text>
            <TouchableOpacity 
              onPress={() => {this.openGitLink()}}>
                <Text style={style.linkStyle}>
                  HERE
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d6c9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    color: '#bf0e0e'
  },
  smallContainer: {
    width: 0.8 * width,
    height: 0.6 * height
  },
  openSourceContainer: {
    alignItems: 'center'
  },
  openSource: {
    fontSize: 11,
    color: '#867770'
  },
  phraseContainer: {
    alignItems: 'center'
  },
  phrase: {
    marginBottom: 20
  },
  button: {
    marginBottom: 10
  },
  linkStyle: {
    color: 'blue'
  }
});
