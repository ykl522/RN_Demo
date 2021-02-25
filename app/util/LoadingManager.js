export default class LoadingManager {

    //是否显示
    static isShowing() {
        if(global.Loading){
            return global.Loading.getIsLoading()
        }
        return null
    }

    /**
     * 显示
     */
    static show(time) {
        if(global.Loading){
            global.Loading.showLoading(time)
        }
    }

    /**
     * 关闭
     */
    static close(time) {
        if(global.Loading){
            global.Loading.dismissLoading(time)
        }
    }

    /**
     * 设置
     */
    static set(loadingText,img){
        if(global.Loading){
            global.Loading.setLoading(loadingText,img)
        }
    }
}