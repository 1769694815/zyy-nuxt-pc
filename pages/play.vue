<template>
  <div style="width:100%">
    <v-header />
    <nav-bar />
    <div class="container">
      <div class="crumb">
        首页>课程中心>{{ info.courseTitle }}
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
            id="player-con"
            class="prism-player"
            @click.stop="changePlay"
            @dblclick="changeScreen" />
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
          <ul class="menu">
            <li
              v-for="(item, index) in info.lessons"
              ref="menu"
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
                  @click="getInfo(item.lessonId, item.free, index)">{{ item.lessonTitle }}</span>
                <div class="foot">
                  <span>{{ Math.round(item.length / 60) }}分钟</span>
                  <span>已学{{ item.result }}</span>
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
                <span>已学{{ item.result }}</span>
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
import { formatSeconds } from '~/assets/js/util'
export default {
  // middleware: 'userAuth',
  components: {
    NavBar,
    'v-header': Header
  },
  data() {
    return {
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
      timer: null
    }
  },
  head() {
    return {
      title: this.info.courseTitle
    }
  },
  computed: {
    timestr() {
      return function(time) {
        return formatSeconds(time)
      }
    }
  },
  mounted() {
    window.scrollTo(0, 200)
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    if(!this.userInfo) {
      this.$router.push({
        name: 'login'
      })
    }
    this.getInfo()
    this.getList()
    this.getRecommendList('zyjk')
    // window.onbeforeunload = function() {
    //   this.stopStudy()
    // }
  },
  methods: {
    getInfo(lessonId, free, index) {
      let _this = this
      this.playIndex = index || 0
      this.lessonId = lessonId
      if(_this.player) {
        _this.player.pause()
      }
      if(free == 2) {
        this.maskShow = true
        return
      }
      this.maskShow = false
      this.nextShow = false
      this.lastShow = false
      if(this.classId) {
        this.$axios.post('/yxs/api/web/user/startLearnClass', {
          lessonId: lessonId || '',
          classId: this.classId,
          courseId: this.courseId,
          userToken: this.userInfo.userToken
        }).then(res => {
          let info = res.data
          this.info = res.data
          this.lessonId = res.data.lessonId
          for(let i in info.lessons) {
            if(info.lessons[i].lessonId == this.lessonId) {
              this.playIndex = i
              console.log('playIndex', i)
              break
            }
          }
          console.log('lessonId', lessonId)
          if(_this.player) {
            _this.player.dispose()
          }
          _this.player = new Aliplayer({
            "id": "player-con",
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
            "seeking": info.startDuration,
            "useH5Prism": true,
            "encryptType": 1,
            "skinLayout": [
              {
                "name": "bigPlayButton",
                "align": "blabs",
                "x": 30,
                "y": 80
              },
              {
                "name": "H5Loading",
                "align": "cc"
              },
              {
                "name": "errorDisplay",
                "align": "tlabs",
                "x": 0,
                "y": 0
              },
              {
                "name": "infoDisplay"
              },
              {
                "name": "tooltip",
                "align": "blabs",
                "x": 0,
                "y": 56
              },
              {
                "name": "thumbnail"
              },
              {
                "name": "controlBar",
                "align": "blabs",
                "x": 0,
                "y": 0,
                "children": [
                  {
                    "name": "progress",
                    "align": "blabs",
                    "x": 0,
                    "y": 44
                  },
                  {
                    "name": "playButton",
                    "align": "tl",
                    "x": 15,
                    "y": 12
                  },
                  {
                    "name": "timeDisplay",
                    "align": "tl",
                    "x": 10,
                    "y": 7
                  },
                  {
                    "name": "fullScreenButton",
                    "align": "tr",
                    "x": 10,
                    "y": 12
                  },
                  {
                    "name": "setting",
                    "align": "tr",
                    "x": 15,
                    "y": 12
                  },
                  {
                    "name": "volume",
                    "align": "tr",
                    "x": 5,
                    "y": 10
                  }
                ]
              }
            ]
          }, function (player) {
            player._switchLevel = 0;
            player.seek(info.startDuration)
            console.log("播放器创建了。", player);
            player.on('pause', _this.stopStudy)
            player.on('ended', _this.endedHandle)
            player.on('play', function() {
              _this.playFlag = true
            })
          });
        })
      } else {
        this.$axios.post('/yxs/api/web/user/startLearnCourse', {
          courseId: this.courseId,
          lessonId: lessonId || '',
          classId: this.classId,
          userToken: this.userInfo.userToken
        }).then(res => {
          let info = res.data
          this.info = res.data
          this.lessonId = res.data.lessonId
          for(let i in info.lessons) {
            if(info.lessons[i].lessonId == this.lessonId) {
              console.log('playIndex', i)
              this.playIndex = i
              break
            }
          }
          if(_this.player) {
            // _this.player.replayByVidAndPlayAuth(info.videoId, info.playAuth, info.startDuration);
            _this.player.dispose()
          }
          _this.player = new Aliplayer({
            "id": "player-con",
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
            "seeking": info.startDuration,
            "useH5Prism": true,
            "encryptType": 1,
            "skinLayout": [
              {
                "name": "bigPlayButton",
                "align": "blabs",
                "x": 30,
                "y": 80
              },
              {
                "name": "H5Loading",
                "align": "cc"
              },
              {
                "name": "errorDisplay",
                "align": "tlabs",
                "x": 0,
                "y": 0
              },
              {
                "name": "infoDisplay"
              },
              {
                "name": "tooltip",
                "align": "blabs",
                "x": 0,
                "y": 56
              },
              {
                "name": "thumbnail"
              },
              {
                "name": "controlBar",
                "align": "blabs",
                "x": 0,
                "y": 0,
                "children": [
                  {
                    "name": "progress",
                    "align": "blabs",
                    "x": 0,
                    "y": 44
                  },
                  {
                    "name": "playButton",
                    "align": "tl",
                    "x": 15,
                    "y": 12
                  },
                  {
                    "name": "timeDisplay",
                    "align": "tl",
                    "x": 10,
                    "y": 7
                  },
                  {
                    "name": "fullScreenButton",
                    "align": "tr",
                    "x": 10,
                    "y": 12
                  },
                  {
                    "name": "setting",
                    "align": "tr",
                    "x": 15,
                    "y": 12
                  },
                  {
                    "name": "volume",
                    "align": "tr",
                    "x": 5,
                    "y": 10
                  }
                ]
              }
            ]
          }, function (player) {
            player._switchLevel = 0;
            player.seek(info.startDuration)
            console.log("播放器创建了。", player);
            player.on('pause', _this.stopStudy)
            player.on('ended', _this.endedHandle)
            player.on('play', function() {
              _this.playFlag = true
            })
          });
        })
      }
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
          userToken: this.userInfo.userToken
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
      this.player.pause()
      this.playFlag = false
      let time = this.player.getCurrentTime() || 0
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
    endedHandle() {
      let _this = this
      this.stopStudy()
      _this.player.dispose()
      if(this.playIndex == this.info.lessons.length - 1) {
        this.lastShow = true
        return
      }
      this.playIndex ++
      let item = this.info.lessons[this.playIndex]
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
            this.nextShow = false
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
    changePlay() {
      this.playFlag ? this.player.pause() : this.player.play()
      this.playFlag = !this.playFlag
    },
    changeScreen() {
      let flag = this.player.fullscreenService.getIsFullScreen()
      if(!flag) {
        this.player.fullscreenService.requestFullScreen()
      } else {
        this.player.fullscreenService.cancelFullScreen()
      }
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
      // this.courseId = courseId
      // this.getInfo()
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
        #player-con {
          width: 952px;
          cursor: pointer;
        }
        .mask {
          position: absolute;
          width: 952px;
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
          width: 952px;
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
          width: 330px;
          height: 102px;
          background: #131313;
          height: 500px;
          overflow: auto;
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
</style>