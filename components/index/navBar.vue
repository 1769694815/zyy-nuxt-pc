<template>
  <div class="nav">
    <div
      class="class-center"
      @click="toTrain">
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
          name: '名医师承',
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
          label: 6
        },
      ]
    }
  },
  methods: {
    changeTab(item, index) {
      this.tab = index
      let url = this.$router.resolve({
        name: item.path
      })
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
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
      border: 1px solid #ddd;
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
