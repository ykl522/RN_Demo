import React from 'react';
import {StyleSheet} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import SplashScreen from './Screen/SplashScreen'
import HomeScreen from './Screen/HomeScreen'
import OtherScreen from './Screen/OtherScreen'
import LoginScreen from './Screen/LoginScreen'
import RegisterScreen from './Screen/RegisterScreen'

const TabBarComponent = props => <BottomTabBar {...props} />;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#999',
  },
});

const HomeStack = createStackNavigator(
  {
    HomeScreen: {screen: HomeScreen, navigationOptions: {header: null}},
    LoginScreen: {screen: LoginScreen, navigationOptions: {title: '登录'}},
  },
  {
    defaultNavigationOptions: {
        initialRouteName: 'HomeScreen',
        headerTintColor: '#fff',
        headerStyle: styles.headerStyle,
      },
  })

const MainStack = createBottomTabNavigator(
  {
    HomeScreen: {screen: HomeStack, navigationOptions: {title: '主页'}},
    OtherScreen: {screen: OtherScreen, navigationOptions: {title: '其它'}},
  },
  {
    tabBarComponent: props => (
      <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    ),
  },
);

const OtherStack = createStackNavigator(
  {
    RegisterScreen: {screen: RegisterScreen, navigationOptions: {title: '注册', headerStyle: styles.headerStyle, headerMode: 'float'}},
  }
)

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    SplashScreen: {screen: SplashScreen},
    Other: OtherStack
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}



