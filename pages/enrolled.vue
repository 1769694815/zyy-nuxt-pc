<template>
  <div class="detail">
    <Navbar/>
    <div class="header-content">
      <div class="crumb">
        首页>课程中心>培训项目>药膳养生师
      </div>
      <img :src="lessonList.src">
      <div class="content-right">
        <div class="enroll-class">
          <ul>
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
              v-for="(item,index) in lessonList.lesson"
              :key="index"
              class="lesson">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="bottom">
          <div class="b1">已加入本班</div>
          <div class="b2">继续学习 ></div>
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
                :class="tab===(index+1)? 'active' : ''"
                @click="switchTab(index)">{{ item.label }}
              </li>
            </ul>
          </div>
          <div class="class-intronduce">
            <ul>
              <li 
                v-for="(item, index) in classList "
                :key="index">
                <img :src="item.src">
                <div class="class-right">
                  {{ item.title }}
                  <div class="price">
                    {{ item.price }} 
                    <span>{{ item.number }}人学过</span>
                  </div>
                  <p>{{ item.desc }}</p>
                </div>
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
      tab: 2,
      navList:[
        {label:"项目介绍", value: 1},
        {label:"课程介绍", value: 2},
      ],
      classList: [
        {
          src: require('~/assets/images/wbc.jpg'),
          title:'大美中医启续篇———时间',
          price: '免费',
          number:'236',
          desc:'《金匮要略》是我国东汉著名医学家张仲景所著《伤寒杂病论》的杂病部分，也是我国现存最早的一部论述杂病诊治的专...'         
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title:'大美中医启续篇———时间',
          price: '免费',
          number:'236',
          desc:'《金匮要略》是我国东汉著名医学家张仲景所著《伤寒杂病论》的杂病部分，也是我国现存最早的一部论述杂病诊治的专...'         
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title:'大美中医启续篇———时间',
          price: '免费',
          number:'236',
          desc:'《金匮要略》是我国东汉著名医学家张仲景所著《伤寒杂病论》的杂病部分，也是我国现存最早的一部论述杂病诊治的专...'         
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title:'大美中医启续篇———时间',
          price: '免费',
          number:'236',
          desc:'《金匮要略》是我国东汉著名医学家张仲景所著《伤寒杂病论》的杂病部分，也是我国现存最早的一部论述杂病诊治的专...'         
        },
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
        lesson:['中医理论','药学'],
        desc:'药膳是以药物和食物为原料，经过烹饪加工制成的一种具有食疗作用的膳食。它是中国传统的医学知识与烹调经验相结合的产物。它“寓医于食”，既将药物作为食物，又将食物赋以药用，药借食力，食助药威；既具有营养价值，又可防病治病、保健强身、延年益寿。',
      },
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
        return 'enrolling';
        }else{
        return 'close';
      }
    }
  },
  methods:{
    switchTab(index){
      this.tab=index+1;
    }
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
    .content-right{
      float: right;
      width: 680px;
      overflow: hidden;
      .enroll-class{
        height: 94px;
        width: 1300px;
        li{
          width: 284px;
          height: 94px;
          float:left;
          margin-right: 20px;
          overflow: hidden;
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
        margin-top: 30px;
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
          li{
            display: flex;
            margin-top: 30px;
            img{
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