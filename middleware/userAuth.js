import Cookies from 'js-cookie'

export default function({ redirect }) {
  if(!Cookies.getJSON('zyy_userInfo')) {
    return redirect('/login')
  }
}