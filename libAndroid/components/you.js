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
          style={{backgroundColor: 'white',marginBottom: 5}}>
          <View
            style={{alignItems: 'center',margin: 20}}>
            <Text style={{fontSize: 15,color: 'black'}}>{post.title}</Text>
          </View>
        </View>
      );
    });
    return(
      <ScrollView style={{backgroundColor: '#f0d6c9',height: height}}>
        <View style={style.container}>
          <View style={{backgroundColor: 'white'}}>
            <View style={{margin: 15,flexDirection: 'row'}}>
              <Image
                style={{width: 50,height: 50,borderRadius: 1000,marginLeft: 10}}
                source={require('../assets/trump.jpg')}
              />
              <View style={{width: width * 0.7}}>
                <Text 
                  style={{marginTop: 10,marginLeft: 40,color: 'black',fontSize: 'bold',fontSize: 20}}>
                  {store[0].author.fullName}
                </Text>
                <Text
                  style={{marginTop: 2,marginLeft: 40,color: 'black',fontSize: '200',fontSize: 14}}>
                  {store[0].author.ShortDescription}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: 25,marginBottom: 10,backgroundColor: '#DAA4E7',borderRadius: 7}}>
                <Text style={{fontSize: 10,margin: 5}}>followers|123123</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 5,alignItems: 'center',backgroundColor: 'white'}}>
            <Text style={{color: 'black',fontSize: 18}}>About the author</Text>
          </View>
          <View style={{marginTop: 5,backgroundColor: 'white'}}>
            <Text style={{color: 'black',fontSize: 15,margin: 20}}>{store[0].author.bigDescription}</Text>
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
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d6c9',
    marginTop: 5,
  },
});
