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
    this.$axios.post('/auth/oauth/token', params).then(res => {
      this.$axios.setHeader('Authorization', 'Bearer' + res.access_token)
      this.getDetail()
    })
  },
  methods: {
    getDetail() {
      console.log('1')
      this.$axios('/yxs/api/news/detail', {params: {id: 17}}).then(res => {
        console.log('detail', res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
