<template>
  <div style="width:100%">
    <v-header />
    <div class="detail">
      <Navbar/>
      <div class="header-content">
        <div class="crumb">
          首页>课程中心>培训项目
        </div>
        <img :src="detailData.pclogo">
        <div class="content-right">
          <div class="enroll-class">
            <ul>
              <li
                v-for="(item, index) in detailData.classList"
                :key="index"
                :class="classIndex == index ? 'active' : ''"
                class="enroll-text"
                @click="changeClass(item, index)">
                <div
                  :class="item.closeStatus == 1 ? 'active' : ''"
                  class="enrolls">
                  <span>{{ status(item.closeStatus) }}</span>
                </div>
                <div class="title">{{ item.title }}</div>
                <div class="time">截止报名： {{ item.closeDate }}</div>
              </li>
            </ul>
          </div>
          <div class="bill">
            <span>培训费：
              <span
                v-if="classInfo.price != 0"
                class="price">￥{{ classInfo.price }}</span>
              <span
                v-else
                class="price">免费</span>
            </span>
            <span class="count">{{ classInfo.count }}人已报名</span>
          </div>
          <div class="way">
            授课方式：<span>{{ teachMethod }}</span>
          </div>
          <div class="lessons">
            班级课程：
            <ul v-if="classInfo.courseName">
              <li
                v-for="(item,index) in classInfo.courseName.split(',')"
                :key="index"
                class="lesson">
                {{ item }}
              </li>
            </ul>
            <ul v-else>
              暂无课程
            </ul>
          </div>
          <div
            v-if="!userInfo"
            class="bottom">
            <div
              v-if="classInfo.closeStatus == 2"
              class="b1">报名结束</div>
            <div
              v-if="classInfo.closeStatus == 0"
              class="b1">未开始</div>
            <div
              v-if="classInfo.closeStatus == 1"
              class="b3"
              @click="signup">立即报名</div>
          </div>
          <div
            v-else
            class="bottom">
            <div
              v-if="classInfo.memberStatus == 1 && classInfo.closeStatus == 1"
              class="bottom">
              <div class="b1">已加入本班</div>
              <div
                class="b2"
                @click="toplay">继续学习</div>
            </div>
            <div
              v-if="classInfo.memberStatus == 0 && classInfo.closeStatus == 1"
              class="bottom">
              <div
                class="b3"
                @click="signup">立即报名</div>
            </div>
            <div
              v-if="classInfo.closeStatus == 2"
              class="b1">报名结束</div>
            <div
              v-if="classInfo.closeStatus == 0"
              class="b1">未开始</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-center">
          <div class="intronduce">
            <div class="left-nav">
              <ul>
                <li 
                  v-for="(item,index) in navList"
                  :key="index"
                  :class="tab == (index + 1) ? 'active' : ''"
                  @click="switchTab(index)">{{ item.label }}
                </li>
              </ul>
            </div>
            <div class="class-intronduce">
              <div
                v-show="tab == 1"
                class="intro"
                v-html="detailData.introducepc" />
              <!-- {{ detailData.introducepc }} -->
              <ul v-show="tab == 2">
                <li 
                  v-for="(item, index) in courseList "
                  :key="index">
                  <img :src="item.middlePicture">
                  <div class="class-right">
                    {{ item.title }}
                    <div class="price">
                      ￥{{ item.price }}
                      <span>{{ item.student_num }}人学过</span>
                    </div>
                    <p>{{ item.brife }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="popular">
            <div class="popular-title">
              热门培训
            </div>
            <ul>
              <li 
                v-for="(item,index) in trainingList"
                :key="index">
                <img 
                  :src="item.src" 
                  class="training">
              </li>
            </ul>
          </div> -->
          <div class="center-right">
            <div class="teacher">
              <div class="teacher-title">
                授课讲师
              </div>
              <ul>
                <li 
                  v-for="(item,index) in teacherList"
                  :key="index">
                  <img :src="item.pic">
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <div class="member">
              <div class="member-title">
                班级新成员
              </div>
              <ul>
                <li 
                  v-for="(item,index) in memberList"
                  :key="index">
                  <img
                    v-if="item.avatar"
                    :src="item.avatar">
                  <img
                    v-else
                    src="~/assets/images/user-logo.png">
                  {{ item.userName }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <buy-modal
      v-show="showModal"
      :data-obj="classInfo"
      :detail="detailData"
      :user="userInfo"
      @hide-modal="hideModal" />
  </div>
</template>

<script>
import Navbar from "~/components/navBar.vue";
import Header from '~/components/layout/header.vue'
import BuyModal from '~/components/modal/buyModal.vue'
import Cookies from 'js-cookie'
export default {
  components:{
    Navbar,
    BuyModal,
    'v-header': Header
  },
  data() {
    return {
      tab: 1,
      showModal: false,
      classIndex: 0,
      id: this.$route.query.id,
      detailData: {},
      classInfo: '',
      userInfo: '',
      navList:[
        {label:"项目介绍", value: 1},
        {label:"课程介绍", value: 2},
      ],
      courseList: [],
      memberList:[],
      teacherList: [],
      trainingList:[
        {src: require('~/assets/images/wbc.jpg')},
        {src: require('~/assets/images/wbc.jpg')},
        {src: require('~/assets/images/wbc.jpg')}
      ],
      lessonList: []
    }
  },
  computed:{
    status() {
      return function(s) {
        if(s == 0) {
          return '未开始'
        } else if (s == 1) {
          return '报名中'
        } else {
          return '已结束'
        }
      }
    },
    teachMethod() {
      if(this.classInfo.teachingMethod == 0) {
        return '线上授课'
      } else if(this.classInfo.teachingMethod == 1) {
        return '线下教学'
      } else {
        return '线上线下相结合'
      }
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo') || ''
    this.getDetail()
  },
  methods:{
    switchTab(index){
      this.tab = index + 1;
    },
    getDetail() {
      this.$axios('/yxs/api/web/course/trainDetail', {
        params: {
          id: this.id,
          userToken: this.userInfo.userToken || ''
        }
      }).then(res => {
        this.detailData = res.data
        this.classInfo = res.data.classList[0]
        this.getList(res.data.classList[0].roomId)
      })
    },
    getList(roomId) {
      this.$axios('/yxs/api/web/course/courseTeaching', {
        params: {
          classroomId: roomId,
          userToken: this.userInfo.userToken || ''
        }
      }).then(res => {
        this.teacherList = res.data.list
        this.memberList = res.data.userList
        this.courseList = res.data.courseList
      })
    },
    // 切换班级
    changeClass(item, index) {
      this.classIndex = index
      this.classInfo = this.detailData.classList[index]
      this.getList(item.roomId)
    },
    signup() {
      if(this.userInfo) {
        this.showModal = true
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    toplay() {
      // if(this.userInfo) {
      //   this.$router.push({ name: 'play' })
      // }
    },
    hideModal() {
      this.showModal = false
    },
  },
};
</script>

<style lang="scss" scoped>
.detail{
  .header-content{
    width:1200px;
    height: 367px;
    margin: 0 auto;
    .crumb{
      margin: 29px 0 19px 0;
    }
    img{
      height:276px;
      width: 490px;
      border-radius: 6px;
    }
    .content-right {
      float: right;
      width: 680px;
      overflow: hidden;
      .enroll-class{
        height: 94px;
        width: 1300px;
        ul {
          display: flex;
          width: 680px;
          overflow-x: auto;
        }
        li{
          flex: 0 0 284px;
          position: relative;
          width: 284px;
          height: 94px;
          margin-right: 20px;
          overflow: hidden;
          border: 1px solid #dedede;
          border-radius: 8px;
          cursor: pointer;
          &.active {
            border: 1px solid #3F8A38;
          }
          .enrolls {
            position: absolute;
            left: -20px;
            width: 100px;
            height: 14px;
            line-height: 14px;
            font-size: 12px;
            background:#dedede;
            color: #fff;
            transform: rotate(-45deg);
            span {
              display: inline-block;
              width: 100%;
              margin-left: 15px;
            }
            &.active {
              background: #3F8A38;
            }
          }
          .title {
            height: 50px;
            margin-top: 20px;
            margin-left: 28px;
            color: #333;
            font-size: 16px;
            line-height: 20px;
          }
          .time {
            margin-left: 28px;
            // margin-top: 20px;
            color: #666;
            font-size: 12px;
          }
        }
      }
      .bill{
        width: 312px;
        margin-top: 24px;
        height: 24px;
        color: #999;
        .price{
          display: inline-block;
          // float: left;
          font-size: 24px;
          color: #ff4400;
          font-weight: 700;
        }
        .count{
          float: right;
          display: inline-block;
          font-size: 14px;
          color: #333333;
        }
      }
      .way{
        font-size: 14px;
        color: #999999;
        margin-top: 19px;
        span{
          color: #333333;
        }
      }
      .lessons{
        position: relative;
        display: flex;
        margin: 12px 12px 0 0;
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        .lesson{
          float: left;
          margin-right: 8px;
          padding: 0 8px;
          text-align: center;
          // width: 76px;
          line-height:28px;
          background:#E2F5E0;
          font-size: 14px;
          color:#3F8A38;
          border-radius: 4px;
        }
      }
      .bottom{
        position: relative;
        width:328px;
        line-height:40px;
        color: #fff;
        margin-top: 15px;
        text-align: center;
        font-size: 16px;
        .b1{
          float: left;
          width: 138px;
          background: #cccccc;
          border-radius: 4px;
        }     
        .b2{
          float:left;
          width: 150px;
          margin-left: 20px;
          background:#3F8A38;
          border-radius: 4px;
        }
        .b3 {
          float: left;
          width: 150px;
          background:#3F8A38;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
  .content{
    background:#F6F6F6;
    width: 100%;
    position: relative;
    overflow: hidden;
    .content-center{
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .intronduce{
        float: left;
        margin: 30px 0;
        height: 100%;
        width: 870px;
        background: #ffffff;
        .left-nav{
          box-sizing: border-box;
          border-bottom: 1px solid #E6E6E6;
          height: 60px;
          ul{
            margin-left:30px;
            li{
              line-height: 58px;
              display: inline-block;
              margin-right: 55px;
              color:#333333;
              font-size: 14px;
              cursor: pointer;
            }
            .active{
              color:#3F8A38;
              border-bottom: 2px solid #3F8A38;
              box-sizing: border-box;
            }
          }
        }
        .class-intronduce{
          padding: 0 19px 31px 30px;
          min-height: 200px;
          .intro {
            margin-top: 20px;
            line-height: 24px;
            text-indent: 30px;
          }
          li{
            display: flex;
            align-items: center;
            margin-top: 30px;
            img{
              flex: 0 0 218px;
              width: 218px;
              height: 122px;
              border-radius: 6px;
              margin-right: 19px;
            }
            .class-right{
              color:#333333;
              font-size: 16px;
              margin-top:14px;
              .price{
                font-size: 12px;
                color:#3F8A38;
                line-height: 30px;
                span{
                  color:#999999;
                  margin-left: 20px;
                }
              }
              p{
                color: #666666;
                line-height: 24px;
                font-size: 14px;
              }
            }
          }
        }
      }
      .center-right{
        float: right;
        margin-top:30px;
        .teacher{
          width: 300px;
          // height: 100%;
          min-height: 100px;
          padding-bottom: 30px;
          background: #ffffff;
          .teacher-title{
            padding-left: 30px;
            line-height:61px;
            border-bottom: 1px solid #dedede;
            font-size: 14px;
            color: #3F8A38;
          }
          li{
            display: flex;
            margin: 20px 0 0 30px;
            line-height: 50px;
            color: #3F8A38;
            font-size: 14px;
            font-weight: 700;
            img{
              width: 50px;
              height: 50px;
              border-radius:50%;
              margin-right: 18px;

            }
          }
        }
        .member{
          width: 300px;
          height: 100%;
          padding-bottom: 30px;
          background: #ffffff;
          margin-top: 30px;
          .member-title{
            padding-left: 30px;
            line-height:61px;
            border-bottom: 1px solid #dedede;
            font-size: 14px;
            color: #3F8A38;
          }
          ul{
            width: 300px;
            padding:20px;
            display:flex;
            flex-wrap: wrap;
            li{
              width: 45px;
              margin: 10px;
              color: #333333;
              font-size: 14px;
              overflow: hidden;
              text-align: center;
              img{
                width: 45px;
                height: 45px;
                border-radius:50%;
                margin-bottom: 9px;
                background: #b5b5b5;
              }
            }
          }
        }
      }
    }
  }
}
</style>