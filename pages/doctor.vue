<template>
  <div style="width:100%">
    <v-header />
    <nav-bar :tab-index="tabIndex" />
    <nuxt-child />
    <!-- <div class="container">
      <h1>名医师承</h1>
      <div class="subtitle">数百位江中名医精品课程，零距离在线学习</div>
      <ul class="list">
        <li
          v-for="(item, index) in list"
          :key="index">
          <img :src="item.pic">
          <div class="title">{{ item.name + ' ' + item.title }}</div>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import NavBar from '~/components/navBar.vue'
export default {
  components: {
    NavBar,
    'v-header': Header
  },
  data() {
    return {
      tabIndex: 4
    }
  }
}
</script>
