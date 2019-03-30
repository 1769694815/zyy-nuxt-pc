<template>
  <div
    v-show="showModal"
    class="mask-container">
    <div class="m-container">
      <div class="m-header">
        <div class="m-title">用户学员进度</div>
        <div
          class="m-close"
          @click="handleClose">
          <i class="iconfont icon-guanbixiaoxitishi"/>
        </div>
      </div>
      <div class="m-content">
        <div class="m-left">
          <ul>
            <li
              v-for="(item, index) in leftList"
              :key="index"
              :class="(tab === index + 1) ? 'active' : ''"
              @click="switchTab(item, index)">
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div class="m-right">
          <ul>
            <li
              v-for="(item, index) in rightList"
              :key="index">
              <div class="text">
                <span>{{ item.chapter }}</span>
                <span>{{ item.name }}</span>
                <span>{{ item.title }}</span>
              </div>
              <div class="percent">已学{{ item.result }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  props: {
    leftList: {
      type: Array,
      default: function() {
        return []
      }
    },
    userId: {
      type: Number,
      default: function() {
        return null
      }
    }
  },
  data() {
    return {
      showModal: false,
      tab: 1,
      uid: null,
      cid: null,
      userInfo: '',
      rightList: []
    }
  },
  watch: {
    leftList(newVal, oldVal) {
      if(newVal.length > 0) {
        this.cid = newVal[0].courseId
      }
    },
    userId(newVal, oldVal) {
      this.uid = newVal
      this.userInfo = Cookies.getJSON('zyy_userInfo')
      this.getList()
    }
  },
  mounted() {
    
  },
  methods: {
    handleClose() {
      this.showModal = false
      this.$emit('hide-modal')
    },
    switchTab(item, index) {
      this.tab = index + 1
      this.cid = item.courseId
      this.getList()
    },
    getList() {
      this.$axios('/yxs/api/web/user/getRegcordByUserIdAndCousreId', {
        params: {
          userId: this.uid,
          courseId: this.cid,
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        this.rightList = res.data.records
      })
    }
  },
  
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
      top: 120px;
      width: 920px;
      height: 516px;
      background: #fff;
      .m-header {
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
        height: 46px;
        line-height: 46px;
        color: #fff;
        background: #3F8A38;
        .m-close {
          cursor: pointer;
        }
      }
      .m-content {
        display: flex;
        padding: 30px;
        .m-left {
          position: absolute;
          width: 160px;
          li {
            // padding-left: 20px;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            color: #333;
            cursor: pointer;
            text-align: center;
            &.active {
              border: 1px solid #E4ECF3;
              border-right: 1px solid #fff;
              color: #3F8A38;
            }
          }
        }
        .m-right {
          width: 580px;
          min-height: 300px;
          margin-left: 159px;
          padding: 10px 50px 10px 70px;
          border: 1px solid #E4ECF3;
          border-radius: 4px;
          li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 54px;
            font-size: 14px;
            color: #666;
            border-bottom: 1px solid #E4ECF3;
            &:last-child {
              border-bottom: none;
            }
            span {
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
</style>
