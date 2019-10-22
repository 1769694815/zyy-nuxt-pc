import qs from 'qs'
import { Base64 } from '~/assets/js/base64.js'
import Cookies from 'js-cookie'

export default function({ $axios, redirect, req }) {
  let isClient = process.client
  let isServer = process.server


  $axios.onRequest(config => {
    if (!config.headers.file) {
      config.data = qs.stringify(config.data, {
        allowDots: true //Option allowDots can be used to enable dot notation
      });
    }
    return config;
  });

  $axios.onResponse(response => {
    if(response.data.code == 2) {
      Cookies.remove('zyy_accessToken')
      Cookies.remove('zyy_userInfo')
      redirect('/login')
    } else {
      return Promise.resolve(response.data);
    }
    return Promise.resolve(response.data);
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if(code == 401) {
      Cookies.remove('zyy_accessToken')
      console.log('401')
      redirect('/token')
    } else if(code == 404 || code == 500) {
      redirect('/')
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  })

  // 客户端  客户端可以获取到Cookies, 服务端是获取不到的
  if (isClient) {
    let token = Cookies.get('zyy_accessToken') || ''
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
        // console.log('axios_accessToken', res)
        Cookies.set('zyy_accessToken', res.access_token, { expires: 1 })
        $axios.setHeader('Authorization', 'Bearer ' + res.access_token)
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve($axios.setHeader('Authorization', 'Bearer ' + token))
      })
    }
  }
}

