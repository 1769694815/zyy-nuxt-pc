<template>
  <div>
    <v-header />
    <div class="title">
      首页>详情页>{{ title }}课程模拟考试
    </div>
    <div class="container">
      <div class="content">
        <div class="content-left">
          <div class="top">
            <h2>{{ title }}课程模拟考试</h2>
            <div class="desc">
              试卷说明，共50题，总分100分，请认真作答，您可重复参与模拟练习
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
                  :key="index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                  </p>
                  <el-radio-group v-model="form.item1[index]">
                    <el-radio
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option"
                      style="display: block;margin-left: 0; line-height:30px;">{{ letterArray[index] }}: {{ option }}</el-radio>
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
              {{ index + 1 }}
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
      type: 1,
      title: this.$route.query.title || '',
      courseId: this.$route.query.courseId || '',
      userInfo: '',
      paperId: null,
      leftTime: 7200,
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
      letterArray: ['A', 'B', 'C', 'D', 'E', 'F']
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.getList()
    this.getLessonList()
    this.initTime()
    // this.getTypeList()
  },
  methods: {
    initTime() {
      if(this.leftTime > 0) {
        this.timer = setInterval(() => {
          this.formatTime(this.leftTime --)
        }, 1000)
      } else {

      }
    },
    formatTime(time) {
      let minutes = Math.floor(time / 60) > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
      let seconds = time % 60 > 9 ? time % 60 : '0' + time % 60
      this.leftTimeStr = `${minutes}:${seconds}`
    },
    getList() {
      this.$axios('/yxs/api/web/user/createSimulatedVolume', {
        params: {
          courseId: 59,
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        this.list = res.data.newList
        this.paperId = res.data.paperId
      })
    },
    getLessonList() {
      this.$axios('/yxs/course/getLessonList', {
        params: {
          courseId: '59'
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
      this.list.forEach((ele, i) => {
        console.log('ele', ele, i)
        lists[i] = { "questionId": ele.id, "answer": this.form.item1[i] }
        // lists[i].answer = this.form.item1[index]
      });
      console.log(lists)
      this.$axios.post('/yxs/api/web/user/submitSimulatedVolume', {
        userToken: this.userInfo.userToken,
        paperId: this.paperId,
        answerTime: 600,
        lists
      }).then(res => {

      })
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
    min-height: 500px;
    padding-top: 30px;
    background: #f5f5f5;
    .content {
      display: flex;
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
                  display: none;
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
      width: 260px;
      margin-left: 20px;
      padding: 30px 24px;
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
        li {
          display: inline-block;
          width: 44px;
          height: 44px;
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
          &.active {
            background: #3f8a38;
            color: #fff;
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
            width: 10px;
            height: 10px;
            border: 1px solid #d1d1d1;
            background: #68b361;
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
</style>
