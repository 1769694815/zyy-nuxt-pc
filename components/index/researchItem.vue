<template>
  <div class="item">
    <div class="img-box">
      <img
        :src="dataObj.middle_picture"
        @click="toDetail(dataObj.courseId)">
    </div>
    <div class="content">
      <div class="title">{{ dataObj.title }}</div>
      <div class="info">
        <span class="name">{{ dataObj.famousName }}</span>
        <span class="rank">{{ dataObj.famousTitle }}</span>
        <span class="number">{{ dataObj.student_num }}人学过</span>
      </div>
      <p
        style="display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;">{{ dataObj.description }}</p>
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
  data() {
    return {

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
    width: 285px;
    height: 330px;
  }
  .img-box {
    width: 285px;
    height: 160px;
    overflow: hidden;
    border-radius: 6px;
    &:hover img {
      transform: scale(1.1, 1.1);
    }
  }
  img {
    display: block;
    width: 100%;
    height: 160px;
    background: rgba(98,98,98,1);
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
  .content {
    padding: 0 10px;
    .title {
      margin-top: 15px;
      font-size: 14px;
      color: #333;
    }
    .info {
      margin-top: 14px;
      font-size: 0;
      .name {
        color: #3F8A38;
        font-size: 12px;
      }
      .rank {
        margin-left: 10px;
        font-size: 12px;
        color: #999;
      }
      .number {
        font-size: 12px;
        color: #999;
        float: right;
      }
    }
    p {
      margin-top: 18px;
      font-size: 12px;
      line-height: 18px;
      color: #999;
    }
  }
  
</style>
