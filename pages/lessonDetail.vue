<template>
  <div style="width:100%">
    <v-header />
    <div class="lesson-detail">
      <Navbar />
      <div
        v-if="detailData"
        class="header">
        <div class="header-content">
          <div class="crumb">
            <nuxt-link to="/">首页</nuxt-link>
            <i class="iconfont iconarrow-right" />
            <nuxt-link :to="{ name: 'train' }">课程中心</nuxt-link>
            <i class="iconfont iconarrow-right" />
            <nuxt-link :to="{ name: 'lessonDetail', query: { id: id }}">{{ navTitle }}</nuxt-link>
          </div>
          <img :src="detailData.middlePicture">
          <div class="content-right">
            <div class="right-title">
              <span class="title"> {{ detailData.title }} </span>
              <div class="share">
                <span
                  v-if="detailData.collectionStauts == 0"
                  @click="collect">收藏
                  <i class="iconfont iconaixin" />
                </span>
                <span
                  v-else
                  @click="cancelCollect">收藏
                  <i class="iconfont iconaixin active" />
                </span>
                <span class="fenxiang">分享<i class="iconfont iconfenxiang" />
                  <span
                    class="social-share"
                    data-sites="weibo,qzone,qq,wechat"
                    data-title="中医药在线"
                    data-wechat-qrcode-title="请打开微信扫一扫"
                    data-wechat-qrcode-helper="<p>打开微信扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
                    data-description="江西中医药大学继续教育学习平台" />
                </span>
              </div>
            </div>
            <div class="learn-mes">
              <span>共{{ detailData.lessonNum }}节</span>
              <span>{{ detailData.studentNum }}人学过</span>
            </div>
            <div class="des">
              <div class="des-text">
                <h2 class="des-title">课程简介：</h2>
                <div
                  class="text"
                  style="width: 100%;
                    height: 52px;
                    font-size: 14px;
                    color: #666666;
                    align-items: center;
                    line-height: 26px;
                    padding-top: 6px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;">
                  {{ detailData.brife ? detailData.brife : '暂无简介' }}
                </div>
              </div>
            </div>
            <div
              v-if="detailData.price > 0"
              class="price">
              价格：<span>&yen;{{ detailData.price }}</span>
            </div>
            <div
              v-else
              class="price free">
              价格：<span>免费</span>
            </div>
            <div
              v-if="!userInfo"
              class="bottom">
              <div
                v-if="detailData.price == 0"
                class="b1"
                @click="join">免费加入</div>
              <div
                v-else
                class="flex">
                <div
                  class="b1"
                  @click="toPlay('', 1)">免费试看</div>
                <div
                  class="b2"
                  @click="buyLesson">立即购买</div>
              </div>
            </div>
            <div
              v-else
              class="bottom">
              <div
                v-if="detailData.buyFlag == 3"
                class="b1"
                @click="join">
                免费加入
              </div>
              <div
                v-if="detailData.buyFlag == 1 || (detailData.buyFlag == 2 && detailData.dayCount <= 0)"
                class="flex">
                <div
                  class="b1"
                  @click="toPlay('', 1)">免费试看</div>
                <div
                  class="b2"
                  @click="buyLesson">立即购买</div>
              </div>
              <div
                v-if="detailData.buyFlag == 2 && detailData.dayCount > 0"
                class="b2"
                @click="toPlay">继续学习
              </div>
            </div>
            <div class="share">
              <span
                v-if="detailData.collectionStauts == 0"
                @click="collect">收藏
                <i class="iconfont iconaixin" />
              </span>
              <span
                v-else
                @click="cancelCollect">收藏
                <i class="iconfont iconaixin active" />
              </span>
              <span class="fenxiang">分享<i class="iconfont iconfenxiang" />
                <span
                  class="social-share"
                  data-sites="weibo,qzone,qq,wechat"
                  data-title="中医药在线"
                  data-wechat-qrcode-title="请打开微信扫一扫"
                  data-wechat-qrcode-helper="<p>打开微信扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
                  data-description="江西中医药大学继续教育学习平台" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-center">
          <div class="content-left">
            <div class="lessondetail-nav">
              <ul>
                <li
                  v-for="(item, index) in navList"
                  :key="index"
                  :class="tab === (index + 1) ? 'active' : ''"
                  @click="switchTab(index)"> {{ item.label }} </li>
              </ul>
            </div>
            <div class="lesson-intronduce">
              <!-- 课程介绍 -->
              <div v-show="tab == 1">
                <div
                  v-if="detailData.about"
                  class="text"
                  v-html="detailData.about" />
                <div v-else>暂无介绍</div>
              </div>
              <!-- 课程视频 -->
              <ul
                v-show="tab == 2"
                class="lesson-list">
                <li
                  v-for="(item, index) in detailData.lesson"
                  :key="index"
                  @click="toPlay(item)">
                  <span class="circle" />
                  <span
                    v-if="item.free == 1"
                    class="free">免费</span>
                  <span class="course-title">{{ item.title }}</span>
                  <div class="right">
                    {{ timestr(item.length) }}
                    <i class="iconfont iconshipin" />
                  </div>
                </li>
              </ul>
              <!-- 模拟习题 -->
              <div v-show="tab == 3">
                <div
                  class="btn-item"
                  @click="openPractice">
                  <i class="iconfont iconlianxiti" />
                  <span>练习题</span>
                </div>
                <div
                  class="btn-item"
                  @click="openExam">
                  <i class="iconfont iconkaoshi" />
                  <span>模拟考试</span>
                </div>
              </div>
              <!-- 评论 -->
              <div
                v-show="tab == 4"
                class="rating">
                <!-- <div class="title">我要评论</div> -->
                <div class="mine">
                  <div class="avatar">
                    <i class="iconfont iconyonghu1" />
                  </div>
                  <div class="textarea">
                    <textarea
                      v-model="text"
                      placeholder="输入你的想法..." />
                    <div
                      class="button"
                      @click="createComment">发表评论</div>
                  </div>
                </div>
                <div class="all">
                  <div class="all-top">
                    <span>全部评论</span>
                    <span class="number">{{ commentList.length }}条评论</span>
                  </div>
                  <ul class="list">
                    <li
                      v-for="(item, index) in commentList"
                      :key="index"
                      class="item">
                      <div class="avatar">
                        <!-- <i class="iconfont icon-user" /> -->
                        <img :src="item.avatar">
                      </div>
                      <div class="content">
                        <span class="name">{{ item.user_name }}</span>
                        <span class="date">{{ item.createTime }}</span>
                        <p>
                          {{ item.content }}
                        </p>
                      </div>
                    </li>
                  </ul>
                  <div
                    v-show="commentList.length == 0"
                    style="margin: 20px 0; font-size: 16px;">
                    暂无评论
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-right">
            <div class="teacher-title">
              <span>授课老师</span>
            </div>
            <div
              v-for="(item,index) in detailData.teacherList"
              :key="index"
              class="teacher">
              <img
                v-if="item.pic"
                :src="item.pic">
              <img
                v-else
                src="~/assets/images/teacher.png">
              <div class="text">
                <span class="name">
                  {{ item.name }}
                </span>
                <span class="fame">{{ item.title }}</span>
              </div>
            </div>
          </div>
          <div class="stu-dynamics">
            <div class="title"><span>学员动态</span></div>
            <div class="text">
              <ul>
                <li
                  v-for="(item,index) in detailData.doList"
                  :key="index" >
                  {{ item.userName }}
                  <span> {{ item.type == 0 ? '开始学习课时' : '收藏了课程' }} </span>
                  {{ item.courseName }}
                </li>
              </ul>
            </div>
          </div>
          <div class="related-class">
            <div class="title"><span>相关课程</span></div>
            <ul>
              <li
                v-for="(item,index) in detailData.courseList"
                v-if="index < 3"
                :key="index"
                class="lesson"
                @click="toDetail(item.id)">
                <div class="img-box">
                  <img :src="item.pic">
                </div>
                <h3>{{ item.title }}</h3>
                <span>
                  <!-- <i class="iconfont iconspbofang" /> -->
                  {{ item.studentNum }}人学过
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="foot-img"
          @click="openNewPage($router.resolve({ name: 'service'}))">
          <img src="../assets/images/foot-img.png">
        </div>
      </div>
    </div>
    <buy-modal
      v-show="showModal"
      :data-obj="detailData"
      @hide-modal="hideModal" />
  </div>
</template>

<script>
import Navbar from "~/components/navBar.vue"
import Header from '~/components/layout/header.vue'
import BuyModal from '~/components/modal/buyModal.vue'
import { formatSeconds } from '~/assets/js/util'
import Cookies from 'js-cookie'
export default {
  components: {
    Navbar,
    BuyModal,
    'v-header': Header
  },
  data(){
    return{
      title: '',
      tab: 1,
      id: this.$route.query.id,
      classId: this.$route.query.classId || '',
      userInfo: '',
      detailData: {},
      showModal: false,
      commentList: [],
      text: '',
      navList:[
        { label: "课程介绍", value: 1 },
        { label: "课程视频", value: 2 },
        { label: "模拟习题", value: 3 },
        { label: "评论", value: 4 }
        // { label: "笔记", value: 4 }
      ],
      navTitle: '',
      description: ''
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    let id = query.id || '',
        classId = query.classId || ''
    let res = await $axios('/yxs/api/web/course/courseDetail', {
      params: {
        id,
        classId,
        userToken: ''
      }
    })
    let desc = res.data.brife ? res.data.brife.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,'').substr(0, 100) : res.data.title

    return {
      detailData: res.data,
      navTitle: res.data.title,
      description: desc,
      title: res.data.title + '_自学考试_'
    }
  },
  computed: {
    timestr() {
      return function(time) {
        return formatSeconds(time)
      }
    }
  },
  mounted() {
    // socialShare('.social-share', {
    //   title: '',
    //   description: '',
    //   sites: ['qzone', 'qq', 'weibo', 'wechat'],
    //   disabled: ['google', 'facebook', 'twitter', 'douban'],
    //   wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
    //   wechatQrcodeHelper: '<p>微信里点扫一扫</p><p>二维码便可将本文分享至朋友圈。</p>'
    // });
    this.userInfo = Cookies.getJSON('zyy_userInfo') || ''
    if (this.userInfo) {
      this.getDetail()
    }
    this.getComment()
  },
  methods: {
    switchTab(index) {
      this.tab = index + 1;
    },
    getDetail() {
      this.$axios('/yxs/api/web/course/courseDetail', {
        params: {
          id: this.id,
          classId: this.classId,
          userToken: this.userInfo.userToken || ''
        }
      }).then(res => {
        this.detailData = res.data
      })
    },
    toPlay(item, flag) {
      // flag, 是否是免费试看
      console.log('item', item)
      if(!this.userInfo) {
        this.$router.push({
          name: 'login'
        })
      } else {
        if(item.free == 2) {
          this.$alert('购买课程才可观看全部视频哦~', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          let lessonId = ''
          if(flag) {
            lessonId = this.getFreeId()
          }
          let url = this.$router.resolve({
            name: 'play',
            query: {
              courseId: this.id,
              lessonId: item.lessonId || lessonId
            }
          })
          window.open(url.href, '_blank')
        }
      }
    },
    getFreeId() {
      for(let i = 0; i < this.detailData.lesson.length; i++) {
        if(this.detailData.lesson[i].free == 1) {
          console.log('lessoniddd', this.detailData.lesson[i].lessonId)
          return this.detailData.lesson[i].lessonId
        }
      }
    },
    join() {
      if(!this.userInfo) {
        this.$router.push({
          name: 'login'
        })
      } else {
        let url = this.$router.resolve({
          name: 'play',
          query: {
            courseId: this.id
          }
        })
        window.open(url.href, '_blank')
      }
    },
    hideModal() {
      this.showModal = false
    },
    buyLesson() {
      // this.showModal = true
      if(!this.userInfo) {
        this.$router.push({
          name: 'login'
        })
      } else {
        this.$router.push({
          name: 'payfor',
          query: {
            itemId: this.id,
            price: this.detailData.price,
            itemType: 1
          }
        })
      }
    },
    getComment() {
      let params = {
        objId: this.id,
        objType: 1, // 1：课程评论， 2：资讯评论
        current: 1,
        size: 10
      }
      this.$axios('/yxs/api/web/course/commentList', {
        params
      }).then(res => {
        this.commentList = res.data.records
      })
    },
    // 发表评论
    createComment() {
      if(!this.text) {
        this.$message({
          message: '请输入评论',
          type: 'warning'
        })
        return
      }
      this.$axios.post('/yxs/api/web/user/comment', {
        objId: this.id,
        objType: 1, // 1：课程评论， 2：资讯评论
        content: this.text,
        userToken: this.userInfo.userToken
      }).then(res => {
        this.text = ''
        this.$message({
          message: '已评论，待审核',
          type: 'success'
        })
        this.getComment()
      })
    },
    // 收藏
    collect() {
      if(!this.userInfo) {
        this.$router.push({
          name: 'login'
        })
        return
      }
      this.$axios.post('/yxs/api/web/user/saveCourseCollection', {
        courseId: this.detailData.id,
        userToken: this.userInfo.userToken || ''
      }).then(res => {
        this.$message({
          message: '收藏成功',
          type: 'success'
        })
        this.getDetail()
      })
    },
    // 取消收藏
    cancelCollect() {
      this.$axios('/yxs/api/web/user/cancelCourseCollection', {
        params: {
          courseId: this.detailData.id,
          userToken: this.userInfo.userToken || ''
        }
      }).then(res => {
        this.$message({
          message: '取消收藏成功',
          type: 'success'
        })
        this.getDetail()
      })
    },
    openNewPage(url) {
      window.open(url.href, '_blank')
    },
    openPractice() {
      if(!this.userInfo) {
        let url = this.$router.resolve({
          name: 'login'
        })
        window.open(url.href)
        return
      }
      if(this.detailData.memBerStatus == 0 && this.detailData.free == 2) {
        this.$message({
          message: '需先加入学习才可参与答题哦~',
          type: 'warning'
        })
        return
      }
      if(this.detailData.memBerStatus == 0 && this.detailData.free == 1) {
        this.$message({
          message: '需购买课程才可参与答题哦~',
          type: 'warning'
        })
        return
      }
      if (this.detailData.count == 0) {
        this.$message({
          message: '暂无相关题目，请等待添加',
          type: 'warning'
        })
        return
      }
      let url = this.$router.resolve({
        name: 'practice',
        query: {
          title: this.detailData.title,
          courseId: this.detailData.id
        }
      })
      window.open(url.href, '_blank')
    },
    openExam() {
      if(!this.userInfo) {
        let url = this.$router.resolve({
          name: 'login'
        })
        window.open(url.href)
        return
      }
      if(this.detailData.memBerStatus == 0 && this.detailData.free == 2) {
        this.$message({
          message: '需先加入学习才可参与答题哦~',
          type: 'warning'
        })
        return
      }
      if(this.detailData.memBerStatus == 0 && this.detailData.free == 1) {
        this.$message({
          message: '需购买课程才可参与答题哦~',
          type: 'warning'
        })
        return
      }
      if (this.detailData.singleCount == 0) {
        this.$message({
          type: 'warning',
          message: '暂无相关题目，请等待添加'
        })
        return
      }
      let url = this.$router.resolve({
        name: 'exam',
        query: {
          title: this.detailData.title,
          courseId: this.detailData.id
        }
      })
      window.open(url.href, '_blank')
    },
    toDetail(id) {
      let url = this.$router.resolve({
        name: 'lessonDetail',
        query: {
          id
        }
      })
      window.open(url.href, '_blank')
    }
  }
};
</script>

<style lang="scss" scoped>
.lesson-detail{
  min-height: 500px;
  .header{
    width: 100%;
    height: 388px;
    background: #ffffff;
    .header-content{
      width: 1120px;
      margin: 0 auto;
      .crumb{
        height: 32px;
        margin-top: 29px;
        color: #666666;
        font-size: 12px;
      }
      img{
        width: 510px;
        height: 287px;
      }
      .content-right{
        float: right;
        height: 287px;
        width: 590px;
        position: relative;
        .right-title{
          display: flex;
          width: 100%;
          position: relative;
          .title{
            font-size: 24px;
            color: #333333;
            line-height: 38px;
          }
        }
        .share{
          position: absolute;
          right: 80px;
          top: 274px;
          font-size: 14px;
          color: #666666;
          span{
            display: inline-block;
            vertical-align: middle;
            padding-left: 23px;
            height: 60px;
            cursor: pointer;
            i {
              display: inline-block;
              vertical-align: middle;
              margin-left: 4px;
              font-size: 14px;
              color: #b4b4b4;
            }
            .active {
              color: #FF4400;
            }
          }
          .fenxiang {
            &:hover .social-share {
              display: block;
            }
          }
          .social-share {
            display: none;
            position: absolute;
            right: -60px;
            top: 15px;
          }
        }
        .learn-mes{
          display: flex;
          position: relative;
          font-size: 14px;
          color:#999999;
          margin-top: 13px;
          span{
            margin-right: 20px;
          }
        }
        .des{
          width: 500px;
          height: 106px;
          background: rgba(245,245,245,1);
          margin-top: 20px;
          .des-text{
            padding: 16px 20px 0 17px;
            .des-title{
              color: #333333;
              font-size: 14px;
            }
            .text{
              width: 100%;
              height: 52px;
              font-size: 14px;
              color: #666666;
              align-items: center;
              line-height: 26px;
              padding-top: 6px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
        .price{
          font-size: 14px;
          display: inline-block;
          color: #666666;
          margin-top: 15px;
          span{
            font-size: 24px;
            color: #FF4400;
            font-weight: 700;
          }
        }
        .free {
          span {
            color: #3F8A38;
          }
        }
        .bottom{
          margin-top: 20px;
          line-height:40px;
          display: flex;
          .flex {
            display: flex;
          }
          .b1{
            margin-right: 16px;
            width: 121px;
            border: 1px solid #3f8a38;
            border-radius: 4px;
            padding-left:29px;
            color: #3f8a38;
            box-sizing: border-box;
            font-size: 16px;
            cursor: pointer;
          }
          .b2{
            width: 150px;
            background:#3f8a38;
            border-radius: 4px;
            padding-left:44px;
            color: #3f8a38;
            box-sizing: border-box;
            color: #ffffff;
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .content{
    width: 100%;
    background: #F5F5F5;
    .content-center{
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .content-left{
        margin: 20px 0px 53px 40px;
        background: #ffffff;
        min-height: 1149px;
        width: 860px;
        float: left;
        .lessondetail-nav{
          box-sizing: border-box;
          margin: 0 40px;
          border-bottom: 1px solid #E6E6E6;
          height: 69px;
          li{
            margin-top: 21px;
            line-height: 46px;
            display: inline-block;
            margin-right: 55px;
            color:#333333;
            font-size: 18px;
            cursor: pointer;
          }
          .active{
            color:#3F8A38;
            border-bottom: 2px solid #3F8A38;
            box-sizing: border-box;
          }
        }
        .lesson-intronduce{
          margin-top: 13px;
          padding: 0 44px 0 40px;
          h1{
            display: block;
            line-height: 52px;
            font-size: 18px;
            color: #333333;
            font-weight: 700;
          }
          .text{
            // text-indent: 32px;
            // color: #666666;
            // font-size: 16px;
            line-height: 30px;
            // p{
            //   text-indent: 4px;
            // }
          }
          .lesson-list {
            padding-bottom: 20px;
            li {
              position: relative;
              // height: 50px;
              line-height: 50px;
              padding: 0 10px;
              cursor: pointer;
              clear: both;
              &:hover {
                background: #F5F5F5;
              }
              span {
                display: inline-block;
                vertical-align: middle;
                margin-left: 10px;
              }
              .circle {
                width: 10px;
                height: 10px;
                margin-left: 0;
                border: 2px solid #999;
                border-radius: 50%;
                background: #fff;
              }
              .course-title {
                width: 580px;
                line-height: 20px;
              }
              .free {
                width: 40px;
                height: 26px;
                line-height: 26px;
                color: #fff;
                text-align: center;
                background: #3F8A38;
                border-radius: 4px;
              }
              .right {
                float: right;
                i {
                  margin-left: 10px;
                  display: inline-block;
                  vertical-align: top;
                  font-size: 20px;
                  color: #999;
                }
              }
            }
          }
          .btn-item {
            width: 200px;
            height: 40px;
            margin: 20px 0;
            line-height: 40px;
            border: 1px solid #3F8A38;
            font-size: 16px;
            color: #3F8A38;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
              background: #3F8A38;
              color: #fff;
            }
          }
          .rating {
            .title {
              font-size: 24px;
              color: #333;
            }
            .mine {
              display: flex;
              margin-top: 25px;
              .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                .iconyonghu1 {
                  font-size: 50px;
                  color: #ddd;
                }
              }
              .textarea {
                flex: 1;
                display: flex;
                margin-left: 18px;
                textarea {
                  box-sizing: border-box;
                  flex: 1;
                  padding: 20px;
                  font-family: 'MicrosoftYaHei';
                  font-size: 14px;
                  border: 4px solid #ddd;
                  border-right: none;
                }
                .button {
                  width: 40px;
                  height: 40px;
                  padding: 30px;
                  background: #3f8a38;
                  font-size: 16px;
                  color: #fff;
                  line-height: 22px;
                  letter-spacing: 4px;
                  cursor: pointer;
                }
              }
            }
            .all {
              margin-top: 20px;
              padding-bottom: 20px;
              &-top {
                padding: 15px 0;
                font-size: 18px;
                color: #333;
                border-bottom: 1px solid #ddd;
                .number {
                  margin-left: 10px;
                  font-size: 14px;
                  color: #3f8a38;
                }
              }
              .item {
                margin-top: 30px;
                display: flex;
                .avatar img{
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  .icon-user {
                    font-size: 50px;
                    color: #ddd;
                  }
                }
                .content {
                  flex: 1;
                  margin: 18px 0 0 18px;
                  background: #fff;
                  .name {
                    font-size: 14px;
                    color: #3f8a38;
                  }
                  .date {
                    margin-left: 12px;
                    color: #999;
                    font-size: 12px;
                  }
                  p {
                    margin-top: 10px;
                    line-height: 30px;
                    font-size: 14px;
                    color: #666;
                  }
                }
              }
            }
          }
        }
      }
      .content-right {
        margin: 20px 35px 0 0;
        float: right;
        // height:196px;
        width: 245px;
        background: #fff;
        .teacher-title {
          margin: 0 20px;
          border-bottom: 1px solid #E6E6E6;
          span {
            display: block;
            box-sizing: border-box;
            margin: 35px 0 16px 0;
            padding-left: 10px;
            font-size: 18px;
            color:#333333;
            border-left: 4px solid #3F8A38;
          }
        }
        .teacher {
          display: flex;
          // height: 127px;
          margin: 20px 0;
          align-items: center;
          img {
            display: inline-block;
            border-radius: 50%;
            height: 48px;
            width: 48px;
            margin: 0 12px 0 20px;
          }
          .text {
            flex: 1;
            .name {
              display: block;
              font-size: 14px;
              color:#333333;
              margin-bottom: 9px;
            }
            .fame {
              display: block;
              color: #999999;
              font-size: 12px;
            }
          }
        }
      }
      .stu-dynamics {
        float: right;
        height: 298px;
        width: 245px;
        background: #ffffff;
        margin:20px 35px 0 0;
        .title{
          box-sizing: border-box;
          border-bottom: 1px solid #E6E6E6;
          margin: 0 20px;
          span{
            display: block;
            box-sizing: border-box;
            margin: 35px 0 16px 0;
            padding-left: 10px;
            font-size: 18px;
            color:#333333;
            border-left: 4px solid #3F8A38;
          }
        }
        .text{
          margin:30px 0 0 20px;
          width: 189px;
        }
        li{
          display: block;
          font-size: 12px;
          line-height: 16px;
          color: #333333;
          padding-bottom: 25px;
          span{
            color: #999999;
          }
        }
      }
      .related-class{
        width: 245px;
        min-height: 300px;
        max-height: 615px;
        float:right;
        background:#ffffff;
        margin: 20px 35px 0 0;
        overflow: hidden;
        .title{
          margin: 0 20px;
          border-bottom: 1px solid #E6E6E6;
          span{
            display: block;
            box-sizing: border-box;
            margin: 35px 0 16px 0;
            padding-left: 10px;
            font-size: 18px;
            color:#333333;
            border-left: 4px solid #3F8A38;
          }
        }
        .lesson{
          padding: 14px 20px 6px 20px;
          &lastchild{
            padding-bottom: none;
          }
          .img-box {
            height: 115px;
            width: 205px;
            overflow: hidden;
            cursor: pointer;
            &:hover img {
              transform: scale(1.1, 1.1);
            }
          }
          img{
            height: 115px;
            width: 205px;
            transition: all .3s ease 0s;
          }
          h3{
            display: block;
            margin-top: 8px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51,51,51,1);
            cursor: pointer;
            &:hover {
              color: #3F8A38;
            }
          }
          span{
            color:#999999;
            font-size: 12px;
            margin-top: 8px;
            display: block;
          }
        }
      }
    }
  }
}
</style>
<style>
  .social-share .social-share-icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
</style>
