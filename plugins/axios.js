import qs from 'qs'
import { Base64 } from '~/assets/js/base64.js'
import Cookies from 'js-cookie'

const clientId = 'zyy_web'
const clientSecret = '7BPvPjnxRHRHpyKLTdLOtA=='
const encodeStr = Base64.encode(clientId + ':' + clientSecret);
let params = {
  username: '',
  password: '',
  scope: 'server',
  grant_type: 'client_credentials'
}
export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.data = qs.stringify(config.data, {
      allowDots: true //Option allowDots can be used to enable dot notation
    });
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
      redirect('/')
    }
    if(code == 404) {
      // redirect('/status/404')
    }
    return Promise.reject(error);
  });

  if(!Cookies.get('zyy_accessToken')) {
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    $axios.setHeader('Authorization', 'Basic' + ' ' + encodeStr)
    $axios.post('/auth/oauth/token', params).then(res => {
      Cookies.set('zyy_accessToken', res.access_token, { expires: 1 })
      $axios.setHeader('Authorization', 'Bearer' + res.access_token)
    })
  } else {
    $axios.setHeader('Authorization', 'Bearer' + Cookies.get('zyy_accessToken'))
  }
  
  // $axios.setHeader('Authorization', 'Bearerbeb31048-148a-4910-8c1b-f42cb5a83115')

}

