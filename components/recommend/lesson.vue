<template>
  <section class="lesson-container">
    <tag :text="['课', '程']" />
    <div class="list">
      <div
        v-for="(item, index) in dataArray"
        :key="index"
        class="item">
        <img :src="item.src">
        <div class="title">{{ item.title }}</div>
        <div class="info">
          <span class="teacher">讲师：{{ item.teacher }}</span>
          <span class="lesson">共{{ item.lessons }}节</span>
          <span class="number">{{ item.number }}人学过</span>
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
  props: {
    dataArray: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      
    }
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
      margin-top: 20px;
      &:first-child {
        margin: 0;
      }
      img {
        width: 100%;
        height: 173px;
        border-radius: 6px;
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
