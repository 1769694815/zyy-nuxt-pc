<template>
  <div
    v-show="showModal"
    class="mask-container">
    <div class="m-container">
      <div class="m-header">
        <div class="m-title">提示</div>
        <div
          class="m-close"
          @click="handleClose">
          <i class="iconfont iconguanbi"/>
        </div>
      </div>
      <div class="m-content">
        <p>收不到短息的原因可能有：</p>
        <p>1、操作太过频繁，可稍后再试</p>
        <p>2、当日短信接收已达10条上限，明天再来吧~</p>
        <p>3、手机号输入有误</p>
        <p>4、都不是，联系
          <a
            href="http://p.qiao.baidu.com/cps/chat?siteId=12747992&userId=26713079&cp=http%3A%2F%2Fwww.jzjxedu.com%2F&cr=&cw="
            target="_blank">在线客服</a></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    handleClose() {
      this.showModal = false
      this.$emit('hide-modal')
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
      width: 500px;
      height: 300px;
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
        padding: 20px;
        p {
          line-height: 30px;
        }
      }
    }
 }
</style>
