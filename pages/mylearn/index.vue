<template>
  <div>
    <left-tab :tab-index="tabIndex" />
    <div class="mylearn-right">
      <div class="right-nav">
        <ul>
          <li 
            v-for="(item,index) in navList" 
            :key="index" 
            :class="tab === (index + 1)? 'active' : ''" 
            @click="switchTab(index, item)"> {{ item.label }} </li>
        </ul>
      </div>
      <div class="center">
        <ul>
          <li
            v-for="(item,index) in contentList"
            :key="index"
            class="list-item"
            @click="$router.push({ name: 'lessonDetail', query: {id: item.courseId }})">
            <div class="img-box">
              <img :src="item.middlePicture">
            </div>
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <p
                v-if="item.dayCount != 0"
                class="desc">
                {{ item.dayCount }}天后到期
              </p>
              <p
                v-else
                class="desc">
                已到期
              </p>
              <div class="foot">
                <span>已学{{ item.result }}</span>
                <span>共{{ item.lessonNum }}节</span>
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
import Cookies from 'js-cookie'
export default {
  components: {
    LeftTab
  },
  data() {
    return {
      tab: 1,
      tabIndex: 1,
      size: 10,
      current: 1,
      type: 0,
      userInfo: '',
      navList:[
        { label: '全部课程', value: 0 },
        { label: '学习中', value: 3 },
        { label: '已学完', value: 2 },
        { label: '未学习', value: 1 },
        { label: '已到期', value: 4 }
      ],
      contentList: []
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    if(!this.userInfo) {
      this.$router.push({
        name: 'login'
      })
      return
    }
    this.getList()
  },
  methods: {
    switchTab(index, item){
      this.tab = index + 1;
      this.type = item.value
      this.getList()
    },
    getList() {
      let params = {
        size: this.size,
        current: this.current,
        type: this.type,
        userToken: this.userInfo.userToken
      }
      this.$axios('/yxs/api/web/user/getCourseMemberPageByUserId', {
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
    .right-nav{
      border-bottom: 1px solid rgba(228, 236, 243, 1);
      margin: 0 16px;
      box-sizing: border-box;
      li{
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
    .center {
      padding-bottom: 30px;
      .list-item {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 243px;
        height: 223px;
        margin-left: 30px;
        margin-top: 30px;
        cursor: pointer;
        .img-box {
          width: 243px;
          height: 146px;
          border-radius: 6px;
          overflow: hidden;
          &:hover img {
            transform: scale(1.1, 1.1);
          }
          &:hover .content .title{
            color: #3F8A38;
          }
        }
        img {
          width: 243px;
          height: 146px;
          border-radius: 6px;
          transition: all .3s ease 0s;
        }
        .content {
          padding: 0 10px;
        }
        .title {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 12px;
          font-size: 14px;
          color: #333;
        }
        p {
          margin-top: 12px;
          font-size: 12px;
          color: #3F8A38;
        }
        .foot {
          // display: flex;
          // justify-content: space-between;
          position: absolute;
          bottom: 0;
          width: 100%;
          margin-top: 10px;
          font-size: 12px;
          color: #999;
          span {
            display: inline-block;
            &:last-child {
              float: right;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
</style>
