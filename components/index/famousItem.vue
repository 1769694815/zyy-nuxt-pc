<template>
  <div class="item">
    <img :src="dataObj.pic">
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
  }
}
</script>
<style lang="scss" scoped>
  .item {
    width: 224px;
    height: 215px;
  }
  img {
    width: 224px;
    height: 126px;
    border-radius: 6px;
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
