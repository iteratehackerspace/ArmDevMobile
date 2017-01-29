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
  ScrollView
} from 'react-native';


const { width, height } = Dimensions.get('window');
import arrayOfForumImages from '../assets/forumImages.js';
export default
class ForumSelector extends Component {
  constructor(){
    super();
    this.state = {
      clickIndex: 0,
    };
  }
  _navigate(propName, name) {
    if(propName === 'toForumPage'){
      this.props.navigator.push({
        name: 'ForumPage',
        leftButton: (
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={() => this.props.navigator.pop()}>
            <Text style={style.headerText}>X</Text>
          </TouchableOpacity>
        ),
        passProps: {
          clickIndex: this.state.clickIndex,
          title: name,
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
    const renderIcons = arrayOfForumImages.map((topic, idx) => {
      return(
        <TouchableOpacity 
          style={{backgroundColor: 'white', marginBottom: 5, flexDirection: 'row'}} 
          key={idx}
          activeOpacity={0.9}
          onPressIn={() => this.setState({clickIndex: idx})}
          onPress={() => this._navigate('toForumPage', topic.title)}
        >
          <View>
            <Image
              style={{height: width/2, width: width/2}}
              source={topic.image}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 25, fontWeight: "700", color: 'black', margin: 20}}>{topic.title}</Text>
          </View>
        </TouchableOpacity>
      )
    })
    return(
      <ScrollView style={{backgroundColor: '#f0d6c9',height:height}}>
        <View style={{flex: 1,backgroundColor: '#f0d6c9',marginTop: 5}}>
          {renderIcons}
        </View>
      </ScrollView>
    );
  }
}
const style = StyleSheet.create({
  headerTextContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerText: {
    fontSize: 17,
    color: 'black',
  },
})