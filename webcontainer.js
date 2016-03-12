'use strict';

import React from 'react-native';
let { WebView } = React;
import _ from 'lodash';

const script = '<script>window.location.hash = 1;document.title = document.height;</script>';

const defaultSafeConfig = _.defaults(
  {
    allowedAttributes: _.defaults(
      {
        id: {allTags: true},
        style: {allTags: true},
        src: {allowedTags: ['img']}
      })
  }
);


class WebContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      height: props.height || 0
    };
  }

  onNavigationStateChange(navState) {
    this.setState({
      height: 30 //navState.title
    });
  }

  render() {
    let {
      html,
      style,
      ...props
    } = this.props;


    return (
      <WebView
        {...props}
        style={[style, {height: Number(this.state.height)}]}
        javaScriptEnabled={true}
        scrollEnabled={false}
        injectedJavaScript={script}
        source={{html: ( this.props.source.html == undefined ? '' : this.props.source.html)}}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)} />
    );
  }
}

module.exports = WebContainer;
