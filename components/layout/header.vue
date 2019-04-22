<template>
  <div class="header">
    <div class="header-top">
      <div class="content">
        <div class="content-left">
          <span
            v-if="!userInfo"
            class="welcome">
            HI，欢迎来到中医药在线学习平台!
          </span>
          <span
            v-else
            class="welcome">
            HI，{{ userInfo.nickName }}，欢迎来到中医药在线学习平台!
          </span>
          <span class="link">
            <a
              href="http://www.tcmlll.cn/"
              target="_blank">访问旧版</a>
          </span>
          <span v-show="loginShow">
            <span
              class="login"
              @click="toLogin">我要登录</span>
            <span
              class="register"
              @click="toRegister">免费注册</span>
          </span>
        </div>
        <div
          v-show="tagShow"
          class="content-right">
          <!-- <div
            class="message"
            @click="toMynews">我的消息
            <span class="dot"/>
          </div> -->
          <div
            v-show="userInfo && userInfo.roleName != 'zyy_lecturer'"
            class="learn"
            @mouseover="learnListShow = true"
            @mouseout="learnListShow = false">我的学习
            <i class="iconfont iconarrow-right" />
            <ul v-show="learnListShow">
              <li
                v-for="(item, index) in learnList"
                :key="index"
                @click="$router.push({ name: item.path }); learnListShow = false">
                {{ item.label }}
              </li>
            </ul>
          </div>
          <div
            v-show="userInfo && userInfo.roleName == 'zyy_lecturer'"
            class="learn"
            @mouseover="teacherListShow = true"
            @mouseout="teacherListShow = false">我的学习
            <i class="iconfont iconarrow-right" />
            <ul v-show="teacherListShow">
              <li
                v-for="(item, index) in teacherList"
                :key="index"
                @click="$router.push({ name: item.path }); teacherListShow = false">
                {{ item.label }}
              </li>
            </ul>
          </div>
          <div
            class="personal"
            @mouseover="personalListShow = true"
            @mouseout="personalListShow = false">个人中心
            <i class="iconfont iconarrow-right" />
            <ul v-show="personalListShow">
              <li
                v-for="(item, index) in personalList"
                :key="index"
                @click="$router.push({ name: item.path }); personalListShow = false">
                {{ item.label }}
              </li>
              <li @click="logout">退出登录</li>
            </ul>
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
            v-model="text"
            type="text"
            placeholder="输入关键词找课程"
            @keyup.enter="search">
        </div>
        <div
          class="search-icon"
          @click="search">
          <img src="~/assets/images/search.png">
        </div>
      </div>
    </div>
    <!-- <transition name="fade">
      <div
        v-show="fixedShow"
        class="fix-header">
        <div class="content">
          <img
            class="logo"
            src="~/assets/images/fix_logo.png">
          <div class="search">
            <input
              v-model="text"
              type="text"
              placeholder="输入关键词找课程"
              @keyup.enter="search">
            <div
              class="search-icon"
              @click="search">
              <img src="~/assets/images/search.png">
            </div>
          </div>
          <div
            v-show="tagShow"
            class="content-right">
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
    </transition> -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="cancel"
      title="提示"
      width="30%">
      <span>确定退出登录吗？</span>
      <span slot="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button
          type="primary"
          @click="ok">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { judgeUser } from '~/assets/js/util'
export default {
  data() {
    return {
      fixedShow: false,
      tagShow: false,
      loginShow: false,
      learnListShow: false,
      personalListShow: false,
      teacherListShow: false,
      dialogVisible: false,
      userInfo: '',
      rankName: '',
      text: '',
      learnList: [
        {
          label: '我的课程',
          path: 'mylearn'
        },
        {
          label: '我的班级',
          path: 'mylearn-myclass'
        },
        {
          label: '学习时长',
          path: 'mylearn-duration'
        },
        {
          label: '我的收藏',
          path: 'mylearn-collect'
        },
        {
          label: '我的关注',
          path: 'mylearn-interest'
        }
      ],
      teacherList: [
        {
          label: '在教课程',
          path: 'teacher'
        },
        {
          label: '在教班级',
          path: 'teacher-classes'
        },
        {
          label: '我的收藏',
          path: 'teacher-collect'
        }
      ],
      personalList: [
        {
          label: '我的资料',
          path: 'personal'
        },
        {
          label: '我的订单',
          path: 'personal-order'
        },
        {
          label: '安全设置',
          path: 'personal-security'
        }
      ]
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll)
    let userInfo = Cookies.getJSON('zyy_userInfo')
    this.rankName = judgeUser()
    if(userInfo) {
      this.userInfo = userInfo
      this.tagShow = true
    } else {
      this.loginShow = true
    }
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
    },
    logout() {
      // this.dialogVisible = true
      this.$confirm(`确定退出登录吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        Cookies.remove('zyy_userInfo')
        this.$router.push({
          name: 'login'
        })
      })
    },
    cancel() {
      this.dialogVisible = false
    },
    ok() {
      // clear
      Cookies.remove('zyy_userInfo')
      this.$router.push({
        name: 'login'
      })
      this.dialogVisible = false
    },
    // 搜索
    search() {
      let url = location.href
      if(url.indexOf('searchResult') > -1) {
        this.$emit('getList', this.text, true)
      } else {
        this.$router.push({
          name: 'searchResult',
          query: {
            title: this.text
          }
        })
      }
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
          font-size: 14px;
        }
        .link {
          margin-left: 30px;
          cursor: hover;
          a {
            text-decoration: none;
            color: #666;
            &:hover {
              text-decoration: underline;
            }
          }
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
        .learn, .personal {
          position: relative;
          cursor: pointer;
          ul {
            position: absolute;
            left: -10px;
            z-index: 99;
          }
          li {
            width: 80px;
            text-align: center;
            background: #fff;
            &:hover {
              background: #3f8a38;
              color: #fff;
            }
          }
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
      height: 90px;
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
        cursor: pointer;
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
          cursor: pointer;
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
  .iconarrow-right {
    font-size: 12px;
    transform: rotate(90deg);
    color: #666;
  }
  .fade-leave-active, .fade-enter-active {
    transition: all 0.4s ease;
  }
  .fade-leave-to, .fade-enter {
    height: 0;
  }
</style>
