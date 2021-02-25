import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Network from '../net/Network';
import Actions from '../util/Actions';
import ToastManager from '../util/ToastManager';
import Storage from '../util/Storage'
import BottomDatePicker from '../widget/BottomDatePicker';
import CustomDialog from '../widget/CustomDialog';
import LoadingManager from '../util/LoadingManager';

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
            onPress={() => Actions.navigate('SettingsScreen',{title: '设置1',onRightClick:()=>{}})}
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
              ToastManager.show('---测试用-----------------')
            }}
          />
          <Button
            style={{marginTop: 20}}
            title="show error Toast"
            onPress={() => {
              ToastManager.setTextStyle({color: '#ff3636'})
              ToastManager.show('---测试用---------error--------')
            }}
          />
          <Button
            style={{marginTop: 20}}
            title="show date selector"
            onPress={() => {
              this.BottomDatePicker.open()
            }}
          />
          <Button
            style={{marginTop: 20}}
            title="show dialog"
            onPress={() => {
              this.CustomDialog._setVisible(true)
            }}
          />
          <Button
            style={{marginTop: 20}}
            title="show Loading"
            onPress={() => {
              //2s aotu dismiss
              LoadingManager.show(2000)
              // global.Loading.showLoading()
              // let to = setTimeout(()=>{
              //   global.Loading.dismissLoading(0)
              //   clearTimeout(to)
              // },3000)
            }}
          />
          <Button
            style={{marginTop: 20}}
            title="show Loading Toast"
            onPress={() => {
              //2s aotu dismiss
              global.Loading.setLoading('加载完成', require('../image/finished.png'))
              global.Loading.showLoading(2000)
            }}
          />
          <BottomDatePicker 
            ref={ref=>this.BottomDatePicker=ref}
            onSelector={(date)=>{
              alert(date)
            }}
          />
          <CustomDialog 
            ref={ref=>this.CustomDialog=ref}
            title={'提示'}
            content={'这只是一个提示，这只是一个提示这只是一个提示'}
            onOkPress={()=>{
              ToastManager.show('OK')
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
