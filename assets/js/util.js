import Cookies from 'js-cookie'
import { Base64 } from '~/assets/js/base64.js'

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (val instanceof Array) {
      if (val.length == 0) return true;
  } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') return true;
  } else {
      if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
      return false;
  }
  return false;
};

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
  let list = [];
  let result = true;
  let msg = '';
  var isPhone = /^0\d{2,3}-?\d{7,8}$/;
  //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/;
  if (!validatenull(phone)) {
      if (phone.length == 11) {
          if (isPhone.test(phone)) {
              msg = '手机号码格式不正确';
          } else {
              result = false;
          }
          
      } else {
          msg = '手机号码长度不为11位';
      }
  } else {
      msg = '手机号码不能为空';
  }
  list.push(result);
  list.push(msg);
  return list;
}

// 判断登录人信息  1 普通学员 2 班主任 3 讲师
export function judgeUser() {
  let result = {}
  let userInfo = Cookies.getJSON('zyy_userInfo')
  if(!userInfo) {
    return
  }
  let roleName = userInfo.roleName
  switch(roleName) {
    case 'zyy_student':
      result['role'] = '学员'
      result['status'] = 1
      break;
    case 'zyy_instructor':
      result['role'] = '辅导员'
      result['status'] = 1
      break;
    case 'zyy_lecturer':
      result['role'] = '讲师'
      result['status'] = 3
      break;
    case 'zyy_headmaster':
      result['role'] = '班主任'
      result['status'] = 2
      break;
    case 'zyy_superAdmin':
      result['role'] = '超级管理员'
      result['status'] = 1
      break;
    case 'zyy_admin':
      result['role'] = '管理员'
      result['status'] = 1
      break;
    case 'zyy_student,zyy_headmaster':
      result['role'] = '学员,讲师'
      result['status'] = 2 // 同时为此二个角色时，statu为2
      break;
    case 'zyy_lecturer,zyy_headmaster':
      result['role'] = '讲师,班主任'
      result['status'] = 3 // 同时为此二个角色时，statu为3
      break;
    default:
      result['role'] = ''
      result['status'] = 1
  }
  return result;
}

// 时间戳转字符串
export function formatStamp(time) {
  let date = new Date(parseInt(time))
  let y = date.getFullYear()
  let m = formatStr(date.getMonth() + 1)
  let d = formatStr(date.getDate())
  return `${y}-${m}-${d}`
}

export function formatStamp2(date) {
  let y = date.getFullYear()
  let m = formatStr(date.getMonth() + 1)
  let d = formatStr(date.getDate())
  return `${y}-${m}-${d}`
}

// 时间戳转字符串
export function formatStamp3(time) {
  let y = time.getFullYear()
  let m = formatStr(time.getMonth() + 1)
  let d = formatStr(time.getDate())
  return `${y}-${m}-${d}`
}

export function formatStr(n) {
  return n > 9 ? n : (0 + '' + n)
}

// 秒转小时分钟
export function formatSeconds(time) {
  if(time < 3600) {
    let min = Math.floor(time / 60)
    let sec = formatStr(time % 60)
    return `${min}:${sec}`
  } else {
    let hours = Math.floor(time / 3600)
    let min = Math.floor((time - hours * 3600) / 60)
    let sec = formatStr(time % 60)
    return `${hours}:${min}:${sec}`
  }
}

// 获取服务端cookie
export function getcookiesInServer(req) {
  let service_cookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    let parts = val.split('=');
    service_cookie[parts[0].trim()] = (parts[1] || '').trim();
  })
  return service_cookie
}
