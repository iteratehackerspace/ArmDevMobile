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
class ForumPage extends Component {
  render(){
    return(
      <View>
        <Text>
          ForumPAGE
        </Text>
      </View>
    );
  }
}