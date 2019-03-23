<template>
  <div class="container">
    <v-header />
    <v-nav :tab-index="tabIndex" />
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel
        height="400px"
        class="imgs">
        <el-carousel-item
          v-for="(item, index) in carousels"
          :key="index">
          <img :src="item.pic">
        </el-carousel-item>
      </el-carousel>
      <div class="carousel-content">
        <div class="nav-list">
          <div class="nav-item">
            <i class="iconfont icon-yisheng"/>
            名师医承
          </div>
          <div class="nav-item">
            <i class="iconfont icon-2jiankangzhishi"/>
            中医健康
          </div>
          <div class="nav-item">
            <i class="iconfont icon-document"/>
            中医药理论
          </div>
          <div class="nav-item">
            <i class="iconfont icon-paper"/>
            自学考试
          </div>
          <div class="sub-nav">
            <span>中药学</span>
            <span>药学</span>
          </div>
          <div class="nav-item">
            <i class="iconfont icon-xiangmu"/>
            培训项目
          </div>
          <div class="sub-nav">
            <span>中药学</span>
            <span>药学</span>
          </div>
        </div>
        <section class="info-list">
          <div class="info-header">
            <h3>资讯头条</h3>
            <div
              class="more"
              @click="toToutiao">
              <span>更多</span>
              <i class="iconfont icon-arrowright" />
            </div>
          </div>
          <ul>
            <li
              v-for="(item, index) in toutiaoList"
              v-if="index < 4"
              :key="index">
              {{ `【${item.typeName}】${item.title}` }}
            </li>
          </ul>
        </section>
      </div>
    </div>
    <!-- 中医研究所 -->
    <div class="item-container bg-ff">
      <h2>中医研究所</h2>
      <div class="list">
        <div
          v-for="(item, index) in researchList"
          v-if="index < 4"
          :key="index"
          class="list-item">
          <research-item :data-obj="item"/>
        </div>
      </div>
    </div>
    <!-- 名师医承 -->
    <div class="bg-f6">
      <div class="item-container">
        <div class="container-header">
          <h2>名医师承</h2>
          <div class="subnav">
            <span class="pos-right">
              查看更多
              <i class="iconfont icon-more-right" />
            </span>
          </div>
        </div>
        <div class="list">
          <div
            v-for="(item, index) in famousList"
            v-if="index < 5"
            :key="index"
            class="list-item">
            <famous-item :data-obj="item"/>
          </div>
        </div>
        <div class="imgs">
          <img src="~/assets/images/famous_1.jpg">
          <img src="~/assets/images/famous_2.jpg">
          <img src="~/assets/images/famous_3.jpg">
        </div>
      </div>
    </div>
    <!-- 中医健康 -->
    <div class="item-container">
      <div class="container-header">
        <h2>中医健康</h2>
        <div class="subnav">
          <span
            v-for="(item, index) in healthSubList"
            v-if="index > 0"
            :key="index">
            <span>{{ item.name }}</span>
          </span>
          <span class="pos-right">
            查看更多
            <i class="iconfont icon-more-right" />
          </span>
        </div>
      </div>
      <div class="container-content">
        <div class="left-img">
          <img src="~/assets/images/img_1.jpg">
          <div class="text">
            <div class="title">中医知识分享</div>
            <div class="sub-title">免费更新</div>
          </div>
        </div>
        <div class="right-list">
          <div
            v-for="(item, index) in healthList"
            v-if="index < 8"
            :key="index"
            class="list-item">
            <section-item :data-obj="item" /> 
          </div>
        </div>
      </div>
    </div>
    <div class="item-container">
      <div class="container-header">
        <h2>自学考试</h2>
        <div class="subnav">
          <span
            v-for="(item, index) in examSubList"
            v-if="index > 0"
            :key="index">
            <span>{{ item.name }}</span>
          </span>
          <span class="pos-right">
            查看更多
            <i class="iconfont icon-more-right" />
          </span>
        </div>
      </div>
      <div class="container-content">
        <div class="left-img">
          <img src="~/assets/images/img_2.jpg">
          <div class="text">
            <div class="title">考试课程辅导</div>
            <div class="sub-title">无死角</div>
          </div>
        </div>
        <div class="right-list">
          <div
            v-for="(item, index) in examList"
            v-if="index < 8"
            :key="index"
            class="list-item">
            <section-item :data-obj="item" /> 
          </div>
        </div>
      </div>
    </div>
    <div class="item-container">
      <div class="container-header">
        <h2>中医药理论</h2>
        <div class="subnav">
          <span
            v-for="(item, index) in theorySubList"
            v-if="index > 0"
            :key="index">
            <span>{{ item.name }}</span>
          </span>
          <span class="pos-right">
            查看更多
            <i class="iconfont icon-more-right" />
          </span>
        </div>
      </div>
      <div class="container-content">
        <div class="left-img">
          <img src="~/assets/images/img_3.jpg">
          <div class="text">
            <div class="title">培训理论知识</div>
            <div class="sub-title">深入解析</div>
          </div>
        </div>
        <div class="right-list">
          <div
            v-for="(item, index) in theoryList"
            v-if="index < 8"
            :key="index"
            class="list-item">
            <section-item :data-obj="item" /> 
          </div>
        </div>
      </div>
    </div>
    <div class="bg-f6 train">
      <div class="item-container">
        <div class="container-header">
          <h2>培训项目</h2>
          <div class="subnav">
            <span>职业培训</span>
            <span>西学中</span>
            <span class="pos-right">
              查看更多
              <i class="iconfont icon-more-right" />
            </span>
          </div>
        </div>
        <div class="train-imgs">
          <div
            v-for="(item, index) in trainList"
            v-if="index < 4"
            :key="index"
            class="train-img">
            <img :src="item.middle_picture">
            <div class="text">中药炮制工</div>
          </div>
        </div>
        <div class="button">
          <span>
            <i class="iconfont icon-shuaxin" />
            换一批
          </span>
        </div>
      </div>
    </div>
    <div class="item-container">
      <div class="container-header">
        <h2>资讯头条</h2>
        <div class="toutiao">
          <div
            v-for="(item, index) in toutiaoList"
            v-if="index < 6"
            :key="index"
            class="toutiao-item">
            <toutiao-item :data-obj="item"/>
          </div>
        </div>
      </div>
    </div>
    <div class="foot-img">
      <img
        src="~/assets/images/foot-img.jpg"
        @click="toService">
    </div>
  </div>
</template>

<script>
import Nav from '~/components/navBar.vue'
import ResearchItem from '~/components/index/researchItem.vue'
import FamousItem from '~/components/index/famousItem.vue'
import SectionItem from '~/components/index/sectionItem.vue'
import ToutiaoItem from '~/components/index/toutiaoItem.vue'
import Header from '~/components/layout/header.vue'
export default {
  components: {
    'v-nav': Nav,
    'v-header': Header,
    ResearchItem,
    FamousItem,
    SectionItem,
    ToutiaoItem
  },
  data() {
    return {
      tabIndex: 1,
      carousels: [],
      infoList: [],
      researchList: [],
      famousList: [],
      examList: [],
      theoryList: [],
      healthList: [],
      rightList: [],
      trainList: [],
      toutiaoList: [],
      healthSubList: [],
      examSubList: [],
      theorySubList: []
    }
  },
  async asyncData({ $axios }) {
    // let params = {
    //   username: '',
    //   password: '',
    //   scope: 'server',
    //   grant_type: 'client_credentials'
    // }
    // $axios.post('/auth/oauth/token', params).then(res => {
    //   $axios.setHeader('Authorization', 'Bearer' + res.access_token)
    // })
    // let params = {
    //   username: '',
    //   password: '',
    //   scope: 'server',
    //   grant_type: 'client_credentials'
    // }
    // let data = await $axios.post('/auth/oauth/token', params)
    // console.log(data)
    // $axios.setHeader('Authorization', 'Bearer' + data.access_token)
  },
  created() {
    
  }, 
  mounted() {
    let params = {
      username: '',
      password: '',
      scope: 'server',
      grant_type: 'client_credentials'
    }
    // this.$axios.post('/auth/oauth/token', params).then(res => {
    //   this.$axios.setHeader('Authorization', 'Bearer' + res.access_token)
      this.getCarousel()
      this.getMenuList()
      this.getResearchList()
      this.getRecommendList('zyjk')
      this.getRecommendList('career')
      this.getRecommendList('education')
      this.getDoctorList()
      this.getNewsList()
      this.getTrainList()
      this.getCategoryByCode('zyjk')
      this.getCategoryByCode('career')
      this.getCategoryByCode('education')
    // })
  },
  methods: {
    // 跳转到头条页面
    toToutiao() {
      this.$router.push({
        name: 'toutiao'
      })
    },
    toService() {
      this.$router.push({
        name: 'service'
      })
    },
    // 获取轮播
    getCarousel() {
      this.$axios('/yxs/api/web/navigation').then(res => {
        if(res.code == 0) {
          this.carousels = res.data
        }
      })
    },
    // 获取首页菜单列表
    getMenuList() {
       this.$axios('/yxs/api/web/course/categoryTree').then(res => {
        if(res.code == 0) {
          console.log('menu', res)
        }
      })
    },
    // 获取首页中医研究所
    getResearchList() {
      this.$axios('/yxs/api/web/doctor/recommendCourseList').then(res => {
        if(res.code == 0) {
          this.researchList = res.data
        }
      })
    },
    // 获取首页中医健康,自学考试,中医药理论 
    getRecommendList(type) {
      this.$axios('/yxs/api/web/course/getRecommendList', {
        params: {
          type
        }
      }).then(res => {
        if(res.code == 0) {
          switch(type) {
            case 'education':
              this.examList = res.data
              break;
            case 'career':
              this.theoryList = res.data
              break;
            case 'zyjk':
              this.healthList = res.data
              break;
          }
        }
      })
    },
    // 获取首页名医师承
    getDoctorList() {
      this.$axios('/yxs/api/web/doctor/recommendList').then(res => {
        if(res.code == 0) {
          this.famousList = res.data
        }
      })
    },
    // 首页培训项目
    getTrainList() {
      this.$axios('/yxs/api/web/course/getRecommendTrainList', {
        params: {
          type: ''
        }
      }).then(res => {
        if(res.code == 0) {
          this.trainList = res.data
        }
      })
    },
    // 获取首页资讯
    getNewsList() {
      this.$axios('/yxs/api/web/news/recommendList').then(res => {
        if(res.code == 0) {
          this.toutiaoList = res.data
        }
      })
    },
    // 获取推荐课程分类
    getCategoryByCode(code) {
      this.$axios('/yxs/api/web/course/getCategoryByCode', {
        params: {
          code
        }
      }).then(res => {
        if(res.code == 0) {
          switch(code) {
            case 'zyjk':
              this.healthSubList = res.data
              break;
            case 'education':
              this.examSubList = res.data
              break;
            case 'career':
              this.theorySubList = res.data
              break;
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .carousel {
    height: 400px;
    .imgs {
      width: 100%;
      height: 400px;
      img {
        width: 100%;
      }
    }
    &-content {
      position: relative;
      width: 1200px;
      margin: -400px auto;
      .nav-list {
        position: absolute;
        top: 0;
        padding: 10px 20px;
        width: 184px;
        height: 380px;
        background: rgba(0, 0, 0, .7);
        color: #fff;
        font-size: 16px;
        z-index: 99;
        .nav-item {
          margin-top: 30px;
          height: 24px;
          line-height: 24px;
          &:first-child {
            margin-top: 20px;
          }
        }
        .sub-nav {
          margin-top: 16px;
          font-size: 14px;
          opacity: .6;
          span {
            margin-left: 30px;
          }
        }
      }
      .info-list {
        position: absolute;
        right: 0;
        top: 35px;
        width: 260px;
        height: 330px;
        z-index: 99;
        background: rgba(255, 255, 255, .8);
        .info-header {
          display: flex;
          justify-content: space-between;
          padding-left: 12px;
          height: 40px;
          line-height: 40px;
          background: rgba(63, 138, 56, .6);
          color: #fff;
          h3 {
            font-size: 16px;
          }
          .more {
            margin-right: 12px;
            font-size: 0;
            cursor: pointer;
            span {
              font-size: 14px;
            }
          }
        }
        ul {
          padding: 0 22px;
          li {
            display: flex;
            align-items: center;
            height: 70px;
            border-bottom: 1px solid rgba(0, 0, 0, .2);
            color: #666;
            line-height: 22px;
            font-size: 14px;
            &:last-child {
              border: none;
            }
          }
        }
      }
    }
  }
  .item-container {
    width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
    .container-header {
      position: relative;
    }
    h2 {
      display: inline-block;
      font-size: 24px;
      color: #333;
      font-weight: 400;
    }
    .subnav {
      display: inline-block;
      font-size: 0;
      span {
        display: inline-block;
        margin-left: 16px;
        font-size: 14px;
        color: #666;
      }
      .pos-right {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 12px;
        .icon-more-right {
          font-size: 14px;
        }
      }
    }
    .list {
      display: flex;
      margin-top: 24px;
      &-item {
        margin-left: 20px;
        &:first-child {
          margin: 0;
        }
      }
    }
    .imgs {
      font-size: 0;
      img {
        margin-left: 20px;
        &:first-child {
          margin: 0;
        }
      }
    }
    .container-content {
      display: flex;
      margin-top: 22px;
      margin-bottom: 10px;
      .left-img {
        position: relative;
        width: 224px;
        height: 390px;
        .text {
          position: absolute;
          top: 150px;
          width: 224px;
          text-align: center;
          color: #fff;
          .title {
            font-size: 24px;
            font-weight: bold;
          }
          .sub-title {
            margin-top: 24px;
            font-size: 18px;
          }
        }
      }
      .right-list {
        flex: 1;
        margin-left: 20px;
        .list-item {
          display: inline-block;
          width: 224px;
          height: 183px;
          margin-bottom: 24px;
          &:nth-child(4n + 1) {
            margin-left: 0;
          }
          &:nth-child(n + 4) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .bg-f6 {
    background: #f6f6f6;
    padding-bottom: 39px;
  }
  .train {
    margin-top: 40px;
    .train-img {
      position: relative;
      display: inline-block;
      width: 285px;
      height: 160px;
      margin-top: 24px;
      margin-left: 20px;
      font-size: 0;
      cursor: pointer;
      &:hover .text{
        background: #3F8A38;
        color: #fff;
      }
      &:first-child {
        margin-left: 0;
      }
      .text {
        position: absolute;
        bottom: 12px;
        left: 12px;
        height: 28px;
        line-height: 28px;
        padding: 0 16px;
        font-size: 14px;
        color: #fff;
        background: rgba(0, 0, 0, .6);
        border-radius: 14px;
      }
    }
    img {
      display: inline-block;
      width: 285px;
      height: 160px;
      border-radius: 6px;
    }
    .button {
      margin-top: 30px;
      text-align: center;
      .icon-refresh {
        margin-right: 10px;
      }
      span {
        display: inline-block;
        width: 160px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        font-size: 14px;
        color: #666;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .toutiao {
    margin-top: 24px;
    &-item {
      display: inline-block;
      width: 590px;
      margin-bottom: 24px;
      &:nth-child(even) {
        margin-left: 20px;
      }
    }
  }
  
</style>
<style>
  .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
  }
  .el-carousel__indicator.is-active .el-carousel__button {
    background: #99C04F;
  }
</style>