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
   
    if (isClient) {
      // console.log('to', to)
      // console.log('from', from)
      if (to.name == 'login' && from.name) {
        let fromRouter = {
          name: from.name,
          query: from.query
        }
        window.localStorage.setItem('fromRouter', JSON.stringify(fromRouter))
      }
    }
    next()
  })
}