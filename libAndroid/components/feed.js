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
import { reduxStore } from '../containers/App';
const { width, height } = Dimensions.get('window');
let store;
export default
class Feed extends Component {
  componentWillMount() {
    store = reduxStore.getState().armDevMobile;
  }
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
    const renderPosts = store.map((post, idx) => {
      return(
        <View key={idx} style={style.postStyle}>
          <View style={{margin: 15}}>
            <View>
              <Text style={{fontSize: 20, fontWeight: '900', color: 'black'}}>
                {store[idx].post.title}
              </Text>
            </View>
            <View style={style.authorContainer}>
              <Image
                style={style.imageStyle}
                source={require('../assets/trump.jpg')}
              />
              <View>
                <View style={style.authorTextContainer}>
                  <Text style={style.authorText}>{store[idx].post.author.fullName}</Text>
                </View>
                <View style={style.authorDateContainer}>
                  <Text>{store[idx].post.time}</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{color: 'black'}}>
                {store[idx].post.text.substr(0, 140)}...
              </Text>
              <Text style={{color: 'red'}}>
                Read More
              </Text>
            </View>
          </View>
        </View>
      )
    })
    return(
        <ScrollView style={{backgroundColor: '#f0d6c9',height:height}}>
          <View style={style.container}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this._navigate('toPost')}>
              {renderPosts}
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
    height: 0.35 * height,
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
  imageStyle: {
    width: 35,
    height: 35,
    borderRadius: 1000,
  },
  authorContainer: {
    flexDirection: 'row',
  },
  authorTextContainer: {
    marginLeft: 10
  },
  authorText: {
    color: 'black',
  },
  authorDateContainer: {
    marginLeft: 10,
  },
});
