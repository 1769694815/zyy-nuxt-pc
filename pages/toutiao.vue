<template>
  <div style="width:100%">
    <v-header />
    <nav-bar />
    <div class="container">
      <div class="crumb">
        首页><span @click="$router.push({ name: 'toutiao' })">资讯头条</span>
      </div>
      <div class="toutiao-content">
        <div class="content-left">
          <nuxt-child />
        </div>
        <section class="content-right">
          <news-section />
          <lesson-section class="section" />
          <train-section class="section" />
        </section>
      </div>
      <div class="foot-img">
        <img
          src="~/assets/images/foot-img.jpg"
          @click="toService">
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
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
    TrainSection,
    'v-header': Header
  },
  data() {
    return {
    }
  },
  methods: {
    toService() {
      this.$router.push({
        name: 'service'
      })
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
      span {
        cursor: pointer;
      }
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
