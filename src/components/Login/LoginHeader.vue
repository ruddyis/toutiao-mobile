<template>
  <div class="login-header">
    <Header>
      <i slot="left" class="left iconfont icon-zuojiantou"></i>
      <div slot="center">登陆/注册</div>
      <i class="right"></i>
      <!-- <i slot="right" class="right iconfont icon-arrowRight"></i> -->
    </Header>
  </div>
</template>

<script>
import Header from '../Header'
export default {
  name: 'LoginHeader',
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
.login-header {
  // background: #3296fa;
  color: white;
  .left{
    color: white;
  }
}
</style>
