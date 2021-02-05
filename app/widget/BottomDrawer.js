

import React from 'react'
import { View,TouchableOpacity,Text } from 'react-native'
import Drawer from 'react-native-drawer'
import { CommonStyle, w } from '../util/CStyle'

/**
 * data 对象必须带_text_
 */
export default class BottomDrawer extends React.PureComponent{

    constructor(props){
        super(props)
        this.state={
            selectorId: 0
        }
    }

    open(){
        this.drawer.open()
    }

    close(){
        this.drawer.close()
    }

    render(){
        return(
            <Drawer
                type="overlay"
                ref={ref=>this.drawer = ref}
                side='bottom'
                openDrawerOffset={0}
                panCloseMask={0}
                tapToClose
                negotiatePan
                closedDrawerOffset={-3}
                content={(
                  <View style={{flex: 1, backgroundColor: '#00000000'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
                      <TouchableOpacity
                          style={{height: 117*w, paddingHorizontal: 31.25*w, justifyContent: 'center'}}
                          onPress={()=>{
                            this.close()
                          }}
                        >
                        <Text style={{fontSize: 34.375*w}}>Cancel</Text>
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
                        <Text style={{fontSize: 34.375*w, color: '#0d8484'}} >Comfirm</Text>
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
                                        <Text style={{fontSize: 30*w, color: this.state.selectorId === i ? '#353535': '#999'}}>{item._text_}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                  </View>
                )}
                styles={{
                  main: {shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 10},
                  mainOverlay: {backgroundColor: '#333', opacity: 0},
                }}
                tweenHandler={(ratio) => ({
                  // main: { opacity:(2-ratio)/2 },
                  mainOverlay: {
                    opacity: ratio / 2,
                  }
                })}
              >
                  {this.props.children}
              </Drawer>
        )
    }
}