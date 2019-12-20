<template>
  <div style="width:100%">
    <v-header />
    <nav-bar />
    <div class="container">
      <div class="crumb">
        <nuxt-link to="/">首页</nuxt-link>
        <i class="iconfont iconarrow-right" />
        <nuxt-link :to="{ name: 'train' }">课程中心</nuxt-link>
        <i class="iconfont iconarrow-right" />
        <nuxt-link :to="{ name: 'play', query: { courseId: courseId }}">{{ info.courseTitle }}</nuxt-link>
      </div>
      <div class="play-container">
        <div class="play-header">
          <div class="title">
            {{ info.courseTitle }}
          </div>
          <div class="sub">
            <span>{{ info.studentNum }}人学过</span>
            <!-- <span v-if="info.day > 0">{{ info.day }}天后到期,请尽快学完</span>
            <span v-if="info.day < 0">永久有效</span>
            <span v-if="info.day == 0">已到期</span> -->
          </div>
        </div>
        <div class="play-content">
          <div
            ref="prismPlayerBox"
            class="prism-player-box">
            <div
              id="J_prismPlayer"
              class="prism-player" />
          </div>
          <div
            v-show="maskShow"
            class="mask">
            <p>亲爱的学员，购买该课程才可以观看全部视频哦~</p>
            <div
              class="buy-btn"
              @click="buyLesson">立即购买</div>
          </div>
          <div
            v-show="nextShow"
            class="next-mask">
            <div class="content">
              <div class="title">您已学完本节，<span>{{ time }}</span>秒后自动进入下一节</div>
              <div class="button">
                <span @click="agian">再学一遍</span>
                <span
                  class="next"
                  @click="next">学下一节</span>
              </div>
            </div>
          </div>
          <div
            v-show="lastShow"
            class="next-mask">
            <div class="content">
              <div class="title">您已学完最后一节课时啦，你的坚持终将会有回报！</div>
              <div class="button">
                <span @click="agian">再学一遍</span>
              </div>
            </div>
          </div>
          <ul
            ref="menu"
            class="menu">
            <li
              v-for="(item, index) in info.lessons"
              ref="menuli"
              :key="index"
              :class="lessonId == item.lessonId ? 'active' : ''">
              <!-- <div class="chapter">111</div> -->
              <i
                v-if="lessonId == item.lessonId && playFlag"
                class="iconfont iconbofang" />
              <i 
                v-else 
                class="iconfont iconzanting" />
              <div class="info">
                <!-- <span>{{ item.name }}</span> -->
                <span
                  class="title"
                  @click="getInfo(item.lessonId, item.free, index, true)">{{ item.lessonTitle }}</span>
                <div class="foot">
                  <span>{{ Math.round(item.length / 60) }}分钟</span>
                  <span
                    v-if="parseFloat(item.result) > 99.4 && lessonId != item.lessonId"
                    class="complete">已学完</span>
                  <span v-else-if="item.result == '0%' && lessonId != item.lessonId">未学习</span>
                  <span v-else-if="lessonId != item.lessonId">已学{{ item.result }}</span>
                  <span v-else>已学{{ results }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="otherList.length > 0"
        class="other-container">
        <div class="container-title">{{ classId ? '本班课程' : '我的其它课程' }}</div>
        <ul>
          <li
            v-for="(item, index) in otherList"
            :key="index"
            class="list-item">
            <div
              class="img-box"
              @click="changeVideo(item.courseId)">
              <img :src="item.middlePicture">
            </div>
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <!-- <p
                v-if="item.dayCount != 0"
                class="desc">
                {{ item.dayCount }}天后到期
              </p>
              <p
                v-else
                class="desc">
                已到期
              </p> -->
              <div class="foot">
                <span
                  v-if="item.result == '100%'"
                  class="complete">已学完</span>
                <span v-else-if="item.result == '0%'">未学习</span>
                <span v-else>已学{{ item.result }}</span>
                <span>共{{ item.lessonNum }}节</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="recommend-container">
        <div class="container-title">推荐课程</div>
        <ul>
          <li
            v-for="(item, index) in recommendList"
            :key="index">
            <div
              class="img-box"
              @click="openNewPage($router.resolve({ name: 'lessonDetail', query: { id: item.id }}))">
              <img :src="item.middle_picture">
            </div>
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <div class="info">
                <span
                  v-if="item.price == 0"
                  class="free">
                  免费
                </span>
                <span
                  v-else
                  class="price">
                  &yen;{{ item.price }}
                </span>
                <span class="lesson">共{{ item.lessonNum }}节</span>
                <span class="number">{{ item.studentNum }}人学过</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import NavBar from '~/components/navBar.vue'
import Cookies from 'js-cookie'
import { formatSeconds, judgeUser } from '~/assets/js/util'
export default {
  // middleware: 'userAuth',
  components: {
    NavBar,
    'v-header': Header
  },
  data() {
    return {
      title: '',
      maskShow: false,
      nextShow: false,
      lastShow: false,
      courseId: this.$route.query.courseId || '',
      lessonId: null,
      classId: this.$route.query.classId || '',
      userInfo: '',
      info: '',
      menuList: [],
      otherList: [],
      recommendList: [],
      playIndex: 0,
      player: null,
      playFlag: true ,
      time: 0,
      timer: null,
      rankStatus: 0, // 角色的status
      timer2: null,  // 播放进度实时修改
      timing: 90000, // 每隔90s将视频进度传给后台
      videoTime: 0, // 视频正在播放长度
      watched: 0, // 已观看的视频
      isLearnEnd: 1, // 是否已学完该课程  1： 未学完   2：已学完
      startSeekTime: 0, // 开始拖拽时间
      completeSeekTime: 0, // 完成拖拽时间
      videoDuration: 1, // 视频总时长
      results: '0.00%', // 当前视频播放进度
      timer3: null, // 将视频进度传给后台的计时器
      drag: 0
    }
  },
  head() {
    return {
      title: this.title,
      link: [
        { rel: 'stylesheet', href: '/aliplayer/aliplayer-min.css' }
      ],
      script: [
        { src: '/aliplayer/aliplayer-min.js', type: 'text/javascript'}       
      ]
    }
  },
  computed: {
    timestr() {
      return function(time) {
        return formatSeconds(time)
      }
    }
  },
  watch:{
    videoTime: {
      handler: function (newVal, oldVal) {
        this.results = ((newVal / this.videoDuration)*100).toFixed(2) + '%'
        if (parseFloat(this.results) >= 99.9) {
          this.results = '完'
        }
      },
      immediate: true
    }
  },
  mounted() {
    window.scrollTo(0, 200)
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    if(!this.userInfo) {
      this.$router.push({
        name: 'login'
      })
      return
    }
    this.rankStatus = judgeUser().status
    this.getInfo()
    this.getList()
    this.getRecommendList('zyjk')
    // window.onbeforeunload = function() {
    //   this.stopStudy()
    // }
  },
  methods: {
    getInfo(lessonId, free, index, flag) {
      let _this = this
      this.playIndex = index || 0
      if(lessonId) {
        this.lessonId = lessonId
      }
      if(free == 2) {
        _this.player.pause()
        this.maskShow = true
        return
      }
      if(_this.player) {
        // _this.player.dispose()
        _this.player.pause()
        _this.player.dispose()
        document.querySelector('#J_prismPlayer').remove()
        // 兼容360安全浏览器8 的写法
        var domPlay = '<div id="J_prismPlayer" class="prism-player"></div>'
        document.querySelector('.prism-player-box').innerHTML = domPlay
      }
      this.maskShow = false
      this.nextShow = false
      this.lastShow = false
      if(this.classId) {
        this.$axios.post('/yxs/api/web/user/startLearnClass', {
          lessonId: lessonId || this.$route.query.lessonId,
          classId: this.classId,
          courseId: this.courseId,
          userToken: this.userInfo.userToken
        }).then(res => {
          let info = res.data
          this.info = res.data
          this.title = res.data.courseTitle + '_'
          this.lessonId = res.data.lessonId
          this.courseId = res.data.courseId || ''
          this.watched = res.data.startDuration
          this.timing = res.data.videoTimingInterface * 1000
          this.isLearnEnd = res.data.status
          this.isLearnEnd == 1 ? this.results = '0.00%' : this.results = '完'
          this.drag = res.data.drag
          for(let i in info.lessons) {
            if(info.lessons[i].lessonId == this.lessonId) {
              this.playIndex = i
              if(i > 0 && !flag) { // 不是点击切换
                this.$nextTick(() => {
                  let top = _this.$refs.menuli[i].getBoundingClientRect().top
                  let height = _this.$refs.menuli[i].clientHeight
                  this.$refs.menu.scrollTo(0, top - height - 30)
                })
              }
              break
            }
          }
          
          _this.player = new Aliplayer({
            "id": "J_prismPlayer",
            "vid": info.videoId,
            "playauth": info.playAuth,
            "qualitySort": "asc",
            "format": "m3u8",
            "mediaType": "video",
            "width": "100%",
            "height": "500px",
            "autoplay": true,
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
          document.querySelector('.prism-ErrorMessage').style.display = 'none'
          let seeked = false
          _this.player.on('ready',function(e) {
            if (!seeked) {
              setTimeout(() => {
                if (_this.isLearnEnd == 1) {
                  _this.player.seek(info.startDuration)
                  _this.setTimer()
                  _this.setTimer2()
                } else {
                  _this.player.seek(0)
                }
                seeked = true
              }, 800)
            }
          })
          _this.player.on('pause', _this.stopStudy)
          _this.player.on('ended', _this.endedHandle)
          _this.player.on('play', function() {
            if (!_this.timer2 && _this.isLearnEnd == 1) {
              _this.setTimer()
            }
            if (!_this.timer3 && _this.isLearnEnd == 1) {
              _this.setTimer2()
            }
            _this.playFlag = true
          })
          if (_this.drag == 1) {
            _this.player.on('startSeek', function (e) {
              // console.log('开始拖拽', e.paramData)
              _this.startSeekTime = parseInt(e.paramData)
              // 缓存最大的已播放时间
              if (e.paramData > _this.watched) {
                _this.watched = e.paramData
              }
            })
            _this.player.on('completeSeek', function (e) {
              // console.log('完成拖拽', e)
              _this.completeSeekTime = parseInt(e.paramData)
              if (_this.completeSeekTime - _this.watched > 0 && _this.isLearnEnd == 1) {
                _this.$message({
                  type: 'warning',
                  message: '只能拖动已观看的部分哦，请认真学习'
                })
                _this.player.seek(_this.startSeekTime)
              }
            })
          }
        })
      } else {
        this.$axios.post('/yxs/api/web/user/startLearnCourse', {
          courseId: this.courseId,
          lessonId: lessonId || this.$route.query.lessonId,
          classId: this.classId,
          userToken: this.userInfo.userToken
        }).then(res => {
          let info = res.data
          this.info = res.data
          this.lessonId = res.data.lessonId
          this.courseId = res.data.courseId || ''
          this.watched = res.data.startDuration
          this.timing = res.data.videoTimingInterface * 1000
          this.isLearnEnd = res.data.status
          this.isLearnEnd == 1 ? this.results = '0.00%' : this.results = '完'
          this.drag = res.data.drag
          for(let i in info.lessons) {
            if(info.lessons[i].lessonId == this.lessonId) {
              this.playIndex = i
              if(i > 0 && !flag) { // 不是点击切换
                this.$nextTick(() => {
                  let top = _this.$refs.menuli[i].getBoundingClientRect().top
                  let height = _this.$refs.menuli[i].clientHeight
                  this.$refs.menu.scrollTo(0, top - height - 30)
                })
              }
              break
            }
          }
          _this.player = new Aliplayer({
            "id": "J_prismPlayer",
            "vid": info.videoId,
            "playauth": info.playAuth,
            "qualitySort": "asc",
            "format": "m3u8",
            "mediaType": "video",
            "width": "100%",
            "height": "500px",
            "autoplay": true,
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
          document.querySelector('.prism-ErrorMessage').style.display = 'none'
          let seeked = false
          _this.player.on('ready',function(e) {
            // _this.player.seek(info.startDuration)
            if (!seeked) {
              setTimeout(() => {
                if (_this.isLearnEnd == 1) {
                  _this.player.seek(info.startDuration)
                  _this.setTimer()
                  _this.setTimer2()
                } else {
                  _this.player.seek(0)
                }
                seeked = true
              }, 800)
              return
            }
          })
          _this.player.on('pause', _this.stopStudy)
          _this.player.on('ended', _this.endedHandle)
          _this.player.on('play', function() {
            if (!_this.timer2 && _this.isLearnEnd == 1) {
              _this.setTimer()
            }
            if (!_this.timer3 && _this.isLearnEnd == 1) {
              _this.setTimer2()
            }
            _this.playFlag = true
          })
          if (_this.drag == 1) {
            _this.player.on('startSeek', function (e) {
              // console.log('开始拖拽', e.paramData)
              _this.startSeekTime = parseInt(e.paramData)
              // 缓存最大的已播放时间
              if (e.paramData > _this.watched) {
                _this.watched = e.paramData
              }
            })
            _this.player.on('completeSeek', function (e) {
              // console.log('完成拖拽', e)
              _this.completeSeekTime = parseInt(e.paramData)
              if (_this.completeSeekTime - _this.watched > 0 && _this.isLearnEnd == 1) {
                _this.$message({
                  type: 'warning',
                  message: '只能拖动已观看的部分哦，请认真学习'
                })
                _this.player.seek(_this.startSeekTime)
              }
            })
          }
        })
      }
    },
    // 播放进度
    setTimer() {
      this.videoDuration = this.player.getDuration() || 1
      this.videoTime = parseInt(this.player.getCurrentTime())
      this.timer2 = setTimeout(this.setTimer, 1000)
    },
    // 定时提交
    setTimer2() {
      if (this.timer3) {
        this.finishStudy()
      }
      this.timer3 = setTimeout(this.setTimer2, this.timing)
    },
    finishStudy() {
      let time = this.player.getCurrentTime() || 0
      console.log('存储播放时间', time)
      this.$axios.post('/yxs/api/web/user/finishStudy', {
        courseId: this.courseId,
        lessonId: this.info.lessonId,
        classId: this.classId || '',
        studyLogId: this.info.studyLogId,
        userToken: this.userInfo.userToken,
        playDuration: Math.floor(time)
      }).then(res => {
        
      })
    },
    getList() {
      if(this.classId) {
        this.$axios('/yxs/api/web/course/classroomCourse', {
          params: {
            classroomId: this.classId,
            userToken: this.userInfo.userToken
          }
        }).then(res => {
          this.otherList = res.data
        })
      } else {
        let params = {
          size: 10,
          current: 1,
          type: 0,
          userToken: this.userInfo.userToken,
          teacherStatus: this.rankStatus
        }
        this.$axios('/yxs/api/web/user/getCourseMemberPageByUserId', {
          params
        }).then(res => {
          this.otherList = res.data.records
        })
      }
    },
    getRecommendList(type) {
      this.$axios('/yxs/api/web/course/getRecommendList', {
        params: {
          type
        }
      }).then(res => {
        this.recommendList = res.data
      })
    },
    buyLesson() {
      if(!this.userInfo) {
        this.$router.push({
          name: 'login'
        })
      } else {
        let url = this.$router.resolve({
          name: 'payfor',
          query: {
            itemId: this.courseId,
            price: this.info.price,
            itemType: 1
          }
        })
        window.open(url.href, '_blank')
      }
    },
    stopStudy() {
      clearTimeout(this.timer2)
      this.timer2 = null
      clearTimeout(this.timer3)
      this.timer3 = null
      this.player.pause()
      this.playFlag = false
      this.finishStudy()
    },
    endedHandle() {
      // let flag = this.player.fullscreenService.getIsFullScreen()
      // if(flag) {
      //   this.player.fullscreenService.cancelFullScreen()
      // }
      this.stopStudy()
      if(this.playIndex == this.info.lessons.length - 1) {
        this.lastShow = true
        return
      }
      // this.playIndex ++
      let index = parseInt(this.playIndex) + 1
      let item = this.info.lessons[index]
      if(item && item.free == 2) {
        this.maskShow = true
        return
      }
      this.nextShow = true
      const TIME_COUNT = 6
      if(!this.timer) {
        this.time = TIME_COUNT
        this.timer = setInterval(() => {
          if(this.time > 0) {
            this.time --
          } else {
            // _this.player.dispose()
            this.nextShow = false
            this.playIndex ++
            this.getInfo(item.lessonId, item.free, this.playIndex)
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    agian() {
      this.nextShow = false
      this.lastShow = false
      clearInterval(this.timer)
      this.timer = null
      let item = this.info.lessons[this.playIndex]
      this.getInfo(item.lessonId, item.free, this.playIndex)
    },
    next() {
      this.nextShow = false
      clearInterval(this.timer)
      this.timer = null
      this.playIndex ++
      let item = this.info.lessons[this.playIndex]
      this.getInfo(item.lessonId, item.free, this.playIndex)
    },
    openNewPage(url) {
      window.open(url.href, '_blank')
    },
    changeVideo(courseId) {
      let url = this.$router.resolve({
        name: 'play',
        query: {
          courseId: courseId,
          classId: this.classId
        }
      })
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 30px auto;
    .crumb {
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
    .play-container {
      margin-top: 30px;
      .play-header {
        display: flex;
        align-items: flex-end;
        .title {
          font-size: 24px;
          color: #333;
        }
        span {
          margin-left: 16px;
          font-size: 14px;
          color: #333;
        }
      }
      .play-content {
        position: relative;
        display: flex;
        margin-top: 30px;
        .prism-player-box {
          width: 850px;
          height: 500px;
          background: #131313;
          overflow: hidden;
          #J_prismPlayer {
            width: 932px;
            cursor: pointer;
          }
        }
        .mask {
          position: absolute;
          width: 932px;
          height: 500px;
          text-align: center;
          background: rgba(0, 0, 0, .6);
          z-index: 999;
          p {
            margin-top: 190px;
            font-size: 24px;
            color: #fff;
          }
          .buy-btn {
            margin: 40px auto;
            width: 120px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            background: #3F8A38;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            border-radius: 4px;
          }
        }
        .next-mask {
          position: absolute;
          width: 854px;
          height: 500px;
          text-align: center;
          background: rgba(0, 0, 0, .6);
          display: flex;
          align-items: center;
          z-index: 999;
          .content {
            width: 100%;
            height: 200px;
            margin: 0 auto;
            .title {
              margin-top: 40px;
              font-size: 24px;
              color: #fff;
              span {
                display: inline-block;
                margin: 0 5px;
                color: #3F8A38;
              }
            }
            .button {
              margin-top: 60px;
              span {
                display: inline-block;
                width: 120px;
                height: 40px;
                line-height: 40px;
                font-size: 18px;
                text-align: center;
                color: #fff;
                border: 1px solid #3F8A38;
                border-radius: 4px;
                cursor: pointer;
                &:last-child {
                  margin-left: 20px;
                }
              }
              .next {
                background: #3F8A38;
                color: #fff;
              }
            }
          }
        }
        .menu {
          width: 350px;
          height: 102px;
          background: #131313;
          height: 500px;
          overflow-y: scroll;
          li {
            display: flex;
            margin: 0 30px;
            padding: 20px 0;
            color: #C1C1C1;
            border-bottom: 1px solid #2A2A2A;
            &.active {
              .title, i {
                color: #3F8A38;
              }
              i {
                display: block;
              }
            }
            &:hover {
              .title, i {
                color: #3F8A38;
              }
              i {
                display: block;
              }
            }
            i {
              display: none;
              margin-top: 5px;
            }
            .chapter {
              font-size: 16px;
            }
            .info {
              width: 100%;
              margin-left: 14px;
              .title {
                line-height: 24px;
                cursor: pointer;
              }
              .foot {
                display: flex;
                justify-content: space-between;
                margin-top: 13px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .container-title {
      font-size: 24px;
      color: #333;
    }
    .other-container {
      margin-top: 40px;
      .list-item {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 224px;
        height: 180px;
        margin-left: 20px;
        margin-top: 20px;
        &:nth-child(5n+1) {
          margin-left: 0;
        }
        .img-box {
          width: 224px;
          height: 126px;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          &:hover img {
            transform: scale(1.1, 1.1);
          }
        }
        img {
          width: 224px;
          height: 126px;
          border-radius: 6px;
          transition: all .3s ease 0s;
        }
        .content {
          padding: 0 10px;
        }
        .title {
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
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
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          width: 100%;
          margin-top: 10px;
          font-size: 12px;
          color: #999;
          span {
            display: inline-block;
            &:last-child {
              margin-right: 20px;
            }
          }
        }
      }
    }
    .recommend-container {
      margin-top: 40px;
      li {
        margin-left: 20px;
        margin-top: 20px;
        display: inline-block;
        width: 224px;
        &:nth-child(5n+1) {
          margin: 0;
        }
        .img-box {
          width: 224px;
          height: 126px;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          &:hover img {
            transform: scale(1.1, 1.1);
          }
        }
        img {
          width: 224px;
          height: 126px;
          border-radius: 6px;
          transition: all .3s ease 0s;
        }
        .content {
          padding: 0 10px;
          .title {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-top: 12px;
            font-size: 14px;
            color: #333;
          }
          .info {
            position: relative;
            margin-top: 12px;
            font-size: 0;
            color: #999;
            span {
              display: inline-block;
              font-size: 12px;
            }
            .free {
              color: #3F8A38;
            }
            .price {
              color: #FF4400;
            }
            .lesson {
              margin-left: 9px;
            }
            .number {
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
<style lang="css">
  .prism-time-display .duration {
    color: #f5f5f5;
    font-weight: 500;
  }
  .prism-big-play-btn.pause {
    display: none !important;
  }
</style>