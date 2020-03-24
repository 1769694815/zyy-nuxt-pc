<!--
 * @Author: xwen
 * @Date: 2020-03-20 10:10:23
 * @LastEditTime: 2020-03-24 16:19:57
 * @LastEditors: xwen
 * @Description: 直播详情页
 -->

<template>
  <div>
    <v-header />
    <nav-bar />
    <div class="container">
      <div class="title">{{ info.title }}</div>
      <div class="content">
        <div class="content-left">
          <!-- 播放器 -->
          <div 
            id="J_prismPlayer" 
            class="prism-player"/>
          <div 
            v-if="status == 1 || status == 3" 
            class="wait">
            <span>{{ message }}</span>
          </div>
          <!-- 副标题 -->
          <div class="subtitle">{{ info.title }} {{ info.updateLiveTime }}</div>
        </div>
        <div class="content-right">
          <!-- 通告 -->
          <div class="notice">
            <img 
              src="~/assets/images/notice.png"
              alt="">
            <div class="notice-con">
              <marquee scrollamount="3">
                <span 
                  v-for="i in 20" 
                  :key="i">{{ info.announcement }}</span>
              </marquee>
            </div>
          </div>
          <!-- 聊天室 -->
          <div class="chat">
            <div class="chat-con">
              <div ref="box">
                <div 
                  v-for="(item, index) in commentList"
                  :key="index">
                  <div 
                    v-if="item.administrator == 1 && item.top != 1" 
                    class="admin">
                    <div class="username">管理员</div>
                    <div class="con">{{ item.content }}</div>
                  </div>
                  <div 
                    v-if="item.administrator !=1 && item.top != 1" 
                    class="reply">
                    <div class="username">{{ item.userName || '用户' }}<span>{{ item.createTime }}</span></div>
                    <div class="con">{{ item.content }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-bottom">
              <input
                v-model="inputValue"
                type="text"
                placeholder="我要提问">
              <div 
                class="submit" 
                @click="getRole">发送</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="living">
      <div class="living-content">
        <div class="introduce">
          <div class="tip">
            <span/>主讲老师
          </div>
          <div class="teacher">
            <div class="teacher-name">{{ info.teacherName || '益老师' }}</div>
            <div class="teacher-info">{{ info.introduction }}</div>
          </div>
          <div class="tip">
            <span/>直播介绍
          </div>
          <div 
            class="introduce-info" 
            v-html="info.introduce"/>
        </div>
        <div 
          v-if="pastList.length > 0" 
          class="playback">
          <div class="tip">
            <span/>往期直播
          </div>
          <ul class="list">
            <li 
              v-for="(item, index) in pastList" 
              :key="index" 
              class="list-item">
              <p 
                class="title" 
                @click="refresh(item)">{{ item.title }}</p>
              <div class="info">
                <span class="time">{{ item.playbackTime && item.playbackTime.substring(0, 11) || '2020-03-20' }}</span>
                <span class="watchnum">{{ item.virtualNum + item.realNum }}人已看过</span>
              </div>
            </li>
          </ul>
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
  name: 'Living',
  components: {
    NavBar,
    'v-header': Header
  },
  data() {
    return {
      loading: null,
      userInfo: '',
      liveId: this.$route.query.liveId || '',
      administrator: this.$route.query.administrator || '',
      info: {},
      title: '中医药在线直播_',
      vid: '',
      playAuth: '',
      m3u8Url: '',
      status: 0, // 直播状态 1： 未开播  2：直播中  3： 直播结束   4: 回放
      palyer: null,
      pastList: [],
      commentList: [],
      inputValue: '',
      message: ''
    }
  },
  head() {
    return {
      title: this.title,
      link: [
        { rel: 'stylesheet', href: '/aliplayer/aliplayer-min.css' }
      ],
      script: [
        { src: '/aliplayer/aliplayer-min.js', type: 'text/javascript' }
      ]
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo') || ''
    this.getInfo()
    if (!this.userInfo) {
      this.$router.push({
        name: 'login'
      })
    }
    this.getCommentList()
  },
  methods: {
    getInfo() {
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios.defaults.headers.common['userToken'] = this.userInfo.userToken
      this.$axios('/yxs/api/live/getPlayFlowUrl', { params: { liveId: this.liveId }}).then(res => {
        this.loading.close()
        if (res.code == 0) {
          console.log('livingData:', res.data)
          // 判断是否有权限
          if (res.data.selectPermissions == 1) {
            this.$confirm('您暂无直播观看权限，请联系小益老师<br>微信同号18770097400', '温馨提示', {
              center: true,
              showClose: false,
              showCancelButton: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              dangerouslyUseHTMLString: true
            }).then(() => {
              this.$router.push({
                name: 'index'
              })
            })
            return
          }
          this.info = res.data
          this.title = res.data.title + '_'
          this.vid = res.data.uid
          this.playAuth = res.data.playAuth
          this.status = res.data.status
          if (this.status == 1) {
            // 直播未开始
            this.message = '待直播'
          } else if (this.status == 2) {
            // 直播中
            this.message = '直播中'
            this.updateUserWatch()
            this.m3u8Url = this.info.m3u8Url
          } else if (this.status == 3) {
            // 直播已结束
            this.message = '已结束'
          } else {
            // 回放
            this.message = '回放'
          }
          this.playerInit()
          this.getPast()
        } else {
          this.$message({
            type: 'error',
            message: res.msg || '网络异常'
          })
        }
      })
    },
    // 阿里云播放器初始化
    playerInit() {
      this.player = new Aliplayer({
        'id': 'J_prismPlayer',
        'source': this.m3u8Url,
        'vid': this.vid,
        'playauth': this.playAuth,
        'cover': this.info.mediaCover,
        'qualitySort': 'asc',
        'format': this.status == 2 ? 'm3u8' : 'mp4',
        'mediaType': 'video',
        'width': '100%',
        'height': '205px',
        'autoplay': true,
        'isLive': this.status == 2,
        'rePlay': false,
        'playsinline': true,
        'preload': true,
        'controlBarVisibility': 'click',
        'showBarTime': '5000',
        'useH5Prism': true,
        'x5_type': 'h5',
        'x5_orientation': 'landscape',
        'encryptType': 0,
        'skinLayout': [
          {
            'name': 'bigPlayButton',
            'align': 'blabs',
            'x': 15,
            'y': 30
          },
          {
            'name': 'H5Loading',
            'align': 'cc'
          },
          {
            'name': 'controlBar',
            'align': 'blabs',
            'x': 0,
            'y': 0,
            'children': [
              {
                'name': 'progress',
                'align': 'tlabs',
                'x': 0,
                'y': 10
              },
              {
                'name': 'playButton',
                'align': 'tl',
                'x': 15,
                'y': 18
              },
              {
                'name': 'nextButton',
                'align': 'tl',
                'x': 10,
                'y': 12
              },
              {
                'name': 'timeDisplay',
                'align': 'tl',
                'x': 10,
                'y': 10
              },
              {
                'name': 'fullScreenButton',
                'align': 'tr',
                'x': 10,
                'y': 18
              },
              {
                'name': 'streamButton',
                'align': 'tr',
                'x': 10,
                'y': 12
              },
              {
                'name': 'volume',
                'align': 'tr',
                'x': 10,
                'y': 16
              }
            ]
          },
          {
            'name': 'fullControlBar',
            'align': 'tlabs',
            'x': 0,
            'y': 0,
            'children': [
              {
                'name': 'fullTitle',
                'align': 'tl',
                'x': 25,
                'y': 6
              },
              {
                'name': 'fullNormalScreenButton',
                'align': 'tr',
                'x': 24,
                'y': 13
              },
              {
                'name': 'fullTimeDisplay',
                'align': 'tr',
                'x': 10,
                'y': 12
              },
              {
                'name': 'fullZoom',
                'align': 'cc'
              }
            ]
          }
        ]
      }, function(player) {
        console.info('the player is created!')
      })
      this.player.on('play', _ => {
        console.info('play')
      })
      this.player.on('pause', _ => {
        console.info('pause')
      })
      this.player.on('error', (e) => {
        const err = JSON.parse(JSON.stringify(e))
        console.error(err)
        this.$message({
          message: err.paramData.display_msg || '网络异常',
          type: 'error'
        })
      })
    },
    // 获取评论列表
    getCommentList() {
      this.$axios('/yxs/api/live/getLiveComment', { params: { liveId: this.liveId }}).then(res => {
        if (res.code == 0) {
          console.log('commentListData:', res.data)
          this.commentList = res.data
          // this.$nextTick(_ => {
          //   this.$refs.box
          // })
        } else {
          this.$message({
            type: 'error',
            message: res.msg || '网络异常'
          })
        }
      })
    },
    // 获取往期直播列表
    getPast() {
      this.$axios('/yxs/api/live/livePlaybackPage', { params: { size: 10, current: 1, liveId: this.liveId }}).then(res => {
        if (res.code == 0) {
          console.info('pastList Data:', res.data)
          this.pastList = [...this.pastList, ...res.data.records]
          let total = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: res.msg || '网络异常'
          })
        }
      })
    },
    // 获取时候被禁言
    getRole() {
      this.$axios('/yxs/api/live/selectUserBan', { params: { liveId: this.liveId }}).then(res => {
        if (res.code != 0) {
          this.$message({
            type: 'error',
            message: res.msg || '网络异常'
          })
          return
        }
        if (res.data == false) {
          this.sendComment()
        } else {
          this.$message({
            type: 'error',
            message: '您已被禁言'
          })
        }
      })
    },
    // 提交评论
    sendComment() {
      this.$axios('/yxs/api/live/addLiveComment', { params: { liveId: this.liveId, body: this.inputValue }}).then(res => {
        if (res.code != 0) {
          this.$message({
            type: 'error',
            message: res.msg || '网络异常'
          })
          return
        }
        if (this.administrator == 0) {
          this.$message({
            type: 'success',
            message: '评论成功！'
          })
        } else {
          this.$message({
            type: 'success',
            message: '评论成功！等待后台审核~'
          })
        }
        this.inputValue = ''
        this.getCommentList()
      })
    },
    // 通知后台用户再观看
    updateUserWatch () {
      this.$axios('/yxs/api/live/updateUserWatch', { params: { liveId: this.liveId } }).then(res => {
        console.log('updateUserWatch', res.data)
      })
    },
    // 回放
    refresh(item) {
      this.liveId = item.liveId
      this.info.title = item.title
      this.title = item.title + '_'
      this.player.replayByVidAndPlayAuth(item.mediaId, item.playAuth)
      this.getCommentList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 40px;
    .title {
      font-size: 24px;
      color: #333;
      height: 60px;
      line-height: 60px;
    }
    .content {
      width: 100%;
      height: 530px;
      display: flex;
      &-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        // 播放器
        .prism-player {
          flex: 1;
        }
        .wait {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 100;
          width: 100%;
          height: 490px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba($color: #000, $alpha: .6);
          span {
            width: 115px;
            height: 42px;
            line-height: 42px;
            border-radius: 21px;
            background: rgba($color: #fff, $alpha: .8);
            text-align: center;
            font-size: 16px;
            color: #666;
          }
        }
        .subtitle {
          width: 100%;
          height: 40px;
          background: #333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          box-sizing: border-box;
          padding: 0 20px;
          font-size: 20px;
          line-height: 40px;
          color: #fff;
        }
      }
      &-right {
        width: 330px;
        height: 100%;
        background: #333;
        .notice {
          display: flex;
          align-items: center;
          width: 292px;
          height: 28px;
          line-height: 28px;
          margin: 14px auto;
          background: #fff;
          border-radius: 14px;
          img {
            margin: 0 10px;
            width: 20px;
            height: 20px;
          }
          &-con {
            flex: 1;
            height: 100%;
            position: relative;
            overflow: hidden;
            marquee {
              position: absolute;
              white-space: nowrap;
              font-size: 0;
              span {
                margin-right: 40px;
                font-size: 14px;
                color: #333;
              }
            }
          }
        }
        .chat {
          width: 100%;
          height: 474px;
          display: flex;
          flex-direction: column;
          &-con {
            width: 322px;
            flex: 1;
            overflow: auto;
            position: relative;
            box-sizing: border-box;
            padding-left: 16px;
            &::-webkit-scrollbar {
              width: 2px;
            }
            &::-webkit-scrollbar-track {
              background-color: #fff;
            }
            &::-webkit-scrollbar-thumb {
              background-color: #3f8a38;
            }
            .admin {
              display: flex;
              margin-bottom: 20px;
              .username {
                width: 56px;
                height: 28px;
                line-height: 28px;
                border-radius: 14px;
                background: #3f8a38;
                text-align: center;
                font-size: 14px;
                color: #fff;
              }
              .con {
                margin-left: 12px;
                width:  224px;
                font-size: 14px;
                color: #ccc;
                line-height: 26px;
                word-break: break-all;
              }
            }
            .reply {
              margin-bottom: 20px;
              .username {
                font-size: 14px;
                color: #999;
                span {
                  font-size: 12px;
                  margin-left: 20px;
                }
              }
              .con {
                margin-top: 10px;
                font-size: 14px;
                color: #fff;
                line-height: 26px;
                word-break: break-all;
              }
            }
          }
          &-bottom {
            width: 320px;
            height: 36px;
            margin: 2px auto;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 3px;
            border-radius: 4px;
            border: 1px solid #fff;
            background: #fff;
            input {
              flex: 1;
              border: 0;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #333;
              box-sizing: border-box;
              padding: 0 10px;
            }
            .submit {
              width: 56px;
              height: 30px;
              line-height: 30px;
              border-radius: 4px;
              background: #3f8a38;
              text-align: center;
              font-size: 14px;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .living {
    width: 100%;
    height: auto;
    background: #f5f5f5;
    padding: 20px 0 40px;
    &-content {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .tip {
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #333;
        span {
          width: 4px;
          height: 100%;
          background: #3f8a38;
          margin-right: 15px;
        }
      }
      .introduce {
        width: 850px;
        height: auto;
        box-sizing: border-box;
        background: #fff;
        padding: 22px 20px;
        .teacher {
          margin-top: 20px;
          &-name {
            font-size: 18px;
            color: #333;
            font-weight: bold;
          }
          &-info {
            margin: 16px 0 40px;
            width: 100%;
            height: auto;
            font-size: 16px;
            line-height: 30px;
            color: #666;
          }
        }
        &-info {
          margin-top: 16px;
          width: 100%;
          height: auto;
          font-size: 16px;
          line-height: 30px;
          color: #666;
        }
      }
      .playback {
        width: 330px;
        height: auto;
        background: #fff;
        box-sizing: border-box;
        padding: 22px 20px;
        .list {
          width: 100%;
          height: auto;
          margin: 20px 0;
          &-item {
            width: 100%;
            height: 50px;
            margin-bottom: 20px;
            .title {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 16px;
              color: #333;
              cursor: pointer;
              &:hover {
                color: #3f8a38;
              }
            }
            .info {
              margin-top: 18px;
              width: 100%;
              display: flex;
              align-items: center;
              font-size: 12px;
              color: #999;
              .time {
                position: relative;
                display: inline-block;
                margin-right: 20px;
                &:after {
                  content: '';
                  width: 1px;
                  height: 12px;
                  background: #999;
                  position: absolute;
                  top: 0;
                  right: -10px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
