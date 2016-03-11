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
  TouchableHighlight,
  TouchableWithoutFeedback,
  ListView,
  ScrollView,
  ProgressBarAndroid,
  RecyclerViewBackedScrollView,
} from 'react-native';

var styles = require('./styles');

var TimerMixin = require('react-timer-mixin');

var API_URL = 'http://www.take5people.cn/ZeroHedge/api/search/';
var PAGE_URL = 'http://www.take5people.cn/ZeroHedge/api/page/';
var STORY_URL = 'http://www.take5people.cn/ZeroHedge/api/story/';

var LOADING = {};
var resultsCache = {
  dataForQuery: {}
};


var resultsPagesCache = {
  dataForQuery: {}
};


var resultsStoriesCache = {
  dataForQuery: {}
};


var StoryIntroCell = require('./story-intro-cell');
var StoryDetailView = require('./story-detail-view');




class SearchBar extends Component {
  
  constructor(props, context) {
    super(props, context);
  };  
  render() {
    return (
      <View style={styles.listView.searchBar}>
        <TouchableWithoutFeedback onPress={this.props.onPage}>
          <Text style={styles.listView.navbarButton}>Home</Text>
        </TouchableWithoutFeedback>      
        <TouchableWithoutFeedback onPress={this.props.onPage}>
          <Text style={styles.listView.navbarButton}>Page 1</Text>
        </TouchableWithoutFeedback>           
        <TouchableWithoutFeedback onPress={this.props.onPage}>
          <Text style={styles.listView.navbarButton}>Page 2</Text>
        </TouchableWithoutFeedback>   
        <TouchableWithoutFeedback onPress={this.props.onPage}>
          <Text style={styles.listView.navbarButton}>Page 3</Text>
        </TouchableWithoutFeedback>           


        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Search for stories...'
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
  isUpdated = true;

  constructor(props, context) {
    super(props, context);
    var arr = [ {Body: "",
      Introduction: "jhkjkjkja ...",Published: "01/26/2014 - 13:23",
      Reference: "xhcmdlLWNhc2gtd2l0aGRyYXdhbC1saW1pdA==",
      Title: "Furious Backlash Forces HSBC To Scrap Large Cash Withdrawal Limit",
      Updated: "2016-03-08T15:55:12.2058442+08:00"} ];
    this.isUpdated = false;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
      page: -1,
      query: '',
      dataSource: this.ds.cloneWithRows(['7 Harsh Realities Of Life Millennials Need To Understand', 'Millennials. They may not yet be the present, but they’re certainly the future. These young, uninitiated minds will someday soon become our politicians, doctors, scientists, chefs, television producers, fashion designers, manufacturers, and, one would hope, the new proponents of liberty. But are they ready for it? It’s time millennials understood these 7 harsh realities of life so we don’t end up with a generation of gutless adult babies running the show.','Japanese Government Bond Futures Are Flash-Crashing (Again)', 'Remember that once-in-a-lifetime, ']),
      resultsData: this.ds.cloneWithRows(['Japanese Government Bond Futures Are Flash-Crashing (Again)', 'Remember that once-in-a-lifetime, '])
    };
  };


  componentDidMount() {
    this.isUpdated = true;
    this.getPage('0');    
  };

  getDataSource(stories: Array<any>): ListView.DataSource{
    this.isUpdated = false;
    this.setState({dataSource: this.ds.cloneWithRows(stories)});
    this.isUpdated = true;
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

  _urlForPage(page: string) : string{
    if (page > 0 ) {
      return PAGE_URL + page;
    }
    else{
      return PAGE_URL + '0';
    }
  };

  _urlForStory(reference: string) : string{
      return STORY_URL + reference;
  };

  setSearchGetResult(responseData, page){

    LOADING[page] = false;
    console.log(responseData.length);
    resultsCache.dataForQuery[page] = responseData;


    this.state.isLoading = false;
    this.state.resultsData = this.getDataSource(resultsCache.dataForQuery[page]);
  };


  getStoryAttributes(reference : string) {    
      for (var i = 0; i < resultsCache.dataForQuery[0].length; i++) {
          if (resultsCache.dataForQuery[0][i].Reference == reference) {
              return i;
          }
      }
      return -1;
  }

  setStoryGetResult(responseData, reference){

    LOADING[reference] = false;
    console.log(responseData.length);
    var index = this.getStoryAttributes(reference);
    if (index >= 0) {
      var storyItem = resultsCache.dataForQuery[0][index];
      storyItem.Body = responseData;
      resultsStoriesCache.dataForQuery[reference] = storyItem;
    }
    


    this.state.isLoading = false;
  };

  setSearchPostResult(responseData, query){

    LOADING[query] = false;
    console.log(responseData.length);
    resultsCache.dataForQuery[query] = responseData;


    this.state.isLoading = false;
    this.state.resultsData = this.getDataSource(resultsCache.dataForQuery[query]);
  };



  getPage(page){
    this.timeoutID = null;
    if (this.isUpdated == false) {
      return;
    }
    


    var cachedResultsForQuery = resultsCache.dataForQuery[page];
    if (cachedResultsForQuery) {
      if (!LOADING[page]) {
        this.state.isLoading = false;
        this.state.resultsData = this.getDataSource(cachedResultsForQuery);
      } else {
        this.state.isLoading = true;
      }
    } else{
      this.state.isLoading = true;


      LOADING[page] = true;
      resultsCache.dataForQuery[page] = null;
      var settings = {
        method: "GET"
      };      
      fetch(this._urlForPage(page), settings)
        .then((response) => response.json())
        .catch((error) => {
          LOADING[page] = false;
          resultsCache.dataForQuery[page] = undefined;

          this.state.isLoading = false;
          this.state.resultsData = this.getDataSource([])
        })
        .then((responseData) => {
            this.setSearchGetResult(responseData, page);
            console.log('On Get Page ' + page);
            this.state.page = page;
          })
    }
  };


  gotoStoryPage(reference)
  {
      var storyItem = resultsStoriesCache.dataForQuery[reference];
      if (storyItem !== undefined && storyItem !== null) {
        this.isUpdated = false;
        this.props.navigator.push({
          title: 'Story Details',
          component: StoryDetailView,
          id: 'StoryDetail',
          passProps: {
            storyItem : storyItem
          }
        });        
      }
  };

  getStory(reference){
    this.timeoutID = null;

    //this.state.story = reference;


    var cachedResultsForQuery = resultsStoriesCache.dataForQuery[reference];
    if (cachedResultsForQuery) {
      if (!LOADING[reference]) {
        this.state.isLoading = false;
        this.gotoStoryPage(reference);
      } else {
        this.state.isLoading = true;
      }
    } else{
      this.state.isLoading = true;


      LOADING[reference] = true;
      resultsStoriesCache.dataForQuery[reference] = null;
      var settings = {
        method: "GET"
      };      
      fetch(this._urlForStory(reference), settings)
        .then((response) => response.json())
        .catch((error) => {
          LOADING[reference] = false;
          resultsStoriesCache.dataForQuery[reference] = undefined;

          this.state.isLoading = false;
        })
        .then((responseData) => {
            this.setStoryGetResult(responseData, reference);
            console.log('On Get Story ' + reference);
            this.gotoStoryPage(reference);

          })
    }
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
      <StoryIntroCell
        story={story}
        onSelect={() => this.selectMediaItem(story)}
        onHighlight={() => highlightRowFunction(sectionID,rowID)}
        onDeHighlight={() => highlightRowFunction(null,null)}
      />  
    );
  };

  selectMediaItem(storyItem) {
    this.getStory(storyItem.Reference);

    // this.props.navigator.push({
    //   title: 'Story Details',
    //   component: StoryDetailView,
    //   id: 'StoryDetail',
    //   passProps: {
    //     storyItem
    //   }
    // });
  };

  render() {
    return (
     
      <View>
       <SearchBar
          onPage = {(event) => {
            //var searchString = event.nativeEvent.text;
              switch(event.nativeEvent.target)
              {
                case 10:
                  this.getPage(0);
                  break;
                case 13:
                  this.getPage(1);
                  break;
                case 15:
                  this.getPage(2);
                  break;
                case 17:
                  this.getPage(3);
                  break;
                default:
                  this.getPage(0);
                  break;
              }
              
              console.log('on press page');
          }}

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
          style={styles.listView.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          initialListSize={9}
          //renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.listView.searchBar} />}
        />
        
      </View>
    )
  }
};

module.exports = StoriesListView;