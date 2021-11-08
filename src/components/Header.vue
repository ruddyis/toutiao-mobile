<template>
  <div class="header">
    <div class="left" @click="back">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    back () {
      // 返回方法一
      window.history.back()
      // 返回方法二
      // this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background: #3296fa;
  .left,
  .right {
    width: 33%;
    line-height: 50px;
    font-size: 20px;
    color: black;
    padding: 0 10px;
  }
  .right{
    text-align: right;
  }
  .center {
    font-size: 15px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
