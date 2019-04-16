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
                  :class="{active:categoryId == item.id}"
                  @click="changeFirst(item, index, true)">
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
                  :class="{active:item.id == cid}"
                  @click="changeSecond(item.id, index)">
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
              class="common-class"
              @click="toTrainDetail(item.id)">
              <img :src="item.middlePicture">
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
              <div
                class="img-box"
                @click="toLessonDetail(item.id)">
                <img :src="item.middle_picture">
              </div>
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
      title: '自学考试',
      tabIndex: 2,
      current: 1,
      size: 30,
      categoryId: this.$route.query.fid || 53, // 默认53,自学考试id
      cid: this.$route.query.cid || 0,
      orderByClause: 1,
      // firstActive: 2,
      // firstId: this.$route.query.fid || 53,
      secondActive: 0,
      thirdActive: 0,
      classType: 1,
      recommendLessons: [],
      recommendTrains: [],
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
  head() {
    return {
      title: this.title
    }
  },
  mounted() {
    this.getCourseType()
    this.getTrainList()
    this.getRecommendLessons()
  },
  methods: {
    changeFirst(item, index, flag) {
      if(flag) {
        this.cid = 0
      }
      if(item.id == 1) {
        let url = this.$router.push({
          name: 'western'
        })
      } else {
        this.categoryId = item.id
        // this.firstActive = index
        // this.secondActive = 0
        this.courses = [{
          name: '全部',
          id: 0
        }]
        if(item.children && item.children.length > 0) {
          item.children.map(item => {
            this.courses.push(item)
          })
        }
        if(this.cid) {
          this.getList(this.cid, 2)
        } else {
          this.getList(item.id, 1)
        }
      }
    },
    changeSecond(id, index) {
      // this.secondActive = index
      this.cid = id
      if(id == 0) {
        this.getList(this.categoryId, 1)
      } else {
        this.getList(id, 2)
      }
    },
    changeThird(item, index) {
      this.thirdActive = index
      this.orderByClause = index == 0 ? 1 : 2
      this.getList(item.id, 3)
    },
    getList(id, i) {
      this.$axios('/yxs/api/web/course/more', {
        params: {
          current: this.current,
          size: this.size,
          categoryId: id || this.categoryId,
          orderByClause: this.orderByClause,
          type: this.classType,
          userToken: ''
        }
      }).then(res => {
        this.result = res.data.list.records
      })
    },
    getCourseType() {
      this.$axios('/yxs/api/web/course/getCourseType').then(res => {
        this.types = [{
          name: '全部',
          id: 0
        }]
        res.data.allClassTypeCate.map(item => {
          item.type = 2
          this.types.push(item)
        })
        res.data.allCate.map(item => {
          this.types.push(item)
          if(item.id == this.categoryId) {
            this.changeFirst(item, 2)
          }
        })
        // this.changeFirst(res.data.allCate[0], 2)
      })
    },
    // 推荐培训项目
    getTrainList() {
      this.$axios('/yxs/api/web/course/getRecommendTrainList', {
        params: {
          type: ''
        }
      }).then(res => {
        if(res.code == 0) {
          this.recommendTrains = res.data.records
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
    // 进课程详情
    toLessonDetail(id) {
      let url = this.$router.resolve({
        name: 'lessonDetail',
        query: {
          id
        }
      })
      window.open(url.href, '_blank')
    },
    // 进培训详情
    toTrainDetail(id) {
      let url = this.$router.resolve({
        name: 'trainDetail',
        query: {
          id
        }
      })
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .train-container {
    width: 1200px;
    min-height: 600px;
    margin: 0 auto 30px;
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
            // white-space: nowrap;
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
        width: 218px;
        display: inline-block;
        align-items: center;
        margin-top: 20px;
        margin-left: 19px;
        overflow: hidden;
        &:nth-child(4n + 1){
          margin-left: 0;
        }
        .img-box {
          width: 218px;
          height: 122px;
          overflow: hidden;
          border-radius: 6px;
          cursor: pointer;
          &:hover img {
            transform: scale(1.1, 1.1);
          }
        }
        img {
          width: 218px;
          height: 122px;
          background: rgba(98,98,98,1);
          transition: all 0.3s ease 0s;
        }
        .content {
          padding: 0 10px;
          .title {
            width: 100%;
            margin-top: 15px;
            font-size: 14px;
            color: #333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
