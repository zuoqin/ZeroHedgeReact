import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet,
    Text, Alert, Button,
    TouchableOpacity, TextInput} from 'react-native';
//import Constants from 'expo-constants';

import AsyncStorage from '@react-native-community/async-storage';
import StoryIntroCell from './story-intro-cell';
import StoryDetailView from './story-detail-view'

var STORAGE_KEY = '@ZeroHedge:key';
var LOADING = {};
var resultsCache = {
  dataForQuery: {}
};
var resultsPagesCache = {
  dataForPage: {}
};
var SEARCH_URL = 'https://zh.eliz.club/api/search?page=0&srchtext=';
var PAGE_URL = 'https://zh.eliz.club/api/stories?page=';

const headerPages = [
      {
        id: 0,
        title: 'Home'
      },
      {
        id: 1,
        title: 'Page 1'
      },
      {
        id: 2,
        title: 'Page 2'
      }
      ]

function PageHeader({navigation}) {

  return (

    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
     {headerPages.map(
     (info,i) => { return(<TouchableOpacity
       style={{marginRight: 10, marginTop: 17}}
       key={i}
       onPress={navigation.getParam('getPage' + i)}>
       <Text>{info.title}</Text>
     </TouchableOpacity>)})}

     <TextInput
       autoCapitalize='none'
       autoCorrect={false}
       placeholder='Search for stories...'
       returnKeyType='search'
       enablesReturnKeyAutomatically={true}
       style={{
         marginTop: 11,
         fontSize: 15,
         flex: 1,
         height: 30,
         width: 130,
         padding: 3,
         backgroundColor: '#FFF', // 40% opaque
         borderRadius: 10,
         borderColor: '#FFF',
         borderWidth: 1,
         borderStyle: 'solid'
       }}
       onChange={navigation.getParam('onSearch')}
       onEndEditing={navigation.getParam('onEndEditing')}
       onSubmitEditing={navigation.getParam('onSubmitEditing')}
     />
     </View>
  )
}

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

class StoriesListView extends Component {
  constructor(props, context) {
    super(props, context);
    var arr = [ {Body: "",
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      introduction: "Loading ...",Published: "01/26/2014 - 13:23",
      reference: "xhcmdlLWNhc2gtd2l0aGRyYXdhbC1saW1pdA==",
      title: "Please wait",
      updated: "2016-03-08T15:55:12.2058442+08:00"} ];
    this.isUpdated = false;
    this.state = {
      isLoading: false,
      dataSource: arr,
      page: -1,
      searchMode: false,
      query: ''
    };
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Zero Hedge',
      headerRight: () => (<PageHeader  navigation={navigation} />),
    };
  };

  onSearch=(event) => {
    var searchString = event.nativeEvent.text;
    console.log(searchString);
  }

  onEndEditing=(event) => {
    console.log('jkhkjhkj');
    var searchString = event.nativeEvent.text;
    console.log(searchString);
  }

  onSubmitEditing=(event) => {
    console.log('On Submit Editing');
    var searchString = event.nativeEvent.text;
    console.log('Input string ' + searchString);


    //this.clearTimeout(this.timeoutID);
    //this.timeoutID = this.setTimeout(() => this.searchMedia(searchString), 1000);
    this.searchMedia(searchString);
  }

  _urlForQuery(query: string) : string{
    if (query) {
      return SEARCH_URL + encodeURIComponent(query);
    }
    else{
      return SEARCH_URL + encodeURIComponent('HSBC');
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
        method: "GET"
      };

      console.log('77777777, Start fetch')
      fetch(this._urlForQuery(query), settings)
        .then((response) => response.json())
        .catch((error) => {
          LOADING[query] = false;
          resultsCache.dataForQuery[query] = undefined;

          this.state.isLoading = false;
          this.state.resultsData = this.getDataSource([])
        })
        .then((responseData) => {
            console.log('5555555, ', responseData);
            this.setSearchPostResult(responseData, query);
            console.log('On Submit Editing');
          })
    }
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

  componentDidMount() {
    this.props.navigation.setParams({ getPage0: this._getPage0 });
    this.props.navigation.setParams({ getPage1: this._getPage1 });
    this.props.navigation.setParams({ getPage2: this._getPage2 });
    this.props.navigation.setParams({ getPage3: this._getPage3 });

    this.props.navigation.setParams({ onSearch: this.onSearch });
    this.props.navigation.setParams({ onEndEditing: this.onEndEditing });
    this.props.navigation.setParams({ onSubmitEditing: this.onSubmitEditing });
    this.isUpdated = true;
    this._loadInitialState(this).done();
    this.getPage(0);
  };

  _getPage0 = () => {
    this.getPage(0);
  };
  _getPage1 = () => {
    this.getPage(1);
  };
  _getPage2 = () => {
    this.getPage(2);
  };
  _getPage3 = () => {
    this.getPage(3);
  };

  _urlForPage(page) : string{
    if (page > 0 ) {
      return PAGE_URL + page;
    }
    else{
      return PAGE_URL + '0';
    }
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


  async _loadInitialState(that) {
    try {
      var Results=[];
      console.log('888888888888');
      for (var i = 0; i < 10; i++) {
        var value = await AsyncStorage.getItem(STORAGE_KEY + i +'Title' );
        if (value !== null && value !== undefined){
          var newItem = {};
          newItem.title = value;
          value = await AsyncStorage.getItem(STORAGE_KEY + i +'Introduction' );
          if (value !== null && value !== undefined){
            newItem.introduction = value;
          }
          value = await AsyncStorage.getItem(STORAGE_KEY + i +'Reference' );
          if (value !== null && value !== undefined){
            newItem.reference = value;
          }
          value = await AsyncStorage.getItem(STORAGE_KEY + i +'Published' );
          if (value !== null && value !== undefined){
            newItem.downloaded = value;
          }
          value = await AsyncStorage.getItem(STORAGE_KEY + i +'Picture' );
          if (value !== null && value !== undefined){
            newItem.picture = value;
          }
          Results.push(newItem);
        }
      }
      if (Results.length > 0) {
        that.setPageGetResult(Results, 0);
        console.log('999999999999999', Results[0]);
      }

    } catch (error) {
      that._showAlert('Error', 'AsyncStorage error: ' + error.message);
    }
  }


  async _onValueChange(selectedValue) {
    try {
      for(var i = 0; i < selectedValue.length; i ++)
      {
          if(selectedValue[i].title != null){
              await AsyncStorage.setItem(STORAGE_KEY+i+'Title', selectedValue[i].title);
          }
          if(selectedValue[i].introduction != null){
              await AsyncStorage.setItem(STORAGE_KEY+i+'Introduction', selectedValue[i].introduction);
          }
          if(selectedValue[i].reference != null){
              await AsyncStorage.setItem(STORAGE_KEY+i+'Reference', selectedValue[i].reference);
          }
          if(selectedValue[i].downloaded != null){
              await AsyncStorage.setItem(STORAGE_KEY+i+'Published', selectedValue[i].downloaded);
          }
          if(selectedValue[i].picture != null){
              await AsyncStorage.setItem(STORAGE_KEY+i+'Picture', selectedValue[i].picture);
          }
      };

    } catch (error) {
      this._showAlert('Error', 'AsyncStorage error: ' + error.message);
    }
  }


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


    getDataSource(stories: Array<any>): ListView.DataSource{
      this.isUpdated = false;
      this.setState({dataSource: stories});
      this.isUpdated = true;
      return stories;
    }

    updateStoryBody(reference, body) {

    }

    selectMediaItem(storyItem) {
      const {navigate} = this.props.navigation;
      navigate('StoryDetailView', {story: storyItem})


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
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <StoryIntroCell story={item}
                                    onSelect={() => this.selectMediaItem(item)} />}
          keyExtractor={item => item.reference}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

module.exports = StoriesListView;
