<template>
  <div>
    <left-tab :tab-index="tabIndex" />
    <div class="teacher">
      <ul>
        <li
          v-for="(item, index) in contentList"
          :key="index">
          <img
            :src="item.middlePicture"
            @click="openNewPage($router.resolve({ name: 'lessonDetail', query: { id: item.courseId }}))">
          <div class="content">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <span
                v-if="item.price == 0"
                class="free">
                免费
              </span>
              <span
                v-else
                class="price">
                &yen;{{ item.price }}
              </span>
              <span class="lesson">共{{ item.lessonNum }}节</span>
              <span class="number">{{ item.studentNum }}人学过</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import LeftTab from '~/components/mine/teacherLeftTab.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    LeftTab
  },
  data() {
    return {
      tabIndex: 1,
      size: 10,
      current: 1,
      type: 0,
      contentList: [],
      userInfo: ''
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
    getList() {
      let params = {
        size: this.size,
        current: this.current,
        type: this.type,
        userToken: this.userInfo.userToken
      }
      this.$axios('/yxs/api/web/user/getCourseMemberPageByUserId', {
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
  .teacher {
    width: 850px;
    min-height: 500px;
    padding-bottom: 30px;
    border: 1px solid rgba(228, 236, 243, 1);
    border-radius: 4px;
    box-sizing: border-box;
    li {
      margin: 30px 0 0 30px;
      display: inline-block;
      width: 243px;
      img {
        width: 243px;
        height: 136px;
        border-radius: 6px;
        cursor: pointer;
      }
      .content {
        padding: 0 10px;
        .title {
          margin-top: 12px;
          font-size: 14px;
          color: #333;
        }
        .info {
          position: relative;
          margin-top: 12px;
          font-size: 0;
          color: #999;
          span {
            display: inline-block;
            font-size: 12px;
          }
          .free {
            color: #3F8A38;
          }
          .price {
            color: #FF4400;
          }
          .lesson {
            margin-left: 9px;
          }
          .number {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
</style>
