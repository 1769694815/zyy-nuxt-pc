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
                type="text"
                placeholder="请输入你的手机号">
            </div>
            <div class="input">
              <span class="img2" />
              <input
                type="text"
                placeholder="验证码">
              <div class="button">获取验证码</div>
            </div>
            <div class="input">
              <span class="img1" />
              <input
                type="password"
                placeholder="设置您的密码">
            </div>
            <div class="input">
              <span class="img1" />
              <input
                type="password"
                placeholder="确认您的密码">
            </div>
            <div class="denglu">注册</div>
            <div class="text">
              <el-checkbox class="checkbox">我已阅读并同意<span class="server">《服务协议》</span></el-checkbox>
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
export default {
  components: {
    NavBar
  },
  data() {
    return {
      tab: 1
    }
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: 'login'
      })
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
