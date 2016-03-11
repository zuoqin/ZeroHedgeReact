'use strict';
import React, {
  StyleSheet,
} from 'react-native';



module.exports = StyleSheet.create({
  searchBar: {
    marginTop: 10,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 70,
  },

  navbarButton: {
    width: 50,
    color: '#000000',
    textAlign: 'center'
  },
  
  list: {
    height: 1200,
    flex: 1
  },

  spinner: {
    width: 30
  },
  rowSeparator: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHighlighted: {
    opacity: 0.0
  },
  emptyList: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  emptyListText: {
    marginTop: 80,
    color: '#999'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});

