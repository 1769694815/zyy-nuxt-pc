<template>
  <div class="aside">
    <ul>
      <li class="color1">
        <div class="item">
          <i class="iconfont iconzixun" />
          <div class="text">课程咨询</div>
        </div>
        <div class="content">
          <a
            href="tencent://message/?uin=563100824"
            target="_blank"
            class="tab">
            <i class="iconfont iconqq" />
            <span>自考处袁主任</span>
          </a>
        </div>
      </li>
      <li class="color2">
        <div class="item">
          <i class="iconfont iconlianxiren" />
          <div class="text">课程咨询</div>
        </div>
        <div class="content">
          <a
            href="tencent://message/?uin=1515997628"
            target="_blank"
            class="tab">
            <i class="iconfont iconqq" />
            <span>自考处陈老师</span>
          </a>
        </div>
      </li>
      <li class="item color3">
        <div>
          <i class="iconfont iconwoshou" />
          <div class="text">平台服务</div>
        </div>
        <div class="content c2">
          <div
            class="tab"
            @click="toService">
            <i class="iconfont iconbaozhang" />
            <span>服务与保障</span>
          </div>
          <!-- <div
            class="tab"
            @click="openCustomer">
            <i class="iconfont iconkefu" />
            <span>在线客服</span>
          </div> -->
          <a
            href="tencent://message/?uin=2111984366"
            target="_blank"
            class="tab">
            <i class="iconfont iconqq" />
            <span>在线客服</span>
          </a>
          <div class="tab">
            <i class="iconfont icondianhua" />
            <span>0791-88197248</span>
          </div>
        </div>
      </li>
      <li class="item">
        <div>
          <i class="iconfont iconweixin" />
          <div class="text">关注微信</div>
        </div>
        <div class="content c3">
          <img src="~/assets/images/weixin.png">
        </div>
      </li>
      <li class="item">
        <div>
          <i class="iconfont iconshouji" />
          <div class="text">手机APP</div>
        </div>
        <div class="content c3">
          <img src="~/assets/images/download-qr.png">
        </div>
      </li>
      <li
        v-show="scrollShow"
        class="item"
        @click="toTop">
        <div>
          <i class="iconfont iconhuidaodingbu" />
          <div class="text">返回顶部</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollShow: false
    }
  },
  mounted() {
    let vm = this
    window.onscroll = function() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop > 120) {
        vm.scrollShow = true
      } else {
        vm.scrollShow = false
      }
    }
  },
  methods: {
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
    openCustomer() {
      window.open('http://p.qiao.baidu.com/cps/chat?siteId=12747992&userId=26713079&cp=http%3A%2F%2Fwww.jzjxedu.com%2F&cr=&cw=')
    },
    toService() {
      let url = this.$router.resolve({
        name: 'service'
      })
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .aside {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 50px;
    height: 100%;
    z-index: 9999;
    background: #fff;
    box-shadow: -1px 0 5px #ccc;
    ul {
      display: flex;
      flex-direction: column;
      margin-top: 170px;
      li {
        position: relative;
        width: 100%;
        height: 108px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        cursor: pointer;
        &:last-child {
          border: none;
        }
        &:hover {
          background: #4e9713;
          color: #fff;
          i {
            color: #fff;
          }
          .text {
            display: block;
          }
          .content {
            display: block;
          }
        }
        i {
          font-size: 28px;
          color: #4e9713;
        }
        .text {
          display: none;
          padding: 6px;
          font-size: 14px;
          line-height: 20px;
        }
        .content {
          position: absolute;
          display: none;
          width: 190px;
          right: 50px;
          top: 0;
          text-align: left;
          background: #4e9713;
          a {
            display: block;
            text-decoration: none;
          }
          .tab {
            margin: 20px 24px;
            width: 148px;
            height: 32px;
            line-height: 32px;
            background: #fff;
            color: #666;
            font-size: 14px;
            border-radius: 4px;
            &:hover {
              color: #4e9713;
              font-weight: 700;
              i {
                color: #4e9713;
              }
            }
            i {
              margin-left: 10px;
              font-size: 16px;
              color: #666;
            }
          }
        }
        .c2 {
          height: 178px;
        }
        .c3 {
          width: 120px;
          padding: 10px;
          img {
            width: 120px;
          }
        }
        &.color1 {
          i {
            color: #72cbcf;
          }
          .content {
            height: 109px;
            background: #72cbcf;
            .tab {
              margin: 40px 24px;
              &:hover {
                color: #72cbcf;
                font-weight: 700;
                i {
                  color: #72cbcf;
                }
              }
              i {
                margin-left: 10px;
                font-size: 16px;
                color: #666;
              }
            }
          }
          &:hover {
            background: #72cbcf;
            color: #fff;
            i {
              color: #fff;
            }
            .text {
              display: block;
            }
            .content {
              display: block;
            }
          }
        }
        &.color2 {
          i {
            color: #82bffd;
          }
          .content {
            height: 109px;
            background: #82bffd;
            .tab {
              margin: 40px 24px;
              &:hover {
                color: #82bffd;
                font-weight: 700;
                i {
                  color: #82bffd;
                }
              }
              i {
                margin-left: 10px;
                font-size: 16px;
                color: #666;
              }
            }
          }
          &:hover {
            background: #82bffd;
            color: #fff;
            i {
              color: #fff;
            }
            .text {
              display: block;
            }
            .content {
              display: block;
            }
          }
        }
        &.color3 {
          i {
            color: #aeacff;
          }
          .content {
            background: #aeacff;
            .tab {
              &:hover {
                color: #aeacff;
                font-weight: 700;
                i {
                  color: #aeacff;
                }
              }
              i {
                margin-left: 10px;
                font-size: 16px;
                color: #666;
              }
            }
          }
          &:hover {
            background: #aeacff;
            color: #fff;
            i {
              color: #fff;
            }
            .text {
              display: block;
            }
            .content {
              display: block;
            }
          }
        }
      }
    }
  }
</style>
