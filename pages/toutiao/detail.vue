<template>
  <div class="container-detail">
    <div class="article">
      <div class="article-header">
        <h1>{{ info.title }}</h1>
        <div class="detail">
          <span>{{ info.publishedTime }}</span>
          <span><i class="iconfont icon-chakan" />
            {{ info.hits }}
          </span>
          <span><i class="iconfont icon-pinglun" />
            265
          </span>
          <span><i class="iconfont icon-fenxiang" />
            分享
          </span>
        </div>
      </div>
      <article
        class="htmlContent"
        v-html="info.body" />
        <!-- 评论 -->
    <!-- <div class="rating">
      <div class="title">我要评论</div>
      <div class="mine">
        <div class="avatar">
          <i class="iconfont icon-user" />
        </div>
        <div class="textarea">
          <textarea placeholder="输入你的想法..." />
          <div class="button">发表评论</div>
        </div>
      </div>
      <div class="all">
        <div class="all-top">
          <span>全部评论</span>
          <span class="number">56条评论</span>
        </div>
        <ul class="list">
          <li class="item">
            <div class="avatar">
              <i class="iconfont icon-user" />
            </div>
            <div class="content">
              <span class="name">萌芽熊DooroBear</span>
              <span class="date">2018-12-11</span>
              <p>
                作为藏医学“索瓦日巴”的重要组成部分，“藏医药浴法”以青藏高原的雅砻河谷和宗喀山脉的藏族农牧区为集中传承区域，广泛流布于西藏、青海、四川、甘肃、云南等地的藏区，为保障藏族民众的生命健康和防治疾病发挥着重要作用...
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div> -->
    </div>
  </div>
</template>
<script>
import NavBar from '~/components/navBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      id: this.$route.query.id,
      info: {}
    }
  },
  mounted() {
    this.getDetail()
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
        .icon-user {
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
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          .icon-user {
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
</style>
