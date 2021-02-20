
import {httpPost, httpTest} from './Request'
const api = {}
//登录
api.login=(username,password)=>httpTest('/api/UserLogin', {username,password})
export default api;