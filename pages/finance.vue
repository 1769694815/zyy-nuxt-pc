<template>
  <div style="width: 100%">
    <v-header />
    <div class="container">
      <Navbar />
      <div class="content">
        <left-tab :tab-index="tabIndex" />
        <div class="content-right">
          <el-table
            :data="tableData"
            :row-style="tableRowStyle"
            :header-cell-style="tableHeader"
            border>
            <el-table-column
              prop="cashSn"
              label="流水号"
              align="center" />
            <el-table-column
              prop="sn"
              label="订单编号"
              align="center" />
            <el-table-column
              prop="userName"
              label="购买用户名"
              align="center" />
            <el-table-column
              prop="phone"
              label="绑定手机号"
              align="center" />
            <el-table-column
              :formatter="payFormatter"
              prop="payWay"
              label="支付方式"
              align="center" />
            <el-table-column
              :formatter="typeFormatter"
              prop="itemType"
              label="订单类型"
              align="center" />
            <el-table-column
              prop="itemName"
              label="订单名称"
              align="center"
              show-overflow-tooltip />
            <el-table-column
              :formatter="dateFormatter"
              prop="payTime"
              label="成交时间"
              align="center"
              width="100" />
            <el-table-column
              prop="amount"
              label="实付金额"
              align="center" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "~/components/navBar.vue"
import Header from '~/components/layout/header.vue'
import LeftTab from '~/components/mine/financeTab.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    Navbar,
    LeftTab,
    'v-header': Header
  },
  data() {
    return {
      tabIndex: 1,
      tableData: [],
      userInfo: ''
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    if(!this.userInfo) {
      this.$router.push({
        name: 'login'
      })
    }
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
      this.$axios('/yxs/api/web/user/orderList', {
        params: {
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        this.tableData = res.data.records
      })
    },
    tableRowStyle({ row, rowIndex, column, columnIndex }){
      if(columnIndex == 0) {
        return 'color: #3f8a38'
      }
    },
    tableHeader({ row, rowIndex }) {
      return 'color: #333;font-weight: 700;'
    },
    // 支付方式格式化
    payFormatter(row, column) {
      let result = ''
      switch(row.payWay) {
        case 'none':
          result = '后台添加'
          break;
        case 'ali-pay':
          result = '支付宝'
          break;
        case 'we-pay':
          result = '微信'
          break;
        case 'coin-pay':
          result = '余额'
          break;
        default: '后台添加'
      }
      return result
    },
    // 
    typeFormatter(row, column) {
      return row.itemType == 1 ? '课程订单' : '班级订单'
    },
    // 日期格式化
    dateFormatter(row, column) {
      let date = new Date(row.payTime)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      let hh = this.formatStr(date.getHours())
      let mm = this.formatStr(date.getMinutes())
      let ss = this.formatStr(date.getSeconds())
      return ` ${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
    formatStr(time) {
      return time > 9 ? time : '0'+time
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
    display: flex;
    width: 1200px;
    margin: 30px auto;
    &-right {
      flex: 1;
    }
  }
</style>
<style scoped>
  .el-table th>.cell {
    font-weight: 700;
  }
  .el-table_2_column_12 {
    color: #3f8a38;
  }
</style>
