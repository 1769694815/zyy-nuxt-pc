import Cookies from 'js-cookie'
import { Base64 } from '~/assets/js/base64.js'
import { getcookiesInServer } from '~/assets/js/util.js'

export default function({ $axios, route, req }) {
  let isClient = process.client
  let isServer = process.server
  
  if (isClient) {
    // console.log('route', route)
  }
  
  // 服务端渲染设置access_token
  if (isServer) {
    let token = getcookiesInServer(req).zyy_accessToken || ''
    // console.log('中间件token', token)
    const clientId = 'zyy_web'
    const clientSecret = '7BPvPjnxRHRHpyKLTdLOtA=='
    const encodeStr = Base64.encode(clientId + ':' + clientSecret)
    let params = {
      username: '',
      password: '',
      scope: 'server',
      grant_type: 'client_credentials'
    }
    $axios.setHeader('appId', 'zyy')
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    $axios.setHeader('Authorization', 'Basic' + ' ' + encodeStr)
    if (!token) {
      return $axios.post('/auth/oauth/token', params).then(res => {
        // console.log('accessToken', res)
        $axios.setHeader('Authorization', 'Bearer ' + res.access_token)
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve($axios.setHeader('Authorization', 'Bearer ' + token))
      })
    }
  }
}