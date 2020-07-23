import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Network from '../util/Network';
import Actions from '../util/Actions';

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
            title="Go to WebView"
            onPress={() =>
              Actions.navigate('WebViewScreen', {
                title: '百度',
                url: 'https://www.baidu.com',
              })
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}
