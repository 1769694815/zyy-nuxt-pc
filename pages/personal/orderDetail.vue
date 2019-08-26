<template>
  <div>
    <personal-tab :tab-index="tabIndex" />
    <div class="content-detail">
      <div class="header">我的订单>订单详情</div>
      <div class="detail">
        <div class="item-content">
          <img :src="detail.itemPic">
          <div class="item-info">
            <div class="item-title">{{ detail.itemName }}</div>
            <div class="item-price">&yen;{{ detail.amount }}</div>
          </div>
        </div>
        <div class="item-flex">
          <div class="label">班级课程：</div>
          <div
            v-if="detail.courseName"
            class="tags">
            <span
              v-for="(item, index) in detail.courseName.split(',')"
              :key="index">
              {{ item }}
            </span>
          </div>
        </div>
        <div class="item-flex">
          <div class="label">订单编号：</div>
          <div class="value">{{ detail.sn }}</div>
        </div>
        <div class="item-flex">
          <div class="label">创建时间：</div>
          <div class="value">{{ detail.createTime }}</div>
        </div>
        <div class="item-flex">
          <div class="label">支付方式：</div>
          <div class="value">{{ detail.payWay }}</div>
        </div>
        <div class="item-flex">
          <div class="label">有效期至：</div>
          <div class="value">{{ detail.endDate }}</div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import PersonalTab from '~/components/mine/personalTab.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    PersonalTab
  },
  data() {
    return {
      tabIndex: 2,
      id: this.$route.query.id,
      detail: '',
      userInfo: ''
    }
  },
  head() {
    return {
      title: '个人中心'
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$axios('/yxs/api/web/user/getOrdersById', {
        params: {
          id: this.id,
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        this.detail = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .content-detail {
    flex: 1;
    padding: 0 18px 20px 18px;
    border: 1px solid #e4ecf3;
    border-radius: 4px;
  }
  .header {
    height: 50px;
    line-height: 50px;
    color: #666;
    font-size: 14px;
    border-bottom: 1px solid #f5f5f5;
  }
  .item-content {
    display: flex;
    padding: 8px;
    background: #f5f5f5;
    img {
      width: 150px;
      height: 84px;
      border-radius: 6px;
    }
    .item-info {
      margin-left: 10px;
    }
    .item-title {
      margin-top: 10px;
      font-size: 16px;
      color: #333;
    }
    .item-price {
      margin-top: 20px;
      color: #FF4400;
    }
  }
  .item-flex {
    display: flex;
    align-items: center;
    height: 30px;
    margin-top: 15px;
    margin-left: 9px;
    .label {
      font-size: 14px;
      color: #999;
    }
    .tags {
      font-size: 0;
      span {
        display: inline-block;
        margin-left: 8px;
        padding: 7px 10px;
        background: #E2F5E0;
        color: #3F8A38;
        font-size: 14px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .value {
      font-size: 14px;
      color: #333;
    }
  }
</style>
