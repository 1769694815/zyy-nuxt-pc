import axios from 'axios'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.common['Authorization'] = 'Basic cGlnOnBpZw==';
// axios.defaults.baseURL = 'http://132.232.173.47:3000/mock/25/yxs/api'
axios.defaults.baseURL = 'http://212.64.79.36:8080/yxs/api'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res
  } else {
    return Promise.reject(res)
  }
}, (error) => {
  return Promise.reject(error)
})

export function fetch (url, type, params) {
  return new Promise((resolve, reject) => {
    axios({ url, type, params })
      .then(res => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  /**
   * 获取首页信息
   */
  getIndex (params) {
    return fetch('/index', 'GET', params)
  }
}