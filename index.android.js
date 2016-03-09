/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
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
} from 'react-native';

var StoryDetailView = require('./story-detail-view');

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  </head>
  <body>
    <h1>Hello Static World</h1>
  </body>
</html>
`;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var StoriesListView = require('./stories-list-view');

var styles = require('./styles');



class ZeroHedge extends Component {

  _renderScene(route, navigator) {
     var routeId = route.id;

     if (routeId === 'StoriesList') {
         return (
          <StoriesListView
            navigator={navigator}
            title={route.title}
            name={route.name}
          /> 
          );
     }

    if (routeId === 'StoryDetail') {
         return (
          <StoryDetailView
            navigator={navigator}
            title={route.title}
            name={route.name}
          /> 
          );           
    }
  };


  render() {
    return (
      <Navigator

        navigationBar={
          <View style={styles.global.mainContent}>
            <StatusBar
                 backgroundColor='green'
                 barStyle='light-content'
            />
            <TouchableWithoutFeedback onPress={this._handlePress}>
              <Text style={styles.navbar.button}>Search</Text>
            </TouchableWithoutFeedback>
          </View>

        } //navigationBar

        initialRoute={{
          component: StoryDetailView,
          name: 'Stories List',
          title: 'ZeroHedge Stories',
          id: 'StoryDetail'
        }}

        renderScene={(route, navigator) =>
          this._renderScene(route, navigator)
        }
      />
    );
  };

  _handlePress() {
    console.log('1111111Ask me later pressed');
    // Works on both iOS and Android
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )    
  }  


  _showAlert(message) {
    console.log(message);
    // Works on both iOS and Android
    Alert.alert(
      'Searching alert',
      message,
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )    
  }  
}

var styles = require('./styles');
//var navbarStyle = require('./styles/navbar');
//var globalStyle = require('./styles/global');

var componentStyles = StyleSheet.create({
  titleItalic: {
    fontStyle: 'italic',
    fontWeight: 'normal'
  }
});

AppRegistry.registerComponent('ZeroHedge', () => ZeroHedge);
