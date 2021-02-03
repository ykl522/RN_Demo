/**
 * @format
 */
import {LogBox, Alert, AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import { myLog } from './app/util/CStyle';
// 异常捕获
global.ErrorUtils.setGlobalHandler((e) => {
    try {
      // 非生产环境
        if (__DEV__) {
            Alert.alert('错误信息', JSON.stringify(e.message)) 
            myLog(e.stack)
        }
    } catch (e) {}
})

// if(!__DEV__){
    LogBox.ignoreAllLogs()
// }
AppRegistry.registerComponent(appName, () => App);
