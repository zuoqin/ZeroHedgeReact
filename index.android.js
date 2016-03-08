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


var TimerMixin = require('react-timer-mixin');

var API_URL = 'http://www.take5people.cn/ZeroHedge/api/search/';
var LOADING = {};
var resultsCache = {
  dataForQuery: {}
};


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
          placeholder='Search for Zero Hedge stories...'
          returnKeyType='search'
          enablesReturnKeyAutomatically={true}
          style={styles.listView.searchBarInput}
          onChange={this.props.onSearch}
          onEndEditing={this.props.onEndEditing}
          onSubmitEditing={this.props.onSubmitEditing}
        />

        

      </View>

    )
  }
}

class StoriesListView extends Component {
  timeoutID = (null: any);
  

  constructor(props, context) {
    super(props, context);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
      query: '',
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      resultsData: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      }),  
    };
  };


  componentDidMount() {
    this.searchMedia('HSBC');
  };
  getDataSource(stories: Array<any>): ListView.DataSource{
    return this.state.resultsData.cloneWithRows(stories);
  }

  _urlForQuery(query: string) : string{
    if (query) {
      return API_URL + encodeURIComponent(query);
    }
    else{
      return API_URL + encodeURIComponent('HSBC');
    }
  };


  setSearchPostResult(responseData, query){

    LOADING[query] = false;
    console.log(responseData.length);
    resultsCache.dataForQuery[query] = responseData;


    this.state.isLoading = false;
    this.state.resultsData = this.getDataSource(resultsCache.dataForQuery[query]);
  };


  searchMedia(query:string){
    this.timeoutID = null;

    this.state.query = query;


    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.state.isLoading = false;
        this.state.resultsData = this.getDataSource(cachedResultsForQuery);
      } else {
        this.state.isLoading = true;
      }
    } else{
      var queryURL = this._urlForQuery(query);

      if (!queryURL) return;

      this.state.isLoading = true;


      LOADING[query] = true;
      resultsCache.dataForQuery[query] = null;
      var settings = {
        method: "POST"
      };      
      fetch(this._urlForQuery(query), settings)
        .then((response) => response.json())
        .catch((error) => {
          LOADING[query] = false;
          resultsCache.dataForQuery[query] = undefined;

          this.state.isLoading = false;
          this.state.resultsData = this.getDataSource([])
        })
        .then((responseData) => {
            this.setSearchPostResult(responseData, query);
            console.log('On Submit Editing');
          })
    }
  };


  renderSeparator(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    return (
      <View
        key={"SEP_" + sectionID + "_" + rowID}
        style={[styles.listView.rowSeparator, adjacentRowHighlighted && styles.listView.rowSeparatorHighlighted]}
      />
    );
  };

  renderRow(
    story: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunction: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <Text>
        {story.Title}
      </Text>
    );
  };

  render() {
    return (
     
      <View style={styles.global.content}>
        <SearchBar
          onSearch={(event) => {
            var searchString = event.nativeEvent.text;
            console.log(searchString);
          }}
          onEndEditing={(event) => {
            console.log('jkhkjhkj');
            var searchString = event.nativeEvent.text;
            console.log(searchString);
          }}
          onSubmitEditing={(event) => {
            console.log('On Submit Editing');
            var searchString = event.nativeEvent.text;
            console.log('Input string ' + searchString);


            //this.clearTimeout(this.timeoutID);
            //this.timeoutID = this.setTimeout(() => this.searchMedia(searchString), 1000);  
            this.searchMedia(searchString);                  
          }}
        />

        <Text>hkjhkjhkhkjhkjhjkh</Text>
        <Text>hkjhkjhkhkjhkjhjkh</Text>
        <Text>hkjhkjhkhkjhkjhjkh</Text>
        <Text>hkjhkjhkhkjhkjhjkh</Text>
        <Text>hkjhkjhkhkjhkjhjkh</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
        
        <ListView
          dataSource={this.state.resultsData}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode='on-drag'
        />
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
    

      <Navigator
          navigationBar={
            <View style={styles.global.mainContent}>
              <StatusBar
                   backgroundColor='green'
                   barStyle='light-content'/>
                <TouchableWithoutFeedback onPress={this._handlePress}>
                  <Text style={styles.navbar.button}>Search</Text>
                </TouchableWithoutFeedback>
            </View>        

          } //navigationBar
          initialRoute={{
            name: 'My First Scene',
            rightButtonTitle: 'Search',
            index: 0
          }}
          renderScene={(route, navigator) =>
            <StoriesListView
              title={route.title}
              name={route.name}
              onForward={() => {
                var nextIndex = route.index + 1;
                navigator.push({
                  name: 'Scene ' + nextIndex,
                  index: nextIndex,
                });
              }}
              onBack={() => {




                if (route.index > 0) {
                  navigator.pop();
                }
              }}
            /> // StoriesListView
          } // renderScene
        /> // Navigator

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
