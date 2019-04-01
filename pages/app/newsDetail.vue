<template>
  <div>1</div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    let params = {
      username: '',
      password: '',
      scope: 'server',
      grant_type: 'client_credentials'
    }
    this.$axios.setHeader('Authorization', 'Bearer' + res.access_token)
      this.$axios.post('/auth/oauth/token', params).then(res => {
      this.getDetail()
    })
  },
  methods: {
    getDetail() {
      this.$axios('/yxs/api/news/detail', {params: {id: 17}}).then(res => {
        console.log('detail', res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
