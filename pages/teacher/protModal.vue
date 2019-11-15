<template>
  <el-dialog
    :visible.sync="showModal"
    width="30%"
    title="导出">
    <el-form>
      <el-form-item
        label="选择班级"
        label-width="100px">
        <el-select
          v-model="value"
          placeholder="请选择需要导出的班级"
          @change="selectClass">
          <el-option
            v-for="(item, index) in classList"
            :key="index"
            :label="item.title"
            :value="item.paperId" />
        </el-select>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false
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
      portModalShow: false,
      classList: [],
      region: [],
      value: '',
      paperId: '',
      paperTitle: '',
      form: {},
      userInfo: {},
      oldOptions: []
    }
  },
  watch: {
    user(newVal, oldVal) {
      this.userInfo = newVal
      this.getList()
    }
  },
  mounted() {
  },
  methods: {
    getList() {
      this.$axios('/yxs/api/web/question/exportExamTitleList', {
        params: {
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        console.log('试卷列表', res)
        this.classList = res
        // this.classList.unshift({
        //   paperId: 0,
        //   title: '全部'
        // })
      })
    },
    handleClose() {
      this.$emit('hide-modal')
    },
    // selectClass(val) {
    //   console.log(val)
    //   let allValues = []
    //   for (let item of this.classList) {
    //     allValues.push(item.paperId)
    //   }

    //   const oldVal = this.oldOptions.length === 0 ? [] : this.oldOptions[1]

    //   if (val.includes(0)) {
    //     this.region = allValues
    //   }

    //   if (oldVal.includes(0) && !val.includes(0)) {
    //     this.region = []
    //   }

    //   if (oldVal.includes(0) && val.includes(0)) {
    //     const index = val.indexOf(0)
    //     val.splice(index, 1)
    //     this.region = val
    //   }
      
    //   if (!oldVal.includes(0) && !val.includes(0)) {
    //     if (val.length === allValues.length - 1) {
    //       this.region = [0].concat(val)
    //     }
    //   }
    //   this.oldOptions[1] = this.region
    //   // this.courseId = e
    // },
    selectClass(val) {
      console.log('val', val)
      this.paperId = val
      for (let i = 0; i < this.classList.length; i++) {
        if (this.classList[i].paperId == val) {
          this.paperTitle = this.classList[i].title
        }
      }
    },
    confirm() {
      const loading = this.$loading({
        lock: true,
        text: '导出中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.handleClose()
      let xhr = new XMLHttpRequest()
      let formData = new FormData()
      let filename = null
      let url = '/api/yxs/api/web/user/exportTestScores?paperId=' + this.paperId + '&userToken=' + this.userInfo.userToken

      xhr.open(
        'get',
        url
      )
      filename = this.paperTitle + '.xls'
      xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get('zyy_accessToken'))
      xhr.responseType = 'blob'
      xhr.onload = function(e) {
        loading.close()
        if(this.status == 200) {
          let blob = this.response
          console.log(blob)
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
.el-select {
  width: 100%;
}
</style>
