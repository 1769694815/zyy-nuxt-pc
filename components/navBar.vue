<template>
  <div class="nav-bar">
    <div class="nav">
      <div class="class-center">
        <i class="iconfont iconmenu" />
        课程中心
      </div>
      <ul>
        <li>
          <nuxt-link
            :to="{ name: 'index' }"
            :class="{ active: tabIndex == 1 }">
            首页
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{ name: 'western', query: { fid: 2 }}"
            :class="{ active: tabIndex == 2 }">
            西学中
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{ name: 'western' }"
            :class="{ active: tabIndex == 3 }">
            培训项目
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{ name: 'train', query: { fid: 107 }}"
            :class="{ active: tabIndex == 4 }">
            学历助考
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{ name: 'doctor' }"
            :class="{ active: tabIndex == 5 }">
            名医师承
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{ name: 'community' }"
            :class="{ active: tabIndex == 6 }">
            中医药进社区
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{ name: 'download' }"
            :class="{ active: tabIndex == 7 }">
            下载App
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{ name: 'about' }"
            :class="{ active: tabIndex == 8 }">
            关于我们
          </nuxt-link>
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

    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
  .nav-bar {
    background: #fff;
    box-sizing: border-box;
  }
  .nav {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    height: 50px;
    font-size: 16px;
    .class-center {
      flex: 0 0 204px;
      width: 204px;
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
      padding: 0 26px;
      cursor: pointer;
      box-sizing: border-box;
      a {
        color: #333;
        &.active {
          color: #3F8A38;
          font-weight: 700;
        }
      }
    }
  }
</style>
