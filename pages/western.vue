<template>
  <div style="width:100%">
    <v-header />
    <nav-bar :tab-index="tabIndex"/>
    <div class="train-container">
      <div class="crumb">
        <nuxt-link to="/">首页</nuxt-link>
        <i class="iconfont iconarrow-right" />
        <nuxt-link :to="{ name: 'western' }">培训项目</nuxt-link>
        <nuxt-link
          v-for="(item, index) in navList"
          v-if="item.name != '全部'"
          :to="{ name: 'western', query: queryParams(navList, index) }"
          :key="index">
          <i class="iconfont iconarrow-right" />
          {{ item.name }}
        </nuxt-link>
      </div>
      <div class="train-content">
        <div class="content-left">
          <table class="table">
            <tbody>
              <tr>
                <th>项目类别：</th>
                <td>
                  <span
                    v-for="(item, index) in types"
                    :key="index"
                    :class="{active:fid == item.id}"
                    @click="changeFirst(item, index)">
                    {{ item.name }}
                  </span>
                </td>
              </tr>
              <tr v-if="courses.length > 1">
                <th>项目筛选：</th>
                <td>
                  <span
                    v-for="(item, index) in courses"
                    :key="index"
                    :class="{active:cid == item.id}"
                    @click="changeSecond(item, index)">
                    {{ item.name }}
                  </span>
                </td>
              </tr>
              <tr v-if="justCourses.length > 1">
                <th>继续筛选：</th>
                <td>
                  <span
                    v-for="(item, index) in justCourses"
                    :key="index"
                    :class="{active:tid == item.id}"
                    @click="changeThird(item.id, index)">
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
                    @click="changeHour(item, index)">
                    {{ item.label }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <ul v-show="classType == 2">
            <li
              v-for="(item, index) in result"
              :key="index"
              class="common-class"
              @click="toTrainDetail(item.categoryId)">
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
                <div
                  v-if="item.price == 0"
                  class="price">免费
                </div>
                <div
                  v-else
                  class="price">&yen;{{ item.price }}
                </div>
                <div class="foot">
                  <span>{{ item.studentNum }}人已报名</span>
                  <span>截止报名：{{ item.closeDate }}</span>
                </div>
                <div
                  v-if="item.closeStatus == 2"
                  class="button b2">报名结束</div>
                <div
                  v-if="item.closeStatus == 0"
                  class="button b2">未开始</div>
                <div
                  v-if="item.closeStatus == 1 && item.status == 0"
                  class="button">
                  立即报名
                </div>
                <div
                  v-if="item.closeStatus == 1 && item.status == 1"
                  class="button">
                  已加入本班
                </div>
              </div>
            </li>
          </ul>
          <ul
            v-show="classType == 1"
            class="train-ul">
            <li
              v-for="(item, index) in result"
              :key="index" 
              class="train-class"
              @click="toLessonDetail(item.id)">
              <img v-lazy="item.middlePicture">
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
    'v-header': Header,
    Pagination
  },
  data() {
    return {
      title: '培训项目',
      tabIndex: this.$route.query.fid == 2 ? 2 : 3,
      current: 1,
      size: 15,
      total: 0,
      categoryId: 1, // 默认21,培训项目id
      cid: this.$route.query.cid || 0,
      tid: this.$route.query.tid || 0,
      fid: 0,
      orderByClause: 1,
      firstActive: 0,
      secondActive: 0,
      thirdActive: 0,
      classType: 2,
      recommendLessons: [],
      recommendTrains: [],
      types: [],
      courses: [],
      justCourses: [],
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
      navList: []
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  // 监听参数字符串的更改，调用所有组件方法
  watchQuery: ['fid', 'cid', 'tid'],
  async asyncData({ $axios, query }) {
    // console.log('fid', fid)
    // console.log('cid', cid)
    let res = await $axios('/yxs/api/web/course/getCourseType')
    let fid = query.fid || res.data.allClassTypeCate[0].parentId
    let cid = query.cid || fid
    let tid = query.tid || cid
    let types = [{
      name: '全部',
      id: res.data.allClassTypeCate[0].parentId
    }]
    let courses = [{
      name: '全部',
      id: fid
    }]
    let justCourses = [{
      name: '全部',
      id: cid
    }]
    let navList = []
    let typeList = res.data.allClassTypeCate[0]
    typeList.children.map(item => {
      item.type = 2
      types.push(item)
    })

    let index = 0
    // console.log('types', types)
    types.forEach((ele, i) => {
      if (ele.id == fid) {
        index = i
      }
    })

    let title = '培训项目_'

    // 培训类别
    if (types[index].children && types[index].children.length > 0) {
      types[index].children.map(item => {
        courses.push(item)
      })
    }

    navList.push(types[index])

    let courseIndex = 0
    courses.forEach((ele, i) => {
      if (ele.id == cid) {
        courseIndex = i
      }
    })

    navList.push(courses[courseIndex])
    
    if (courses[courseIndex].children && courses[courseIndex].children.length > 0) {
      courses[courseIndex].children.map(item => {
        justCourses.push(item)
      })
    }
    
    let justIndex = 0
    justCourses.forEach((ele, i) => {
      if (ele.id == tid) {
        justIndex = i
      }
    })

    navList.push(justCourses[justIndex])

    // 初始化数据
    let list = await $axios('/yxs/api/web/course/more', { params: {
      current: 1,
      size: 15,
      categoryId: tid ? tid : (cid ? cid : fid),
      orderByClause: 1,
      type: 2,
      userToken: ''
    }})
    return {
      fid,
      cid,
      tid,
      title,
      types,
      courses,
      justCourses,
      result: list.data.list.records,
      total: list.data.list.total,
      categoryId: tid ? tid : (cid ? cid : fid),
      navList
    }
  },
  computed: {
    queryParams (list, index) {
      return function (list, index) {
        if (index == 0) {
          return {
            fid: list[0].id
          }
        } else if (index == 1) {
          return {
            fid: list[0].id,
            cid: list[1].id
          }
        } else if (index == 2) {
          return {
            fid: list[0].id,
            cid: list[1].id,
            tid: list[2].id
          }
        }
      }
    }
  },
  mounted() {
    // console.log('123')
    // this.getCourseType()
    this.getTrainList()
    this.getRecommendLessons()
  },
  methods: {
    changeFirst(item, index) {
      this.$router.push({
        name: 'western',
        query: {
          fid: item.id
        }
      })

      // this.current = 1
      // this.categoryId = item.id
      // this.fid = item.id
      // this.cid = 0
      // this.courses = [{
      //   name: '全部',
      //   id: 0
      // }]
      // if (this.fid == 2) { // 西学中 导航栏“西学中”选中
      //   this.tabIndex = 2
      // } else {
      //   this.tabIndex = 3
      // }
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
    changeSecond(item, index) {
      this.$router.push({
        name: 'western',
        query: {
          fid: this.fid,
          cid: item.id
        }
      })
      // this.current = 1
      // this.cid = item.id
      // if(item.id == 0) {
      //   this.getList(this.categoryId, 1)
      // } else {
      //   this.getList(item.id, 2)
      // }
      // // 更改navBar的高亮
      // if (item.id == 2) {
      //   this.tabIndex = 2
      // }
    },
    changeThird(id, index) {
      this.$router.push({
        name: 'western',
        query: {
          fid: this.fid,
          cid: this.cid,
          tid: id
        }
      })
    },
    changeHour(item, index) {
      this.current = 1
      this.thirdActive = index
      this.orderByClause = index + 1
      let id = this.tid ? this.tid : (this.cid ? this.cid : this.fid)
      this.getList(id, 3)
    },
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
          id: res.data.allClassTypeCate[0].parentId
        }]
        res.data.allClassTypeCate[0].children.map(item => {
          item.type = 2
          this.types.push(item)
        })
        // console.log('types', this.types)
        this.changeFirst(this.types[0], 1)
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
          border: 1px solid #f5f5f5;
          border-right: 0;
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
        cursor: pointer;
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
            &:hover {
              color: #3F8A38;
            }
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
            cursor: pointer;
          }
          .b2 {
            background: #999;
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
