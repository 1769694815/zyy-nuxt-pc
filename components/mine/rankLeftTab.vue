<template>
  <div>
    <ul v-if="userInfo.roleName != 'zyy_headmaster'">
      <li @click="back">{{ text }}</li>
      <li
        v-for="(item, index) in studentList"
        :key="index"
        :class="tabIndex == (index + 1) ? 'active' : ''"
        @click="change(item)">
        {{ item.label }}
      </li>
    </ul>
    <ul v-else>
      <li @click="back">{{ text }}</li>
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="tabIndex == (index + 1) ? 'active' : ''"
        @click="change(item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  props: {
    tabIndex: {
      type: Number,
      default: function() {
        return null
      }
    }
  },
  data() {
    return {
      text: '',
      userInfo: '',
      studentList: [
        { label: '本班总计排名', name: 'rank-total' },
        { label: '本班课程排名', name: 'rank-course' }
      ],
      list: [
        { label: '本班学员管理', name: 'rank-manage' },
        { label: '本班课程排名', name: 'rank-course' }
      ]
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    if(this.userInfo.roleName == 'zyy_headmaster') {
      this.text = '返回在教课程'
    } else {
      this.text = '返回我的班级'
    }
  },
  methods: {
    change(item) {
      this.$router.push({
        name: item.name
      })
    },
    back() {
      if(this.userInfo.roleName == 'zyy_headmaster') {
        this.$router.push({
          name: 'teacher-classes'
        })
      } else {
        this.$router.push({
          name: 'mylearn-myclass'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  ul {
    width: 160px;
    padding: 20px 0;
    margin-right: 20px;
    height: 185px;
    border: 1px solid #e4ecf3;
    border-radius: 4px;
    li {
      height: 37px;
      line-height: 37px;
      padding-left: 17px;
      color: #333;
      font-size: 12px;
      border-left: 2px solid #fff;
      cursor: pointer;
      &.active {
        color: #46C37B;
        border-left: 2px solid #46C37B;
      }
    }
  }
</style>

