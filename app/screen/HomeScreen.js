import React from 'react';
import {
  View,
  Text,
  StyleSheet,BackHandler, TouchableOpacity
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Actions from '../util/Actions';
import Drawer from 'react-native-drawer'
import { myAlert, w, CommonStyle } from '../util/CStyle';
import ToastManager from '../util/ToastManager';
import ItemLayout from '../widget/ItemLayout';
import HeadView from '../widget/HeadView';
import BottomDrawer from '../widget/BottomDrawer';
import Storage from '../util/Storage';
import CodePush from "react-native-code-push";

let lastBackPressed  = Date.now()
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    Actions.setNavigation(this.props.navigation);
    this.state={
      showDrawer: false,
      language: {_text_: 'English', i18n: 'en'},
      i18n: 'en'
    }
    this.props.navigation?.setParams({
      title: 'HOME',
      headLeftIcon: require('../image/head/ic_head_drawer.png'),
      onLeftClick: ()=>{
        this.drawer?.open()
      }
    });
  }

  componentDidMount(){
    if (Platform.OS === 'android' && !this.lastBackTime) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onBackAndroid.bind(this),
      );
    }
  }

  // UNSAFE_componentWillMount() {
  //   if (Platform.OS === 'android' && !this.lastBackTime) {
  //     BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       this.onBackAndroid.bind(this),
  //     );
  //   }
  // }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.onBackAndroid.bind(this),
      );
    }
  }

  onBackAndroid() {
    // alert(global.routeName)
    if (global.routeName) {
      if (global.routeName != 'Main') {
        Actions.pop();
        return true;
      } else {
        // const now = Date.now()
        // let timeDec = now - this.state.lastBackTime
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
          
          // ToastAndroid.show('再按一次退出应用' + timeDec, ToastAndroid.SHORT);
          BackHandler.exitApp();
          return;
        } else {
          ToastManager.show('再按一次退出应用');
          lastBackPressed = Date.now();
          // Actions.pop();
          // return false;
          return true;
        }
        
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Drawer
          ref={c => this.drawer = c}
          tapToClose
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          panOpenMask={0.2}
          onClose={()=>{
            this.selector?.close()
          }}
          styles={{
            main: {shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 10},
            mainOverlay: {backgroundColor: 'black', opacity: 0},
          }}
          tweenHandler={(ratio) => ({
            // main: { opacity:(2-ratio)/2 },
            mainOverlay: {
              opacity: ratio / 2,
            }
          })}
          type="overlay"
          negotiatePan
          content={
            <BottomDrawer
              ref={ref=>this.selector=ref}
              data={[{_text_: 'English', i18n: 'en'}, {_text_: '中文', i18n: 'zh'}]}
              onSelector={(item)=>{
                this.setState({language: item})
              }}
            >
              <View style={{flex: 1, backgroundColor: '#f7f6f5'}}>
                {this._getHeadView({username:'username'}, true)}
                <ItemLayout 
                  style={{marginTop: 40*w, backgroundColor: '#00000000'}}
                  title={'Language'}
                  titleStyle={{fontWeight: 'bold'}}
                  rightContent={this.state.language._text_}
                  onClick={()=>{
                    this.selector.open()
                  }}
                />
                <ItemLayout 
                  style={{marginTop: 40*w, backgroundColor: '#00000000'}}
                  titleStyle={{fontWeight: 'bold'}}
                  title={'About'}
                  onClick={()=>{

                  }}
                />
                <View style={{flex: 1}}/>
                <TouchableOpacity 
                  onPress={()=>{
                    Storage.set('UserInfo', '')
                    Actions.navigate('LoginScreen')
                    this.drawer.close()
                  }}
                  style={{justifyContent: 'center', alignItems: 'center', height: 80*w, backgroundColor: '#fff'}}>
                  <Text style={{fontSize: 30*w}}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </BottomDrawer>
          }
          >
        <View style={{flex: 1, backgroundColor:'#f0f0f0'}}>
          <HeadView navigation={this.props.navigation} />
          {this._getHeadView({username:'username'})}
          <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent: 'center',margin: 30*w, borderRadius: 10*w, backgroundColor: '#fff'}}>
          <ItemLayout 
            rightHidden
            style={styles.item}
            leftIcon={require('../image/finished.png')}
            leftIconStyle={{width: 120*w, height: 120*w}}
            bottomContent={'CopyScreen'}
            onClick={()=>{
              Actions.navigate('CopyScreen')
            }}
          />
          <View style={CommonStyle.line}/>
          <ItemLayout 
            rightHidden
            style={styles.item}
            leftIcon={require('../image/finished.png')}
            leftIconStyle={{width: 120*w, height: 120*w}}
            bottomContent={'TestScreen'}
            onClick={()=>{
              Actions.navigate('TestScreen')
            }}
          />
          <View style={[CommonStyle.line_, {width: 344*w}]}/>
          <View style={[CommonStyle.line_, {width: 344*w}]}/>
          <ItemLayout 
            rightHidden
            style={styles.item}
            leftIcon={require('../image/finished.png')}
            leftIconStyle={{width: 120*w, height: 120*w}}
            bottomContent={'sync'}
            onClick={()=>{
              CodePush.allowRestart()
              this.sync()
            }}
          />
          <View style={CommonStyle.line}/>
          <ItemLayout 
            rightHidden
            style={styles.item}
            leftIcon={require('../image/finished.png')}
            leftIconStyle={{width: 120*w, height: 120*w}}
            bottomContent={'getUpdateMetadata'}
            onClick={()=>{
              this.getUpdateMetadata()
            }}
          />
          </View>
          {this.state.syncMessage && <Text style={{padding: 15*w, color: '#333', fontSize: 30*w}}>{this.state.syncMessage + '---' + (this.state.progress ? (this.state.progress?.receivedBytes + '/' + this.state.progress?.totalBytes) : '')}</Text>}
        </View>
        </Drawer>
      </SafeAreaView>
    );
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
      .then((metadata) => {
        this.state.metadata = metadata
        if(metadata){
          alert(JSON.stringify(metadata,null,2))
        }
        this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version...", progress: false });
      }, (error) => {
        this.setState({ syncMessage: "Error: " + error, progress: false });
      });
  }

  sync() {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE, 
        updateDialog: {
          title:'更新提醒',
          optionalUpdateMessage : '检查到更新！\n' + this.state.metadata?.description,
          optionalIgnoreButtonLabel: '取消',
          optionalInstallButtonLabel : '更新',
          mandatoryContinueButtonLabel: '马上更新',
          mandatoryUpdateMessage: '检查到重要更新！\n' + this.state.metadata?.description,
        }
      },
      (syncStatus)=>{
        switch(syncStatus) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            this.setState({ syncMessage: "Checking for update." });
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ syncMessage: "Downloading package." });
            break;
          case CodePush.SyncStatus.AWAITING_USER_ACTION:
            this.setState({ syncMessage: "Awaiting user action." });
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ syncMessage: "Installing update." });
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            this.setState({ syncMessage: "App up to date.", progress: false });
            break;
          case CodePush.SyncStatus.UPDATE_IGNORED:
            this.setState({ syncMessage: "Update cancelled by user.", progress: false });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
            break;
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            this.setState({ syncMessage: "An unknown error occurred.", progress: false });
            break;
        }
      },
      (progress)=>{
        this.setState({ progress: JSON.stringify(progress) })
      }
    );
  }

  _getHeadView(userInfo, isDrawer){
    let parentStyle= {
      flexDirection: 'row', 
      backgroundColor: isDrawer?'#368866':'#00000000', 
      paddingVertical: isDrawer?60*w:20*w, 
      paddingHorizontal: 30*w
    }
    return(
      <View style={parentStyle}>
        <View style={{borderRadius: 40*w, width: 80*w, height: 80*w, backgroundColor: '#fff'}}></View>
        <View style={{marginLeft: 15*w}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30*w, fontWeight: 'bold', color: isDrawer?'#fff':'#000'}}>{userInfo?.username}</Text>
            <View style={{backgroundColor: isDrawer?'#fff':'#368866', borderRadius: 20*w,justifyContent:'center', alignContent:'center', height: 40*w, paddingHorizontal: 12*w, marginLeft: 15*w}}>
              <Text style={{fontSize: 22*w, color: isDrawer?'#368866':'#fff'}}>标签......</Text>
            </View>
          </View>
          <Text style={{fontSize: 26*w, color: isDrawer?'#fff':'#999'}}>个人说明..................</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  item:{
    width: 344*w,
    alignItems: 'center', 
    paddingLeft: 20*w,
    paddingRight: 20*w,
    paddingVertical: 60*w,
    backgroundColor: '#00000000'
  }
})