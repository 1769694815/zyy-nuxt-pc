<template>
  <div style="width:100%">
    <v-header />
    <nav-bar :tab-index="tabIndex" />
   
    <div class="container">
      <div class="c1">
        <div class="cl-box">
          <div class="pic-1">
            <img
              class="a2"
              src="../assets/images/a2.png">
            <img
              class="a1"
              src="../assets/images/a1.png">
          </div>
          <div class="content">
            <div class="title">中医药在线手机客户端</div>
            <img
              class="img"
              src="../assets/images/img1.png">
            <div class="box">
              <div class="box-left">
                <!-- https://itunes.apple.com/cn/app/中医药在线/id1318614411?mt=8 -->
                <a href="javajscipt:;">
                  <img
                    class="img2"
                    src="../assets/images/img2.png">
                </a>
                <!-- https://files.jzjxedu.com/app-release.apk -->
                <a href="javajscipt:;">
                  <img
                    class="img3"
                    src="../assets/images/img3.png">
                </a>
              </div>
              <div class="box-right">
                <img src="../assets/images/download-qr.png">
                <div class="text">扫码下载中医药在线APP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap wrap-2">
        <img
          src="../assets/images/app1.png"
          class="img1">
      </div>
      <div class="wrap">
        <img
          src="../assets/images/app2.png"
          class="img1">
      </div>
      <div class="wrap wrap-2">
        <img
          src="../assets/images/app3.png"
          class="img1">
      </div>
      <div class="wrap">
        <img
          src="../assets/images/app4.png"
          class="img1">
      </div>
      <div class="wrap wrap-2">
        <img
          src="../assets/images/app5.png"
          class="img1">
      </div>
      <div class="wrap wrap-5">
        <img
          src="../assets/images/app6.png"
          class="img1">
          <!-- <div class="wrap-right">
          <div class="title">
            <span>06</span>不断完善的专业平台
          </div>
          <p>更多名师课程，正在加入中</p>
        </div> -->
      </div>
      <div class="wrap-6">
        <div class="wrap-box">
          <img
            src="~/assets/images/d_logo2.png"
            class="d-logo">
          <div class="content">
            <div class="c-left">
              <img src="~/assets/images/g1.png">
              <!-- <a href="https://itunes.apple.com/cn/app/中医药在线/id1318614411?mt=8">
                <img src="~/assets/images/g1.png">
              </a> -->
              <img src="~/assets/images/g2.png">
              <!-- <a href="https://files.jzjxedu.com/app-release.apk">
              </a> -->
            </div>
            <div class="c-right">
              <img
                style="width: 120px;"
                src="~/assets/images/download-qr.png">
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
      title: '下载App_',
      tabIndex: 7,
      androidUrl: 'https://files.jzjxedu.com/app-release.apk',
      iosUrl: 'https://itunes.apple.com/cn/app/中医药在线/id1318614411?mt=8'
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    // width: 1200px;
    margin: 0 auto;
  }
  .mar-t-30 {
    margin-top: 30px;
  }
  .c1 {
    height: 400px;
    padding-top: 100px;
    background: url(../assets/images/d_bj1.jpg) no-repeat center;
    overflow: hidden;
    .cl-box {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      box-sizing: border-box;
      padding-left: 30px;
      .content {
        .title {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
        }
        img {
          display: block;
        }
        .img, .img2 {
          margin-top: 30px;
          cursor: pointer;
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
              width: 120px;
              margin-left: 20px;
            }
            .text {
              margin-top: 10px;
              color: #fff;
            }
          }
        }
      }
      .pic-1 {
        width: 480px;
        margin-right: 50px;
        position: relative;
        .a2 {
          position: absolute;
          top: 0px;
        }
        .a1 {
          position: absolute;
          top: -60px;
          left: 170px;
        }
      }
    }
  }
  .wrap {
    position: relative;
    height: 540px;
    background: #fff;
    overflow: hidden;
    .img1 {
      display: block;
      width: 1200px;
      margin: 0 auto;
    }
    .title {
      display: inline-block;
      vertical-align: top;
      height: 40px;
      line-height: 40px;
      color: #099f40;
      font-size: 36px;
      font-weight: 600;
      line-height: 40px;
      span {
        display: inline-block;
        vertical-align: top;
        margin-right: 16px;
        font-size: 42px;
        font-weight: normal;
        font-family: Impact;
      }
    }
    p {
      margin-left: 56px;
      margin-top: 20px;
      line-height: 16px;
      color: #666;
      font-size: 16px;
    }
    &-left {
      position: absolute;
      top: 120px;
    }
    &-right {
      position: absolute;
      top: 200px;
      left: 900px;
    }
    .img2 {
      position: absolute;
      top: -40px;
      left: -180px;
    }
    .img3 {
      position: absolute;
      left: 60px;
      top: -60px;
    }
    .img4 {
      position: absolute;
      left: -80px;
      z-index: 2;
    }
    .img5 {
      position: absolute;
      left: 500px;
      top: 120px;
      z-index: 1;
    }
    .img6 {
      position: absolute;
      top: -40px;
      z-index: 2;
    }
    .img7 {
      position: absolute;
      left: 160px;
      top: -460px;
      z-index: 1;
    }
  }
  .wrap-2 {
    background: #f5f5f5;
    .pad-l-300 {
      padding-left: 300px;
      padding-top: 80px;
    }
  }
  .wrap-5 {
    background: url(../assets/images/bj6.jpg) no-repeat center fixed;
  }
  .wrap-6 {
    height: 500px;
    background: url(../assets/images/d_bj7.jpg) no-repeat center;
    .wrap-box {
      width: 1200px;
      height: 500px;
      margin: 0 auto;
      position: relative;
      .d-logo {
        position: absolute;
        right: 210px;
        top: 110px;
      }
      .content {
        position: absolute;
        display: flex;
        right: 170px;
        top: 200px;
        .c-left {
          img {
            display: block;
            margin-top: 15px;
            cursor: pointer;
          }
        }
        .c-right {
          margin-top: 15px;
          margin-left: 20px;
          img {
            width: 120px;
            height: 120px;
          }
        }
      }
    }
  }
</style>
