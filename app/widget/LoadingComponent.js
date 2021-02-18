import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View, Modal } from "react-native";
import {i18n} from '../i18n'
import { w } from "../util/CStyle";
export default class LoadingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.minShowingTime = 300;
        this.maxShowingTime = 20000;
        this.state = {
            isLoading : false,
            setIsLoading : (isLoading) => {
                if (isLoading != this.state.isLoading) {
                    let curTimeLong = new Date().getTime();
                    if (isLoading) {
                        this.startTime = curTimeLong;
                        this.setState({
                            isLoading
                        }, ()=>{
                            let to = setTimeout(()=>{
                                this.setState({isLoading: false})
                                clearTimeout(to)
                            }, this.maxShowingTime)
                        });
                    } else {
                        let hasShowingTimeLong = curTimeLong - this.startTime;
                        if (hasShowingTimeLong < this.minShowingTime) {
                            let timeout = setTimeout(() => {
                                this.setState({
                                    isLoading
                                });
                                clearTimeout(timeout)
                            }, this.minShowingTime - hasShowingTimeLong);

                        } else {
                            this.setState({
                                isLoading
                            });
                        }
                    }

                }
            },
        };
    }


    componentWillUnmount() {
        global.Loading = null;
    }

    getIsLoading = () => {
        return this.state.isLoading
    }

    showLoading = (time) => {
        if(time)
            this.maxShowingTime = time
        this.state.setIsLoading(true);
    };
    dismissLoading = (time) => {
        if(time)
            this.minShowingTime = time
        this.state.setIsLoading(false);

    };

    render() {
        

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isLoading}
                onRequestClose={() => {
                    this.setState({ modalVisible: false });
                }}
            >
                <View style={[{flex:1,justifyContent:"space-around",alignItems:"center"}, this.props.img && {backgroundColor: '#00000099'}]}>
                    {
                    this.props.img ?
                        <View style={{borderRadius: 18.75*w,width: 340*w, height: 340*w,overflow:'hidden'}}>
                            <Image source={this.props.img} resizeMode={'contain'} style={{width: 340*w, height: 340*w}} />
                        </View>
                        : <View style={styles.loading}>
                            <ActivityIndicator color="white"/>
                            <Text style={styles.loadingTitle}>{i18n.t('Loading')}</Text>
                        </View>
                    }
                </View>

           </Modal>
                
          
        )
    }
}

const styles = StyleSheet.create({
    loading : {
        backgroundColor : '#10101099',
        height : 80,
        width : 100,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center',
     
      
    },
 
    loadingTitle : {
        marginTop : 10,
        fontSize : 14,
        color : 'white'
    }
});