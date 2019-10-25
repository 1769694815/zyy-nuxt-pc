<template>
  <div class="container">
    <div class="content">
      <div class="left">
        <div class="avatar">
          <img :src="detail.pic">
        </div>
        <div
          v-if="detail.focusFlag == 1"
          class="button btn-2"
          @click="cancelConcern(detail.famousDoctorId)">已关注</div>
        <div
          v-else
          class="button"
          @click="concern(detail.famousDoctorId)">+关注</div>
      </div>
      <div class="right">
        <div>
          <span class="name">{{ detail.name }}</span>
          <span class="rank">{{ detail.title }}</span>
        </div>
        <div class="info">
          <span>关注{{ detail.collectionNum }}人｜粉丝{{ detail.fansNum }}人</span>
        </div>
        <div class="intro">
          {{ detail.description }}
        </div>
      </div>
    </div>
    <div class="list">
      <div class="title">名师课程</div>
      <ul>
        <li
          v-for="(item,index) in detail.courses"
          :key="index"
          @click="openNewPage($router.resolve({ name: 'lessonDetail', query: { id: item.courseId }}))">
          <img :src="item.pic">
          <div class="name">{{ item.title }}</div>
          <div class="desc">
            <div class="price">{{ item.price == 0 ? '免费' : item.price }}</div>
            <div>
              <i class="iconfont iconuser2" />
              {{ item.studentNum }}人学过
              <!-- <span>
                <i class="iconfont iconpinglun" />
                {{ item.lessonNum }}
              </span> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      title: '名医师承_',
      id: this.$route.query.id,
      userInfo: '',
      detail: {}
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo') || ''
    this.getDetail()
  },
  methods: {
    getDetail() {
      let params = {
        doctorId: this.id,
        userToken: this.userInfo.userToken || ''
      }
      this.$axios('/yxs/api/web/doctor/detail', {
        params
      }).then(res => {
        this.detail = res.data
        this.title = res.data.name + '_名医师承_'
      })
    },
    // 关注
    concern(id) {
      if(!this.userInfo) {
        this.$router.push({
          name: 'login'
        })
        return
      }
      this.$axios.post('/yxs/api/web/user/saveFamousCollection', {
        famousId: id,
        userToken: this.userInfo.userToken
      }).then(res => {
        this.$message({
          message: '关注成功',
          type: 'success'
        })
        this.getDetail()
      })
    },
    // 取消关注
    cancelConcern(id) {
      this.$axios('/yxs/api/web/user/cancelFamousCollection', {
        params: {
          famousId: id,
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        this.$message({
          message: '取消关注成功',
          type: 'success'
        })
        this.getDetail()
      })
    },
    openNewPage(url) {
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
    .content {
      display: flex;
      margin-top: 20px;
      padding-bottom: 20px;
      background: #f5f9fc;
      .left {
        margin: 40px;
        img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
        }
        .button {
          width: 120px;
          height: 40px;
          margin-left: 20px;
          margin-top: 40px;
          line-height: 40px;
          color: #fff;
          text-align: center;
          background: #37a967;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-2 {
          background: #999;
        }
      }
      .right {
        margin-top: 50px;
        .name {
          font-size: 18px;
          color: #333;
        }
        .rank {
          font-size: 14px;
          color: #4e9713;
          margin-left: 15px;
        }
        .info {
          margin-top: 10px;
          font-size: 14px;
          line-height: 25px;
        }
        .intro {
          margin-top: 20px;
          line-height: 25px;
          font-size: 14px;
        }
      }
    }
    .list {
      // padding: 10px 10px;
      margin-top: 40px;
      // border: 1px solid #f5f5f5;
      margin-bottom: 30px;
      .title {
        font-size: 16px;
        line-height: 30px;
        // border-bottom: 1px solid #f5f5f5;
      }
      ul {
        // margin-top: 20px;
        li {
          display: inline-block;
          margin-top: 20px;
          margin-left: 10px;
          width: 270px;
          // height: 220px;
          padding: 10px;
          border: 1px solid #f5f5f5;
          transition: all .3s ease 0s;
          cursor: pointer;
          &:nth-child(4n+1) {
            margin-left: 0;
          }
          &:hover {
            transform: translate(0, -5px);
            box-shadow: 0 5px 10px #999;
          }
          img {
            width: 100%;
            height: 160px;
          }
          .name {
            font-size: 14px;
            line-height: 40px;
            color: #333;
          }
          .desc {
            display: flex;
            justify-content: space-between;
            color: #999;
            .price {
              color: #4e9713;
            }
            span {
              color: #666;
              &:last-child {
                i {
                  color: #333;
                }
                margin-left: 20px;
              }
            }
          }
        }
      }
    }
  }
</style>
