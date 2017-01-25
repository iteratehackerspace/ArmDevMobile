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
          <Text style={style.textStyle}>First Name:</Text>
          <TextInput 
            onChangeText={this.props.onFirstNameChange} 
            style={style.textInputStyle}
            underlineColorAndroid='black'
            autoFocus={true}
          />
        </View>
        <View style={style.smallContainer}>
          <Text style={style.textStyle}>Last Name:</Text>
          <TextInput 
            onChangeText={this.props.onLastNameChange} 
            style={style.textInputStyle}
            underlineColorAndroid='black'
          />
        </View>
        <View style={style.smallContainer}>
          <Text style={style.textStyle}>Username:</Text>
          <TextInput 
            onChangeText={this.props.onUserNameChange} 
            style={style.textInputStyle}
            underlineColorAndroid='black'
          />
        </View>
        <View style={style.smallContainer}>
          <Text style={style.textStyle}>Email:</Text>
          <TextInput 
            onChangeText={this.props.onEmailChange} 
            style={style.textInputStyle}
            underlineColorAndroid='black'
            keyboardType='email-address'
          />
        </View>
        <View style={style.smallContainer}>
          <Text style={style.textStyle}>Password:</Text>
          <TextInput 
            onChangeText={this.props.onPasswordChange} 
            style={style.textInputStyle}
            underlineColorAndroid='black'
          />
        </View>
        <View style={this.props.unameAvailable}>
          <Text></Text>
        </View>
        <View style={this.props.wrongCredentials ? {opacity:1} : {opacity:0}}>
          <Text style={{color:'red'}}>Sorry, but fields are not filled correctly</Text>
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
