<template>
  <div style="width:100%">
    <v-header />
    <nav-bar :tab-index="tabIndex" />
    <div class="container">
      <img 
        class="bg1" 
        src="~/assets/images/aboutbg1_1.png">
      <!-- 关于我们 -->
      <div class="bg2">
        <div class="border">
          <div class="aboutus">
            <div class="detail">
              <span>中医药在线</span>  
              定位于全国性的中医药行业综合知识的在线学习平台，通过与全国中医药成人协会进行合作，依托海量教学资源，优质医师。致力于为广大用户提供个性化、互动化、智能化的在线学习体验，课程涵盖提供学历提升、培训项目、名师传承和文化传播、中医健康5大板块。平台以“弘扬中医文化，促进中医药文化的传播和推广”为愿景。通过互联网+教育创新，混合式的教学模式，为行业相关人员提供精品课程在线学习、交流互动、教育服务、兴趣爱好培养等全方位、个性化的学习云服务。
            </div>
          </div>
        </div>
        <ul class="list">
          <li>
            <img src="~/assets/images/about-icon1.png" >
            <div class="mes">
              <span>学历提升</span>
              与全国各个中医药大学合作，为考生学习各类医学类课程提供专业化的课程，协助考生进行一站式的学习体验
            </div>
          </li>
          <li>
            <img src="~/assets/images/about-icon2.png" >
            <div class="mes">
              <span>培训项目</span>
              联合全国各大中医院校，为医院、医疗机构、医药企业等单位提供高定制化的培训项目。如西学中，高层次中医经典优才等多样化的技术培训项目
            </div>
          </li>
          <li>
            <img src="~/assets/images/about-icon3.png" >
            <div class="mes">
              <span>名师传承</span>
              数百位中医领域的名医精品课程，零距离在线学习，畅谈疾病背后的深层次的病因病理，研究创新、高效的治疗手段及方法
            </div>
          </li>
          <li>
            <img src="~/assets/images/about-icon4.png" >
            <div class="mes">
              <span>文化传播</span>
              分享中医名师的讲座心得，传授实用性的中医治疗方法，将中医的种种好处服务于群众，应用于群众
            </div>
          </li>
          <li style="margin-right: 0;">
            <img src="~/assets/images/about-icon5.png" >
            <div class="mes">
              <span>中医健康</span>
              免费讲解中医基础理论知识，传播生活实用小技巧，强调从生活中种种方法，预防疾病，远离疾病
            </div>
          </li>
        </ul>
      </div>
      <!-- 发展史&图片 -->
      <div class="bg3">
        <div class="time">
          2014.12
          <img src="~/assets/images/arrow.png">
          2018.01
          <img src="~/assets/images/arrow.png">
          2018.10
          <img src="~/assets/images/arrow.png">
          2019.06
          <img src="~/assets/images/arrow.png">
          2020+
        </div>
        <ul>
          <li>
            <div class="mes">
              <span>在线教育</span>
              成人继续教育学习服务平台，为中医药院校提供学历教育线上学习平台
            </div>
          </li>
          <li>
            <div class="mes">
              <span>培训平台</span>
              研发在线学习平台致力于为高校和行业企业提供在线学习及培训平台
            </div>
          </li>
          <li>
            <div class="mes">
              <span>强强联合</span>
              与江西中医药大学签订合作协议，推动自学考试、执业技能培训项目和中医基础知识等课程体系在线学习
            </div>
          </li>
          <li>
            <div class="mes">
              <span>自建课程</span>
              平台自建课程60余门，内容涉及名医传承、自学考试及西学中等多领域
            </div>
          </li>
          <li style="margin-right: 0;">
            <div class="mes">
              <span>未来已来</span>
              助力中医文化传播，成就百万医学梦想人
            </div>
          </li>
        </ul>
      </div>
      <img
        class="photo" 
        src="~/assets/images/aboutbg2_2.jpg">
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
  .bg1 {
    width: 100%;
  }
  .bg2 {
    width: 100%;
    background: #fff;
    padding-bottom: 80px;
    .border {
      width: 1240px;
      border: 1px solid #fff;
      margin: 0 auto;
      position: relative;
      top: -101px;
      .aboutus {
        width:1200px;
        background-size: 100%;
        padding: 146px 0 36px;
        margin:20px;
        box-shadow: 0px 2px 17px 0px 
      rgba(0, 0, 0, 0.2);
        background: #fff url('../assets/images/aboutbg1_2.png')no-repeat top center;
        .detail {
          margin: 0 57px 0 51px;
          line-height: 28px;
          font-size: 14px;
          color: #666;
          span {
            font-size: 20px;
            color: #3f8a38;
            font-weight: bold;
            margin-right: 5px;
          }
        }
      }
    }
    .list{
      width:1200px;
      margin: 0 auto;
      display: flex;
      li{
        width: 224px;
        margin-right: 20px;
        border: 1px solid #ddd;
        img{
          width: 86px;
          height: 86px;
          position: relative;
          top: -42px;
          display: block;
          margin: 0 auto;
        }
        .mes{
          position: relative;
          top: -20px;
          margin: 0 20px;
          line-height: 26px;
          font-size: 14px;
          color: #666;
          text-align: center;
          span{
            display: block;
            font-size: 16px;
            color: #333;
            margin-bottom: 10px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .bg3{
    width: 100%;
    padding: 183px 0 30px 0;
    background-size: 100%;
    background: url('../assets/images/aboutbg2.png')no-repeat top center;
    .time{
      width: 1200px;
      margin: 0 auto;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      img{
        margin: 0 22px 0 10px;
      }
    }
    ul{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      li{
        width: 123px;
        margin-right: 142px;
        .mes{
          line-height: 26px;
          font-size: 14px;
          color: #fff;
          span{
            line-height: 52px;
            display: block;
            font-size: 20px;
            color: #fff;
            margin-bottom: 10px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .photo{
    width: 100%;
    display: block;
  }
  .connect {
    background-size: 100%;
    // height: 720px;
    overflow: hidden;
    background: url('../assets/images/aboutbg3.jpg')no-repeat center top;
    .connect-items {
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
    background-size: 100%;
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
    background-size: 100%;
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