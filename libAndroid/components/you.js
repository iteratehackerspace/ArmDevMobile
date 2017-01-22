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
  componentWillMount() {
    store = reduxStore.getState().armDevMobile;
  }
  render(){
    const usersPosts = store.map((post, idx) => {
      return(
        <View
          key={idx}
          style={style.postContainer}>
          <View
            style={style.postTextContainer}>
            <Text style={style.postText}>{post.post.title}</Text>
          </View>
        </View>
      );
    });
    return(
      <ScrollView style={{backgroundColor: '#f0d6c9',height: height}}>
        <View style={style.container}>
          <View style={style.imageWithNameContainer}>
            <View style={style.imageWithName}>
              <Image
                style={style.imageStyleUser}
                source={require('../assets/trump.jpg')}
              />
              <View style={style.nameAndDesc}>
                <Text 
                  style={style.userName}>
                  {store[0].post.author.fullName}
                </Text>
                <Text
                  style={style.shortDescription}>
                  {store[0].post.author.ShortDescription}
                </Text>
              </View>
            </View>
            <View style={style.followersBigContainer}>
              <View style={style.followersContainer}>
                <Text style={style.followers}>followers|123123</Text>
              </View>
            </View>
          </View>
          <View style={style.aboutTheAuthorTextContainer}>
            <Text style={style.aboutTheAuthorText}>About the author</Text>
          </View>
          <View style={style.bigDescriptionContainer}>
            <Text style={style.bigDescription}>{store[0].post.author.bigDescription}</Text>
          </View>
          <View style={style.aboutTheAuthorTextContainer}>
            <Text style={style.aboutTheAuthorText}>Posts</Text>
          </View>
          <View style={style.postsContainer}>
            {usersPosts}
          </View>
        </View>
      </ScrollView>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d6c9',
    marginTop: 0.05 * height,
  },
  imageStyleUser: {
    width: 50,
    height: 50,
    borderRadius: 1000,
    marginLeft: 10,
  },
  imageWithNameContainer: {
    backgroundColor: 'white',
  },
  imageWithName: {
    margin: 15,
    flexDirection: 'row',
  },
  userName: {
    marginTop: 10,
    marginLeft: 40,
    color: 'black',
    fontSize: 'bold',
    fontSize: 20,
  },
  shortDescription: {
    marginTop: 2,
    marginLeft: 40,
    color: 'black',
    fontSize: '200',
    fontSize: 14,
  },
  nameAndDesc: {
    width: width * 0.7,
  },
  followersBigContainer: {
    flexDirection: 'row',
  },
  followersContainer: {
    marginLeft: 25,
    marginBottom: 10,
    backgroundColor: '#DAA4E7',
    borderRadius: 7,
  },
  followers: {
    fontSize: 10,
    margin: 5,
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
  bigDescriptionContainer: {
    marginTop: 5,
    backgroundColor: 'white',
  },
  bigDescription: {
    color: 'black',
    fontSize: 15,
    margin: 20,
  },
  postContainer: {
    backgroundColor: 'white',
    marginBottom: 5,
  },
  postTextContainer: {
    alignItems: 'center',
    margin: 20
  },
  postText: {
    fontSize: 15,
    color: 'black'
  },
  postsContainer: {
    marginTop: 5,
  },
});
