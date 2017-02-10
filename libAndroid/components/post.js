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
export default
class Post extends Component {
  constructor(){
    super();
    this.state = {liked : false};
  }
  _navigate(propName, name) {
  }
  render(){
    const getTags = this.props.post.tags.map((tag, idx) => {
      return tag + '  ';
    });
    const getComments = this.props.post.comments.map((comment, idx) => {
      return(
        <View key={idx} style={{backgroundColor: 'white',marginTop: 3,flexDirection: 'row'}}>
          <Image
            style={{width: 50,height: 50,borderRadius: 1000,marginLeft: 20}}
            source={require('../assets/trump.jpg')}
          />
          <View>
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'black'}}>{comment.author.fullName}</Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Text>{comment.time}</Text>
            </View>
            <View style={{alignItems: 'center',margin: 10}}>
              <Text style={{fontSize: 14,color: 'black'}}>{comment.text}</Text>
            </View>
          </View>
        </View>
      )
    });
    return(
      <View style={style.container}>
        <ScrollView>
          <View style={{backgroundColor: 'white'}}>
            <View style={{alignItems: 'center',marginTop: 20,marginLeft: 20,marginRight: 20,marginBottom: 10}}>
              <Text style={{fontSize: 22,fontWeight: 'bold',color: 'black'}}>{this.props.post.title}</Text>
            </View>
            <View style={{flexDirection: 'row',marginLeft: 20,marginBottom: 10,marginRight: 20,justifyContent: 'center'}}>
              <Text style={{color: 'black',fontWeight: '100',fontSize: 12}}>
                {getTags}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 50,height: 50,borderRadius: 1000,marginLeft: 20}}
                source={require('../assets/trump.jpg')}
              />
              <View>
                <View style={{marginLeft: 10}}>
                  <Text style={{color: 'black'}}>{this.props.post.author.fullName}</Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>{this.props.post.time}</Text>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center',margin: 20}}>
              <Text style={{fontSize: 15,color: 'black'}}>{this.props.post.text}</Text>
            </View>
          </View>
          <View style={{marginTop: 5,alignItems: 'center',backgroundColor: 'white'}}>
            <Text style={{color: 'black',fontSize: 18}}>About the author</Text>
          </View>
          <View style={{marginTop: 5,alignItems: 'center',backgroundColor: 'white',flexDirection: 'row'}}>
            <Image
              style={{width: 50,height: 50,borderRadius: 1000,marginLeft: 20}}
              source={require('../assets/trump.jpg')}
            />
            <View>
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'black'}}>{this.props.post.author.fullName}</Text>
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'black'}}>{this.props.post.author.ShortDescription}</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 5,alignItems: 'center',backgroundColor: 'white'}}>
            <Text style={{color: 'black',fontSize: 18}}>Comments</Text>
          </View>
          {getComments}
        </ScrollView>
        <View style={{backgroundColor: 'white',marginTop: 2}}>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <TouchableOpacity 
              style={this.state.liked ? style.likesContainerUnLike : style.likesContainerLike}
              activeOpacity={1}
              onPress={() => this.setState({liked: this.state.liked ? false : true}) }>
              <Text style={this.state.liked ? style.likesUnLike : style.likesLike}>{this.state.liked ? `UnLike` : `Like`}|{this.props.post.likes}</Text>
            </TouchableOpacity>
            <View 
              style={{margin: 5}}>
              <Text style={{color: 'black',margin: 2}}>Seen|{this.props.post.seen}</Text>
            </View>
            <View 
              style={{margin: 5}}>
              <Text style={{color: 'black',margin: 2}}>Comments|{this.props.post.comments.length}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={{backgroundColor: 'black',alignItems: 'center'}}
            activeOpacity={1}
            onPress={() => this.props.navigator.pop()}>
            <Text style={{color: 'white',fontSize: 20}}>X</Text>
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
});
