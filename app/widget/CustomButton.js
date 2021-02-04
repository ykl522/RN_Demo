/**
 * 互动自定义控件
 * Created by ykl
 * on 16/6/17.
 */

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
  } from 'react-native'
import React from 'react'
import { w } from '../util/CStyle';

/**
 * 按钮文本 buttonText
 * 按钮事件 onPress
 * 按钮样式 btnStyle
 * 文本样式 btnTextStyle
 * 总体样式 style
 */
export default class CustomButton extends React.Component {

    static defaultProps={
        buttonText: 'Confirm',     //默认按钮文案
    };

    render(){
        return(
            <View style={[styles.btnParent, this.props.style]}>
                <TouchableOpacity 
                    style={[styles.btnContainerAll, {backgroundColor: 'white'}, this.props.btnStyle]} 
                    activeOpacity={0.8}
                    onPress={this.props.onPress}>
                    <Text style={[styles.white, {fontSize: 40 * w}, this.props.btnTextStyle]}>{this.props.buttonText}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    white:{
        color: "white",
        flex: 1,
        textAlign: 'center',
    },
    btnParent:{
        marginTop: 20 * w,
        alignItems: 'center'

    },
    btnContainerAll: {
        color: 'white',
        height: 100 * w,
        borderColor: '#00000000',
        marginBottom: 20 * w,
        width: '80%',
        borderRadius: 50 * w,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }
})