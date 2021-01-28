/**
 * 通用样式
 * create by ykl 2020/11/5
 */
import { StyleSheet,Dimensions } from 'react-native'

//UI设计图的宽度
const designWidth = 750
//UI设计图的高度
const designHeight = 1624

//手机屏幕的宽度
export const width = Dimensions.get('window').width;
//手机屏幕的高度
export const height = Dimensions.get('window').height;
//计算手机屏幕宽度对应设计图宽度的单位宽度
export const w = width / designWidth; //unitWidth
//计算手机屏幕高度对应设计图高度的单位高度
export const h = height / designHeight; //unitHeight

export const CommonStyle = StyleSheet.create({
    //界面背景
    baseBackgrand: {
      flex: 1,  
      backgroundColor: '#f5f6f7'
    },
    //基本文本
    baseText: {
      fontSize: 30 * w,
    },
    titleText:{
      fontSize: 30 * w,
      color: '#333'
    },
    valueText: {
      fontSize: 30 * w,
      color: '#999'
    },
    //基本中等大小文本
    baseMidText: {
      fontSize: 32 * w
    },
    //横线
    line_:{
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#ddd'
    },
    //竖线
    line:{
      width: StyleSheet.hairlineWidth,
      backgroundColor: '#ddd'
    },
    //标题右边文本按钮
    titleRightText:{
      padding: 25 * w,
      fontSize: 30 * w,
      paddingLeft: 5 * w
    }

})

//通用颜色
export const Color = {
  blue: '#008385',
  orenge: '#EF5322',
  grey: '#999999',
  greyBtn: '#6d6d6d',
  black: '#161717',
}

export function myAlert(data1, data2){
  if(__DEV__)
    alert(JSON.stringify(data1,null,2) + (data2 ? JSON.stringify(data2,null,2) : ''))
}

export function myLog(data1, data2){
  let str1 = (data1 && (typeof(data1) == 'object')) ? JSON.stringify(data1,null,2) : data1
  let str2 = (data2 && (typeof(data2) == 'object')) ? JSON.stringify(data2,null,2) : ''
  if(__DEV__ && str1)
    console.log(str1 + str2)
}