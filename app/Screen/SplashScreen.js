import React from 'react';
import {View, Text, Button} from 'react-native';

export default class SplashScreen extends React.Component {

  componentDidMount(){
    this.timeout = setTimeout(()=> {
      this.props.navigation.replace('Main')
    }, 3000)
  }

  componentWillUnmount(){
    this.timeout && clearTimeout(this.timeout)
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello World</Text>
      </View>
    );
  }
}

