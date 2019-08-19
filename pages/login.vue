<template>
  <div>
    <v-header />
    <!-- <nav-bar /> -->
    <div class="login">
      <div class="wrap">
        <div class="box">
          <div class="tabs">
            <div
              :class="tab === 1 ? 'active' : ''"
              class="tab"
              @click="changeTab(1)">短信登录</div>
            <div
              :class="tab === 2 ? 'active' : ''"
              class="tab"
              @click="changeTab(2)">密码登录</div>
          </div>
          <div
            v-show="tab === 1"
            class="inputs1">
            <div class="input">
              <span class="img1" />
              <input
                v-model="form1.phone"
                type="text"
                placeholder="手机号">
            </div>
            <div class="input valid">
              <span class="img2" />
              <input
                v-model="form1.code"
                type="text"
                placeholder="验证码"
                @keyup.enter="login1">
              <div
                v-show="!timeShow"
                class="button"
                @click="getCode">获取验证码</div>
              <div
                v-show="timeShow"
                class="button">{{ count }}s后重试</div>
            </div>
            <input
              type="button"
              class="denglu"
              value="登录"
              @click="login1">
          </div>
          <div
            v-show="tab === 2"
            class="inputs1">
            <div class="input">
              <span class="img1" />
              <input
                v-model="form2.userName"
                type="text"
                placeholder="手机号/用户名">
            </div>
            <div class="input">
              <span class="img3" />
              <input
                v-model="form2.password"
                type="password"
                placeholder="密码"
                @keyup.enter="login2">
            </div>
            <el-checkbox
              v-model="form2.checked"
              class="checkbox">记住密码
            </el-checkbox>
            <div
              class="denglu"
              @click="login2">登录</div>
          </div>
          <div class="text">
            <span
              v-show="tab == 1"
              @click="modalShow">收不到验证码</span>
            <span
              v-show="tab == 2"
              @click="forget">忘记密码</span>
            <span @click="toRegister">注册账户</span>
          </div>
          <!-- <p><em /><span>其他方式登录</span><em /></p>
          <div class="other">
            <img src="../assets/images/other-login1.png">
            <img src="../assets/images/other-login2.png">
          </div> -->
        </div>
      </div>
    </div>
    <login-modal
      v-show="showModal"
      @hide-modal="hideModal" />
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import NavBar from '~/components/navBar.vue'
import LoginModal from '~/components/modal/loginModal.vue'
import { isvalidatemobile, validatenull } from '~/assets/js/util'
import Cookies from 'js-cookie'
export default {
  components: {
    NavBar,
    'v-header': Header,
    LoginModal
  },
  data() {
    return {
      tab: 1,
      timer: null,
      count: null,
      timeShow: false,
      showModal: false,
      form1: {
        type: 'MOBILE',
        phone: '',
        code: ''
      },
      form2: {
        type: 'PWD',
        userName: '',
        password: '',
        checked: false
      },
      pwdList: []
    }
  },
  computed: {
    getName: function () {
      return this.form2.userName
    }
  },
  watch: {
    getName: {
      handler: function (val, oldVal) {
        console.log(val)
        for (var i in this.pwdList) {
          if (this.pwdList[i].userName == val) {
            console.log(this.pwdList[i].userName)
            console.log(this.pwdList[i].password)
            this.form2.password = this.pwdList[i].password
            return
          } else {
            this.form2.password = ''
          }
        }
      }
    }
  },
  created () {
    let pwd = Cookies('pwd') || ''
    if (pwd) {
      this.pwdList = JSON.parse(pwd)
      console.log(this.pwdList)
      this.form2.userName = this.pwdList[0].userName
      this.form2.password = this.pwdList[0].password
      this.form2.checked = true
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab
    },
    // 跳转到注册页面
    toRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    // 短信登录
    login1() {
      let result = isvalidatemobile(this.form1.phone)
      if(result[0]) {
        this.$message({
          message: result[1],
          type: 'warning'
        })
        return
      }
      if(!this.form1.code) {
        this.$message({
          message: '验证码不能为空',
          type: 'warning'
        })
        return
      }
      this.$axios.post('/admin/api/web/account/login', this.form1).then(res => {
        if(res.code == 0) {
          Cookies.set('zyy_userInfo', res.data, { expires: 30 })
          this.$message({
            message: '登录成功！',
            type: 'success'
          })
          window.localStorage.setItem('zyy_userToken', res.data.userToken)
          this.$router.push({
            name: 'index'
          })
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    // 密码登录
    login2() {
      if(!this.form2.userName) {
        this.$message({
          message: '用户名不能为空',
          type: 'warning'
        })
        return
      }
      if(!this.form2.password) {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
        return
      }
      // this.$axios.setHeader('Content-Type', 'application/json')
      // this.$axios.setHeader('Content-Type', 'application/json', ['post'])
      console.log(this.$axios)
      this.$axios.post('/admin/api/web/account/login', this.form2).then(res => {
        if(res.code == 0) {
          Cookies.set('zyy_userInfo', res.data, { expires: 30 })
          if (this.form2.checked) {
            this.setPwdCookies()
          }
          this.$message({
            message: '登录成功！',
            type: 'success'
          })
          window.localStorage.setItem('zyy_userToken', res.data.userToken)
          this.$router.push({
            name: 'index'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    setPwdCookies () {
      console.log(this.pwdList)
      let obj = {
        userName: this.form2.userName,
        password: this.form2.password
      }
      if (this.pwdList.length == 0) {
        this.pwdList.unshift(obj)
        JSON.stringify(this.pwdList)
        console.log(this.pwdList)
        Cookies.set('pwd', this.pwdList, { expires: 30 })
        return
      }
      for (var i in this.pwdList) {
        if (this.pwdList[i].userName != this.form2.userName) {
          this.pwdList.unshift(obj)
        }
      }
      JSON.stringify(this.pwdList)
      Cookies.set('pwd', this.pwdList, { expires: 30 })
    },
    // 忘记密码
    forget() {
      this.$router.push({
        name: 'forgetPassword'
      })
    },
    // 获取验证码
    getCode() {
      let result = isvalidatemobile(this.form1.phone)
      if(result[0]) {
        this.$message({
          message: result[1],
          type: 'warning'
        })
      } else {
        this.$axios.post('/admin/api/account/code', {
          phone: this.form1.phone
        }).then(res => {
          if(res.code == 0) {
            this.$message({
              message: '已发送验证码，请查收！',
              type: 'success'
            })
            const TIME_COUNT = 60
            if(!this.timer) {
              this.count = TIME_COUNT
              this.timeShow = true
              this.timer = setInterval(() => {
                if(this.count > 0 && this.count <= TIME_COUNT) {
                  this.count --
                } else {
                  this.timeShow = false
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            }
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      }
    },
    modalShow() {
      this.showModal = true
    },
    hideModal() {
      this.showModal = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    max-width: 1920px;
    height: 580px;
    background: url('../assets/images/denglu_bg.png') -180px;
  }
  .wrap {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    .box {
      position: absolute;
      right: 0;
      top: 66px;
      width: 326px;
      // height: 424px;
      padding: 26px;
      background: #fff;
      .tabs {
        display: flex;
        height: 56px;
        line-height: 56px;
        font-size: 18px;
        border-bottom: 1px solid #eee;
        .tab {
          flex: 1;
          text-align: center;
          margin-bottom: -1px;
          cursor: pointer;
          &.active {
            border-bottom: 2px solid #5cc230;
          }
        }
      }
      .inputs1 {
        margin-top: 40px;
        .input {
          display: flex;
          align-items: center;
          height: 40px;
          margin-top: 28px;
          span {
            display: block;
            min-width: 40px;
            height: 40px;
          }
          .img1 {
            background: #e6e6e6 url('../assets/images/login.png') no-repeat center;
          }
          .img2 {
            background: #e6e6e6 url('../assets/images/login2.png') no-repeat center;
          }
          .img3 {
            background: #e6e6e6 url('../assets/images/login1.png') no-repeat center;
          }
          input {
            flex: 1;
            border: none;
            padding-left: 8px;
            height: 36px;
            border: 1px solid #e6e6e6;
          }
          .button {
            width: 105px;
            height: 42px;
            margin-left: 20px;
            background: #f77a0e;
            text-align: center;
            color: #fff;
            line-height: 42px;
            border: none;
            cursor: pointer;
          }
        }
        .checkbox {
          margin: 20px 0;
        }
        .valid {
          margin-bottom: 40px;
        }
        .denglu {
          width: 100%;
          height: 42px;
          // margin-top: 20px;
          font-size: 16px;
          color: #fff;
          text-align: center;
          line-height: 42px;
          border-radius: 3px;
          background: #f77a0e;
          cursor: pointer;
          // outline: none;
          border: none;
        }
        
      }
      .text {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        color: #989898;
        span {
          cursor: pointer;
        }
      }
      p {
        line-height: 40px;
        font-size: 14px;
        color: #989898;
        text-align: center;
        em {
          display: inline-block;
          width: 40px;
          height: 1px;
          background: #ccc;
          margin: 0 10px;
          position: relative;
          top: -4.5px;
        }
      }
      .other {
        text-align: center;
        color: #333;
        img {
          width: 30px;
          margin: 0 10px;
        }
      }
    }
  }
</style>
