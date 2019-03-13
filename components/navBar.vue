<template>
  <div class="nav-bar">
    <div class="nav">
      <div class="class-center">
        <i class="iconfont icon-caidan" />
        课程中心
      </div>
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="{active: index == tab}"
          @click="changeTab(item, index)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 0,
      list: [
        {
          name: '首页',
          label: 0,
          path: 'index'
        },
        {
          name: '自学考试',
          label: 1,
          path: 'train'
        },
        {
          name: '西学中',
          label: 2
        },
        {
          name: '名师医承',
          label: 3
        },
        {
          name: '中医药进社区',
          label: 4
        },
        {
          name: '下载App',
          label: 5
        },
        {
          name: '关于我们',
          label: 6,
          path: 'about'
        },
      ]
    }
  },
  mounted() {
    this.tab = localStorage.getItem('zyy_tab') || 0
  },
  methods: {
    changeTab(item, index) {
      window.localStorage.setItem('zyy_tab', index)
      this.tab = index
      this.$router.push({
        name: item.path
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav-bar {
    box-sizing: border-box;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .nav {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    height: 50px;
    font-size: 16px;
    .class-center {
      width: 204px;
      height: 50px;
      padding-left: 20px;
      line-height: 50px;
      background: #3F8A38;
      color: #fff;
      .icon-caidan {
        font-size: 20px;
      }
    }
    ul {
      flex: 1;
      height: 50px;
      line-height: 50px;
      text-align: left;
      box-sizing: border-box;
    }
    li {
      display: inline-block;
      padding: 0 36px;
      cursor: pointer;
      box-sizing: border-box;
      &.active {
        background: #3F8A38;
        color: #fff;
      }
    }
  }
</style>
