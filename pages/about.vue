<template>
  <div style="width:100%">
    <nav-bar :tab-index="tabIndex" />
    <div class="container">
      <div class="crumb">
        首页>关于我们
      </div>
      <img src="../assets/images/aboutus.jpg">
      <div class="list">
        <el-carousel
          height="188px" 
          class="imgs"
          type="card">
          <el-carousel-item
            v-for="(item, index) in carousels"
            :key="index">
            <img :src="item.pic">
          </el-carousel-item>
        </el-carousel>
      </div>
      <img src="../assets/images/aboutus2.jpg">
    </div>
  </div>
</template>
<script>
import NavBar from '~/components/navBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      tabIndex: 7,
      carousels: [
        {
          pic: require('~/assets/images/about1.jpg')
        },
        {
          pic: require('~/assets/images/about2.jpg')
        },
        {
          pic: require('~/assets/images/about3.jpg')
        },
        {
          pic: require('~/assets/images/about4.jpg')
        },
        {
          pic: require('~/assets/images/about5.jpg')
        },
        {
          pic: require('~/assets/images/about6.jpg')
        },
        {
          pic: require('~/assets/images/about7.jpg')
        },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
    .crumb {
      margin-top: 28px;
      margin-bottom: 18px;
      font-size: 12px;
      color: #666;
    }
    .list {
      width: 1200px;
    }
  }
</style>
<style>
  .list .el-carousel__item.el-carousel__item--card {
    width: 280px;
    margin-left: 160px;
  }
  .list .el-carousel {
    width: 1200px;
    margin: 0 auto;
    padding: 10px 0;
    background: #f7f7f7;
  }
</style>

