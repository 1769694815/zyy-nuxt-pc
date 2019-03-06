<template>
  <div class="content">
    <div class="header">
      <div class="title">安全设置>验证原号码
        <span v-show="secondShow || thirdShow">>设置新号码</span>
        <span v-show="thirdShow">>修改成功</span>
      </div>
    </div>
    <div v-show="firstShow">
      <div class="info">
        <div class="info-item">
          <div class="title">验证号码：</div>
          <div class="tel">152****6064</div>
        </div>
        <div class="info-item">
          <div class="title">输入验证码：</div>
          <div class="tel">
            <el-input v-model="validNum" />
          </div>
          <div class="operate">获取短信</div>
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
            <el-input v-model="validNum" />
          </div>
          <div class="operate">获取短信</div>
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
</template>
<script>
export default {
  data() {
    return {
      validNum: null,
      newMobile: '',
      firstShow: true,
      secondShow: false,
      thirdShow: false,
      timer: null,
      leftTime: 3
    }
  },
  methods: {
    next() {
      this.firstShow = false
      this.secondShow = true
    },
    submit() {
      this.firstShow = false
      this.secondShow = false
      this.thirdShow = true
      this.timer = setInterval(() => {
        if(this.leftTime < 1) {
          this.firstShow = true
          this.secondShow = false
          this.thirdShow = false
          this.leftTime = 3
          clearInterval(this.timer)
          return
        }
        this.leftTime --
      }, 1000)
    },
    back() {
      this.firstShow = true
      this.secondShow = false
      this.thirdShow = false
      this.leftTime = 3
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
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
