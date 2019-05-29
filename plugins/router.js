import Cookies from 'js-cookie'
import { Base64 } from '~/assets/js/base64.js'
import { getcookiesInServer } from '~/assets/js/util.js'

export default ({ app, $axios, req, res }) => {
  app.router.beforeEach((to, from, next) => {
    if(to.name == 'token') {
      next()
      return
    }
    let isClient = process.client
    let isServer = process.server
    let token
    if(req) {
      if(isServer) {
        let cookies = getcookiesInServer(req)
        token = cookies.zyy_accessToken ? cookies.zyy_accessToken : ''
        console.log('tokenaa', token)
      }
      if(isClient) {
        let token = Cookies.get('zyy_accessToken')
      }
      if(token) {
        $axios.setHeader('Authorization', 'Bearer' + token)
        next()
      } else {
        const clientId = 'zyy_web'
        const clientSecret = '7BPvPjnxRHRHpyKLTdLOtA=='
        const encodeStr = Base64.encode(clientId + ':' + clientSecret);
        let params = {
          username: '',
          password: '',
          scope: 'server',
          grant_type: 'client_credentials'
        }
        $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        $axios.setHeader('Authorization', 'Basic' + ' ' + encodeStr)
        $axios.post('/auth/oauth/token', params).then(res => {
          Cookies.set('zyy_accessToken', res.access_token, { expires: 1 })
          $axios.setHeader('Authorization', 'Bearer' + res.access_token)
          next()
        })
      }
    } else {
      next()
    }
  })
}