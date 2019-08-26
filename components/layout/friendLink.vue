<template>
  <div class="container">
    <div class="content">
      <div class="title">友情链接</div>
      <ul class="schools">
        <li
          v-for="(item, index) in linkList"
          :key="index"
          class="school"
          @click="toLink(item.url)">
          <a
            :href="item.url"
            target="_blank"> {{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    linkList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      schools: []
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    toLink(url) {
      window.open(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  // margin-top: 20px;
  padding-top: 42px;
  padding-bottom: 30px;
  background: #f6f6f6;
}
.content {
  width: 1200px;
  margin: 0 auto;
  .title {
    font-size: 24px;
    color: #333;
  }
  .schools {
    margin-top: 20px;
    li {
      display: inline-block;
      margin-right: 20px;
      font-size: 14px;
      line-height: 24px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #3F8A38;
      }
      a {
        color: #666;
        &:hover {
          color: #3F8A38;
        }
      }
    }
  }
}
</style>
