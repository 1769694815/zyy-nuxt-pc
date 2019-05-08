<template>
  <div
    v-show="showModal"
    id="student"
    class="mask-container">
    <div class="m-container">
      <div class="m-header">
        <div class="m-title">批量导入学员</div>
        <div
          class="m-close"
          @click="handleClose">
          <i class="iconfont iconguanbi"/>
        </div>
      </div>
      <div class="m-content">
        <div class="info">
          <el-form
            :model="form"
            label-width="100px">
            <el-form-item label="选择文件:">
              <el-upload
                :on-change="handleChange"
                :file-list="fileList"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/" >
                <el-button
                  size="small"
                  type="primary">点击上传</el-button>
              </el-upload>
              <span class="down">下载模板示例</span>
            </el-form-item>
            <el-form-item label="支付金额:">
              <el-input
                v-model="form.price"
                placeholder="如未填写，则默认本班当前设定价格￥5000" />元 
            </el-form-item>
            <el-form-item label="备注:">
              <el-input
                v-model="text"
                placeholder="可备注学员加入本班的来源，仅限10个文字"
                maxlength="10" />
            </el-form-item>
          </el-form>
          <div
            class="button"
            @click="confirm">添加到本班</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    user: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      showModal: false,
      info: {},
      text: '',
      userInfo: {},
      form: {
        phone: '',
        price: '',
        text: ''
      }
    }
  },
  watch: {
    dataObj(newVal, oldVal) {
      this.info = newVal
      this.text = newVal.remark
    },
    user(newVal, oldVal) {
      this.userInfo = newVal
    }
  },
  methods: {
    handleClose() {
      this.showModal = false
      this.$emit('hide-modal')
    },
    confirm() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
  .mask-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, .6);
    .m-container {
      position: absolute;
      top: 220px;
      width: 590px;
      // height: 331px;
      background: #fff;
      .m-header {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #3F8A38;
        .m-close {
          cursor: pointer;
          i {
            font-size: 12px;
          }
        }
      }
      .m-content {
        padding: 0 20px;
        .info {
          margin-top: 50px;
          .down {
            color: #3F8A38;
            cursor: pointer;
          }
          .upload-demo {
            display: flex;
          }
        }
        .button {
          width: 120px;
          height: 34px;
          margin: 30px auto;
          line-height: 34px;
          background: #3F8A38;
          color: #fff;
          font-size: 16px;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
</style>
<style>
  #student .el-input {
    width: 360px;
  }
</style>
