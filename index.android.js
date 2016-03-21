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

var HEADER = '#3b5998';

var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var StoriesListView = require('./stories-list-view');

var styles = require('./styles');



class ZeroHedge extends Component {

  _renderScene(route, navigator) {
      var routeId = route.id;


     // var storyItem = {
     //   Body:'"<p>"Okay, Donnie, you win.&nbsp; I’m moving out.&nbsp; Not moving out of the country — not yet anyway. I’m merely moving out of one of New York’s many buildings slathered in equal portions with gratuitous gold and the name “Trump.” Nine largely happy years with an excellent staff and an excellent reputation (until recently, anyway) — but I’m out of here."</p> "',
     //   Title: 'Keith Olbermann Unleashes On Donald Trump: &quot;I Am Moving Out Of Your Building&quot;',
     //   Introduction: '<p>"Okay, Donnie, you win.&nbsp; I’m moving out.&n…l recently, anyway) — but I’m out of here."</p>',
     //   Updated: '2016-03-10T13:28:31.9412500+08:00',
     //   Reference: 'aHR0cDovL3d3dy56ZXJvaGVkZ2UuY29tL25ld3MvMjAxNi0wMy0wOS9rZWl0aC1vbGJlcm1hbm4tcHVuaXNoZXMtZG9uYWxkLXRydW1wLWktYW0tbW92aW5nLW91dC15b3VyLWJ1aWxkaW5n'
     //}
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
            passProps={route.passProps}
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
          </View>

        } //navigationBar

        initialRoute={{
          component: StoriesListView,
          name: 'Stories List',
          title: 'ZeroHedge Stories',
          id: 'StoriesList',
          passProps: {
            storyItem: {
                Body:'"<p>"Okay, Donnie, you win.&nbsp; I’m moving out.&nbsp; Not moving out of the country — not yet anyway. I’m merely moving out of one of New York’s many buildings slathered in equal portions with gratuitous gold and the name “Trump.” Nine largely happy years with an excellent staff and an excellent reputation (until recently, anyway) — but I’m out of here."</p> "',
                Title: 'Keith Olbermann Unleashes On Donald Trump: &quot;I Am Moving Out Of Your Building&quot;',
                Introduction: '<p>"Okay, Donnie, you win.&nbsp; I’m moving out.&n…l recently, anyway) — but I’m out of here."</p>',
                Updated: '2016-03-10T13:28:31.9412500+08:00',
                Reference: 'aHR0cDovL3d3dy56ZXJvaGVkZ2UuY29tL25ld3MvMjAxNi0wMy0wOS9rZWl0aC1vbGJlcm1hbm4tcHVuaXNoZXMtZG9uYWxkLXRydW1wLWktYW0tbW92aW5nLW91dC15b3VyLWJ1aWxkaW5n'        
             }
          }
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

//var navbarStyle = require('./styles/navbar');
//var globalStyle = require('./styles/global');

var componentStyles = StyleSheet.create({
  titleItalic: {
    fontStyle: 'italic',
    fontWeight: 'normal'
  }
});

AppRegistry.registerComponent('ZeroHedge', () => ZeroHedge);