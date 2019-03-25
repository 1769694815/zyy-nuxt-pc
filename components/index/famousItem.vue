<template>
  <div class="item">
    <div
      class="img-box"
      @click="toDetail(dataObj.id)">
      <img :src="dataObj.pic">
    </div>
    <div class="content">
      <span class="name">{{ dataObj.name }}</span>
      <span class="rank">{{ dataObj.title }}</span>
      <div class="detail">
        <span>{{ dataObj.courseNum }}门精选课</span>
        <span class="fr">{{ dataObj.fanNum }}人关注</span>
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
      this.$router.push({
        name: 'doctor-detail',
        query: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .item {
    width: 224px;
    height: 215px;
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
    width: 100%;
    height: 126px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
  .content {
    padding: 16px 10px;
    font-size: 0;
    .name {
      font-size: 14px;
      color: #333;
    }
    .rank {
      margin-left: 8px;
      font-size: 12px;
      color: #3F8A38;
    }
    .detail {
      margin-top: 9px;
      color: #999;
      font-size: 12px;
    }
  }
</style>
