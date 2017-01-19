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
  constructor(){
    super();
    this.state = {liked : false};
  }
  _navigate(propName, name) {
  }
  componentWillMount() {
    store = reduxStore.getState().armDevMobile;
  }
  render(){
    const getTags = store[0].post.tags.map((tag, idx) => {
      return tag + '  ';
    });
    const getComments = store[0].post.comments.map((comment, idx) => {
      return(
        <View key={idx} style={style.commentContainer}>
          <Image
            style={style.imageStyle}
            source={require('../assets/trump.jpg')}
          />
          <View>
            <View style={style.authorTextContainer}>
              <Text style={style.authorText}>{comment.author.fullName}</Text>
            </View>
            <View style={style.authorDateContainer}>
              <Text>{comment.time}</Text>
            </View>
            <View style={style.commentTextContainer}>
              <Text style={style.commentText}>{comment.text}</Text>
            </View>
          </View>
        </View>
      )
    });
    return(
      <View style={style.container}>
        <ScrollView>
          <View style={style.postContainer}>
            <View style={style.titleContainer}>
              <Text style={style.title}>{store[0].post.title}</Text>
            </View>
            <View style={style.tagContainer}>
              <Text style={style.tag}>
                {getTags}
              </Text>
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
              <View style={style.authorDescriptionContainer}>
                <Text style={style.authorDescription}>{store[0].post.author.ShortDescription}</Text>
              </View>
            </View>
          </View>
          <View style={style.aboutTheAuthorTextContainer}>
            <Text style={style.aboutTheAuthorText}>Comments</Text>
          </View>
          {getComments}
        </ScrollView>
        <View style={style.footer}>
          <View style={style.upFoot}>
            <TouchableOpacity 
              style={this.state.liked ? style.likesContainerUnLike : style.likesContainerLike}
              activeOpacity={1}
              onPress={() => this.setState({liked: this.state.liked ? false : true}) }>
              <Text style={this.state.liked ? style.likesUnLike : style.likesLike}>{this.state.liked ? `UnLike` : `Like`}|{store[0].post.likes}</Text>
            </TouchableOpacity>
            <View 
              style={style.commentsContainer}>
              <Text style={style.comments}>Seen|{store[0].post.seen}</Text>
            </View>
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
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
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
    borderRadius: 1000,
    marginLeft: 20,
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
  likesContainerLike: {
    margin: 5,
    backgroundColor: '#DAA4E7',
    borderRadius: 5,
  },
  likesLike: {
    color: 'blue',
    margin: 2
  },
  likesContainerUnLike: {
    backgroundColor: '#eed3d3',
    borderRadius: 5,
    margin: 5,
  },
  likesUnLike: {
    color: '#bf0e0e',
    margin: 2,
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
    justifyContent: 'space-between',
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
  footer: {
    backgroundColor: 'white',
    marginTop: 2
  },
  authorDescriptionContainer: {
    marginLeft: 10,
  },
  authorDescription: {
    color: 'black'
  },
  tagContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 20,
    justifyContent: 'center',
  },
  tag: {
    color: 'black',
    fontWeight: '100',
    fontSize: 12,
  },
  commentContainer: {
    backgroundColor: 'white',
    marginTop: 3,
    flexDirection: 'row',
  },
  commentTextContainer: {
    alignItems: 'center',
    margin: 10,
  },
  commentText: {
    fontSize: 14,
    color: 'black',
  }
});
