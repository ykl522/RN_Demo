import axios from 'axios';
import {baseURL,Token} from '../net/StaticConstant';
import { myLog } from '../util/CStyle';

const instance = axios.create({
    baseURL: baseURL,
    timeout: 20000
});

const defaultHeaders ={
    headers:{
        "Accept":"application/json, text/plain, */*",
        "Content-Type":"application/json;charset=utf-8",
        "Access_token":Token
    }
}

export function updateSimsUrl(url){
    instance.defaults.baseURL = url
}

//请求拦截处理
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    // return Promise.reject(error);
    return Promise.resolve(error);
});

export const httpPost = async (api,body, config=defaultHeaders) => {
    return new Promise((resolve)=>{
        instance.post(api, body,config).then(res=>{
            // myLog(res)
            let ret = {};
            if(res?.data){
                ret={
                    code: res.status,
                    data: res.data.Item || res.data,
                    msg: res.data.Message
                }
            }else{
                ret={
                    code:-6,
                    data:null,
                    msg:res.message
                }
            }
            resolve(ret)
        })
    })
} 