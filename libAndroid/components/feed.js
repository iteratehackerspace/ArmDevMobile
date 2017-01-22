import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default
class Feed extends Component {
  _navigate(propName, name) {
    if(propName === 'toPost'){
      this.props.navigator.push({
        name: 'Post',
        leftButton: (
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={() => this.props.navigator.pop()}>
            <Text style={style.headerText}>X</Text>
          </TouchableOpacity>
        ),
        passProps: {
        },
      });
    }else if(propName === 'toYou'){
      this.props.navigator.push({
        name: 'You',
        passProps: {  
        },
      });
    }
  }
  render(){
    return(
        <ScrollView style={{backgroundColor: '#f0d6c9',height:height}}>
          <View style={style.container}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this._navigate('toPost')}>
              <View style={style.postStyle}>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d6c9',
    marginTop: 0.05 * height,
  },
  postStyle: {
    height: 0.3 * height,
    width: width,
    backgroundColor: 'white',
    marginBottom: 5
  },
  headerTextContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerText: {
    fontSize: 17,
    color: 'black',
  },
});
