import React from 'react'
import { View,TouchableOpacity,Image,Text,Dimensions } from 'react-native';
import Actions from '../util/Actions';
import { myAlert, w } from '../util/CStyle';

export default class HeadView extends React.PureComponent{
    render(){
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
                    if(this.props.navigation?.state?.params?.onLeftClick){
                        this.props.navigation.state.params.onLeftClick()
                    } else{
                        Actions.pop();
                    }
                    }}>
                    <Image
                    style={{width: 65.62 * w, height: 65.62 * w}}
                    source={this.props.navigation?.state?.params?.headLeftIcon || require('../image/head/ic_head_back.png')}
                    />
                </TouchableOpacity>
                {this.props.navigation?.state?.params ? (
                    <TouchableOpacity
                    style={{flex: 1, alignItems: 'center'}}
                    onPress={() => {
                        if(__DEV__){
                            myAlert(this.props.navigation.state)
                        }
                    }}>
                    <Text style={{textAlign: 'center', fontSize: 40.625 * w, fontWeight:'bold', color: 'white'}}>
                        {this.props.navigation.state.params.title}
                    </Text>
                    </TouchableOpacity>
                ) : null}
                {
                    this.props.navigation?.state?.params?.onRightClick ? 
                    <TouchableOpacity
                        style={{height: 112.5*w, width: 112.5*w, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => {
                            if(this.props.navigation?.state?.params?.onRightClick){
                                this.props.navigation.state.params.onRightClick()
                            } else{
                                Actions.pop();
                            }
                        }}>
                        <Image
                        style={{width: 65.62 * w, height: 65.62 * w}}
                        source={this.props.navigation?.state?.params?.headRightIcon || require('../image/head/ic_head_add.png')}
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