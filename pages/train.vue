<template>
  <div style="width:100%">
    <nav-bar />
    <div class="train-container">
      <div class="crumb">
        首页>课程中心
      </div>
      <div class="train-content">
        <div class="content-left">
          <table class="table">
            <tr>
              <th>学习类别：</th>
              <td>
                <span
                  v-for="(item, index) in types"
                  :key="index">
                  {{ item.label }}
                </span>
              </td>
            </tr>
            <tr>
              <th>课程筛选：</th>
              <td>
                <span
                  v-for="(item, index) in courses"
                  :key="index">
                  {{ item.label }}
                </span>
              </td>
            </tr>
            <tr>
              <th>排序：</th>
              <td>
                <span
                  v-for="(item, index) in orders"
                  :key="index">
                  {{ item.label }}
                </span>
              </td>
            </tr>
          </table>
          <ul>
            <li
              v-for="(item, index) in result"
              :key="index">
              <img :src="item.src">
              <div class="info">
                <div class="title">{{ item.title }}</div>
                <div class="tag">
                  <span
                    v-for="(tag, index) in item.tags"
                    :key="index">
                    {{ tag }}
                  </span>
                </div>
                <div class="price">{{ item.price }}</div>
                <div class="foot">
                  <span>{{ item.number }}人已报名</span>
                  <span>截止报名：{{ item.date }}</span>                  
                </div>
                <div class="button">立即报名</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="content-right">
          <lesson-section :data-array="recommendLessons" />
          <train-section
            :data-array="recommendTrains"
            class="section" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '~/components/navBar.vue'
import LessonSection from '~/components/recommend/lesson.vue'
import TrainSection from '~/components/recommend/train.vue'
export default {
  components: {
    NavBar,
    LessonSection,
    TrainSection
  },
  data() {
    return {
      recommendLessons: [
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        }
      ],
      recommendTrains: [
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中药炮制厂',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中药炮制厂',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '中药炮制厂',
          teacher: '彭丽丽',
          lessons: 12,
          number: 236
        }
      ],
      types: [
        {
          label: '全部',
          value: 1
        },
        {
          label: '培训项目',
          value: 1
        },
        {
          label: '自学考试',
          value: 1
        },
        {
          label: '中医基础理论',
          value: 1
        },
        {
          label: '中医研究所',
          value: 1
        },
        {
          label: '名医师承',
          value: 1
        },
        // {
        //   label: '中医健康',
        //   value: 1
        // }
      ],
      courses: [
        {
          label: '全部',
          value: 1
        },
        {
          label: '西学中',
          value: 2
        },
        {
          label: '其他',
          value: 3
        }
      ],
      orders: [
        {
          label: '最新',
          value: 1
        },
        {
          label: '人气',
          value: 2
        }
      ],
      result: [
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          tags: ['中医药理论', '药学'],
          price: 699,
          number: 12,
          date: '2019-12-12'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          tags: ['中医药理论', '药学'],
          price: 699,
          number: 12,
          date: '2019-12-12'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          tags: ['中医药理论', '药学'],
          price: 699,
          number: 12,
          date: '2019-12-12'
        },
        {
          src: require('~/assets/images/wbc.jpg'),
          title: '大美中医启续篇——时间',
          tags: ['中医药理论', '药学'],
          price: 699,
          number: 12,
          date: '2019-12-12'
        },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .train-container {
    width: 1200px;
    margin: 0 auto;
    .crumb {
      margin-top: 28px;
      margin-bottom: 18px;
      font-size: 12px;
      color: #666;
    }
    .train-content {
      display: flex;
    }
    .content-left {
      flex: 0 0 930px;
      width: 930px;
      table {
        width: 100%;
        border: 1px solid #f5f5f5;
        text-align: center;
        tr {
          height: 46px;
          line-height: 46px;
          border-bottom: 1px solid #f5f5f5;
        }
        th {
          width: 122px;
          background: #fff;
          color: #666;
          font-size: 14px;
        }
        td {
          text-align: left;
          padding: 0 40px;
          border: 1px solid #E5E5E5;
          background: #f5f5f5;
          font-size: 0;
          span {
            margin-left: 20px;
            padding: 8px;
            font-size: 14px;
          }
        }
      }
      li {
        display: flex;
        position: relative;
        margin-top: 30px;
        img {
          width: 285px;
          height: 160px;
          border-radius: 6px;
        }
        .info {
          flex: 1;
          margin-left: 20px;
          .title {
            margin-top: 10px;
            font-size: 18px;
            color: #333;
          }
          .tag {
            margin-top: 20px;
            font-size: 0;
            span {
              display: inline-block;
              padding: 7px 10px;
              font-size: 14px;
              color: #3F8A38;
              background: #E2F5E0;
              margin-right: 8px;
              border-radius: 4px;
            }
          }
          .price {
            margin-top: 20px;
            font-size: 16px;
            color: #FF4400;
            font-weight: 700;
          }
          .foot {
            position: absolute;
            bottom: 0;
            font-size: 14px;
            color: #666;
            span {
              margin-right: 30px;
            }
          }
          .button {
            position: absolute;
            top: 10px;
            right: 30px;
            width: 108px;
            height: 34px;
            line-height: 34px;
            border-radius: 4px;
            color: #fff;
            background: #3F8A38;
            text-align: center;
          }
        }
      }
    }
    .content-right {
      width: 240px;
      margin-left: 30px;
      .section {
        margin-top: 30px;
      }
    }
  }
</style>
