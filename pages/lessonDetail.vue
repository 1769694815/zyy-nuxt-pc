<template>
  <div style="width:100%">
    <v-header />
    <div class="lesson-detail">
      <Navbar />
      <div class="header">
        <div class="header-content">
          <div class="crumb">
            首页>课程详情
          </div>
          <img :src="detailData.middlePicture">
          <div class="content-right">
            <div class="right-title">
              <span class="title"> {{ detailData.title }} </span>
              <div class="share">
                <span>收藏<i/></span>
                <span>分享<i class="iconfont icon-fenxiang" /></span>
              </div>
            </div>
            <div class="learn-mes">
              <span>共{{ detailData.lessonNum }}节</span>
              <span>{{ detailData.studentNum }}人学过</span>
            </div>
            <div class="des">
              <div class="des-text">
                <h2 class="des-title">课程简介 ：</h2>
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
                  {{ detailData.brife }}

                </div>
              </div>
            </div>
            <div class="price">
              价格：<span>{{ detailData.price }}</span> 中医币
            </div>
            <div class="bottom">
              <div
                class="b1"
                @click="toPlay">免费试看</div>
              <div
                class="b2"
                @click="buyLesson">购买课程</div>
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
              <div v-show="tab == 1">
                <!-- <h1>课程介绍</h1> -->
                <div class="text">
                  {{ detailData.brife }}
                </div>
              </div>
              <ul v-show="tab == 2">
                <li
                  v-for="(item, index) in detailData.lesson"
                  :key="index"
                  @click="$router.push({ name: 'play', query: { courseId: id }})">
                  <span class="circle" />
                  <span
                    v-if="item.free == 2"
                    class="free">免费</span>
                  <span>{{ item.title }}</span>
                  <div class="right">
                    {{ timestr(item.length) }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="content-right">
            <div class="teacher-title"><span>授课老师</span></div>
            <div
              v-for="(item,index) in detailData.teacherList"
              v-if="index < 1"
              :key="index"
              class="teacher">
              <img :src="item.pic">
              <div class="text">
                <span class="name">{{ item.name }}</span>
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
                :key="index"
                class="lesson">
                <img :src="item.pic">
                <h3>{{ item.title }}</h3>
                <span>{{ item.studentNum }}</span>
              </li>
            </ul>
          </div>
          <div class="foot-img">
            <img src="~/assets/images/foot-img.jpg">
          </div>
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
export default {
  components: {
    Navbar,
    BuyModal,
    'v-header': Header
  },
  data(){
    return{
      tab: 1,
      id: this.$route.query.id,
      detailData: {},
      showModal: false,
      navList:[
        { label: "课程概览", value: 1 },
        { label: "课程视频", value: 2 },
        { label: "评论", value: 3 }
        // { label: "笔记", value: 4 }
      ]
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
    this.getDetail()
  },
  methods: {
    switchTab(index) {
      this.tab = index + 1;
    },
    getDetail() {
      this.$axios('/yxs/api/web/course/courseDetail', {
        params: {
          id: this.id
        }
      }).then(res => {
        this.detailData = res.data
      })
    },
    toPlay() {
      this.$router.push({
        name: 'play',
        query: {
          courseId: this.id
        }
      })
    },
    hideModal() {
      this.showModal = false
    },
    buyLesson() {
      this.showModal = true
    }
  }
};
</script>

<style lang="scss" scoped>
.lesson-detail{
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
        .right-title{
          display: flex;
          width: 100%;
          position: relative;
          .title{
            font-size: 24px;
            color: #333333;
            line-height: 38px;
          }
          .share{
            position: absolute;
            right: 80px;
            top: 14px;
            font-size: 14px;
            color: #666666;
            span{
              padding-left: 23px;
            }
          }
        }
        .learn-mes{
          display: flex;
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
        .bottom{
          margin-top: 20px;
          line-height:40px;
          display: flex;
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
            text-indent: 32px;
            color: #666666;
            font-size: 16px;
            line-height: 36px;
            p{
              text-indent: 4px;
            }
          }
          ul {
            li {
              position: relative;
              height: 50px;
              line-height: 50px;
              padding: 0 10px;
              cursor: pointer;
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
              }
            }
          }
        }
      }
      .content-right{
        margin: 20px 35px 0 0;
        float: right;
        height:196px;
        width: 245px;
        background: #fff;
        .teacher-title{
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
        .teacher{
          display: flex;
          height:127px;
          align-items: center;
          img{
            display:block;
            border-radius: 50%;
            height:57px;
            width: 57px;
            margin: 0 12px 0 20px;
          }
          .text{
            width: 100%;
           
            .name{
              display: block;
              font-size: 14px;
              color:#333333;
              margin-bottom: 9px;
            }
            .fame{
              display: block;
              color: #999999;
              font-size: 12px;
            }
          }
        }
      } 
      .stu-dynamics{
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
        height: 615px;
        float:right;
        background:#ffffff;
        margin: 20px 35px 0 0;
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
          img{
            height: 115px;
            width: 205px;
          }
          h3{
            display: block;
            margin-top: 8px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51,51,51,1);
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
