<template>
  <div style="width: 100%">
    <v-header />
    <nav-bar />
    <div style="width: 100%; background-color: #f4f5f7;">
      <div class="container-white">
        <div class="container">
          <div class="crumb">
            首页><span @click="$router.push({ name: 'toutiao' })">资讯头条</span>
          </div>
          <h1>中医药培训 | 2019春季招生简章</h1>
          <div class="introduction">
            <div class="subtitle">
              <p class="zh">中心简介</p>
              <p class="en">INTRODUCTION TO THE CENTER</p>
            </div>
            <p>江西中医药大学职业技能培训中心是我省中医药知识与技术类、健康养生类等行业职业技能培训与认证工作的权威机构，建立了一批品牌培训项目。近几年来，本中心一直致力于大力弘扬中华优秀传统文化，推广传播中医药养生保健知识和易于掌握的刮痧、推拿等中医药特色技能与方法，已为社会培养中、高级技能人才9000余人，鉴定考核通过率高于90%，受到社会的广泛赞誉。</p>
          </div>
        </div>
      </div>
      <!-- 培训内容 -->
      <div class="container-silver">
        <div class="subtitle">
          <p class="zh">培训项目</p>
          <p class="en">TRAINING PROGECT</p>
        </div>
        <div class="skills">
          <div class="subject">
            <span>职业技能</span>
            <div>
              <span 
                :class="prevDisabled ? 'active' : ''"
                @click="prev">
                <i class="el-icon-arrow-left"/>
              </span>
              <span
                :class="nextDisabled ? 'active' : ''"
                @click="next">
                <i class="el-icon-arrow-right"/>
              </span>
            </div>
          </div>
          <ul class="list">
            <li
              v-for="(item, index) in skillsList"
              :key="index"
              @click="openNewPage(item.url)">
              <img :src="item.PCLogo">
              <p class="name">{{ item.name }}</p>
            </li>
          </ul>
        </div>
        <div class="qualification">
          <div class="subject">
            <span>职业资格</span>
          </div>
          <div class="list">
            <img src="../assets/images/qualification1.jpg">
            <img src="../assets/images/qualification2.jpg">
            <img src="../assets/images/qualification3.jpg">
            <img src="../assets/images/qualification4.jpg">
          </div>
        </div>
      </div>
      <div class="container-white">
        <div class="container">
          <div class="target card">
            <div class="subtitle">
              <p class="zh">培训对象</p>
              <p class="en">TRAINING TARGET</p>
            </div>
            <div class="con">
              1、医院诊所、医药公司、药店、体检中心、健康养生及饮食行业从业人员<br>
              2、高中等院校在校学生（尤其适宜医药院校医、药、护理、美容等专业学生）<br>
              3、预备开办健康养生产业事业的人士<br>
              4、预备出国留学、就业、创业者<br>
              5、重视健康养生、希望学习中医药特色技能进行自我保健和家庭保健的社会各界人士
            </div>
          </div>
          <div class="certificate card">
            <div class="subtitle">
              <p class="zh">证书</p>
              <p class="en">CETTIFICATE</p>
            </div>
            <div class="con">
              所有通过结业考核学员，均获取《江西中医药大学职业技能培训合格证书》。另健康管理师、保健调理师、育婴师、美容师、中药炮制工、药物制剂工还可获人社部颁发的《国家职业资格证书》；药膳养生师还可获中国药膳研究会颁发的《药膳专业培训合格证书》；保健按摩师、保健刮痧师、小儿推拿师、中医艾灸师还可获得省人社部颁发的《专项能力证书》。上述证书均合法、有效、专业、权威。
            </div>
          </div>
          <div class="cost">
            <p>各职业技能培训项目收费标准一览表</p>
            <img src="../assets/images/cost.jpg">
            <!-- <el-table
              :data="costData"
              :header-cell-style="{height: '90px', background: '#f5f5f5', color: '#666', fontWeight: 'normal'}"
              border
              style="width: 837px; margin: 23px auto;">
              <el-table-column
                prop="project"
                label="培训项目"
                width="220"
                align="center"/>
              <el-table-column
                prop="level"
                label="级别"
                width="220"
                align="center"/>
              <el-table-column
                prop="training"
                label="培训费"
                width="145"
                align="center"/>
              <el-table-column
                prop="note"
                label="备注"
                width="250"
                align="center"/>
            </el-table> -->
          </div>
          <div class="content-img">
            <img src="../assets/images/admissions.jpg">
          </div>
          <!-- 执业资格 -->
          <div class="practicing">
            <div class="subtitle">
              <p class="zh">职业资格</p>
              <p class="en">PRACTICING REQUIREMENTS</p>
            </div>
            <div class="course">
              <p>2019执业医师/助理医师辅导课程</p>
              <img src="../assets/images/cost1.jpg">
              <div>医师资格统一考试由国务院卫生行政部门制定。医师资格考试由省级以上人民政府卫生行政部门组织实施。执业医师证是通过全国统一的执业医师资格考试和执业助理医师资格考试后，由国家卫生部统一发放的，我国从业医师必须拥有的证书，属于医疗技术方面的认可，证明持证人具有独立从事医疗活动的技术和能力，证书永久有效。</div>
              <p class="hs">2019年护士执业资格辅导课程</p>
              <img src="../assets/images/cost3.jpg">
            </div>
            <div class="course ml">
              <p>2019年执业药师辅导课程</p>
              <img src="../assets/images/cost2.jpg">
              <div>本考试由国家人事部、国家食品药品监督管理局共同负责，属资格准入考试，通过考试获得执业药师资格证书，并在国家药监部门注册后，方可在药店、医药公司等机构执业</div>
              <div class="hs">护士执业资格考试由卫生部负责组织实施，实行国家统一考试制度。统一考试大纲，统一命题，统一合格标准。通过护理专业技术资格考试并合格者，由各省、自治区、直辖市人事（职改）部门颁发人事部统一印制，人事部、卫生部用印的专业技术资格证书。该证书在全国范围内有效。是从事护士工作的必备证书。</div>
            </div>
          </div>
          <!-- 报名 -->
          <div class="registration">
            <div class="subtitle">
              <p class="zh">报名电话</p>
              <p class="en">REGISTRATION TELEPHONE</p>
            </div>
            <div class="telephone">
              <img src="../assets/images/telephone.jpg">
              <span>0791-88197248</span>
            </div>
          </div>
          <!-- 评论 -->
          <!-- <div class="rating">
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
          </div> -->
          <div class="foot-img">
            <img
              src="../assets/images/foot-img.png" 
              @click="toService">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import NavBar from '~/components/navBar.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    NavBar,
    'v-header': Header
  },
  data() {
    return {
      title: '资讯头条_',
      size: 10,
      current: 1,
      pages: 0,
      prevDisabled: true,
      nextDisabled: false,
      skillsList: [
        {
          id: 1,
          pic: 'https://files.jzjxedu.com/article/0f03fc67-3b92-4116-838b-5128b194b26c.png',
          name: '药膳养生师'
        },
        {
          id: 1,
          pic: 'https://files.jzjxedu.com/article/0f03fc67-3b92-4116-838b-5128b194b26c.png',
          name: '健康管理师'
        },
        {
          id: 1,
          pic: 'https://files.jzjxedu.com/article/0f03fc67-3b92-4116-838b-5128b194b26c.png',
          name: '保健按摩师'
        },
        {
          id: 1,
          pic: 'https://files.jzjxedu.com/article/0f03fc67-3b92-4116-838b-5128b194b26c.png',
          name: '保健刮痧师'
        },
        {
          id: 1,
          pic: 'https://files.jzjxedu.com/article/0f03fc67-3b92-4116-838b-5128b194b26c.png',
          name: '保健调理师'
        },
        {
          id: 1,
          pic: 'https://files.jzjxedu.com/article/0f03fc67-3b92-4116-838b-5128b194b26c.png',
          name: '育婴师'
        },
        {
          id: 1,
          pic: 'https://files.jzjxedu.com/article/0f03fc67-3b92-4116-838b-5128b194b26c.png',
          name: '美容师'
        }
      ],
      info: {},
      text: '',
      userInfo: '',
      commentList: []
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  async asyncData ({ $axios, params }) {
    let { data } = await $axios('/yxs/api/web/train/skillList', {params: {size: 10, current: 1 }})
    return { 
      skillsList: data.records,
      pages: data.pages
    }
  },
  mounted() {
    
  },
  methods: {
    toService() {
      let url = this.$router.resolve({
        name: 'service'
      })
      window.open(url.href, '_blank')
    },
    getData() {
      this.$axios('/yxs/api/web/train/skillList', {
        params: {
          size: this.size,
          current: this.current
        }
      }).then(res => {
        this.skillsList = res.data.records
      })
    },
    prev() {
      if (this.current == 1) {
        return
      }
      this.current--
      if (this.current == 1) {
        this.prevDisabled = !this.prevDisabled
      }
      this.nextDisabled = !this.nextDisabled
      this.getData()
    },
    next() {
      if (this.current == this.pages) {
        return
      }
      this.current++
      if (this.current == this.pages) {
        this.nextDisabled = !this.nextDisabled
      }
      this.prevDisabled = !this.prevDisabled
      this.getData()
    },
    openNewPage(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  .subtitle {
    width: 100%;
    height: 41px;
    text-align: center;
    p {
      text-align: center;
      color: #3f8a38;
      &.zh {
        height: 20px;
        margin-bottom: 10px;
        font-size: 20px;
      }
      &.en {
        font-size: 14px;
      }
    }
  }
  .container-white {
    width: 100%;
    background: #fff;
    padding-bottom: 35px;
    .container {
      @extend .container;
      font-size: 0;
      .crumb {
        margin-top: 28px;
        margin-bottom: 18px;
        font-size: 12px;
        color: #666;
        span {
          cursor: pointer;
        }
      }
      h1 {
        width: 100%;
        margin: 54px 0 45px;
        font-size: 24px;
        font-weight: normal;
        color: #333;
        text-align: center;
      }
      div.subtitle {
        @extend .subtitle;
      }
      div.introduction {
        &>p {
          font-size: 16px;
          line-height: 32px;
          letter-spacing: 0;
          color: #666;
          margin-top: 34px;
        }
      }
      div.card {
        margin-top: 55px;
        width: 565px;
        height: 307px;
        display: inline-block;
        overflow: hidden;
        & .subtitle {
          @extend .subtitle;
          p {
            text-align: left;
          }
          p.zh {
            font-size: 18px;
            margin-bottom: 7px;
          }
        }
        & .con {
          width: 100%;
          height: 243px;
          margin-top: 22px;
          box-sizing: border-box;
          padding: 28px 20px 20px;
          background: #f5f5f5;
          border: solid 1px #e2e3e5;
          font-size: 16px;
          color: #666;
          line-height: 28px;
        }
      }
      div.target {
        margin-right: 70px;
      }
      div.certificate {
        & .con {
          padding: 28px 33px 20px;
        }
      }
      div.cost {
        padding-top: 58px;
        p {
          width: 100%;
          font-size: 18px;
          text-align: center;
          color: #444;
        }
        img {
          width: 832px;
          height: 566px;
          display: block;
          margin: 23px auto 43px;
        }
      }
      div.content-img {
        img {
          width: 100%;
          height: 220px;
        }
      }
      div.practicing {
        margin-top: 50px;
        & .subtitle {
          @extend .subtitle;
        }
        .course {
          margin-top: 50px;
          width: 580px;
          height: 850px;
          display: inline-block;
          overflow: hidden;
          p {
            width: 100%;
            height: 18px;
            font-size: 18px;
            color: #444;
            text-align: center;
          }
          p.hs {
            margin-top: 60px;
          }
          p.hs+img {
            height: 228px;
          }
          img {
            width: 100%;
            height: 238px;
            margin-top: 15px;
          }
          div {
            width: 100%;
            height: 230px;
            margin-top: 15px;
            background: #f5f5f5;
            box-sizing: border-box;
            border: solid 1px #e2e3e5;
            padding: 47px 26px;
            font-size: 15px;
            color: #666;
            line-height: 30px;
          }
          div.hs {
            margin-top: 93px;
          }
        }
        .ml {
          margin-left: 40px;
          & div {
            padding: 47px 40px;
          }
        }
      }
      div.registration {
        padding-top: 70px;
        & .subtitle {
          @extend .subtitle;
        }
        & .telephone {
          margin: 40px 0;
          width: 100%;
          text-align: center;
          img {
            width: 40px;
            height: 30px;
            margin-right: 15px;
          }
          span {
            font-size: 40px;
            color: #99cb64;
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
    }
  }
  .container-silver {
    @extend .container;
    padding-top: 40px;
    div.subtitle {
      @extend .subtitle;
    }
    div.skills {
      margin-top: 48px;
      & .subject {
        width: 100%;
        height: 27px;
        position: relative;
        &>span {
          font-size: 15px;
          line-height: 27px;
          font-weight: bold;
          color: #444;
        }
        &>div {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 0;
          & span {
            width: 50px;
            height: 27px;
            display: inline-block;
            overflow: hidden;
            font-size: 16px;
            text-align: center;
            line-height: 25px;
            color: #aeaeae;
            box-sizing: border-box;
            border: 1px solid #b9baba;
            background: #f4f5f7;
            cursor: pointer;
          }
          & span.active {
            border: none;
            background: #3f8a38;
            color: #ffffff;
            cursor: not-allowed;
          }
        }
      }
      & .list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        li {
          flex-shrink: 1;
          flex-wrap: wrap;
          margin-bottom: 30px;
          margin-left: 24px;
          width: 220px;
          height: 160px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          &:hover img {
            transform: scale(1.1, 1.1);
          }
          &:nth-child(5n+1) {
            margin-left: 0;
          }
          img {
            margin: 0;
            width: 100%;
            height: 100%;
            transition: all 0.3s ease 0s;
          }
          p {
            width: 100%;
            height: 40px;
            background: #3f8a38;
            opacity: 0.8;
            position: absolute;
            left: 0;
            bottom: 0;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            color: #fff;
          }
        }
      }
    }
    div.qualification {
      margin-top: 35px;
      & .subject {
        width: 100%;
        height: 27px;
        &>span {
          font-size: 15px;
          line-height: 27px;
          font-weight: bold;
          color: #444;
        }
      }
      & .list {
        width: 100%;
        height: 208px;
        margin-top: 20px;
        img {
          width: 285px;
          height: 160px;
          margin-left: 15px;
          transition: all .3s ease 0s;
          border-radius: 4px;
          &:first-child {
            margin-left: 0px;
          }
          &:hover {
            transform: translate(0, -8px);
            box-shadow: 0 5px  10px #999;
          }
        }
      }
    }
  }
</style>
