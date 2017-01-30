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
  ActivityIndicator,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default
class ForumPage extends Component {
  constructor(){
    super();
    this.state = {
      msg: '',
      messages: null,
      fetchedInfo: false,
    }
  }
  getInfo(){
    console.log('hey');
    const request_options = {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body:JSON.stringify({
        fetchTitle: this.props.topic.fetchTitle,
      })
    };
    fetch(`http://10.15.2.198:8080/getInfo`, request_options)
      .then((res) => res.json())
      .then((res) => this.setState({messages: res.msgs, fetchedInfo: true}) );
    };
  async postMsg(){
    const request_options = {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body:JSON.stringify({
        msg: this.state.msg,
      })
    };
    await fetch(`/${this.props.topic.fetchTitle}/postMsg`, request_options);
    this.setState({msg: ''});
  }
  renderLoadingView(){
   return (
     <View style={{flex: 1,backgroundColor: 'white', marginTop: 0.05*height}}>
       <View style={{backgroundColor: 'white', height: height * 0.1, marginTop: 5, marginBottom: 5, justifyContent: 'center', alignItems: 'center'}}>
         <Text style={{color: 'black', fontSize: 30, fontWeight: '800'}}>
           {this.props.topic.title}
         </Text>
       </View>
       <View style={{alignItems: 'center',justifyContent: 'center'}}>
         <ActivityIndicator />
         <Text>
           Receiving messages...
         </Text>
       </View>
     </View>
   );
  }
  render(){
    if (!this.state.fetchedInfo) {
      this.getInfo();
      return this.renderLoadingView();
    }
    const getMsgs = this.state.messages.map((msg, idx) => {
      return(
        <View key={idx} style={{backgroundColor: 'white',marginTop: 3,flexDirection: 'row',}}>
          <Image
            style={{width: 50,height: 50,borderRadius: 1000,margin: 10}}
            source={require('../assets/trump.jpg')}
          />
          <View>
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'black'}}>{msg.author.fullName}</Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Text>{msg.time}</Text>
            </View>
            <View style={{alignItems: 'center',margin: 10}}>
              <Text style={{fontSize: 14,color: 'black', width: 3*width/4 }}>{msg.text}</Text>
            </View>
          </View>
        </View>
      )
    });
    return(
      <View style={{flex: 1,marginTop: 0.05 * height, backgroundColor: '#f0d6c9'}}>
        <View style={{backgroundColor: 'white', height: height * 0.1, marginTop: 5, marginBottom: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 30, fontWeight: '800'}}>
            {this.props.topic.title}
          </Text>
        </View>
        <ScrollView>
          {getMsgs}
        </ScrollView>
        <View style={{backgroundColor: '#bf0e0e', flexDirection: 'row'}}>
          <View style={{margin: 5, borderRadius: 10, backgroundColor: '#f0d6c9', width: width * 0.75}}>
            <TextInput onChangeText={(msg) => this.setState({msg})} style={{height: 40}} multiline={true} underlineColorAndroid='#f0d6c9' placeholder='write a message'/>
          </View>
          <TouchableOpacity 
            style={{
              width: width * 0.2, 
              borderRadius: 10, 
              margin: 5, 
              backgroundColor: '#edc410', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}
            activeOpacity={0.9}
            onPress={() => this.postMsg()}
          >
            <Text style={{color: 'black'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
