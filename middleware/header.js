
import Cookies from 'js-cookie'

export default function({ $axios, req, res }) {
  if(req) {
    let result = req.headers.cookie.split(';') || ''
    let cookies = []
    let token = ''
    for(let i in result) {
      cookies[i] = {
        name: result[i].split('=')[0].trim(),
        value: result[i].split('=')[1].trim()
      }
      if(cookies[i].name == 'zyy_accessToken') {
        token = cookies[i].value
        break;
      }
    }
    console.log('token', token)
    if(token) {
      $axios.setHeader('Authorization', 'Bearer' + token)
    }
  }
}