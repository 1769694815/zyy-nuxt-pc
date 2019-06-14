<template>
  <div>
    <left-tab :tab-index="tabIndex" />
    <div class="mylearn-right">
      <div class="right-nav">
        <ul>
          <li 
            v-for="(item,index) in navList" 
            :key="index" 
            :class="tab === (index + 1)? 'active' : ''" 
            @click="switchTab(index)"> {{ item.label }} </li>
        </ul>
      </div>
      <div class="center">
        <ul>
          <li
            v-for="(item,index) in contentList"
            :key="index"
            class="list-item">
            <img :src="item.middlePicture">
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <p v-show="item.dayCount != 0">
                {{ item.dayCount }}天后到期
              </p>
              <div class="desc">
                <span>{{ item.studentNum }}成员</span>
                <span
                  class="rank"
                  @click="toRank(item.classroomId)">班级管理></span>
              </div>
              <div class="foot">
                班级有效期：{{ formatStamp(item.startTime) }}至 {{ formatStamp(item.endTime) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import LeftTab from '~/components/mine/teacherLeftTab.vue'
import Cookies from 'js-cookie'
import { judgeUser } from '~/assets/js/util'
// import { formatStamp } from '~/assets/js/util.js'
export default {
  components: {
    LeftTab
  },
  data() {
    return {
      tab: 1,
      type: 0,
      tabIndex: 2,
      size: 10,
      current: 1,
      userInfo: '',
      navList:[
        { label: '全部班级', value: 1 },
        { label: '开班中', value: 2 },
        { label: '已到期', value: 3 }
      ],
      contentList: [],
      rankStatus: 0 // 角色的status
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.rankStatus = judgeUser().status
    if(!this.userInfo) {
      this.$router.push({
        name: 'login'
      })
      return
    }
    this.getList()
  },
  methods: {
    switchTab(index){
      this.tab = index + 1;
    },
    toRank(id) {
      window.localStorage.setItem('zyy_classId', id)
      this.$router.push({
        name: 'rank-manage'
      })
    },
    getList() {
      let params = {
        size: this.size,
        current: this.current,
        type: this.type,
        userToken: this.userInfo.userToken,
        teacherStatus: this.rankStatus
      }
      this.$axios('/yxs/api/web/user/getClassroomMemberPageByUserId', {
        params
      }).then(res => {
        this.contentList = res.data.records
      })
    },
    formatStamp(time) {
      let date = new Date(parseInt(time))
      let y = date.getFullYear()
      let m = this.formatStr(date.getMonth() + 1)
      let d = this.formatStr(date.getDate())
      return `${y}-${m}-${d}`
    },
    formatStr(n) {
      return n > 9 ? n : (0 + '' + n)
    }
  }
}
</script>
<style lang="scss" scoped>
  .mylearn-right{
    width: 850px;
    min-height: 500px;
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
      margin-top: 20px;
      margin-left: 30px;
      .list-item {
        position: relative;
        display: flex;
        align-items: center;
        vertical-align: top;
        height: 135px;
        margin-bottom: 30px;
        img {
          width: 240px;
          height: 135px;
          border-radius: 6px;
        }
        .content {
          margin-left: 20px;
        }
        .title {
          margin-bottom: 16px;
          font-size: 18px;
          color: #333;
        }
        .desc {
          margin-top: 16px;
          color: #666;
          font-size: 14px;
          .rank {
            margin-left: 240px;
            cursor: pointer;
          }
        }
        p {
          margin-top: 14px;
          font-size: 12px;
          color: #3F8A38;
        }
        .foot {
          margin-top: 16px;
          font-size: 12px;
          color: #999;
          span {
            display: inline-block;
          }
          .rank {
            margin-left: 260px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
