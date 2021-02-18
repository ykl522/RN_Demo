import Toast from 'react-native-easy-toast';
import React from 'react';
import { w } from '../util/CStyle';

  /* 全局toast
   * global.Toast.setTextStyle({color: '#ff3636'})
   * global.Toast.show('...........')
   */
export default class ToastComponent extends React.Component {
    constructor(props){
      super(props)
      this.defaultTextStyle={color:'white', fontSize: 34.375*w}
      this.state={
        textStyle:this.defaultTextStyle
      }
    }
    //防止内存泄漏
    componentWillUnmount() {
        global.Toast = null;
    }

    setTextStyle(textStyle){
      this.setState({textStyle: textStyle})
    }

    show(text,duration=2000,callback){
        this.toast && this.toast.show(text,duration,()=>{
        if(JSON.stringify(this.state.textStyle) != JSON.stringify(this.defaultTextStyle)){
          this.state.textStyle=this.defaultTextStyle
          this.setTextStyle(this.state.textStyle)
        }
        callback && callback()
      })
    }

    close(duration){
        this.toast && this.toast.close(duration)
    }
  
    render() {
        return (<Toast  
          style={{backgroundColor:'black', padding: 20 * w, borderRadius: 18.75*w, minHeight: 140*w, justifyContent: 'center', alignContent: 'center', padding: 31.25*w}}
          position='center'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={[{color:'white', fontSize: 34.375*w}, this.state.textStyle]} 
          ref={e => this.toast = e}/>);
    }
  }