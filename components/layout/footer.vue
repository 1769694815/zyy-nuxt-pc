<template>
  <div
    v-if="!isAbout"
    class="footer">
    <div class="footer-content">
      <div class="footer-left fl">
        <p>项目合作咨询：0791-87119966 <span style="margin-left: 30px;">平台（渠道）合作：0791-88197248</span></p>
        <p>主办单位地址：南昌市阳明路56号江西中医药大学继续教育学院（培训学院）</p>
        <p>课程（品牌）合作：江西省南昌市红谷滩新区丰和南大道2111号世茂APM3-5栋（C2）4楼</p>
        <div class="link">
          <nuxt-link to="/">返回首页</nuxt-link>
          <nuxt-link
            to="/about"
            target="_blank">关于我们</nuxt-link>
          <nuxt-link
            to="/service"
            target="_blank">服务与保障</nuxt-link>
          <nuxt-link
            to="/download"
            target="_blank">下载APP</nuxt-link>
          <a
            href="http://www.yixiaoshu.net/i_info/cid/33.html"
            target="_blank">学历报名</a>
        </div>
      </div>
      <div class="footer-right fr">
        <div class="item">
          <img src="~/assets/images/download-qr.png">
          <div class="text">扫码下载app</div>
        </div>
        <div class="item">
          <img src="~/assets/images/weixin.png">
          <div class="text">官方微信</div>
        </div>
      </div>
    </div>
    <div class="copyright">
      版权所有：Copyright 2018-{{ year }} zyyzx.com.cn. All Rights Reserved&nbsp;&nbsp;&nbsp;&nbsp;备案号：<a 
        href="http://beian.miit.gov.cn/" 
        target="_blank">赣ICP备15008425号</a>&nbsp;&nbsp;&nbsp;&nbsp;<a 
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36011102000325" 
          target="_blank"><img src="~/assets/images/zgwablogo.png" >赣公网安备：36011102000325号</a>&nbsp;&nbsp;&nbsp;&nbsp;增值电信业务许可证号：赣B2-20180020
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAbout: false,
      myDate: null,
      year: null
    }
  },
  mounted() {
    console.log(this.$route)
    this.getYear()
    if (this.$route.name == 'about') {
      this.isAbout = true
    }
  },
  methods: {
    openNewPage(url) {
      window.open(url.href, '_blank')
    },
    getYear() {
      this.myDate = new Date()
      this.year = this.myDate.getFullYear()
    }
  }
}
</script>
<style lang="scss" scoped>
  .footer {
    background: #3e3e3e;
    // height: 163px;
    color: #B5B5B5;
    &-content {
      width: 1200px;
      height: 163px;
      margin: 0 auto;
    }
    &-left {
      margin-top: 31px;
      p {
        line-height: 30px;
      }
      .link {
        margin-top: 10px;
        a {
          margin-left: 10px;
          cursor: pointer;
          color: #B5B5B5;
          &:hover {
            color: #3f8a38;
          }
          &:first-child {
            margin: 0;
          }
          &:last-child {
            a {
              color: #b5b5b5;
              text-decoration: none;
            }
          }
        }
      }
    }
    &-right {
      margin-top: 16px;
      .item {
        display: inline-block;
        text-align: center;
        &:last-child{
          margin-left: 30px;
        }
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 4px;
      }
      .text {
        margin-top: 9px;
        font-size: 12px;
      }
    }
    .copyright {
      position: relative;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #303030;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        color: #B5B5B5;
        text-decoration: none;
      }
      img {
        vertical-align: middle;
        margin-right: 4px;
      }
    }
  }
</style>
