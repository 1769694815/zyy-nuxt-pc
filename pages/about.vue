<template>
  <div style="width:100%">
    <nav-bar />
    <div class="container">
      <div class="crumb">
        首页>关于我们
      </div>
    </div>
    <div class="container">
      <img src="../assets/images/aboutus.jpg">
      <img src="../assets/images/aboutus2.jpg">
    </div>
  </div>
</template>
<script>
import NavBar from '~/components/navBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
    .crumb {
      margin-top: 28px;
      margin-bottom: 18px;
      font-size: 12px;
      color: #666;
    }
  }
</style>
