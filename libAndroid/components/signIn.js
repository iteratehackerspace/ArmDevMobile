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
class SignIn extends Component {
  _navigate(propName, name) {
    this.props.navigator.push({
      name: 'Feed',
      passProps: {
      },
    });
  }
  render(){
    return(
      <View style={style.container}>
        <View style={style.header}>
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={() => this.props.navigator.pop()}>
            <Text style={style.headerText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={() => this._navigate()}>
            <Text style={style.headerText}>Done</Text>
          </TouchableOpacity>
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
    backgroundColor: '#f0d6c9'
  },
  header: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  headerTextContainer: {
    margin: 10
  },
  headerText: {
    fontSize: 17
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
    fontSize: 20
  }
});
