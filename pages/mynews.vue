<template>
  <div class="mynews-container">
    <Navbar/>
    <div class="mynews-content">
      <div class="container-left">
        <div class="mynew">
          <div class="text">我的消息</div>
        </div>
        <div class="personal-set">
          <span>个人设置</span>
          <ul>
            <li><i class="iconfont icon-yonghu"/>基础信息</li>
            <li><i class="iconfont icon-tupian"/>头像设置</li>
            <li><i class="iconfont icon-shimingrenzheng"/>实名认证</li>
            <li><i class="iconfont icon-lock"/>安全设置</li>
            <li><i class="iconfont icon-youxiang"/>邮箱设置</li>
          </ul>
        </div>
      </div>
      <div class="container-right">
        <div class="mynews-nav">
          <ul>
            <li 
              v-for="(item,index) in navList"
              :key="index"
              :class="tab === (index+1)? 'active' : ''" 
              @click="switchTab(index)"> {{ item.label }} </li>
          </ul>
        </div>
        <div class="center">
          <ul>
            <li
              v-for="(item,index) in contentList"
              :key="index"
              class="list-item">
              <img :src="item.src">
              <div class="content">
                <div class="text">
                  <h2 class="title">{{ item.title }}</h2>
                  <p class="desc">{{ item.desc }}</p>
                </div>
                <div class="time">
                  <span>{{ item.time }}</span>
                  <span class="dot"/>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/navBar.vue";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      tab: 1,
      navList:[
        {label:"学习反馈", value: 1},
        {label:"课程动态", value: 2},
        {label:"活动通知", value: 3},
        {label:"交易提醒", value: 4}
      ],
      contentList:[
        {
          src: require('~/assets/images/wbc.jpg'),
          title: "中医药《罗马宣言》发布，“世界中医药日”诞生",
          desc: "2018年11月17日至18日，由世界中医药学会联合会主办的第十五届世界中医药大会...",
          time:"09:40"

        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: "中医药《罗马宣言》发布，“世界中医药日”诞生",
          desc: "2018年11月17日至18日，由世界中医药学会联合会主办的第十五届世界中医药大会...",
          time:"09:40"

        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: "中医药《罗马宣言》发布，“世界中医药日”诞生",
          desc: "2018年11月17日至18日，由世界中医药学会联合会主办的第十五届世界中医药大会...",
          time:"09:40"

        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: "中医药《罗马宣言》发布，“世界中医药日”诞生",
          desc: "2018年11月17日至18日，由世界中医药学会联合会主办的第十五届世界中医药大会...",
          time:"09:40"

        },
      ]
    }
  },
  methods: {
    switchTab(index){
      this.tab = index+1;
    }
  }
};
</script>

<style  lang="scss" scoped>
.mynews-container {
  .mynews-content{
    background: rgba(255, 255, 255, 1);
    width: 1140px;
    display: flex;
    margin: 0 auto;
    .container-left {
      margin-top: 30px;
      flex: 1;
      .mynew {
        height: 77px;
        width: 270px;
        border-radius: 4px;
        border: 1px solid rgba(228, 236, 243, 1);
        box-sizing: border-box;
        .text {
          margin-top: 20px;
          height: 37px;
          line-height: 37px;
          border-left: 2px solid rgba(70, 195, 123, 1);
          padding-left: 20px;
          color: rgba(70, 195, 123, 1);
          font-size: 12px;
        }
      }
      .personal-set{
        width: 270px;
        height: 240px;
        border: 1px solid rgba(228, 236, 243, 1);
        box-sizing: border-box;
        margin-top: 20px;
        border-radius: 4px;
        font-size: 12px;
        span{
          display: block;
          margin: 24px 0 0 20px;
          color: #a29ea9;
        }
        ul{
          margin-left: 33px;
          li{
            margin-top: 22px;
            font-size: 11px;
            color:#6f6f6f;
            i{
              vertical-align: top;
              margin-right: 5px;
              font-size: 14px;
              color: #616161;
            }
          }
        }
      }
    }
    .container-right{
      margin: 30px 0 52px 0;
      width: 850px;
      height: 550px;
      border: 1px solid rgba(228, 236, 243, 1);
      border-radius: 4px;
      box-sizing: border-box;
      .mynews-nav{
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
      ul{
        margin: 0 16px;
        .list-item{
          box-sizing: border-box;
          border-bottom: 1px solid rgba(228, 236, 243,1);
          display: flex;
          height: 122px;
          padding-top: 20px;
          &:last-child{
            border: none;
          }
          img{
            display: block;
            height: 80px;
            width: 142px;
            border-radius: 4px;
          }
          .content{
            display: flex;
            width: 100%;
            margin-top: 19px;
            .text{
              flex: 1;
              align-items: center;
              margin: 0 17px;
              .title{
                font-size: 16px;
              }
              .desc{
                margin-top: 14px;
                color: #666;
                font-size: 14px;
              }
            }
            .time{
              float: right;
              position: relative;
              font-size: 14px;
              font-weight: 500;
              color: rgba(153,153,153,1);
              .dot{
                position: absolute;
                right: 1px;
                top: 19px;
                display: block;
                width: 8px;
                height: 8px;
                background: rgba(254,68,0,1);
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
