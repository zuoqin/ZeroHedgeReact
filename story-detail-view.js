'use strict';

var React = require('react-native');
var {
  Alert,
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  WebView,
  StatusBar,
  Navigator,
  TextInput,
  TouchableWithoutFeedback,
  ListView,
  ProgressBarAndroid,
} = React;

var styles = require('./styles');
var StoriesListView = require('./stories-list-view');
var BGWASH = 'rgba(255,255,255,0.8)';

class StoryDetailView extends Component {

  render() {
    return (
      
      <View style={styles.global.content}>
        <TouchableWithoutFeedback onPress={this._handlePress1.bind(this)}>
          <Text>HHHHH</Text>
        </TouchableWithoutFeedback>
          <WebView
            style={{
              backgroundColor: BGWASH,
              height: 100,
            }}
            source={{html: this.props.passProps.storyItem.Title}}
            scalesPageToFit={true}
            automaticallyAdjustContentInsets={true}
          />    
          <WebView
            style={{
              backgroundColor: BGWASH,
              height: 3000,
            }}
            automaticallyAdjustContentInsets={true}
            source={{html: this.props.passProps.storyItem.Body}}
            scalesPageToFit={true}
          />             
        
      </View>
    );
  }

  _handlePress1() {
    console.log('2222Ask me later pressed');
    this.props.navigator.pop()
    //push({
    //  title: 'Stories List',
    //  component: StoriesListView,
    //  id: 'StoriesList'
    //});
  }  

};

module.exports = StoryDetailView;
