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
            :data="uploadToken"
            class="avatar-uploader"
            action="http://upload.qiniup.com">
            <!-- http://up.qiniup.com -->
            <img
              v-if="form.avatar"
              :src="form.avatar"
              class="avatar">
            <img
              v-else
              src="~/assets/images/user-logo.png"
              class="avatar">
          </el-upload>
        </el-form-item>
        <div class="flex">
          <el-form-item
            label="用户名">
            <span>{{ form.userName }}</span>
            <!-- <el-input v-model="form.userName" /> -->
          </el-form-item>
          <!-- <span>可修改一次</span> -->
        </div>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName" />
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input v-model="form.realName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期" />
        </el-form-item>
        <el-form-item
          label="地区">
          <!-- <el-input v-model="form.address" /> -->
          <v-distpicker
            :province="form.provinceName || '省'"
            :city="form.cityName || '市'"
            :area="form.areaName || '区'"
            @selected="selected" />
        </el-form-item>
        <el-form-item label="职业选择">
          <el-select
            v-model="form.career"
            placeholder="请选择职业">
            <el-option
              v-for="(item, index) in careerList"
              :key="index"
              :label="item"
              :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      
      <el-form
        v-else
        class="form"
        label-width="100px">
        <el-form-item label="头像：">
          <img
            v-show="form.avatar"
            :src="form.avatar"
            class="avatar">
          <img
            v-show="!form.avatar"
            src="~/assets/images/user-logo.png"
            class="avatar">
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
        <el-form-item label="真实姓名：">
          <div>{{ form.realName ? form.realName : '未设置' }}</div>
        </el-form-item>
        <el-form-item label="性别：">
          <div>{{ form.sex == 0 ? '男' : '女' }}</div>
        </el-form-item>
        <el-form-item label="生日：">
          <div>{{ form.birthday ? form.birthday : '未设置' }}</div>
        </el-form-item>
        <el-form-item label="地区：">
          <div>{{ form.provinceName ? (form.provinceName + form.cityName + form.areaName): '未设置' }}</div>
        </el-form-item>
        <el-form-item label="职业：">
          <div>{{ form.career ? form.career : '未设置' }}</div>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      isEdit: false,
      tabIndex: 1,
      userInfo: '',
      uploadToken: {
        key: '',
        token: ''
      },
      form: {
        userName: '',
        nickName: '',
        sex: '0',
        birthday: '',
        avatar: '',
        address: '',
        career: '',
        provinceName: '',
        cityName: '',
        areaName: '',
        streetName: ''
      },
      form2: {},
      options: [],
      careerList: []
    }
  },
  head() {
    return {
      title: '个人中心'
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.getInfo()
    this.getCareerList()
  },
  methods: {
    getInfo() {
      this.$axios('/admin/api/web/user/info', {
        params: {
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        console.log('个人资料',res)
        this.form = res.data
      })
    },
    getCareerList() {
      this.$axios('/admin/api/web/account/careerList').then(res => {
        this.careerList = res.data.careers
      })
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.form.avatar = URL.createObjectURL(file.raw);
      // this.form.avatar = 'https://files.jzjxedu.com/' + res.key
      // console.log(URL.createObjectURL(file.raw))
    },
    // 上传前
    beforeAvatarUpload(file) {
      console.log('file', file)
      this.uploadToken.key=`upload_pic_${Date.parse(new Date())}${file.name}`
    },
    // 监听地区
    handleChange() {

    },

    selected(data) {
      this.form.provinceName = data.province.value
      this.form.cityName = data.city.value
      this.form.areaName = data.area.value
    },
    getToken() {
      this.$axios('/admin/api/qiniu/tokenupload').then(res => {
        this.uploadToken.token = res.data.accessKey
      })
    },
    edit() {
      this.isEdit = true
      this.getToken()
    },
    save() {
      // this.$axios.setHeader('Content-Type', 'application/json', ['post'])
      this.$axios.post('/admin/api/web/user/update', {
        userToken: this.userInfo.userToken,
        userName: this.form.userName,
        nickName: this.form.nickName,
        realName: this.form.realName,
        sex: this.form.sex,
        birthday: this.form.birthday,
        avatar: this.uploadToken.key,
        provinceName: this.form.provinceName,
        cityName: this.form.cityName,
        areaName: this.form.areaName,
        career: this.form.career
      }).then(res => {
        if(res.code == 0) {
          this.isEdit = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.userInfo.avatar = res.data.avatar
          this.userInfo.nickName = res.data.nickName
          this.userInfo.userName = res.data.userName
          Cookies.set('zyy_userInfo', this.userInfo)
          this.getInfo()
          // window.reload()
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
    min-height: 569px;
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
      width: 50px;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      background: #3F8A38;
      color: #fff;
      border-radius: 6px;
      text-align: center;
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
    width: 500px;
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