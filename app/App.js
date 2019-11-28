import React from 'react';
import {StyleSheet,Image,View,Text,TouchableOpacity,Dimensions,Platform} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import SplashScreen from './screen/SplashScreen'
import HomeScreen from './screen/HomeScreen'
import OtherScreen from './screen/OtherScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import SettingsScreen from './screen/SettingsScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSafeArea } from 'react-native-safe-area-context'
import Actions from './util/Actions'


const TabBarComponent = props => <BottomTabBar {...props} />;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#999',
  },
});

const OtherStack = createStackNavigator(
  {
    OtherScreen: {screen: OtherScreen, navigationOptions: {header: null}},
    // SettingsScreen: {screen: SettingsScreen, navigationOptions: {title: '设置'}},
    SettingsScreen: _getCustomHeader('SettingsScreen', SettingsScreen, '设置')
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: styles.headerStyle,
    },
    headerMode: 'none',
  })

const MainStack = createBottomTabNavigator(
  {
    HomeScreen: {screen: HomeScreen, navigationOptions: {title: '主页', header: null, headerBackTitle: null, indicatorStyle: {height: 0}}},
    OtherScreen: {screen: OtherStack, navigationOptions: {title: '其它', headerBackTitle: null, indicatorStyle: {height: 0}}},
  },
  {
    tabBarComponent: props => (
      <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    ),
  },
);

const ScreenStack = createStackNavigator(
  {
    // Main: {
    //   screen: MainStack,
    // },
    RegisterScreen: {screen: RegisterScreen, navigationOptions: {title: '注册', headerStyle: styles.headerStyle, headerBackTitle: null}},
    LoginScreen: {screen: LoginScreen, navigationOptions: {title: '登录', headerStyle: styles.headerStyle, headerBackTitle: null}},
  },
  {
    initialRouteName: 'RegisterScreen',
    headerMode: 'screen'
  }
)

function getHeader(navigation) {
  return (
    <View style={{ flexDirection: 'row', height: 190 * pt, alignItems: 'center', paddingTop: (isIphoneX() ? 80 * pt : 0), padding: 0, backgroundColor: '#ff0'  }}>
      <TouchableOpacity 
        style={{paddingLeft: 20 * pt, paddingRight: 20 * pt}}
        onPress={()=> {
          Actions.pop()
        }}
      >
        <Image style={{width: 50 * pt, height: 50 * pt}} source={require('./image/Back-icon.png')}/>
      </TouchableOpacity>
      {
        navigation.state && navigation.state.params ? <Text style={{flex: 1, textAlign: 'center' }}>{navigation.state.params.title}</Text> : null
      }
      <View style={{width: 90 * pt}}/> 
    </View>
  )
}

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}


function _getCustomHeader(key, screen, title){
  // alert(JSON.stringify(screen + ''))
  return createStackNavigator({ 
    [key]: { screen: screen, 
      navigationOptions: (navigation) => {
        // alert(JSON.stringify(navigation))
        let newNvigation = navigation.navigation
        if (newNvigation.state) {
          newNvigation.state.params = newNvigation.state.params || {}
          newNvigation.state.params.title = newNvigation.state.params.title || title
        }
        
        return { header: getHeader(newNvigation) }
      }
    }
  },
  {
    headerMode: 'screen'
  })
}

const deviceWidth = Dimensions.get('window').width
const pt = Platform.OS === 'ios' ? deviceWidth/750 : pt

const RootStack = createStackNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    // ScreenStack: {screen: ScreenStack},
    Main: {
      screen: MainStack,
    },
    RegisterScreen: _getCustomHeader('RegisterScreen', RegisterScreen, '注册'),
    LoginScreen: _getCustomHeader('LoginScreen', LoginScreen, '登录'),
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <AppContainer ref={navigatorRef => {
          Actions.setNavigation(navigatorRef)
        }} />
      </SafeAreaProvider>)
  }
}



