<template>
  <div class="container">
    <div class="top">
      <div class="header">
        <div class="header-left">
          <span class="title">订单支付</span>
          <span style="cursor:pointer">返回介绍页</span>
          <span
            style="cursor:pointer"
            @click="$router.push({ name: 'index' })">首页</span>
        </div>
        <div class="header-right">
          用户名：
        </div>
      </div>
    </div>
    <div class="content">
      <div class="num">
        <span class="title">订单支付：</span>1
      </div>
      <div class="line">
        <div class="line-item">
          <span class="title">购买商品：</span>1
        </div>
        <div class="line-item">
          <span class="title">支付金额：</span>
          <span class="price">￥669</span>
        </div>
      </div>
      <div class="border" />
      <div class="pay">
        <div class="title">支付方式：</div>
      </div>
      <div
        class="button"
        @click="payfor">去支付</div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      userInfo: ''
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
  },
  methods: {
    payfor() {
      this.$axios.post('/yxs/api/web/user/payOrder', {
        price: 800.00,
        orderSn: '2019032511533759ab',
        payWay: 'APP_PAY',
        userToken: this.userInfo.userToken
      }).then(res => {
        console.log(res.data.payInfo)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    background: #f5f5f5;
    .top {
      background: #fff;
    }
    .header {
      width: 1080px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      font-size: 12px;
      color: #666;
      span {
        margin-left: 20px;
        display: inline-block;
      }
      .title {
        font-size: 16px;
        color: #000;
        font-weight: 700;
      }
    }
    .content {
      width: 580px;
      height: 380px;
      margin: 30px auto 0;
      background: #fff;
      padding: 60px 250px;
      .num {
        .title {
          font-size: 14px;
          color: #000;
          font-weight: 700;
        }
      }
      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .title {
          font-size: 14px;
          color: #000;
          font-weight: 700;
        }
        .price {
          color: #ff4400;
          font-size: 24px;
          font-weight: 700;
        }
      }
      .border {
        margin-top: 20px;
        height: 1px;
        background: #f3f3f3;
      }
      .pay {
        margin-top: 30px;
        .title {
          font-size: 14px;
          color: #000;
          font-weight: 700;
        }
      }
      .button {
        width: 120px;
        height: 30px;
        margin-top: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background: #3f8a38;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  
</style>
