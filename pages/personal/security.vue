<template>
  <div>
    <personal-tab :tab-index="tabIndex" />
    <div class="content">
      <div class="header">
        <div class="title">安全设置</div>
      </div>
      <div class="info">
        <div class="info-item">
          <div class="title">手机账号</div>
          <div class="tel">{{ phone ? formatPhone(phone) : '未绑定' }}</div>
          <div
            v-if="phone"
            class="operate"
            @click="updateMobile">修改
          </div>
          <div
            v-else
            class="operate"
            @click="bangMobile">去绑定
          </div>
        </div>
        <div class="info-item">
          <div class="title">登录密码</div>
          <div class="tel"><i class="iconfont iconlock" /></div>
          <div
            class="operate"
            @click="updatePassword">重置密码</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PersonalTab from '~/components/mine/personalTab.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    PersonalTab
  },
  data() {
    return {
      tabIndex: 3,
      phone: '',
      userInfo: ''
    }
  },
  head() {
    return {
      title: '个人中心_'
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.getInfo()
  },
  methods: {
    updateMobile() {
      this.$router.push({
        name: 'personal-updateMobile',
        query: {
          phone: this.phone
        }
      })
    },
    bangMobile() {
      this.$router.push({
        name: 'personal-bangMobile'
      })
    },
    updatePassword() {
      this.$router.push({
        name: 'personal-updatePassword',
        query: {
          phone: this.phone || ''
        }
      })
    },
    getInfo() {
      this.$axios('/admin/api/web/user/info', {
        params: {
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        this.phone = res.data.phone
      })
    },
    formatPhone(phone) {
      return phone.substr(0, 3) + '*****' + phone.substr(8)
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
    flex: 1;
    border: 1px solid #e4ecf3;
    border-radius: 4px;
    min-height: 360px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    color: #46C37B;
    font-size: 16px;
    border-bottom: 1px solid #F5F5F5;
    .title {
      border-bottom: 2px solid #46C37B;
    }
  }
  .info {
    margin-left: 30px;
    &-item {
      display: flex;
      margin-top: 40px;
      color: #666;
      font-size: 14px;
      .tel {
        width: 100px;
        margin-left: 100px;
        text-align: center;
      }
      .operate {
        margin-left: 100px;
        color: #3F8A38;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
</style>
