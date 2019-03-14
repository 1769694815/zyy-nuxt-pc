<template>
  <div>
    <nav-bar />
    <nuxt-child class="container" />
  </div>
</template>
<script>
import NavBar from '~/components/navBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>
<style lang="scss" scoped>
  .container {
    display: flex;
    width: 1140px;
    margin: 30px auto;
  }
</style>
