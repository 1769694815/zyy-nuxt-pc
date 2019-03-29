<template>
  <div class="container">
    <div class="left-img">
      <img :src="dataObj.thumb">
      <!-- <div class="tag">{{ dataObj.type }}</div> -->
    </div>
    <div class="content">
      <div class="title">{{ dataObj.title }}</div>
      <div class="desc">{{ dataObj.brife }}</div>
      <div class="foot">
        <span class="date">{{ dataObj.publishedtime }}</span>
        <span class="number">
          <i class="iconfont iconchakan" />
          {{ dataObj.hits }}
        </span>
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
    flex: 0 0 224px;
    position: relative;
    width: 224px;
    height: 126px;
    border-radius: 6px;
    overflow: hidden;
    &:hover img {
      transform: scale(1.1, 1.1);
    }
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: all 0.3s ease 0s;
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
    width: 332px;
    margin-left: 16px;
    .title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 18px;
      cursor: pointer;

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
        display: inline-block;
        line-height: 16px;
        font-size: 12px;
        color: #999;
        i {
          display: inline-block;
          vertical-align: top;
        }
      }
    }
  }
</style>
