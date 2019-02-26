import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// json转Formdata
const jsonToFormdata = function(oldData) {
  let newStr = ''
  for (const item in oldData) {
    newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
  }
  return newStr.slice(0, -1)
}
// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['language'] = Cookies.get('language') || 'en-US'
    if (config.method.toLocaleLowerCase() === 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      config.transformRequest = [jsonToFormdata]
    }
    if (store.getters.token) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (!res.success) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 2 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 1001) {
        MessageBox.confirm(
          'Logged out, please log in again',
          'Confirm logout',
          {
            confirmButtonText: 're-login',
            cancelButtonText: 'Cannel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
