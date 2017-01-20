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
  render(){
    return(
      <View style={style.container}>
        <View style={style.smallContainer}>
          <Text style={style.textStyle}>Full Name:</Text>
          <TextInput 
            style={style.textInputStyle}
          />
        </View>
        <View style={style.smallContainer}>
          <Text style={style.textStyle}>Email:</Text>
          <TextInput 
            style={style.textInputStyle}
          />
        </View>
        <View style={style.smallContainer}>
          <Text style={style.textStyle}>Password:</Text>
          <TextInput style={style.textInputStyle}/>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d6c9',
    marginTop: 0.05 * height,
  },
  smallContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  textInputStyle: {
    width: 0.7 * width,
    height: 40,
  },
  textStyle: {
    width: 0.3 * width,
    fontSize: 20,
    color: 'black',
  }
});
