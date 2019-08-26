<template>
  <div style="width: 100%">
    <v-header />
    <div class="container">
      <Navbar />
      <div
        id="finance"
        class="content">
        <left-tab :tab-index="tabIndex" />
        <div class="content-right">
          <el-form
            :inline="true"
            :model="form">
            <el-select
              v-model="snSelect">
              <el-option
                label="流水号"
                value="1" />
              <el-option
                label="订单编号"
                value="2" />
            </el-select>
            <el-form-item v-show="snSelect == 1">
              <el-input
                v-model="form.cashSn"
                clearable
                placeholder="请输入流水号" />
            </el-form-item>
            <el-form-item v-show="snSelect == 2">
              <el-input
                v-model="form.sn"
                clearable
                placeholder="请输入订单编号" />
            </el-form-item>
            <el-select
              v-model="userSelect">
              <el-option
                label="购买用户名"
                value="1" />
              <el-option
                label="绑定手机号"
                value="2" />
            </el-select>
            <el-form-item v-show="userSelect == 1">
              <el-input
                v-model="form.userName"
                clearable
                placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item v-show="userSelect == 2">
              <el-input
                v-model="form.phone"
                clearable
                placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select
                v-model="form.payWay">
                <el-option
                  label="全部方式"
                  value="" />
                <el-option
                  label="支付宝"
                  value="ali-pay" />
                <el-option
                  label="微信"
                  value="we-pay" />
                <el-option
                  label="余额支付"
                  value="coin-pay" />
                <el-option
                  label="后台添加"
                  value="none" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="downExcel">导出当前表格</el-button>
            </el-form-item>
            <el-select
              v-model="form.itemType">
              <el-option
                label="全部订单"
                value="" />
              <el-option
                label="课程订单"
                value="1" />
              <el-option
                label="班级订单"
                value="2" />
            </el-select>
            <el-form-item>
              <el-input
                v-model="form.itemName"
                clearable
                placeholder="请输入订单名称" />
            </el-form-item>
            <el-form-item
              label="成交时间"
              style="margin-left:30px;">
              <el-date-picker
                :picker-options="pickerOptions"
                v-model="dateRange"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="onSearch">搜索</el-button>
            </el-form-item>
          </el-form>
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
          <Pagination
            :size="form.size"
            :current="form.current"
            :total="total"
            @sizeChange="sizeChange"
            @currentChange="currentChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "~/components/navBar.vue"
import Header from '~/components/layout/header.vue'
import LeftTab from '~/components/mine/financeTab.vue'
import Pagination from '~/components/pagination.vue'
import Cookies from 'js-cookie'
import { formatStamp2 } from '~/assets/js/util.js'
export default {
  components: {
    Navbar,
    LeftTab,
    Pagination,
    'v-header': Header
  },
  data() {
    return {
      tabIndex: 1,
      tableData: [],
      total: 0,
      userInfo: '',
      snSelect: '1', // 流水号1，订单编号2
      userSelect: '1', // 用户名1，手机号2
      dateRange: [],
      form: {
        size: 20,
        current: 1,
        cashSn: '',
        sn: '',
        userName: '',
        phone: '',
        payWay: '',
        itemType: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近半年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.form.userToken = this.userInfo.userToken
    if(!this.userInfo) {
      this.$router.push({
        name: 'login'
      })
      return
    }
    if(this.userInfo.roleName != 'zyy_headmaster') {
      this.$router.push({
        name: 'index'
      })
      return
    }
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
      let params = {}
      if(this.dateRange && this.dateRange.length > 0) {
         params = {
          starttime: formatStamp2(this.dateRange[0]),
          endtime: formatStamp2(this.dateRange[1])
        }
      }
      Object.assign(params, this.form)
      this.$axios('/yxs/api/web/user/orderList', {
        params
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
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
    },
    sizeChange(val) {
      this.form.size = val
    },
    currentChange(val) {
      window.scrollTo(0, 0)
      this.form.current = val
      this.getTableData()
    },
    // 下载表格
    downExcel() {
      let params = {}
      if(this.dateRange && this.dateRange.length > 0) {
         params = {
          starttime: formatStamp2(this.dateRange[0]),
          endtime: formatStamp2(this.dateRange[1])
        }
      }
      Object.assign(params, this.form)
      this.$axios('/yxs/api/web/user/orderOut', {
        params
      }).then(res => {
        // console.log('res', res)
        window.open(res)
      })
    },
    onSearch() {
      this.form.current = 1
      this.getTableData()
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
<style>
  #finance .el-table {
    min-height: 500px;
  }
  #finance .el-input.el-input--suffix input {
    width: 130px !important;
  }
  #finance .el-input input {
    width: 160px;
  }
</style>

