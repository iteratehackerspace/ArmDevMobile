import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');
export default class WritePost extends Component {
  render(){
    return(
      <View style={style.container}>
        <TextInput 
          onChangeText={(text) => {
            const hey = text.split();
            console.log(hey);
          }}
          style={{
            height: height * 0.8,
          }}
          underlineColorAndroid='white'
          multiline={true}
          autoFocus={true}/>
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
});
