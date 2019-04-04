<template>
  <div>
    <v-header
      ref="searchRef"
      @getList="getList" />
    <div style="width: 1200px; overflow:hidden; margin: 0 auto; border-right: 1px solid #ddd">
      <v-nav />
    </div>
    <ul
      v-if="result.length > 0"
      class="train-ul">
      <li
        v-for="(item, index) in result"
        :key="index" 
        class="train-class"
        @click="toLessonDetail(item.id)">
        <div class="img-box">
          <img :src="item.middle_picture">
        </div>
        <div class="content">
          <div class="title">{{ item.title }}</div>
          <div class="info">
            <span
              v-if="item.price == 0"
              class="free">免费
            </span>
            <span
              v-else
              class="price">￥{{ item.price }}
            </span>
            <span class="number">{{ item.student_num }}人学过</span>
          </div>
        </div>
      </li>
    </ul>
    <div
      v-if="result.length == 0"
      class="nothing">
      <div class="content">
        <img src="~/assets/images/nothing.png">
        <div class="tips">
          没有找到<span>"{{ title }}"</span>相关的课程
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from '~/components/navBar.vue'
import Header from '~/components/layout/header.vue'
export default {
  components: {
    'v-nav': Nav,
    'v-header': Header
  },
  data() {
    return {
      title: this.$route.query.title || '',
      result: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    toLessonDetail(id) {
      this.$router.push({
        name: 'lessonDetail',
        query: {
          id
        }
      })
    },
    getList(text, flag) {
      if(flag) {
        this.title = text
      }
      this.$axios('/yxs/api/web/course/getSelectCourseByTitle', {
        params: {
          title: this.title || ''
        }
      }).then(res => {
        this.result = res.data.records
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .train-ul {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .train-class {
    width: 218px;
    display: inline-block;
    align-items: center;
    margin: 20px 0;
    margin-left: 19px;
    overflow: hidden;
    &:nth-child(5n + 1){
      margin-left: 0;
    }
    .img-box {
      width: 218px;
      height: 122px;
      overflow: hidden;
      border-radius: 6px;
      cursor: pointer;
      &:hover img {
        transform: scale(1.1, 1.1);
      }
    }
    img {
      width: 218px;
      height: 122px;
      background: rgba(98,98,98,1);
      transition: all 0.3s ease 0s;
    }
    .content {
      padding: 0 10px;
      .title {
        width: 100%;
        margin-top: 15px;
        font-size: 14px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .info {
        margin-top: 9px;
        font-size: 0;
        .free {
          display: inline-block;
          width: 34px;
          height: 19px;
          line-height: 19px;
          font-size: 12px;
          text-align: center;
          color: #fff;
          background: #3F8A38;
          border-radius: 2px;
        }
        .price {
          display: inline-block;
          height: 19px;
          line-height: 19px;
          padding: 0 6px;
          font-size: 12px;
          background: #FBB03B;
          color: #fff;
          border-radius: 2px;
        }
        .lesson {
          margin-left: 12px;
          font-size: 12px;
          color: #999;
        }
        .number {
          font-size: 12px;
          color: #999;
          float: right;
        }
      }
    }
  }
  .nothing {
    width: 1200px;
    margin: 150px auto;
    text-align: center;
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      .tips {
        margin-left: 20px;
        font-size: 16px;
        span {
          color: red;
        }
      }
    }
  }
</style>
