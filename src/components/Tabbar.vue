<template>
  <div class="tabbar">
    <!-- 底部导航条 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/container/home">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/container/question"
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon="video-o" to="/container/video"
        >视频</van-tabbar-item
      >
      <van-tabbar-item icon="manager-o" to="/container/me"
        >设置</van-tabbar-item
      >
    </van-tabbar>
    <!-- <router-link tag="div" class="item" to="/container/home">
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </router-link>
    <router-link tag="div" class="item" to="/container/question">
      <i class="iconfont icon-wenda"></i>
      <span>问答</span>
    </router-link>
    <router-link tag="div" class="item" to="/container/video">
      <i class="iconfont icon-shipin"></i>
      <span>视频</span>
    </router-link>
    <router-link tag="div" class="item" to="/container/me">
      <i class="iconfont icon-wode"></i>
      <span>我的</span>
    </router-link> -->
  </div>
</template>

<script>
// Vant版本
export default {
  name: 'Tabbar',
  data () {
    return {
      active: 0
    }
  }
}
// 原生js版本
// export default {
//   name: 'Tabbar'
// }
</script>

<!--<style lang="less" scoped>
@import '../assets/fonts/iconfont.css';
.tabbar {
  width: 100%;
  height: 50px;
  background: white;
  display: flex;
  justify-content: space-around;
  position: absolute;
  left: 0;
  bottom: 0;
  .item {
    display: flex;
    flex-direction: column;
    text-align: center;
    i {
      margin-top: 10px;
      margin-bottom: 3px;
    }
  }
  .router-link-active{
    color: #1989fa;
  }
}
</style>
-->
