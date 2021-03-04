/**
 * TabViewPager
 * create by ykl on 2021/2/7
 */
import React from 'react'
import { View,StyleSheet,TouchableOpacity,Text,Image } from 'react-native'
import { w,CommonStyle } from '../util/CStyle';
import ViewPager from '@react-native-community/viewpager';
import ToastManager from '../util/ToastManager';
import CustomList from './CustomList';

/**
 * hideLength 隐藏标题上长度
 * 
 * nullView 数据为空时显示的内容 可以结合NullView, 类型函数传递一个index可作为key
 * 
 * dataList=[{tab:'', data:[{...},...], view: [{head:'',key:'',imgs:[require('../...')]},...]},...]
 */
export default class TabViewPager extends React.Component{

    constructor(props){
        super(props)
        this.viewPager = React.createRef();
        this.state={
            navActive: 0,
            showNullView: false,
        }
    }

    /**
     * 切换tab
     * @param  第 index+1 个tab 
     */
    _goPage(index){
        this.viewPager.current.setPage(index);
    }

    render(){
        return(
            <View style={[{flex: 1}, this.props.style]}>
                {this.props.dataList && this.props.dataList.length>1 && 
                    <View style={styles.nav}>
                        {this.props.dataList.map((item,index)=>{
                            return (
                                <TouchableOpacity 
                                    style={{width:`${100/this.props.dataList.length}%`}} 
                                    key={index} 
                                    activeOpacity={.6} 
                                    onPress={()=>{
                                        this.state.navActive = index
                                        this._goPage(index)
                                    }}
                                >
                                    <View style={styles.NavItem}>
                                        <Text style={[this.state.navActive==index ? {fontWeight:'bold', color: '#0D8484'} : {color: 'rgba(13, 132, 132, 0.5)'}, CommonStyle.baseText]}>{item.tab + (item.hideLength ? '' : ('(' + (item.data?.length || 0) + ')'))}</Text>
                                        {this.state.navActive==index && <View style={[styles.line]}></View> }
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                }
                <ViewPager 
                    style={{flex:1, backgroundColor: '#fff'}}
                    ref={this.viewPager}
                    initialPage={0}
                    onPageSelected={e=>{
                        this.state.navActive = e.nativeEvent.position
                        this.setState({
                            navActive:e.nativeEvent.position
                        }, ()=>{
                            if(this.props.tabSelected){
                                this.props.tabSelected(this.state.navActive)
                            }
                        });
                    }}
                >
                    {
                        this.props.dataList?.map((tabItem, i)=>{
                            return !this.props.nullView || tabItem.data?.length > 0 ? (
                                <CustomList
                                    key={i}
                                    ListHeaderComponent={this._headView(tabItem.view)}
                                    data={tabItem.data}
                                    renderItem={({ item }) => this._renderItem(item, tabItem.view)}
                                />
                            ) : 
                            this.props.nullView(i)
                        })
                    }
                </ViewPager>
            </View>
        )
    }

    //头部 标题
    _headView(view){
        return(
            <View style={styles.tabItemHead}>
                {
                    view?.map((v,i)=>{
                        return(
                            <View key={i} style={[v.style,{flexDirection: 'row', alignItems: 'center'}]}>
                                <View style={{flex: 1}}>
                                <Text style={[{color: '#999', textAlign: 'center', fontSize: 31.25*w}]}>{v.head}</Text>
                                </View>
                                {i<view.length-1 && <View style={{width: 3.125*w, height: 84.38*w, backgroundColor: '#e8e8e8'}}/>}
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    /**
     * 列表子项
     */
    _renderItem(item, view){
        return(
            <View style={{marginHorizontal: 31.25*w}}>
                <View style={{flexDirection:'row', flex: 1, justifyContent: 'center', alignItems: 'center', height: 109.38*w}}>
                    <View style={{width:1.5625*w, backgroundColor: '#eee', height: 109.38*w}}/>
                    {
                        view?.map((v, i)=>{
                            return(
                                <TouchableOpacity 
                                    key={i} 
                                    activeOpacity={0.7}
                                    style={[v.style,{justifyContent: 'center', alignItems: 'center', height: 109.38*w}]} 
                                    onPress={()=>{
                                        if(v.onPress) {
                                            v.onPress(item)
                                            return
                                        }
                                        if(v.imgs && item[v.key]){
                                            ToastManager.show(item[v.key])
                                        }
                                    }}
                                >
                                    {
                                        !v.imgs ?
                                        <Text key={i} style={[{textAlign: 'center',color: v.onPress ? '#0d8484' : '#353535',fontSize: 28.125*w, paddingHorizontal: 10*w}]}>{(item[v.key] || '') + (v._key ? '/' : '')}{v._key && <Text style={{color: item[v.key] == item[v._key] ? '#0D8484' : '#FAAD39'}}>{item[v._key]}</Text>}</Text>
                                        :
                                        <Image resizeMode={'contain'} style={{width:50*w, height:50*w}} source={v.key && item[v.key] ? v.imgs[1] : v.imgs ? v.imgs[0]:null}></Image>
                                    }
                                    
                                </TouchableOpacity>
                            )
                        })
                    }
                    <View style={{width:1.5625*w, backgroundColor: '#eee', height: 109.38*w}}/>
                </View>
                <View style={{height: 1.5625*w, backgroundColor: '#eee'}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav:{
        flexDirection:'row',
        height:96.88 * w,
        justifyContent:'space-between',
        backgroundColor:'#00000000',
    },
    NavItem:{
        position:'relative',
        height:`100%`,
        justifyContent:'center',
        alignItems:'center'
    },
    line:{
        position:'absolute',
        height:4.69 * w,
        width:80 * w,
        borderRadius:5 * w,
        top:88 * w,
        backgroundColor: '#0D8484'
    },
    fontSize24: {
        fontSize: 24 * w,
    }, 
    fontSize20: {
        fontSize: 20 * w,
    },
    tabItemHead: {
        flexDirection:'row', 
        flex: 1, 
        backgroundColor: '#eee', 
        height: 84.38*w, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 31.25*w, 
        marginTop: 20*w, 
        borderTopLeftRadius: 15.625*w, 
        borderTopRightRadius: 15.625*w
    }
});