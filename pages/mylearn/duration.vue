<template>
  <div> 
    <left-tab :tab-index="tabIndex" />
    <div class="right-container">
      <div class="top">
        <span>今日学习时长{{ todayTime }}分钟</span>
        <span>累计学习时长{{ totalTime }}分钟</span>
      </div>
      <div
        id="lineCharts"
        ref="echarts" />
      <div class="center">
        <ul>
          <li
            v-for="(item,index) in contentList"
            :key="index"
            class="list-item">
            <img :src="item.middlePicture">
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <p
                v-if="item.dayCount != 0"
                class="desc">
                {{ item.dayCount }}天后到期
              </p>
              <p
                v-else
                class="desc">
                已到期
              </p>
              <div class="foot">
                <span>已学{{ item.result }}</span>
                <span>共{{ item.lessonNum }}节</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import LeftTab from '~/components/mine/leftTab.vue'
export default {
  components: {
    LeftTab
  },
  data() {
    return {
      todayTime: 0,
      totalTime: 0,
      tabIndex: 3,
      contentList: []
    }
  },
  mounted() {
    this.initCharts()
    this.getList()
  },
  methods: {
    initCharts(xData, yData) {
      let myChart = this.$echarts.init(this.$refs.echarts)
       myChart.setOption({
        title: {
          text: '近7天学习记录',
          bottom: 0,
          textStyle: {
            color: '#666',
            fontSize: 16,
            fontWeight: 400
          }
        },
        grid: {
          left: 0,
          right: 0
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: xData,
          axisLine: {
            lineStyle: {
              color: '#DEDEDE'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        yAxis: {
          show: true,
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: { show: true },
        },
        series: [{
          data: yData,
          type: 'line',
          symbolSize: 8,
          lineStyle: {
            width: 4
          },
          smooth: true,
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#3F8A38' // 0% 处的颜色
                }, {
                  offset: 1, color: '#91BD35' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              label: {
                show: true
              }
            }
          }
        }]
      })
    },
    getList() {
      this.$axios('/yxs/api/web/user/selfLearnLog').then(res => {
        this.contentList = res.data.detailList
        let xData = []
        let yData = []
        this.todayTime = res.data.studyTimeList[0].learnTime
        this.todayTime = res.data.weekLearnTime
        res.data.studyTimeList.map(item => {
          xData.unshift(item.date)
          yData.unshift(item.learnTime)
        })
        xData[6] = '今天'
        this.initCharts(xData, yData)
      })
    }
  }
  
}
</script>
<style lang="scss" scoped>
  .right-container {
    border: 1px solid #E4ECF3;
    .top {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding: 0 15px;
    }
  }
  #lineCharts {
    width: 850px;
    height: 260px;
    padding: 0 15px;
  }
  .center {
    padding-bottom: 30px;
    .list-item {
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 243px;
      height: 223px;
      margin-left: 30px;
      margin-top: 30px;
      img {
        width: 243px;
        height: 146px;
        border-radius: 6px;
      }
      .content {
        padding: 0 10px;
      }
      .title {
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
        }
      }
    }
  }
</style>
