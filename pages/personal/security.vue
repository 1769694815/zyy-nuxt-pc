<template>
  <div class="content">
    <div class="header">
      <div class="title">安全设置</div>
    </div>
    <div class="info">
      <div class="info-item">
        <div class="title">手机账号</div>
        <div class="tel">152****6064</div>
        <div
          class="operate"
          @click="update">修改
        </div>
      </div>
      <div class="info-item">
        <div class="title">登录密码</div>
        <div class="tel"><i class="iconfont icon-lock" /></div>
        <div class="operate">重置密码</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    update() {
      this.$router.push({
        name: 'personal-updateMobile'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
    border: 1px solid #e4ecf3;
    border-radius: 4px;
    min-height: 360px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    color: #46C37B;
    font-size: 16px;
    border-bottom: 1px solid #F5F5F5;
    .title {
      border-bottom: 2px solid #46C37B;
    }
  }
  .info {
    margin-left: 30px;
    &-item {
      display: flex;
      margin-top: 40px;
      color: #666;
      font-size: 14px;
      .tel {
        width: 100px;
        margin-left: 100px;
        text-align: center;
      }
      .operate {
        margin-left: 100px;
        color: #3F8A38;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
</style>
