import React from 'react';
import {View, Text, Button} from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          style={{marginTop: 20}}
          title="Go to Register..."
          onPress={() => this.props.navigation.navigate('RegisterScreen')}
        />
        <Button
          style={{marginTop: 20}}
          title="Go to Login..."
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        />
      </View>
    );
  }
}

