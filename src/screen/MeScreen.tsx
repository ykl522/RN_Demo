/*
 * @Author: 康乐 yuankangle@yunexpress.cn
 * @Date: 2024-02-23 09:47:00
 * @LastEditors: 康乐 yuankangle@yunexpress.cn
 * @LastEditTime: 2024-02-23 16:50:03
 * @FilePath: \RN_073\src\screen\HomeScreen.tsx
 */

import {DeviceEventEmitter, Text, View} from 'react-native';
import * as React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

export default function MeScreen() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Me'
  >;
  const Navigate = useNavigation<ProfileScreenNavigationProp>();
  return (
    <View>
      <Text
        onPress={() => {
          const theme = {
            dark: false,
            colors: {
              text: 'red',
              primary: 'green',
              background: '#999',
              card: '#ddd',
              border: '#ddd',
              notification: '#ddd',
            },
          };
          DeviceEventEmitter.emit('updateTheme', theme);
        }}>
        修改样式
      </Text>
      <Text
        onPress={() => {
          Navigate.navigate('Setting');
        }}>
        Me
      </Text>
    </View>
  );
}
