import React from 'react';
import {
  View,
  Text,
  Button,BackHandler
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Actions from '../util/Actions';
import AsyncStorage from '../util/Storage';
import Drawer from 'react-native-drawer'
import Toast from '../util/ToastManager';
import { myAlert } from '../util/CStyle';
import ToastManager from '../util/ToastManager';

let lastBackPressed  = Date.now()
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    Actions.setNavigation(this.props.navigation);
    this.state={
      showDrawer: false
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !this.lastBackTime) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onBackAndroid.bind(this),
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.onBackAndroid.bind(this),
      );
    }
  }

  onBackAndroid() {
    // alert(global.routeName)
    if (global.routeName) {
      if (global.routeName != 'Main') {
        Actions.pop();
        return true;
      } else {
        // const now = Date.now()
        // let timeDec = now - this.state.lastBackTime
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
          
          // ToastAndroid.show('再按一次退出应用' + timeDec, ToastAndroid.SHORT);
          BackHandler.exitApp();
          return;
        } else {
          ToastManager.show('再按一次退出应用');
          lastBackPressed = Date.now();
          // Actions.pop();
          // return false;
          return true;
        }
        
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Drawer
          type="overlay"
          content={
            <View style={{flex: 1, backgroundColor: '#666'}}>
              <Text>666</Text>
            </View>
          }
          ref={c => this.drawer = c}
          tapToClose={!this.state.showDrawer}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={{shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3}}
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
          >
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
          <Button
            style={{marginTop: 20}}
            title="show drawer"
            onPress={() => {
              this.drawer.open()
            }}
          />
          <Button
            style={{marginTop: 20}}
            title="show Toast"
            onPress={() => {
              Toast.show('---')
              Toast.show('---222')
              Toast.show('---223')
            }}
          />
        </View>
        </Drawer>
      </SafeAreaView>
    );
  }
}
