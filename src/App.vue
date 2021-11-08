<template>
  <div id="app">
    <!-- 这里是一级路由的出口，keep-alive仅仅对该路由出口渲染的组件有效 -->
    <keep-alive include="cachePages">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>
<style lang="less"></style>
