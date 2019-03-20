<template>
  <div>
    <v-header />
    <nav-bar />
    <nuxt-child class="container" />
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import NavBar from '~/components/navBar.vue'
export default {
  components: {
    NavBar,
    'v-header': Header
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    display: flex;
    width: 1140px;
    margin: 30px auto;
  }
  .container-left {
    width: 270px;
    padding: 20px 0;
    height: 110px;
    border: 1px solid #e4ecf3;
    border-radius: 4px;
    li {
      height: 37px;
      line-height: 37px;
      padding-left: 17px;
      color: #333;
      font-size: 12px;
      border-left: 2px solid #fff;
      cursor: pointer;
      &.active {
        color: #46C37B;
        border-left: 2px solid #46C37B;
      }
    }
  }
  .container-right {
    flex: 1;
    margin-left: 20px;
  }
</style>
