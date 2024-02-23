/*
 * @Author: 康乐 yuankangle@yunexpress.cn
 * @Date: 2024-02-23 09:47:00
 * @LastEditors: 康乐 yuankangle@yunexpress.cn
 * @LastEditTime: 2024-02-23 14:49:32
 * @FilePath: \RN_073\src\screen\HomeScreen.tsx
 */

import {Text} from 'react-native';
import * as React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import BaseScreen from '../components/BaseScreen';

export default function HomeScreen() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
  >;
  const Navigate = useNavigation<ProfileScreenNavigationProp>();

  const {colors} = useTheme();

  return (
    <BaseScreen>
      <Text
        style={{color: colors.text}}
        onPress={() => {
          Navigate.navigate('Setting');
        }}>
        Home
      </Text>
    </BaseScreen>
  );
}
