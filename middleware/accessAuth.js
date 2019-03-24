import { Base64 } from '~/assets/js/base64.js'
import Cookies from 'js-cookie'

export default function ({ $axios, route }) {
  if(!Cookies.get('zyy_accessToken')) {
    const clientId = 'zyy_web'
    const clientSecret = '7BPvPjnxRHRHpyKLTdLOtA=='
    const encodeStr = Base64.encode(clientId + ':' + clientSecret);
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    $axios.setHeader('Authorization', 'Basic' + ' ' + encodeStr)
    let params = {
      username: '',
      password: '',
      scope: 'server',
      grant_type: 'client_credentials'
    }
    return $axios.post('/auth/oauth/token', params).then(res => {
      $axios.setHeader('Authorization', 'Bearer' + res.access_token)
    })
  }
}