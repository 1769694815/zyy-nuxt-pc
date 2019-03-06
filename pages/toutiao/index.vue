<template>
  <div class="toutiao-index">
    <ul class="toutiao-nav">
      <li
        v-for="(item, index) in navList"
        :key="index"
        :class="tab === (index + 1) ? 'active' : ''"
        @click="switchTab(index)">
        {{ item.label }}
      </li>
    </ul>
    <div class="content-list">
      <div
        v-for="(item, index) in listData"
        :key="index"
        class="list-item"
        @click="toDetail">
        <img :src="item.src">
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
          <div class="foot">
            <span>{{ item.date }}</span>
            <span class="number">{{ item.number }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-more">
      再显示10条新闻
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 1,
      navList: [
        { label: '最新内容', value: 1 },
        { label: '文化活动', value: 2 },
        { label: '中医健康', value: 3 },
        { label: '行业资讯', value: 4 },
        { label: '通知公告', value: 5 },
        { label: '教育热点', value: 6 },
        { label: '进社区', value: 7 }
      ],
      listData: [
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中国“藏医药浴法”被列入联合国非遗名单',
          type: '文化活动',
          desc: '当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法...',
          date: '2018-12-10',
          number: 516
        }
      ],
    }
  },
  methods: {
    switchTab(index) {
      this.tab = index + 1
    },
    toDetail() {
      this.$router.push({
        name: 'toutiao-detail'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .toutiao-nav {
    width: 100%;
    height: 45px;
    background: #f6f6f6;
    li {
      display: inline-block;
      width: 108px;
      height: 45px;
      box-sizing: border-box;
      line-height: 45px;
      text-align: center;
      font-size: 16px;
      color: #333;
      cursor: pointer;
    }
    .active {
      background: #fff;
      border: 1px solid #f6f6f6;
      border-top: 4px solid #3f8a38;
      color: #3f8a38;
    }
  }
  .content-list {
    .list-item {
      display: flex;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
      &:last-child {
        border: none;
      }
      img {
        display: inline-block;
        width: 224px;
        height: 126px;
        margin-right: 16px;
        border-radius: 6px;
      }
      .info {
        .title {
          font-size: 18px;
          color: #333
        }
        .desc {
          margin-top: 15px;
          font-size: 14px;
          color: #999;
          line-height: 24px;
        }
        .foot {
          margin-top: 10px;
          font-size: 12px;
          color: #999;
        }
        .number {
          margin-left: 20px;
        }
      }
    }
  }
  .btn-more {
    width: 100%;
    height: 50px;
    margin: 14px 0 20px 0;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #999;
    border: 1px solid #ddd;
    cursor: pointer;
  }
</style>
