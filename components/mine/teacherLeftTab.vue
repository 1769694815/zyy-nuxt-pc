<template>
  <ul>
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="tabIndex == (index + 1) ? 'active' : ''"
      @click="change(item)">
      {{ item.label }}
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    tabIndex: {
      type: Number,
      default: function() {
        return null
      }
    }
  },
  data() {
    return {
      list: [
        { label: '在教课程', name: 'teacher' },
        { label: '在教班级', name: 'teacher-classes' },
        { label: '试卷管理', name: 'teacher-exam' },
        { label: '我的收藏', name: 'teacher-collect' }
      ]
    }
  },
  methods: {
    change(item) {
      this.$router.push({
        name: item.name
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  ul {
    width: 270px;
    padding: 20px 0;
    margin-right: 20px;
    height: 185px;
    border: 1px solid #e4ecf3;
    border-radius: 4px;
    li {
      height: 37px;
      line-height: 37px;
      padding-left: 17px;
      color: #333;
      font-size: 12px;
      border-left: 2px solid #fff;
      cursor: pointer;
      &.active {
        color: #46C37B;
        border-left: 2px solid #46C37B;
      }
    }
  }
</style>

