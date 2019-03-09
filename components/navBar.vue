<template>
  <div class="nav-bar">
    <div class="nav">
      <div class="class-center">
        <i class="iconfont icon-caidan" />
        课程中心
      </div>
      <ul>
        <li @click="$router.push({name: 'index'})">首页</li>
        <li>自学考试</li>
        <li>西学中</li>
        <li>名师医承</li>
        <li>中医药进社区</li>
        <li>下载App</li>
        <li>关于我们</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
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
      margin-left: 60px;
      cursor: pointer;
    }
  }
</style>
