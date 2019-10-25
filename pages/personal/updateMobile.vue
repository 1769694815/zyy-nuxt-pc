<template>
  <div>
    <personal-tab :tab-index="tabIndex" />    
    <div class="content">
      <div class="header">
        <div class="title">
          <span
            style="cursor: pointer"
            @click="firstShow = true; secondShow = false; thirdShow = false">
            安全设置
          </span>>验证原号码
          <span v-show="secondShow || thirdShow">>设置新号码</span>
          <span v-show="thirdShow">>修改成功</span>
        </div>
      </div>
      <div v-show="firstShow">
        <div class="info">
          <div class="info-item">
            <div class="title">验证号码：</div>
            <div class="tel">{{ phone ? formatPhone(phone) : '' }}</div>
          </div>
          <div class="info-item">
            <div class="title">输入验证码：</div>
            <div class="tel">
              <el-input v-model="validNum1" />
            </div>
            <div
              v-show="!timeShow"
              class="operate"
              @click="getCode">获取短信</div>
            <div
              v-show="timeShow"
              class="operate">已发送，{{ count }}秒后重试</div>
          </div>
        </div>
        <div
          class="button"
          @click="next">下一步</div>
      </div>
      <div v-show="secondShow">
        <div class="info">
          <div class="info-item">
            <div class="title">新号码：</div>
            <div class="tel">
              <el-input
                v-model="newMobile"
                style="width: 222px;" />
            </div>
          </div>
          <div class="info-item">
            <div class="title">输入验证码：</div>
            <div class="tel">
              <el-input v-model="validNum2" />
            </div>
            <div
              v-show="!timeShow2"
              class="operate"
              @click="getCode2">获取短信</div>
            <div
              v-show="timeShow2"
              class="operate">已发送，{{ count2 }}秒后重试</div>
          </div>
        </div>
        <div
          class="button"
          @click="submit">确认提交
        </div>
      </div>
      <div v-show="thirdShow">
        <div class="center">
          <div class="title">修改成功</div>
          <p>
            <span>{{ leftTime }}s后</span>
            自动返回安全设置首页，如未跳转可点击
            <span
              class="back"
              @click="back">返回>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PersonalTab from '~/components/mine/personalTab.vue'
import { isvalidatemobile, validatenull } from '~/assets/js/util'
export default {
  components: {
    PersonalTab
  },
  data() {
    return {
      tabIndex: 3,
      validNum1: '',
      validNum2: '',
      newMobile: '',
      firstShow: true,
      secondShow: false,
      thirdShow: false,
      timer: null,
      leftTime: 3,
      phone: this.$route.query.phone,
      timeShow: false,
      timer2: null,
      timer3: null,
      timeShow2: false,
      count: null,
      count2: null
    }
  },
  head() {
    return {
      title: '个人中心_'
    }
  },
  methods: {
    formatPhone(phone) {
      return phone.substr(0, 3) + '*****' + phone.substr(8)
    },
    // 获取验证码
    getCode() {
      let result = isvalidatemobile(this.phone)
      if(result[0]) {
        this.$message({
          message: result[1],
          type: 'warning'
        })
      } else {
        this.$axios.post('/admin/api/account/code', {
          phone: this.phone
        }).then(res => {
          console.log(res)
          if(res.code == 0) {
            this.$message({
              message: '已发送验证码，请查收！',
              type: 'success'
            })
            const TIME_COUNT = 60
            if(!this.timer) {
              this.count = TIME_COUNT
              this.timeShow = true
              this.timer = setInterval(() => {
                if(this.count > 0 && this.count <= TIME_COUNT) {
                  this.count --
                } else {
                  this.timeShow = false
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            }
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      }
    },
    getCode2() {
      let result = isvalidatemobile(this.newMobile)
      if(result[0]) {
        this.$message({
          message: result[1],
          type: 'warning'
        })
      } else {
        this.$axios.post('/admin/api/account/code', {
          phone: this.newMobile
        }).then(res => {
          console.log(res)
          if(res.code == 0) {
            this.$message({
              message: '已发送验证码，请查收！',
              type: 'success'
            })
            const TIME_COUNT = 60
            if(!this.timer2) {
              this.count2 = TIME_COUNT
              this.timeShow2 = true
              this.timer2 = setInterval(() => {
                if(this.count2 > 0 && this.count2 <= TIME_COUNT) {
                  this.count2 --
                } else {
                  this.timeShow2 = false
                  clearInterval(this.timer2)
                  this.timer2 = null
                }
              }, 1000)
            }
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      }
    },
    next() {
      if(!this.validNum1) {
        this.$message({
          message: '请输入验证码',
          type: 'warning'
        })
        return
      }
      this.$axios.post('/admin/api/account/phoneCode', {
        phone: this.phone,
        code: this.validNum1
      }).then(res => {
        if(res.code == 0) {
          this.firstShow = false
          this.secondShow = true
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    submit() {
      this.$axios.post('/admin/api/web/user/changePhone', {
        phone: this.newMobile,
        code: this.validNum2
      }).then(res => {
        if(res.code == 0) {
          this.firstShow = false
          this.secondShow = false
          this.thirdShow = true
          this.timer3 = setInterval(() => {
            if(this.leftTime < 1) {
              // this.firstShow = true
              // this.secondShow = false
              // this.thirdShow = false
              // this.leftTime = 3
              clearInterval(this.timer)
              this.$router.push({
                name: 'personal-security'
              })
            }
            this.leftTime --
          }, 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
      
    },
    back() {
      clearInterval(this.timer3)
      this.$router.push({
        name: 'personal-security'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
    flex: 1;
    padding: 0 15px;
    border: 1px solid #e4ecf3;
    border-radius: 4px;
    min-height: 360px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    color: #666;
    font-size: 16px;
    border-bottom: 1px solid #f5f5f5;
  }
  .info {
    margin-left: 30px;
    &-item {
      display: flex;
      align-items: center;
      margin-top: 40px;
      color: #666;
      font-size: 14px;
      .title {
        width: 120px;
      }
      .tel {
        width: 148px;
        // margin-left: 20px;
      }
      .operate {
        margin-left: 20px;
        color: #3F8A38;
        font-size: 14px;
        cursor: pointer;
      }
      input {
        width: 148px;
        height: 30px;
      }
    }
  }
  .button {
    width: 148px;
    height: 34px;
    margin-top: 40px;
    margin-left: 150px;
    line-height: 34px;
    border: 1px solid #3F8A38;
    color: #3F8A38;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
  }
  .center {
    text-align: center;
    .title {
      margin-top: 40px;
      font-size: 24px;
      color: #666;
    }
    p {
      margin-top: 35px;
      font-size: 14px;
      color: #666;
      span {
        color: #3F8A38;
      }
      .back {
        cursor: pointer;
      }
    }
  }
</style>
