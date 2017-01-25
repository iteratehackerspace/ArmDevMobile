import React, { Component } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'
import Feed from './feed';
import You from './you';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
const { width, height } = Dimensions.get('window');
export default class FootBar extends Component {
  
  _navigate(propName, name) {
    if(propName === 'toWritePost'){
      this.props.navigator.push({
        name: 'WritePost',
        rightButton: (
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={() => {
              this.props.navigator.pop();
            }}>
            <Text style={style.headerText}>Post</Text>
          </TouchableOpacity>
        ),
        leftButton: (
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={() => {
              this.props.navigator.pop();
            }}>
            <Text style={style.headerText}>Close</Text>
          </TouchableOpacity>
        ),
        passProps: {
        },
      });
    }
  }
  render() {
    return (
      <View style={style.container}>
        <ScrollableTabView
          style={{marginTop: 20}}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar/>}
          tabBarActiveTextColor='#bf0e0e'
          tabBarUnderlineStyle={{backgroundColor: '#bf0e0e'}}
        >
           <Feed tabLabel="Feed" navigator={this.props.navigator}/>
           <You tabLabel="You" navigator={this.props.navigator} />
         </ScrollableTabView>
      </View>
    );
  }
}

    // <Image
    //   style={style.imageStyle}
    //   source={require('../assets/writePost.png')}
    // />
    // <Image
    //   style={style.imageStyle}
    //   source={require('../assets/youButton.png')}
    // />
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