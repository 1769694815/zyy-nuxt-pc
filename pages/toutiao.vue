<template>
  <div style="width:100%">
    <nav-bar />
    <div class="container">
      <div class="crumb">
        首页>资讯头条
      </div>
      <div class="toutiao-content">
        <div class="content-left">
          <nuxt-child />
        </div>
        <section class="content-right">
          <news-section :data-obj="recommendNews" />
          <lesson-section
            :data-array="recommendLessons"
            class="section" />
          <train-section
            :data-array="recommendTrains"
            class="section" />
        </section>
      </div>
      <div class="foot-img">
        <img src="~/assets/images/foot-img.jpg">
      </div>
    </div>
  </div>
</template>
<script>
import ToutiaoIndex from './toutiao/index'
import NavBar from '~/components/navBar.vue'
import LessonSection from '~/components/recommend/lesson.vue'
import NewsSection from '~/components/recommend/news.vue'
import TrainSection from '~/components/recommend/train.vue'
export default {
  components: {
    ToutiaoIndex,
    NavBar,
    LessonSection,
    NewsSection,
    TrainSection
  },
  data() {
    return {
      recommendNews: {
        title: '中国“藏医药浴法”被列入联合...',
        src: require('~/assets/images/wbc.jpg'),
        desc: '当地时间28日，在联合国教科文组织保护非物质文化...',
        list: [
          {
            type: '文化活动',
            title: '中国“藏医药浴法”被列入联合国非遗名录'
          },
          {
            type: '文化活动',
            title: '中国“藏医药浴法”被列入联合国非遗名录'
          },
          {
            type: '文化活动',
            title: '中国“藏医药浴法”被列入联合国非遗名录'
          }
        ]
      },
      recommendLessons: [
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        }
      ],
      recommendTrains: [
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中药炮制厂',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中药炮制厂',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中药炮制厂',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
    .crumb {
      margin-top: 28px;
      margin-bottom: 18px;
      font-size: 12px;
      color: #666;
    }
    .toutiao-content {
      display: flex;
    }
    .content-left {
      width: 830px;
    }
    .content-right {
      width: 340px;
      margin-left: 30px;
      .section {
        margin-top: 30px;
      }
    }
    
  }
</style>
