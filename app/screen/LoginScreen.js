import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Actions from '../util/Actions';
import { myAlert, w } from '../util/CStyle';
import Storage from '../util/Storage';
import BottomDrawer from '../widget/BottomDrawer';
import CustomButton from '../widget/CustomButton';
import ItemInputLayout from '../widget/ItemInputLayout';
import ItemLayout from '../widget/ItemLayout';

let text;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      language: {}
    }
    // Actions.setNavigation(this.props.navigation)
  }

  componentDidMount() {
    // alert('---！ ' + JSON.stringify(this.props.dd))
  }

  render() {
    // alert(JSON.stringify(this.props))
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#336688'}}>
        <BottomDrawer ref={ref=>this.selector = ref} 
          data={[{_text_: 'English'}, {_text_: '中文'}]}
          onSelector={(item)=>{
            this.setState({language: item})
          }}
        >
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: 20 * w, marginTop: 200*w}}>
            <ItemInputLayout 
              topTitle={'Account'}
              topTitleStyle={{color: 'white'}}
              inputStyle={{borderRadius: 6*w, backgroundColor: '#ffffff44'}}
              placeholder={'请输入用户名'}
              onChangeText={(textInput)=>{
                text = textInput;
              }}
              showRightImage
            />
            <ItemInputLayout 
              secureTextEntry={true} 
              topTitle={'Password'}
              topTitleStyle={{color: 'white'}}
              inputStyle={{borderRadius: 6*w, backgroundColor: '#ffffff44'}}
              placeholder={'请输入密码'}
              onChangeText={()=>{
                              
              }}
              showRightImage
            />
            <ItemLayout 
              style={{backgroundColor: '#00000000', paddingLeft: 0, paddingRight: 0}}
              topTitle={'Language'}
              title={this.state.language._text_ || 'English'}
              titleStyle={{fontSize: 30 * w}}
              leftTopStyle={{borderRadius: 6*w, backgroundColor: '#ffffff44', padding: 15*w}}
              topTitleStyle={{color: 'white'}}
              onClick={()=>{
                this.selector.open()
              }}
            />
          </View>
          <CustomButton 
            style={{alignSelf: 'center', width: '80%'}}
            buttonText={'Sign in'}
            btnStyle={{marginTop: 10 * w}}
            btnTextStyle={{fontSize: 30*w, color: '#336688', fontWeight: 'bold'}}
            onPress={() => {
              Storage.set('username', text);
              Actions.navigate('Main');
            }}
          />
        </View>
        </BottomDrawer>
      </SafeAreaView>
    );
  }
}
