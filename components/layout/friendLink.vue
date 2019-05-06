<template>
  <div class="container">
    <div class="content">
      <div class="title">友情链接</div>
      <ul class="schools">
        <li
          v-for="(item, index) in schools"
          :key="index"
          class="school"
          @click="toLink(item.url)">
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
      schools: [
        {
          name: '江西中医药大学',
          url: 'http://www.jxutcm.edu.cn'
        },
        {
          name: '江西中医药大学继续教育学院培训学院',
          url: 'http://jxjy.jxutcm.edu.cn'
        },
        {
          name: '国家卫生健康委员会',
          url: 'http://www.nhfpc.gov.cn'
        },
        {
          name: '国家中医药管理局',
          url: 'http://www.satcm.gov.cn'
        },
        {
          name: '江西省卫生和计划生育委员会',
          url: 'http://hc.jiangxi.gov.cn'
        },
        {
          name: '江西卫生计生人才人事网',
          url: 'http://www.gwrcw.com'
        },
        {
          name: '学习平台建设',
          url: 'http://www.yunduancn.com'
        },
        {
          name: '雅思考试报名',
          url: 'http://www.yxielts.com'
        }
      ]
    }
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
    }
  }
}
</style>
