

import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import { w } from '../util/CStyle';
import CustomList from '../widget/CustomList';

/**
 * Test界面
 * create by ykl on 2021//
 */
export default class TestScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data: [{title: '22'},{title: '2233333333333'},{title: '223336733333'},{title: '2233333443333'},{title: '2332333333333333'}]
        }

    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    _renderItem(item){
        return(
            <View style={{height: 280*w, justifyContent:'center', alignItems:'center'}}>
                <Text>{item.title}</Text>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.screen}>
                <CustomList 
                    pageSize={5}
                    style={{backgroundColor: '#eee'}}
                    data={this.state.data}
                    renderItem={({item})=>this._renderItem(item)}
                    onRefresh={()=>{
                        let data = [{title: '---FFF'},{title: '12233333333333'},{title: '1223336733333'},{title: '12233333443333'},{title: '12332333333333333'}]
                        this.setState({data: data})
                    }}
                    onEndReached={(pageIndex)=>{
                        let data = [{title: pageIndex + '---555'},{title: '12233333333333'},{title: '1223336733333'},{title: '12233333443333'},{title: '12332333333333333'}]
                        if(pageIndex ==3) {
                            data = [{title: pageIndex + '---444'},{title: '12233333333333'},{title: '1223336733333'},{title: '12332333333333333'}]
                        }
                        this.state.data = this.state.data.concat(data)
                        this.setState({data: this.state.data})
                        // alert(pageIndex)
                    }}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    }
})