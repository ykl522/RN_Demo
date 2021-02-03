import React from 'react'
import { View,TouchableOpacity,Image,Text,Dimensions } from 'react-native';
import Actions from '../util/Actions';
import { w } from '../util/CStyle';

export default class HeadView extends React.PureComponent{
    render(){
        return(
            <View
                style={{
                    flexDirection: 'row',
                    height: 80 * w,
                    alignItems: 'center',
                    paddingTop: this.isIphoneX() ? 80 * w : 0,
                    padding: 0,
                    backgroundColor: '#368866',
                }}>
                <TouchableOpacity
                    style={{paddingLeft: 20 * w, paddingRight: 20 * w}}
                    onPress={() => {
                    if(this.props.navigation?.state?.params?.onLeftClick){
                        this.props.navigation.state.params.onLeftClick()
                    } else{
                        Actions.pop();
                    }
                    }}>
                    <Image
                    style={{width: 40 * w, height: 40 * w}}
                    source={require('../image/Back-icon.png')}
                    />
                </TouchableOpacity>
                {this.props.navigation?.state?.params ? (
                    <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => {
                        if(__DEV__){
                        myAlert(navigation.state)
                        }
                    }}>
                    <Text style={{textAlign: 'center', fontSize: 30 * w, fontWeight:'bold', color: 'white'}}>
                        {this.props.navigation.state.params.title}
                    </Text>
                    </TouchableOpacity>
                ) : null}
                <View style={{width: 90 * w}} />
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