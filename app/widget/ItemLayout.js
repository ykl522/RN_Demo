/**
 * 互动自定义控件
 * Created by ykl
 * on 16/6/17.
 */

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { w } from '../util/CStyle';

/**
 * title rightContent bottomContent topTitle onClick
 */
export default class ItemLayout extends React.Component {

  static defaultProps={
    rightHidden: false,     //是否隐藏右边图标
    showBorder: false,      //是否显示边框
  };

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    //左边/上面图片
    let leftIcon = this.props.leftIcon ? (<Image resizeMode={'contain'} style={[{ width: 40*w, height: 40*w }, this.props.leftIconStyle]} source={this.props.leftIcon} />) : null
    //右边图片
    let rightIcon = this.props.rightHidden || this.props.showLoading ? null : (
      this.props.isTriangle
        ? <View style={[mStyle.triangleRight, this.props.rightIconStyle]} />
        : <Image resizeMode={'contain'} style={[{ width: 32*w, height: 32*w, marginLeft: 2*w, marginTop: 2*w }, this.props.rightIconStyle]} source={this.props.rightIcon || require('../image/common/ic_right_arrow.png')} />
    )
    //标题
    let title = (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            allowFontScaling={false}
            style={[{ fontSize: 30*w, textAlignVertical: 'center', color: '#4d4d4d' }, this.props.titleStyle]}
          >{this.props.title || ''}</Text>
          {this.props.subTitle ? <Text  allowFontScaling={false} style={{ fontSize: 30*w, color: this.props.subTitleColor || '#333' }} >{this.props.subTitle}</Text> : null}
          {this.props.titleTag
            ? <View style={{ backgroundColor: '#ff823e', marginLeft: 10*w, borderRadius: 12*w, paddingLeft: 8*w, paddingRight: 8*w, paddingTop: 4*w, paddingBottom: 4*w }}>
              <Text 
                allowFontScaling={false} 
                style={{ color: '#fff', fontSize: 16*w }}>{this.props.titleTag}</Text>
            </View> : null}
        </View>
        {this.props.showRedDot && <View style={{width: 15*w, height: 15*w, backgroundColor: 'red', borderRadius: 7.5*w, marginLeft: 12*w}} />}
      </View>)
    //标题下面内容
    let titleBottomContent = this.props.titleBottomContent ? (
      <View>
        <Text
          allowFontScaling={false}
          style={[{ marginTop: 11*w, fontSize: 30*w, marginBottom: 4*w, color: '#808080' }, this.props.titleBottomStyle]}
        >{this.props.titleBottomContent || ''}</Text>
      </View>
    ) : null
    //最底部内容 style alignItems: 'center' 可以让leftIcon和bottomContent 居中显示
    let bottomContent = this.props.bottomContent ? (
      <View style={{flexDirection: 'row', justifyContent: 'center' }}>
        <Text
          allowFontScaling={false}
          style={this.props.bottomStyle || { fontSize: 30*w, color: '#808080', marginTop: 14*w }}
        >{this.props.bottomContent || ''}</Text>
      </View>
    ) : null
    {/** rightParentStyle 可让右边方案置顶配置 alignItems: "flex-start", flexDirection: "column" */}
    let rightContent =
      this.props.rightContent || this.props.rightPoint
        ? <View style={[{ flexDirection: 'row', alignItems: 'center' }, this.props.titleFlexZero ? { flex: 1, marginLeft: 30*w, justifyContent: 'flex-end' } : {}, this.props.rightParentStyle]}>
          <Text
            allowFontScaling={false}
            style={[mStyle.text,{fontSize: 30*w}, this.props.rightStyle]}
          >{this.props.rightContent || ''}</Text>
          <Text
            allowFontScaling={false}
            style={this.props.rightPointStyle || { fontSize: 30*w, color: '#EF5322', fontWeight: '700' }}
          >{this.props.rightPoint || ''}</Text>
        </View> : null
    let loadingView = !this.props.showLoading ? null : (
      <ActivityIndicator size='small' style={{ marginLeft: 10*w }} />
    )

    return (
      <TouchableOpacity
        style={[{ backgroundColor: '#fff', paddingLeft: 30*w, paddingRight: 24*w, marginTop: 0, marginBottom: 0 }, this.props.style || { justifyContent: 'center' }]}
        activeOpacity={this.props.disabled ? 1 : this.props.activeOpacity ? this.props.activeOpacity : (this.props.onClick ? 0.5 : 1)} 
        onPress={()=>!this.props.disabled && this.props.onClick && this.props.onClick()} 
        onLongPress={this.props.onLongPress}>
        {this.props.topTitle && <Text style={[mStyle.text, {fontSize: 30*w, marginTop: 10*w, marginBottom: 10*w},this.props.topTitleStyle]}><Text style={{color: 'red'}}>{this.props.required && '*'}</Text>{this.props.topTitle}</Text>}  
        <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: this.props.center ? 'center' : 'flex-start' }, this.props.leftTopStyle, this.props.showBorder && mStyle.border]}>
          {leftIcon}
          {this.props.title || this.props.titleBottomContent ? (
            <View style={[{ flex: this.props.center || this.props.titleFlexZero ? 0 : 1, justifyContent: 'center', marginLeft: this.props.leftIcon ? 20*w : 0 }, this.props.titleParentSytle]} >
              {title}
              {titleBottomContent || this.props.titleBottomText}
            </View>) : null}
          {rightContent}
          {rightIcon}
          {loadingView}
        </View>
        {bottomContent}
      </TouchableOpacity>
    )
  }
}

// 类型声明
ItemLayout.propTypes = {
  rightHidden: PropTypes.bool, // 隐藏右边箭头
  leftIcon: PropTypes.any, // 左边图标
  title: PropTypes.string, // 主标题
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rightContent: PropTypes.string, // 主标题右边说明内容
  rightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  bottomContent: PropTypes.string, // 图标下面说明内容
  bottomStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleBottomContent: PropTypes.string, // 主标题下面说明内容
  titleBottomStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // 主标题下面说明内容样式
  layoutHeight: PropTypes.number, // 控件高度
  onClick: PropTypes.func, // 控件点击事件
  titleTag: PropTypes.string, // 标题标
  required: PropTypes.bool //topTitle是否有必填的星号
}

const mStyle = StyleSheet.create({
  triangleRight: {
    borderTopWidth: 8*w,
    borderTopColor: 'transparent',
    borderLeftWidth: 8*w,
    borderLeftColor: '#999',
    borderBottomWidth: 8*w,
    borderBottomColor: 'transparent',
    marginRight: 12 * w,
    marginLeft: 14 * w
  },
  border: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15 * w,
    marginBottom: 1 * w,
  },
  text:{
    color: '#333'
  }
})
