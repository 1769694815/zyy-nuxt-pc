<template>
  <div>
    <left-tab :tab-index="tabIndex" />
    <div
      id="manage"
      class="right-content">
      <el-form
        :inline="true"
        :model="form">
        <el-form-item>
          <el-input
            v-model="input3"
            placeholder="输入用户名/真实姓名/手机号查找学员">
            <template slot="append">
              <el-button
                slot="append"
                icon="el-icon-search" />
            </template>
          </el-input>
        </el-form-item>
        <el-button class="default">手动添加学员</el-button>
        <el-button>批量导入学员</el-button>
        <el-button>导出学员</el-button>
      </el-form>
      <el-table
        :data="tableData"
        :row-style="tableRowStyle"
        :header-cell-style="tableHeader"
        border>
        <el-table-column
          prop="id"
          label="班级排名"
          align="center"
          width="80" />
        <el-table-column
          prop="userName"
          label="学员用户名"
          align="center" />
        <el-table-column
          prop="realName"
          label="真实姓名"
          align="center" />
        <el-table-column
          prop="phone"
          label="手机号"
          align="center" />
        <el-table-column
          :formatter="payFormatter"
          prop="joinType"
          label="加入方式"
          align="center" />
        <el-table-column
          :formatter="typeFormatter"
          prop="createTime"
          label="加入时间"
          align="center"
          width="100" />
        <el-table-column
          prop="result"
          label="学习总进度"
          align="center"
          show-overflow-tooltip />
        <el-table-column
          :formatter="dateFormatter"
          prop="remark"
          label="备注"
          align="center"
          width="100" />
        <el-table-column
          label="操作"
          align="center" />
      </el-table>
      <Pagination
        :size="size"
        :current="current"
        :total="total"
        @sizeChange="sizeChange"
        @currentChange="currentChange" />
    </div>
  </div>
</template>
<script>
import LeftTab from '~/components/mine/rankLeftTab.vue'
import Pagination from '~/components/pagination.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    LeftTab,
    Pagination
  },
  data() {
    return {
      size: 15,
      current: 1,
      total: 0,
      tab: 1,
      tabIndex: 1,
      showModal: false,
      classId: null,
      userId: null,
      tableData: []
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.classId = window.localStorage.getItem('zyy_classId')
    this.getList()
    // this.getCourseList()
  },
  methods: {
    switchTab(index){
      this.tab = index + 1;
    },
    // modalShow(item) {
    //   this.userId = item.userId
    //   this.showModal = true
    //   document.body.style.overflow = 'hidden'
    // },
    // hideModal() {
    //   this.showModal = false
    //   document.body.style.overflow = ''
    // },
    // 获取课程列表
    // getCourseList() {
    //   this.$axios('/yxs/api/web/user/getRecordByClassId', {
    //     params: {
    //       userToken: this.userInfo.userToken,
    //       classId: this.classId
    //     }
    //   }).then(res => {
    //     this.navList = res.data
    //   })
    // },
    getList() {
      this.$axios('/yxs/api/web/user/memberList', {
        params: {
          size: this.size,
          current: this.current,
          classroomId: this.classId,
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 截取百分比
    sliceStr(str) {
      if(str) {
        return parseFloat(str.slice(0, -1))
      }
    },
    sizeChange(val) {
      this.size = val
    },
    currentChange(val) {
      window.scrollTo(0, 0)
      this.current = val
      this.getList()
    },
    tableRowStyle({ row, rowIndex, column, columnIndex }){
      if(columnIndex == 0) {
        return 'color: #3f8a38'
      }
    },
    tableHeader({ row, rowIndex }) {
      return 'color: #333;font-weight: 700;'
    }
  }
}
</script>
<style lang="scss" scoped>
  .right-content {
    flex: 1;
    min-height: 500px;
    padding: 20px;
    border: 1px solid #E4ECF3;
    box-sizing: border-box;
    .header {
      padding: 0 16px;
    }
    .search {
      display: flex;
      align-items: center;
      width: 240px;
      height: 30px;
      margin-top: 16px;
      border-radius: 2px;
      .input {
        flex: 1;
        height: 30px;
        line-height: 30px;
        input {
          padding-left: 10px;
          width: 100%;
          height: 30px;
          outline: none;
          border: none;
          background: #E4ECF3;
        }
      }
      .search-icon {
        width: 30px;
        height: 30px;
        margin-top: 2px;
        background: #3F8A38;
        img {
          display: block;
          width: 14px;
          margin-top: 8px;
          margin-left: 8px;
        }
      }
    }
    .nav {
      border-bottom: 1px solid rgba(228, 236, 243, 1);
      box-sizing: border-box;
      li {
        display: inline-block;
        margin-right: 30px;
        font-size: 16px;
        cursor: pointer;
        color: #666;
        box-sizing: border-box;
        line-height: 54px;
      }
      .active{
        color:#46C37B;
        border-bottom: 2px solid #46C27B;
      }
    }
    .rank-content {
      margin-left: 26px;
      li {
        display: flex;
        align-items: center;
        height: 84px;
      }
      .num {
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        background: #3F8A38;
        color: #fff;
        font-size: 14px;
        text-align: center;
      }
      .none {
        background: #fff;
        color: #999;
      }
      .box {
        display: flex;
        align-items: center;
        margin-left: 20px;
        height: 84px;
        border-bottom: 1px solid #DEDEDE;
        img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }
        .info {
          width: 454px;
          margin-left: 16px;
          .name {
            font-size: 16px;
            color: #333;
          }
          .progress {
            margin-top: 12px;
          }
        }
        .text {
          width: 100px;
          margin-top: 16px;
          margin-left: 20px;
          font-size: 16px;
          color: #999;
        }
        .like {
          // float: right;
          margin-top: 16px;
          // margin-left: 20px;
          span {
            color: #B3B3B3;
          }
          .icon-aixin {
            color: #DEDEDE;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
<style>
  #manage .el-input {
    width: 350px;
  }
  #manage .el-input-group__append .el-button.el-button--default {
    width: 30px;
    background: #3f8a38;
    text-align: center;
  }
  #manage .el-input-group__append .el-button i {
    /* width: 30px; */
    margin-left: -8px;
    font-size: 18px;
    color: #fff;
  }
  #manage .default {
    background: #3f8a38;
    color: #fff;
  }
</style>
