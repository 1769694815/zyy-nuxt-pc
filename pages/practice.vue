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
                    v-model="formInline.stem"
                    placeholder="输入关键词搜索题目"
                    clearable />
                </el-form-item>
                <el-form-item label="习题范围:">
                  <el-select
                    v-model="formInline.lessonId"
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
                  <el-radio-group v-model="formInline.difficulty">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="1">简单</el-radio>
                    <el-radio label="2">一般</el-radio>
                    <el-radio label="3">较难</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  style="float:right;height:40px;"
                  @click="getList">搜索</el-button>
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
                <span>(共{{ total }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ (current-1) * size + index + 1 }}、{{ item.stem }}
                  </p>
                  <el-radio-group v-model="form.item1[(current-1) * size + index]">
                    <el-radio
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option.name"
                      style="display: block;margin-left: 0; line-height:30px;">{{ option.name }}: {{ option.content }}</el-radio>
                  </el-radio-group>
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      <span>正确答案：{{ item.answer }}</span>
                      <div>解析：{{ item.analysis || '无' }}</div>
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
                <span>(共{{ total }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ (current-1) * size + index + 1 }}、{{ item.stem }}
                  </p>
                  <el-checkbox-group v-model="form.item2[index]">
                    <el-checkbox
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option"
                      style="display: block;margin-left: 0; line-height:30px;">
                      {{ option.name }}: {{ option.content }}</el-checkbox>
                  </el-checkbox-group>
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      <div>答案：{{ item.answer }}</div>
                      <div>解析：{{ item.analysis || '无' }}</div>
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
                <span>(共{{ total }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ (current-1) * size + index + 1 }}、{{ item.stem }}
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
                      <div>答案：{{ item.answer }}</div>
                      {{ item.analysis || '无' }}
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
                <span>(共{{ total }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ (current-1) * size + index + 1 }}、{{ item.stem }}
                  </p>
                  <el-radio-group v-model="form.item4[(current-1) * size + index]">
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
                      <div>答案：{{ item.answer }}</div>
                      {{ item.analysis || '无' }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="type == 5 && list && list.length > 0"
              class="list">
              <div class="list-title">
                填空题
                <span>(共{{ total }}题)</span>
              </div>
              <ul v-if="list && list.length > 0">
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ (current-1) * size + index + 1 }}、{{ item.stem }}
                  </p>
                  <div v-if="item.answer && item.answer.length > 0">
                    <el-input
                      v-for="(option, idx) in item.answer"
                      v-model="form.item5[index][idx]"
                      :key="idx"
                      :placeholder="'请输入第'+(idx+1)+'个空的答案'"
                      style="margin-top: 10px" />
                  </div>
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      答案：
                      <div
                        v-for="(option, idx) in item.answer"
                        :key="idx">
                        <span>第{{ idx + 1 }}个空：{{ option }}</span>
                      </div>
                      <div>解析：{{ item.analysis || '无' }}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="type == 6 && list && list.length > 0"
              class="list">
              <div class="list-title">
                问答题
                <span>(共{{ total }}题)</span>
              </div>
              <ul v-if="list && list.length > 0">
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ (current-1) * size + index + 1 }}、{{ item.stem }}
                  </p>
                  <el-input
                    v-model="form.item6[(current-1) * size + index]"
                    type="textarea" />
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      <div>答案：{{ item.answer || '无' }}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="type == 7 && list && list.length > 0"
              class="list">
              <div class="list-title">
                材料分析题
                <span>(共{{ total }}题)</span>
              </div>
              <ul v-if="list && list.length > 0">
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ (current-1) * size + index + 1 }}、{{ item.stem }}
                  </p>
                  <el-input
                    v-model="form.item7[(current-1) * size + index]"
                    type="textarea" />
                  <div class="analyse">
                    <div
                      class="text"
                      @click="toggle">
                      解析<i class="iconfont iconarrow-right"/>
                    </div>
                    <div class="desc">
                      <div>答案：{{ item.answer || '无' }}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <Pagination
              v-if="total > 0"
              :size="size"
              :current="current"
              :total="total"
              @currentChange="currentChange" />
            <div
              v-if="total == 0"
              class="nodata">
              <img src="~/assets/images/noitem.png">
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="btns">
            <div
              class="button"
              @click="clear">清空重做</div>
            <div
              class="button primary"
              @click="toExam">生成模拟试卷</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import Pagination from '~/components/pagination.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    'v-header': Header,
    Pagination
  },
  data() {
    return {
      title: this.$route.query.title || '',
      courseId: this.$route.query.courseId || '',
      type: 1,
      userInfo: '',
      formInline: {
        stem: '',
        lessonId: '',
        difficulty: ''
      },
      form: {
        item1: [],  // 单选题
        item2: [], // 多选题
        item3: [], // 不定项选择题
        item4: [], // 判断题
        item5: [],  // 填空题
        item6: [],
        item7: []
      },
      list: [],
      lessonList: [],
      typeList: [],
      letterArray: ['A', 'B', 'C', 'D', 'E', 'F'],
      current: 1,
      size: 10,
      total: 0,
      isLoading: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    // this.getList()
    this.getLessonList()
    this.getTypeList()
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll)
  },
  methods: {
    getList() {
      this.$axios('/yxs/api/web/question/questionCourseList', {
        params: {
          courseId: this.courseId,
          typeId: this.type,
          stem: this.formInline.stem,
          difficulty: this.formInline.difficulty,
          lessonId: this.formInline.lessonId,
          userToken: this.userInfo.userToken,
          current: this.current,
          size: 10
        }
      }).then(res => {
        console.log(res)
        // if (this.current == res.data.newList.pages || res.data.newList.pages == 0) {
        //   this.isLoading = true
        // } else {
        //   this.isLoading = false
        // }
        // this.list = this.list.concat(res.data.newList.records)
        this.list = res.data.newList.records
        this.total = res.data.newList.total
        // 清空打开解析状态
        const domList = document.getElementsByClassName('desc')
        for (let i = 0; i < domList.length; i++) {
          document.getElementsByClassName('desc')[i].style.display = 'none'
        }
        if(this.type == 2) {
          for(let i in this.list) {
            this.form.item2[i] = []
          }
        }
        if(this.type == 5) {
          for(let i in this.list) {
            this.form.item5[i] = []
          }
        }
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
      this.$axios('/yxs/questiontype/typeList', {
        params: {
          courseId: this.courseId
        }
      }).then(res => {
        this.typeList = res
        this.type = this.typeList[0].value
        this.changeType(this.type)
      })
    },
    changeType(val) {
      this.type = val
      // 切换分页始初始化
      this.list = []
      this.current = 1
      this.isLoading = false
      this.getList()
    },
    toggle(e) {
      let nextEl = e.currentTarget.nextElementSibling
      if(nextEl.style.display == 'block') {
        nextEl.style.display = 'none'
      } else {
        nextEl.style.display = 'block'
      }
    },
    clear() {
      this.$confirm('确定清空重做吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.item1 = []
        for(let i in this.list) {
          this.form.item2[i] = []
        }
        this.form.item3 = []
        this.form.item4 = []
        for(let i in this.list) {
          this.form.item5[i] = []
        }
        console.log(this.form)
      }).catch(() => {

      });
    },
    toExam() {
      this.$confirm('将为您随机抽取50道题生成模拟试卷，题库不足将全部题目生成试卷，答题限时120分钟', '温馨提示', {
        confirmButtonText: '继续生成',
        cancelButtonText: '稍后再说',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          name: 'exam',
          query: {
            title: this.title,
            courseId: this.courseId
          }
        })
      }).catch(() => {
               
      });
    },
    currentChange(val) {
      window.scrollTo(0, 0)
      this.current = val
      this.getList()
    }
    // scroll() {
    //   let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= document.documentElement.offsetHeight / 2
    //   if (bottomOfWindow && !this.isLoading) {
    //     this.isLoading = true
    //     this.current += 1
    //     this.getList()
    //   }
    // }
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
            margin-left: 30px;
            height: 32px;
            line-height: 32px;
            font-size: 16px;
            cursor: pointer;
            &:first-child {
              margin-left: 0;
            }
            &:hover, &.active {
              // background: #3f8a38;
              border-bottom: 2px solid #3f8a38;
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
      position: sticky;
      top: 0;
      width: 260px;
      height: 300px;
      margin-left: 20px;
      background: #fff;
      .btns {
        margin-top: 90px;
      }
      .button {
        width: 230px;
        height: 40px;
        margin: 30px auto;
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
    width: 780px;
    margin: 40px auto 10px;
  }
  .top .el-input {
    width: 300px;
  }
  .top .el-button.el-button--primary {
    background: #3f8a38;
    border-color: #3f8a38;
  }
</style>
