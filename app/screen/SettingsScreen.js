import React from 'react';
import {View, Text, Button} from 'react-native';
import Actions from '../util/Actions';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Other Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => Actions.navigate('HomeScreen')}
        />
      </View>
    );
  }
}
