<template>
  <div style="width:100%">
    <v-header />
    <nav-bar :tab-index="tabIndex"/>
    <div class="train-container">
      <div class="crumb">
        <nuxt-link to="/">首页</nuxt-link>
        <i class="iconfont iconarrow-right" />
        <nuxt-link :to="{ name: 'train' }">课程中心</nuxt-link>
        <!-- 首页>课程中心 -->
      </div>
      <div class="train-content">
        <div class="content-left">
          <table class="table">
            <tbody>
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
              <tr v-if="courses.length > 1">
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
            </tbody>
          </table>
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
                    class="price">&yen;{{ item.price }}
                  </span>
                  <span class="number">{{ item.student_num }}人学过</span>
                </div>
              </div>
            </li>
          </ul>
          <Pagination
            v-if="result.length > 0"
            :size="size"
            :current="current"
            :total="total"
            @sizeChange="sizeChange"
            @currentChange="currentChange" />
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
import Pagination from '~/components/pagination.vue'
export default {
  components: {
    NavBar,
    LessonSection,
    TrainSection,
    Pagination,
    'v-header': Header
  },
  data() {
    return {
      title: '自学考试',
      tabIndex: 4,
      current: 1,
      size: 32,
      total: 0,
      categoryId: this.$route.query.fid || 0,
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
        },
        {
          label: '推荐',
          value: 3
        }
      ],
      result: [],

    }
  },
  head() {
    return {
      title: this.title
    }
  },
  // 监听参数字符串的更改，调用所有组件方法
  watchQuery: ['fid', 'cid'],
  async asyncData({ $axios, query }) {
    let fid = query.fid || 0
    let cid = query.cid || 0
    let res = await $axios('/yxs/api/web/course/getCourseType')
    let types = [{
      name: '全部',
      id: 0
    }]
    let courses = [{
      name: '全部',
      id: 0
    }]
    let typeList = res.data.allCate
    typeList.map(item => {
      types.push(item)
    })

    console.log('cid', cid)

    let index = 0
    types.forEach((ele, i) => {
      if (ele.id == fid) {
        index = i // 加了一个全部
      }
    })

    console.log('index', index)
    console.log('types', types)

    let title = types[index].name

    if (types[index].children && types[index].children.length > 0) {
      types[index].children.map(item => {
        courses.push(item)
      })
    }

    console.log('courses', courses)

    // 初始化数据
    let list = await $axios('/yxs/api/web/course/more', { params: {
      current: 1,
      size: 32,
      categoryId: cid ? cid : fid,
      orderByClause: 1,
      type: 1,
      userToken: ''
    }})
    return {
      fid,
      cid,
      title,
      types,
      courses,
      result: list.data.list.records,
      total: list.data.list.total
    }

  },
  mounted() {
    // this.getCourseType()
    this.getTrainList()
    this.getRecommendLessons()
  },
  methods: {
    changeFirst(item, index, flag) {
      this.$router.push({
        name: 'train',
        query: {
          fid: item.id
        }
      })
      
      // this.current = 1
      // this.title = item.name
      // this.categoryId = item.id
      // this.fid = item.id
      // if(flag) {
      //   this.cid = 0
      // }
      // // this.firstActive = index
      // // this.secondActive = 0
      // this.courses = [{
      //   name: '全部',
      //   id: 0
      // }]
      // if(item.children && item.children.length > 0) {
      //   item.children.map(item => {
      //     this.courses.push(item)
      //   })
      // }
      // if(this.cid) {
      //   this.getList(this.cid, 2)
      // } else {
      //   this.getList(item.id, 1)
      // }
    },
    changeSecond(id, index) {
      this.$router.push({
        name: 'train',
        query: {
          fid: this.fid,
          cid: id
        }
      })

      // this.current = 1
      // // this.secondActive = index
      // this.cid = id
      // if(id == 0) {
      //   this.getList(this.categoryId, 1)
      // } else {
      //   this.getList(id, 2)
      // }
    },
    changeThird(item, index) {
      this.current = 1
      this.thirdActive = index
      this.orderByClause = index + 1
      let id = this.cid ? this.cid : this.fid
      this.getList(id, 3)
    },
    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    getList(id, i) {
      this.$axios('/yxs/api/web/course/more', {
        params: {
          current: this.current,
          size: this.size,
          categoryId: id,
          orderByClause: this.orderByClause,
          type: this.classType,
          userToken: ''
        }
      }).then(res => {
        this.result = res.data.list.records
        this.total = res.data.list.total
      })
    },
    getCourseType() {
      this.$axios('/yxs/api/web/course/getCourseType').then(res => {
        this.types = [{
          name: '全部',
          id: 0
        }]
        // res.data.allClassTypeCate.map(item => {
        //   item.type = 2
        //   this.types.push(item)
        // })
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
    },
    sizeChange(val) {
      this.size = val
    },
    currentChange(val) {
      window.scrollTo(0, 0)
      this.current = val
      this.getList(this.categoryId)
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
          padding: 6px 40px;
          border: 1px solid #E5E5E5;
          background: #f5f5f5;
          font-size: 0;
          cursor: pointer;
          span {
            display: inline-block;
            margin-left: 20px;
            padding: 8px;
            font-size: 14px;
            text-align: center;
            // white-space: nowrap;
            line-height: 20px;
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
