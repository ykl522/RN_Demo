import React from 'react'
import { View,TouchableOpacity,Text, Modal } from 'react-native'
import { CommonStyle, w } from '../util/CStyle'

export default class BottomBase extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isVisible: false
        }
    }

    _setVisible(isVisible){
        this.setState({isVisible:isVisible})
    }

    render(){
        return(
            <Modal 
                transparent={this.props.transparent}
                visible={this.state.isVisible}
                animationType={'slide'}
            >
                <View style={{flex: 1,backgroundColor: '#00000099'}}>
                    <TouchableOpacity
                        style={{flex: 1}} onPress={()=>{this._setVisible(false)}}
                    ></TouchableOpacity>
                    {this.props.children}
                </View>
            </Modal>
        )
    }
}