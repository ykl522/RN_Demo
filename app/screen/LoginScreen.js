import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Actions from '../util/Actions';
import { w } from '../util/CStyle';
import AsyncStorage from '../util/Storage';

let text;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    // Actions.setNavigation(this.props.navigation)
  }

  componentDidMount() {
    // alert('---！ ' + JSON.stringify(this.props.dd))
  }

  render() {
    // alert(JSON.stringify(this.props))
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: 20 * w}}>
            <Text>Account</Text>
            <TextInput
              style={{borderRadius: 10*w, backgroundColor: '#ee00ff', height: 80*w}}
              placeholder={'请输入用户名'}
              defaultValue={this.props.navigation?.state?.params?.username}
              onChangeText={(textInput) => {
                text = textInput;
              }}
            />
            <Text>Password</Text>
            <TextInput 
              style={{borderRadius: 10*w, backgroundColor: '#ee00ff', height: 80*w}}
              secureTextEntry={true} 
              placeholder={'请输入密码'} />
            <Text>Language</Text>
            <Text
              style={{borderRadius: 10*w, backgroundColor: '#ee00ff', height: 80*w}}
              >
                
              </Text>
          </View>
          <Button
            style={{marginTop: 10 * w}}
            title="登录"
            onPress={() => {
              // alert(text)
              AsyncStorage.set('username', text);
              Actions.navigate('Main');
              // this.props.navigation?.replace('HomeScreen')
              // alert('---' + JSON.stringify(this.props.navigation))
            }}
          />
          <Button
            style={{width: 200}}
            title="注册"
            onPress={() => {
              Actions.navigate('RegisterScreen');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
