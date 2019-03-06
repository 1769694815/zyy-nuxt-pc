<template>
  <div class="content-detail">
    <div class="header">我的订单>订单详情</div>
    <div class="detail">
      <div class="item-content">
        <img src="~/assets/images/wbc.jpg">
        <div class="item-info">
          <div class="item-title">大美中医启续篇——时间</div>
          <div class="item-price">￥180</div>
        </div>
      </div>
      <div class="item-flex">
        <div class="label">班级课程：</div>
        <div class="tags">
          <span>中医药理论</span>
          <span>药学</span>
        </div>
      </div>
      <div class="item-flex">
        <div class="label">订单编号：</div>
        <div class="value">NS2019030655SD</div>
      </div>
      <div class="item-flex">
        <div class="label">创建时间：</div>
        <div class="value">2019-01-03</div>
      </div>
      <div class="item-flex">
        <div class="label">支付方式：</div>
        <div class="value">后台添加</div>
      </div>
      <div class="item-flex">
        <div class="label">有效期至：</div>
        <div class="value">2019-01-03</div>
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
  .content-detail {
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
