import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View, Modal } from "react-native";
import { w } from "../util/CStyle";
export default class LoadingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.minShowingTime = 300;
        this.maxShowingTime = 20000;
        this.state = {
            isLoading: false,
            img: this.props.img,
            loadingText: this.props.loadingText,
            setIsLoading: (isLoading) => {
                if (isLoading != this.state.isLoading) {
                    let curTimeLong = new Date().getTime();
                    if (isLoading) {
                        this.startTime = curTimeLong;
                        this.setState({
                            isLoading
                        }, ()=>{
                            let to = setTimeout(()=>{
                                this.setState({
                                    img: this.props.img,
                                    loadingText: this.props.loadingText,
                                    setImg: false,
                                    isLoading: false
                                })
                                clearTimeout(to)
                            }, this.maxShowingTime)
                        });
                    } else {
                        let hasShowingTimeLong = curTimeLong - this.startTime;
                        if (this.minShowingTime && hasShowingTimeLong < this.minShowingTime) {
                            let timeout = setTimeout(() => {
                                this.setState({
                                    img: this.props.img,
                                    loadingText: this.props.loadingText,
                                    setImg: false,
                                    isLoading
                                })
                                clearTimeout(timeout)
                            }, this.minShowingTime - hasShowingTimeLong);

                        } else {
                            if(this.state.setImg){
                                this.setState({
                                    img: this.props.img,
                                    loadingText: this.props.loadingText,
                                    setImg: false,
                                    isLoading
                                })
                            }
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

    setLoading = (loadingText,img) => {
        this.state.setImg = true
        this.setState({img: img, loadingText: loadingText})
    }

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
                <View style={[{flex:1,justifyContent:"space-around",alignItems:"center"}, this.state.img && {backgroundColor: '#00000099'}]}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {
                    this.state.img ?
                        <View style={{borderRadius: 18.75*w,width: 340*w, height: 340*w,overflow:'hidden'}}>
                            <Image source={this.state.img} resizeMode={'contain'} style={{width: 340*w, height: 340*w}} />
                        </View>
                        : <View style={styles.loading}>
                            <ActivityIndicator color="white"/>
                        </View>
                    }
                    {this.state.loadingText && <Text style={styles.loadingTitle}>{this.state.loadingText}</Text>}
                    </View>
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
        fontSize : 18,
        color : 'white'
    }
});