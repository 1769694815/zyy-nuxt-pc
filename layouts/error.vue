<template>
  <div class="container" />
</template>
<script>
export default {
  created() {
    this.$router.replace({ path: '/' })
  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
}
</style>
