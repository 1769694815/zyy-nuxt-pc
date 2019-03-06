<template>
  <div class="header">
    <div class="header-top">
      <div class="content">
        <div class="content-left">
          <span class="welcome">HI，欢迎来到中医药在线学习平台!</span>
          <span
            class="login"
            @click="toLogin">我要登录</span>
          <span
            class="register"
            @click="toRegister">免费注册</span>
        </div>
        <div class="content-right">
          <div
            class="message"
            @click="toMynews">我的消息
            <span class="dot"/>
          </div>
          <div
            class="learn"
            @click="toMylearn">我的学习
          </div>
          <div
            class="personal"
            @click="toPersonal">个人中心
          </div>
        </div>
      </div>
    </div>
    <div class="header-search">
      <img
        class="logo"
        src="~/assets/images/logo.png"
        @click="toIndex">
      <div class="search">
        <div class="input">
          <input
            type="text"
            placeholder="输入关键词找课程">
        </div>
        <div class="search-icon">
          <img src="~/assets/images/search.png">
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-show="fixedShow"
        class="fix-header">
        <div class="content">
          <img
            class="logo"
            src="~/assets/images/fix_logo.png">
          <div class="search">
            <input
              type="text"
              placeholder="输入关键词找课程">
            <div class="search-icon">
              <img src="~/assets/images/search.png">
            </div>
          </div>
          <div class="content-right">
            <div
              class="message"
              @click="toMynews">我的消息
              <span class="dot"/>
            </div>
            <div
              class="learn"
              toMylearn>我的学习
            </div>
            <div
              class="personal"
              @click="toPersonal">个人中心
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fixedShow: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.fixedShow = scrollTop > 120 ? true : false
    },
    toLogin() {
      this.$router.push({
        name: 'login'
      })
    },
    toRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    toMynews() {
      this.$router.push({
        name: 'mynews'
      })
    },
    toMylearn() {
      this.$router.push({
        name: 'mylearn'
      })
    },
    toPersonal() {
      this.$router.push({
        name: 'personal'
      })
    },
    toIndex() {
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .header-top {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #f6f6f6;
    color: #666;
    border-bottom: 1px solid #ddd;
    .content {
      width: 1200px;
      height: 30px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      &-left {
        font-size: 0;
        span {
          font-size: 12px;
        }
        .login {
          margin-left: 30px;
          cursor: pointer;
        }
        .register {
          margin-left: 20px;
          color: #ff4400;
          cursor: pointer;
        }
      }
      &-right {
        > div {
          display: inline-block;
          margin-left: 28px;
          cursor: pointer;
        }
        .message {
          position: relative;
          .dot {
            position: absolute;
            top: 6px;
            right: -6px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ff4400;
          }
        }
      }
    }
  }
  .header-search {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    margin: 0 auto;
    .logo {
      cursor: pointer;
    }
    .search {
      display: flex;
      width: 400px;
      height: 34px;
      border: 1px solid #3f8a38;
      border-radius: 4px;
      .input {
        flex: 1;
        height: 34px;
        line-height: 34px;
        input {
          padding-left: 10px;
          width: 100%;
          height: 28px;
          outline: none;
          border: none;
        }
      }
      .search-icon {
        width: 72px;
        height: 34px;
        background: #3F8A38;
        img {
          display: block;
          width: 20px;
          margin-top: 7px;
          margin-left: 26px;
        }
      }
    }
  }
  .fix-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background: #3F8A38;
    z-index: 999;
    overflow: hidden;
    .content {
      display: flex;
      align-items: center;
      width: 1200px;
      height: 60px;
      margin: 0 auto;
      .logo {
        display: inline-block;
        width: 277px;
        height: 32px;
      }
      .search {
        display: flex;
        margin-left: 230px;
        width: 300px;
        height: 36px;
        box-sizing: border-box;
        border: 1px solid #99C04F;
        border-radius: 4px;
        input {
          flex: 1;
          padding-left: 10px;
          height: 32px;
          outline: none;
          border: none;
        }
        .search-icon {
          width: 36px;
          height: 34px;
          line-height: 34px;
          background: #99c04f;
          img {
            display: block;
            width: 20px;
            height: 20px;
            margin: 7px;
          }
        }
      }
      &-right {
        margin-left: 8px;
        > div {
          display: inline-block;
          margin-left: 28px;
          color: #fff;
        }
        .message {
          position: relative;
          .dot {
            position: absolute;
            top: 6px;
            right: -6px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ff4400;
          }
        }
      }
    }
  }
  .fade-leave-active, .fade-enter-active {
    transition: all 0.4s ease;
  }
  .fade-leave-to, .fade-enter {
    height: 0;
  }
</style>
