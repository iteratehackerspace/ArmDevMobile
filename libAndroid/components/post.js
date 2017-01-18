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
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');
import { reduxStore } from '../containers/App';
let store;
export default
class Post extends Component {
  _navigate(propName, name) {
  }
  componentWillMount() {
    store = reduxStore.getState().armDevMobile;
  }
  render(){
    return(
      <View style={style.container}>
        <ScrollView>
          <View style={style.postContainer}>
            <View style={style.titleContainer}>
              <Text style={style.title}>{store[0].post.title}</Text>
            </View>
            <View style={style.authorContainer}>
              <Image
                style={style.imageStyle}
                source={require('../assets/trump.jpg')}
              />
              <View>
                <View style={style.authorTextContainer}>
                  <Text style={style.authorText}>{store[0].post.author.fullName}</Text>
                </View>
                <View style={style.authorDateContainer}>
                  <Text>{store[0].post.time}</Text>
                </View>
              </View>
            </View>
            <View style={style.postTextContainer}>
              <Text style={style.postText}>{store[0].post.text}</Text>
            </View>
          </View>
          <View style={style.aboutTheAuthorTextContainer}>
            <Text style={style.aboutTheAuthorText}>About the author</Text>
          </View>
          <View style={style.aboutTheAuthorContainer}>
            <Image
              style={style.imageStyle}
              source={require('../assets/trump.jpg')}
            />
            <View>
              <View style={style.authorTextContainer}>
                <Text style={style.authorText}>{store[0].post.author.fullName}</Text>
              </View>
              <View style={style.authorDateContainer}>
                <Text>{store[0].post.author.ShortDescription}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={style.footer}>
          <View style={style.upFoot}>
            <TouchableOpacity 
              style={style.likesContainer}
              activeOpacity={1}>
              <Text style={style.likes}>Like|{store[0].post.likes}</Text>
            </TouchableOpacity>
            <View 
              style={style.commentsContainer}>
              <Text style={style.comments}>Comments|{store[0].post.comments.length}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={style.cancelBottomContainer}
            activeOpacity={1}
            onPress={() => this.props.navigator.pop()}>
            <Text style={style.cancelBottom}>X</Text>
          </TouchableOpacity>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  titleContainer: {
    alignItems: 'center',
    margin: 20
  },
  postContainer: {
    backgroundColor: 'white'
  },
  postTextContainer: {
    alignItems: 'center',
    margin: 20
  },
  postText: {
    fontSize: 15,
    color: 'black'
  },
  cancelBottomContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
  },
  cancelBottom: {
    color: 'white',
    fontSize: 20,
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  authorContainer: {
    flexDirection: 'row',
    marginLeft: 20,
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
  likesContainer: {
    margin: 5,
    backgroundColor: '#DAA4E7',
    borderRadius: 5,
  },
  likes: {
    color: 'blue',
    margin: 2
  },
  comments: {
    color: 'black',
    margin: 2
  },
  commentsContainer: {
    margin: 5,
  },
  upFoot: {
    flexDirection: 'row',
  },
  aboutTheAuthorTextContainer: {
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  aboutTheAuthorText: {
    color: 'black',
    fontSize: 18
  },
  aboutTheAuthorContainer: {
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
});
