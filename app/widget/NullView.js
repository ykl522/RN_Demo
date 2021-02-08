import React from 'react'
import { View,Image,Text } from 'react-native'
import { w } from '../util/CStyle'

/**
 * content 说明文案 img 背景图
 */
export default class NullView extends React.Component{

    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 79.7*w}}>
                <Image resizeMode={'contain'} style={{width: 468.75*w, height: 351.56*w}} source={this.props.img}/>
                <Text style={{fontSize: 28.125*w, color: '#999'}}>{this.props.content}</Text>
            </View>
        )
    }
}