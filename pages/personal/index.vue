<template>
  <div>
    <personal-tab :tab-index="tabIndex" />
    <div class="content">
      <div class="header">
        <div class="title">我的资料</div>
        <div
          v-if="!isEdit"
          class="button"
          @click="edit">编辑</div>
        <div
          v-else
          class="button"
          @click="save">保存</div>
      </div>
      <el-form
        v-if="isEdit"
        ref="form"
        :model="form"
        class="form"
        label-width="80px">
        <el-form-item label="头像">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/">
            <img
              v-if="form.avatar"
              :src="form.avatar"
              class="avatar">
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <div class="flex">
          <el-form-item
            label="用户名">
            <el-input v-model="form.userName" />
          </el-form-item>
          <span>可修改一次</span>
        </div>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      
      <el-form
        v-else
        class="form"
        label-width="80px">
        <el-form-item label="头像：">
          <img
            v-show="form.avatar"
            :src="form.avatar"
            class="avatar">
          <i
            v-show="!form.avatar"
            class="el-icon-plus avatar-uploader-icon" />
        </el-form-item>
        <div class="flex">
          <el-form-item
            label="用户名：">
            <div>{{ form.userName }}</div>
          </el-form-item>
        </div>
        <el-form-item label="昵称：">
          <div>{{ form.nickName ? form.nickName : '未设置' }}</div>
        </el-form-item>
        <el-form-item label="性别：">
          <div>{{ form.sex == 0 ? '男' : '女' }}</div>
        </el-form-item>
        <el-form-item label="生日：">
          <div>{{ form.birthday ? form.birthday : '未设置' }}</div>
        </el-form-item>
        <el-form-item label="地区：">
          <div>{{ form.address ? form.address : '未设置' }}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import PersonalTab from '~/components/mine/personalTab.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    PersonalTab
  },
  data() {
    return {
      isEdit: false,
      tabIndex: 1,
      userInfo: '',
      form: {
        userName: '',
        nickName: '',
        sex: '0',
        birthday: '',
        avatar: '',
        address: ''
      },
      form2: {},
      options: []
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$axios('/admin/api/web/user/info', {
        params: {
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        this.form = res.data
      })
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.form.avatar = URL.createObjectURL(file.raw);
    },
    // 上传前
    beforeAvatarUpload() {
      
    },
    // 监听地区
    handleChange() {

    },
    edit() {
      this.isEdit = true
    },
    save() {
      // this.$axios.setHeader('Content-Type', 'application/json', ['post'])
      this.$axios.post('/admin/api/web/user/update', {
        userToken: this.userInfo.userToken,
        userName: this.form.userName,
        nickName: this.form.nickName,
        sex: this.form.sex,
        birthday: this.form.birthday,
        avatar: this.form.avatar,
        address: this.form.address
      }).then(res => {
        if(res.code == 0) {
          this.isEdit = false
          this.getInfo()
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
    flex: 1;
    border: 1px solid #e4ecf3;
    border-radius: 4px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    color: #46C37B;
    font-size: 16px;
    border-bottom: 1px solid #F5F5F5;
    .title {
      border-bottom: 2px solid #46C37B;
    }
    .button {
      cursor: pointer;
    }
  }
  .form {
    margin-top: 20px;
    margin-left: 20px;
    .flex {
      display: flex;
      span {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        margin-left: 16px;
        color: #3F8A38;
        font-size: 14px;
      }
    }
  }
  .avatar {
    width: 66px;
    height: 66px;
    border-radius: 50%;
  }
</style>
<style>
  .el-form-item__content {
    width: 230px;
  }
  .el-upload.el-upload--text {
    width: 66px;
    height: 66px;
    /* background: #ccc; */
    border: 1px solid #e6e6e6;
    border-radius: 50%;
  }
  .el-icon-plus.avatar-uploader-icon {
    display: none;
  }
</style>