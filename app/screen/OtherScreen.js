import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Network from '../util/Network';
import Actions from '../util/Actions';
import ToastManager from '../util/ToastManager';
import Storage from '../util/Storage'

export default class OtherScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataSource: []};
  }

  componentDidMount() {
    Network.post('https://facebook.github.io/react-native/movies.json').then(
      value => {
        this.setState({dataSource: value});
      },
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Other Screen</Text>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
              <Text>
                {item.title}, {item.releaseYear}
              </Text>
            )}
            keyExtractor={({id}, index) => id}
          />
          <Button
            title="Go to Home"
            onPress={() => Actions.navigate('HomeScreen')}
          />
          <Button
            title="Go to Settings"
            onPress={() => Actions.navigate('SettingsScreen')}
          />
          <Button
            title="Go to Settings and update title"
            onPress={() => Actions.navigate('SettingsScreen',{title: '设置1'})}
          />
          <Button
            title="Go to WebView"
            onPress={() =>
              Actions.navigate('WebViewScreen', {
                title: '百度',
                url: 'https://www.baidu.com',
              })
            }
          />
          <Button
            style={{marginTop: 20}}
            title="Go to Register..."
            onPress={() => Actions.navigate('RegisterScreen', {test: '----'})}
          />
          <Button
            style={{marginTop: 20}}
            title="Go to Login..."
            onPress={() => {
              Storage.get('username').then((value) => {
                Actions.navigate('LoginScreen', {username: value});
              });
            }}
          />
          <Button
            style={{marginTop: 20}}
            title="show Toast"
            onPress={() => {
              ToastManager.show('---')
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
