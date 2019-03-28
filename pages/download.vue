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
        <div class="pic-1">
          <img
            class="a2"
            src="../assets/images/a2.png">
          <img
            class="a1"
            src="../assets/images/a1.png">
        </div>
      </div>
      <div class="wrap">
        <div class="wrap-left">
          <img
            src="../assets/images/b3.png"
            class="img1">
        </div>
        <div class="wrap-right">
          <div class="title">
            <span>01</span>丰富的课程资源
          </div>
          <p>自学考试、中医基础、技能培训、</p>
          <p>基础理论、名师讲座等等应有尽有</p>
        </div>
      </div>
      <div class="wrap wrap-2">
        <div class="wrap-left pad-l-300">
          <div class="title">
            <span>02</span>更新免费课程
          </div>
          <p>数百位江中名医，珍贵的公开分享</p>
          <p>课程助力你的医学梦想</p>
        </div>
        <div class="wrap-right">
          <img
            src="../assets/images/c4.png"
            class="img2">
          <img
            src="../assets/images/c3.png"
            class="img3">
        </div>
      </div>
      <div class="wrap">
        <div class="wrap-left">
          <img
            src="../assets/images/d4.png"
            class="img4">
          <img
            src="../assets/images/d3.png"
            class="img5">
        </div>
        <div class="wrap-right">
          <div class="title">
            <span>03</span>先进的教学系统
          </div>
          <p>科学的教学平台，课件分享，</p>
          <p>随堂发问，让你身临其境</p>
        </div>
      </div>
      <div class="wrap wrap-2">
        <div class="wrap-left pad-l-300">
          <div class="title">
            <span>04</span>人性化的学习平台
          </div>
          <p>师生互动，边学边记，</p>
          <p>及时消化课程内容</p>
        </div>
        <div class="wrap-right">
          <img
            src="../assets/images/e3.png"
            class="img6">
          <img
            src="../assets/images/e4.png"
            class="img7">
        </div>
      </div>
      <div class="wrap wrap-5">
        <div class="wrap-right">
          <div class="title">
            <span>05</span>不断完善的专业平台
          </div>
          <p>更多名师课程，正在加入中</p>
        </div>
      </div>
      <div class="wrap-6">
        1
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
  .mar-t-30 {
    margin-top: 30px;
  }
  .c1 {
    position: relative;
    height: 400px;
    padding-top: 100px;
    background: url(../assets/images/d_bj1.jpg) no-repeat center;
    overflow: hidden;
    .content {
      margin-left: 200px;
      .title {
        font-size: 30px;
        color: #fff;
      }
      img {
        display: block;
      }
      .img1, .img2 {
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
      position: absolute;
      left: 860px;
      top: 0;
      .a2 {
        position: absolute;
        top: 85px;
      }
      .a1 {
        position: absolute;
        top: 30px;
        left: 170px;
      }
    }
  }
  .wrap {
    position: relative;
    height: 540px;
    background: #fff;
    overflow: hidden;
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
    background: url(../assets/images/demo.jpg) no-repeat center;
  }
</style>
