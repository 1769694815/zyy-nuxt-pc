<template>
  <div>
    <left-tab :tab-index="tabIndex" />
    <div class="right-content">
      <div class="header">
        <!-- <div class="search">
          <div class="input">
            <input
              type="text"
              placeholder="搜索用户名查看学员进度">
          </div>
          <div class="search-icon">
            <img src="~/assets/images/search.png">
          </div>
        </div> -->
        <div class="nav">
          <ul>
            <li
              v-for="(item, index) in navList"
              :key="index"
              :class="tab === (index + 1)? 'active' : ''" 
              @click="switchTab(item, index)"> {{ item.title }} </li>
          </ul>
        </div>
      </div>
      <div class="rank-content">
        <ul>
          <!-- @click="modalShow(item)" -->
          <li
            v-for="(item, index) in rankList"
            :key="index">
            <div 
              :class="(size * (current - 1) + index + 1) > 3 ? 'none' : ''"
              class="num" >{{ size * (current - 1) + index + 1 }}</div>
            <div class="box">
              <img
                v-if="item.avatar"
                :src="item.avatar">
              <img
                v-else
                src="~/assets/images/xuesheng.png">
              <div class="info">
                <div class="name">{{ item.userName }}</div>
                <el-progress
                  :percentage="sliceStr(item.result)"
                  :show-text="false"
                  color="linear-gradient(-90deg,rgba(145,189,53,1),rgba(63,138,56,1))"
                  class="progress" />
              </div>
              <!-- <div class="text">已学{{ item.result }}</div> -->
              <div
                v-if="item.result == '100%'"
                class="text">已学完</div>
              <div
                v-else-if="item.result == '0%'"
                class="text">未学习</div>
              <div
                v-else
                class="text">已学{{ item.result }}</div>
                <!-- <div class="like">
                  <i class="iconfont icon-aixin" />
                  <span>{{ item.watchNum }}</span>
                </div> -->
            </div>
          </li>
        </ul>
      </div>
      <Pagination
        :size="size"
        :current="current"
        :total="total"
        @sizeChange="sizeChange"
        @currentChange="currentChange" />
      <progress-modal
        v-show="showModal"
        :left-list="navList"
        :user-id="userId"
        @hide-modal="hideModal" />
    </div>
  </div>
</template>
<script>
import ProgressModal from '~/components/modal/progressModal.vue'
import LeftTab from '~/components/mine/rankLeftTab.vue'
import Pagination from '~/components/pagination.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    ProgressModal,
    LeftTab,
    Pagination
  },
  data() {
    return {
      size: 15,
      current: 1,
      total: 0,
      tab: 1,
      tabIndex: 2,
      showModal: false,
      classId: null,
      userId: null,
      courseId: null,
      userInfo: '',
      navList: [],
      rankList: []
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
    this.classId = window.localStorage.getItem('zyy_classId')
    this.getCourseList()
  },
  methods: {
    switchTab(item, index){
      this.tab = index + 1;
      this.current = 1,
      this.courseId = item.courseId
      this.getRankList(item.courseId)
    },
    modalShow(item) {
      this.userId = item.userId
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    hideModal() {
      this.showModal = false
      document.body.style.overflow = ''
    },
    // 获取课程列表
    getCourseList() {
      this.$axios('/yxs/api/web/user/getRecordByClassId', {
        params: {
          userToken: this.userInfo.userToken,
          classId: this.classId
        }
      }).then(res => {
        this.navList = res.data
        if(res.data && res.data.length > 0) {
          this.getRankList(res.data[0].courseId)
          this.courseId = res.data[0].courseId
        }
      })
    },
    // 获取排名信息
    getRankList(id) {
      this.$axios('/yxs/api/web/user/ranking', {
        params: {
          size: this.size,
          current: this.current,
          userToken: this.userInfo.userToken,
          courseId: id
        }
      }).then(res => {
        this.rankList = res.data.records
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
      this.getRankList(this.courseId)
    }
  }
}
</script>
<style lang="scss" scoped>
  .right-content {
    flex: 1;
    padding-bottom: 30px;
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
          margin-top: 28px;
          margin-left: 20px;
          font-size: 16px;
          color: #999;
        }
        .like {
          margin-top: 28px;
          margin-left: 20px;
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
