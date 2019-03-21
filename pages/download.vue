<template>
  <div style="width:100%">
    <v-header />
    <nav-bar :tab-index="tabIndex" />
    <div class="container">
      <div class="c1">
        <div class="content">
          <div class="title">中医药手机客户端</div>
          <img
            class="img1"
            src="../assets/images/img1.png">
          <div class="box">
            <div class="box-left">
              <img
                class="img2"
                src="../assets/images/img2.png">
              <img
                class="img3"
                src="../assets/images/img3.png">
            </div>
            <div class="box-right">
              <img src="../assets/images/weixin.png">
              <div class="text">扫码下载中医药在线APP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import NavBar from '~/components/navBar.vue'
export default {
  components: {
    NavBar,
    'v-header': Header
  },
  data() {
    return {
      tabIndex: 6
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    // width: 1200px;
    margin: 0 auto;
  }
  .c1 {
    height: 400px;
    padding-top: 100px;
    background: url(../assets/images/d_bj1.jpg) no-repeat center;
    .content {
      margin-left: 300px;
      .title {
        font-size: 30px;
        color: #fff;
      }
      img {
        display: block;
      }
      .img1, .img2 {
        margin-top: 30px;
      }
      .img3 {
        margin-top: 20px;
      }
      .box {
        display: flex;
        &-right {
          width: 160px;
          margin-top: 30px;
          margin-left: 30px;
          text-align: center;
          img {
            margin-left: 20px;
          }
          .text {
            margin-top: 10px;
            color: #fff;
          }
        }
      }
    }
  }
</style>
