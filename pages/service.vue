<template>
  <div>
    <v-header />
    <div class="bg-header" >
      <img src="../assets/images/service/service_title.png">
    </div>
    <div class="p">
      <div class="pic-1">
        <ul class="logo">
          <li><img src="../assets/images/service/logo_zyy.png"></li>
          <li><img src="../assets/images/service/logo_school.png"></li>
          <li><img src="../assets/images/service/logo_yunduan.png"></li>
        </ul>
        <div class="desc">
          中医药在线由江西中医药大学继续教育学院（培训学院）主办，南昌云端网络科技有限公司运营的中医药继续教育在线学习平台。<br>
          依托江西中医药大学优质办学资源和雄厚的师资力量，面向社会各界人士和中医药在职人员，提供中医药成人高等教育学历教育、自学考试、中医药继续教育、<br>
          中医药知识和健康管理在线课程学习和培训服务，已形成中医药优势技术学习和中医传承教育学术平台。
        </div>
      </div>
      <div class="title">为何越来越多人选择线上学中医?</div>
      <ul class="list">
        <li>
          <img src="../assets/images/service/top1.png">
          <div class="li">线上资源丰富</div>
          <div class="desc">满足学生各种需求</div>
        </li>
        <li>
          <img src="../assets/images/service/top2.png">
          <div class="li">随时随地学习</div>
          <div class="desc">解决上班族时间痛点</div>
        </li>
        <li>
          <img src="../assets/images/service/top3.png">
          <div class="li">积极互动问答</div>
          <div class="desc">随堂发问消除疑虑</div>
        </li>
        <li>
          <img src="../assets/images/service/top4.png">
          <div class="li">国家知名专家讲座</div>
          <div class="desc">你的导师你决定</div>
        </li>
        <li>
          <img src="../assets/images/service/top5.png">
          <div class="li">开启个性化学习</div>
          <div class="desc">中医经典内容丰富</div>
        </li>
      </ul>
    </div>
    <div class="pic">
      <div class="title">我们的自信源于雄厚的师资力量</div>
      <div class="content">
        <div class="info">
          <div class="text">汇集全国知名讲师，国家级老中医授课</div>
          <div class="text">自考新考规，第一时间押题讲解</div>
          <div class="text">课后经典练题，助你及时消化</div>
          <div
            class="button"
            @click="toDoctor">想了解更多？点我进入名医师承</div>
        </div>
        <div class="banner-service">
          <el-carousel
            height="280px"
            class="imgs">
            <el-carousel-item
              v-for="(item, index) in carousels"
              v-if="index < 5"
              :key="index">
              <img :src="item.pic">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="pic-2">
      <div class="title">
        我们的精品课程诞生记
      </div>
      <ul class="record">
        <li>
          <div class="h1">前期调研</div>
          <div class="desc">了解不同群体<br>的课程需求及<br>高频难点</div>
          <div class="number">1</div>
        </li>
        <li>
          <div class="h1">教案制作</div>
          <div class="desc">课程介绍-<br>提出教学<br>重难点</div>
          <div class="number">2</div>
        </li>
        <li>
          <div class="h1">课程录制</div>
          <div class="desc">录播<br>直播<br>讲座</div>
          <div class="number">3</div>
        </li>
        <li>
          <div class="h1">后期制作</div>
          <div class="desc">课件分享<br>课后练题</div>
          <div class="number">4</div>
        </li>
        <li>
          <div class="h1">课程上线</div>
          <div class="desc">学员学习<br>互动问答</div>
          <div class="number">5</div>
        </li>
      </ul>
    </div>
    <div class="pic-3">
      <div class="title">
        我们的内容全方位覆盖中医药行业
      </div>
      <div class="subtitle">
        掌握中医健康知识  了解中医文化发展
      </div>
      <div class="ul">
        <ul>
          <li>
            <img src="../assets/images/service/service1.png">
            自学考试          
          </li>
          <li>
            <img src="../assets/images/service/service2.png">
            名医师承          
          </li>
          <li>
            <img src="../assets/images/service/service3.png">
            中医药国际交流          
          </li>
          <li>
            <img src="../assets/images/service/service4.png">
            中医大讲堂        
          </li>
          <li>
            <img src="../assets/images/service/service5.png">
            中医药知识分享          
          </li>
          <li>
            <img src="../assets/images/service/service6.png">
            职业技能培训          
          </li>
          <li>
            <img src="../assets/images/service/service7.png">
            成人继续教育          
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
export default {
  components: {
    'v-header': Header
  },
  data() {
    return {
      carousels: []
    }
  },
  head() {
    return {
      title: '服务与保障'
    }
  },
  mounted() {
    this.getBanners()
  },
  methods: {
    getBanners() {
      this.$axios('/yxs/api/web/doctor/guarantee').then(res => {
        this.carousels = res.data
      })
    },
    toDoctor() {
      let url = this.$router.resolve({
        name: 'doctor'
      })
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg-header {
    height: 391px;
    overflow: hidden;
    background: url(../assets/images/service/servicebg1.jpg) no-repeat center;
    img {
      display: block;
      margin: 57px auto 0;
    }
  }
  .p {
    .pic-1 {
      width: 1200px;
      height: 235px;
      margin: -136px auto 0;
      padding-top: 37px;
      background-color: #ffffff;
      box-shadow: 0px 0px 10px 0px 
        rgba(0, 212, 198, 0.2);
      border-radius: 10px;
      .logo {
        overflow: hidden;
        padding: 0 255px;
        li {
          float: left;
          img {
            margin: 0 25px;
          }
        }
        li::after{
          content: '';
          display: inline-block;
          position: relative;
          top: -6px;
          width: 1px;
          height: 38px;
          background: #dedede;
        }
        li:last-child::after{
          display: none;
        }
      }
      .desc {
        line-height: 30px;
        margin-top: 29px;
        font-size: 14px;
        color: #333;  
        text-align: center;
      }
    }
    .title {
      line-height: 124px;
      margin-top: 10px;
      color: #4e5a63;
      font-size: 36px;
      font-weight: bold;
      text-align: center;
    }
    .list {
      width: 1200px;
      margin: 0 auto 60px;
      display: flex;
      li {
        width: 224px;
        height: 240px;
        margin-right: 20px;
        background-color: #ffffff;
        box-shadow: 0px 0px 10px 0px 
          rgba(0, 212, 198, 0.2);
          text-align: center;
        img {
          width: 224px;
          height: 150px;
          margin-bottom: 10px;
        }
        .li {
          line-height: 38px;
          font-size: 18px;
          color: #6f787c;
          font-weight: bold;
        }
        .desc {
          font-size: 16px;
          color: #999;
          line-height: 20px;
        }
      }
      li:last-child {
        margin-right: 0;
      }
    }
  }
  .pic {
    height: 500px;
    padding-top: 60px;
    text-align: center;
    background: url(../assets/images/teacher_k.jpg) no-repeat center;
    .title {
      font-size: 36px;
      color: #4e5a63;
      font-weight: 700;
    }
    .content {
      margin-top: 70px;
      .info {
        display: inline-block;
        vertical-align: top;
        .text {
          line-height: 42px;
        }
        .button {
          height: 38px;
          line-height: 38px;
          margin-top: 40px;
          padding: 0 30px;
          border: 1px solid #00dfa6;
          border-radius: 19px;
          color: #00dfa6;
          cursor: pointer;
        }
      }
      .banner-service {
        display: inline-block;
        vertical-align: top;
        width: 600px;
      }
    }
  }
  .pic-2 {
    height: 446px;
    padding-top: 90px;
    background: #fff;
    text-align: center;
    .title {
      font-size: 36px;
      color: #4e5a63;
      font-weight: 700;
    }
    .record {
      overflow: hidden;
      width: 1200px;
      height: 270px;
      margin: 57px auto 78px;
      background: url(../assets/images/service/record.jpg) no-repeat center;
      li {
        position: relative;
        float: left;
        width:170px;
        height: 210px;
        margin-right: 30px;
        text-align: center;
        .h1 {
          line-height: 62px;
          margin-bottom: 10px;
          font-size: 28px;
          color: #fff;
        }
        .desc {
          line-height: 36px;
          font-size: 18px;
          color: #4e5a63;
        }
        .number {
          position: absolute;
          bottom: -16px;
          left: 79px;
          line-height: 30px;
          font-size: 24px;
          color: #fff;
        }
      }
      li:first-child {
        margin-left: 119px;
        .number {
          left: 76px;
        }
      }
      li:nth-child(4) {
        .number {
          left: 78px;
        }
      }
    }
  }
  .pic-3 { 
    // height: 460px;
    padding-top: 90px;
    padding-bottom: 40px;
    background: #f7f7f7;
    text-align: center;
    .title {
      font-size: 36px;
      color: #4e5a63;
      font-weight: 700;
    }
    .subtitle {
      margin-top: 20px;
      color: #666;
      font-size: 14px;
    }
    .ul {
      width: 1200px;
      height: 378px;
      margin: 60px auto 72px;
      background: url(../assets/images/service/bottom.jpg) no-repeat center;
      ul {
        overflow: hidden;
        padding: 0 212px;
        li {
          float: left;
          width: 184px;
          height: 165px;
          line-height: 50px;
          margin-left: 9px;
          font-size: 18px;
          color: #fff;
          text-align: center;
          img {
            display: block;
            margin: 62px auto 5px;
          }
        }
        li:nth-child(5){
          margin-left: 104px;
        }
      }
    }
  }
</style>
<style>
  .banner-service img {
    width: 420px;
  }
</style>
