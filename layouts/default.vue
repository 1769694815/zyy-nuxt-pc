<template>
  <div>
    <nuxt/>
    <!-- <friend-link/> -->
    <v-aside />
    <v-footer/>
  </div>
</template>

<script>
import Footer from '~/components/layout/footer.vue'
// import FriendLink from '~/components/layout/friendLink.vue'
import Aside from '~/components/layout/aside.vue'
import { Base64 } from '~/assets/js/base64.js'
export default {
  components: {
    'v-footer': Footer,
    'v-aside': Aside,
    // FriendLink
  }
}
</script>

<style>
html {
  font-family: 'MicrosoftYaHei', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  /* word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased; */
  box-sizing: border-box;
}

</style>
