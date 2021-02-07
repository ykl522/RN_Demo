/**
 * 带编辑框和右边图标组件
 * create by ykl 2020/11/5
 */
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { w } from '../util/CStyle';

/** placeholder title onPress(text) editable showBorder */
export default class ItemInputLayout extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            text: this.props.value
        }
    }

    static defaultProps={
        showRightImage: false,   //是否显示右边图标
        showBorder: false,      //是否显示边框
        editable: true,         //文本输入框是否能输入
      };

    render(){
        return (
            <View style={[ this.props.style]}>
                {this.props.topTitle && <Text style={[styles.text, {marginBottom: 10 * w,}, this.props.topTitleStyle]}><Text style={{color: 'red'}}>{this.props.required && '*'}</Text>{this.props.topTitle}</Text>}
                <View style={[styles.item, this.props.showBorder && styles.broder, this.props.inputStyle]}>
                    {this.props.title && <Text
                        style={[styles.text, { marginLeft: 20 * w }]}>{this.props.title}</Text>}
                    <TextInput
                        {...this.props}
                        style={[styles.text, { flex: 1, marginLeft: 10 * w, paddingVertical: 15 * w }, this.props.textInputStyle]}
                        value={this.state.text}
                        onChangeText={(text)=>{
                            this.state.text = text
                            this.setState({})
                            this.props.onChangeText && this.props.onChangeText(text)
                        }}
                    />
                    {this.props.showRightImage && this.state.text?.length>0 && 
                        <TouchableOpacity 
                            style={this.props.rightImageParentStyle||{paddingRight: 15*w}}
                            activeOpacity={0.8} 
                            onPress={()=>{
                                if(this.props.onImgPress){
                                    this.props.onImgPress(this.state.text)
                                } else{
                                    this.setState({text: ''})
                                }
                            }}>
                            <Image resizeMode={'contain'} style={styles.rightImage} source={this.props.rightImage ? this.props.rightImage : require('../image/common/ic_clear.png')} />
                        </TouchableOpacity>
                    }
                    {
                        this.props.rightButtonText && 
                        <TouchableOpacity 
                            style={{height: 81.25*w, justifyContent: 'center', backgroundColor: '#0D848419'}}
                            activeOpacity={this.props.onPress ? 0.8 : 1} 
                            onPress={()=>this.props.onPress && this.props.onPress(this.state.text)}>
                            <Text style={{fontWeight: '700', fontSize: 37.5*w, paddingHorizontal: 37.5*w, color: '#0D8484'}}>{this.props.rightButtonText}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 30 * w,
        color: '#4d4d4d'
    }, 
    rightImage:{
        width: 50 * w, 
        height: 50 * w, 
    },
    broder: {
        borderWidth: 1,
        borderColor: '#E4E9F2'
    }
  
  })
  