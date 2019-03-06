<template>
  <div class="container-detail">
    <div class="article">
      <div class="article-header">
        <h1>中国“藏医药浴法”被列入联合国非遗名录</h1>
        <div class="detail">
          <span>2018-12-11</span>
          <span><i class="iconfont icon-chakan" />
            516
          </span>
          <span><i class="iconfont icon-pinglun" />
            265
          </span>
          <span><i class="iconfont icon-fenxiang" />
            分享
          </span>
        </div>
      </div>
      <article>
        <p>当地时间28日，在联合国教科文组织保护非物质文化遗产政府间委员会第十三届常会上，中国申报的“藏医药浴法——中国藏族有关生命健康和疾病防治的知识与实践”通过审议，列入人类非物质文化遗产代表作名录，这也是中国第40个入选《非遗公约》名录的遗产项目。</p>
        <img src="~/assets/images/wbc.jpg">
        <p>中国文化和旅游部副部长、联合国教科文组织保护非物质文化遗产政府间委员会第13届常会中国参会代表团团长张旭在致辞中表示，“藏医药浴法”是中国藏族民众有关生命健康和疾病防治的传统知识和实践，与他们的日常生活息息相关。
        该遗产项目既体现了相关社区民众通过沐浴防病、疗疾的民间经验，也是以《四部医典》为代表的传统藏医理论在当代健康实践中的继承和发展。
        “藏医药浴法”，藏语称“泷沐”，是藏族人民以土、水、火、风、空“五源”生命观和隆、赤巴、培根“三因”健康观及疾病观为指导，通过沐浴天然温泉或药物煮熬的水汁或蒸汽，调节身心平衡，实现生命健康和疾病防治的传统知识和实践。</p>
        <img src="~/assets/images/wbc.jpg"> 
        <p>作为藏医学“索瓦日巴”的重要组成部分，“藏医药浴法”以青藏高原的雅砻河谷和宗喀山脉的藏族农牧区为集中传承区域，广泛流布于西藏、青海、四川、甘肃、云南等地的藏区，为保障藏族民众的生命健康和防治疾病发挥着重要作用。该遗产项目承载着藏族天文历算、自然博物、仪式信仰、行为规范、起居饮馔等传统知识，同时也通过藏族神话、传说、史诗、戏剧、绘画、雕刻等文化表现形式得以广泛传播，既为藏族人民提供了持续的认同感，又丰富着人类的健康知识与实践，是世界文化多样性和人类创造力的见证。
        随着“藏医药浴法”的列入，我国共有40个项目列入联合国教科文组织非物质文化遗产相关名录，其中32个项目列入代表作名录，7个项目列入急需保护名录，1个项目入选优秀实践名册。这体现了我国日益提高的履约能力和非物质文化遗产保护水平，对于增强社区、群体和个人的认同感和自豪感，激发传承保护的自觉性和积极性，继承和弘扬中华优秀传统文化，具有重要意义。（文章来源：央视网 ）</p>     
      </article>
      <div class="rating">
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
      </div>
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
