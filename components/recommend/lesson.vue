<template>
  <section class="lesson-container">
    <tag :text="['课', '程']" />
    <div class="list">
      <div
        v-for="(item, index) in recommendLessons"
        v-if="index < 3"
        :key="index"
        class="item"
        @click="$router.push({ name: 'lessonDetail', query: { id: item.id }})">
        <div class="img-box">
          <img :src="item.middle_picture">
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="info">
          <span class="teacher">讲师：{{ item.teacherName }}</span>
          <span class="lesson">共{{ item.lessonNum }}节</span>
          <span class="number">{{ item.studentNum }}人学过</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Tag from './tag'
export default {
  components: {
    Tag
  },
  data() {
    return {
      recommendLessons: []
    }
  },
  mounted() {
    this.getRecommendList('education')
  },
  methods: {
    getRecommendList(type) {
      this.$axios('/yxs/api/web/course/getRecommendList', {
        params: {
          type
        }
      }).then(res => {
        if(res.code == 0) {
          this.recommendLessons = res.data
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .lesson-container {
    height: 800px;
    background: #f6f6f6;
    .list {
      padding: 16px;
    }
    .item {
      cursor: pointer;
      margin-top: 20px;
      &:first-child {
        margin: 0;
      }
      .img-box {
        width: 100%;
        overflow: hidden;
        border-radius: 6px;
        cursor: pointer;
        &:hover img {
          transform: scale(1.1, 1.1);
        }
      }
      img {
        width: 100%;
        height: 173px;
        border-radius: 6px;
        transition: all .3s ease 0s;
      }
      .title {
        margin: 15px 0 0 10px;
        font-size: 14px;
        color: #333;
      }
      .info {
        margin: 12px 0 0 10px;
        font-size: 0;
        .teacher {
          display: inline-block;
          height: 19px;
          line-height: 19px;
          font-size: 12px;
          color: #3F8A38;
        }
        .lesson {
          margin-left: 12px;
          font-size: 12px;
          color: #999;
        }
        .number {
          font-size: 12px;
          color: #999;
          float: right;
        }
      }
    }
  }
</style>
