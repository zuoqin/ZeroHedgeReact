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
  BackAndroid, 
  ProgressBarAndroid,
} = React;

var styles = require('./styles');
var StoriesListView = require('./stories-list-view');
var BGWASH = 'rgba(255,255,255,0.8)';
const Dimensions = require('Dimensions');
const AndroidWindow = Dimensions.get('window');

class StoryDetailView extends Component {
  componentDidMount() {
      //the '.bind(this)' makes sure 'this' refers to 'StoryDetailView'
      BackAndroid.addEventListener('hardwareBackPress', function() {
          this.props.navigator.pop();
          return true;
      }.bind(this));
  }


  render() {
    return (
      
      <View style={styles.global.content}>
          <WebView

            style={{
              padding: 0,
              backgroundColor: '#2E6DA4',
              height: 50,
            }}
            source={{html: ('<div  style="font-size:18px; padding: 0; color:white" align="center">' + 
              this.props.passProps.storyItem.Title + '</div>')}}
            scalesPageToFit={true}
            automaticallyAdjustContentInsets={true}
          />    
          <WebView
            style={{
              backgroundColor: BGWASH,
              height: AndroidWindow.height - 70,
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
