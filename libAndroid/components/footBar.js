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
import Tabbar from 'react-native-tabbar'
import Feed from './feed';
import You from './you';
const { width, height } = Dimensions.get('window');
export default class FootBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.tabarRef = null
    this.state = {
      tab: 'Feed'
    }
  }
  
  onTabSelect(tab) {
    this.setState({ tab })
  }

  renderTabs() {
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <TouchableOpacity 
          style={style.feedButtonContainer}
          onPress={() => this.onTabSelect('Feed')}>
          <Image
            style={style.imageStyle}
            source={require('../assets/feedButton.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={style.youButtonContainer}
          onPress={() => this.onTabSelect('You')}>
          <Image
            style={style.imageStyle}
            source={require('../assets/youButton.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderContent() {
    const { tab } = this.state
    let content
    switch(tab) {
      case 'Feed':
        content = <Feed navigator={this.props.navigator}/>
        break
      case 'You':
        content = <You navigator={this.props.navigator}/>
        break
    }
    return content
  }

  render() {
    return (
      <View style={style.container}>
          <View>
            {this.renderContent()}
          </View>
        <Tabbar show={true}
                disable={false}
                ref={(ref) => this.tabarRef = ref}
                style={{ 
                  backgroundColor: '#bf0e0e',
                }}>
          {this.renderTabs()}
        </Tabbar>
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
})