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
          v-model="region"
          placeholder="请选择需要导出的班级"
          @change="selectClass">
          <el-option
            v-for="(item, index) in classList"
            :key="index"
            :label="item.title"
            :value="item.id" />
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
    classRoomId: {
      type: String,
      default: ''
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
      region: '',
      classId: '',
      courseId: '',
      form: {},
      userInfo: {}
    }
  },
  watch: {
    classRoomId(newVal, oldVal) {
      this.classId = newVal
      this.getClassList()
      console.log(this.classId)
    },
    user(newVal, oldVal) {
      this.userInfo = newVal
    }
  },
  mounted() {
  },
  methods: {
    getClassList() {
      console.log('mehtods', this.classId)
      this.$axios('/yxs/classroom/getClassroomAllCourse', {
        params: {
          classroomId: this.classId
        }
      }).then(res => {
        console.log(res)
        this.classList = res
      })
    },
    handleClose() {
      this.$emit('hide-modal')
    },
    selectClass(e) {
      console.log(e)
      this.courseId = e
    },
    confirm() {
      this.handleClose()
      let xhr = new XMLHttpRequest()
      let formData = new FormData()
      let filename = null

      xhr.open(
        'get',
        '/api/yxs/classroommember/exportClassMember?classroomId=' + this.classId + '&courseId=' + this.courseId + '&flag=false'
      )
      filename = '课程成员表.xls'
      xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get('zyy_accessToken'))
      xhr.responseType = 'blob'
      xhr.onload = function(e) {
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
</style>
