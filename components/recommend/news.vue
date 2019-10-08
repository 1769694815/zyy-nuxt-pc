<template>
  <section class="news-container">
    <tag :text="['资', '讯']" />
    <ul class="list">
      <li
        v-for="(item, index) in recommendNews"
        v-if="index < 4"
        :key="index"
        class="item">
        <nuxt-link
          :to="{ name: 'toutiao-detail', query: { id: item.id }}"
          :title="item.title"
          target="_blank">
          <div v-if="index == 0">
            <div class="title">{{ item.title }}</div>
            <div class="content">
              <img :src="item.thumb">
              <div
                class="desc"
                style="display: -webkit-box;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 3;
                      overflow: hidden;
                      text-overflow: ellipsis;">
                {{ item.brife }}
                <!-- <span class="detail">[详细]</span> -->
              </div>
            </div>
          </div>
          <div v-else>
            <span class="circle"/>
            <span>【{{ item.typeName }}】</span>
            <span>{{ item.title }}</span>
          </div>
        </nuxt-link>
      </li>
    </ul>
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .news-container {
    width: 340px;
    height: 365px;
    background: #f6f6f6;
    overflow: hidden;
    .title {
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // margin-top: 18px;
      // margin-left: 14px;
      font-size: 16px;
      color: #333;
    }
    .content {
      position: relative;
      display: flex;
      padding: 10px 10px 0 0;
      align-items: center;
      img {
        width: 130px;
        height: 73px;
      }
      .desc {
        margin-left: 12px;
        font-size: 14px;
        line-height: 20px;
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
