import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view'
import Actions from '../util/Actions'

export default class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
    // Actions.setNavigation(this.props.navigation)
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TextInput placeholder={'请输入用户名'} defaultValue={this.props.username}/>
        <TextInput placeholder={'请输入密码'}/>

        <Button
          style={{width: 200}}
          title="登录"
          onPress={() => Actions.navigate('HomeScreen')}
        />
      </View>
      </SafeAreaView>
    );
  }
}

