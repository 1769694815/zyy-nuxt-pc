<template>
  <div>
    <div class="teach">
      <div class="top">
        试卷管理 >  {{ title }}
      </div>
      <div class="search">
        <table 
          width="100%" 
          border="0"
          empty-text="暂无数据">
          <tbody>
            <tr>
              <td 
                align="right" 
                width="120">按学员查找：</td>
              <td>
                <el-input 
                  v-model="form.name"
                  style="width: 340px" 
                  placeholder="输入学员用户名/真实姓名/手机号查找"/>
              </td>
              <!-- <td 
                align="right" 
                width="120">批阅状态：</td>
              <td>
                <el-select 
                  v-model="form.kind"
                  style="340px" 
                  placeholder="全部状态">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </td> -->
              <td 
                align="right" 
                width="120">考核状态：</td>
              <td>
                <el-select 
                  v-model="form.examKind" 
                  placeholder="全部状态">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </td>
              <td>
                <span 
                  class="button"
                  @click="search()">搜索</span>
              </td>
            </tr>
            <tr>
              <td 
                align="right" 
                width="120">交卷时间：</td>
              <td>
                <el-date-picker
                  v-model="date"
                  :picker-options="pickerOptions"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p
        v-if="examInfo.title"
        class="examInfo">{{ examInfo.title }}, 共{{ examInfo.itemCount }}道题，总分{{ examInfo.sumScore }}分，合格分{{ examInfo.qualified }}，答题限时{{ examInfo.limitTime }}分钟，考试期限{{ examInfo.examDateStatus == 0 ? '不限' : examInfo.examDeadlineStart + '至' + examInfo.examDeadlineEnd }}，{{ examInfo.createTime }}发布</p>
      <div 
        v-if="showStudentList"
        class="table">
        <table border="1">
          <tbody>
            <th>学员姓名</th>
            <th>真实姓名</th>
            <th>手机号</th>
            <th>答题用时</th>
            <th>交卷时间</th>
            <!-- <th>批阅状态</th> -->
            <th><span>得分</span>（客观+主观）</th>
            <th>考核状态</th>
            <th>操作</th>
            <tr
              v-for="(item,index) in list"
              :key="index">
              <td>{{ item.studentName? item.studentName : '无' }}</td>
              <td>{{ item.name? item.name : '无' }}</td>
              <td>{{ item.phone? item.phone:'无' }}</td>
              <td>{{ item.answerTime? item.answerTime : '0' }}</td>
              <td>{{ item.submitTime? dateFormatter(item.submitTime) : '0' }}</td>
              <!-- <td
                :class="item.markingStatus == 0? 'active':''">{{ item.markingStatus == 0? '未批阅' : '已批阅' }}</td> -->
              <td><span>{{ item.markingStatus == 0? '?': item.score }}</span>{{ item.objectScore }}+{{ item.markingStatus == 0? '?': item.subjectScore }}</td>
              <td>{{ getStatus(item.markingStatus) }}</td>
              <td
                class="read"
                @click="openExampage(item.studentId, item.resultId, 3)">{{ item.markingStatus == 0? '去批阅' : '批阅详情' }}</td>
            </tr>
          </tbody>
        </table>
        <Pagination
          :size="size"
          :current="current"
          :total="total"
          @sizeChange="sizeChange"
          @currentChange="currentChange" />
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '~/components/pagination.vue'
import Cookies from 'js-cookie'
import { formatStamp3, formatStamp2 } from '~/assets/js/util.js'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      title: this.$route.query.name || null,
      userInfo: '',
      list:[],
      paperId: this.$route.query.paperId || null,
      showStudentList: false,
      form:{
        kind:'',
        examKind:'',
        startTime: '',
        name:'',
        endTime:'',
      },
      options: [{
          value: '',
          label: '全部状态'
        }, {
          value: '2',
          label: '已批阅'
        },
        {
          value: '1',
          label: '未批阅'
        }],
      options1: [{
          value: '',
          label: '全部状态'
        },
         {
          value: '2',
          label: '合格'
        },
        {
          value: '3 ',
          label: '不合格'
        },
         {
          value: '0',
          label: '未批阅'
        }
      ],
      examInfo: {},
      total: 0,
      current: 1,
      size: 10,
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
        }]
      },
      date: ''
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
    this.getList()
    this.getExamInfo()
  },
  methods: {
    getExamInfo() {
      this.$axios('/yxs/api/web/question/getExamInfo', {
        params: {
          paperId: this.paperId,
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        console.log('试卷信息', res)
        this.examInfo = res.data
      })
    },
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
    // type   老师：3
    openExampage(id, resultId, type){
       let url = this.$router.resolve({
        name: 'formalExam',
        query: {
          examPaperId: this.paperId,
          studentId: id,
          resultId,
          type
        }
      })
      window.open(url.href, '_blank')
    },
    search() {
      this.current = 1
      if(this.date){
        console.log('11111',this.date)
        this.form.startTime = formatStamp3(this.date[0])
        this.form.endTime = formatStamp3(this.date[1])
        console.log('start',this.form.startTime)
      }
      this.getList()
      this.form.startTime = ''
      this.form.endTime = ''
    },
    getList() {
      this.$axios('/yxs/api/web/question/answerExamList', {
        params: {
          paperId: this.paperId,
          userToken: this.userInfo.userToken,
          userName: this.form.name,
          startTime: this.form.startTime,
          endTime: this.form.endTime,
          markingStatus: this.form.examKind,
          size: this.size,
          current: this.current
        }
      }).then(res => {
        console.log('answerTime',res.data)
        this.list = res.data.records
        this.total = res.data.total
        if(this.list){
          this.showStudentList = true
        }else{
           this.showStudentList = false
        }
      })
    },
    getStatus(index){
      if(index == 2){
        return '合格'
      }else if(index == 3){
        return '不合格'
      }else if(index == 0){
        return '未审核'
      }
    },
    openNewPage(url) {
      window.open(url.href, '_blank')
    },
    sizeChange(val) {
      this.size = val
    },
    currentChange(val) {
      this.current = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .teach{
    width: 100%;
    .top{
      line-height: 63px;
      font-size: 12px;
    }
    .search{
      display: table;
      width:998px;
      height:112px;
      margin: 0 auto;
      border-radius: 4px;
      background: #f9f9f9;
      border: 1px solid #e4ecf3;
      padding: 18px 20px;
      table{
        td{
          height: 50px;
          line-height: 50px;
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
          .timeinput{
            width: 159px;
          }
        }
      }
      
    }
    .examInfo {
      text-align: center;
      margin: 20px 0;
    }
    .table {
        width: 1038px;
        margin: 0 auto 35px;
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
          padding-bottom: 0;
          color: #333;
          vertical-align: middle;
          &.active{
            color: red;
          }
          &.read{
            cursor: pointer;
            &:hover{
              color: #3f8a38;
              text-decoration: underline;
            }
          }
          span{
            line-height: 16px;
            display: block;
          }
        }
      }
    }
  }
 
</style>
<style scoped>
  .el-date-editor {
    width: 340px;
  }
</style>