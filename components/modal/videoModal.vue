<!--
 * @Author: xwen
 * @Date: 2019-12-22 15:02:12
 * @LastEditTime : 2019-12-22 16:02:01
 * @LastEditors  : xwen
 * @Description: 
 -->
<template>
  <div class="mask-container">
    <div class="m-container">
      <div class="m-header">
        <p class="title">{{ data.courseTitle }}</p>
        <div
          class="more"
          @click="more()">更多试听</div>
        <div
          class="pay"
          @click="pay(data.courseId, data.price)">立即购课</div>
        <div
          class="m-close"
          @click="handleCose">
          <i class="el-icon-close" />
        </div>
      </div>
      <div class="m-content">
        <div class="subtitle">{{ data.courseBrife }}</div>
        <div id="J_prismPlayer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    userInfo: {
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
    handleCose () {
      this.showModal = false
      this.$emit('hide-modal')
    },
    more () {
      this.$router.push({
        name: 'train'
      })
    },
    pay (id, price) {
      if(!this.userInfo) {
        this.$router.push({
          name: 'login'
        })
      } else {
        this.$router.push({
          name: 'payfor',
          query: {
            itemId: id,
            price: price,
            itemType: 1
          }
        })
      }
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
    .m-container  {
      position: absolute;
      top: 220px;
      width: 1200px;
      height: 643px;
      box-sizing: border-box;
      padding: 29px 25px;
      background: #fff; 
      .m-header {
        display: flex;
        justify-content: space-between;
        position: relative;
        .m-close {
          position: absolute;
          top: -29px;
          right: -85px;
          width: 30px;
          height: 30px;
          line-height: 26px;
          text-align: center;
          box-sizing: border-box;
          border-radius: 25px;
          border: 1px solid #fff;
          font-size: 20px;
          color: #fff;
          cursor: pointer;
        }
        .title {
          flex: 1;
          line-height: 40px;
          font-size: 30px;
          color: #666;
        }
        >div {
          width: 140px;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          text-align: center;
          font-size: 20px;
          color: #fff;
          margin-left: 20px;
          cursor: pointer;
          &.more {
            background: #01c6ae;
          }
          &.pay {
            background: #ff8a4b;
          }
        }
      }
      .m-content {
        margin-top: 25px;
        .subtitle {
          width: 100%;
          height: 65px;
          line-height: 65px;
          border: 1px solid #bbb;
          text-align: center;
          border-bottom: 0;
          box-sizing: border-box;
          font-size: 18px;
          color: #666;
          padding: 0 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>