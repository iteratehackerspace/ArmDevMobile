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
  }
});
