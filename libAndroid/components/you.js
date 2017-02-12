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
import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-menu';
import ImagePicker from 'react-native-image-crop-picker';
const { width, height } = Dimensions.get('window');
import { reduxStore } from '../containers/App';
export default
class You extends Component {
  constructor(){
    super();
    this.state = {
      you: {},
    };
  }
  componentWillMount(){
    this.setState({you: this.props.store});
  }
  addPhotoGallery(){
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    })
    .then(image => this.sendImage(image))
    .then((path) => {
      let newYou = this.state.you;
      newYou.path = path;
      this.setState({you: newYou});
    })
  }
  addPhotoCamera(){
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true
    })
    .then(image => this.sendImage(image))
    .then((path) => {
      let newYou = this.state.you;
      newYou.path = path;
      this.setState({you: newYou});
    })
  }
  async sendImage(image){
    const { fullName, email, uname, password, id } = this.state.you;
    let data = new FormData();
    if(image){
      data.append('avatar', {
          uri: image.path,
          name: uname,
          type: 'image/jpg'
      });
    }
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('uname', uname);
    data.append('password', password);
    data.append('id', id);
    const request_options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }
    const fetched = await fetch('http://192.168.8.108:8080/change_user_avatar', request_options);
    const jsoned = await fetched.text();
    return jsoned;
  }
  render(){
    let usersPosts;
    try{
      usersPosts = !this.state.you.posts ? null : this.state.you.posts.map((post, idx) => {
        return(
          <View
            key={idx}
            style={{backgroundColor: 'white',marginBottom: 5}}>
            <View
              style={{alignItems: 'center',margin: 20}}>
              <Text style={{fontSize: 15,color: 'black'}}>{post.title}</Text>
            </View>
          </View>
        );
      });
    }catch(e) {
      console.log(e);
    }
    let aboutTheAuthorBigDescription;
    try{
      aboutTheAuthorBigDescription = !this.state.you.bigDescription ? null : 
      (
        <View>
          <View style={{marginTop: 5,alignItems: 'center',backgroundColor: 'white'}}>
            <Text style={{color: 'black',fontSize: 18}}>About the author</Text>
          </View>
          <View style={{marginTop: 5,backgroundColor: 'white'}}>
            <Text style={{color: 'black',fontSize: 15,margin: 20}}>{this.state.you.bigDescription}</Text>
          </View>
        </View>
      )
    }catch(e){
      console.log(e);
    }
    let aboutTheAuthorShortDescription;
    try{
      aboutTheAuthorShortDescription = !this.state.you.shortDescription ? <Text>''</Text> :
      (
        <Text
          style={{marginTop: 2,marginLeft: 40,color: 'black',fontSize: '200',fontSize: 14}}>
          {this.state.you.shortDescription}
        </Text>
      )
    }catch(e){
      console.log(e);
    }
    return(
      <MenuContext style={{ flex: 1 }}>
        <ScrollView style={{backgroundColor: '#f0d6c9',height: height}}>
          <View style={style.container}>
            <View style={{backgroundColor: 'white'}}>
              <View style={{justifyContent: 'center', alignItems: 'center',}}>
                <Menu onSelect={(value) => {
                    value ? this.addPhotoCamera() : this.addPhotoGallery()
                  }}>
                  <MenuTrigger style={{}}>
                    <Image
                      style={{width: 100,height: 100,borderRadius: 1000}}
                      source={ this.state.you.path ? {uri : `http://192.168.8.108:8080/${this.state.you.path}`} : require('../assets/trump.jpg')}
                    />
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={{width: 120}}>
                    <MenuOption value={0}>
                      <Text>choose picture from gallery</Text>
                    </MenuOption>
                    <MenuOption value={1}>
                      <Text>take a picture</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
              <View style={{margin: 15,flexDirection: 'row'}}>
                <View style={{width: width * 0.7}}>
                  <Text 
                    style={{marginTop: 10,marginLeft: 40,color: 'black',fontSize: 'bold',fontSize: 20}}>
                    {this.state.you.fullName}
                  </Text>
                  <Text
                    style={{marginLeft: 40,color: 'black',fontSize: '300',fontSize: 13}}>
                    @{this.state.you.uname}
                  </Text>
                </View>
              </View>
              {aboutTheAuthorBigDescription}
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{marginLeft: 25,marginBottom: 10,backgroundColor: '#DAA4E7',borderRadius: 7}}>
                  <Text style={{fontSize: 10,margin: 5}}>followers|123123</Text>
                </View>
                <View style={{marginRight: 25,marginBottom: 10}}>
                  <TouchableOpacity>
                    <Image 
                      source={require('../assets/writePost.png')}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.props._logout()} style={{marginTop: 5, backgroundColor: 'white', alignItems: 'center'}}>
              <Text style={{color: 'red', margin: 15, fontSize: 22}}>Log out</Text>
            </TouchableOpacity>
            <View style={{marginTop: 5,alignItems: 'center',backgroundColor: 'white'}}>
              <Text style={{color: 'black',fontSize: 18}}>Posts</Text>
            </View>
            <View style={{marginTop: 5}}>
              {usersPosts}
            </View>
          </View>
        </ScrollView>
      </MenuContext>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d6c9',
    marginTop: 5,
  },
  dropdown: {
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
