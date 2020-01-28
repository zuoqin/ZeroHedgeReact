import React from 'react';
import { StyleSheet, Text,  Navigator, View, StatusBar } from 'react-native';
import * as styles_global from './styles/global'
import StoriesListView from './stories-list-view';
import StoryDetailView from './story-detail-view';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
    StoriesListView: {screen: StoriesListView},
    StoryDetailView: {screen: StoryDetailView}
  },
  {
    initialRouteName: 'StoriesListView',
  });

const App = createAppContainer(MainNavigator);

export default App;
