<!--
 * @Author: chenjg
 * @Date: 2019-10-25 10:06:32
 * @LastEditTime: 2019-11-11 13:44:51
 * @LastEditors: xwen
 * @Description: 
 * @输出一段不带属性的自定义信息
 -->
<template>
  <div class="container">
    <v-header />
    <!-- <div class="wrap">
      <div class="welcome">
        <div class="left">
          HI，欢迎来到中医药在线医学自考专题!
        </div>
        <div class="right">
          <span class="login">我要登录</span>
          <span class="register">免费注册</span>
        </div>
      </div>
    </div> -->
    <div class="self-header">
      <img
        src="~/assets/images/logo.png"
        alt=""
        @click="toIndex">
      <div class="text">医学在线教育领先品牌</div>
    </div>
    <div class="main"> 
      <div class="main-wrap">
        <div class="tips">
          <span>医学自考专题</span>
          <span>中药学/药学</span>
        </div>
        <div class="main-pic">
          <!-- <img
            src="~/assets/images/main-pic.png"
            alt=""> -->
        </div>
        <div class="list">
          <div class="list-item">
            <img
              src="~/assets/images/item-icon1.png"
              alt="">
            <div class="title">国家认可 正规学历</div>
            <p>由教育局备案，重点大学颁发的正规证书，学信网终身可查、全国事业单位高度认可</p>
          </div>
          <div class="list-item">
            <img
              src="~/assets/images/item-icon2.png"
              alt="">
            <div class="title">高含金量  仅次统招</div>
            <p>含金量仅次与统招，医院，国企，外企均高度认可，参加公职考试，升职加薪的硬文凭</p>
          </div>
          <div class="list-item">
            <img
              src="~/assets/images/item-icon3.png"
              alt="">
            <div class="title">学费低  人人都能学</div>
            <p>单门考前辅导课程仅需180元，含名师授课视频、课后习题和模拟试卷等资料，大大降低了学习门槛</p>
          </div>
          <div class="list-item">
            <img
              src="~/assets/images/item-icon4.png"
              alt="">
            <div class="title">时间短  适合上班族</div>
            <p>江西本地最优秀的中医药大学老师+ 专业报考团队为您保驾护航，最短仅需1.5年,圆你名校本科梦</p>
          </div>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <div class="title">
        中药学/药学 <span>考试科目</span>一览
      </div>
      <div class="table-flex">
        <div class="table1">
          <table style="border-spacing: 2px;border-collapse: separate">
            <tbody>
              <tr>
                <th
                  class="text"
                  width="130">主考专业</th>
                <th
                  colspan="3"
                  class="text"
                  width="458">药学课程</th>
              </tr>
              <tr>
                <th
                  rowspan="6"
                  class="subject">药学</th>
                <td>病原生物学及病原生物学检验</td>
                <td>现代生物学进展</td>
                <td class="red">英语（二）</td>
              </tr>
              <tr>
                <td class="red">计算机应用基础</td>
                <td class="red">计算机应用基础（实践）</td>
                <td>有机化学（五）</td>
              </tr>
              <tr>
                <td>分子生物学</td>
                <td>物理化学（二）</td>
                <td>药理学（四）</td>
              </tr>
              <tr>
                <td>药物分析（三）</td>
                <td>药物化学（二）</td>
                <td>药剂学（二）</td>
              </tr>
              <tr>
                <td>数理统计</td>
                <td>药事管理学（二）</td>
                <td>药用植物与生药学</td>
              </tr>
              <tr>
                <td
                  class="red"
                  width="228">中国近代史纲要</td>
                <td
                  class="red"
                  width="228"
                  colspan="2">马克思主义基本原理概论</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table2">
          <table style="border-spacing: 2px;border-collapse: separate">
            <tbody>
              <tr>
                <th
                  class="text"
                  width="130">主考专业</th>
                <th
                  colspan="3"
                  class="text"
                  width="458">中药学课程</th>
              </tr>
              <tr>
                <th
                  rowspan="4"
                  class="subject">中药学</th>
                <td>数理统计</td>
                <td>药事管理学（二）</td>
                <td>中药制药工程原理与设备</td>
              </tr>
              <tr>
                <td>药理学（四）</td>
                <td>分析化学（二）</td>
                <td>中药制剂分析</td>
              </tr>
              <tr>
                <td>病原生物学</td>
                <td>生理学</td>
                <td>无机化学</td>
              </tr>
              <tr>
                <td class="red">英语（二）</td>
                <td class="red">中国近现代史纲要</td>
                <td class="red">马克思主义基本原理概论</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tips">
        <span>* 标红科目</span>为符合条件可进行免考
      </div>
    </div>
    <div class="section-wrap"> 
      <div class="section-content">
        <div class="section-item">
          <div class="title">
            <div class="text">免考科目</div>
          </div>
          <div class="desc">
            <p>抵免条件如下：</p>
            <p>一、00018计算机应用基础、00019计算机应用基础(实践)用全国计算 
            机等级考试—级(及以上)或全国计算机水平考试(NIT)中《计算机
            应用基础》模块证书办理抵免。 </p>
            <p>二、普通高考和成 人高考专科毕业者可免考 03708 中国近现代史纲要 
            03709 马克思主义基本原理概论。 </p>
            <p>三、凡参加全国英语等级考试(PETS)三 级及以上笔试成绩合格者或大
            学英语四、六级(省内)合格证书者可免考00015《英语(二)》</p>
          </div>
        </div>
        <div class="section-item">
          <div class="title">
            <div class="text">报考条件</div>
          </div>
          <div class="desc">
            <p>1. 中药学本科段报考对象限定为已取得卫生类职业资格的在职人员，具有中药士、药剂士及以上技术职务，或从事中药生产、经营等工作三年（含三年）以上的在职人员中的专科毕业生。</p>
            <p>2. 药学专业本科限定为具有医学类专科以上学历的在职人员或在校学生。</p>
          </div>
        </div>
        <div class="section-item">
          <div class="title">
            <div class="text">就业岗位</div>
          </div>
          <div class="desc">
            <p>自考中药学从事岗位：</p>
            <p>毕业后主要从事中药师、药剂师、验收员等工作，大致如下：</p>
            <ul>
              <li>中药师</li>
              <li>药剂师</li>
              <li>执业药师</li>
              <li style="width: 165px">质量管理师</li>
              <li style="width: 224px">验收员中药师</li>
            </ul>
          </div>
        </div>
        <div class="section-item">
          <div class="title">
            <div class="text">如何准备</div>
          </div> 
          <div class="prepare">
            <div class="text">
              <span>熟悉题型</span>
              <span>大量刷题</span>
            </div>
            <div class="sign">+</div>
            <div class="text">
              <span>掌握要点</span>
              <span>解疑解惑</span>
            </div>
            <div class="sign">=</div>
            <div class="text">
              <span>成功拿证</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="class-wrap">
      <div class="title">
        中药学/药学 <span>专业自考</span>课程
      </div>
      <div class="class-content">
        <div class="left">
          <div
            v-for="(item, index) in list"
            v-if="index < 3"
            :key="index"
            class="player-item">
            <div class="player">
              <div
                :id="'J_prismPlayer' + (index + 1)"
                class="prism-player" />
            </div>
            <div class="info">
              <div
                class="text"
                @click="toDetail(item.id)">{{ item.title }}</div>
              <div class="info-right">
                <span>共{{ item.lessonNum }}节</span>
                <span>{{ item.learnNum }}人学过</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <table style="border-spacing: 2px;border-collapse: separate">
            <tbody>
              <tr>
                <th width="93">分类</th>
                <th width="202">科目名称</th>
                <th width="176">讲师</th>
                <th width="136">原价/优惠价</th>
                <th width="90">免费试听</th>
              </tr>
              <tr>
                <td
                  rowspan="8"
                  class="subject">
                  中药学
                </td>
                <td @click="toDetail(118)">数理统计</td>
                <td>周丽&何雁&刘建国</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(114)">药事管理学（二）</td>
                <td>俞双燕</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(73)">分析化学（二）</td>
                <td>廖夫生</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(61)">中药制剂</td>
                <td>廖夫生</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(96)">中药制药工程原理与设备</td>
                <td>黄萧&肖雄</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(78)">药理学</td>
                <td>徐桂香</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(61)">中药制剂分析</td>
                <td>廖夫生</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(59)">中药炮制学</td>
                <td>龚千锋</td>
                <td>400/360</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td
                  rowspan="10"
                  class="subject"
                  style="background: #01c6ae">
                  药学 
                </td>
                <td @click="toDetail(117)">有机化学（五）</td>
                <td>万屏南</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(92)">药用植物与生物学</td>
                <td>徐艳琴&葛菲 </td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(94)">药物化学（二）</td>
                <td>杨尊华</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(118)">数理统计</td>
                <td>周丽&何雁&刘建国</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(114)">药事管理学（二）</td>
                <td>俞双燕</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(116)">分子生物学</td>
                <td>余英才</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(115)">物理化学</td>
                <td>杨婕</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(95)">药物分析</td>
                <td>廖夫生</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(93)">药剂学</td>
                <td>廖夫生</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(78)">药理学</td>
                <td>徐桂香</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="more"
            @click="toMore">更多视频 >></div>
        </div>
      </div>
    </div>
    <div class="question-wrap">
      <div class="question-content">
        <div class="wrap-1200">
          <div class="text">自考专题所有课程均由江西中医药大学名师录制，质量可信赖，适用于江西省本地所有中药学/药学自考考生</div>
          <div class="title">
            <span style="color: #01c6ae">精品</span>课程
            <span style="color: #ff8a4b">海量</span>刷题
          </div>
          <div class="desc">
            考生根据自身复习水平，可自由选择课程进行购买
          </div>
          <div class="item">
            <span class="mes">名师讲解专业辅导课程</span>
            <span class="add"> + </span>
            <span class="mes">考前抢分试卷</span>
            <span class="add"> + </span>
            <span class="mes">海量题库练习</span>
          </div>
          <div class="price">仅需要<span>180</span>元/门</div>
          <div class="tip">祝愿每位考生都能考试顺顺利利，一次过关！</div>
          <div class="concat">考前课程咨询  电话/微信号：19100170509 刘老师</div>
        </div>
      </div>
    </div>
    <div class="foot-wrap">
      <div class="foot-content">
        <div class="title">国家教育部认可，学信网可查</div>
        <div class="subtitle">登录教育考试学院学历查询系统”学信网”（
          <a href="http://www.chsi.com.cn/">http://www.chsi.com.cn/</a>
          ）终身可查
        </div>
        <div class="content">
          <p>1. 所有学员成绩合格者可获取所报考院校专业对应的学历证书，该证书属于国民教育系列学历证书，国家承认，社会认可。</p>
          <p>2. 电子注册，唯一编码，学信网终身可查。</p>
          <p>3. 含金量高，待遇等同在校统招生，企事业单位认可度高，可申请优先办理居住证</p>
          <div
            class="button"
            @click="showModal">本科证书咨询</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Header from '../components/layout/selfHeader.vue'
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      userInfo: {},
      player1: null,
      player2: null,
      player3: null,
      list: [],
      token: ''
    }
  },
  head() {
    return {
      link: [
        { rel: 'stylesheet', href: '/aliplayer/aliplayer-min.css' }
      ],
      script: [
        { src: '/aliplayer/aliplayer-min.js', type: 'text/javascript'}      
      ]
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.login()
    // this.getList()
  },
  methods: {
    getList() {
       this.$axios('/yxs/api/web/course/getRecommendList', {
        params: {
          type: 'education'
        }
      }).then(res => {
        this.list = res.data
        console.log(this.list)
        for(let i = 0; i < this.list.length; i ++) {
          if(i > 2 || this.list.length == 0) {
            break;
          }
          this.getPlayerInfo(this.list[i].id, i + 1)
        }
      })
    },
    getPlayerInfo(id, index) {
      this.$axios.post('/yxs/api/web/user/startLearnCourse', {
        courseId: id,
        userToken: this.token
      }).then(res => {
        let info = res.data
        this.createPlayer(info, index)
      })
    },
    createPlayer(info, index) {
      let player = new Aliplayer({
        "id": "J_prismPlayer" + index,
        "vid": info.videoId,
        "playauth": info.playAuth,
        "qualitySort": "asc",
        "format": "m3u8",
        "mediaType": "video",
        "width": "100%",
        "height": "274px",
        "autoplay": false,
        "isLive": false,
        "cover": info.cover,
        "rePlay": false,
        "playsinline": true,
        "preload": true,
        "controlBarVisibility": "hover",
        "useFlashPrism": true,
        "encryptType": 1,
        "skinLayout": [
          {
            "name": "bigPlayButton",
            "align": "blabs",
            "x": 30,
            "y": 80
          },
          {
            "name": "controlBar",
            "align": "blabs",
            "x": 0,
            "y": 0,
            "children": [
              {
                "name": "progress",
                "align": "tlabs",
                "x": 0,
                "y": 0
              },
              {
                "name": "playButton",
                "align": "tl",
                "x": 15,
                "y": 26
              },
              {
                "name": "nextButton",
                "align": "tl",
                "x": 10,
                "y": 26
              },
              {
                "name": "timeDisplay",
                "align": "tl",
                "x": 10,
                "y": 24
              },
              {
                "name": "fullScreenButton",
                "align": "tr",
                "x": 10,
                "y": 25
              },
              {
                "name": "streamButton",
                "align": "tr",
                "x": 10,
                "y": 23
              },
              {
                "name": "volume",
                "align": "tr",
                "x": 10,
                "y": 25
              }
            ]
          },
          {
            "name": "fullControlBar",
            "align": "tlabs",
            "x": 0,
            "y": 0,
            "children": [
              {
                "name": "fullTitle",
                "align": "tl",
                "x": 25,
                "y": 6
              },
              {
                "name": "fullNormalScreenButton",
                "align": "tr",
                "x": 24,
                "y": 13
              },
              {
                "name": "fullTimeDisplay",
                "align": "tr",
                "x": 10,
                "y": 12
              },
              {
                "name": "fullZoom",
                "align": "cc"
              }
            ]
          }
        ]
      }, function (player) {
        console.log("播放器创建了。");
      });
      if(index == 1) {
        this.player1 = player
      } else if(index == 2) {
        this.player2 = player
      } else {
        this.player3 = player
      }
    },
    // 登录
    login() {
      this.$axios.post('/admin/api/web/account/login', {
        type: 'PWD',
        userName: 'may001',
        password: '123456'
      }).then(res => {
        if(res.code == 0) {
          this.token = res.data.userToken
          this.getList()
        }
      })
    },
    toDetail(id) {
      let url = this.$router.resolve({
        name: 'lessonDetail',
        query: {
          id
        }
      })
      window.open(url.href, '_blank')
    },
    showModal() {
      this.$alert('<div style="text-align: center">证书咨询请拨打下方联系电话</div><div style="text-align: center">郭老师18160712043</div>', '温馨提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '我知道啦'
      });
    },
    toMore() {
      let url = this.$router.resolve({
        name: 'train',
        query: {
          fid: 107,
          cid: 53
        }
      })
      window.open(url.href, '_blank')
    },
    toIndex() {
      let url = this.$router.resolve({
        name: 'index'
      })
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    background: #fff;
  }
  .wrap {
    width: 100%;
    height: 40px;
    background: #f5f5f5;
    line-height: 40px;
  }
  .welcome {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 14px;
      color: #888;
    }
    .right {
      font-size: 14px;
      .login {
        color: #888;
        margin-right: 20px;
      }
      .register {
        color: #ff9257;
      }
    }
  }
  .self-header {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 80px;
    img {
      height: 80px;
      cursor: pointer;
    }
    .text {
      color: #666;
      font-size: 20px;
    }
  }
  .main {
    position: relative;
    width: 100%;
    height: 700px;
    background: url('../assets/images/self-banner.png') top center no-repeat;
    &-wrap {
      width: 1200px;
      margin: 0 auto;
      .tips {
        width: 148px;
        height: 64px;
        padding: 6px 0;
        background: #ff8a4b;
        text-align: center;
        border-radius: 0 0 30px 30px;
        span {
          display: block;
          line-height: 32px;
          font-size: 16px;
          color: #fff;
        }
      }
      .main-pic {
        margin-top: 40px;
        margin-left: 90px;
      }
      .list {
        position: absolute;
        bottom: -108px;
        display: flex;
        text-align: center;
        &-item {
          width: 285px;
          height: 368px;
          margin-left: 20px;
          padding: 0 48px;
          box-sizing: border-box;
          background: #fff;
          box-shadow: 0px 0px 15px 0px 
      rgba(0, 0, 0, 0.1);
          font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
          border-radius: 6px;
          text-align: center;
          &:first-child {
            margin-left: 0;
          }
          img {
            width: 86px;
            height: 86px;
            margin-top: 40px;
          }
          .title {
            display: flex;
            justify-content: space-between;
            width: 188px;
            margin-top: 40px;
            font-size: 20px;
            color: #333;
            letter-spacing: 2px;
          }
          p {
            width: 190px;
            margin-top: 20px;
            line-height: 26px;
            font-size: 16px;
            color: #999;
            text-align: left;
            font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
            font-weight: normal;
	          font-stretch: normal;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
  .table-wrap {
    width: 1200px;
    margin: 0 auto;
    padding-top: 200px;
    padding-bottom: 60px; 
    .title {
      position: relative;
      padding-bottom: 38px;
      font-size: 52px;
      font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
      font-weight: 700;
      color: #333;
      text-align: center;
      border-bottom: 1px solid #ddd;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 8px;
        background: #01c6ae;
      }
      span {
        color: #ff8a4b;
      }
    }
    .table-flex {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      .table1, .table2 {
        width: 590px;
        height: 422px;
        td {
          width: 150px;
          vertical-align: middle;
          padding: 0 20px;
          text-align: center;
          box-sizing: border-box;
          font-size: 14px;
          line-height: 20px;
          background: #f5f5f5;
        }
        .subject {
          width: 130px;
          height: 370px;
          vertical-align: middle;
          font-size: 20px;
          color: #fff;
          font-weight: 500;
          background: url('../assets/images/subject-bg.png') no-repeat;
        }
        .red {
          font-size: 14px;
          color: #e60012;
        }
      }
      .table1 {
        td {
          height: 60px;
        }
      }
      .table2 {
        td {
          height: 90px;
        }
      }
      .text {
        height: 50px;
        line-height: 50px;
        background: #01c6ae;
        font-size: 20px;
        color: #fff;
        font-weight: 500;
      }
    }
    .tips {
      text-align: center;
      margin-top: 35px;
      color: #333;
      font-size: 16px;
      span {
        color: #e60012;
      }
    }
  }
  .section-wrap {
    width: 100%;
    height: 806px;
    background: #eee;
    .section-content {
      width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      font-size: 0;
    }
    .section-item {
      float: left;
      width: 590px;
      height: 330px;
      margin-top: 45px;
      // background: #fff;
      &:nth-child(2n) {
        margin-left: 20px;
      }
      &:nth-child(2), &:nth-child(3) {
        .title {
          border-bottom: 65px solid #01c6ae;
          &::before {
            position: absolute;
            content: '';
            top: 15px;
            right: -50px;
            width: 10px;
            height: 50px;
            background: #ff8a4b;
            transform: skew(45deg);
          }
        }
      }
      .title {
        position: relative;
        height: 0;
        width: 313px;
        border-bottom: 65px solid #ff8a4b;
        border-right: 65px solid transparent;
        &::before {
          position: absolute;
          content: '';
          top: 15px;
          right: -50px;
          width: 10px;
          height: 50px;
          background: #01c6ae;
          transform: skew(45deg);
        }
        .text {
          line-height: 65px;
          margin-left: 30px;
          font-size: 24px;
          color: #fff;
          font-weight: 700;
        }
      }
      .desc, .prepare {
        width: 590px;
        height: 266px;
        padding: 20px;
        box-sizing: border-box;
        background: #fff;
        font-size: 16px;
        line-height: 28px;
        color: #666;
        li {
          float: left;
          width: 123px;
          height: 46px;
          line-height: 46px;
          border: 1px solid #ffb085;
          box-sizing: border-box;
          // padding: 0 35px;
          text-align: center;
          font-size: 16px;
          margin-right: 20px;
          margin-top: 20px;
        }
      }
      .prepare {
        display: flex;
        align-items: center;
        padding: 0 30px;
        .text {
          span {
            display: block;
            width: 152px;
            height: 46px;
            line-height: 46px;
            text-align: center;
            box-sizing: border-box;
            border: 1px solid #01c6ae;
            &:nth-child(2) {
              margin-top: 30px;
            }
          }
        }
        .sign {
          margin: 0 10px;
          color: #ffb085;
          font-size: 30px;
          font-weight: 700;
        }
      }
    }
  }
  .class-wrap {
    padding: 90px 0;
    .title { 
      position: relative;
      padding-bottom: 38px;
      font-size: 52px;
      font-weight: 700;
      color: #333;
      text-align: center;
      border-bottom: 1px solid #ddd;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 8px;
        background: #01c6ae;
      }
      span {
        color: #ff8a4b;
      }
    }
    .class-content {
      display: flex;
      width: 1200px;
      margin: 60px auto 0;
      .left {
        margin-top: 2px;
        width: 475px;
      }
      .player-item {
        width: 475px;
        .player {
          width: 100%;
          height: 274px;
          background: #ccc;
        }
        .info {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          margin-bottom: 25px;
          height: 40px;
          line-height: 40px;
          background: #e8f8f6;
          .text {
            margin-left: 30px;
            font-size: 18px;
            color: #7f8584;
            cursor: pointer;
          }
          .info-right {
            // margin-right: 30px;
            span {
              display: inline-block;
              margin-right: 30px;
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
      .right {
        margin-left: 17px;
        width: 705px;
      }
      table {
        width: 705px;
        th {
          background: #b5b5b5;
          color: #fff;
          font-size: 18px;
          height: 50px;
          line-height: 50px;
          font-weight: 500;
        }
        td {
          height: 50px;
          line-height: 50px;
          background: #f9f1ed;
          font-size: 14px;
          color: #333;
          text-align: center;
          cursor: pointer;
        }
        .subject {
          // height: 414px;
          background: #ff8a4b;
          vertical-align: middle;
          font-size: 18px;
          color: #fff;
        }
      }
      .yaoxue {
        td {
          height: 47px;
          line-height: 47px;
          background: #e8f8f6;
        }
      }
      .more {
        width: 100%;
        height: 70px;
        margin-top: 24px; 
        line-height: 70px;
        font-size: 22px;
        background: #f9f1ed;
        text-align: center;
        color: #f4691d;
        cursor: pointer;
      }
    }
  }
  .question-wrap {
    width: 100%;
    height: 806px;
    background: url('../assets/images/question-bg.png') no-repeat;
    .question-content {
      width: 100%;
      height: 806px;
      background: rgba(44, 44, 44, .7);
    }
    .wrap-1200 {
      width: 1200px;
      margin: 0 auto;
      padding-top: 50px;
      .text {
        font-size: 18px;
        color: #fff;
        text-align: center;
      }
      .title {
        position: relative;
        margin-top: 70px;
        padding-bottom: 48px;
        font-size: 70px;
        font-weight: 700;
        border-bottom: 1px solid #ddd;
        color: #fff;
        text-align: center;
        &::after {
          position: absolute;
          content: '';
          left: 50%;
          bottom: 0;
          width: 300px;
          height: 8px;
          margin-left: -150px;
          background: #01c6ae;
        }
      }
      .desc {
        margin-top: 30px;
        text-align: center;
        font-size: 30px;
        color: #fff;
      }
      .item {
        margin-top: 30px;
        text-align: center;
        .mes {
          display: inline-block;
          padding: 0 35px;
          height: 70px;
          line-height: 70px;
          border-radius: 35px;
          border: 2px solid #01c6ae;
          background: #fff;
          font-size: 30px;
          color: #ff8a4b;
        }
        .add {
          margin: 0 30px;
          font-size: 30px;
          color: #ff8a4b;
        }
      }
      .price {
        margin-top: 60px;
        text-align: center;
        font-size: 37px;
        color: #fff;
        span {
          font-size: 75px;
          color: #ff8a4b;
        }
      }
      .tip {
        margin-top: 20px;
        text-align: center;
        color: #fff;
        font-size: 26px;
      }
      .concat {
        width: 830px;
        height: 60px;
        margin: 40px auto 0;
        line-height: 60px;
        color: #fff;
        text-align: center;
        font-size: 30px;
        border-radius: 30px;
        background: #ff8a4b;
        box-shadow: 0px 5px 13px 0px 
		rgba(16, 36, 37, 0.3);
      }
    }
  }
  .foot-wrap {
    width: 100%;
    height: 646px;
    background: url('../assets/images/foot-bg.png') no-repeat;
    background-size: cover;
    .foot-content { 
      position: relative;
      width: 1200px;
      margin: 0 auto;
    }
    .title {
      position: relative;
      padding-top: 48px;
      padding-bottom: 36px;
      font-size: 52px;
      color: #fff;
      font-weight: 700;
      text-align: center;
      border-bottom: 1px solid #fff;
      &::after {
        position: absolute;
        content: '';
        left: 50%;
        bottom: 0;
        width: 300px;
        height: 8px;
        margin-left: -150px;
        background: #fff;
      }
    }
    .subtitle {
      margin-top: 30px;
      font-size: 30px;
      color: #fff;
      text-align: center;
      a {
        color: #ffb085;
      }
    }
    .content {
      position: absolute;
      right: 0;
      top: 290px;
      width: 580px;
      font-size: 16px;
      line-height: 34px;
      color: #fff;
      p {
        letter-spacing: 2px;
      }
      .button {
        margin-top: 50px;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #ff8a4b;
        color: #fff;
        font-size: 30px;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
</style>