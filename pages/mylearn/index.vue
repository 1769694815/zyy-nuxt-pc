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
      <div
        v-if="contentList && contentList.length > 0"
        class="center">
        <ul>
          <li
            v-for="(item,index) in contentList"
            :key="index"
            class="list-item"
            @click="openNewPage(item)">
            <div class="img-box">
              <img :src="item.middlePicture">
            </div>
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <p
                v-if="item.dayCount > 0 && item.dayCount <= 60"
                class="desc">
                {{ item.dayCount }}天后到期
              </p>
              <p
                v-if="item.dayCount <= 0 && item.price != 0"
                class="desc">
                已到期
              </p>
              <div class="foot">
                <span
                  v-if="item.result == '100%'"
                  class="complete">已学完</span>
                <span v-else-if="item.result == '0%'">未学习</span>
                <span v-else>已学{{ item.result }}</span>
                <span>共{{ item.lessonNum }}节</span>
              </div>
            </div>
          </li>
        </ul>
        <Pagination
          :size="size"
          :current="current"
          :total="total"
          @sizeChange="sizeChange"
          @currentChange="currentChange" />
      </div>
      <div
        v-else
        class="nodata">
        <img src="~/assets/images/nodata.png">
        <div class="text">亲，你还没有课程哦~</div>
      </div>
    </div>
  </div>
  
</template>
<script>
import LeftTab from '~/components/mine/leftTab.vue'
import Pagination from '~/components/pagination.vue'
import Cookies from 'js-cookie'
import { judgeUser } from '~/assets/js/util'
export default {
  components: {
    LeftTab,
    Pagination
  },
  data() {
    return {
      tab: 1,
      tabIndex: 1,
      total: 0,
      size: 12,
      current: 1,
      type: 0,
      userInfo: '',
      navList:[
        { label: '全部课程', value: 0 },
        { label: '学习中', value: 3 },
        { label: '已学完', value: 2 },
        { label: '未学习', value: 1 },
        { label: '已到期', value: 4 }
      ],
      contentList: [],
      rankStatus: 0 // 角色的status
    }
  },
  head() {
    return {
      title: '我的课程_'
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
    switchTab(index, item){
      this.tab = index + 1;
      this.type = item.value
      this.current = 1
      this.getList()
    },
    getList() {
      let params = {
        size: this.size,
        current: this.current,
        type: this.type,
        userToken: this.userInfo.userToken,
        teacherStatus: this.rankStatus
      }
      this.$axios('/yxs/api/web/user/getCourseMemberPageByUserId', {
        params
      }).then(res => {
        this.contentList = res.data.records
        this.total = res.data.total
      })
    },
    openNewPage(item) {
      console.log('课程信息', item)
      // if (item.price > 0 && item.dayCount <= 0) {
      //   console.log('该课程已过期')
      //   this.$confirm('该课程已过期，是否重新购买')
      // }
      let url = this.$router.resolve({
        name: 'lessonDetail',
        query: {
          id: item.courseId
        }
      })
      window.open(url.href, '_blank')
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
      padding-bottom: 30px;
      .list-item {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 243px;
        height: 220px;
        margin-left: 30px;
        margin-top: 30px;
        cursor: pointer;
        .img-box {
          width: 243px;
          height: 146px;
          border-radius: 6px;
          overflow: hidden;
          &:hover img {
            transform: scale(1.1, 1.1);
          }
          &:hover .content .title{
            color: #3F8A38;
          }
        }
        img {
          width: 243px;
          height: 146px;
          border-radius: 6px;
          transition: all .3s ease 0s;
        }
        .content {
          padding: 0 10px;
        }
        .title {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 12px;
          font-size: 14px;
          color: #333;
        }
        p {
          margin-top: 12px;
          font-size: 12px;
          color: #3F8A38;
        }
        .foot {
          // display: flex;
          // justify-content: space-between;
          position: absolute;
          bottom: 0;
          width: 100%;
          // margin-top: 10px;
          font-size: 12px;
          color: #999;
          span {
            display: inline-block;
            &:last-child {
              float: right;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
</style>
