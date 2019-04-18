<template>
  <div>
    <personal-tab :tab-index="tabIndex" />
    <div class="content">
      <div class="header">
        <div class="title">我的订单</div>
      </div>
      <div class="list">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            class="item"
            @click="toDetail(item.orderId)">
            <div class="item-header">
              <div class="number">订单编号：{{ item.sn }}</div>
              <div class="date">创建时间：{{ item.createTime }}</div>
            </div>
            <div class="item-content">
              <img :src="item.itemPic">
              <div class="item-info">
                <div class="item-title">{{ item.itemName }}</div>
                <div class="item-price">￥{{ item.amount }}</div>
              </div>
            </div>
          </li>
        </ul>
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
      size: 10,
      current: 1,
      userInfo: '',
      list: []
    }
  },
  head() {
    return {
      title: '个人中心'
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        name: 'personal-orderDetail',
        query: {
          id
        }
      })
    },
    getList() {
      this.userInfo = Cookies.getJSON('zyy_userInfo')
      let params = {
        size: this.size,
        current: this.current,
        userToken: this.userInfo.userToken
      }
      this.$axios('/yxs/api/web/user/getOrdersPageByUserId', {
        params
      }).then(res => {
        this.list = res.data.records
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
    min-height: 569px;
    flex: 1;
    padding: 0 15px;
    border: 1px solid #e4ecf3;
    border-radius: 4px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    color: #46C37B;
    font-size: 16px;
    border-bottom: 1px solid #F5F5F5;
    .title {
      border-bottom: 2px solid #46C37B;
    }
  }
  .list {
    padding-bottom: 40px;
    .item {
      margin-top: 20px;
      border: 1px solid #f2f2f2;
      &-header {
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        height: 36px;
        line-height: 36px;
        color: #666;
        font-size: 14px;
      }
      &-content {
        display: flex;
        padding: 8px;
        background: #f5f5f5;
        cursor: pointer;
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
    }
  }
</style>
