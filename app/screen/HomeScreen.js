import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Actions from '../util/Actions';
import AsyncStorage from '../util/Storage';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    Actions.setNavigation(this.props.navigation);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Home Screen</Text>
          <Button
            style={{marginTop: 20}}
            title="Go to Register..."
            onPress={() => Actions.navigate('RegisterScreen')}
          />
          <Button
            style={{marginTop: 20}}
            title="Go to Login..."
            onPress={() => {
              AsyncStorage.get('username').then((value) => {
                Actions.navigate('LoginScreen', {username: value});
              });
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
