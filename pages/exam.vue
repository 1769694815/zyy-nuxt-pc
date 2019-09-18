<template>
  <div>
    <v-header />
    <div class="title">
      首页>详情页>{{ title }}课程模拟考试
    </div>
    <!-- 答题 -->
    <div
      v-if="!isResult"
      class="container">
      <div class="content">
        <div class="content-left">
          <div class="top">
            <h2>{{ title }}课程模拟考试</h2>
            <div class="desc">
              试卷说明，共{{ itemCount }}题，总分{{ sumScore }}分，请认真作答，您可重复参与模拟练习
            </div>
            <!-- <ul class="type">
              <li
                v-for="(item, index) in typeList"
                :key="index"
                :class="type == item.value ? 'active' : ''"
                @click="changeType(item.value)">
                {{ item.label }}
              </li> 
            </ul> -->
          </div>
          <div class="question">
            <div
              v-show="type == 1"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                单选题
                <span>(共{{ list.length }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :id="'link'+ index"
                  :key="index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                    <span style="margin-left: 20px">(2分)</span>
                  </p>
                  <el-radio-group v-model="form.item1[index]">
                    <el-radio
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option.name"
                      style="display: block;margin-left: 0; line-height:30px;">{{ option.name }}: {{ option.content }}</el-radio>
                  </el-radio-group>
                </li>
              </ul>
            </div>
            <div
              v-show="type == 2"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                多选题
                <span>(共{{ list.length }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                  </p>
                  <el-checkbox-group v-model="form.item2[index]">
                    <el-checkbox
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option"
                      style="display: block;margin-left: 0; line-height:30px;">
                      {{ letterArray[index] }}: {{ option }}</el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div>
            <div
              v-show="type == 3"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                不定项选择题
                <span>(共{{ list.length }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                  </p>
                  <el-checkbox-group v-model="form.item3[index]">
                    <el-checkbox
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option"
                      style="display: block;margin-left: 0; line-height:30px;">
                      {{ letterArray[index] }}: {{ option }}</el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div>
            <div
              v-show="type == 4"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                四、判断题
                <span>(共{{ list.length }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                  </p>
                  <el-radio-group v-model="form.item4[index]">
                    <el-radio
                      label="true"
                      style="display: block;margin-left: 0; line-height:30px;">
                      正确</el-radio>
                    <el-radio
                      label="false"
                      style="display: block;margin-left: 0; line-height:30px;">
                      错误</el-radio>
                  </el-radio-group>
                </li>
              </ul>
            </div>
            <div
              v-show="type == 5"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                五、填空题
                <span>(共{{ list.length }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                  </p>
                  <el-input
                    v-model="form.item5[index]"
                    placeholder="请输入你的答案" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="header">
            剩余
            <span>{{ leftTimeStr }}</span>
          </div>
          <ul class="list">
            <li
              v-for="(item, index) in list"
              :key="index"
              :class="form.item1[index] ? 'active' : ''">
              <a :href="'#link' + index">{{ index + 1 }}</a>
            </li>
          </ul>
          <div class="status">
            <span class="none">未答</span>
            <span class="complete">已答</span>
          </div>
          <div
            class="button"
            @click="submit">我要交卷</div>
        </div>
      </div>
    </div>
    <!-- 结果 -->
    <div
      v-else
      class="container">
      <div class="content">
        <div class="content-left">
          <div class="top">
            <h2>{{ title }}课程模拟考试</h2>
            <div class="table">
              <table border="1">
                <thead>
                  <th>题型</th>
                  <th
                    v-for="(item, index) in typeList"
                    v-if="index < 5"
                    :key="index">
                    <span v-if="item.typeId == 1">单选题({{ item.unCount + item.missCount + item.rightCount }}题)</span>
                    <span v-if="item.typeId == 2">多选题({{ item.unCount + item.missCount + item.rightCount }}题)</span>
                    <span v-if="item.typeId == 3">不定性选择({{ item.unCount + item.missCount + item.rightCount }}题)</span>
                    <span v-if="item.typeId == 4">判断题({{ item.unCount + item.missCount + item.rightCount }}题)</span>
                    <span v-if="item.typeId == 5">填空题({{ item.unCount + item.missCount + item.rightCount }}题)</span>
                  </th>
                  <th>总得分({{ sumScore }}分)</th>
                </thead>
                <tr style="color: red">
                  <td>得分</td>
                  <td
                    v-for="(item, index) in typeList"
                    v-if="index < 5"
                    :key="index">
                    {{ item.score }}分
                  </td>
                  <td
                    rowspan="4"
                    style="vertical-align:middle;">
                    {{ sunScore || 0 }}分
                    <div style="color: #333">答题耗时{{ Math.ceil(answerTime / 60) || 0 }}分钟</div>
                  </td>
                </tr>
                <tr>
                  <td>答对</td>
                  <td
                    v-for="(item, index) in typeList"
                    v-if="index < 5"
                    :key="index">
                    {{ item.rightCount }}题
                  </td>
                </tr>
                <tr>
                  <td>答错</td>
                  <td
                    v-for="(item, index) in typeList"
                    v-if="index < 5"
                    :key="index">
                    {{ item.missCount }}题
                  </td>
                </tr>
                <tr>
                  <td>漏答</td>
                  <td
                    v-for="(item, index) in typeList"
                    v-if="index < 5"
                    :key="index">
                    {{ item.unCount }}题
                  </td>
                </tr>
              </table>
            </div>
            <div class="desc">
              试卷说明，共{{ itemCount }}题，总分{{ sumScore }}分，请认真作答，您可重复参与模拟练习
            </div>
            <!-- <ul class="type">
              <li
                v-for="(item, index) in typeList"
                :key="index"
                :class="type == item.value ? 'active' : ''"
                @click="changeType(item.value)">
                {{ item.label }}
              </li> 
            </ul> -->
          </div>
          <div class="question">
            <div
              v-show="type == 1"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                单选题
                <span>(共{{ list.length }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :id="'question' + index"
                  :key="index">
                  <p>{{ index + 1 }}、{{ item.stem }}</p>
                  <el-radio-group
                    v-model="list[index].userAnswer"
                    disabled>
                    <el-radio
                      v-for="(option, i) in item.optionContent"
                      :key="i"
                      :label="option.name"
                      style="display: block;margin-left: 0; line-height:30px;">{{ option.name }}: {{ option.content }}
                      <span
                        v-if="list[index].userAnswer == option.name"
                        style="margin-left: 30px">(已选)</span>
                    </el-radio>
                  </el-radio-group>
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      <span>正确答案：{{ item.answer }}</span>
                      <div>解析：{{ item.analysis }}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content-right">
          <ul class="list">
            <li
              v-for="(item, index) in list"
              :key="index"
              :class="{ 'none': item.status == 1, 'right': item.status == 2, 'wrong': item.status == 3 }">
              <a :href="'#question' + index">{{ index + 1 }}</a>
            </li>
          </ul>
          <div class="status">
            <span class="none">未答</span>
            <span class="complete">答对</span>
            <span class="wrong">答错</span>
          </div>
          <div
            class="button"
            @click="again">再模拟一次</div>
          <div
            class="button primary"
            @click="toPractice">做练习题</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    'v-header': Header
  },
  data() {
    return {
      loading: null,
      type: 1,
      title: this.$route.query.title || '',
      courseId: this.$route.query.courseId || '',
      userInfo: '',
      paperId: this.$route.query.examPaperId || null,
      limitTime: 7200,
      answerTime: 0,
      isResult: false,
      result: '',
      leftTimeStr: '',
      timer: null,
      formInline: {
        question: '',
        range: ''
      },
      form: {
        item1: [],
        item2: [[]],
        item3: [],
        item4: [],
        item5: []
      },
      list: [],
      lessonList: [],
      typeList: [],
      letterArray: ['A', 'B', 'C', 'D', 'E', 'F'],
      itemCount: 0,
      sumScore: 0,
      lookUp: this.$route.query.type || false, // 是否查阅
      resultId: this.$route.query.resultId || '',
      sunScore: 0, // 得到的分数
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    console.log(this.lookUp)
    if (this.lookUp) { // 查看模拟考试结果
      this.isResult = true
      this.getResultList()
    } else { // 开始模拟考试
      this.getList()
      this.getLessonList()
    }
    // this.getTypeList()
  },
  methods: {
    initTime() {
      clearInterval(this.timer)
      if(this.limitTime > 0) {
        this.timer = setInterval(() => {
          this.formatTime(this.limitTime --)
        }, 1000)
      } else {
        clearInterval(this.timer)
      }
    },
    formatTime(time) {
      this.answerTime++
      let minutes = Math.floor(time / 60) > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
      let seconds = time % 60 > 9 ? time % 60 : '0' + time % 60
      this.leftTimeStr = `${minutes}:${seconds}`
    },
    getList() {
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios('/yxs/api/web/user/createSimulatedVolume', {
        params: {
          courseId: this.courseId,
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        this.loading.close()
        this.initTime()
        this.list = res.data.newList
        this.paperId = res.data.paperId
        this.resultId = res.data.resultId
        this.limitTime = res.data.limitTime * 60
        this.itemCount = res.data.itemCount
        this.sumScore = res.data.sumScore
      })
    },
    getResultList() {
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios('/yxs/api/web/question/startAnswer', {
        params: {
          examPaperId: this.paperId,
          userToken: this.userInfo.userToken,
          resultId: this.resultId,
          type: 2 // 1 未答  2： 已答  3：批阅
        }
      }).then(res => {
        this.loading.close()
        console.log('模拟考试结果', res)
        this.list = res.data.newLists
        this.itemCount = res.data.itemCount
        this.sumScore = res.data.sumScore
        this.typeList = res.data.situation.newLists
        this.answerTime = res.data.situation.answerTime
        this.sunScore = res.data.situation.objectScore + res.data.situation.subjectScore
      })
    },
    getLessonList() {
      this.$axios('/yxs/course/getLessonList', {
        params: {
          courseId: this.courseId
        }
      }).then(res => {
        this.lessonList = res.data
      })
    },
    getTypeList() {
      this.$axios('/admin/dict/type/question_type').then(res => {
        this.typeList = res.data
      })
    },
    changeType(val) {
      this.type = val
    },
    toggle(e) {
      let nextEl = e.currentTarget.nextElementSibling
      if(nextEl.style.display == 'block') {
        nextEl.style.display = 'none'
      } else {
        nextEl.style.display = 'block'
      }
    },
    // 交卷
    submit() {
      let lists = []
      let sum = 0
      this.list.forEach((ele, i) => {
        if(!this.form.item1[i]) {
          sum += 1
        }
        lists[i] = { "questionId": ele.id, "answer": this.form.item1[i] }
      })
      this.$confirm(`亲爱的学员，您本次答题耗时${ Math.ceil((this.answerTime) / 60) }分钟，漏答${ sum }题`, '温馨提示', {
        confirmButtonText: '我要交卷',
        cancelButtonText: '再检查一遍',
        type: 'warning'
      }).then(() => {
        this.loading = this.$loading({
          lock: true,
          text: '正在加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios.post('/yxs/api/web/user/submitSimulatedVolume', {
          userToken: this.userInfo.userToken,
          paperId: this.paperId,
          answerTime: Math.ceil(this.answerTime),
          resultId: this.resultId,
          submitStatus: 1,
          lists
        }).then(res => {
          this.loading.close()
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          clearInterval(this.timer)
          this.form.item1 = []
          this.isResult = true
          this.getResultList()
        })
      }).catch(() => {

      });
    },
    toPractice() {
      let url = this.$router.resolve({
        name: 'practice',
        query: {
          courseId: this.courseId,
          title: this.title
        }
      })
      window.open(url.href, '_blank')
    },
    again() {
      this.$confirm('将为您随机抽取50道题生成模拟试卷，题库不足将全部题目生成试卷，答题限时120分钟', '温馨提示', {
        confirmButtonText: '继续生成',
        cancelButtonText: '稍后再说',
        type: 'warning'
      }).then(() => {
        this.isResult = false
        this.getList()
      }).catch(() => {
               
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .title {
    width: 1200px;
    margin: 20px auto;
    color: #838383;
    font-size: 14px;
  }
  .container {
    width: 100%;
    // min-height: 500px;
    padding-top: 30px;
    padding-bottom: 20px;
    background: #f5f5f5;
    .content {
      display: flex;
      position: relative;
      width: 1160px;
      margin: 0 auto;
    }
    .content-left {
      width: 860px;
      background: #fff;
      .top {
        padding-top: 30px;
        background: #fff;
        h2 {
          text-align: center;
          font-size: 26px;
          color: #333;
        }
        .desc {
          margin: 40px;
          padding: 15px 25px;
          background: #f5f5f5;
          font-size: 14px;
          color: #838383;
        }
        .table {
          margin: 40px;
          table {
            width: 100%;
            th {
              background: #f5f5f5;
            }
            td, th {
              padding: 0 5px;
              height: 38px;
              line-height: 38px;
              text-align: center;
            }
          }
        }
        ul {
          margin: 40px;
          padding-top: 20px;
          li {
            display: inline-block;
            margin-left: 20px;
            height: 32px;
            padding: 0 12px;
            line-height: 32px;
            font-size: 16px;
            border-radius: 16px;
            cursor: pointer;
            &:first-child {
              margin-left: 0;
            }
            &:hover, &.active {
              background: #3f8a38;
              color: #fff;
            }
          }
        }
      }
      .question {
        padding: 0 40px 40px;
        background: #fff;
        .list {
          &-title {
            margin: 30px 0;
            font-size: 20px;
            color: #333;
            span {
              color: #838383;
              font-size: 16px;
            }
          }
          ul {
            li {
              .analyse {
                margin: 20px;
                color: #838383;
                font-size: 14px;
                cursor: pointer;
                i {
                  margin-left: 5px;
                  font-size: 14px;
                }
                .desc {
                  // display: none;
                  width: 540px;
                  padding: 4px 15px;
                  margin-top: 10px;
                  background: #f5f5f5;
                  font-size: 14px;
                  line-height: 26px;
                }
              }
              p {
                margin: 20px 0;
                font-size: 16px;
                line-height: 26px;
              }
            }
          }
        }
      }
    }
    .content-right {
      position: sticky;
      top: 0;
      width: 280px;
      height: 550px;
      // height: auto;
      max-height: calc(100vh);
      margin-left: 20px;
      padding: 20px 24px;
      background: #fff;
      .header {
        margin: 20px;
        text-align: center;
        font-size: 22px;
        span {
          color: #d81e06;
          font-weight: 700;
        }
      }
      .list {
        max-height: 300px;
        overflow: auto;
        li {
          display: inline-block;
          margin: 2px;
          line-height: 44px;
          background: #fff;
          border: 1px solid #d1d1d1;
          font-size: 22px;
          text-align: center;
          cursor: pointer;
          &:nth-child(5n+1) {
            margin-left: 0;
          }
          &.right a, &.active a{
            background: #68b361;
            color: #fff;
          }
          &.wrong a {
            background: #ff7e7e;
            color: #fff;
          }
          a {
            display: block;
            width: 44px;
            height: 44px;
            text-decoration: none;
            color: #333;
          }
        }
      }
      .status {
        margin-top: 30px;
        span {
          position: relative;
        }
        .none {
          margin-left: 20px;
          &:before {
            content: '';
            position: absolute;
            left: -20px;
            width: 10px;
            height: 10px;
            border: 1px solid #d1d1d1;
          }
        }
        .complete {
          margin-left: 40px;
          &:before {
            content: '';
            position: absolute;
            left: -20px;
            width: 12px;
            height: 12px;
            background: #68b361;
          }
        }
        .wrong {
          margin-left: 40px;
          &:before {
            content: '';
            position: absolute;
            left: -20px;
            width: 12px;
            height: 12px;
            background: #ff7e7e;
          }
        }
      }
      .button {
        width: 230px;
        height: 40px;
        margin-top: 30px;
        line-height: 40px;
        color: #fff;
        background: #3f8a38;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
        &.primary {
          background: #fff;
          color: #3f8a38;
          border: 1px solid #3f8a38;
        }
      }
    }
  }
</style>

<style>
  .top .el-form {
    width: 790px;
    margin: 40px auto 10px;
  }
  .top .el-input {
    width: 300px;
  }
  .el-radio__input.is-disabled+span.el-radio__label {
    color: #333;
  }
  .el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner {
    color: #dcdfe6;
  }
</style>
