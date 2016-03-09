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

var styles = require('./styles').detailView;


class StoryDetailView extends Component {

  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onDeHighlight}
        >
          <View style={styles.cellContainer}>
            <Image
              source={{uri: this.props.media.artworkUrl100}}
              style={styles.cellImage}
            />
            <View style={styles.cellTextContainer}>
              <Text style={styles.mediaName}>
                {this.props.story.Introduction}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};

module.exports = StoryDetailView;
