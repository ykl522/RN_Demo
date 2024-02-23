/*
 * @Author: 康乐 yuankangle@yunexpress.cn
 * @Date: 2024-02-23 09:53:34
 * @LastEditors: 康乐 yuankangle@yunexpress.cn
 * @LastEditTime: 2024-02-23 16:22:30
 * @FilePath: \RN_073\src\screen\SettingScreen.tsx
 */
import {ScrollView, Text} from 'react-native';
import * as React from 'react';

export default function SettingScreen() {
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <Text onPress={() => {}}>Settings</Text>
      <Text style={{padding: 50}}>Settings1</Text>
      <Text style={{padding: 50}}>Settings2</Text>
      <Text style={{padding: 50}}>Settings3</Text>
      <Text style={{padding: 50}}>Settings4</Text>
      <Text style={{padding: 50}}>Settings5</Text>
      <Text style={{padding: 50}}>Settings6</Text>
      <Text style={{padding: 50, backgroundColor: 'red'}}>Settings7</Text>
    </ScrollView>
  );
}
