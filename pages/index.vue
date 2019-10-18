<template>
  <div class="container">
    <v-header />
    <div style="width: 1200px; overflow:hidden; margin: 0 auto;">
      <v-nav :tab-index="tabIndex" />
    </div>
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel
        height="400px"
        class="imgs">
        <el-carousel-item
          v-for="(item, index) in carousels"
          :key="index">
          <img
            :src="item.pic"
            @click="toNavigation(item.url)">
        </el-carousel-item>
      </el-carousel>
      <div class="carousel-content">
        <div class="nav-list">
          <!-- <nuxt-link
            :to="{ name: 'train', query: { fid: 70 }}"
            class="nav-item"
            target="_blank">
            <i class="iconfont iconyisheng"/>
            中医研究所
          </nuxt-link> -->
          <nuxt-link
            :to="{ name: 'train', query: { fid: 79 } }"
            class="nav-item"
            target="_blank">
            <!-- <i class="iconfont iconxiangmu"/> -->
            执业资格
          </nuxt-link>
          <div class="sub-nav">
            <!-- <nuxt-link
              :to="{ name: 'western', query: { cid: 2 }}"
              class="sub-item"
              target="_blank">
              西学中
            </nuxt-link> -->
            <nuxt-link
              :to="{ name: 'train', query: { fid: 79, cid: 80 }}"
              class="sub-item"
              target="_blank">
              执业药师
            </nuxt-link>
            <nuxt-link
              :to="{ name: 'train', query: { fid: 79, cid: 81 }}"
              class="sub-item"
              target="_blank">
              健康管理师
            </nuxt-link>
          </div>
          <nuxt-link
            :to="{ name: 'train', query: { fid: 85 }}"
            class="nav-item"
            target="_blank">
            <!-- <i class="iconfont iconkaoshi"/> -->
            学历助考
          </nuxt-link>
          <div class="sub-nav">
            <nuxt-link
              v-for="(item, index) in examSubList"
              :key="index"
              :to="{ name: 'train', query: { fid: 85, cid: item.id }}"
              class="sub-item"
              target="_blank">
              {{ item.name }}
            </nuxt-link>
          </div>
          <!-- <nuxt-link
            :to="{ name: 'train', query: { fid: 55 }}"
            class="nav-item"
            target="_blank">
            <i class="iconfont iconwendang"/>
            中医药理论
          </nuxt-link> -->
          <nuxt-link
            :to="{ name: 'train', query: { fid: 63 }}"
            class="nav-item"
            target="_blank">
            <!-- <i class="iconfont iconyisheng"/> -->
            名医师承
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'train', query: { fid: 76 }}"
            class="nav-item"
            target="_blank">
            <!-- <i class="iconfont iconyisheng"/> -->
            中医大讲堂
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'train', query: { fid: 55 }}"
            class="nav-item"
            target="_blank">
            <!-- <i class="iconfont iconyisheng"/> -->
            中医药理论
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'train', query: { fid: 54 } }"
            class="nav-item"
            target="_blank">
            <!-- <i class="iconfont iconxiangmu"/> -->
            中医公开课
          </nuxt-link>
          <div class="sub-nav">
            <!-- <nuxt-link
              :to="{ name: 'western', query: { cid: 2 }}"
              class="sub-item"
              target="_blank">
              西学中
            </nuxt-link> -->
            <nuxt-link
              :to="{ name: 'train', query: { fid: 54, cid: 61 }}"
              class="sub-item"
              target="_blank">
              保健
            </nuxt-link>
            <nuxt-link
              :to="{ name: 'train', query: { fid: 54, cid: 62 }}"
              class="sub-item"
              target="_blank">
              卫生
            </nuxt-link>
            <nuxt-link
              :to="{ name: 'train', query: { fid: 54, cid: 66 }}"
              class="sub-item"
              target="_blank">
              文化
            </nuxt-link>
          </div>
          <!-- <nuxt-link
            :to="{ name: 'train', query: { fid: 54 }}"
            class="nav-item"
            target="_blank">
            <i class="iconfont icon2jiankangzhishi"/>
            中医健康
          </nuxt-link> -->
        </div>
        <section
          v-if="userInfo"
          class="info-list">
          <div class="avatar">
            <img
              v-if="userInfo.avatar"
              :src="userInfo.avatar"
              @click="openNewPage($router.resolve({ name: 'personal'}))">
            <img
              v-else
              src="~/assets/images/user-logo.png"
              @click="openNewPage($router.resolve({ name: 'personal'}))">
          </div>
          <div
            class="username"
            @click="openNewPage($router.resolve({ name: 'personal'}))">{{ userInfo.nickName }}</div>
          <div
            class="logout"
            @click="logout">安全退出</div>
          <ul>
            <li @click="openNewPage($router.resolve({ name: userInfo && userInfo.roleName == 'zyy_student' ? 'mylearn' : 'teacher' }))">
              <img src="~/assets/images/course.png">
              <div class="text">{{ userInfo && userInfo.roleName == 'zyy_student' ? '我的课程' : '在教课程' }}({{ courseNum }})</div>
            </li>
            <li @click="openNewPage($router.resolve({ name: userInfo && userInfo.roleName == 'zyy_student' ? 'mylearn-myclass' : 'teacher-classes' }))">
              <img src="~/assets/images/classes.png">
              <div class="text">{{ userInfo && userInfo.roleName == 'zyy_student' ? '我的班级' : '在教班级' }}({{ classNum }})</div>
            </li>
          </ul>
          <div
            ref="download"
            class="down"
            @click="downShow = !downShow">下载手机APP随时学习</div>
          <div
            v-show="downShow"
            class="down-logo">
            <img src="~/assets/images/download-qr.png">
          </div>
        </section>
        <section
          v-else
          class="info-list">
          <div class="avatar">
            <img src="~/assets/images/user-logo.png">
          </div>
          <nuxt-link
            to="/login"
            class="button login"
            target="_blank">立即登录</nuxt-link>
          <nuxt-link
            to="/register"
            class="button"
            target="_blank">免费注册</nuxt-link>
          <div
            ref="download"
            class="down down-2"
            @click="downShow = !downShow">下载手机APP随时学习</div>
          <div
            v-show="downShow"
            class="down-logo">
            <img src="~/assets/images/download-qr.png">
          </div>
        </section>
      </div>
    </div>
    <!-- 中医研究所 -->
    <!-- <div
      v-if="researchList.length > 0"
      class="item-container bg-ff">
      <div class="container-header">
        <h2>中医研究所</h2>
        <div class="subnav">
          <nuxt-link
            :to="{ name: 'train', query: { fid: 70 }}"
            class="pos-right"
            target="_blank">
            查看更多
            <i class="iconfont icongengduo"/>
          </nuxt-link>
        </div>
      </div>
      <div class="list">
        <div
          v-for="(item, index) in researchList"
          v-if="index < 4"
          :key="index"
          class="list-item">
          <research-item :data-obj="item" />
        </div>
      </div>
      <div class="button">
        <span @click="change1">
          <i class="iconfont iconrefresh" />
          换一批
        </span>
      </div>
    </div> -->
    <div class="item-container step_jump">
      <div class="container-header">
        <h2>推荐课程</h2>
        <img
          class="hot"
          src="~/assets/images/hot.png" >
          <!-- <div class="subnav">
            <nuxt-link
              :to="{ name: 'train', query: { fid: '00' }}"
              class="pos-right"
              target="_blank">
              查看更多
              <i class="iconfont icongengduo"/>
            </nuxt-link>
          </div> -->
      </div>
      <div class="container-content">
        <div
          v-for="(item, index) in recommendCourse"
          v-if="index < 5"
          :key="index"
          class="list-item">
          <section-item :data-obj="item" />
        </div>
      </div>
    </div>
    <div class="bg-f6 train step_jump">
      <div class="item-container">
        <div class="container-header">
          <h2>培训项目</h2>
          <div class="subnav">
            <nuxt-link
              :to="{ name: 'western', query: { fid: 3 }}"
              target="_blank"
              title="执业培训"
              class="subnav-item">职业培训</nuxt-link>
            <nuxt-link
              :to="{ name: 'western', query: { fid: 2 }}"
              target="_blank"
              title="西学中"
              class="subnav-item">西学中</nuxt-link>
            <nuxt-link
              to="/western"
              class="pos-right"
              target="_blank">
              查看更多
              <i class="iconfont icongengduo" />
            </nuxt-link>
          </div>
        </div>
        <div class="train-imgs">
          <div
            v-for="(item, index) in trainList"
            v-if="index < 4"
            :key="index"
            class="train-img"
            @click="toTrainDetail(item)">
            <img :src="item.middle_picture">
          </div>
        </div>
        <div class="button">
          <span @click="change2">
            <i class="iconfont iconrefresh" />
            换一批
          </span>
        </div>
      </div>
    </div>
    <!-- 名医师承 -->
    <div
      ref="item3"
      class="bg-f6 step_jump">
      <div class="item-container">
        <div class="container-header">
          <h2>名医师承</h2>
          <div class="subnav">
            <nuxt-link
              :to="{ name: 'doctor' }"
              class="pos-right"
              target="_blank">
              查看更多
              <i class="iconfont icongengduo"/>
            </nuxt-link>
          </div>
        </div>
        <div class="list">
          <div
            v-for="(item, index) in famousList"
            v-if="index < 5"
            :key="index"
            class="list-item">
            <famous-item :data-obj="item"/>
          </div>
        </div>
        <div class="imgs">
          <nuxt-link
            class="img"
            to="/train?fid=101"
            target="_blank">
            <img
              src="~/assets/images/famous_1.png"
              alt="考前辅导"
              title="考前辅导">
          </nuxt-link>
          <nuxt-link
            class="img"
            to="/western"
            target="_blank">
            <img
              src="~/assets/images/famous_3.png"
              alt="培训项目"
              title="培训项目">
          </nuxt-link>
          <nuxt-link
            class="img"
            to="/community"
            target="_blank">
            <img
              src="~/assets/images/famous_3.jpg"
              alt="中医药进社区"
              title="中医药进社区">
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- 中医大讲堂 -->
    <div
      ref="item4"
      class="item-container step_jump">
      <div class="container-header">
        <h2>中医大讲堂</h2>
        <div class="subnav">
          <nuxt-link
            v-for="(item, index) in healthSubList"
            :key="index"
            :to="{ name: 'train', query: { fid: 76, cid: item.id }}"
            :title="item.name"
            target="_blank"
            class="subnav-item">{{ item.name }}</nuxt-link>
          <nuxt-link
            :to="{ name: 'train', query: { fid: 76 }}"
            class="pos-right"
            target="_blank">
            查看更多
            <i class="iconfont icongengduo"/>
          </nuxt-link>
        </div>
      </div>
      <div class="container-content">
        <div class="left-img">
          <img src="~/assets/images/img_1.png">
        </div>
        <div class="right-list">
          <div
            v-for="(item, index) in healthList"
            v-if="index < 8"
            :key="index"
            class="list-item">
            <section-item :data-obj="item" />
          </div>
        </div>
      </div>
    </div>
    <div
      ref="item5"
      class="item-container step_jump">
      <div class="container-header">
        <h2>学历助考</h2>
        <div class="subnav">
          <nuxt-link
            v-for="(item, index) in examSubList"
            :key="index"
            :to="{ name: 'train', query: { fid: 85, cid: item.id }}"
            :title="item.name"
            target="_blank"
            class="subnav-item">{{ item.name }}</nuxt-link>
          <nuxt-link
            :to="{ name: 'train', query: { fid: 85 }}"
            class="pos-right"
            target="_blank">
            查看更多
            <i class="iconfont icongengduo"/>
          </nuxt-link>
        </div>
      </div>
      <div class="container-content">
        <div class="left-img">
          <img src="~/assets/images/img_3.png">
        </div>
        <div class="right-list">
          <div
            v-for="(item, index) in examList"
            v-if="index < 8"
            :key="index"
            class="list-item">
            <section-item :data-obj="item" /> 
          </div>
        </div>
      </div>
    </div>
    <div
      ref="item6"
      class="item-container step_jump">
      <div class="container-header">
        <h2>中医药理论</h2>
        <div class="subnav">
          <nuxt-link
            v-for="(item, index) in theorySubList"
            :key="index"
            :to="{ name: 'train', query: { fid: 55, cid: item.id }}"
            :title="item.name"
            target="_blank"
            class="subnav-item">{{ item.name }}</nuxt-link>
          <nuxt-link
            :to="{ name: 'train', query: { fid: 55 }}"
            class="pos-right"
            target="_blank">
            查看更多
            <i class="iconfont icongengduo"/>
          </nuxt-link>
        </div>
      </div>
      <div class="container-content">
        <div class="left-img">
          <img src="~/assets/images/img_2.png">
        </div>
        <div class="right-list">
          <div
            v-for="(item, index) in theoryList"
            v-if="index < 8"
            :key="index"
            class="list-item">
            <section-item :data-obj="item" /> 
          </div>
        </div>
      </div>
    </div>
    <div
      ref="item7"
      class="item-container step_jump">
      <div class="container-header">
        <h2>执业资格</h2>
        <div class="subnav">
          <nuxt-link
            v-for="(item, index) in qualificationSubList"
            :key="index"
            :to="{ name: 'train', query: { fid: 79, cid: item.id }}"
            :title="item.name"
            target="_blank"
            class="subnav-item">{{ item.name }}</nuxt-link>
          <nuxt-link
            :to="{ name: 'train', query: { fid: 79 }}"
            class="pos-right"
            target="_blank">
            查看更多
            <i class="iconfont icongengduo"/>
          </nuxt-link>
        </div>
      </div>
      <div class="container-content">
        <div class="left-img">
          <img src="~/assets/images/img_4.png">
        </div>
        <div class="right-list">
          <div
            v-for="(item, index) in qualificationList"
            v-if="index < 8"
            :key="index"
            class="list-item">
            <section-item :data-obj="item" /> 
          </div>
        </div>
      </div>
    </div>
    <div
      ref="item8"
      class="item-container step_jump">
      <div class="container-header">
        <h2>资讯头条</h2>
        <div class="subnav">
          <nuxt-link
            v-for="(item, index) in toutiaoSubList"
            :key="index"
            :to="{ name: 'toutiao', query: { type: item.id }}"
            :title="item.name"
            target="_blank"
            class="subnav-item">{{ item.name }}</nuxt-link>
          <nuxt-link
            :to="{ name: 'toutiao' }"
            class="pos-right"
            target="_blank">
            查看更多
            <i class="iconfont icongengduo"/>
          </nuxt-link>
        </div>
      </div>
      <div class="toutiao">
        <div
          v-for="(item, index) in toutiaoList"
          v-if="index < 6"
          :key="index"
          class="toutiao-item">
          <toutiao-item :data-obj="item"/>
        </div>
      </div>
    </div>
    <div class="foot-img">
      <nuxt-link
        to="/service"
        target="_blank">
        <img
          src="~/assets/images/foot-img.png"
          alt="服务与保障">
      </nuxt-link>
    </div>
    <!-- 左边侧边栏 -->
    <ul class="left-aside">
      <li :class="{ 'active' : activeIndex == 0 }">
        <a
          href="javascript:;"
          @click="jump(0)">
          <span>推荐</span>
          <span>课程</span>
        </a>
      </li>
      <li :class="{ 'active' : activeIndex == 1 }">
        <a
          href="javascript:;"
          @click="jump(1)">
          <span>培训</span>
          <span>项目</span>
        </a>
      </li>
      <li :class="{ 'active' : activeIndex == 2 }">
        <a
          href="javascript:;"
          @click="jump(2)">
          <span>名医</span>
          <span>师承</span>
        </a>
      </li>
      <li :class="{ 'active' : activeIndex == 3 }">
        <a
          href="javascript:;"
          @click="jump(3)">
          <span>中医</span>
          <span>大讲堂</span>
        </a>
      </li>
      <li :class="{ 'active' : activeIndex == 4 }">
        <a
          href="javascript:;"
          @click="jump(4)">
          <span>学历</span>
          <span>助考</span>
        </a>
      </li>
      <li :class="{ 'active' : activeIndex == 5 }">
        <a
          href="javascript:;"
          @click="jump(5)">
          <span>中医药</span>
          <span>理论</span>
        </a>
      </li>
      <li :class="{ 'active' : activeIndex == 6 }">
        <a
          href="javascript:;"
          @click="jump(6)">
          <span>执业</span>
          <span>资格</span>
        </a>
      </li>
      <li :class="{ 'active' : activeIndex == 7 }">
        <a
          href="javascript:;"
          @click="jump(7)">
          <span>资讯</span>
          <span>头条</span>
        </a>
      </li>
      <li
        v-show="fixedShow"        
        class="topscroll">
        <a
          href="javascript:;"
          @click="toTop">
          顶部
          <br>
          <i class="iconfont iconarrow-right" />
        </a>
      </li>
    </ul>
    <friend-link :link-list="friendLinkList" />
    <transition name="fade">
      <div
        v-show="fixedShow"
        class="fix-header">
        <div class="content">
          <img
            class="logo"
            src="~/assets/images/fix_logo.png">
          <div class="search">
            <input
              v-model="text"
              type="text"
              placeholder="输入关键词找课程"
              @keyup.enter="search">
            <div
              class="search-icon"
              @click="search">
              <img src="~/assets/images/search.png">
            </div>
          </div>
          <div
            v-show="tagShow"
            class="content-right">
            <div
              class="learn"
              @click="toNewPage('mylearn')">
              {{ userInfo && userInfo.roleName == 'zyy_student' ? '我的学习' : '我的教学' }}
            </div>
            <div
              class="personal"
              @click="toNewPage('personal')">个人中心
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Nav from '~/components/navBar.vue'
import ResearchItem from '~/components/index/researchItem.vue'
import FamousItem from '~/components/index/famousItem.vue'
import SectionItem from '~/components/index/sectionItem.vue'
import ToutiaoItem from '~/components/index/toutiaoItem.vue'
import Header from '~/components/layout/header.vue'
import FriendLink from '~/components/layout/friendLink.vue'
import Cookies from 'js-cookie'
import { Base64 } from '~/assets/js/base64.js'
import { judgeUser } from '~/assets/js/util'
export default {
  components: {
    'v-nav': Nav,
    'v-header': Header,
    ResearchItem,
    FamousItem,
    SectionItem,
    ToutiaoItem,
    FriendLink
  },
  data() {
    return {
      title: '中医药在线',
      tabIndex: 1,
      current1: 1,
      current2: 1,
      size: 4,
      userInfo: '',
      text: '',
      downShow: false,
      fixedShow: false,
      tagShow: false,
      courseNum: 0,
      classNum: 0,
      carousels: [],
      infoList: [],
      researchList: [],
      researchPages: 0, // 中医研究所数据总页数
      famousList: [],
      examList: [],
      theoryList: [],
      healthList: [],
      rightList: [],
      trainList: [],
      trainPages: 0, // 培训项目数据总页数
      toutiaoList: [],
      healthSubList: [],
      examSubList: [],
      theorySubList: [],
      friendLinkList: [],
      rankStatus: 0, // 角色的status
      recommendCourse: [], // 推荐课程
      qualificationList: [], // 执业资格列表
      activeIndex: 0, // 描点
      scrollTop: 0, // 滚动高度
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  async asyncData({ $axios }) {
    let [
      friendLinkList,
      carousels,
      famousList,
      toutiaoList,
      examList,
      theoryList,
      healthList,
      qualificationList,
      healthSubList,
      examSubList,
      theorySubList,
      qualificationSubList,
      trainList,
      toutiaoSubList,
      recommendCourse
    ] = await Promise.all([
      $axios('/yxs/api/web/getFriendsName'),
      $axios('/yxs/api/web/navigation'),
      $axios('/yxs/api/web/doctor/recommendList'),
      $axios('/yxs/api/web/news/recommendList'),
      $axios('/yxs/api/web/course/getRecommendList', { params: { type: 'xlzk' }}),
      $axios('/yxs/api/web/course/getRecommendList', { params: { type: 'career' }}),
      $axios('/yxs/api/web/course/getRecommendList', { params: { type: 'zydjt' }}),
      $axios('/yxs/api/web/course/getRecommendList', { params: { type: 'zyzg' }}),
      $axios('/yxs/api/web/course/getCategoryByCode', { params: { code: 'zydjt' }}),
      $axios('/yxs/api/web/course/getCategoryByCode', { params: { code: 'xlzk' }}),
      $axios('/yxs/api/web/course/getCategoryByCode', { params: { code: 'career' }}),
      $axios('/yxs/api/web/course/getCategoryByCode', { params: { code: 'zyzg' }}),
      $axios('/yxs/api/web/course/getRecommendTrainList', { params: { type: '', current: 1, size: 4 }}),
      $axios('/yxs/api/web/news/getAllCategory'),
      $axios('/yxs/api/web/course/indexRecommendList', { params: { size: 5, current: 1 }})
    ])
    return {
      friendLinkList: friendLinkList.data,
      carousels: carousels.data,
      famousList: famousList.data,
      toutiaoList: toutiaoList.data,
      examList: examList.data,
      theoryList: theoryList.data,
      healthList: healthList.data,
      healthSubList: healthSubList.data,
      qualificationList: qualificationList.data,
      examSubList: examSubList.data,
      theorySubList: theorySubList.data,
      trainList: trainList.data.records,
      qualificationSubList: qualificationSubList.data, 
      trainPages: trainList.data.pages,
      toutiaoSubList: toutiaoSubList.data,
      recommendCourse: recommendCourse.data.records
    }
  },
  created() {

  }, 
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    const clientId = 'zyy_web'
    const clientSecret = '7BPvPjnxRHRHpyKLTdLOtA=='
    const encodeStr = Base64.encode(clientId + ':' + clientSecret);
    let params = {
      username: '',
      password: '',
      scope: 'server',
      grant_type: 'client_credentials'
    }
    this.userInfo = Cookies.getJSON('zyy_userInfo') || ''
    console.log('userInfo', this.userInfo)
    if(!Cookies.get('zyy_accessToken')) {
      this.$axios.setHeader('appId', 'zyy')
      this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
      this.$axios.setHeader('Authorization', 'Basic' + ' ' + encodeStr)
      this.$axios.post('/auth/oauth/token', params).then(res => {
        Cookies.set('zyy_accessToken', res.access_token, { expires: 1 })
        this.$axios.setHeader('Authorization', 'Bearer' + res.access_token)
        if(this.userInfo) {
          this.getCourseNum()
          this.getClassNum()
          this.getInfo()
          this.tagShow = true
        }
      })
    } else {
      this.$axios.setHeader('appId', 'zyy')
      this.$axios.setHeader('Authorization', 'Bearer' + Cookies.get('zyy_accessToken'))
      if(this.userInfo) {
        this.rankStatus = judgeUser().status
        this.getCourseNum()
        this.getClassNum()
        this.getInfo()
        this.tagShow = true
      }
    }
  },
  methods: {
    // 获取首页中医研究所
    getResearchList() {
      this.$axios('/yxs/api/web/doctor/recommendCourseList', {
        params: {
          current: this.current1,
          size: this.size
        }
      }).then(res => {
        if(res.code == 0) {
          if(res.data.records.length == 0) {
            return
          } else if(res.data.records.length < 4) {
            this.current1 = 0
            this.researchList = res.data.records
          } else {
            this.researchList = res.data.records
          }
          // this.researchList = res.data
        }
      })
    },
    // 首页培训项目
    getTrainList() {
      this.$axios('/yxs/api/web/course/getRecommendTrainList', {
        params: {
          type: '',
          current: this.current2,
          size: this.size
        }
      }).then(res => {
        if(res.data.records.length == 0) {
          return
        } else if(res.data.records.length < 4) {
          this.current2 = 0
          this.trainList = res.data.records
        } else {
          this.trainList = res.data.records
        }
      })
    },
    change1() {
      if(this.current1 == this.researchPages) {
        this.current1 = 1
      } else {
        this.current1 += 1
      }
      this.getResearchList()
    },
    change2() {
      if (this.current2 == this.trainPages) {
        this.current2 = 1
      } else {
        this.current2 += 1
      }
      this.getTrainList()
    },
    toTrainDetail(item) {
      let url = this.$router.resolve({
        name: 'trainDetail',
        query: {
          id: item.trainId
        }
      })
      window.open(url.href, '_blank')
    },
    logout() {
      this.$confirm(`确定退出登录吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        Cookies.remove('zyy_userInfo')
        this.$router.push({
          name: 'login'
        })
      })
    },
    toNavigation(url) {
      window.open(url)
    },
    getCourseNum() {
      let params = {
        type: 0,
        userToken: this.userInfo.userToken || '',
        teacherStatus: this.rankStatus
      }
      this.$axios('/yxs/api/web/user/getCourseMemberPageByUserId', {
        params
      }).then(res => {
        if (res.code == 0) {
          this.courseNum = res.data.total
        }
      })
    },
    getClassNum() {
      let params = {
        type: 0,
        userToken: this.userInfo.userToken,
        teacherStatus: this.rankStatus
      }
      this.$axios('/yxs/api/web/user/getClassroomMemberPageByUserId', {
        params
      }).then(res => {
        if (res.code == 0) {
          this.classNum = res.data.total
        }
      })
    },
    getInfo() {
      this.$axios('/admin/api/web/user/findUserTokenGetName', {
        params: {
          userToken: this.userInfo.userToken
        }
      }).then(res => {
        Cookies.set('zyy_userInfo', res.data, { expires: 1 })
      })
    },
    handleScroll() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.fixedShow = this.scrollTop > 1000 ? true : false
      this.onScroll(this.scrollTop + 80)
    },
    search() {
      let url = location.href
      if(url.indexOf('searchResult') > -1) {
        this.$emit('getList', this.text, true)
      } else {
        let link = this.$router.resolve({
          name: 'searchResult',
          query: {
            title: this.text
          }
        })
        window.open(link.href, '_blank')
      }
    },
    toNewPage(name) {
      let url = this.$router.resolve({ name: name })
      window.open(url.href, '_blank')
    },
    openNewPage(url) {
      window.open(url.href, '_blank')
    },
    toTop() {
      let osTop, ispeed
      let timer = setInterval(function () {
        osTop = document.documentElement.scrollTop || document.body.scrollTop
        ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        if (osTop == 0) {
          clearInterval(timer)
        }
      }, 30)
    },
    // 描点平滑滚动
    onScroll(scrollTop) {
      let _artice = document.querySelectorAll('.step_jump')
      for (let i = 0; i < _artice.length; i++) {
        if (scrollTop >= _artice[i].offsetTop) {
          this.activeIndex = i
        }
      }
      // _artice.forEach((item, index) => {
      //   if (scrollTop >= item.offsetTop) {
      //     this.activeIndex = index
      //   }
      // })
    },
    jump(index) {
      let that = this
      let jump = document.querySelectorAll('.step_jump')
      let total = jump[index].offsetTop
      let distance = this.scrollTop
      let step =  (distance - total) / 50 >> 0
      if (total < distance) {
        // smoothUp()
        document.documentElement.scrollTop = document.body.scrollTop = total - 40
      } else {
        // let newTotal = total - distance 
        // step = newTotal / 50 >> 0
        // smoothDown()
        document.documentElement.scrollTop = document.body.scrollTop  = total - 40
      }
      function smoothDown () {
        if (distance < total) {
          distance += step
          document.documentElement.scrollTop = document.body.scrollTop = distance - 40       
          setTimeout(smoothDown, 10)
        } else {
          document.documentElement.scrollTop = document.body.scrollTop  = total - 40
        }
      }
      function smoothUp () {
        if (distance > total) {
          distance -= step
          document.documentElement.scrollTop = document.body.scrollTop = distance - 40
          setTimeout(smoothUp, 10)
        } else {
          document.documentElement.scrollTop = document.body.scrollTop = total - 40
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .left-aside {
    width: 46px;
    height: auto;
    position: fixed;
    top: 50%;
    left: 6%;
    transform: translate(0, -50%);
    z-index: 100;
    background: #666;
    li {
      width: 46px;
      height: 46px;
      box-sizing: border-box;
      padding: 0 2px;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 10px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #777;
        font-size: 12px;
        line-height: 14px;
        color: #fff;
        text-align: center;
        span {
          width: 100%;
          display: block;
          text-align: center;
        }
      }
      &.active {
        background: #fbb03b;
        a {
          border: 0;
        }
      }
      &.topscroll {
        background: #3f8a38;
        a {
          border: 0;
        }
        i.iconarrow-right {
          transform: rotate(-90deg);
          font-size: 11px;
          color: #fff;
        }
      }
    }
  }
  .carousel {
    height: 400px;
    .imgs {
      width: 100%;
      height: 400px;
      img {
        width: 100%;
        height: 400px;
        cursor: pointer;
      }
    }
    &-content {
      position: relative;
      width: 1200px;
      margin: -400px auto;
      .nav-list {
        position: absolute;
        top: 0;
        padding: 0 20px 20px 20px;
        width: 184px;
        height: 380px;
        background: rgba(0, 0, 0, .7);
        color: #fff;
        font-size: 16px;
        z-index: 99;
        .nav-item {
          margin-top: 29px;
          height: 16px;
          line-height: 16px;
          color: #fff;
          cursor: pointer;
          display: block;
          &:hover {
            color: #4fff3f;
          }
        }
        .sub-nav {
          height: 14px;
          margin-top: 18px;
          font-size: 14px;
          opacity: .6;
          .sub-item {
            margin-right: 14px;
            line-height: 14px;
            cursor: pointer;
            color: #f2f2f2;
            &:hover {
              color: #4fff3f;
            }
          }
        }
      }
      .info-list {
        position: absolute;
        right: 0;
        top: 35px;
        width: 245px;
        height: 330px;
        z-index: 99;
        background: rgba(255, 255, 255, .9);
        box-shadow: 0 10px 20px #666;
        border-radius: 4px;
        .avatar {
          margin-top: 30px;
          text-align: center;
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            cursor: pointer;
          }
        }
        .username {
          margin-top: 10px;
          font-size: 14px;
          color: #363636;
          text-align: center;
        }
        .logout {
          margin-top: 10px;
          color: #838383;
          font-size: 12px;
          text-align: center;
          cursor: pointer;
          &:hover {
            color: #3F8A38;
          }
        }
        ul {
          display: flex;
          margin-top: 30px;
          li {
            width: 50%;
            text-align: center;
            cursor: pointer;
            .text {
              margin-top: 16px;
              font-size: 15px;
              color: #363636;
              &:hover {
                color: #99cb64;
              }
            }
          }
        }
        .button {
          display: block;
          margin: 13px auto;
          width: 165px;
          height: 38px;
          line-height: 38px;
          border: 1px solid #99cb64;
          border-radius: 5px;
          font-size: 16px;
          color: #99cb64;
          text-align: center;
          cursor: pointer;
        }
        .login {
          margin-top: 30px;
          background: #99cb64;
          color: #fff;
        }
        .down, .down-2 {
          margin-top: 50px;
          text-align: center;
          color: #363636;
          font-size: 12px;
          cursor: pointer;
          &:hover {
            color: #99cb64;
          }
        }
        .down-logo {
          position: absolute;
          bottom: 0;
          left: -142px;
          width: 120px;
          height: 120px;
          padding: 6px;
          background: #fff;
          &:before, &:after {
            border: solid transparent;
            content: ' ';
            height: 0;
            top: 100%;
            position: absolute;
            width: 0;
          }
          &:before {
            border-width: 8px;
            border-left-color: #fff;
            top: 90px;
            right: -14px;
          }
          img {
            width: 120px;
          }
        }
        .info-header {
          display: flex;
          justify-content: space-between;
          padding-left: 12px;
          height: 40px;
          line-height: 40px;
          background: rgba(63, 138, 56, .6);
          color: #fff;
          h3 {
            font-size: 16px;
          }
          .more {
            margin-right: 12px;
            font-size: 0;
            cursor: pointer;
            span {
              font-size: 14px;
            }
            i {
              margin-left: 2px;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
  .item-container {
    width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
    .container-header {
      position: relative;
    }
    h2 {
      display: inline-block;
      font-size: 24px;
      color: #333;
      font-weight: 400;
    }
    .subnav {
      display: inline-block;
      font-size: 0;
      span {
        display: inline-block;
        margin-left: 16px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        &:hover {
          color: #3F8A38;
        }
      }
      .subnav-item {
        display: inline-block;
        margin-left: 16px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        &:hover {
          color: #3F8A38;
        }
      }
      .pos-right {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 12px;
        color: #666;
        &:hover {
          color: #3F8A38;
        }
        .icongengduo {
          font-size: 12px;
        }
      }
    }
    .list {
      display: flex;
      margin-top: 24px;
      &-item {
        margin-left: 20px;
        &:first-child {
          margin: 0;
        }
      }
    }

    .imgs {
      font-size: 0;
      .img {
        margin-left: 20px;
        &:first-child {
          margin-left: 0;
        }
      }
      img {
        cursor: pointer;
        transition: all 0.3s ease 0s;
        border-radius: 6px;
        &:hover {
          transform: translate(0, -5px);
          box-shadow: 0 5px 12px #999;
        }
      }
    }
    .container-content {
      display: flex;
      margin-top: 22px;
      margin-bottom: 10px;
      .left-img {
        position: relative;
        width: 224px;
        height: 390px;
        cursor: pointer;
        .text {
          position: absolute;
          top: 150px;
          width: 224px;
          text-align: center;
          color: #fff;
          .title {
            font-size: 24px;
            font-weight: bold;
          }
          .sub-title {
            margin-top: 24px;
            font-size: 18px;
          }
        }
      }
      .right-list {
        flex: 1;
        margin-left: 20px;
        .list-item {
          display: inline-block;
          width: 224px;
          height: 183px;
          margin-bottom: 24px;
          &:nth-child(4n + 1) {
            margin-left: 0;
          }
          &:nth-child(n + 4) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .bg-f6 {
    // background: #f6f6f6;
    padding-bottom: 39px;
  }
  .bg-ff {
    .button {
      margin-top: -20px;
      margin-bottom: 30px;
      text-align: center;
      .iconrefresh {
        font-size: 14px;
        margin-right: 6px;
      }
      span {
        display: inline-block;
        width: 160px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        font-size: 14px;
        color: #666;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: #3F8A38;
          color: #fff;
        }
      }
    }
  }
  .train {
    margin-top: 40px;
    .train-img {
      position: relative;
      display: inline-block;
      width: 285px;
      height: 160px;
      margin-top: 24px;
      margin-left: 20px;
      font-size: 0;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      &:hover .text{
        background: #3F8A38;
        color: #fff;
      }
      &:hover img {
        transform: scale(1.1, 1.1);
      }
      &:first-child {
        margin-left: 0;
      }
      .text {
        position: absolute;
        bottom: 12px;
        left: 12px;
        height: 28px;
        line-height: 28px;
        padding: 0 16px;
        font-size: 14px;
        color: #fff;
        background: rgba(0, 0, 0, .6);
        border-radius: 14px;
      }
    }
    img {
      display: inline-block;
      width: 285px;
      height: 160px;
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    .button {
      margin-top: 30px;
      text-align: center;
      .iconrefresh {
        font-size: 14px;
        margin-right: 6px;
      }
      span {
        display: inline-block;
        width: 160px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        font-size: 14px;
        color: #666;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: #3F8A38;
          color: #fff;
        }
      }
    }
  }
  .toutiao {
    margin-top: 24px;
    &-item {
      // display: inline-block;
      float: left;
      width: 590px;
      margin-bottom: 24px;
      cursor: pointer;
      &:nth-child(even) {
        margin-left: 20px;
      }
    }
  }
  .fix-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background: #3F8A38;
    z-index: 999;
    overflow: hidden;
    .content {
      display: flex;
      align-items: center;
      width: 1200px;
      height: 60px;
      margin: 0 auto;
      .logo {
        display: inline-block;
        width: 277px;
        height: 32px;
      }
      .search {
        display: flex;
        margin-left: 230px;
        width: 300px;
        height: 36px;
        box-sizing: border-box;
        border: 1px solid #99C04F;
        border-radius: 4px;
        input {
          flex: 1;
          padding-left: 10px;
          height: 32px;
          outline: none;
          border: none;
        }
        .search-icon {
          width: 36px;
          height: 34px;
          line-height: 34px;
          background: #99c04f;
          cursor: pointer;
          img {
            display: block;
            width: 20px;
            height: 20px;
            margin: 7px;
          }
        }
      }
      &-right {
        margin-left: 8px;
        > div {
          display: inline-block;
          margin-left: 28px;
          color: #fff;
          cursor: pointer;
        }
        .message {
          position: relative;
          .dot {
            position: absolute;
            top: 6px;
            right: -6px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ff4400;
          }
        }
      }
    }
  }
  .fade-leave-active, .fade-enter-active {
    transition: all 0.4s ease;
  }
  .fade-leave-to, .fade-enter {
    height: 0;
  }
  .hot {
    vertical-align: bottom;
    margin-left: 10px;
  }
  
</style>
<style>
  .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
  }
  .el-carousel__container button {
    background: #999;
  }
  .el-carousel__arrow.el-carousel__arrow--right {
    right: 70px;
  }
  .el-carousel__indicator.is-active .el-carousel__button {
    background: #3F8A38;
  }
</style>
