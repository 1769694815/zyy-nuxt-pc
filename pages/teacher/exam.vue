<template>
  <div>
    <div class="teach-left">
      <span>试卷管理</span>
    </div>
    <div class="teach-right">
      <div class="search">
        <table 
          width="100%" 
          border="0">
          <tbody>
            <tr>
              <td 
                align="right" 
                width="120">试卷名称：</td>
              <td>
                <el-input 
                  v-model="form.title"
                  placeholder="输入试卷名称"/>
              </td>
              <td 
                align="right" 
                width="120">发布状态：</td>
              <td>
                <el-select 
                  v-model="form.status" 
                  placeholder="全部状态">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </td>
              <td>
                <span 
                  class="button"
                  @click="getList()">搜索</span></td>
            </tr>
            <tr>
              <td 
                align="right" 
                width="120">按从属筛选：</td>
              <td>
                <el-select 
                  v-model="form.belong" 
                  placeholder="请选择课程名称"
                  @change="getLessonList(form.belong)">
                  <el-option
                    v-for="item in belongs"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"/>
                </el-select>
              </td>
              <td 
                align="right" 
                width="120">二级从属：</td>
              <td>
                <el-select 
                  v-model="form.belong1" 
                  placeholder="本课程">
                  <el-option
                    v-for="item in belongs1"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"/>
                </el-select>
              </td>
              <!-- <td><span class="button">添加题目</span></td> -->
            </tr>
            <tr>
              <td 
                align="right" 
                width="120">试卷类型： </td>
              <td>
                <el-select 
                  v-model="form.kind" 
                  placeholder="全部类型">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </td>
            </tr>       
          </tbody>
        </table>
      </div>
      <div
        v-if="showTable" 
        class="table">
        <table border="1">
          <tr>
            <th>试卷名称</th>
            <th>试卷从属</th>
            <th>试卷类型</th>
            <th>试卷状态</th>
            <th width="90">发布时间</th>
            <th>题量</th>
            <th>答题限时</th>
            <th>合格/总分值</th>
            <th>答题人数</th>
            <th width="58">已答题平均分</th>
            <th>操作</th>
          </tr>
          <tr
            v-for="(item,index) in list.records"
            :key="index">
            <td>{{ item? item.title : '' }}</td>
            <td>{{ item? item.courseLevel : '' }}</td>
            <td>{{ item.examPaperType == 1? '练习考试' : item.examPaperType == 2? '历年真题' : '无' }}</td>
            <td>{{ item.status == 0? '发布' : '未发布' }}</td>
            <td>{{ item? dateFormatter(item.createTime) : '' }}</td>
            <td>{{ item? item.itemCount : '' }}道</td>
            <td>{{ item? item.timeLimit : '' }}</td>
            <td>{{ item.qualified? item.qualified : '' }}/{{ item.sumScore?item.sumScore : '' }}</td>
            <td>{{ item? item.peopeleNum : '0' }}</td>
            <td>{{ item? item.ageScore : '0' }}</td>
            <td @click="openExam(item.id,item.title)">
              操作
              <!-- <el-dropdown>
                <span class="el-dropdown-link">
                  操作
                </span>
                <el-dropdown-menu slot="dropdown" @click="openExam">
                  <el-dropdown-item command=item.id>答卷管理</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { formatStamp2 } from '~/assets/js/util.js'
export default {
  components: {
  },
  data() {
    return {
      userInfo: '',
      size: 10,
      list:[],
      value: '',
      value1: '',
      showTable: false,
      form:{
        title:'',
        kind:'',
        status:'',
        belong:'',
        belong1:'',
      },
      belongs:[],
      belongs1:[
        {
          id:'',
          title:''
        }
      ],
      options: [{
          value: '',
          label: '全部状态'
        }, {
          value: '0',
          label: '发布'
        },
        {
          value: '2',
          label: '未发布'
        }],
      options1: [{
          value: '',
          label: '全部试卷'
        }, {
          value: '1',
          label: '练习考试'
        },
        {
          value: '2',
          label: '历年真题'
        }]
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    if(!this.userInfo) {
      this.$router.push({
        name: 'login'
      })
      return
    }
    this.getCourseList()
  },
  methods: {
    dateFormatter(time) {
      let date = new Date(time)
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
    openExam(id,name) {
      console.log('111',id)
      let url = this.$router.resolve({
        name: 'teacher-manage',
        query: {
          paperId: id,
          name: name
        }
      })
      window.open(url.href, '_blank')
    },
    getList() {
      console.log('form',this.form.belong)
      let params = {
        userToken: this.userInfo.userToken,
        size: 10,
        current: 1,
        courseId: this.form.belong,
        lessonId: this.form.belong1,
        questionType: this.form.kind,
        stem: this.form.title,
        status: this.form.status
      }
      this.$axios('/yxs/api/web/question/examList', {
       params
      }).then(res => {
        console.log('12',res)
        this.list = res.data
        this.showTable = true
        this.getCourseList()
      })
    },
    getCourseList() {
      let params = {
         userToken: this.userInfo.userToken,
      }
      this.$axios('/yxs/course/getCourseList', {
        params
      }).then(res => {
        console.log('course',res)
        this.belongs = res.data
      })
    },
    getLessonList(id) {
      let params = {
         userToken: this.userInfo.userToken,
         courseId: id
      }
      this.$axios('/yxs/course/getLessonList', {
        params
      }).then(res => {
        console.log('lesson',res)
        this.belongs1 = res.data
      })
    },

  }
}
</script>
<style lang="scss" scoped>

  .teach-left{
    width: 224px;
    padding: 20px 0;
    margin-right: 20px;
    height: 37px;
    border: 1px solid #e4ecf3;
    border-radius: 4px;
    span{
      display: block;
      height: 37px;
      line-height:37px;
      font-size: 12px;
      padding-left: 17px;
      color: #46C37B;
      border-left: 2px solid #46C37B;
    }
  }
  .teach-right{
    
    .search{
      display: table;
      width:856px;
      height:148px;
      border-radius: 4px;
      background: #f9f9f9;
      border: 1px solid #e4ecf3;
      padding: 18px 20px;
      table{
        td{
          height: 50px;
          .el-input{
            width: 224px;
          }
          .el-select{
            width: 224px;
          }
          .button{
            display: block;
            width: 114px;
            text-align: center;
            letter-spacing: 4px;
            line-height: 30px;
            background: #3f8a38;
            color: #fff;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
    .table {
      width: 896px;
      margin: 35px auto;
      border-color: #c3c3c3;
      //margin: 40px 40px 10px 40px;
      table {
        border-color: #c3c3c3;
        border-radius: 4px;
        width: 100%;
        th {
          background: #f5f5f5;
        }
        td, th {
          border: 1px solid #c3c3c3;
          line-height: 20px;
          padding: 10px 0;
          text-align: center;
          color: #333;
          vertical-align: middle;
          &.read{
            cursor: pointer;
            &:hover{
              color: #3f8a38;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
 
</style>
