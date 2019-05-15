<template>
  <div>
    <v-header />
    <div class="title">
      首页>详情页>{{ title }}课程练习题
    </div>
    <div class="container">
      <div class="content">
        <div class="content-left">
          <div class="top">
            <h2>{{ title }}课程练习题</h2>
            <el-form
              :inline="true"
              :model="formInline">
              <el-row
                type="flex"
                justify="space-between">
                <el-form-item label="搜索题目:">
                  <el-input 
                    v-model="formInline.question"
                    placeholder="输入关键词搜索题目" />
                </el-form-item>
                <el-form-item label="习题范围:">
                  <el-select
                    v-model="formInline.range"
                    placeholder="选择题目范围">
                    <el-option
                      v-for="item in lessonList"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row
                type="flex"
                justify="space-between">
                <el-form-item label="难易程度:">
                  <el-radio-group v-model="formInline.level">
                    <el-radio label="1">全部</el-radio>
                    <el-radio label="2">简单</el-radio>
                    <el-radio label="3">一般</el-radio>
                    <el-radio label="4">较难</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  style="float:right;height:40px;">搜索</el-button>
              </el-row>
            </el-form>
            <ul class="type">
              <li
                v-for="(item, index) in typeList"
                :key="index"
                :class="type == item.value ? 'active' : ''"
                @click="changeType(item.value)">
                {{ item.label }}
              </li>
            </ul>
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
                      :label="letterArray[index]"
                      style="display: block;margin-left: 0; line-height:30px;">{{ letterArray[index] }}: {{ option }}</el-radio>
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
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      {{ item.analysis }}
                    </div>
                  </div>
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
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      {{ item.analysis }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-show="type == 4"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                判断题
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
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      {{ item.analysis }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-show="type == 5"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                填空题
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
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      {{ item.analysis }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <div class="content-right">
          模拟试卷
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
export default {
  components: {
    'v-header': Header
  },
  data() {
    return {
      title: this.$route.query.title || '',
      courseId: this.$route.query.courseId || '',
      type: 1,
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
    this.getList()
    this.getLessonList()
    this.getTypeList()
  },
  methods: {
    getList() {
      this.$axios('/yxs/api/web/question/questionCourseList', {
        params: {
          courseId: 59,
          type: this.type
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.newList
      })
    },
    getLessonList() {
      this.$axios('/yxs/course/getLessonList', {
        params: {
          courseId: 59
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
      this.getList()
    },
    toggle(e) {
      let nextEl = e.currentTarget.nextElementSibling
      if(nextEl.style.display == 'block') {
        nextEl.style.display = 'none'
      } else {
        nextEl.style.display = 'block'
      }
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
      width: 100%;
      .top {
        height: 290px;
        padding-top: 30px;
        background: #fff;
        h2 {
          text-align: center;
          font-size: 26px;
          color: #333;
        }
        ul {
          margin: 0 40px;
          padding-top: 20px;
          border-top: 1px solid #e6e6e6;
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
        padding: 20px 40px 40px;
        margin: 20px 0;
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
      background: #fff;
    }
  }
</style>

<style>
  .top .el-form {
    width: 1070px;
    margin: 40px auto 10px;
  }
  .top .el-input {
    width: 300px;
  }
</style>
