import React from 'react';
import {View, Text, Button} from 'react-native';
import Actions from '../util/Actions';
import Storage from '../util/Storage';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    // Actions.setNavigation(this.props.navigation)
  }

  componentDidMount() {
    Storage.get('username').then((username)=>{
      global.username = username
    })
    Storage.get('UserInfo').then((UserInfo)=>{
      if(UserInfo){
        const user = JSON.parse(UserInfo)
        if(user){
          global.UserInfo = user
        }
      }
      this.timeout = setTimeout(() => {
        if(UserInfo){
          this.props.navigation.replace('Main');
        } else{
          this.props.navigation.replace('LoginScreen');
        }
        clearTimeout(this.timeout)
      }, 2000);
    })
    
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
