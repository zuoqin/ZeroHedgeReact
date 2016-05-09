'use strict';
import React, { Component } from 'react';


import {
  Alert,
  AppRegistry,
  StyleSheet,
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
                Body:'<p>While real estate is all about &quot;location, location, location,&quot; it appears there are sometimes more prescient factors that any prospective buyer should pay attention to. Amid <a href=\"http:\/\/take5people.cn:8083\/story\/aHR0cDovL3d3dy56ZXJvaGVkZ2UuY29tL25ld3MvMjAxNi0wMy0xOC9zdHVubmluZy1zaXplLWNoaW5hcy1ob3VzaW5nLWJ1YmJsZS1vbmUtY2hhcnQ=\">yet another government-fueled housing bubble<\/a>, it seems in their haste to fulfil a rapacious demand for property in which to gamble their hard-grafted assets, Chinese construction companies have cut a few corners. As the following stunning video shows, <strong>a &quot;newly constructed apartment&quot; crumbles before the owners&#39; eyes as the &#39;concrete&#39; walls turn to sand<\/strong>...<\/p>\n<p>LiveLeak exposes, in the following video, just how poor the standards can be of so-called &ldquo;new&rdquo; properties. LiveLeak footage shows two men in a supposedly &ldquo;new apartment building&rdquo; in China where the concrete walls crumble like sand.<\/p>\n<p><iframe allowfullscreen=\"\" frameborder=\"0\" height=\"360\" src=\"https:\/\/www.youtube.com\/embed\/KeLyr5hh9Uc\" width=\"480\"><\/iframe><\/p>\n<p><strong>China is currently in the midst of a huge property bubble<\/strong>...<\/p>\n<p><a href=\"http:\/\/www.zerohedge.com\/sites\/default\/files\/images\/user5\/imageroot\/2016\/02\/24\/20160228_chinahome.jpg\"><img height=\"256\" src=\"http:\/\/www.zerohedge.com\/sites\/default\/files\/images\/user5\/imageroot\/2016\/02\/24\/20160228_chinahome_0.jpg\" width=\"485\" \/><\/a><\/p>\n<p>&nbsp;<\/p>\n<p>And the country is full of &ldquo;ghost cities&rdquo; and new apartment blocks waiting to be filled. Which is no surprise considering that China used about 6.4 gigatons of cement during their construction boom between 2011 and 2013, which is more than what the US used during the entire 20th century. <strong>However, those housing properties in China are frequently not built to stand the test of time: In 2010, officials revealed that many homes had a lifespan of just 20 years.<\/strong><\/p>\n<p>Just like buying worthless companies in the stock market bubble ended very badly, it appears buying &#39;worthless&#39; homes is set for the same outcome...<\/p>\n<p><a href=\"http:\/\/www.zerohedge.com\/sites\/default\/files\/images\/user5\/imageroot\/2016\/03\/13\/20160318_china.jpg\"><img height=\"259\" src=\"http:\/\/www.zerohedge.com\/sites\/default\/files\/images\/user5\/imageroot\/2016\/03\/13\/20160318_china_0.jpg\" width=\"491\" \/><\/a><\/p>\n<p>&nbsp;<\/p>\n<p>Quick, back into stocks<\/p>\n\n\n',
                Title: 'Keith Olbermann Unleashes On Donald Trump: &quot;I Am Moving Out Of Your Building&quot;',
                Introduction: '<p>"Okay, Donnie, you win.&nbsp; I’m moving out.&n…l recently, anyway) — but I’m out of here."</p>',
                Updated: '2016-03-10T13:28:31.9412500+08:00',
                Reference: 'aHR0cDovL3d3dy56ZXJvaGVkZ2UuY29tL25ld3MvMjAxNi0wMy0zMC9hbGwtaGVsbC1icmVha3MtbG9vc2UtYWZ0ZXItdHJ1bXAtc2F5cy13b21lbi1tdXN0LWJlLXB1bmlzaGVkLWhhdmluZy1hYm9ydGlvbnM='
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