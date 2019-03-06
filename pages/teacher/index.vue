<template>
  <div class="teacher">
    <ul>
      <li
        v-for="(item, index) in contentList"
        :key="index">
        <img :src="item.src">
        <div class="content">
          <div class="title">{{ item.title }}</div>
          <div class="info">
            <span
              v-if="item.isfree"
              class="free">
              免费
            </span>
            <span
              v-else
              class="price">
              ￥{{ item.price }}
            </span>
            <span class="lesson">共{{ item.lessons }}节</span>
            <span class="number">{{ item.number }}人学过</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contentList: [
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          lessons: 12,
          price: 96,
          number: 12,
          isfree: true
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          lessons: 12,
          price: 96,
          number: 12
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          lessons: 12,
          price: 96,
          number: 12
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          lessons: 12,
          price: 96,
          number: 12
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .teacher {
    width: 850px;
    padding-bottom: 30px;
    border: 1px solid rgba(228, 236, 243, 1);
    border-radius: 4px;
    box-sizing: border-box;
    li {
      margin: 30px 0 0 30px;
      display: inline-block;
      width: 243px;
      img {
        width: 243px;
        height: 136px;
        border-radius: 6px;
      }
      .content {
        padding: 0 10px;
        .title {
          margin-top: 12px;
          font-size: 14px;
          color: #333;
        }
        .info {
          position: relative;
          margin-top: 12px;
          font-size: 0;
          color: #999;
          span {
            display: inline-block;
            font-size: 12px;
          }
          .free {
            color: #3F8A38;
          }
          .price {
            color: #FF4400;
          }
          .lesson {
            margin-left: 9px;
          }
          .number {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
</style>
