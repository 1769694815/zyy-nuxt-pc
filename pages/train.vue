<template>
  <div style="width:100%">
    <v-header />
    <nav-bar :tab-index="tabIndex"/>
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
                  :key="index"
                  :class="{active:firstActive == index}"
                  @click="changeFirst(item, index)">
                  {{ item.name }}
                </span>
              </td>
            </tr>
            <tr>
              <th>课程筛选：</th>
              <td>
                <span
                  v-for="(item, index) in courses"
                  :key="index"
                  :class="{active:secondActive == index}"
                  @click="changeSecond(item, index)">
                  {{ item.name }}
                </span>
              </td>
            </tr>
            <tr>
              <th>排序：</th>
              <td>
                <span
                  v-for="(item, index) in orders"
                  :key="index"
                  :class="{active:thirdActive == index}"
                  @click="changeThird(item, index)">
                  {{ item.label }}
                </span>
              </td>
            </tr>
          </table>
          <ul v-show="classType == 2">
            <li
              v-for="(item, index) in result"
              :key="index"
              class="common-class">
              <img :src="item.middle_picture">
              <div class="info">
                <div class="title">{{ item.title }}</div>
                <div
                  v-if="item.courses"
                  class="tag">
                  <span
                    v-for="(tag, index) in item.courseName.split(',')"
                    :key="index">
                    {{ tag }}
                  </span>
                </div>
                <div class="price">￥{{ item.price }}</div>
                <div class="foot">
                  <span>{{ item.studentNum }}人已报名</span>
                  <span>截止报名：{{ item.closeDate }}</span>
                </div>
                <div class="button">立即报名</div>
                <div class="button">报名结束</div>
                <div class="button">已加入本班</div>
              </div>
            </li>
          </ul>
          <ul
            v-show="classType == 1"
            class="train-ul">
            <li
              v-for="(item, index) in result"
              :key="index" 
              class="train-class">
              <img :src="item.middle_picture">
              <div class="content">
                <div class="title">{{ item.title }}</div>
                <div class="info">
                  <span
                    v-if="item.price == 0"
                    class="free">免费
                  </span>
                  <span
                    v-else
                    class="price">￥{{ item.price }}
                  </span>
                  <span class="number">{{ item.student_num }}人学过</span>
                </div>
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
import Header from '~/components/layout/header.vue'
import NavBar from '~/components/navBar.vue'
import LessonSection from '~/components/recommend/lesson.vue'
import TrainSection from '~/components/recommend/train.vue'
export default {
  components: {
    NavBar,
    LessonSection,
    TrainSection,
    'v-header': Header
  },
  data() {
    return {
      tabIndex: 2,
      current: 1,
      size: 10,
      categoryId: '',
      orderByClause: 1,
      firstActive: 2,
      secondActive: 0,
      thirdActive: 0,
      classType: 1,
      recommendLessons: [],
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
      types: [],
      courses: [],
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
      result: []
    }
  },
  mounted() {
    this.getList('', 1)
    this.getTrainList()
    this.getRecommendLessons()
  },
  methods: {
    changeFirst(item, index) {
      this.firstActive = index
      this.secondActive = 0
      this.getList(item, 1)
    },
    changeSecond(item, index) {
      this.secondActive = index
      this.getList(item, 2)
    },
    changeThird(item, index) {
      this.thirdActive = index
      this.orderByClause = index == 0 ? 1 : 2
      this.getList(item)
    },
    getList(item, i) {
      this.classType = item.type ? 2 : 1
      console.log('item', item)
      if(i == 1) {
        this.courses = [{
          name: '全部',
          id: 0
        }]
        if(item.children && item.children.length > 0) {
          item.children.map(item => {
            this.courses.push(item)
          })
        }
      }
      this.$axios('/yxs/api/web/course/more', {
        params: {
          current: this.current,
          size: this.size,
          categoryId: item.id == 0 ? 10 : item.id,
          orderByClause: this.orderByClause,
          type: this.classType,
          userToken: ''
        }
      }).then(res => {
        if(this.types && this.types.length == 0) {
          this.types = [{
            name: '全部',
            id: 0
          }]
          res.data.allTrainCate.map(item => {
            item.type = 2
            this.types.push(item)
          })
          res.data.allCate.map(item => {
            this.types.push(item)
          })
        }
        this.result = res.data.list.records
      })
    },
    // 推荐培训项目
    getTrainList() {
      this.$axios('/yxs/api/web/course/getRecommendTrainList', {
        params: {
          type: 1
        }
      }).then(res => {
        if(res.code == 0) {
          this.recommendTrains = res.data
        }
      })
    },
    // 推荐课程
    getRecommendLessons() {
      this.$axios('/yxs/api/web/doctor/recommendList').then(res => {
        if(res.code == 0) {
          this.recommendLessons = res.data
        }
      })
    },
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
          cursor: pointer;
          span {
            margin-left: 20px;
            padding: 8px;
            font-size: 14px;
            text-align: center;
            &.active {
              background: #3F8A38;
              font-size: 14px;
              color: #fff;
            }
          }
        }
      }
      .common-class {
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
      .train-ul {
        width: 930px;
        overflow: hidden;
      }
      .train-class {
        display: inline-block;
        align-items: center;
        margin-top: 20px;
        margin-left: 19px;
        &:nth-child(4n + 1){
          margin-left: 0;
        }
        img {
          display: block;
          width: 218px;
          height: 122px;
          background: rgba(98,98,98,1);
          border-radius: 6px;
        }
        .content {
          padding: 0 10px;
          .title {
            margin-top: 15px;
            font-size: 14px;
            color: #333;
          }
          .info {
            margin-top: 9px;
            font-size: 0;
            .free {
              display: inline-block;
              width: 34px;
              height: 19px;
              line-height: 19px;
              font-size: 12px;
              text-align: center;
              color: #fff;
              background: #3F8A38;
              border-radius: 2px;
            }
            .price {
              display: inline-block;
              height: 19px;
              line-height: 19px;
              padding: 0 6px;
              font-size: 12px;
              background: #FBB03B;
              color: #fff;
              border-radius: 2px;
            }
            .lesson {
              margin-left: 12px;
              font-size: 12px;
              color: #999;
            }
            .number {
              font-size: 12px;
              color: #999;
              float: right;
            }
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
