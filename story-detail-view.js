'use strict';
import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator,
  TextInput,
  TouchableWithoutFeedback,
  ListView,
  BackAndroid,
  ProgressBarAndroid,
  Dimensions
} from 'react-native';



import { WebView } from 'react-native-webview';
import * as styles_global from './styles/global'

// var StoriesListView = require('./stories-list-view');
var BGWASH = 'rgba(255,255,255,0.8)';
//const Dimensions = require('Dimensions');
const AndroidWindow = Dimensions.get('window');

var references = new Array();
var STORY_URL = 'https://zh.eliz.club/story?url=';

var styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 1
  },

  cellImage: {
    height: 80,
    width: 60,
    marginRight: 8,
    resizeMode: 'contain'
  },

  cellTextContainer: {
    flex: 1,
  },

  cellTextPublished: {
    color: '#000000',
    flex: 1,
    fontSize: 10
  },
  cellTextTitle: {
    flex: 1,
    backgroundColor: '#2E6DA4',
    fontWeight: 'bold',
    color: '#FFFFFF',
    height: 40
  },

  cellTextIntroduction: {
    flex: 1,
    backgroundColor: BGWASH,
    height: 110
  },

  mediaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mediaDescription: {
    fontSize: 12,
    color: '#999',
    flex: 1
  },
  mediaYear: {
    fontWeight: 'bold'
  }
});


class StoryDetailView extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      state: 0,
    };
  };
  static navigationOptions = {
    headerShown: false,
    headerMode: 'none'
  };
  componentWillUnmount() {
    //BackAndroid.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.state.exit = 1;
    //this._showAlert("jhh6666", "66666kjhkhjkhjkh");
  }


  componentDidMount() {
      //the '.bind(this)' makes sure 'this' refers to 'StoryDetailView'
      //BackAndroid.addEventListener('hardwareBackPress', this.handleBackPress.bind(this));
  }

  onNavigationStateChange(navState) {
    // if (references.length > 0 ) {
    //   if (references[references.length - 1] !== navState.url) {
    //     references.push(navState.url);
    //   }
    // } else{
    //   references.push(navState.url);
    // }
    //
    // var sTitle = this.props.passProps.storyItem.Title;
    // if(navState.title.length > 0 && navState.title.indexOf('take5people') < 0 && navState.title !== 'Zero Hedge')
    //   sTitle = navState.title;
    //
    // this.setState({
    //   uri: navState.url,
    //   title: sTitle,
    //   exit: 0
    // });
  }

  render() {
    console.log(this.props.navigation.state.params.story.title);
    return (

      <View style={styles.cellTextContainer}>

      <WebView
        style={{
          backgroundColor: BGWASH,
          marginTop: 30,
        }}
        automaticallyAdjustContentInsets={true}
        javaScriptEnabled={true}
        source= {{uri: STORY_URL + this.props.navigation.state.params.story.reference}}
        scalesPageToFit={true}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}

        ref={(c) => this._input = c}
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


  _showAlert(title, message) {
    console.log('1111111Ask me later pressed');
    // Works on both iOS and Android
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

};



module.exports = StoryDetailView;
