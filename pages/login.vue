<template>
  <div>
    <nav-bar />
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
                type="text"
                placeholder="手机号">
            </div>
            <div class="input valid">
              <span class="img2" />
              <input
                type="text"
                placeholder="验证码">
              <div class="button">获取验证码</div>
            </div>
            <div class="denglu">登录</div>
            <!-- <div class="text">
              <span>收不到验证码</span>
              <span>注册账户</span>
            </div> -->
          </div>
          <div
            v-show="tab === 2"
            class="inputs1">
            <div class="input">
              <span class="img1" />
              <input
                type="text"
                placeholder="邮箱/手机号/用户名">
            </div>
            <div class="input">
              <span class="img3" />
              <input
                type="password"
                placeholder="密码">
            </div>
            <el-checkbox class="checkbox">记住密码</el-checkbox>
            <div class="denglu">登录</div>
          </div>
          <div class="text">
            <span>收不到验证码</span>
            <span @click="toRegister">注册账户</span>
          </div>
          <p><em /><span>其他方式登录</span><em /></p>
          <div class="other">
            <img src="../assets/images/other-login1.png">
            <img src="../assets/images/other-login2.png">
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
    changeTab(tab) {
      this.tab = tab
    },
    toRegister() {
      this.$router.push({
        name: 'register'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    max-width: 1920px;
    height: 580px;
    background: url('../assets/images/denglu_bg.png');
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
