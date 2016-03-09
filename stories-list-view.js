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

var styles = require('./styles');

var TimerMixin = require('react-timer-mixin');

var API_URL = 'http://www.take5people.cn/ZeroHedge/api/search/';
var LOADING = {};
var resultsCache = {
  dataForQuery: {}
};


//var StoryIntroCell = require('./story-intro-cell');
//var StoryDetailView = require('./story-detail-view');


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
    var arr = [ {Body: "",
      Introduction: "jhkjkjkja ...",Published: "01/26/2014 - 13:23",
      Reference: "xhcmdlLWNhc2gtd2l0aGRyYXdhbC1saW1pdA==",
      Title: "Furious Backlash Forces HSBC To Scrap Large Cash Withdrawal Limit",
      Updated: "2016-03-08T15:55:12.2058442+08:00"} ];

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
      query: '',
      dataSource: this.ds.cloneWithRows(['row 3', 'row 4']),
      resultsData: this.ds.cloneWithRows(['row 3', 'row 4'])
    };
  };


  componentDidMount() {
    this.searchMedia('HSBC');
  };
  getDataSource(stories: Array<any>): ListView.DataSource{
    this.setState({dataSource: this.ds.cloneWithRows(stories)});
    return this.state.dataSource.cloneWithRows(stories);
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
    var sTitle = '123456789012345';
    var nLength = 15;
    if(story.Title !== undefined) 
    {
      console.log('story title: ' + story.Title);
      sTitle = story.Title;
    }
    nLength = sTitle.length;
    return (

      <Text>
        {sTitle.substring(0,nLength)}
      </Text>      
    );
  };

  // selectMediaItem(storyItem) {
  //   this.props.navigator.push({
  //     title: 'Media Details',
  //     component: StoryDetailView,
  //     passProps: {
  //       storyItem
  //     }
  //   });
  // };

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

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        
      </View>
    )
  }
};

module.exports = StoriesListView;