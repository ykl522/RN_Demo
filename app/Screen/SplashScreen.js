import React from 'react';
import {View, Text, Button} from 'react-native';
import Actions from '../util/Actions'

export default class SplashScreen extends React.Component {

  constructor (props) {
    super(props)
    // Actions.setNavigation(this.props.navigation)
  }

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

