import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';

/*
 * @Author: 康乐 yuankangle@yunexpress.cn
 * @Date: 2024-02-23 14:09:09
 * @LastEditors: 康乐 yuankangle@yunexpress.cn
 * @LastEditTime: 2024-02-23 14:48:27
 * @FilePath: \RN_073\src\components\BaseScreen.tsx
 */
export default ({
  children,
  backgroundColor,
}: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
  backgroundColor?: string;
}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor || colors.background,
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor || colors.background}
      />
      {children}
    </View>
  );
};
