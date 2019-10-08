<template>
  <div class="container-detail">
    <div class="crumb">
      首页><span @click="$router.push({ name: 'toutiao' })">资讯头条</span>><span @click="$router.push({ name: 'toutiao', query: { type: categoryId } })">{{ categoryName }}</span>
    </div>
    <div class="article">
      <div class="article-header">
        <h1>{{ info.title }}</h1>
        <div class="detail">
          <span>{{ info.publishedTime }}</span>
          <span><i class="iconfont iconchakan" />
            {{ info.hits }}
          </span>
          <span><i class="iconfont iconpinglun" />
            {{ commentList.length }}
          </span>
          <span class="fenxiang"><i class="iconfont iconfenxiang" />
            分享
            <span
              class="social-share"
              data-sites="weibo,qzone,qq,wechat"
              data-title="中医药在线"
              data-wechat-qrcode-title="请打开微信扫一扫"
              data-wechat-qrcode-helper="<p>打开微信扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
              data-description="江西中医药大学继续教育学习平台" />
          </span>
        </div>
      </div>
      <article
        class="htmlContent ql-editor"
        v-html="info.body" />
      <!-- 评论 -->
      <div class="rating">
        <div class="title">我要评论</div>
        <div class="mine">
          <div class="avatar">
            <i class="iconfont iconyonghu1" />
          </div>
          <div class="textarea">
            <textarea
              v-model="text"
              placeholder="输入你的想法..." />
            <div
              class="button"
              @click="createComment">发表评论</div>
          </div>
        </div>
        <div class="all">
          <div class="all-top">
            <span>全部评论</span>
            <span class="number">{{ commentList.length }}条评论</span>
          </div>
          <ul class="list">
            <li
              v-for="(item, index) in commentList"
              :key="index"
              class="item">
              <div class="avatar">
                <!-- <i class="iconfont icon-user" /> -->
                <img :src="item.avatar">
              </div>
              <div class="content">
                <span class="name">{{ item.user_name }}</span>
                <span class="date">{{ item.createTime }}</span>
                <p>
                  {{ item.content }}
                </p>
              </div>
            </li>
          </ul>
          <div
            v-show="commentList.length == 0"
            style="margin: 20px 0; font-size: 16px;">
            暂无评论
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '~/components/navBar.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      title: '资讯头条',
      id: this.$route.query.id,
      info: {},
      text: '',
      userInfo: '',
      commentList: [],
      categoryName: '',
      categoryId: ''
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  async asyncData ({ $axios, query }) {
    // console.log('query', query)
    let { data } = await $axios('/yxs/api/web/news/detail', {params: { id: query.id }})
    return {
      info: data,
      categoryName: data.categoryName,
      categoryId: data.categoryId,
      title: data.title + '_资讯头条'
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.userInfo = Cookies.getJSON('zyy_userInfo') || ''
    // this.getDetail()
    this.getComment()
  },
  methods: {
    getDetail() {
      console.log(this.id)
      this.$axios('/yxs/api/web/news/detail', {
        params: {
          id: this.id
        }
      }).then(res => {
        this.info = res.data
      })
    },
    getComment() {
      let params = {
        objId: this.id,
        objType: 2, // 1：课程评论， 2：资讯评论
        current: 1,
        size: 10
      }
      this.$axios('/yxs/api/web/course/commentList', {
        params
      }).then(res => {
        this.commentList = res.data.records
      })
    },
    // 发表评论
    createComment() {
      if(!this.text) {
        this.$message({
          message: '请输入评论',
          type: 'warning'
        })
        return
      }
      this.$axios.post('/yxs/api/web/user/comment', {
        objId: this.id,
        objType: 2, // 1：课程评论， 2：资讯评论
        content: this.text,
        userToken: this.userInfo.userToken
      }).then(res => {
        this.text = ''
        this.$message({
          message: '已评论，待审核',
          type: 'success'
        })
        this.getComment()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container-detail {
    width: 1200px;
    margin: 0 auto;
  }
  
  .article {
    width: 830px;
    border-top: 1px solid #ddd;
    &-header {
      text-align: center;
      h1 {
        margin-top: 40px;
        font-size: 24px;
        color: #333;
        font-weight: 400;
      }
      .detail {
        margin-top: 24px;
        .fenxiang {
          position: relative;
          display: inline-block;
          width: 120px;
          cursor: pointer;
          &:hover .social-share {
            display: block;
          }
        }
        .social-share {
          display: none;
          position: absolute;
          right: -50px;
        }
        > span {
          margin-left: 50px;
          font-size: 14px;
          color: #999;
          &:first-child {
            margin: 0;
          }
        }
      }
    }
    article {
      padding: 30px 0 40px;
      p {
        font-size: 14px;
        line-height: 30px;
        color: #666;
      }
      img {
        width: 100%;
        margin: 20px 0;
      }
    }
  }
  .rating {
    .title {
      font-size: 24px;
      color: #333;
    }
    .mine {
      display: flex;
      margin-top: 25px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        .iconyonghu1 {
          font-size: 50px;
          color: #ddd;
        }
      }
      .textarea {
        flex: 1;
        display: flex;
        margin-left: 18px;
        textarea {
          box-sizing: border-box;
          flex: 1;
          padding: 20px;
          font-family: 'MicrosoftYaHei';
          font-size: 14px;
          border: 4px solid #ddd;
          border-right: none;
        }
        .button {
          width: 40px;
          height: 40px;
          padding: 30px;
          background: #3f8a38;
          font-size: 16px;
          color: #fff;
          line-height: 22px;
          letter-spacing: 4px;
          cursor: pointer;
        }
      }
    }
    .all {
      margin-top: 20px;
      padding-bottom: 20px;
      &-top {
        padding: 15px 0;
        font-size: 18px;
        color: #333;
        border-bottom: 1px solid #ddd;
        .number {
          margin-left: 10px;
          font-size: 14px;
          color: #3f8a38;
        }
      }
      .item {
        margin-top: 30px;
        display: flex;
        .avatar img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          .iconyonghu1 {
            font-size: 50px;
            color: #ddd;
          }
        }
        .content {
          flex: 1;
          margin: 18px 0 0 18px;
          .name {
            font-size: 14px;
            color: #3f8a38;
          }
          .date {
            margin-left: 12px;
            color: #999;
            font-size: 12px;
          }
          p {
            margin-top: 10px;
            line-height: 30px;
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
  }
  .crumb {
    margin-top: 28px;
    margin-bottom: 18px;
    font-size: 12px;
    color: #666;
    span {
      cursor: pointer;
    }
  }
</style>