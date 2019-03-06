<template>
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
          @click="toDetail">
          <div class="item-header">
            <div class="number">订单编号：{{ item.id }}</div>
            <div class="date">创建时间：{{ item.date }}</div>
          </div>
          <div class="item-content">
            <img :src="item.src">
            <div class="item-info">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-price">{{ item.price }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: 'NS2019030655SD',
          date: '2019-01-03',
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          price: '￥180'
        },
        {
          id: 'NS2019030655SD',
          date: '2019-01-03',
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          price: '￥180'
        },
        {
          id: 'NS2019030655SD',
          date: '2019-01-03',
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          price: '￥180'
        },
      ]
    }
  },
  methods: {
    toDetail() {
      this.$router.push({
        name: 'personal-orderDetail'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
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
