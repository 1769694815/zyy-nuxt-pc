<template>
  <div
    v-show="showModal"
    class="mask-container">
    <div class="m-container">
      <div class="m-header">
        <div class="m-title">添加备注</div>
        <div
          class="m-close"
          @click="handleClose">
          <i class="iconfont iconguanbi"/>
        </div>
      </div>
      <div class="m-content">
        <div class="info">
          <div class="text">
            给学员{{ dataObj.userName }}的备注：
          </div>
          <el-input
            v-model="text"
            placeholder="可备注学员加入本班的来源，仅限10个文字"
            maxlength="10" />
          <div
            class="button"
            @click="confirm">添加备注</div>
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
      userInfo: {}
    }
  },
  watch: {
    dataObj(newVal, oldVal) {
      this.info = newVal
      this.text = newVal.remark
      console.log('info', this.info)
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
      this.$axios.post('/yxs/api/web/user/updateMember', {
        userToken: this.userInfo.userToken,
        id: parseInt(this.info.id),
        remark: this.text
      }).then(res => {
        this.$message({
          type: 'success',
          message: '添加备注成功!'
        })
        this.showModal = false
        this.$emit('hide-modal')
      })
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
      height: 331px;
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
          .text {
            margin-bottom: 20px;
            font-size: 14px;
            color: #666;
          }
        }
        .button {
          width: 120px;
          height: 34px;
          margin: 50px auto;
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

