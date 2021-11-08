// 只有非Vant版本
<template>
  <div class="me-tip">
    <ul class="bottom-top">
      <li class="top-left" @click="toCollect">
        <i class="image iconfont icon-shoucang"></i>
        <span class="image-tip">收藏</span>
      </li>
      <li class="top-right" @click="toHistory">
        <i class="image iconfont icon-lishi"></i>
        <span class="image-tip">历史</span>
      </li>
    </ul>
    <div class="bottom-middle" @click="openChat">
      <i class="middle-left">消息通知</i>
      <i class="middle-right iconfont icon-youjiantou"></i>
    </div>
    <div class="bottom-middle" @click="openChat">
      <i class="middle-left">小智同学</i>
      <i class="middle-right iconfont icon-youjiantou"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeTip',
  methods: {
    openChat () {
      this.$emit('openChat')
    },
    toCollect () {
      this.$emit('toCollect')
    },
    toHistory () {
      this.$emit('toHistory')
    }
  }
}
</script>

<style lang="less" scoped>
.me-tip {
  .bottom-top {
    display: flex;
    margin-bottom: 4px;
    .top-left,
    .top-right {
      width: 50%;
      height: 80px;
      padding-top: 15px;
      text-align: center;
      display: flex;
      flex-direction: column;
      background: white;
      box-sizing: border-box;
      .image {
        font-size: 25px;
        color: #eb5253;
        margin-bottom: 5px;
      }
      .image-tip {
        font-size: 15px;
      }
    }
    .top-right{
      .image {
        color: #ff9d1d;
      }
    }
  }
  .bottom-middle {
    width: 100%;
    height: 40px;
    background: white;
    display: flex;
    justify-content: space-between;
    .middle-left {
      font-size: 15px;
      display: inline-block;
      font-style: normal;
      line-height: 40px;
      margin-left: 10px;
    }
    .middle-right {
      font-size: 20px;
      display: inline-block;
      line-height: 40px;
      margin-right: 10px;
    }
  }
}
</style>
