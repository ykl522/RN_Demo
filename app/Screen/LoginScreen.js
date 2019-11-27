import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput placeholder={'请输入用户名'}/>
        <TextInput placeholder={'请输入密码'}/>

        <Button
          style={{width: 200}}
          title="登录"
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        />
      </View>
    );
  }
}

