<template>
  <div class="container">
    <div class="left-img">
      <img :src="dataObj.src">
      <div class="tag">{{ dataObj.type }}</div>
    </div>
    <div class="content">
      <div class="title">{{ dataObj.title }}</div>
      <div class="desc">{{ dataObj.desc }}</div>
      <div class="foot">
        <span class="date">{{ dataObj.date }}</span>
        <span class="number">{{ dataObj.number }}</span>
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
  .container {
    display: flex;
    align-items: center;
  }
  .left-img {
    position: relative;
    width: 224px;
    height: 126px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    .tag {
      position: absolute;
      top: 10px;
      padding: 5px 8px;
      background: #3f8a38;
      border-radius: 0 4px 4px 0;
      color: #fff;
      font-size: 12px;
    }
  }
  
  .content {
    margin-left: 16px;
    .title {
      font-size: 18px;
    }
    .desc {
      margin-top: 15px;
      font-size: 14px;
      line-height: 20px;
      color: #999;
    }
    .foot {
      margin-top: 24px;
      font-size: 0;
      .date {
        font-size: 12px;
        color: #999;
      }
      .number {
        float: right;
        font-size: 12px;
        color: #999;
      }
    }
  }
</style>
