<template>
  <div/>
</template>
<script>
	export default {
		data() {
			return {
        userToken: this.$route.query.token || '',
			}
    },
    created() {
      console.log('url',window.location.href);
      console.log('userToken',this.userToken)
    },
		mounted() {
        console.log('userToken',this.userToken)
        if(this.userToken != '') {
          window.localStorage.setItem('zyy_userToken', this.userToken)
          this.getInfo()
        }else{
          this.toIndex()  
        }
    },
    methods: {
      toIndex() {
        //  this.$router.push({ path:'/'  })
      },  
      getInfo() {
        this.$axios('/admin/api/web/user/findUserTokenGetName', {
          params: {
            userToken: this.userToken
          }
        }).then(res => {
          Cookies.set('zyy_userInfo', res.data, { expires: 1 })
          this.toIndex()  
        })
      },
    }
	}
</script>