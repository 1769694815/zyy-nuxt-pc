
<template>
  <div style="width:100%; min-height:100vh">
    <div class="container">
      <v-header />
      <div class="content">
        <img src="~/assets/images/404.png">
        <div class="text">
          <div class="title">暂无数据</div>
          <div class="desc">您还可以去其它地方逛逛……</div>
          <div class="button">
            <a href="www.zyyzx.com.cn">重新加载</a>
            <a href="www.zyyzx.com.cn">返回首页</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
export default {
  components: {
    'v-header': Header
  },
  data() {
    return {

    }
  },
  created() {
    this.reload()
  },
  methods: {
    reload() {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    min-height: 500px;
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1200px;
      margin: 100px auto;
      .text {
        margin-left: 50px;
        .title {
          font-size: 22px;
          color: #000;
          font-weight: 600;
        }
        .desc {
          margin-top: 10px;
          font-size: 14px;
          color: #999;
        }
      }
      .button {
        margin-top: 20px;
        a {
          color: #333;
          display: inline-block;
          width: 80px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #ccc;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          &:hover {
            background: #3F8A38;
            color: #fff;
          }
        }
      }
    }
  }
</style>
