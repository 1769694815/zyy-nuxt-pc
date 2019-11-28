<template>
  <div class="container">
    <div class="top">
      <div class="header">
        <div class="header-left">
          <span class="title">订单支付</span>
          <span
            style="cursor:pointer"
            @click="$router.push({ name: 'lessonDetail', query: { id: itemId }})">返回介绍页</span>
          <span
            style="cursor:pointer"
            @click="$router.push({ name: 'index' })">首页</span>
        </div>
        <div class="header-right">
          <span @click="$router.push({ name: 'personal'})">
            {{ userInfo.nickName }}
          </span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="num">
        <span class="title">订单支付：</span>{{ detail.sn }}
      </div>
      <div class="line">
        <div class="line-item">
          <span class="title">购买商品：</span>{{ detail.title }}
        </div>
        <div class="line-item">
          <span class="title">支付金额：</span>
          <span class="price">&yen;{{ detail.price }}</span>
        </div>
      </div>
      <div class="border" />
      <div class="pay">
        <div class="title">支付方式：</div>
        <div class="pic">
          <div
            :class="['ali', { 'active' : payType == 1 }]"
            @click="selectPayType(1)">
            <img src="~/assets/images/ali.png">
            <span>支付宝支付</span>
          </div>
          <div
            :class="['weixin', { 'active' : payType == 2 }]"
            @click="selectPayType(2)">
            <img src="~/assets/images/wx.png">
            <span>微信支付</span>
          </div>
          <!-- <img src="~/assets/images/pay.png"> -->
        </div>
      </div>
      <div
        v-if="payType == 1"
        class="button"
        @click="payfor">去支付</div>
    </div>
    <div v-html="payInfo" />
    <div
      v-if="showModal"
      class="mask"
      @click="showModal = false">
      <p>请使用微信扫码支付</p>
      <img
        ref="qrcode"
        :src="pic">
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  // middleware: 'userAuth',
  data() {
    return {
      userInfo: '',
      payInfo: '',
      itemId: this.$route.query.itemId,
      price: this.$route.query.price,
      itemType: this.$route.query.itemType,
      detail: '',
      payType: 1, // 支付方式  1：支付宝    2： 微信
      pic: '',
      showModal: false
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    if(!this.userInfo) {
      this.$router.push({
        name: 'login'
      })
    }
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$axios.post('/yxs/api/web/user/createOrder', {
        itemType: this.itemType,
        itemId: this.itemId,
        price: this.price,
        userToken: this.userInfo.userToken
      }).then(res => {
        console.log('创建订单', res)
        this.detail = res.data
        this.getDetail()
      })
    },
    selectPayType (type) {
      if (type == 1) {
        this.payType = 1
      } else if (type == 2) {
        this.payType = 2  
        this.getWXDeteail()
      }
    },
    // 获取微信支付详情
    getWXDeteail() {
      const _this =this
      var windowUrl = window.URL || window.webkitURL;//处理浏览器兼容性
      let xhr = new XMLHttpRequest()
      let formData = new FormData()
      formData.append('orderSn', this.detail.sn)
      xhr.open('post', '/api/yxs/api/web/user/wxPcPay')
      xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get('zyy_accessToken'))
      xhr.setRequestHeader("userToken", this.userInfo.userToken)
      xhr.responseType = 'blob'
      xhr.onload = function () {
        if (this.status == 200) {
          _this.showModal = true
          var blob = this.response;
          _this.pic = windowUrl.createObjectURL(blob)
				}
      }
      xhr.send(formData)

      // let config = {
      //   headers: {
      //     'userToken': this.userInfo.userToken
      //   }
      // }
      // this.$axios.post('', {
      //   orderSn: this.detail.sn,
      // }, config).then(res => {
      //   let reader = new FileReader()
      //   reader.onload = (res) => {
      //     this.pic = e.target.result
      //   }
      // })
    },
    // 获取支付宝支付详情
    getDetail() {
      this.$axios.post('/yxs/api/web/user/payOrder', {
        price: this.detail.price,
        orderSn: this.detail.sn,
        payWay: 'APP_PAY',
        userToken: this.userInfo.userToken
      }).then(res => {
        console.log(res.data)
        this.payInfo = res.data.payInfo
      })
    },
    payfor() {
      document.punchout_form.submit()
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    background: #f5f5f5;
    min-height: 600px;
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
      &-right {
        span {
          cursor: pointer;
          &:hover {
            color: #3f8a38;
          }
        }
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
        .pic {
          margin-top: 20px;
          display: flex;
          >div {
            width: 130px;
            height: 45px;
            box-sizing: border-box;
            border: 1px solid #dedede;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            cursor: pointer;
            &.ali {
              >img {
                margin-right: 2px;
              }
            }
            &.weixin {
              >img {
                margin-right: 6px;
              }
            }
            &.active {
              border: 0;
              background: url('../assets/images/select.png') no-repeat;
            }
          }
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
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 20px;
      color: #fff;
      margin-top: 80px;
      margin-bottom: 20px;
    }
  }
</style>
