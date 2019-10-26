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
                ref="upload"
                :auto-upload="false"
                :http-request="uploadFile"
                class="upload-demo"
                action="" >
                <el-button
                  size="small"
                  type="primary">点击上传</el-button>
              </el-upload>
              <span
                class="down"
                @click="downloadDemo">下载模板示例</span>
            </el-form-item>
            <el-form-item label="支付金额:">
              <el-input
                v-model="form.price"
                placeholder="如未填写，则默认本班当前设定价格￥5000" />元 
            </el-form-item>
            <el-form-item label="备注:">
              <el-input
                v-model="form.remark"
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
import Cookies from 'js-cookie'
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
    },
    classRoomId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showModal: false,
      info: {},
      text: '',
      userInfo: {},
      fileList: [],
      form: {
        price: '',
        remark: ''
      },
      classId: ''
    }
  },
  watch: {
    dataObj(newVal, oldVal) {
      this.info = newVal
    },
    user(newVal, oldVal) {
      this.userInfo = newVal
    },
    classRoomId(newVal, oldVal) {
      this.classId = newVal
    }
  },
  methods: {
    handleClose() {
      this.showModal = false
      this.$emit('hide-modal')
    },
    confirm() {
      this.$refs.upload.submit()
    },
    handleChange() {

    },
    uploadFile(e) {
      let form = new FormData()
      form.append('excel', e.file)
      form.append('remark', this.form.remark)
      form.append('price', this.form.price)
      form.append('classroomId', this.classId)
      form.append('userToken', this.userInfo.userToken)
      form.append('type', 0)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'file': true
        }
      }
      this.$axios.post('/admin/user/implAddUserPC', form, config).then(res => {
        console.log('上传', res)
        if (res.code == 0) {
          this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.handleClose()
        }
      })
    },
    downloadDemo() {
      let xhr = new XMLHttpRequest()
      let formData = new FormData()
      xhr.open('get', '/api/admin/user/downloadDemo')
      xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get('zyy_accessToken'))
      xhr.responseType = 'blob'
      xhr.onload = function() {
        if(this.status == 200) {
          let blob = this.response
          let filename = '下载模板.xls'
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename)
          } else {
            let a = document.createElement('a')
            let url = window.URL.createObjectURL(blob)
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
          }
        }
      }
      xhr.send(formData)

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
