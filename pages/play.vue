<template>
  <div style="width:100%">
    <v-header />
    <nav-bar />
    <div class="container">
      <div class="crumb">
        首页>课程中心>自学考试>中药学
      </div>
      <div class="play-container">
        <div class="play-header">
          <div class="title">{{ info.courseTitle }}</div>
          <di class="sub">
            <span>163人学过</span>
            <span>20天后到期,请尽快学完</span>
          </di>
        </div>
        <div class="play-content">
          <video-player />
          <ul class="menu">
            <li
              v-for="(item, index) in info.lessons"
              :key="index">
              <div class="chapter">{{ item.chapter }}</div>
              <div class="info">
                <!-- <span>{{ item.name }}</span> -->
                <span>{{ item.lessonTitle }}</span>
                <div class="foot">
                  <span>{{ item.learnTime }}分钟</span>
                  <span>已学完</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="other-container">
        <div class="container-title">我的其他课程</div>
        <ul>
          <li
            v-for="(item,index) in otherList"
            :key="index"
            class="list-item">
            <img :src="item.middlePicture">
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <p
                v-if="item.dayCount != 0"
                class="desc">
                {{ item.dayCount }}天后到期
              </p>
              <p
                v-else
                class="desc">
                已到期
              </p>
              <div class="foot">
                <span>已学{{ item.result }}</span>
                <span>共{{ item.lessonNum }}节</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="recommend-container">
        <div class="container-title">推荐课程</div>
        <ul>
          <li
            v-for="(item, index) in recommendList"
            :key="index">
            <img :src="item.middle_picture">
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <div class="info">
                <span
                  v-if="item.price == 0"
                  class="free">
                  免费
                </span>
                <span
                  v-else
                  class="price">
                  ￥{{ item.price }}
                </span>
                <span class="lesson">共{{ item.lessonNum }}节</span>
                <span class="number">{{ item.studentNum }}人学过</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import VideoPlayer from '~/components/video.vue'
import NavBar from '~/components/navBar.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    VideoPlayer,
    NavBar,
    'v-header': Header
  },
  data() {
    return {
      courseId: null,
      lessonId: null,
      userInfo: '',
      info: '',
      menuList: [
        {
          chapter: '第一章',
          name: '绪论',
          title: '药膳养生师概念',
          percent: 96,
          time: 130
        },
        {
          chapter: '第一章',
          name: '绪论',
          title: '药膳养生师概念',
          percent: 96,
          time: 130
        },
        {
          chapter: '第一章',
          name: '绪论',
          title: '药膳养生师概念',
          percent: 96,
          time: 130
        },
      ],
      otherList: [],
      recommendList: []
    }
  },
  mounted() {
    this.courseId = this.$route.query.courseId
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.getInfo()
    this.getList()
    this.getRecommendList('zyjk')
  },
  methods: {
    getInfo() {
      this.$axios.post('/yxs/api/web/user/startLearnCourse', {
        courseId: 35,
        lessonId: this.lessonId,
        userToken: this.userInfo.userToken
      }).then(res => {
        this.info = res.data
      })
    },
    getList() {
      let params = {
        size: 5,
        current: 1,
        type: 0,
        userToken: this.userInfo.userToken
      }
      this.$axios('/yxs/api/web/user/getCourseMemberPageByUserId', {
        params
      }).then(res => {
        this.otherList = res.data
      })
    },
    getRecommendList(type) {
      this.$axios('/yxs/api/web/course/getRecommendList', {
        params: {
          type
        }
      }).then(res => {
        this.recommendList = res.data
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 30px auto;
    .crumb {
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
    .play-container {
      margin-top: 30px;
      .play-header {
        display: flex;
        align-items: flex-end;
        .title {
          font-size: 24px;
          color: #333;
        }
        span {
          margin-left: 16px;
          font-size: 14px;
          color: #333;
        }
      }
      .play-content {
        display: flex;
        margin-top: 30px;
        .menu {
          width: 330px;
          height: 102px;
          background: #131313;
          height: 500px;
          overflow: auto;
          li {
            display: flex;
            margin: 0 30px;
            padding: 30px 0;
            color: #C1C1C1;
            border-bottom: 1px solid #2A2A2A;
            .chapter {
              font-size: 16px;
            }
            .info {
              margin-left: 14px;
              .foot {
                display: flex;
                justify-content: space-between;
                margin-top: 13px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .container-title {
      font-size: 24px;
      color: #333;
      margin-bottom: 20px;
    }
    .other-container {
      margin-top: 40px;
      .list-item {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 224px;
        height: 203px;
        margin-left: 20px;
        &:first-child {
          margin-left: 0;
        }
        img {
          width: 224px;
          height: 126px;
          border-radius: 6px;
        }
        .content {
          padding: 0 10px;
        }
        .title {
          margin-top: 12px;
          font-size: 14px;
          color: #333;
        }
        p {
          margin-top: 12px;
          font-size: 12px;
          color: #3F8A38;
        }
        .foot {
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          width: 100%;
          margin-top: 10px;
          font-size: 12px;
          color: #999;
          span {
            display: inline-block;
          }
        }
      }
    }
    .recommend-container {
      margin-top: 40px;
      li {
        margin-left: 20px;
        display: inline-block;
        width: 224px;
        &:first-child {
          margin: 0;
        }
        img {
          width: 224px;
          height: 126px;
          border-radius: 6px;
        }
        .content {
          padding: 0 10px;
          .title {
            margin-top: 12px;
            font-size: 14px;
            color: #333;
          }
          .info {
            position: relative;
            margin-top: 12px;
            font-size: 0;
            color: #999;
            span {
              display: inline-block;
              font-size: 12px;
            }
            .free {
              color: #3F8A38;
            }
            .price {
              color: #FF4400;
            }
            .lesson {
              margin-left: 9px;
            }
            .number {
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
