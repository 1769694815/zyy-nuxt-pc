<template>
  <div class="toutiao-index">
    <ul class="toutiao-nav">
      <li
        v-for="(item, index) in navList"
        :key="index"
        :class="tab === (index + 1) ? 'active' : ''"
        @click="switchTab(index, item)">
        {{ item.name }}
      </li>
    </ul>
    <div class="content-list">
      <div
        v-for="(item, index) in listData"
        :key="index"
        class="list-item">
        <nuxt-link
          :to="{ name: 'toutiao-id', params: { id: item.articleId }}"
          target="_blank">
          <img :src="item.thumb">
          <div class="info">
            <div class="title">{{ item.title }}</div>
            <p
              class="desc"
              style="overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;">{{ item.brife }}</p>
            <div class="foot">
              <span>{{ item.publishedtime }}</span>
              <span class="number">
                <i class="iconfont iconchakan"/>{{ item.hits }}
              </span>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div
        v-if="listData.length == 0"
        style="margin-top: 30px; font-size: 16px; text-align: center">暂无相关内容</div>
    </div>
    <div
      v-show="total >= 10"
      class="btn-more"
      @click="getList(true)">
      显示更多
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '资讯头条',
      tab: 1,
      size: 10,
      current: 1,
      type: null,
      total: 0,
      navList: [],
      listData: [],
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  async asyncData({ $axios, store }) {
    let res = await $axios('/yxs/api/web/news/getAllCategory')
    let type
    if(res.data && res.data.length > 0) {
      type = res.data[0].id
    }
    let list = await $axios('/yxs/api/web/news/getArticleMore', { params: {
      size: 10,
      current: 1,
      type
    }})
    return {
      navList: res.data,
      listData: list.data.records,
      total: list.data.records.length
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    switchTab(index, item) {
      this.tab = index + 1
      this.type = item.id
      this.title = item.name + '_资讯头条'
      this.current = 1
      this.total = 0
      this.listData = []
      this.getList()
    },
    getList(flag) {
      if(flag) {
        this.current += 1
      }
      this.$axios('/yxs/api/web/news/getArticleMore', {
        params: {
          size: this.size,
          current: this.current,
          type: this.type
        }
      }).then(res => {
        this.listData = [...this.listData,...res.data.records]
        this.total = res.data.records.length
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .toutiao-nav {
    width: 100%;
    height: 45px;
    background: #f6f6f6;
    li {
      display: inline-block;
      width: 108px;
      height: 45px;
      box-sizing: border-box;
      line-height: 45px;
      text-align: center;
      font-size: 16px;
      color: #333;
      cursor: pointer;
    }
    .active {
      background: #fff;
      border: 1px solid #f6f6f6;
      border-top: 4px solid #3f8a38;
      color: #3f8a38;
    }
  }
  .content-list {
    .list-item {
      padding: 16px 0;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
      &:last-child {
        border: none;
      }
      a {
        display: flex;
        align-items: center;
      }
      img {
        flex: 0 0 224px;
        display: inline-block;
        width: 224px;
        height: 126px;
        margin-right: 16px;
        border-radius: 6px;
      }
      .info {
        flex: 1;
        .title {
          line-height: 24px;
          font-size: 18px;
          color: #333;
        }
        p.desc {
          width: 586px;
          margin-top: 15px;
          font-size: 14px;
          color: #999;
          line-height: 24px;
        }
        .foot {
          margin-top: 20px;
          font-size: 12px;
          color: #999;
        }
        .number {
          display: flex;
          align-items: center;
          margin-left: 20px;
          display: inline-block;
          vertical-align: top;
          height: 16px;
          line-height: 16px;
          i {
            display: inline-block;
            vertical-align: top;
            margin-right: 4px;
            color: #aaa;
          }
        }
      }
    }
  }
  .btn-more {
    width: 100%;
    height: 50px;
    margin: 14px 0 20px 0;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #999;
    border: 1px solid #ddd;
    cursor: pointer;
  }
</style>
