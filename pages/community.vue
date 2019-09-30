<template>
  <div style="width:100%;">
    <v-header />
    <nav-bar :tab-index="tabIndex" />
    <div style="background: #f2f2f2">
      <div class="container">
        <div class="flex">
          <div class="banner">
            <el-carousel
              height="450px"
              class="imgs">
              <el-carousel-item
                v-for="(item, index) in carousels"
                :key="index">
                <nuxt-link
                  :to="{ name: 'toutiao-id', params: { id: item.id }}"
                  target="_blank">
                  <img :src="item.url">
                </nuxt-link>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="banner-right">
            <div 
              v-for="(item, index) in rightList"
              v-if="index < 2"
              :key="index"
              class="right-item"
              @click="openNewPage($router.resolve({ name: 'lessonDetail', query: { id: item.id }}))">
              <img :src="item.middle_picture">
              <div class="title">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="channel">
            <div class="header">
              <div class="title">进社区频道</div>
              <div
                class="more"
                @click="openNewPage($router.resolve({ name: 'toutiao' }))">
                更多<i class="iconfont icongengduo" />
              </div>
            </div>
            <ul>
              <li
                v-for="(item, index) in channels"
                :key="index">
                <div class="info">
                  <nuxt-link
                    :to="{ name: 'toutiao-id', params: { id: item.id }}"
                    :title="item.title"
                    target="_blank">
                    <div class="date">
                      <div class="day">{{ item.publishedTime.split('-')[1] }}</div>
                      <div class="month">{{ item.publishedTime.split('-')[0] }}月</div>
                    </div>
                    <div class="right">
                      <div class="tip">头条通知</div>
                      <div class="title">{{ item.title }}</div>
                    </div>
                  </nuxt-link>
                </div>
                <p>{{ item.brife }}</p>
              </li>
            </ul>
          </div>
          <div class="course">
            <div class="title">推荐课程</div>
            <ul>
              <li
                v-for="(item, index) in healthList"
                v-if="index < 3"
                :key="index"
                @click="openNewPage($router.resolve({ name: 'lessonDetail', query: { id: item.id} }))">
                <div class="img-box">
                  <img :src="item.middle_picture">
                </div>
                <div class="desc">
                  <div class="name">{{ item.title }}</div>
                  <div class="number">{{ item.studentNum }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="wrap">
          <div class="wrap-item">
            <div class="text">
              <div class="title">中医基础课程</div>
              <div class="subtitle">免费公开课</div>
            </div>
          </div>
          <ul>
            <li
              v-for="(item, index) in careerList"
              :key="index"
              @click="openNewPage($router.resolve({ name: 'lessonDetail', query: { id: item.id }}))">
              <img :src="item.middlePicture">
              <div class="desc">{{ item.title }}</div>
            </li>
          </ul>
        </div>
        <div class="wrap">
          <div class="wrap-item wrap-item-2">
            <div class="text">
              <div class="title">智慧树学堂</div>
              <div class="subtitle">免费公开课</div>
            </div>
          </div>
          <ul>
            <li
              v-for="(item, index) in wisdomList"
              :key="index"
              @click="openNewPage($router.resolve({ name: 'lessonDetail', query: { id: item.id }}))">
              <img :src="item.middlePicture">
              <div class="desc">{{ item.title }}</div>
            </li>
          </ul>
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
      title: '中医药进社区',
      tabIndex: 5,
      channels: [],
      rightList: [],
      healthList: [],
      careerList: [],
      wisdomList: [],
      carousels: []
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios('/yxs/api/web/news/community')
    return { channels: data }
  },
  mounted() {
    this.getCarousel()
    // this.getChannel()
    this.getResearchList()
    this.getRecommendList('education')
    this.getCourseList()
  },
  methods: {
    // 获取轮播
    getCarousel() {
      this.$axios('/yxs/api/web/news/getBannerList').then(res => {
        if(res.code == 0) {
          this.carousels = res.data
        }
      })
    },
    // 
    getChannel() {
      this.$axios('/yxs/api/web/news/community').then(res => {
        this.channels = res.data
      })
    },
    // 获取banner右侧图片
    getResearchList() {
      this.$axios('/yxs/api/web/doctor/recommendCourseList').then(res => {
        if(res.code == 0) {
          this.rightList = res.data.records
        }
      })
    },
    // 推荐课程
    getRecommendList(type) {
      this.$axios('/yxs/api/web/course/getRecommendList', {
        params: {
          type
        }
      }).then(res => {
        if(res.code == 0) {
          this.healthList = res.data
        }
      })
    },
    // 获取课程
    getCourseList() {
      this.$axios('/yxs/api/web/course/getCodeCourse').then(res => {
        this.careerList = res.data.career
        this.wisdomList = res.data.wisdom
      })
    },
    openNewPage(url) {
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;
    .flex {
      display: flex;
      padding-top: 20px;
    }
    .banner {
      flex: 0 0 800px;
      width: 800px;
      img {
        width: 100%;
        cursor: pointer;
      }
    }
    .banner-right {
      margin-left: 20px;
      .right-item {
        position: relative;
        width: 378px;
        height: 213px;
        overflow: hidden;
        cursor: pointer;
        &:last-child {
          margin-top: 22px;
        }
        &:hover img {
          transform: scale(1.1, 1.1);
        }
        &:hover .title {
          bottom: 0;
        }
      }
      img {
        width: 378px;
        height: 213px;
        transition: all .3s ease 0s;
      }
      .title {
        position: absolute;
        bottom: -30px;
        width: 358px;
        height: 30px;
        padding-left: 20px;
        line-height: 30px;
        color: #fff;
        background: rgba(0, 0, 0, .3);
        transition: all .3s ease 0s;
      }
    }
    .channel {
      flex: 0 0 800px;
      width: 800px;
      background: #fff;
      .header {
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #dedede;
        .title {
          margin-left: 18px;
          font-size: 24px;
          color: #333;
          font-weight: 600;
        }
        .more {
          margin-right: 24px;
          font-size: 14px;
          color: #666;
          cursor: pointer;
          &:hover {
            color: #3F8A38;
          }
          i {
            margin-left: 4px;
            font-size: 14px;
          }
        }
      }
      ul {
        padding: 0 20px;
        li {
          padding: 20px 0;
          border-bottom: 1px solid #dedede;
          &:last-child {
            border-bottom: none;
          }
          .info {
            // display: flex;
            // align-items: center;
            cursor: pointer;
            a {
              display: flex;
              align-items: center;
            }
            .date {
              width: 45px;
              height: 39px;
              padding-top: 6px;
              border-radius: 50%;
              background: #eee;
              text-align: center;
              color: #999;
              .day {
                font-size: 16px;
              }
              .month {
                margin-top: 4px;
                font-size: 12px;
              }
            }
            .tip {
              color: #333;
            }
            .right {
              margin-left: 14px;
              .title {
                margin-top: 8px;
                font-size: 22px;
                color: #333;
                &:hover {
                  color: #3F8A38;
                }
              }
            }
          }
          p {
            margin-top: 14px;
            font-size: 14px;
            line-height: 24px;
            color: #999;
          }
        }
      }
    }
    .course {
      flex: 1;
      margin-left: 20px;
      padding: 0 18px;
      background: #fff;
      .title {
        height: 60px;
        line-height: 60px;
        color: #333;
        font-size: 24px;
        font-weight: 600;
        border-bottom: 1px solid #dedede;
      }
      ul {
        li {
          margin-bottom: 20px;
          cursor: pointer;
          &:hover img {
            transform: scale(1.1, 1.1);
          }
          .img-box {
            width: 338px;
            height: 190px;
            overflow: hidden;
          }
          img {
            width: 338px;
            height: 190px;
            transition: all 0.3s ease 0s;
          }
          .desc {
            display: flex;
            justify-content: space-between;
            height: 36px;
            line-height: 36px;
            .name {
              color: #333;
              font-size: 16px;
              &:hover {
                color: #3F8A38;
              }
            }
            .number {
              color: #999;
            }
          }
        }
      }
    }
    .wrap {
      display: flex;
      height: 154px;
      margin-top: 20px;
      padding: 20px;
      align-items: center;
      background: #fff;
      &-item {
        flex: 0 0 180px;
        width: 180px;
        height: 154px;
        background: #257397;
        color: #fff;
        text-align: center;
        .title {
          margin-top: 52px;
          font-size: 24px;
        }
        .subtitle {
          margin-top: 10px;
          font-size: 16px;
        }
      }
      ul {
        flex: 1;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        margin-left: 20px;
        overflow: hidden;
      }
      li {
        flex-shrink: 1;
        margin-left: 20px;
        cursor: pointer;
        &:hover img {
          transform: scale(1.1, 1.1);
        }
        &:hover .desc {
          color: #3F8A38;
        }
        &:first-child {
          margin-left: 0;
        }
        img {
          width: 225px;
          height: 127px;
          transition: all .3s ease 0s;
        }
        .desc {
          margin-top: 10px;
        }
      }
      .wrap-item-2 {
        background: #20673f;
      }
    }
  }
</style>
