<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-left fl">
        <p>合作电话：0791-88197248 咨询电话：0791-87119966</p>
        <p>联系地址：江西省南昌市红谷滩新区丰和南大道2111号世茂APM3-5栋（C2）4楼</p>
        <p>课程咨询：江西中医药大学继续教育学院（培训学院）</p>
      </div>
      <div class="footer-right fr">
        <div class="item">
          <img src="~/assets/images/download-qr.jpg">
          <div class="text">扫码下载app</div>
        </div>
        <div class="item">
          <img src="~/assets/images/weixin.png">
          <div class="text">官方微信</div>
        </div>
      </div>
    </div>
    <div class="copyright">
      版权所有：Copyright 2018 jzjxedu.com. All Rights Reserved&nbsp;&nbsp;&nbsp;&nbsp;备案号： 赣ICP备11016584号&nbsp;&nbsp;&nbsp;&nbsp;
      技术支持：<a href="http://www.yunduancn.com/">云端科技</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  .footer {
    background: #3e3e3e;
    height: 153px;
    color: #B5B5B5;
    &-content {
      width: 1200px;
      height: 153px;
      margin: 0 auto;
    }
    &-left {
      margin-top: 31px;
      p {
        line-height: 30px;
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
        width: 90px;
        height: 90px;
        border-radius: 4px;
      }
      .text {
        margin-top: 9px;
        font-size: 12px;
      }
    }
    .copyright {
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #303030;
      a {
        color: #B5B5B5;
        text-decoration: none;
      }
    }
  }
</style>
