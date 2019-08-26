<template>
  <el-pagination
    :page-size="size"
    :current-page="current"
    :total="total"
    layout="prev, pager, next"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: function() {
        return null
      }
    },
    current: {
      type: Number,
      default: function() {
        return null
      }
    },
    total: {
      type: Number,
      default: function() {
        return null
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('sizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('currentChange', val)
    }
  }
}
</script>
<style scoped>
  .el-pagination {
    width: 100%;
    margin: 20px auto;
    text-align: center;
  }
</style>
