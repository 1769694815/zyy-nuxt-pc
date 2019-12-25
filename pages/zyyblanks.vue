<template>
  <div/>
</template>
<script>
  import Cookies from 'js-cookie'
	export default {
		data() {
			return {
        userToken: this.$route.query.token || '',
			}
    },
    created() {
      console.log('11111user',this.userToken)
    },
		mounted() {
        console.log('userToken',this.userToken)
        if(this.userToken != '') {
          this.getInfo()
        }else{
          this.toIndex()  
        }
    },
    methods: {
      toIndex() {
         this.$router.push({ path:'/'  })
      },  
      getInfo() {
        this.$axios('/admin/api/web/user/findUserTokenGetName', {
          params: {
            userToken: this.userToken
          }
        }).then(res => {
          if (res.code == 0) {
            Cookies.set('zyy_userInfo', res.data, { expires: 1 })
          }
          this.toIndex()  
        })
      },
    }
	}
</script>