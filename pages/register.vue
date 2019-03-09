<template>
  <div>
    <nav-bar />
    <div class="register">
      <div class="wrap">
        <div class="box">
          <div class="tabs">
            <div class="tab active">注册账号</div>
          </div>
          <div
            v-show="tab === 1"
            class="inputs1">
            <div class="input">
              <span class="img1" />
              <input
                v-model="form.phone"
                type="text"
                placeholder="请输入你的手机号">
            </div>
            <div class="input">
              <span class="img2" />
              <input
                v-model="form.code"
                type="text"
                placeholder="验证码">
              <div
                v-show="!timeShow"
                class="button"
                @click="getCode">获取验证码</div>
              <div
                v-show="timeShow"
                class="button">{{ count }}s后重试</div>
            </div>
            <div class="input">
              <span class="img1" />
              <input
                v-model="form.password"
                type="password"
                placeholder="设置您的密码">
            </div>
            <div class="input">
              <span class="img1" />
              <input
                v-model="form.password2"
                type="password"
                placeholder="确认您的密码">
            </div>
            <div
              class="denglu"
              @click="register">注册</div>
            <div class="text">
              <el-checkbox
                v-model="form.checked"
                class="checkbox"
                checked>我已阅读并同意
              </el-checkbox>
              <span class="server">《服务协议》</span>
              <span @click="toLogin">用户登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '~/components/navBar.vue'
import { validatenull, isvalidatemobile } from '~/assets/js/util.js'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      tab: 1,
      timeShow: false,
      timer: null,
      count: '',
      form: {
        phone: '',
        code: '',
        password: '',
        password2: '',
        checked: true
      }
    }
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: 'login'
      })
    },
    // 注册
    register() {
      let result = isvalidatemobile(this.form.phone)
      if(result[0]) {
        this.$message({
          message: result[1],
          type: 'warning'
        })
        return
      }
      if(!this.form.code) {
        this.$message({
          message: '验证码不能为空',
          type: 'warning'
        })
        return
      }
      if(!this.form.password || !this.form.password2) {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
        return
      }
      if(this.form.password != this.form.password2) {
        this.$message({
          message: '两次输入密码不一致',
          type: 'warning'
        })
        return
      }
      if(!this.form.checked) {
        this.$message({
          message: '您需要同意服务协议才能注册！',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '注册成功！',
        type: 'success'
      })
    },
    // 获取验证码
    getCode() {
      let result = isvalidatemobile(this.form.phone)
      if(result[0]) {
        this.$message({
          message: result[1],
          type: 'warning'
        })
      } else {
        // this.$axios.post('/admin/api/account/phoneCode_1551248297799', {
        //   phone: this.form.phone
        // })
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
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .register {
    max-width: 1920px;
    height: 580px;
    background: url('../assets/images/zuce_bg.png');
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
      height: 424px;
      padding: 0 26px;
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
          margin-top: 18px;
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
        .denglu {
          width: 100%;
          height: 42px;
          margin-top: 20px;
          font-size: 16px;
          color: #fff;
          text-align: center;
          line-height: 42px;
          border-radius: 3px;
          background: #f77a0e;
          cursor: pointer;
        }
        .text {
          display: flex;
          justify-content: space-between;
          line-height: 40px;
          color: #f77a0e;
          font-size: 12px;
          .checkbox {
            color: #989898;
            font-size: 12px;
          }
          .server {
            margin-left: -100px;
            color: #f77a0e;
          }
          span {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
<style>
  .el-checkbox__label {
    font-size: 12px;
  }
</style>
