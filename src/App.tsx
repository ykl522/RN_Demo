/*
 * @Author: 康乐 yuankangle@yunexpress.cn
 * @Date: 2024-02-23 09:40:19
 * @LastEditors: 康乐 yuankangle@yunexpress.cn
 * @LastEditTime: 2024-02-23 16:53:56
 * @FilePath: \RN_073\src\App.tsx
 */
import * as React from 'react';
import {
  NavigationContainer,
  useTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import SettingScreen from './screen/SettingScreen';
import {DeviceEventEmitter, SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MeScreen from './screen/MeScreen';
import {useEffect} from 'react';

export type RootStackParamList = {
  Main: undefined;
  Home: {title: string};
  Me: {title: string};
  Setting: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const Main = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Me" component={MeScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [theme, setTheme] = React.useState({...DefaultTheme});
  const subscription = DeviceEventEmitter.addListener('updateTheme', data => {
    setTheme(data);
  });

  useEffect(() => {
    return () => subscription?.remove();
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
