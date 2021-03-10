import React from 'react'
import { FlatList } from 'react-native';

/**
 * 上下拉刷新组件 支持分页 onEndReached返回回调函数pageIndex
 */
export default class CustomList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isRefresh: this.props.refreshing|| false,
        }
        this.pageSize = this.props.pageSize
        this.pageIndex = 0
        this.dataFlag = this.pageSize && this.props.data.length == this.pageSize
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.data){
            if(this.state.isRefresh && nextProps.data.length == this.pageSize){
                this.pageIndex = 0
                this.dataFlag = true
            } else if(this.props.data && nextProps.data.length - this.props.data.length < this.pageSize){
                this.dataFlag = false
            } 
            this.state.isRefresh = false
        }
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
                {...this.props}
                keyboardDismissMode='on-drag' 
                keyboardShouldPersistTaps="always"
                style={[{flex: 1}, this.props.style]}
                ListHeaderComponent={this.props.ListHeaderComponent}
                keyExtractor={(item, index) => ('' + index)}
                data={this.props.data}
                refreshing={this.state.isRefresh}//加载图标
                onRefresh={this.props.onRefresh ? () => { 
                    this.setState({isRefresh: true}, ()=>{
                        this.props.onRefresh()
                    })
                }: null}
                renderItem={this.props.renderItem}
                onEndReached={() => this.onEndReached()} // 加载更多
                onEndReachedThreshold={.2}// 加载更多触发时机
                ListEmptyComponent={this.props.nullView}
            />
        )
    }

}