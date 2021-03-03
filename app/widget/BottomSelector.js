

import React from 'react'
import { View,TouchableOpacity,Text } from 'react-native'
import { CommonStyle, w } from '../util/CStyle'
import BottomBase from './BottomBase'

/**
 * data[...obj] 如果没有设置textKey对象obj必须带_text_  onSelector(obj)
 * textKey 对象的显示的参数名，优先取item[textkey]
 */
export default class BottomSelector extends React.PureComponent{

    constructor(props){
        super(props)
        this.state={
            selectorId: this.props.selectorId || 0
        }
    }

    open(){
      this.BottomBase._setVisible(true)
    }

    close(){
      this.BottomBase._setVisible(false)
    }

    render(){
        return(
          <BottomBase
            transparent
            ref={ref=>this.BottomBase=ref}
          >
            <View style={{backgroundColor: '#fff'}}>
              <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
                <TouchableOpacity
                    style={{height: 117*w, paddingHorizontal: 31.25*w, justifyContent: 'center'}}
                    onPress={()=>{
                      this.close()
                    }}
                  >
                  <Text style={{fontSize: 34.375*w, color: '#353535'}}>{'Cancel'}</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                  style={{height: 117*w, paddingHorizontal: 31.25*w, justifyContent: 'center'}}
                  onPress={()=>{
                  //   this.setState({i18n: this.state.language})
                    this.props.onSelector && this.props.onSelector(this.props.data[this.state.selectorId])
                    this.close()
                  }}
                >
                  <Text style={{fontSize: 34.375*w, color: '#0d8484'}} >{'Confirm'}</Text>
                </TouchableOpacity>
              </View>
              <View style={CommonStyle.line_}/>
              <View style={{backgroundColor: '#fff', paddingBottom: 25*w}}>
                  {
                      this.props.data?.map((item, i)=>{
                          return(
                              <TouchableOpacity 
                                  key={i}
                                  onPress={()=>{
                                      this.setState({selectorId: i})
                                  }}
                                  style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', padding: 30*w, backgroundColor: this.state.selectorId === i ? '#f6f6f6': '#00000000'}}>
                                  <Text style={{fontSize: 30*w, color: this.state.selectorId === i ? '#353535': '#999', fontWeight: this.state.selectorId === i ? 'bold' : 'normal'}}>{this.props.textKey ? item[this.props.textKey] : item._text_}</Text>
                              </TouchableOpacity>
                          )
                      })
                  }
              </View>
            </View>
          </BottomBase>
        )
    }
}