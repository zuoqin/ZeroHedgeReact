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

class StoryDetailView extends Component {

  render() {
    return (
      
      <View style={styles.global.content}>
        <TouchableWithoutFeedback onPress={this._handlePress1.bind(this)}>
          <Text style={styles.navbar.button}>Search</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _handlePress1() {
    console.log('2222Ask me later pressed');
    this.props.navigator.push({
      title: 'Stories List',
      component: StoriesListView,
      id: 'StoriesList'
    });
  }  

};

module.exports = StoryDetailView;
