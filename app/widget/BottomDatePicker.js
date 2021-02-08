

import React from 'react'
import { View,TouchableOpacity,Text } from 'react-native'
import { CommonStyle, w } from '../util/CStyle'
import BottomBase from './BottomBase'
import Picker from '@gregfrench/react-native-wheel-picker'
import moment from 'moment'
import ArrayUtil from '../util/ArrayUtil'

/**
 * data[...obj] 对象obj必须带_text_  onSelector(obj)
 */
export default class BottomDatePicker extends React.PureComponent{

    constructor(props){
        super(props)
        let today = moment()
        this.state={
            selectorId: this.props.selectorId || 0,
            selectedYear:1,
            selectedMonth:today.month(),
            selectedDay:today.date() - 1,
            selectedHour:today.hour(),
            selectedMinute:today.minute(),
            itemListYear:[today.year()-1,today.year(),today.year()+1],
            itemListMonth:ArrayUtil._generateArray(1,12),
            itemListDay:ArrayUtil._generateArray(1,today.daysInMonth()),
            itemListHour:ArrayUtil._generateArray(0,23),
            itemListMinute:ArrayUtil._generateArray(0,59),
        }
    }

    open(){
      let today = moment()
      let initState = {
        selectorId: this.props.selectorId || 0,
        selectedYear:1,
        selectedMonth:today.month(),
        selectedDay:today.date() - 1,
        selectedHour:today.hour(),
        selectedMinute:today.minute(),
        itemListYear:[today.year()-1,today.year(),today.year()+1],
        itemListMonth:ArrayUtil._generateArray(1,12),
        itemListDay:ArrayUtil._generateArray(1,today.daysInMonth()),
        itemListHour:ArrayUtil._generateArray(0,23),
        itemListMinute:ArrayUtil._generateArray(0,59),
      }
      if(JSON.stringify(initState) != JSON.stringify(this.state)){
        this.setState(initState)
      }
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
                    let dateString = this.state.itemListYear[this.state.selectedYear] + '-'
                                   + this.state.itemListMonth[this.state.selectedMonth] + '-'
                                   + this.state.itemListDay[this.state.selectedDay] + ' '
                                   + this.state.itemListHour[this.state.selectedHour] + ':'
                                   + this.state.itemListMinute[this.state.selectedMinute]
                    this.props.onSelector && this.props.onSelector(moment(dateString, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'))
                    this.close()
                  }}
                >
                  <Text style={{fontSize: 34.375*w, color: '#0d8484'}} >{'Confirm'}</Text>
                </TouchableOpacity>
              </View>
              <View style={CommonStyle.line_}/>
              <View style={{flexDirection: 'row', marginTop: 25*w, marginBottom: 10*w}}>
                  {
                    ['Year','Month','Day','Hour','Minute'].map((item, index)=>{
                      return(
                        <View key={index} style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                          <Text style={{fontSize: 28.125*w, color: '#999'}}>{item}</Text>
                        </View>)
                    })
                  }
              </View>
              <View style={{backgroundColor: '#fff', paddingBottom: 25*w, flexDirection:'row'}}>
                  {/* {
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
                  } */}
                  <Picker style={{flex:1, height: 180}}
                    selectedValue={this.state.selectedYear}
                    itemStyle={{color:"black", fontSize:26}}
                    lineColor={'#999999'}
                    onValueChange={(index) => {
                      this.state.selectedYear = index
                      this.setState({
                        selectedYear: index,
                        itemListDay:ArrayUtil._generateArray(1,moment(this.state.itemListYear[this.state.selectedYear] + '-'
                        + this.state.itemListMonth[this.state.selectedMonth], 'YYYY-MM').daysInMonth()),
                      })
                    }}>
                      {this.state.itemListYear.map((value, i) => (
                        <Picker.Item label={value + ''} value={i} key={i}/>
                      ))}
                  </Picker>
                  <Picker style={{flex:1, height: 180}}
                    selectedValue={this.state.selectedMonth}
                    itemStyle={{color:"black", fontSize:26}}
                    lineColor={'#999999'}
                    onValueChange={(index) => {
                      this.state.selectedMonth = index
                      this.setState({
                        selectedMonth: index,
                        itemListDay:ArrayUtil._generateArray(1,moment(this.state.itemListYear[this.state.selectedYear] + '-'
                        + this.state.itemListMonth[this.state.selectedMonth], 'YYYY-MM').daysInMonth()),
                      })
                    }}>
                      {this.state.itemListMonth.map((value, i) => (
                        <Picker.Item label={value + ''} value={i} key={i}/>
                      ))}
                  </Picker>
                  <Picker style={{flex:1, height: 180}}
                    selectedValue={this.state.selectedDay}
                    itemStyle={{color:"black", fontSize:26}}
                    lineColor={'#999999'}
                    onValueChange={(index) => {
                      this.setState({selectedDay: index})
                    }}>
                      {this.state.itemListDay.map((value, i) => (
                        <Picker.Item label={value + ''} value={i} key={i}/>
                      ))}
                  </Picker>
                  <Picker style={{flex:1, height: 180}}
                    selectedValue={this.state.selectedHour}
                    itemStyle={{color:"black", fontSize:26}}
                    lineColor={'#999999'}
                    onValueChange={(index) => {
                      this.setState({selectedHour: index})
                    }}>
                      {this.state.itemListHour.map((value, i) => (
                        <Picker.Item label={value + ''} value={i} key={i}/>
                      ))}
                  </Picker>
                  <Picker style={{flex:1,height: 180}}
                    selectedValue={this.state.selectedMinute}
                    itemStyle={{color:"black", fontSize:26}}
                    lineColor={'#999999'}
                    onValueChange={(index) => {
                      this.setState({selectedMinute: index})
                    }}>
                      {this.state.itemListMinute.map((value, i) => (
                        <Picker.Item label={value + ''} value={i} key={i}/>
                      ))}
                  </Picker>
              </View>
            </View>
          </BottomBase>
        )
    }

    onPickerSelect(index){

    }
}