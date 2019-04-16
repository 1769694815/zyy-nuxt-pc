<template>
  <div class="container">
    <div class="img-box">
      <img
        :src="dataObj.middle_picture"
        @click="toDetail(dataObj.id)">
    </div>
    <div class="content">
      <div class="title">{{ dataObj.title }}</div>
      <div class="info">
        <span
          v-if="dataObj.price == 0"
          class="free">免费
        </span>
        <span
          v-else
          class="price">￥{{ dataObj.price }}
        </span>
        <span class="lesson">共{{ dataObj.lessonNum }}节</span>
        <span class="number">{{ dataObj.studentNum }}人学过</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    toDetail(id) {
      let url = this.$router.resolve({
        name: 'lessonDetail',
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
  .item {
    width: 224px;
    height: 183px;
  }
  .img-box {
    width: 224px;
    height: 126px;
    overflow: hidden;
    border-radius: 6px;
    &:hover img {
      transform: scale(1.1, 1.1);
    }
  }
  img {
    display: block;
    width: 224px;
    height: 126px;
    background: rgba(98,98,98,1);
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
  .content {
    padding: 0 10px;
    .title {
      width: 100%;
      margin-top: 15px;
      font-size: 14px;
      color: #333;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .info {
      margin-top: 9px;
      font-size: 0;
      .free {
        display: inline-block;
        width: 34px;
        height: 19px;
        line-height: 19px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        background: #3F8A38;
        border-radius: 2px;
      }
      .price {
        display: inline-block;
        height: 19px;
        line-height: 19px;
        padding: 0 6px;
        font-size: 12px;
        background: #FBB03B;
        color: #fff;
        border-radius: 2px;
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
</style>
