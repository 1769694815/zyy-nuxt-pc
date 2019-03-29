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
          <i class="iconfont iconguanbi"/>
        </div>
      </div>
      <div class="m-content">
        <div class="info">
          <div class="info-left">
            <img :src="detail.pclogo">
          </div>
          <div class="info-right">
            <div class="title">{{ dataObj.title }}</div>
            <div class="price">￥{{ dataObj.price }}</div>
            <div class="lessons">
              班级课程：
              <ul v-if="dataObj.courseName">
                <li
                  v-for="(item,index) in dataObj.courseName.split(',')"
                  :key="index"
                  class="lesson">
                  {{ item }}
                </li>
              </ul>
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
    },
    detail: {
      type: Object,
      default: function() {
        return {}
      }
    },
    user: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      showModal: false,
      itemId: null,
      price: 0,
      userInfo: ''
    }
  },
  watch: {
    dataObj(newVal, oldVal) {
      this.itemId = newVal.roomId
      this.price = newVal.price
    },
    user(newVal, oldVal) {
      this.userInfo = newVal
    }
  },
  methods: {
    handleClose() {
      this.showModal = false
      this.$emit('hide-modal')
    },
    confirm() {
      this.$router.push({
        name: 'payfor',
        query: {
          itemId: this.itemId,
          price: this.price
        }
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
          i {
            font-size: 12px;
          }
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
            .lessons {
              margin-top: 24px;
              ul {
                margin-top: 10px;
              }
              li {
                float: left;
                margin-right: 8px;
                padding: 0 8px;
                text-align: center;
                line-height:28px;
                background:#E2F5E0;
                font-size: 14px;
                color:#3F8A38;
                border-radius: 4px;
              }
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

