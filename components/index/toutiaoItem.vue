<template>
  <div class="container">
    <div class="left-img">
      <nuxt-link
        :to="{ name: 'toutiao-id', params: { id: dataObj.id }}"
        target="_blank">
        <img
          :src="dataObj.thumb"
          :alt="dataObj.title"
          :title="dataObj.title">
        <div class="tag">{{ dataObj.typeName }}</div>
      </nuxt-link>
    </div>
    <div class="content">
      <nuxt-link
        :to="{ name: 'toutiao-id', params: { id: dataObj.id }}"
        target="_blank"
        class="title">{{ dataObj.title }}</nuxt-link>
      <p
        id="text-ellipsis-2"
        class="desc"
        style="display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-overflow: ellipsis;">{{ dataObj.brife }}</p>
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
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 18px;
      cursor: pointer;
      color: #333;
      &:hover {
        color: #3f8a38;
      }
    }
    .desc {
      width: 330px;
      height: 40px;
      margin-top: 15px;
      font-size: 14px;
      line-height: 20px;
      color: #999;
      overflow: hidden;
    }
    .foot {
      margin-top: 24px;
      font-size: 0;
      .date {
        font-size: 13px;
        color: #999;
      }
      .number {
        // float: right;
        margin-left: 40px;
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
<style>
  #text-ellipsis-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
