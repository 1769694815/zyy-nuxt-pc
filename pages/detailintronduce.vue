<template>
  <div class="detail">
    <Navbar/>
    <div class="header-content">
      <div class="crumb">
        首页>课程中心>培训项目>药膳养生师
      </div>
      <img :src="lessonList.src">
      <div class="content-right">
        <el-scrollbar style="height: 100%">
          <div class="enroll-class">
            <ul class="enroll-ul">
              <li 
                v-for="(item, index) in timeList"
                :key="index"
                :class="enrollBorder"
                class="enroll-text">
                <span 
                  :class="enrollBg"
                  class="enrolls">{{ enrolls }}</span>
                <span class="title">{{ item.title }}</span>
                <span class="time">截止至{{ item.time }}</span>
              </li>
            </ul>
          </div>
        </el-scrollbar>
        <div class="bill">
          <span class="price">￥{{ lessonList.price }}</span>
          <span class="count">{{ lessonList.count }}人已报名</span>
        </div>
        <div class="way">
          授课方式：  <span>线上+线下结合</span>
        </div>
        <div class="lessons">
          班级课程：  
          <ul>
            <li 
              v-for="(item,index) in lessonList.lessons"
              :key="index"
              class="lesson">
              {{ item }}
            </li>
          </ul>
        </div>
        <div 
          class="bottom" >立即报名</div>
      </div>
    </div>
    <div class="content">
      <div class="content-center">
        <div class="center-left">
          <div class="intronduce">
            <div class="left-nav">
              <ul>
                <li 
                  v-for="(item,index) in navList"
                  :key="index"
                  :class="tab===(index+1)? 'active' : ''"
                  @click="switchTab(index)">{{ item.label }}
                </li>
              </ul>
            </div>
            <span class="desc">{{ lessonList.desc }}</span>
            <img :src="lessonList.src">
          </div>
          <div class="popular">
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
          </div>
        </div>
        <div class="center-right">
          <div class="teacher">
            <div class="teacher-title">
              授课讲师
            </div>
            <ul>
              <li 
                v-for="(item,index) in teacherList"
                :key="index">
                <img :src="item.src">
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
                <img :src="item.src">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="showModal"
      class="mask-container">
      <div class="m-container">
        <div class="m-header">
          <div class="m-title">购买确认</div>
          <div
            class="m-close"
            @click="handleClose">
            <i class="iconfont icon-guanbixiaoxitishi"/>
          </div>
        </div>
        <div class="m-content">
          <div class="content-top">
            <img :src="lessonList.src">
            <div class="top-right">
              <h1>{{ lessonList.title }}</h1>
              <span class="price">￥{{ lessonList.price }}</span>
              <div class="lesson">
                班级课程： 
                <ul>
                  <li 
                    v-for="(item,index) in lessonList.lessons"
                    :key="index">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="content-bottom">
            <span>*温馨提示：请确认班级，报名成功后可学习该班全部课程</span>
            <div 
              class="button" 
              @click="handleOpen()">确认报名</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import Navbar from "~/components/navBar.vue";

export default {
  components:{
    Navbar
  },
  data(){
    return{
      tab: 1,
      navList:[
        {label:"项目介绍", value: 1},
        {label:"课程介绍", value: 2},
      ],
      memberList:[
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        
      ],
      teacherList: [
        { 
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          name: 'dooroBear'
        },
      ],
      lessonList:{
        src: require('~/assets/images/wbc.jpg'),
        price: 699,
        count: 1000,
        title:'药膳养生师（中级）2018年秋季班',
        lessons:['中医理论','药学'],
        desc:'药膳是以药物和食物为原料，经过烹饪加工制成的一种具有食疗作用的膳食。它是中国传统的医学知识与烹调经验相结合的产物。它“寓医于食”，既将药物作为食物，又将食物赋以药用，药借食力，食助药威；既具有营养价值，又可防病治病、保健强身、延年益寿。',
      },
      trainingList:[
        {src: require('~/assets/images/wbc.jpg')},
        {src: require('~/assets/images/wbc.jpg')},
        {src: require('~/assets/images/wbc.jpg')}
      ],
      timeList: [
        {
          title:'药膳养生师（中级）2018年秋季班',
          time:'2018-12-25',
          number:1,
        },
        {
          title:'药膳养生师（中级）2017年秋季班',
          time:'2018-12-26',
          number: 0,
        },
        {
          title:'药膳养生师（中级）2016年秋季班',
          time:'2018-12-27',
          number: 0,
        },
        {
          title:'药膳养生师（中级）2015年秋季班',
          time:'2018-12-28',
          number: 0,
        },
        ],
    }
  },
  computed:{
    
    enrollBorder(){
      if(this.timeList.number>0){
        return 'enrolling';
      }else{
        return 'closed';
      }
    },
    enrolls(){
      if(this.timeList.number===1){
        return `报名中`;
      }else{
        return `已结束`;
      }
    },
    enrollBg(){
      if(this.timeList.number>0){
        return 'enrollss';
        }else{
        return 'close';
      }
    }
  },
  methods:{
    switchTab(index){
      this.tab=index+1;
    },
  }
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
    .content-right{
      float: right;
      width: 680px;
      overflow: hidden;
      .el-scrollbar_thumb{
        display: none;
        .enroll-class{
          width: 640px;
          overflow-x: auto;
          .enroll-ul{
            width: 1300px;
            overflow: hidden;
            .enroll-text{
              position:relative;
              width: 284px;
              height: 94px;
              float:left;
              margin-right: 20px;
              border-radius: 8px;
              &.enrolling{
                border: 1px solid #3F8A38;
              }
              &.closed{
                border: 1px solid #cccccc;
              }
              .enrolls{
                color: #ffffff;
                font-size: 12px;
                padding: 5px;
                font-weight: 500;
                transform: rotate(-45deg);
                &.enrollss{
                  background: #3F8A38;
                }
                &.close{
                  background: #cccccc;
                }  
              }
              .title{
                display: block;
                color: #333333;
                font-size: 16px;
                font-weight: 500;
                margin: 5px 9px 19px 29px;
              }
              .time{
                display: block;
                margin-left: 29px;
                color: #666666;
                font-size: 12px;
                font-weight: 500px;
              }
            }  
          }
        }        
      }
      .bill{
        width:312px;
        margin-top: 24px;
        height: 24px;
        .price{
          float: left;
          font-size: 24px;
          color: #ff4400;
          font-weight: 700;
        }
        .count{
          font-size: 14px;
          color: #333333;
          float: right;
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
          margin-left: 8px;
          text-align: center;
          width: 76px;
          line-height:28px;
          background:#E2F5E0;
          font-size: 14px;
          color:#3F8A38;
          border-radius: 4px;
        }
      }
      .bottom{
        width:150px;
        line-height:40px;
        background:#3F8A38;
        color: #fff;
        margin-top: 15px;
        border-radius: 4px;
        text-align: center;
        font-size: 16px;        
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
      .center-left{
        float: left;
        width: 870px;
        margin-top: 30px;
        .intronduce{
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
          .desc{
            display: block;
            width: 699px;
            margin: 30px 0 0 30px;
            color:#666666;
            line-height: 30px;
            font-size: 14px;
          }
          img{
            width: 490px;
            height: 276px;
            margin: 30px 0 30px 30px;
            display: block;
          }
        }
        .popular{
          width: 870px;
          height: 100%;
          margin-top: 30px;
          background: #ffffff;
          .popular-title{
            line-height: 61px;
            box-sizing: border-box;
            border-bottom: 1px solid #dedede;
            font-size: 14px;
            color:#3F8A38;
            padding-left: 30px;
          }
          ul{
            display: flex;
            padding: 20px 0;
            .training{
              flex: 1;
              height:140px; 
              width: 250px;
              margin-left:30px;
              border-radius: 6px;
            }
          }
        }
      }
      .center-right{
        float: right;
        margin-top:30px;
        .teacher{
          width: 300px;
          height: 100%;
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
            color: #333333;
            font-size: 14px;

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
  .mask-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, .6);
    .m-container {
      position: absolute;
      top: 337px;
      width: 590px;
      height: 331px;
      background: #fff;
      border-radius: 4px;
      .m-header {
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #3F8A38;
        .m-close {
          cursor: pointer;
        }
      }
      .m-content {
        .content-top{
          display: flex;
          padding: 30px 0;
          margin: 0 21px 0 19px;
          border-bottom: 1px solid #dedede;
          
          img{
            height:112px;
            width:200px;
            border-radius: 6px;
            margin-right: 20px;
          }
          .top-right{
            h1{
              line-height: 38px;
              font-size: 18px;
              color: #333333;
            }
            .price{
              font-size: 16px;
              line-height: 38px;
              color: #ff4400;
              font-weight: 700;
            }
            .lesson{
              display: flex;
              line-height: 28px;
              li{
                display: inline-block;
                padding: 0 12px;
                border-radius:4px;
                color: #3F8A38;
                background: #E2F5E0;
                margin-left: 8px;
                                           
              }
            }
          }
        }
        .content-bottom{
          padding: 20px 19px;
          color: #666666;
          font-size: 14px;
          .button{
            margin: 30px auto 0 auto;
            line-height: 34px;
            width: 120px;
            background: #3F8A38;
            color: #ffffff;
            text-align: center;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
