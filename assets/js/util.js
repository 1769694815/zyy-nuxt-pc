import Cookies from 'js-cookie'

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

// 判断登录人信息
export function judgeUser() {
  let result = ''
  let userInfo = Cookies.getJSON('zyy_userInfo')
  if(!userInfo) {
    return
  }
  let roleName = userInfo.roleName
  switch(roleName) {
    case 'zyy_student':
      result = '学员'
      break;
    case 'zyy_instructor':
      result = '辅导员'
      break;
    case 'zyy_lecturer':
      result = '讲师'
      break;
    case 'zyy_headmaster':
      result = '班主任'
      break;
    case 'zyy_superAdmin':
      result = '超级管理员'
      break;
    case 'zyy_admin':
      result = '管理员'
      break;
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
export function formatStr(n) {
  return n > 9 ? n : (0 + '' + n)
}