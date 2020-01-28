import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet,
    Text, Alert, Button,
    AsyncStorage,   TouchableOpacity,} from 'react-native';
//import Constants from 'expo-constants';

import StoryIntroCell from './story-intro-cell';
import StoryDetailView from './story-detail-view'

var STORAGE_KEY = '@ZeroHedge:key';
var LOADING = {};
var resultsPagesCache = {
  dataForPage: {}
};
var API_URL = 'http://www.take5people.cn:8083/api/search/';
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


const DATA = [ {
  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  Body: "",
  Introduction: "jhkjkjkja ...",Published: "01/26/2014 - 13:23",
  Reference: "xhcmdlLWNhc2gtd2l0aGRyYXdhbC1saW1pdA==",
  Title: "Furious Backlash Forces HSBC To Scrap Large Cash Withdrawal Limit",
  Updated: "2016-03-08T15:55:12.2058442+08:00"} ];

//   [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

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
      introduction: "jhkjkjkja ...",Published: "01/26/2014 - 13:23",
      reference: "xhcmdlLWNhc2gtd2l0aGRyYXdhbC1saW1pdA==",
      title: "Furious Backlash Forces HSBC To Scrap Large Cash Withdrawal Limit",
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

  componentDidMount() {
    this.props.navigation.setParams({ getPage0: this._getPage0 });
    this.props.navigation.setParams({ getPage1: this._getPage1 });
    this.props.navigation.setParams({ getPage2: this._getPage2 });
    this.props.navigation.setParams({ getPage3: this._getPage3 });
    this.isUpdated = true;
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
