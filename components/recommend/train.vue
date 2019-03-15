<template>
  <section class="train-section">
    <tag :text="['培', '训']" />
    <div class="list">
      <div
        v-for="(item, index) in recommendTrains"
        v-if="index < 3"
        :key="index"
        class="item">
        <div class="train-img">
          <img :src="item.middle_picture">
          <div class="text">中药炮制工</div>
        </div>
        <div class="info">
          <span class="teacher">讲师：{{ item.fanousrName }}</span>
          <span class="lesson">共{{ item.lessonNum }}节</span>
          <span class="number">{{ item.studentNum }}人学过</span>
        </div>
      </div>
    </div>
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
      recommendTrains: []
    }
  },
  mounted() {
    this.getTrainList()
  },
  methods: {
    getTrainList() {
      this.$axios('/yxs/api/web/course/getRecommendTrainList', {
        params: {
          type: 1
        }
      }).then(res => {
        if(res.code == 0) {
          this.recommendTrains = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .train-section {
    // width: 340px;
    height: 722px;
    background: #f6f6f6;
    .tag {
      padding-top: 13px;
      font-size: 0;
      .line {
        display: inline-block;
        vertical-align: top;
        width: 4px;
        height: 20px;
        background: #3f8a38;
      }
      .name {
        display: inline-block;
        vertical-align: top;
        margin-left: 6px;
        font-size: 16px;
        line-height: 18px;
        color: #333;
        font-weight: 700;
      }
    }
    .list {
      padding: 16px;
      .item {
        margin-top: 24px;
        &:first-child {
          margin: 0;
        }
      }
      .train-img {
        position: relative;
        width: 100%;
        height: 173px;
        font-size: 0;
        cursor: pointer;
        img {
          width: 100%;
          height: 173px;
          border-radius: 6px;
        }
        &:hover .text{
          background: #3F8A38;
          color: #fff;
        }
        &:first-child {
          margin-left: 0;
        }
        .text {
          position: absolute;
          bottom: 12px;
          left: 12px;
          height: 28px;
          line-height: 28px;
          padding: 0 16px;
          font-size: 14px;
          color: #fff;
          background: rgba(0, 0, 0, .6);
          border-radius: 14px;
        }
      }
      .info {
        margin: 12px 0 0 10px;
        font-size: 0;
        .teacher {
          display: inline-block;
          font-size: 12px;
          color: #3F8A38;
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
  }
  
</style>
