<template>
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
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar">
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <div class="flex">
        <el-form-item
          label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <span>可修改一次</span>
      </div>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="地区">
        <el-cascader
          :options="options"
          v-model="form.selectedOptions"
          placeholder="选择地区"
          @change="handleChange" />
      </el-form-item>
    </el-form>
    <el-form
      v-else
      class="form"
      label-width="80px">
      <el-form-item label="头像：">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar">
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon" />
      </el-form-item>
      <div class="flex">
        <el-form-item
          label="用户名：">
          <div>wx_2019wo我做主</div>
        </el-form-item>
      </div>
      <el-form-item label="昵称：">
        <div>未设置</div>
      </el-form-item>
      <el-form-item label="性别：">
        <div>男</div>        
      </el-form-item>
      <el-form-item label="生日：">
        <div>未设置</div>
      </el-form-item>
      <el-form-item label="地区：">
        <div>未设置</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEdit: false,
      form: {
        username: 'wx_2019wo我做主',
        nickname: '未设置',
        sex: '男',
        birthday: [],
        selectedOptions: []
      },
      imageUrl: 'https://goss.veer.com/creative/vcg/veer/1600water/veer-303672143.jpg',
      options: []
    }
  },
  methods: {
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
      this.isEdit = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
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