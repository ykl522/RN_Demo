import React from 'react';
import {View, Text, Button} from 'react-native';
import Actions from '../util/Actions';
import { CommonStyle, w } from '../util/CStyle';
import ItemInputLayout from '../widget/ItemInputLayout';
import TabViewPager from '../widget/TabViewPager';

export default class SettingsScreen extends React.Component {

  constructor(props){
    super(props)
    // props.navigation.setParams({
    //   onRightClick:()=>{
    //     alert('add')
    //   }
    // })
  }

  render() {
    return (
      <View style={CommonStyle.baseBackgrand}>
        <Text>Other Screen</Text>
        <Button
          title="Go to Home1"
          onPress={() => Actions.navigate('HomeScreen')}
        />
        <Button
          title="change title"
          onPress={() =>{
            //修改标题
            this.props.navigation.setParams({
              title: '设置2'
            });
          }}
        />
        <Text>Other Screen</Text>
        <ItemInputLayout 
              showBorder
              style={{marginHorizontal: 32.81*w, marginTop: 35.94*w, marginBottom: 31.25*w}}
              inputStyle={{borderRadius: 10*w, backgroundColor: '#F7F9FC', color: '#353535'}}
              placeholder={'Please input text'}
              placeholderTextColor={'#8FB1B3'}
              onChangeText={()=>{
                
              }}
              onPress={()=>{

              }}
              rightButtonText={'Enter'}
            />
        {/** data为接口获取的数组对象 view为显示获取对象中的参数 */}
        <TabViewPager 
          dataList={[
            {tab:'tab1', data:[{number:132321314, value:'---'},{number:2, value:'...'}],view:[{head:'标题1', key:'number', style:{flex:0.2}},{head:'标题2', key:'value', style:{flex:0.4}},{head:'标题3', key:'value', style:{flex:0.4}}]},
            {tab:'tab2', data:[{number:1, value:'---'},{number:2, value:'+++'}],view:[{head:'标题1+', key:'number', style:{flex:0.6}},{head:'标题2+', key:'value', style:{flex:0.4}}]},
            {tab:'tabbbbbb3', data:[{number:1, value:'abc'},{number:2, value:'+++'}],view:[{head:'标题1+', key:'number', style:{flex:0.6}},{head:'标题2++++', key:'value', style:{flex:0.4}}]},
            {tab:'tab4', data:[{number:1, value:'大大厉害', message:'code is null'},{number:2, value:'s1212313', message: null},{number:3, value:'6u6uytut', message: null}],view:[{head:'标题1+', key:'number', style:{flex:0.3}},{head:'标题2+', key:'value', style:{flex:0.5}},{head:'标题图片', key:'message', imgs:[require('../image/common/ic_success.png'),require('../image/common/ic_fail.png')], style:{flex:0.2}}]},
          ]}
        />
      </View>
    );
  }
}
