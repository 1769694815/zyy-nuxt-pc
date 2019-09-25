<template>
  <div style="width:100%">
    <v-header />
    <nav-bar :tab-index="tabIndex" />
    <div class="container">
      <div class="header">
        <div class="crumb">首页>关于我们</div>
      </div>
      <img 
        class="bg1" 
        src="~/assets/images/aboutbg1.jpg">
      <img 
        class="bg2" 
        src="~/assets/images/aboutbg2.jpg">
      <div class="connect">
        <div class="connect-items">
          <div class="connect-item">
            <div class="connect-title">商务合作</div>
            <div class="connect-detail">
              联系人： 卢茂华
              <br>联系电话： 0791-88197248
            </div>
          </div>
          <div 
            class="connect-item" 
            style="margin-right: 0;">
            <div class="connect-title">市场推广</div>
            <div class="connect-detail">
              联系人： 周老师
              <br>联系电话： 0791-88197248
            </div>
          </div>
          <div class="connect-item">
            <div class="connect-title">平台合作</div>
            <div class="connect-detail">
              联系人： 徐老师
              <br>联系电话： 0791-88197248
            </div>
          </div>
          <div 
            class="connect-item" 
            style="margin-right: 0;">
            <div class="connect-title">线上代理</div>
            <div class="connect-detail">
              联系人： 孙老师
              <br>联系电话： 0791-88197248
            </div>
          </div>
        </div>
      </div>
      <div class="honor">
        <el-carousel 
          type="card"
          height="300px"
          class="carousel">
          <el-carousel-item
            v-for="(item, index) in carousels"
            :key="index">
            <img :src="item.pic">
          </el-carousel-item>
        </el-carousel>  
      </div>
      <div class="connect-us">
        <div class="us-center">
          <div class="left">
            <ul>
              <li>
                <img src="~/assets/images/about-b1.png">
                用户服务   产品咨询   购买   技术支持
              </li>
              <li>
                <img src="~/assets/images/about-b2.png">
                服务时间：周一至周日 9:00-23:00
              </li>
              <li>
                <img src="~/assets/images/about-b3.png">
                电话：0791-88197248
              </li>
              <li>
                <img src="~/assets/images/about-b4.png">
                地址：江西省南昌市红谷滩新区丰和南大道2111号世茂APM3-5栋（C2）4楼
              </li>
            </ul>
          </div>
          <div class="right">
            <div 
              class="code"
              style="margin-right: 15px;">
              <img src="~/assets/images/about-code1.png">
              扫描下载中医药在线APP
            </div>
            <div class="code">
              <img src="~/assets/images/about-code2.png">
              江西中医药大学继续教育学院
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "~/components/layout/header.vue";
import NavBar from "~/components/navBar.vue";
export default {
  components: {
    NavBar,
    "v-header": Header
  },
  data() {
    return {
      title: "关于我们",
      tabIndex: 7,
      carousels: [
        {
          pic: require("~/assets/images/honor/honor.jpg")
        },
        {
          pic: require("~/assets/images/honor/honor1.jpg")         
        },
        {
          pic: require("~/assets/images/honor/honor2.jpg")          
        },
        {
          pic: require("~/assets/images/honor/honor3.jpg")          
        },
        {
          pic: require("~/assets/images/honor/honor4.jpg")
        },
        {
          pic: require("~/assets/images/honor/honor5.jpg")
        },
        {
          pic: require("~/assets/images/honor/honor6.jpg") 
        },
        {
          pic: require("~/assets/images/honor/honor7.jpg") 
        }
      ]
    };
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 600px;
  .header {
    width: 1200px;
    margin: 0 auto;
    .crumb {
      margin-top: 28px;
      margin-bottom: 18px;
      font-size: 12px;
      color: #666;
    }
  }
  .bg1 {
    width: 100%;
    height: 1032px;
  }
  .bg2 {
    width: 100%;
    height: 910px;
  }
  .connect{
    width: 100%;
    height: 720px;
    overflow: hidden;
    background: url('../assets/images/aboutbg3.jpg')no-repeat center;
    .connect-items{
      width: 1005px;
      margin: 186px auto 0;
      position: relative;
      overflow: hidden;
      .connect-item{
        float: left;
        width: 440px;
        height:210px;
        margin: 0 45px 50px 0;
        padding-left: 40px;
        .connect-title{
          line-height: 64px;
          font-size: 20px;
          color: #fff;
          font-weight: bold;
        }
        .connect-detail{
          line-height: 30px;
          margin-top: 38px;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
  .honor{
    width: 100%;
    height: 671px;
    overflow: hidden;
    background: url('../assets/images/aboutbg4.png')no-repeat center;
    .carousel{
      width: 859px;
      margin: 186px auto 0;
      img{
        width: 411px;
        height: 300px;
      }
    }
  }
  .connect-us{
    width: 100%;
    height: 369px;
    overflow: hidden;
    background: url('../assets/images/aboutbg5.jpg')no-repeat center;
    .us-center{
      width: 1200px;
      margin: 0 auto;
      padding-top: 74px;
      display: flex;
      .left{
        margin-right: 155px;
        ul{
          li{
            line-height: 36px;
            font-size: 16px;
            color: #222;
            margin-bottom: 15px;
            img{
              position: relative;
              top: 10px;
              width: 36px;
              height: 36px;
              margin-right: 25px;
            }
          }
        }
      }
      .right{
        display: flex;
        .code{
          line-height: 68px;
          font-size: 16px;
          color: #222;
          text-align:center;
          img{
            width: 162px;
            height: 162px;
            display: block;
            margin: 0 22px;
          }
        }
      }
    }
  }
}
</style>
<style>
.el-carousel__indicators {
  display: none;
}

</style>