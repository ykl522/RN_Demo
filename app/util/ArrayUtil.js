/**
 * 数组工具
 * create by ykl on 2020/11/16
 */
class ArrayUtil{

    /**
     * 对象数组去重
     * @param {*} arr 
     * @param {*} key 去重的唯一关键key
     */
    _cleanObjs(arr, key){
        if(arr && arr.length > 0)
            return arr.reduce((all,next)=>all.some((arrItem)=>arrItem[key]==next[key])?all:[...all,next],[])
        return arr
    }

    //数组去重
    _cleanStrs(arr){
        if(arr && arr.length > 0)
            return new Set(arr)
        return arr
    }

    /**
     * 删除数组元素
     * @param {*} arr 
     * @param {*} key  
     * @param {*} id 
     */
    _deleteObj(arr,key,id){
        if(arr && arr.length > 0)
            return arr.splice(arr.findIndex(arrItem => arrItem[key] === id), 1)
        return arr
    }

    //找到key的值和id相等的所有item
    _findSame(arr, key, id){
        if(arr && arr.length > 0){
            let newArr = []
            for(let arrItem of arr){
                if(typeof(arrItem) === 'object'){
                    if(arrItem[key] == id){
                        newArr.push(arrItem)
                    }
                }
            }
            return newArr
        }
        return arr
    }

    //找到单个元素
    _findItem(arr, key, id){
        if(arr && arr.length > 0){
            for(let arrItem of arr){
                if(typeof(arrItem) === 'object'){
                    if(arrItem[key] == id){
                        return arrItem
                    }
                }
            }
        }
        return {}
    }

    /**
     * 对象数组是否包含某个元素   
     * let arr = [{a:1},{b,2}]
     * _isIncludeItem(arr,b,2)  //true
     */
    _isIncludeItem(arr, key, id){
        if(arr && arr.length > 0){
            for(let arrItem of arr){
                if(typeof(arrItem) === 'object'){
                    if(arrItem[key] == id){
                        return true
                    }
                }
            }
        }
        return false
    }

    //合并对象
    _mergeNotNull(obj1={},obj2={}){
        if(obj1 && obj2){
            //删除空值
            // var removePropertyOfNull=function(obj){
            //     Object.keys(obj).forEach(item=>{
            //         if(!obj[item])  delete obj[item]
            //     })
            //     return obj;
            // }
            // removePropertyOfNull(obj2)
            Object.keys(obj2).forEach(item=>{
                if(!obj2[item])  delete obj2[item]
            })
            return Object.assign(obj1, obj2)
        }else{
            return obj1 || obj2 || {}
        }
    }

    /**
     * 生成一个从 start 到 end 的连续数组
     * _generateArray(4,9)//[4,5,6,7,8,9]
     * @param start
     * @param end
     */
    _generateArray (start, end) {
        return Array.from(new Array(end + 1).keys()).slice(start)
    }

}

export default new ArrayUtil()