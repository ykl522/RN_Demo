import React from 'react'
import { View,TouchableOpacity,Text, Modal } from 'react-native'
import { CommonStyle, w } from '../util/CStyle'

export default class BaseDialog extends React.Component{

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
                animationType={this.props.animationType}
            >
                <TouchableOpacity
                    style={[{flex: 1,backgroundColor: '#00000099', justifyContent:'center', alignItems: 'center'}, this.props.style]} 
                    onPress={()=>{this._setVisible(false)}}
                >
                    {this.props.children}
                </TouchableOpacity>
            </Modal>
        )
    }
}