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
      <View>
        <ScrollView>
          <View style={style.container}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this._navigate('toPost')}>
              <View style={style.postStyle}>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={style.footer}>
          <TouchableOpacity 
            style={style.feedButtonContainer}>
            <Image
              style={style.imageStyle}
              source={require('../assets/feedButton.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={style.youButtonContainer}
            onPress={() => this._navigate('toYou')}>
            <Image
              style={style.imageStyle}
              source={require('../assets/youButton.png')}
            />
          </TouchableOpacity>
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
  postStyle: {
    height: 2 * height,
    width: width,
    backgroundColor: 'white',
    marginBottom: 5
  },
  footer: {
    backgroundColor: '#bf0e0e',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedButtonContainer: {
    margin: 10,
  },
  youButtonContainer: {
    margin: 10,
  },
  imageStyle: {
    height: 20,
    width: 20,
    marginLeft: 20,
    marginRight: 20,
  }
});
