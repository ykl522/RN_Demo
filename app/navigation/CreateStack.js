import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,Text
} from 'react-native';
import { height, myAlert, myLog, w } from '../util/CStyle';
import HeadView from '../widget/HeadView';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
//------------------------------------Screen-------------------------------------------
import SplashScreen from '../screen/SplashScreen';
import HomeScreen from '../screen/HomeScreen';
import OtherScreen from '../screen/OtherScreen';
import LoginScreen from '../screen/LoginScreen';
import CopyScreen from '../screen/CopyScreen';
import RegisterScreen from '../screen/RegisterScreen';
import SettingsScreen from '../screen/SettingsScreen';
import WebViewScreen from '../screen/WebViewScreen';
//------------------------------------Screen-------------------------------------------


//包住界面类，可以直接this.props.xxx取传递的参数
const mapProps = (SomeComponent) => {
  return class extends React.Component {
    render () {
      const { navigation } = this.props
      // const { navigation, ...otherProps } = this.props
      const { state: { params } } = navigation
      // myLog(navigation)
      // myLog(params)
      return (<SomeComponent{...this.props}{...params} />)
    }
  }
}

const TabBarComponent = (props) => <BottomTabBar {...props} style={{height: 80, backgroundColor: '#00000000'}} />;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#999',
  },
});

const OtherStack = createStackNavigator(
  {
    OtherScreen: {screen: OtherScreen, navigationOptions: {header: null}},
    // SettingsScreen: {screen: SettingsScreen, navigationOptions: {title: '设置'}},
    SettingsScreen: _getCustomHeader('SettingsScreen', SettingsScreen, {title:'设置'}),
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: styles.headerStyle,
    },
    headerMode: 'none',
  },
);

const MainStack = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: '主页',
        headerBackTitle: null,
        indicatorStyle: {height: 0},
        tabBarVisible: true
      },
    },
    // HomeScreen: _getCustomHeader('HomeScreen', HomeScreen, '主页'),
    OtherScreen: {
      screen: OtherStack,
      navigationOptions: {
        title: '其它',
        headerBackTitle: null,
        indicatorStyle: {height: 0},
      },
    },
  },
  {
    showLabel: true,
    tabBarComponent: (props) => (
      <TabBarComponent {...props} style={{borderTopColor: '#605F60'}} />
    ),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);


function getHeader(navigation) {
  return (
    <HeadView navigation={navigation} />
  );
}


//参考 https://reactnavigation.org/docs/4.x/stack-navigator#navigationoptions-used-by-stacknavigator
function _getCustomHeader(key, screen, params={}, headerHide) {
  // alert(JSON.stringify(screen + ''))
  return createStackNavigator(
    {
      [key]: {
        screen: screen,
        navigationOptions: (navigation) => {
          // alert(JSON.stringify(navigation))
          let newNavigation = navigation.navigation;
          if (newNavigation.state) {
            newNavigation.state.params = newNavigation.state.params || params;
            newNavigation.state.params.title =
              newNavigation.state.params.title || params.title || '';
          }
          return {header: headerHide?null:getHeader(newNavigation)};
        },
      },
    },
    {
      headerMode: 'screen',
    },
  );
}

const deviceWidth = Dimensions.get('window').width;
const pt = Platform.OS === 'ios' ? deviceWidth / 750 : 1;

const RootStack = createStackNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    // ScreenStack: {screen: ScreenStack},
    Main: {
      screen: MainStack,
    },
    RegisterScreen: _getCustomHeader('RegisterScreen', mapProps(RegisterScreen), {title:'注册'}),
    LoginScreen: _getCustomHeader('LoginScreen', LoginScreen, {title: '登录'}, true),
    WebViewScreen: _getCustomHeader('WebViewScreen', WebViewScreen),
    CopyScreen: _getCustomHeader('CopyScreen', CopyScreen, {title:'xxx'}),
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  },
);

export const AppContainer = createAppContainer(RootStack);

const prevGetStateForActionHomeStack = AppContainer.router.getStateForAction;
AppContainer.router.getStateForAction = (action, state) => {
  if (state && action.type === 'PopSomePageAndThenPush') {
    // 返回前面几层后，再进入新页面（popPageNum 表示要移掉的页面数）
    if (
      !action.popPageNum ||
      action.popPageNum <= 0 ||
      state.routes.length <= action.popPageNum
    ) {
      // console.warn(`tnw error: wrong popPageNum: ${action.popPageNum}`)
      return state;
    }
    const routes = state.routes.slice(
      0,
      state.routes.length - action.popPageNum,
    );
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return prevGetStateForActionHomeStack(action, state);
};

const previousGetActionForPathAndParams =
  AppContainer.router.getActionForPathAndParams;

Object.assign(AppContainer.router, {
  getActionForPathAndParams(path, params) {
    // if (path === 'my/custom/path' && params.magic === 'yes') {
    //   // returns a profile navigate action for /my/custom/path?magic=yes
    //   return NavigationActions.navigate({
    //     routeName: 'Profile',
    //     action: NavigationActions.navigate({
    //       // This child action will get passed to the child router
    //       // ProfileScreen.router.getStateForAction to get the child
    //       // navigation state.
    //       routeName: 'Friends',
    //     }),
    //   });
    // }
    return previousGetActionForPathAndParams(path, params);
  },
});