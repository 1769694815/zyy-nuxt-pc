<template>
  <div class="right-content">
    <div class="header">
      <div class="search">
        <div class="input">
          <input
            type="text"
            placeholder="搜索用户名查看学员进度">
        </div>
        <div class="search-icon">
          <img src="~/assets/images/search.png">
        </div>
      </div>
      <div class="nav">
        <ul>
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="tab === (index + 1)? 'active' : ''" 
            @click="switchTab(index)"> {{ item.label }} </li>
        </ul>
      </div>
    </div>
    <div class="rank-content">
      <ul>
        <li
          v-for="(item, index) in rankList"
          :key="index"
          @click="modalShow">
          <div 
            :class="(index + 1) > 3 ? 'none' : ''"
            class="num" >{{ index + 1 }}</div>
          <div class="box">
            <img :src="item.avatar">
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <el-progress
                :percentage="item.percent"
                :show-text="false"
                color="linear-gradient(-90deg,rgba(145,189,53,1),rgba(63,138,56,1))"
                class="progress" />
            </div>
            <div class="text">已学{{ item.percent }}%</div>
            <div class="like">
              <i class="iconfont icon-aixin" />
              <span>{{ item.zan }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <progress-modal
      v-show="showModal"
      @hide-modal="hideModal" />
  </div>
</template>
<script>
import ProgressModal from '~/components/modal/progressModal.vue'
export default {
  components: {
    ProgressModal
  },
  data() {
    return {
      tab: 1,
      showModal: false,
      navList: [
        { label: "药理学", value: 1 },
        { label: "中医药理论", value: 2 }
      ],
      rankList: [
        {
          num: 1,
          avatar: require('~/assets/images/wbc.jpg'),
          name: '蔬菜帮帮',
          percent: 80,
          zan: 12
        },
        {
          num: 1,
          avatar: require('~/assets/images/wbc.jpg'),
          name: '蔬菜帮帮',
          percent: 80,
          zan: 12
        },
        {
          num: 1,
          avatar: require('~/assets/images/wbc.jpg'),
          name: '蔬菜帮帮',
          percent: 80,
          zan: 12
        },
        {
          num: 1,
          avatar: require('~/assets/images/wbc.jpg'),
          name: '蔬菜帮帮',
          percent: 80,
          zan: 12
        }
      ]
    }
  },
  created() {

  },
  methods: {
    switchTab(index){
      this.tab = index + 1;
    },
    modalShow() {
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    hideModal() {
      this.showModal = false
      document.body.style.overflow = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .right-content {
    padding-bottom: 30px;
    border: 1px solid #E4ECF3;
    box-sizing: border-box;
    .header {
      padding: 0 16px;
    }
    .search {
      display: flex;
      align-items: center;
      width: 240px;
      height: 30px;
      margin-top: 16px;
      border-radius: 2px;
      .input {
        flex: 1;
        height: 30px;
        line-height: 30px;
        input {
          padding-left: 10px;
          width: 100%;
          height: 30px;
          outline: none;
          border: none;
          background: #E4ECF3;
        }
      }
      .search-icon {
        width: 30px;
        height: 30px;
        margin-top: 2px;
        background: #3F8A38;
        img {
          display: block;
          width: 14px;
          margin-top: 8px;
          margin-left: 8px;
        }
      }
    }
    .nav {
      border-bottom: 1px solid rgba(228, 236, 243, 1);
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
      .active{
        color:#46C37B;
        border-bottom: 2px solid #46C27B;
      }
    }
    .rank-content {
      margin-left: 26px;
      li {
        display: flex;
        align-items: center;
        height: 84px;
      }
      .num {
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        background: #3F8A38;
        color: #fff;
        font-size: 14px;
        text-align: center;
      }
      .none {
        background: #fff;
        color: #999;
      }
      .box {
        display: flex;
        align-items: center;
        margin-left: 20px;
        height: 84px;
        border-bottom: 1px solid #DEDEDE;
        img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }
        .info {
          width: 454px;
          margin-left: 16px;
          .name {
            font-size: 16px;
            color: #333;
          }
          .progress {
            margin-top: 12px;
          }
        }
        .text {
          margin-top: 28px;
          margin-left: 20px;
          font-size: 16px;
          color: #999;
        }
        .like {
          margin-top: 28px;
          margin-left: 20px;
          span {
            color: #B3B3B3;
          }
          .icon-aixin {
            color: #DEDEDE;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
