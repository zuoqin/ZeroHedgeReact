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
  TouchableHighlight,
  Image,
} from 'react-native';

var styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 4
  },
  cellImage: {
    height: 80,
    width: 60,
    marginRight: 8,
    resizeMode: 'contain'
  },
  cellTextContainer: {
    flex: 1
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
                  height: 30,
                }}
                automaticallyAdjustContentInsets={false}
                source={{html: this.props.story.Title}}
                scalesPageToFit={true}
              />              
              <WebView
                style={{
                  backgroundColor: BGWASH,
                  height: 100,
                }}
                automaticallyAdjustContentInsets={false}
                source={{html: this.props.story.Introduction}}
                scalesPageToFit={true}
              />   

            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};


module.exports = StoryIntroCell;