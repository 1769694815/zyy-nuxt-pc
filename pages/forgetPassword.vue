<template>
  <div>
    <v-header />
    <div class="container">
      <el-steps
        :active="active"
        finish-status="success"
        simple
        style="margin-top: 20px">
        <el-step title="手机号验证" />
        <el-step title="设置密码" />
        <el-step title="修改成功" />
      </el-steps>
      <div class="content">
        <div v-show="active == 0">
          <div class="info">
            <div class="info-item">
              <div class="title">验证号码：</div>
              <div class="tel">
                <el-input
                  v-model="phone"
                  placeholder="请输入您的手机号" />
              </div>
            </div>
            <div class="info-item">
              <div class="title">输入验证码：</div>
              <div class="tel">
                <el-input
                  v-model="validNum"
                  placeholder="请输入验证码" />
              </div>
              <div
                v-show="!timeShow"
                class="operate"
                @click="getCode">获取短信</div>
              <div
                v-show="timeShow"
                class="operate">已发送，{{ count }}秒后重试</div>
            </div>
          </div>
          <div
            class="button"
            @click="next">下一步</div>
        </div>
        <div v-show="active == 1">
          <div class="info">
            <div class="info-item">
              <div class="title">新密码: </div>
              <div class="tel">
                <el-input
                  v-model="password"
                  type="password"
                  placeholder="请输入6-16位数字加字母" />
              </div>
            </div>
            <div class="info-item">
              <div class="title">确认新密码: </div>
              <div class="tel">
                <el-input
                  v-model="newPassword"
                  type="password"
                  placeholder="请输入6-16位数字加字母" />
              </div>
            </div>
          </div>
          <div
            class="button"
            @click="submit">确认提交
          </div>
        </div>
        <div v-show="active == 2">
          <div class="center">
            <div class="title">修改成功</div>
            <p>
              <span>{{ leftTime }}s后</span>
              自动跳转登录页面，如未跳转可点击
              <span
                class="back"
                @click="back">去登录>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import { isvalidatemobile, validatenull } from '~/assets/js/util'
import Cookies from 'js-cookie'
export default {
  components: {
    'v-header': Header
  },
  data() {
    return {
      active: 2,
      phone: '',
      validNum: '',
      timeShow: false,
      count: null,
      timer: null,
      timer2: null,
      leftTime: 3,
      password: '',
      newPassword: '',
      userInfo: ''
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo') || ''
  },
  methods: {
    getCode() {
      let result = isvalidatemobile(this.phone)
      if(result[0]) {
        this.$message({
          message: result[1],
          type: 'warning'
        })
      } else {
        this.$axios.post('/admin/api/account/code', {
          phone: this.phone
        }).then(res => {
          console.log(res)
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
    next() {
      if(!this.validNum) {
        this.$message({
          message: '请输入验证码',
          type: 'warning'
        })
        return
      }
      this.$axios.post('/admin/api/account/phoneCode', {
        phone: this.phone,
        code: this.validNum
      }).then(res => {
        if(res.code == 0) {
         this.active = 1
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    submit() {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      if(!this.password || !this.newPassword) {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
        return
      }
      if(!reg.test(this.password)) {
        this.$message({
          message: '请输入6-16位数字加字母密码',
          type: 'warning'
        })
        return
      }
      if(this.password != this.newPassword) {
        this.$message({
          message: '两次输入密码不一致',
          type: 'warning'
        })
        return
      }
      this.$axios.post('/admin/api/web/user/setPassword', {
        password: this.password,
        passConfirm: this.newPassword,
        userToken: this.userInfo.userToken
      }).then(res => {
        if(res.code == 0) {
          this.active == 2
          this.timer2 = setInterval(() => {
            if(this.leftTime < 1) {
              clearInterval(this.timer2)
              Cookies.remove('zyy_userInfo')
              Cookies.remove('zyy_accessToken')
              this.$router.push({
                name: 'login'
              })
            }
            this.leftTime --
          }, 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    back() {
      clearInterval(this.timer2)
      Cookies.remove('zyy_userInfo')
      Cookies.remove('zyy_accessToken')
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 800px;
    min-height: 500px;
    margin: 0 auto;
  }
  .content {
    margin-left: 100px;
  }
  .info {
    margin-left: 30px;
    &-item {
      display: flex;
      align-items: center;
      margin-top: 40px;
      color: #666;
      font-size: 14px;
      .title {
        width: 120px;
      }
      .tel {
        width: 300px;
        // margin-left: 20px;
      }
      .operate {
        margin-left: 20px;
        color: #3F8A38;
        font-size: 14px;
        cursor: pointer;
      }
      input {
        width: 148px;
        height: 30px;
      }
    }
  }
  .button {
    width: 148px;
    height: 34px;
    margin-top: 40px;
    margin-left: 150px;
    line-height: 34px;
    border: 1px solid #3F8A38;
    color: #3F8A38;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
  }
  .center {
    margin-left: -100px;
    text-align: center;
    .title {
      margin-top: 40px;
      font-size: 24px;
      color: #666;
    }
    p {
      margin-top: 35px;
      font-size: 14px;
      color: #666;
      span {
        color: #3F8A38;
      }
      .back {
        cursor: pointer;
      }
    }
  }
</style>
