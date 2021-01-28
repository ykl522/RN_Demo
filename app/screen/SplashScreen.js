import React from 'react';
import {View, Text, Button} from 'react-native';
import Actions from '../util/Actions';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    // Actions.setNavigation(this.props.navigation)
  }

  componentDidMount() {
    this.isLogin = true
    this.timeout = setTimeout(() => {
      if(this.isLogin){
        this.props.navigation.replace('Main');
      } else{
        this.props.navigation.replace('LoginScreen');
      }
      clearTimeout(this.timeout)
    }, 1000);
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Hello World</Text>
      </View>
    );
  }
}
