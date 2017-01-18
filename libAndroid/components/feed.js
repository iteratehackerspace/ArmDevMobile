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
class Feed extends Component {
  _navigate(propName, name) {
  }
  render(){
    return(
      <View style={style.container}>
        <TouchableOpacity
          activeOpacity={0.9}>
          <View style={style.postStyle}>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d6c9'
  },
  postStyle: {
    height: 0.3 * height,
    width: width,
    backgroundColor: 'white',
    marginBottom: 5
  }
});
