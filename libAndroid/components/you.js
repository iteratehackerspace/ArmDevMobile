import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');
import { reduxStore } from '../containers/App';
let store;
export default
class You extends Component {
  render(){
    return(
      <View style={style.container}>
        <ScrollView>
          <View>
            <Image
              style={style.imageStyleUser}
              source={require('../assets/trump.jpg')}
            />
          </View>
        </ScrollView>
        <View style={style.footer}>
          <TouchableOpacity 
            style={style.feedButtonContainer}
            onPress={() => this.props.navigator.pop()}>
            <Image
              style={style.imageStyle}
              source={require('../assets/feedButton.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={style.youButtonContainer}>
            <Image
              style={style.imageStyle}
              source={require('../assets/youButton.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d6c9'
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
  },
  imageStyleUser: {
    width: 50,
    height: 50,
    borderRadius: 1000,
    marginLeft: 20,
  }
});
