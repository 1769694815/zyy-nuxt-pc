<template>
  <div class="nav-bar">
    <div class="nav">
      <div class="class-center">
        <i class="iconfont iconmenu" />
        课程中心
      </div>
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="{active: index + 1 == tabIndex}"
          @click="changeTab(item, index)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabIndex: {
      type: Number,
      default: function () {
        return null
      }
    }
  },
  data() {
    return {
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
          label: 2,
          path: 'western'
        },
        {
          name: '名医师承',
          label: 3,
          path: 'doctor'
        },
        {
          name: '中医药进社区',
          label: 4,
          path: 'community'
        },
        {
          name: '下载App',
          label: 5,
          path: 'download'
        },
        {
          name: '关于我们',
          label: 6,
          path: 'about'
        },
      ]
    }
  },
  methods: {
    changeTab(item, index) {
      this.$router.push({
        name: item.path
      })
      if(index == 2) {
        this.$router.push({
          name: item.path,
          query: {
            cid: 2
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav-bar {
    background: #fff;
    box-sizing: border-box;
    // border-top: 1px solid #ddd;
    // border-bottom: 1px solid #ddd;
  }
  .nav {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    height: 50px;
    font-size: 16px;
    .class-center {
      flex: 0 0 180px;
      width: 180px;
      height: 50px;
      padding-left: 20px;
      line-height: 50px;
      background: #3F8A38;
      color: #fff;
      // border-right: 1px solid #fff;
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
        // background: #3F8A38;
        color: #3F8A38;
        font-weight: 700;
      }
    }
  }
</style>
