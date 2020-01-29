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
  ProgressBarAndroid,
  TouchableHighlight,
  Image,
} from 'react-native';

import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';
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

var BGWASH = 'rgba(255,255,255,0.8)';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        style={{
          backgroundColor: BGWASH,
        }}

        source={{uri: this.props.picture}}
      />
    );
  }
}


class StoryIntroCell extends Component {

  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onDeHighlight}
        >
          <View style={styles.cellContainer}>

            <View style={styles.cellTextContainer}>

              <WebView
                style={{
                  backgroundColor: '#2E6DA4',
                  height: this.props.story.title.length > 100 ? 70 : (this.props.story.title.length > 50 ? 50 :30),
                }}
                scalesPageToFit={true}
                viewportContent={'width=device-width, user-scalable=no'}
                source={{html: ('<div style="color:white; word-wrap: break-word; font-size: 250%">' + (this.props.story.title == undefined ? '':this.props.story.title) +'</div>')}}
              />

              <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
              {this.props.story.picture != undefined ?
                <Image
                  style={{width: 100, height: 50}}
                  source={{uri: this.props.story.picture}}
                  /> : null
              }
                <WebView
                  style={{
                    backgroundColor: BGWASH,
                    height: 50
                  }}
                  source={{html: ('<h1 >' + this.props.story.introduction + '</h1>')}}
                />
              </View>
              <WebView
                style={{
                  backgroundColor: BGWASH,
                  height: 30
                }}
                source={{html: this.props.story.updated}}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};


module.exports = StoryIntroCell;
