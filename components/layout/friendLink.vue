<template>
  <div class="container">
    <div class="content">
      <div class="title">友情链接</div>
      <ul class="schools">
        <li
          v-for="(item, index) in schools"
          :key="index"
          class="school">
          {{ item }}
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
        '江西中医药大学',
        '江西中医药大学继续教育学院培训学院',
        '国家卫生健康委员会',
        '国家中医药管理局',
        '江西省卫生和计划生育委员会',
        '江西卫生计生人才人事网',
        '南昌网站建设',
        '雅思考试报名'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background: #f6f6f6;
  padding-top: 42px;
  padding-bottom: 30px;
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
    }
  }
}
</style>
