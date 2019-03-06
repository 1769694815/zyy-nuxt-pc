<template>
  <section class="news-container">
    <tag :text="['资', '讯']" />
    <div class="title">{{ dataObj.title }}</div>
    <div class="content">
      <img :src="dataObj.src">
      <div class="desc">
        {{ dataObj.desc }}
        <span class="detail">[详细]</span>
      </div>
    </div>
    <div class="list">
      <div
        v-for="(item, index) in dataObj.list"
        :key="index"
        class="item">
        <span class="circle"/>
        <span>【{{ item.type }}】</span>
        <span>{{ item.title }}</span>
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
    dataObj: {
      type: Object,
      default: function() {
        return {}
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
  .news-container {
    width: 340px;
    height: 365px;
    background: #f6f6f6;
    .title {
      margin-top: 18px;
      margin-left: 14px;
      font-size: 16px;
      color: #333;
    }
    .content {
      position: relative;
      display: flex;
      padding: 14px 20px 0 14px;
      align-items: center;
      img {
        width: 130px;
        height: 73px;
      }
      .desc {
        margin-left: 12px;
        font-size: 14px;
        line-height: 24px;
        color: #999;
      }
      .detail {
        position: absolute;
        right: 20px;
        font-size: 14px;
        color: #333;
      }
    }
    .list {
      padding: 14px 20px 0 12px;
      .item {
        margin-top: 10px;
        line-height: 20px;
        font-size: 0;
        color: #666;
      }
      .circle {
        display: inline-block;
        margin-bottom: 3px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #3f8a38;
      }
      span {
        font-size: 14px;
        color: #666;
      }
    }
  }
</style>
