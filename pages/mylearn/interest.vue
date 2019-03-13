<template>
  <div>
    <left-tab :tab-index="tabIndex" />    
    <div class="mylearn-right">
      <div class="header">
        <div class="title">全部关注</div>
        <div
          v-if="!isEdit"
          class="button"
          @click="edit">编辑
        </div>
        <div
          v-else
          class="button">
          <span
            class="save"
            @click="save">保存修改</span>
          <span
            class="cancel"
            @click="cancel">取消操作</span>
        </div>
      </div>
      <div class="center">
        <ul>
          <li
            v-for="(item,index) in contentList"
            :key="index"
            class="list-item">
            <img :src="item.pic">
            <div
              v-show="isEdit"
              class="mask"
              @mouseenter="mouseEnter(index)"
              @mouseleave="mouseLeave(index)"
              @click="cancelCollect(index)">
              <div
                :ref="'text' + index"
                class="text">
                取消关注
              </div>
            </div>
            <div class="content">
              <div class="title">{{ item.name }}</div>
              <div class="foot">
                <span class="rank">{{ item.title }}</span>
                <span class="number">{{ item.fanNum }}人关注</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import LeftTab from '~/components/mine/leftTab.vue'
export default {
  components: {
    LeftTab
  },
  data() {
    return {
      tab: 1,
      tabIndex: 5,
      isEdit: false,
      size: 10,
      current: 1,
      navList:[
        { label: '全部课程', value: 1 },
        { label: '学习中', value: 2 },
        { label: '已学完', value: 3 },
        { label: '未学完', value: 4 },
        { label: '已到期', value: 5 }
      ],
      contentList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    switchTab(index){
      this.tab = index + 1;
    },
    edit() {
      this.isEdit = true
    },
    save() {
      this.isEdit = false
    },
    cancel() {
      this.isEdit = false
    },
    mouseEnter(index) {
      this.$refs['text'+ index][0].style.display = 'block'
    },
    mouseLeave(index) {
      this.$refs['text'+ index][0].style.display = 'none'
    },
    cancelCollect(index) {
      this.contentList.splice(index, 1);
    },
    getList() {
      let userToken = localStorage.getItem('zyy_userToken')
      if(userToken) {
        this.$axios.setHeader('userToken', userToken)
      }
      let params = {
        size: this.size,
        current: this.current
      }
      this.$axios('/yxs/api/web/user/getFamousCollectionPageByUserId', {
        params
      }).then(res => {
        this.contentList = res.data.records
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .mylearn-right{
    width: 850px;
    border: 1px solid rgba(228, 236, 243, 1);
    border-radius: 4px;
    box-sizing: border-box;
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
        font-size: 16px;
        color: #666;
        cursor: pointer;
        .save {
          color: #3F8A38;
        }
        .cancel {
          color: #666;
          margin-left: 30px;
        }
      }
    }
    .right-nav {
      border-bottom: 1px solid rgba(228, 236, 243, 1);
      margin: 0 16px;
      box-sizing: border-box;
      li {
        display: inline-block;
        margin-right: 30px;
        font-size: 16px;
        cursor: pointer;
        color: #666;
        box-sizing: border-box;
        line-height: 54px;
      }
      .active {
        color:#46C37B;
        border-bottom: 2px solid #46C27B;
      }
    }
    .center {
      padding-bottom: 30px;
      .list-item {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 243px;
        height: 190px;
        margin-left: 30px;
        margin-top: 30px;
        img {
          width: 243px;
          height: 136px;
          border-radius: 6px;
        }
        .mask {
          position: absolute;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 243px;
          height: 136px;
          border-radius: 6px;
          background: rgba(0, 0, 0, .6);
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          .text {
            display: none;
          }
        }
        .content {
          padding: 0 10px;
        }
        .title {
          margin-top: 12px;
          font-size: 14px;
          color: #333;
        }
        .foot {
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          width: 100%;
          margin-top: 10px;
          font-size: 12px;
          color: #999;
          span {
            display: inline-block;
          }
          .rank {
            color: #3F8A38;
          }
        }
      }
    }
  }
</style>
