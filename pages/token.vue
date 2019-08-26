
<template>
  <div style="min-height: 100vh" />
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {

    }
  },
  mounted() {
    Cookies.remove('zyy_accessToken')
    setTimeout(() => {
      this.back()
    }, 100)
  },
  methods: {
    back() {
      let url = this.$router.resolve({
        name: 'index'
      })
      window.open(url.href, '_self')
    }
  }
}
</script>
