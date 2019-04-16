<template>
  <div class="container">
    <h1>名医师承</h1>
    <div class="subtitle">数百位江中名医精品课程，零距离在线学习</div>
    <ul class="list">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="toDetail(item.id)">
        <img :src="item.pic">
        <div class="title">{{ item.name + ' ' + item.title }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '名医师承',
      list: []
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios('/yxs/api/web/doctor/more').then(res => {
        this.list = res.data
      })
    },
    toDetail(id) {
      let url = this.$router.resolve({
        name: 'doctor-detail',
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
  .container {
    width: 1200px;
    min-height: 600px;
    margin: 0 auto;
    h1 {
      position: relative;
      margin-top: 50px;
      text-align: center;
      font-size: 34px;
      &:before, &:after {
        content: '';
        position: absolute;
        top: 50%;
        width: 400px;
        height: 1px;
        background: #b6b6b6;
      }
      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
    }
    .subtitle {
      margin-top: 30px;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
    .list {
      width: 1200px;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 60px;
      li {
        flex-shrink: 1;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-left: 20px;
        width: 285px;
        height: 190px;
        transition: all .3s ease 0s;
        cursor: pointer;
        &:nth-child(4n+1) {
          margin-left: 0;
        }
        &:hover {
          transform: translate(0, -8px);
          box-shadow: 0 5px 10px #999;
        }
        img {
          margin: 0;
          width: 100%;
          height: 160px;
        }
        .title {
          padding-left: 10px;
          height: 30px;
          line-height: 30px;
          background: #f5f5f5;
          font-size: 12px;
          color: #333;
        }
      }
    }
  }
</style>
