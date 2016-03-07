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
  TouchableWithoutFeedback
} from 'react-native';

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

class SearchBar extends Component {
  render() {
    return (
        <View style={styles.listView.searchBar}>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Search ZeroHedge'
            returnKeyType='search'
            enableReturnKeyAutomatically={true}
            style={styles.listView.searchBarInput}
            onEndEditing={this.props.onSearch}
          />
        </View>
    )
  }
}

class StoriesListView extends Component {
  render() {
    return (
        // <TouchableHighlight onPress={

        //     // Works on both iOS and Android
        //     Alert.alert(
        //       'Alert Title',
        //       'My Alert Msg',
        //       [
        //         {text: 'Ask me later111', onPress: () => console.log('Ask me later pressed')},
        //         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //         {text: 'OK', onPress: () => console.log('OK Pressed')},
        //       ]
        //     )

        //   }>
        //   <Image
        //     style={styles.button}
        //     source={require('image!myButton')}
        //   />
        // </TouchableHighlight>        
        <View style={styles.global.content}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a mi auctor urna sagittis lobortis id vel magna. Morbi mattis nibh maximus dui imperdiet, ut efficitur orci malesuada. Duis rhoncus dolor quis mi viverra, sed eleifend odio auctor. Nam vel consequat elit. Sed turpis orci, sodales vel eleifend eu, feugiat non arcu. Nam posuere mauris id consequat sollicitudin. Aliquam lacinia eros vitae condimentum finibus. Pellentesque sit amet massa tincidunt, hendrerit purus in, dictum ipsum. Phasellus interdum vitae arcu non pretium. Ut dictum turpis in neque luctus tincidunt.
          </Text>
        </View>    
    )
  }
}


class StoryView extends Component {
  render() {
    return (
        <WebView
          style={{
            backgroundColor: BGWASH,
            height: 100,
          }}
          source={{html: HTML}}
          //javaScriptEnabled={true}
          //domStorageEnabled={true}
          //decelerationRate='normal'
          //startInLoadingState={true}
          //source={{
          //  uri: 'http://www.take5people.cn/ZeroHedge/story/aHR0cDovL3d3dy56ZXJvaGVkZ2UuY29tL25ld3MvMjAxNi0wMi0xMS9saW5lcy1hcm91bmQtYmxvY2stYnV5LWdvbGQtbG9uZG9uLWJhbmtzLXBsYWNpbmctdW51c3VhbGx5LWxhcmdlLW9yZGVycy1waHlzaWNhbA==',
          //  method: 'GET',
          //  body: ''
          //}}
          scalesPageToFit={true}
        />
    )
  }
}

class ZeroHedge extends Component {
  render() {
    return (
        <TouchableWithoutFeedback onPress={this._handlePress}>
          <Text onPress={

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

          }>
            hhhkjh
          </Text>
        </TouchableWithoutFeedback>        

      // <Navigator
      //     navigationBar={
      //       <View style={styles.global.mainContent}>
      //         <StatusBar
      //              backgroundColor='green'
      //              barStyle='light-content'/>
      //         <View style={styles.navbar.appearance}>
      //           <Text  style={[styles.navbar.title, componentStyles.titleItalic,{
      //             fontWeight: 'bold'
      //           }]}>Zero Hedge</Text>
      //           <Text style={styles.navbar.button}>Search</Text>
      //         </View>
      //       </View>        

      //     } //navigationBar
      //     initialRoute={{
      //       name: 'My First Scene',
      //       rightButtonTitle: 'Search',
      //       index: 0
      //     }}
      //     renderScene={(route, navigator) =>
      //       <StoriesListView
      //         title={route.title}
      //         name={route.name}
      //         onForward={() => {
      //           var nextIndex = route.index + 1;
      //           navigator.push({
      //             name: 'Scene ' + nextIndex,
      //             index: nextIndex,
      //           });
      //         }}
      //         onBack={() => {




      //           if (route.index > 0) {
      //             navigator.pop();
      //           }
      //         }}
      //       /> // StoriesListView
      //     } // renderScene
      //   /> // Navigator

    );
  }
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
