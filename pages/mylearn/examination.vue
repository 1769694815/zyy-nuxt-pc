<template>
  <div>
    <div class="mylearn-left">
      <span>我的试卷</span>
    </div>
    <div class="mylearn-right">
      <div class="right-nav">
        <ul>
          <li 
            v-for="(item,index) in navList" 
            :key="index" 
            :class="tab === (index + 1)? 'active' : ''" 
            @click="switchTab(index, item)"> {{ item.label }} </li>
        </ul>
      </div>
      <div class="center">
        <ul v-if="contentList && contentList.length > 0">
          <li
            v-for="(item,index) in contentList"
            :key="index"
            :class="(index%2 == 0)? 'bg' : ''">
            <div 
              v-if="tab != 1"
              class="center-left">
              <div class="title">
                {{ item.paperTitle }}
              </div>
              来自课程《{{ item.title }}》{{ dateFormatter(item.createTime) }}交卷
            </div>
            <div
              v-else
              class="center-left">
              <div class="title">
                {{ item.paperTitle }}
              </div>
              来自课程《{{ item.title }}》 考试期限：{{ item.examDateStatus == 0 ? '不限' : item.examDeadlineStart + ' 至 ' + item.examDeadlineEnd }}
            </div>
            <div class="center-right">
              <span 
                v-if="item.markingStatus != 0 && tab == 3"
                @click="openSimulationExam(item.paperId, 2, item.resultId, item.courseId, item.title)">
                得分{{ item.score }},批阅详情 >
              </span>
              <span 
                v-if="item.markingStatus != 0 && tab == 2"
                @click="openExam(item.paperId,2,item.resultId)">
                得分{{ item.score }},批阅详情 >
              </span>
              <span
                v-if="item.markingStatus != 0 && tab != 1 && item.examNum > 0"
                style="margin-left: 10px;"
                @click="openTip(item.paperId)">重考</span>
              <span
                v-else-if="tab === 1"
                class="toexam"
                @click="openTip(item.paperId)">立即考试</span>
              <span
                v-else-if="item.markingStatus == 0 && tab != 1"
                @click="openExam(item.paperId,2,item.resultId)">老师批阅中</span>
            </div>
          </li>
          <li>
            <Pagination
              :size="size"
              :current="current"
              :total="total"
              @sizeChange="sizeChange"
              @currentChange="currentChange" />
          </li>
        </ul>
        <div
          v-else
          class="nodata">
          <img src="~/assets/images/nodata.png">
          <div class="text">亲，你还没有考试记录哦~</div>
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      :data="tipList"
      class="remind">
      <div class="tip">
        <div class="title">
          温馨提示
        </div>
        <div class="content">
          您正在参与<span>{{ tipList.examTile }}</span>答题，共{{ tipList.count }}题，总分值{{ tipList.score }}分，限时答题{{ tipList.time }}分钟，点击【开始答题】则开始计时
          <p>剩余重考次数：{{ tipList.surplusNum }}</p>
        </div>
        <div class="botton">
          <span
            @click="closeTip">稍后答题</span>
          <span 
            class="begin"
            @click="openExam(tipList.id,1)">开始答题</span>
        </div>
      </div>
    </div>
    <div class="mylearn-content" />
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { formatStamp2 } from '~/assets/js/util.js'
import Pagination from '~/components/pagination.vue'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      tab: 1,
      tabIndex: 2,
      type: 3,
      title: '',
      showModal: false,
      userInfo: '',
      navList:[
        { label: '待考试卷', value: 2 },
        { label: '已考试卷', value: 1 },
        { label: '真题/模拟记录', value: 0 },
      ],
      size: 10,
      current: 1,
      contentList: [],
      tipList: [],
      total: 0
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
    // 模拟试卷
    openSimulationExam(paperId, type, resultId, courseId, title) {
      let url = this.$router.resolve({
        name: 'exam',
        query: {
          examPaperId: paperId,
          courseId,
          type,
          resultId,
          title
        }
      })
      window.open(url.href, '_blank')
    },
    // type:  学生：1（立即考试）、2（查看结果）   
    openExam(paperId,type,resultId) {
      this.showModal = false
      this.move()
      let url = this.$router.resolve({
        name: 'formalExam',
        query: {
          examPaperId: paperId,
          type: type,
          resultId
        }
      })
      window.open(url.href, '_blank')
    },
    openTip(cid){
      let params = {
        userToken: this.userInfo.userToken,
        examPaperId: cid
      }
      this.$axios('/yxs/api/web/question/immediate', {
       params
      }).then(res => {
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          return
        }
        console.log('tip',res)
        this.tipList = res.data
        this.showModal = true
        this.stop()
      })
    },
    closeTip() {
      this.showModal = false,
      this.tipList = []
      this.move()
    },
    switchTab(index, item){
      this.tab = index + 1;
      console.log(this.tab)
      this.type = item.value + 1
      this.contentList = [];
      this.current = 1
      this.getList()
    },
    toRank(roomId) {
      window.localStorage.setItem('zyy_classId', roomId)
      let url = this.$router.resolve({
        name: 'rank-course'
      })
      window.open(url.href, '_blank')
    },
    getList() {
      let params = {
        userToken: this.userInfo.userToken,
        current: this.current,
        type: this.type
      }
      this.$axios('/yxs/api/web/question/myExamList', {
       params
      }).then(res => {
        console.log('我的试卷列表',res)
        this.contentList = res.data.simulationList.records
        this.total = res.data.simulationList.total
       /*  this.contentList = res.data.records */
      })
    },
    openNewPage(url) {
      window.open(url.href, '_blank')
    },
    /***滑动限制***/
    stop(){
      var mo=function(e){e.preventDefault();};
      document.body.style.overflow='hidden';
      document.addEventListener("touchmove",mo,false);//禁止页面滑动
    },
    /***取消滑动限制***/
    move(){
      var mo=function(e){e.preventDefault();};
      document.body.style.overflow='';//出现滚动条
      document.removeEventListener("touchmove",mo,true);//页面可以滑动
    },
    sizeChange(val) {
      this.size = val
    },
    currentChange(val) {
      window.scrollTo(0, 0)
      this.current = val
      this.getList()
    },
  }
}
</script>
<style lang="scss" scoped>
  .mylearn-left{
    width: 270px;
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
  .mylearn-right{
    width: 850px;
    min-height: 569px;
    border: 1px solid rgba(228, 236, 243, 1);
    border-radius: 4px;
    box-sizing: border-box;
    .right-nav{
      border-bottom: 1px solid rgba(228, 236, 243, 1);
      margin: 0 16px;
      box-sizing: border-box;
      li{
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
    .center {
      padding-top: 40px;
      margin: 0 16px;
      ul{
        border-top: 1px solid #e4ecf3;
        li{
          position:relative;
          height:81px;
          border-bottom: 1px solid #e4ecf3;
          .center-left{
            float: left;
            width:526px;
            padding-left: 21px;
            color: #666;
            font-size: 14px;
            .title{
              line-height: 51px;
              color:#333;
              font-size: 16px;
            }
          }
          .center-right{
            float: left;
            line-height: 81px;
            color: #333;
            cursor: pointer;
            :hover{
              color:#46C37B;
              border-bottom: 1px solid #46C27B;
            }
          }
        }
        .bg{
          background: #f9f9f9;
        }
      }
    }
  }
  .mylearn-content {
    min-height: 500px;
  }
  .remind{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    z-index: 98;
    .tip{
      position: fixed;
      top: 35%;
      left: 38%;
      z-index:99;
      background: #fff;
      width: 463px;
      height: 290px;
      border-radius: 6px;
      .title{
        padding-top: 22px;
        text-align: center;
        font-size: 20px;
        color: #282828;
        line-height: 70px;
      }
      .content{
        margin: 0 auto;
        width: 367px;
        font-size:14px;
        line-height: 26px;
        color: #282828;
        span{
          color: #46C37B;
        }
      }
      .botton{
        margin: 42px 0 0 62px;
        span{
          display: inline-block;
          height:40px;
          width: 150px;
          line-height: 40px;
          text-align: center;
          border-radius: 4px;
          font-size: 16px;
          border:1px solid #3f8a38;
          color: #3f8a38;
          cursor: pointer;
        }
        .begin{
          background: #3f8a38;
          color: #fff;
          margin-left: 25px;
        }

      }
    }
  }
</style>
