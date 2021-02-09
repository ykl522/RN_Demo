import React from 'react'
import { View,TouchableOpacity,Image,Text,Dimensions } from 'react-native';
import Actions from '../util/Actions';
import { myAlert, w } from '../util/CStyle';

/**
 * navigation 和 params必选其一，因为是在前一个界面传的参，所有有些点击事件不好处理可以先设个空方法，再用setParams，或者用下面的params
 * 
 * params 自定义标题时使用，参数用于一进界面就显示，this.props.navigation?.setParams 会先显示默认的再闪一下
 * 
 * colors 标题校栏渐变色['#ffffff', '#ffffff']
 */
export default class HeadView extends React.PureComponent{

    constructor(props){
        super(props)
    }

    render(){
        let params = this.props.params || this.props.navigation?.state?.params
        return(
            <View
                style={{
                    flexDirection: 'row',
                    height: 112.5 * w,
                    alignItems: 'center',
                    paddingTop: this.isIphoneX() ? 80 * w : 0,
                    padding: 0,
                    backgroundColor: '#368866',
                }}>
                <TouchableOpacity
                    style={{height: 112.5*w, width: 112.5*w, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                    if(params?.onLeftClick){
                        params.onLeftClick()
                    } else{
                        Actions.pop();
                    }}}>
                    <Image
                        resizeMode={'contain'}
                        style={{width: 65.62 * w, height: 65.62 * w}}
                        source={params?.headLeftIcon || require('../image/head/ic_head_back.png')}
                    />
                </TouchableOpacity>
                {params ? (
                    <TouchableOpacity
                    style={{flex: 1, alignItems: 'center'}}
                    onPress={() => {
                        if(__DEV__){
                            myAlert(this.props.navigation.state)
                        }
                    }}>
                    <Text style={{textAlign: 'center', fontSize: 40.625 * w, fontWeight:'bold', color: 'white'}}>
                        {params.title}
                    </Text>
                    </TouchableOpacity>
                ) : null}
                {
                    params?.onRightClick ? 
                    <TouchableOpacity
                        style={{height: 112.5*w, width: 112.5*w, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => {
                            if(params.onRightClick){
                                params.onRightClick()
                            }
                        }}>
                        <Image
                            resizeMode={'contain'}
                            style={{width: 65.62 * w, height: 65.62 * w}}
                            source={params?.headRightIcon || require('../image/head/ic_head_add.png')}
                        />
                </TouchableOpacity> :<View style={{width: 112.5*w}} />
                }
            </View>
        )
    }

    isIphoneX() {
        const window = Dimensions.get('window');
        return (
          Platform.OS === 'ios' &&
          !Platform.isPad &&
          !Platform.isTVOS &&
          (window.height === 812 ||
            window.width === 812 ||
            window.height === 896 ||
            window.width === 896)
        );
      }
}