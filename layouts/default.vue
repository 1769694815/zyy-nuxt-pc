<template>
  <div>
    <v-header/>
    <nuxt/>
    <friend-link/>
    <v-footer/>
  </div>
</template>

<script>
import Footer from '~/components/layout/footer.vue'
import Header from '~/components/layout/header.vue'
import FriendLink from '~/components/layout/friendLink.vue'
import { Base64 } from '~/assets/js/base64.js'
export default {
  components: {
    'v-footer': Footer,
    'v-header': Header,
    FriendLink
  },
  // created() {
  //   let params = {
  //     username: '',
  //     password: '',
  //     scope: 'server',
  //     grant_type: 'client_credentials'
  //   }
  //   this.$axios.post('/auth/oauth/token', params).then(res => {
  //     console.log('token', res)
  //     this.$axios.setHeader('Authorization', 'Bearer' + res.access_token)
  //   })
  // }
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
