import React, { Component } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native'
import Feed from './feed';
import You from './you';
import ForumSelector from './forumSelector';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import {getFeed} from './registration';
import { reduxStore } from '../containers/App';
const { width, height } = Dimensions.get('window');
let store;
export default class FootBar extends Component {
  _navigate(propName, name) {
  }
  render() {
      return (
      <View style={style.container}>
        <StatusBar backgroundColor="#bf0e0e" barStyle="light-content" />
        <ScrollableTabView
          style={{marginTop: 20}}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar/>}
          tabBarActiveTextColor='#bf0e0e'
          tabBarUnderlineStyle={{backgroundColor: '#bf0e0e'}}
        >
           <Feed tabLabel="Feed" store={store} navigator={this.props.navigator}/>
           <You _logout={() => this.props._logout()} tabLabel="You" store={store} navigator={this.props.navigator} />
           <ForumSelector tabLabel="Forum" navigator={this.props.navigator} />
         </ScrollableTabView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  feedButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  youButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    height: 20,
    width: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  headerTextContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerText: {
    fontSize: 17,
    color: 'black',
  },
})