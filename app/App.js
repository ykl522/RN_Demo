import React from 'react';
import {
  Platform,
  BackHandler
} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Actions from './util/Actions';
import Toast from 'react-native-easy-toast';
import ToastManager from './util/ToastManager'
import { myAlert, myLog, w } from './util/CStyle';
import {AppContainer} from './navigation/CreateStack'


let lastBackPressed  = Date.now()
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onBackAndroid = this.onBackAndroid.bind(this);
    this.state={
      lastBackTime: 0
    }
  }

  componentDidMount() {
    // const router = this.navigatorRef?.router
    // alert(JSON.stringify(router))
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaProvider>
        <AppContainer
          {...this.navigator?.state?.nav?.routes[1]?.params}
          onNavigationStateChange={(prevState, newState, action) => {
            this.prevState = prevState;
            if(newState.isTransitioning){
              // myAlert(prevState.routes[prevState.routes.length - 1]?.routeName)
              // myLog(newState.index + '--newState--')
              // myLog(prevState.index + '--prevState--')
              // myLog(newState.routes[newState.routes.length - 1]?)
              // myAlert(newState.routes[newState.routes.length - 1]?.routeName)
              global.routeName = newState.routes[newState.routes.length - 1]?.routeName
            }
            // myAlert(newState.routes[newState.routes.length - 1]?.routes[newState.routes.length - 1]?.routeName)
            // alert(
            //   '[1]---' +
            //     JSON.stringify(prevState) +
            //     '\n[2]---' +
            //     JSON.stringify(newState) +
            //     '\n[3]---' +
            //     JSON.stringify(action),
            // );
            // const router = this.navigator?.state?.nav?.routes[1]
            // alert(JSON.stringify(router));
          }}
          uriPrefix="/app"
          navigation={navigation}
          ref={(navigatorRef) => {
            this.navigator = navigatorRef;
            Actions.setNavigation(navigatorRef);
          }}
        />
        <ToastComponent/>
      </SafeAreaProvider>
    );
  }

  componentWillMount() {
    myLog('------*******-------!')
    if (Platform.OS === 'android' && !this.lastBackTime) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onBackAndroid.bind(this),
      );
    }
  }

  componentWillUnmount() {
    myLog('------*******-------')
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.onBackAndroid.bind(this),
      );
    }
  }

  onBackAndroid() {
    myLog('--------------------------', this.prevState.index)
    if (this.prevState) {
      if (this.prevState.index > 1) {
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
}
  /*全局toast*/
  class ToastComponent extends React.Component {
    //防止内存泄漏
    componentWillUnmount() {
        ToastManager.toast = null;
    }
  
    render() {
        return (<Toast  
          style={{backgroundColor:'red', padding: 20 * w}}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color:'white'}} 
          ref={e => ToastManager.toast = e}/>);
    }
  }