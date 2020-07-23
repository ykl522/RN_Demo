import React from 'react';
import {WebView} from 'react-native-webview';
import Actions from '../util/Actions';

export default class WebViewScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WebView source={{uri: Actions.getParams(this).url}} style={{flex: 1}} />
    );
  }
}
