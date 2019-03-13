<template>
  <div>
    <nav-bar />
    <nuxt-child class="container" />
    <!-- <div class="container">
      <div class="container-left">
        <ul>
          <li
            v-for="(item, index) in leftList"
            :key="index"
            :class="tab == (index + 1) ? 'active' : ''"
            @click="switchTab(index)">
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="container-right">
      </div>
    </div> -->
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
      tab: null,
      leftList: [
        { label: '我的课程', name: 'mylearn' },
        { label: '我的班级', name: 'mylearn-myclass' },
        { label: '学习时长', name: 'mylearn-duration' },
        { label: '我的收藏', name: 'mylearn-collect' },
        { label: '我的关注', name: 'mylearn-interest' },
      ]
    }
  },
  mounted() {
    this.tab = window.sessionStorage.getItem('learnTab') || 1
  },
  methods: {
    switchTab(index) {
      this.tab = index + 1
      sessionStorage.setItem('learnTab', index + 1)
      this.$router.push({
        name: this.leftList[index].name
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    display: flex;
    width: 1140px;
    margin: 30px auto;
  }
  // .container-left {
  //   width: 270px;
  //   padding: 20px 0;
  //   height: 185px;
  //   border: 1px solid #e4ecf3;
  //   border-radius: 4px;
  //   li {
  //     height: 37px;
  //     line-height: 37px;
  //     padding-left: 17px;
  //     color: #333;
  //     font-size: 12px;
  //     border-left: 2px solid #fff;
  //     cursor: pointer;
  //     &.active {
  //       color: #46C37B;
  //       border-left: 2px solid #46C37B;
  //     }
  //   }
  // }
  // .container-right {
  //   flex: 1;
  //   margin-left: 20px;
  // }
</style>
