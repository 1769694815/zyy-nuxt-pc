<!--
 * @Author: xwen
 * @Date: 2019-09-21 14:09:38
 * @LastEditTime: 2019-09-21 16:36:13
 * @LastEditors: xwen
 * @Description: 协议弹窗
 -->

<template>
  <div
    v-if="showModal"
    class="deal-modal">
    <div class="deal-modal-box">
      <img
        class="close"
        src="~/assets/images/deal_close.png"
        @click="close">
      <h2>{{ title }}</h2>
      <article
        class="htmlContent ql-editor box"
        v-html="body" />
      <div
        class="btn"
        @click="agree">我已阅读并同意协议</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data () {
    return {
      title: '',
      body: ''
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$axios('/yxs/api/news/detail?id=&type=1').then(res => {
        if (res.code == 0) {
          this.title = res.data.title
          this.body = res.data.body
        }
      })
    },
    close() {
      this.$emit('hide-modal', false)
    },
    agree() {
      this.$emit('agree', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .deal-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, .6);
    .deal-modal-box {
      width: 850px;
      height: 580px;
      background-color: #fff;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 40px 44px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      >h2 {
        text-align: center;
        font-size: 22px;
        color: #3f8a38;
        margin-bottom: 30px;
      }
      .box {
        width: 100%;
        height: 360px;
        box-sizing: border-box;
        padding-right: 20px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        &::-webkit-scrollbar-track {
          border-radius: 3px;
          background-color: #e6e6e6;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 3px; 
          background-color: #3f8a38;
        }
      }
      .btn {
        width: 200px;
        height: 40px;
        line-height: 40px;
        margin: 45px auto 0;
        background: #3f8a38;
        border-radius: 6px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
      }
      .close {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        right: -80px;
        cursor: pointer;
      }
    }
  }
</style>
