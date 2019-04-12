<template>
  <section class="news-container">
    <tag :text="['资', '讯']" />
    <!-- <div class="title">{{ dataObj[0].title }}</div> -->
    <!-- <div class="content">
      <img :src="dataObj[0].thumb">
      <div class="desc">
        {{ dataObj[0].brife }}
        <span class="detail">[详细]</span>
      </div>
    </div> -->
    <div class="list">
      <div
        v-for="(item, index) in recommendNews"
        v-if="index < 3"
        :key="index"
        class="item"
        @click="toDetail(item.id)">
        <span class="circle"/>
        <span>【{{ item.typeName }}】</span>
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
  data() {
    return {
      recommendNews: []
    }
  },
  mounted() {
    this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.$axios('/yxs/api/web/news/recommendList').then(res => {
        if(res.code == 0) {
          this.recommendNews = res.data
        }
      })
    },
    toDetail(id) {
      let url = this.$router.resolve({ 
        name: 'toutiao-detail',
        query: {
          id
        }
      })
      window.open(url.href, '_blank')
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
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
        cursor: pointer;
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
