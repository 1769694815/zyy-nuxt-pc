<template>
  <div
    v-show="showModal"
    class="mask-container">
    <div class="m-container">
      <div class="m-header">
        <div class="m-title">购买确认</div>
        <div
          class="m-close"
          @click="handleClose">
          <i class="iconfont icon-guanbixiaoxitishi"/>
        </div>
      </div>
      <div class="m-content">
        <div class="info">
          <div class="info-left">
            <img :src="dataObj.middlePicture">
          </div>
          <div class="info-right">
            <div class="title">{{ dataObj.title }}</div>
            <div class="price">￥{{ dataObj.price }}</div>
            <div class="lesson">
              班级课程：
              <span>1</span>
            </div>
          </div>
        </div>
        <div class="tip">*温馨提示：请确认班级，报名成功后可学习该班全部课程。</div>
        <div
          class="button"
          @click="confirm">确认报名</div>
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
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    handleClose() {
      this.showModal = false
      this.$emit('hide-modal')
    },
    confirm() {
      this.$router.push({
        name: 'payfor'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .mask-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, .6);
    .m-container {
      position: absolute;
      top: 220px;
      width: 590px;
      height: 331px;
      background: #fff;
      .m-header {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #3F8A38;
        .m-close {
          cursor: pointer;
        }
      }
      .m-content {
        padding: 0 20px;
        .info {
          display: flex;
          align-items: center;
          padding: 30px 0;
          border-bottom: 1px solid #dedede;
          &-left {
            flex: 0 0 200px;
            width: 200px;
          }
          img {
            width: 100%;
            height: 112px;
          }
          &-right {
            flex: 1;
            margin-left: 20px;
            .price {
              margin-top: 20px;
              color: #ff4400;
              font-weight: 700;
            }
            .lesson {
              margin-top: 24px;
            }
          }
        }
        .tip {
          font-size: 14px;
          color: #666;
          margin-top: 20px;
        }
        .button {
          width: 120px;
          height: 34px;
          margin: 30px auto;
          line-height: 34px;
          background: #3F8A38;
          color: #fff;
          font-size: 16px;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
        }
      }
      
    }
  }
</style>

