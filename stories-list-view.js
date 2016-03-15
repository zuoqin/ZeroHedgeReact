'use strict';
import React, {
  AsyncStorage,
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
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ListView,
  ScrollView,
  ProgressBarAndroid,
  RecyclerViewBackedScrollView,
} from 'react-native';

var styles = require('./styles');
const Dimensions = require('Dimensions');
const AndroidWindow = Dimensions.get('window');
var TimerMixin = require('react-timer-mixin');

var API_URL = 'http://www.take5people.cn/ZeroHedge/api/search/';
var PAGE_URL = 'http://www.take5people.cn/ZeroHedge/api/page/';
var STORY_URL = 'http://www.take5people.cn/ZeroHedge/api/story/';

var LOADING = {};
var resultsCache = {
  dataForQuery: {}
};


var resultsPagesCache = {
  dataForPage: {}
};


var resultsStoriesCache = {
  dataForQuery: {}
};


var StoryIntroCell = require('./story-intro-cell');
var StoryDetailView = require('./story-detail-view');

var STORAGE_KEY = '@ZeroHedge:key';


class SearchBar extends Component {
  
  constructor(props, context) {
    super(props, context);
  };  
  render() {
    return (
      <View style={styles.listView.searchBar}>
        <TouchableOpacity style={styles.listView.touchableButton} onPress={this.props.onPage.bind(this,0)}>
          <Text style={styles.listView.navbarButton}>Home</Text>
        </TouchableOpacity>      
        <TouchableOpacity style={styles.listView.touchableButton} onPress={this.props.onPage.bind(this,1)}>
          <Text style={styles.listView.navbarButton}>Page 1</Text>
        </TouchableOpacity>           
        <TouchableOpacity style={styles.listView.touchableButton} onPress={this.props.onPage.bind(this,2)}>
          <Text style={styles.listView.navbarButton}>Page 2</Text>
        </TouchableOpacity>   
        <TouchableOpacity style={styles.listView.touchableButton} onPress={this.props.onPage.bind(this,3)}>
          <Text style={styles.listView.navbarButton}>Page 3</Text>
        </TouchableOpacity>           
        <TouchableOpacity style={styles.listView.touchableButton} onPress={this.props.onPage.bind(this,4)}>
          <Text style={styles.listView.navbarButton}>Page 4</Text>
        </TouchableOpacity>      
        <TouchableOpacity style={styles.listView.touchableButton} onPress={this.props.onPage.bind(this,5)}>
          <Text style={styles.listView.navbarButton}>Page 5</Text>
        </TouchableOpacity>      

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
      searchMode: false,
      query: '',
      dataSource: this.ds.cloneWithRows(['7 Harsh Realities Of Life Millennials Need To Understand', 'Millennials. They may not yet be the present, but they’re certainly the future. These young, uninitiated minds will someday soon become our politicians, doctors, scientists, chefs, television producers, fashion designers, manufacturers, and, one would hope, the new proponents of liberty. But are they ready for it? It’s time millennials understood these 7 harsh realities of life so we don’t end up with a generation of gutless adult babies running the show.','Japanese Government Bond Futures Are Flash-Crashing (Again)', 'Remember that once-in-a-lifetime, ']),
      resultsData: this.ds.cloneWithRows(['Japanese Government Bond Futures Are Flash-Crashing (Again)', 'Remember that once-in-a-lifetime, '])
    };
  };


  componentDidMount() {
    this.isUpdated = true;
    this._loadInitialState().done();
    this.getPage(0);    
  };



  async _onValueChange(selectedValue) {    
    try {
      for(var i = 0; i < selectedValue.length; i ++)
      {
          await AsyncStorage.setItem(STORAGE_KEY+i+'Title', selectedValue[i].Title);
          await AsyncStorage.setItem(STORAGE_KEY+i+'Introduction', selectedValue[i].Introduction);
          await AsyncStorage.setItem(STORAGE_KEY+i+'Reference', selectedValue[i].Reference);
          await AsyncStorage.setItem(STORAGE_KEY+i+'Published', selectedValue[i].Published);
      };
      
    } catch (error) {
      this._showAlert('Error', 'AsyncStorage error: ' + error.message);
    }
  }

  async _loadInitialState() {
    try {
      var Results=[];
      for (var i = 0; i < 10; i++) {
        var value = await AsyncStorage.getItem(STORAGE_KEY + i +'Title' );
        if (value !== null && value !== undefined){
          var newItem = {};
          newItem.Title = value;
          value = await AsyncStorage.getItem(STORAGE_KEY + i +'Introduction' );
          if (value !== null && value !== undefined){
            newItem.Introduction = value;
          }
          value = await AsyncStorage.getItem(STORAGE_KEY + i +'Reference' );
          if (value !== null && value !== undefined){
            newItem.Reference = value;
          }
          value = await AsyncStorage.getItem(STORAGE_KEY + i +'Published' );
          if (value !== null && value !== undefined){
            newItem.Published = value;
          }
          Results.push(newItem);

        }
      }
      if (Results.length > 0) {
        this.setPageGetResult(Results, 0);  
      }
      
    } catch (error) {
      this._showAlert('Error', 'AsyncStorage error: ' + error.message);
    }
  }

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

    if (this.state.searchMode === true) {
      for (var i = 0; i < resultsCache.dataForQuery[this.state.query][this.state.page].length; i++) {
          if (resultsCache.dataForQuery[this.state.query][this.state.page][i].Reference == reference) {
              return i;
          }
      }      
    } else{
      for (var i = 0; i < resultsPagesCache.dataForPage[this.state.page].length; i++) {
          if (resultsPagesCache.dataForPage[this.state.page][i].Reference == reference) {
              return i;
          }
      }      
    }
    return -1;
  }

  setStoryGetResult(responseData, reference){

    LOADING[reference] = false;
    console.log(responseData.length);
    var index = this.getStoryAttributes(reference);
    if (index >= 0) {
      if (this.state.searchMode === true) {
        var storyItem = resultsCache.dataForQuery[this.state.query][this.state.page][index];
        storyItem.Body = responseData;

      } else{
        var storyItem = resultsPagesCache.dataForPage[this.state.page][index];
        storyItem.Body = responseData;

      }
      resultsStoriesCache.dataForQuery[reference] = storyItem;
    }
    


    this.state.isLoading = false;
  };

  setSearchPostResult(responseData, query){

    LOADING[query] = false;
    console.log(responseData.length);


    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery === undefined || cachedResultsForQuery === null)
    {
      resultsCache.dataForQuery[query] = { pages: {} };
      resultsCache.dataForQuery[query].pages[this.state.page] = responseData;
      cachedResultsForQuery = resultsCache.dataForQuery[query];
    }

    cachedResultsForQuery[this.state.page] = responseData;
    this.state.isLoading = false;
    this.state.resultsData = this.getDataSource(resultsCache.dataForQuery[query].pages[this.state.page]);
  };

  setPageGetResult(responseData, page){

    LOADING[page] = false;
    console.log(responseData.length);
    if (responseData.length == 10) {
      if (resultsPagesCache.dataForPage[0] === undefined || resultsPagesCache.dataForPage[0] === null) {
        resultsPagesCache.dataForPage[0] = responseData;
        this.state.resultsData = this.getDataSource(resultsPagesCache.dataForPage[0]);
      }      
    }
    else{
      resultsPagesCache.dataForPage[page] = responseData;
      this._onValueChange(responseData);

      this.state.isLoading = false;
      this.state.resultsData = this.getDataSource(resultsPagesCache.dataForPage[page]);

    }
  };


  getPage(page){
    this.timeoutID = null;
    this.state.searchMode = false;
    this.state.page = page;    
    if (this.isUpdated == false) {
      this._showAlert('Download', 'Download page failed');
      return;
    }
    
    if (this.state.isLoading == true) {
      this._showAlert('Download', 'Downloading, please wait...');
      return;
    }

    var cachedResultsForPage = resultsPagesCache.dataForPage[page];
    if (cachedResultsForPage !== undefined && cachedResultsForPage !== null) {
      if (!LOADING[page]) {
        this.state.isLoading = false;
        this.state.resultsData = this.getDataSource(cachedResultsForPage);
      } else {
        this.state.isLoading = true;
      }
    } else{
      this.state.isLoading = true;


      LOADING[page] = true;
      resultsPagesCache.dataForPage[page] = null;
      var settings = {
        method: "GET"
      };      
      fetch(this._urlForPage(page), settings)
        .then((response) => response.json())
        .then((responseData) => {
            this.setPageGetResult(responseData, page);
            console.log('On Get Page ' + page);
          })
        .catch((error) => {
          LOADING[page] = false;
          resultsPagesCache.dataForPage[page] = undefined;
          this._showAlert('Download', 'Download page failed with error: ' + error.message);
          this.state.isLoading = false;
          this.state.resultsData = this.getDataSource([])
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
        this.isUpdated = true;
      }
  };

  getStory(reference){
    this.timeoutID = null;

    if (this.state.isLoading == true) {
      this._showAlert('Download', 'Downloading, please wait...');
      return;
    }


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
          this._showAlert('Download', 'Download Story failed')
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
    this.state.page = 0;
    this.state.query = query;
    this.state.searchMode = true;

    if (this.state.isLoading == true) {
      this._showAlert('Download', 'Downloading, please wait...');
      return;
    }

    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery !== undefined && cachedResultsForQuery[this.state.page] !== undefined
      && cachedResultsForQuery[this.state.page] !== null)
    {
      if (!LOADING[query]) {
        this.state.isLoading = false;
        this.state.resultsData = this.getDataSource(cachedResultsForQuery[this.state.page]);
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
  render() {
    return (
     
      <View>
       <SearchBar
          onPage = {(event) => {
            this.getPage(event);
              
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
          //automaticallyAdjustContentInsets={true}
          //initialListSize={20}
          //renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          //renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.listView.searchBar} />}
        />
        
      </View>
    )
  }
};

module.exports = StoriesListView;