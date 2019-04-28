import Cookies from 'js-cookie'

export default function({ redirect }) {
  let info = Cookies.getJSON('zyy_userInfo')
  if(!info) {
    return redirect('/login')
  }
}