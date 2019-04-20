<template>
  <div>
    <v-header
      ref="searchRef"
      @getList="getList" />
    <div style="width: 1200px; overflow:hidden; margin: 0 auto;">
      <v-nav />
    </div>
    <div
      v-if="result.length > 0"
      class="list">
      <div class="desc">
        为您找到{{ total }}条内容
      </div>
      <ul class="train-ul">
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
                class="price">&yen;{{ item.price }}
              </span>
              <span class="number">{{ item.student_num }}人学过</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      v-else
      class="nothing">
      <div class="content">
        <img src="~/assets/images/nothing.png">
        <div class="tips">
          没有找到<span>"{{ title }}"</span>相关的课程
        </div>
      </div>
    </div>
    <Pagination
      :size="size"
      :current="current"
      :total="total"
      @sizeChange="sizeChange"
      @currentChange="currentChange" />
  </div>
</template>
<script>
import Nav from '~/components/navBar.vue'
import Header from '~/components/layout/header.vue'
import Pagination from '~/components/pagination.vue'
export default {
  components: {
    'v-nav': Nav,
    'v-header': Header,
    Pagination
  },
  data() {
    return {
      size: 25,
      current: 1,
      title: this.$route.query.title || '',
      result: [],
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    toLessonDetail(id) {
      let url = this.$router.resolve({
        name: 'lessonDetail',
        query: {
          id
        }
      })
      window.open(url.href, '_blank')
    },
    getList(text, flag) {
      if(flag) {
        this.title = text
      }
      this.$axios('/yxs/api/web/course/getSelectCourseByTitle', {
        params: {
          size: this.size,
          current: this.current,
          title: this.title || ''
        }
      }).then(res => {
        this.result = res.data.records
        this.total = res.data.total
      })
    },
    sizeChange(val) {
      this.size = val
    },
    currentChange(val) {
      window.scrollTo(0, 0)
      this.current = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .list {
    width: 1200px;
    min-height: 600px;
    margin: 0 auto;
    overflow: hidden;
    .desc {
      margin-top: 20px;
    }
  }
  .train-class {
    width: 218px;
    display: inline-block;
    align-items: center;
    margin: 10px 0;
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
