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

var references = new Array();
var STORY_URL = 'http://www.take5people.cn:8083/story/';
//var STORY_URL = 'http://192.168.123.118:8083/story/';

class StoryDetailView extends Component {

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.state.exit = 1;
    //this._showAlert("jhh6666", "66666kjhkhjkhjkh");
  }

  handleBackPress() {
        if( this.state.exit === 0 )
        {
          if (references.length < 1) {
            //this._showAlert("jhh333333", "3333kjhkhjkhjkh");
            this.props.navigator.pop();
          }
          else
          {
            var newUrl = references.pop();
            if (this.state !== null) {
              if (this.state.uri === newUrl) {
                if (references.length < 1) {
                    //this._showAlert("jhh2222", "2222kjhkhjkhjkh");
                    this.props.navigator.pop();
                }
                else
                {
                  newUrl = references.pop();  
                  //this._showAlert("jhh99955", "999955kjhkhjkhjkh");
                  this.setState({
                    uri: newUrl
                  });                  
                }                
              }
              else{
                //this._showAlert("jhh4455", "4455kjhkhjkhjkh");
                this.setState({
                  uri: newUrl
                });                
              }              
            }
            else
            {
              //this._showAlert("jhh", "kjhkhjkhjkh");
              this.props.navigator.pop();              
            }
          }
          return true;
        }
        else
        {
          return true;
        }

  }
  componentDidMount() {
      //the '.bind(this)' makes sure 'this' refers to 'StoryDetailView'
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackPress.bind(this));
  }

  onNavigationStateChange(navState) {
    if (references.length > 0 ) {
      if (references[references.length - 1] !== navState.url) {
        references.push(navState.url);    
      }
    } else{
      references.push(navState.url);  
    }
    
    var sTitle = this.props.passProps.storyItem.Title;
    if(navState.title.length > 0)
      sTitle = navState.title;

    this.setState({
      uri: navState.url,
      title: sTitle,
      exit: 0
    });
  }

  render() {
    return (
      
      <View style={styles.global.content}>
          <WebView

            style={{
              padding: 0,
              backgroundColor: '#2E6DA4',
              height: 55,
            }}
            source={{html: (
              '<div style="display:table">' +
              '<div  style="display:table-cell; height:45px; vertical-align: middle; font-size:18px; padding: 0; color:white; align="center">' + 
              (this.state === null ? this.props.passProps.storyItem.Title : this.state.title) + 
              '</div></div>')}}
            scalesPageToFit={true}
            automaticallyAdjustContentInsets={true}
          />    
          <WebView
            style={{
              backgroundColor: BGWASH,
              height: AndroidWindow.height - 75,
            }}
            automaticallyAdjustContentInsets={true}
            javaScriptEnabled={true}
            source= {{uri: (this.state === null ? (STORY_URL + this.props.passProps.storyItem.Reference) : this.state.uri)}}
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