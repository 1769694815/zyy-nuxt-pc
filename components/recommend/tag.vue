<template>
  <div class="recommend-tag">
    <span class="line" />
    <span class="name">
      推荐<span class="zi">{{ text[0] }}</span><span class="zi">{{ text[1] }}</span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
  .recommend-tag {
    padding-top: 13px;
    font-size: 0;
    .line {
      display: inline-block;
      vertical-align: top;
      width: 4px;
      height: 20px;
      background: #3f8a38;
    }
    .name {
      display: inline-block;
      vertical-align: top;
      margin-left: 6px;
      font-size: 16px;
      line-height: 18px;
      color: #333;
      font-weight: 700;
      .zi {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        background: #3f8a38;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        font-weight: 400;
        font-size: 14px;
        &:last-child {
          margin-left: -5px;
        }
      }
    }
  }
</style>
