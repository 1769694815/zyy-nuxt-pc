
<template>
  <div style="width:100%">
    <div class="container">
      <v-header />
      <div class="content">
        <img src="~/assets/images/404.png">
        <div class="text">
          <div class="title">暂无数据</div>
          <div class="desc">您还可以去其它地方逛逛……</div>
          <div class="button">
            <span @click="reload">重新加载</span>
            <span @click="$router.push({ name: 'index' })">返回首页</span>
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
  methods: {
    reload() {
      window.location.reload()
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
        span {
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
