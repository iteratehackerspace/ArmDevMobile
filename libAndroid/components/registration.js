import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

export default
class CreateAccount extends Component {
  _navigate(propName, name) {
  }
  render(){
    return(
      <View style={style.container}>
        <View>
          <Text>Registration</Text>
        </View>
        <View>
          <Text>Full name</Text>
        </View>
        <View>
          <Text>e-mail</Text>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#f0d6c9'
  }
});
