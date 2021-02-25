
/**
 * show close
 * react-native-easy-toast
 */
export default class ToastManager {

    static toast;

    /**
     * 显示toast
     * showToast
     * @param text
     * @param duration
     * @param callback
     */
    static show(text, duration=2000, callback) {
        //判断toast对象是否有值才调用show方法
        global.Toast && global.Toast.show(text, duration, callback);
    }

    /**
     * 关闭toast
     * closeToast
     * @param duration
     */
    static close(duration) {
        //判断toast对象是否有值才调用close方法
        global.Toast && global.Toast.close(duration);
    }


    static setTextStyle(textStyle){
        textStyle && global.Toast && global.Toast.setTextStyle && global.Toast.setTextStyle(textStyle)
    }
}