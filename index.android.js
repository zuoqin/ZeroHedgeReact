/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  StatusBar,
  Navigator,
} from 'react-native';

class StoriesListView extends Component {
  render() {
    return (
        <View style={styles.global.content}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a mi auctor urna sagittis lobortis id vel magna. Morbi mattis nibh maximus dui imperdiet, ut efficitur orci malesuada. Duis rhoncus dolor quis mi viverra, sed eleifend odio auctor. Nam vel consequat elit. Sed turpis orci, sodales vel eleifend eu, feugiat non arcu. Nam posuere mauris id consequat sollicitudin. Aliquam lacinia eros vitae condimentum finibus. Pellentesque sit amet massa tincidunt, hendrerit purus in, dictum ipsum. Phasellus interdum vitae arcu non pretium. Ut dictum turpis in neque luctus tincidunt.
          </Text>
        </View>
    )
  }
}


class ZeroHedge extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{name: 'My First Scene', index: 0}}
          renderScene={(route, navigator) =>
            <StoriesListView
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
            />
          }
        />

    );
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
