import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default
class Registration extends Component {
  _navigate(propName, name) {
  }
  render(){
    return(
      <View style={style.container}>
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
            />
          </View>
          <View style={style.button}>
            <Button 
              title='Sign up'
            />
          </View>
          <View style={style.openSourceContainer}>
            <Text style={style.openSource}>Our project is fully open-source,</Text>
            <Text style={style.openSource}>you can find it HERE.</Text>
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
    color: 'red'
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
  }
});
