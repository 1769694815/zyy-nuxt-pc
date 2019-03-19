<template>
  <div>
    <v-header />
    <div class="bg-header" />
    <div class="pic-1">
      <img src="../assets/images/fuwu_b1.jpg">
    </div>
    <div class="pic">
      <div class="title">我们的自信源于雄厚的师资力量</div>
      <div class="content">
        <div class="info">
          <div class="text">汇集全国知名讲师，国家级老中医授课</div>
          <div class="text">自考新考规，第一时间押题讲解</div>
          <div class="text">课后经典练题，助你及时消化</div>
          <div
            class="button"
            @click="toDoctor">想了解更多？点我进入名医师承</div>
        </div>
        <div class="banner-service">
          <el-carousel
            height="280px"
            class="imgs">
            <el-carousel-item
              v-for="(item, index) in carousels"
              :key="index">
              <img :src="item.pic">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="pic-2">
      <div class="title">
        我们的精品课程诞生记
      </div>
      <img src="../assets/images/fuwu_d1.jpg">
    </div>
    <div class="pic-3">
      <div class="title">
        我们的内容全方位覆盖中医药行业
      </div>
      <div class="subtitle">
        掌握中医健康知识  了解中医文化发展
      </div>
      <img src="../assets/images/fuwu_e1.jpg">
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
export default {
  components: {
    'v-header': Header
  },
  data() {
    return {
      carousels: []
    }
  },
  mounted() {
    this.getBanners()
  },
  methods: {
    getBanners() {
      this.$axios('/yxs/api/web/doctor/guarantee').then(res => {
        this.carousels = res.data
      })
    },
    toDoctor() {
      this.$router.push({
        name: 'doctor'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg-header {
    height: 391px;
    background: url(../assets/images/fuwu_a1.jpg) no-repeat center;
  }
  .pic-1 {
    text-align: center;
    margin-top: -136px;
  }
  .pic {
    height: 500px;
    padding-top: 60px;
    text-align: center;
    background: url(../assets/images/teacher_k.jpg) no-repeat center;
    .title {
      font-size: 36px;
      color: #4e5a63;
      font-weight: 700;
    }
    .content {
      margin-top: 70px;
      .info {
        display: inline-block;
        vertical-align: top;
        .text {
          line-height: 42px;
        }
        .button {
          height: 38px;
          line-height: 38px;
          margin-top: 40px;
          padding: 0 30px;
          border: 1px solid #00dfa6;
          border-radius: 19px;
          color: #00dfa6;
          cursor: pointer;
        }
      }
      .banner-service {
        display: inline-block;
        vertical-align: top;
        width: 600px;
      }
    }
  }
  .pic-2 {
    height: 446px;
    padding-top: 90px;
    background: #fff;
    text-align: center;
    .title {
      font-size: 36px;
      color: #4e5a63;
      font-weight: 700;
    }
    img {
      margin-top: 66px;
    }
  }
  .pic-3 { 
    height: 460px;
    padding-top: 90px;
    padding-bottom: 50px;
    background: #f7f7f7;
    text-align: center;
    .title {
      font-size: 36px;
      color: #4e5a63;
      font-weight: 700;
    }
    .subtitle {
      margin-top: 20px;
      color: #666;
      font-size: 14px;
    }
    img {
      margin-top: 60px;
    }
  }
</style>
<style>
  .banner-service img {
    width: 420px;
  }
</style>
