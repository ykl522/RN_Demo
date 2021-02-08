import React from 'react'
import { View,TouchableOpacity,Text, Modal } from 'react-native'
import { CommonStyle, w } from '../util/CStyle'
import BaseDialog from './BaseDialog'

/**
 * title 标题
 * 
 * content 内容
 * 
 * onOkPress 点击确认
 * 
 */
export default class CustomDialog extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isVisible: this.props.isVisible
        }
    }

    _setVisible(isVisible){
        this.BaseDialog._setVisible(isVisible)
    }

    render(){
        return(
            <BaseDialog
                ref={ref=>this.BaseDialog=ref}
                animationType={'fade'}
                transparent={true}
            >
                <View style={{backgroundColor: 'white', width: '80%', borderRadius: 18*w}}>
                    <View style={{alignItems:'center', marginVertical: 50*w, paddingHorizontal: 37.5*w}}>
                        <Text style={{fontSize: 34.38*w, color: '#0d8484',textAlign: 'center', lineHeight: 51*w}}>{this.props.title}</Text>
                        <Text style={{fontSize: 34.38*w, color: '#353535',textAlign: 'center', lineHeight: 51*w}}>{this.props.content}</Text>
                    </View>
                    <View style={{height: 2.03*w, backgroundColor: '#e5e5e5'}}/>
                    <View style={{flexDirection:'row', height: 112.5*w}}>
                        <TouchableOpacity 
                            style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                            onPress={()=>{
                                this._setVisible(false)
                            }}
                        >
                            <Text style={{fontSize: 34.38*w, color: '#353535', fontWeight: 'bold'}}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                            onPress={()=>{
                                this._setVisible(false)
                                this.props.onOkPress && this.props.onOkPress()
                            }}
                        >
                            <Text style={{fontSize: 34.38*w, color: '#0d8484', fontWeight: 'bold'}}>YES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BaseDialog>
        )
    }
}