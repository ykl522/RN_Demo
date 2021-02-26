import React from 'react'
import { FlatList } from 'react-native';

export default class CustomList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data: this.props.data,
            isRefresh: this.props.refreshing|| false,
        }
        this.pageSize = this.props.pageSize
        this.pageIndex = 0
        this.dataFlag = this.pageSize && this.props.data.length == this.pageSize
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.data){
            this.state.data = nextProps.data
            if(this.state.isRefresh && nextProps.data.length == this.pageSize){
                this.pageIndex = 0
                this.dataFlag = true
            } else if(nextProps.data.length - this.props.data.length < this.pageSize){
                this.dataFlag = false
            } 
            this.state.isRefresh = false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(JSON.stringify(this.props.data) == JSON.stringify(nextProps.data)){
            return false
        }
        return true
    }

    onEndReached(){
        if (this.dataFlag) {
            this.pageIndex += 1;
            if(this.props.onEndReached) this.props.onEndReached(this.pageIndex)
        }
    }

    render(){
        return(
            <FlatList
                keyboardDismissMode='on-drag' 
                keyboardShouldPersistTaps="always"
                style={[{flex: 1}, this.props.style]}
                ListHeaderComponent={this.props.ListHeaderComponent}
                keyExtractor={(item, index) => ('' + index)}
                data={this.props.data}
                refreshing={this.state.isRefresh}//加载图标
                onRefresh={() => { 
                    this.props.onRefresh && this.setState({isRefresh: true}, ()=>{
                        this.props.onRefresh()
                    })
                }}
                renderItem={this.props.renderItem}
                onEndReached={() => this.onEndReached()} // 加载更多
                onEndReachedThreshold={.2}// 加载更多触发时机
            />
        )
    }

}