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
            @click="switchTab(index, item)"> {{ item.label }} </li>
        </ul>
      </div>
      <div class="center">
        <ul>
          <li
            v-for="(item,index) in contentList"
            :key="index"
            class="list-item">
            <img
              :src="item.middlePicture"
              @click="openNewPage($router.resolve({ name: 'play', query: { classId: item.classroomId, courseId: item.courseId }}))">
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <div class="desc">
                <span>共{{ item.lessonNum }}门</span>
                <span style="margin-left: 20px">已学{{ item.result }}</span>
              </div>
              <p v-if="item.dayCount != 0 && item.dayCount < 60">
                {{ item.dayCount }}天后到期
              </p>
              <p v-if="item.dayCount <= 0">
                已到期
              </p>
              <div class="foot">
                <span>{{ item.studentNum }}成员</span>
                <span
                  class="rank"
                  @click="toRank(item.classroomId)">进度排名></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import LeftTab from '~/components/mine/leftTab.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    LeftTab
  },
  data() {
    return {
      tab: 1,
      tabIndex: 2,
      type: 0,
      userInfo: '',
      navList:[
        { label: '全部班级', value: 0 },
        { label: '开班中', value: 1 },
        { label: '已到期', value: 2 }
      ],
      size: 10,
      current: 1,
      contentList: []
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
    switchTab(index, item){
      this.tab = index + 1;
      this.type = item.value
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
        size: this.size,
        current: this.current,
        type: this.type,
        userToken: this.userInfo.userToken
      }
      this.$axios('/yxs/api/web/user/getClassroomMemberPageByUserId', {
        params
      }).then(res => {
        this.contentList = res.data.records
      })
    },
    openNewPage(url) {
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
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
          cursor: pointer;
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
          color: #666;
          font-size: 14px;
        }
        p {
          margin-top: 20px;
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
