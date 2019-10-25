<!--
 * @Author: chenjg
 * @Date: 2019-10-25 10:06:32
 * @LastEditTime: 2019-10-25 12:01:48
 * @LastEditors: chenjg
 * @Description: 
 * @输出一段不带属性的自定义信息
 -->
<template>
  <div class="container">
    <div class="wrap">
      <div class="welcome">
        <div class="left">
          HI，欢迎来到中医药在线医学自考专题!
        </div>
        <div class="right">
          <span class="login">我要登录</span>
          <span class="register">免费注册</span>
        </div>
      </div>
    </div>
    <div class="header">
      <img
        src="~/assets/images/logo.png"
        alt="">
      <div class="text">全国中医药考试领军平台</div>
    </div>
    <div class="main">
      <div class="main-wrap">
        <div class="tips">
          <span>医学自考专题</span>
          <span>中药学/药学</span>
        </div>
        <div class="main-pic">
          <img
            src="~/assets/images/main-pic.png"
            alt="">
        </div>
        <div class="list">
          <div class="list-item">
            <img
              src="~/assets/images/item-icon1.png"
              alt="">
            <div class="title">国家认可  正规学历</div>
            <p>由教育局备案，重点大学颁发的正规证书，学信网终身可查、全国事业单位高度认可</p>
          </div>
          <div class="list-item">
            <img
              src="~/assets/images/item-icon2.png"
              alt="">
            <div class="title">高含金量  仅次统招</div>
            <p>含金量仅次与统招，医院，国企，外企均高度认可，参加公职考试，升职加薪的硬文凭</p>
          </div>
          <div class="list-item">
            <img
              src="~/assets/images/item-icon3.png"
              alt="">
            <div class="title">学费低  人人都能学</div>
            <p>单门考前辅导课程仅需180元，含名师授课视频、课后习题和模拟试卷等资料，大大降低了学习门槛</p>
          </div>
          <div class="list-item">
            <img
              src="~/assets/images/item-icon4.png"
              alt="">
            <div class="title">时间短  适合上班族</div>
            <p>江西本地最优秀的中医药大学老师+专业报考团队为您保驾护航，最短仅需1.5年，圆你名校本科梦</p>
          </div>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <div class="title">
        中药学/药学 <span>考试科目</span>一览
      </div>
      <div class="table-flex">
        <div class="table1">
          1
        </div>
        <div class="table2">
          2
        </div>
      </div>
      <div class="tips">
        <span>* 标红科目</span>为符合条件可进行免考
      </div>
    </div>
    <div class="section-wrap">
      <div class="section-content">
        <div class="section-item">
          1
        </div>
        <div class="section-item">
          2
        </div>
        <div class="section-item">
          3
        </div>
        <div class="section-item">
          4
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    background: #fff;
  }
  .wrap {
    width: 100%;
    height: 40px;
    background: #f5f5f5;
    line-height: 40px;
  }
  .welcome {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 14px;
      color: #888;
    }
    .right {
      font-size: 14px;
      .login {
        color: #888;
        margin-right: 20px;
      }
      .register {
        color: #ff9257;
      }
    }
  }
  .header {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 80px;
    img {
      width: 235px;
      height: 59px;
    }
    .text {
      color: #666;
      font-size: 20px;
    }
  }
  .main {
    position: relative;
    width: 100%;
    height: 700px;
    background: url('../assets/images/main-bg.png') top center no-repeat;
    &-wrap {
      width: 1200px;
      margin: 0 auto;
      .tips {
        width: 148px;
        height: 64px;
        padding: 6px 0;
        background: #ff8a4b;
        text-align: center;
        border-radius: 0 0 30px 30px;
        span {
          display: block;
          line-height: 32px;
          font-size: 16px;
          color: #fff;
        }
      }
      .main-pic {
        margin-top: 40px;
        margin-left: 90px;
      }
      .list {
        position: absolute;
        bottom: -108px;
        display: flex;
        &-item {
          width: 285px;
          height: 368px;
          margin-left: 20px;
          padding: 0 50px;
          box-sizing: border-box;
          background: #fff;
          box-shadow: 0px 0px 15px 0px 
      rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          text-align: center;
          &:first-child {
            margin-left: 0;
          }
          img {
            width: 86px;
            height: 86px;
            margin-top: 40px;
          }
          .title {
            margin-top: 40px;
            font-size: 20px;
            color: #333;
          }
          p {
            margin-top: 20px;
            line-height: 26px;
            font-size: 16px;
            color: #999;
            text-align: left;
          }
        }
      }
    }
  }
  .table-wrap {
    width: 1200px;
    margin: 0 auto;
    padding-top: 200px;
    padding-bottom: 60px; 
    .title {
      position: relative;
      padding-bottom: 38px;
      font-size: 52px;
      font-weight: 700;
      color: #333;
      text-align: center;
      border-bottom: 1px solid #ddd;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 8px;
        background: #01c6ae;
      }
      span {
        color: #ff8a4b;
      }
    }
    .table-flex {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      .table1, .table2 {
        width: 590px;
        height: 422px;
        background: #f5f5f5;
      }
    }
    .tips {
      text-align: center;
      margin-top: 35px;
      color: #333;
      font-size: 16px;
      span {
        color: #e60012;
      }
    }
  }
  .section-wrap {
    width: 100%;
    height: 806px;
    background: #eee;
    .section-content {
      width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      .section-item {
        display: inline-block;
        width: 590px;
        height: 330px;
        margin-top: 50px;
        background: #fff;
      }
    }
  }
</style>