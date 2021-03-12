# RN_Demo
react native demo

![image](https://github.com/ykl522/RN_Demo/blob/master/app/image/play.gif)

# 使用组件版本
    "react-native": "0.63.2"
    "react-navigation": "^4.0.10"

# 导入后在根目录执行 yarn 命令
    yarn/yarn install
    iOS 修改 bundle id 包名 下载profile文件后 cd ios 执行 pod install
    yarn start
    react-native run-android / react-native run-ios

# 发布热更新
    appcenter codepush release-react --description 1.优化显示弹框\n2.加入热更新 -m
    注意 description不要用引号包住，不然换行符会失效， -m表示强制更新，不强制去掉就行