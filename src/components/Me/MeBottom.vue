// 只有非Vant版本
<template>
  <div class="me-bottom">
    <!-- <ul class="bottom-top">
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
      <i class="middle-left">小智同学</i>
      <i class="middle-right iconfont icon-youjiantou"></i>
    </div> -->
    <MeTip
      @openChat="openChat"
      @toCollect="toCollect"
      @toHistory="toHistory"
    ></MeTip>
    <div class="bottom-bottom" @click="backLogin">退出登陆</div>
    <LofOff @cancel="cancel" @reTrue="reTrue" v-show="isShowLof">
      <p slot="off-title" class="off-title">退出确认</p>
      <p slot="off-tip" class="off-tip">
        退出当前头条账号，将不能同步收藏，发布评论和云端分享等
      </p>
    </LofOff>
    <!-- <div class="lof-off" v-show="isShowLof">
      <div class="off-box">
        <p class="off-title">退出确认</p>
        <p class="off-tip">
          退出当前头条账号，将不能同步收藏，发布评论和云端分享等
        </p>
        <ul class="off-button">
          <li class="button-left" @click="cancel">取消</li>
          <li class="button-right" @click="reTrue">确认</li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MeTip from './MeTip'
import LofOff from '../LofOff'
export default {
  name: 'MeBottom',
  components: {
    MeTip,
    LofOff
  },
  data () {
    return {
      isShowLof: false
    }
  },
  methods: {
    ...mapActions(['setCollectOrHistory', 'setBirthday']),
    backLogin () {
      this.isShowLof = true
    },
    cancel () {
      this.isShowLof = false
    },
    reTrue () {
      this.$router.push('/nome')
      this.setBirthday(null)
    },
    openChat () {
      this.$router.push('/UserChat')
    },
    toCollect () {
      this.setCollectOrHistory(0)
      this.$router.push('/collectAndHistory')
    },
    toHistory () {
      this.setCollectOrHistory(1)
      this.$router.push('/collectAndHistory')
    }
  }
}
</script>

<style lang="less" scoped>
.me-bottom {
  width: 100%;
  .bottom-top {
    display: flex;
    margin-bottom: 10px;
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
        color: gold;
        margin-bottom: 5px;
      }
      .image-tip {
        font-size: 15px;
      }
    }
  }
  .bottom-middle {
    width: 100%;
    height: 40px;
    background: white;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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
  .bottom-bottom {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    background: white;
    margin-top: 4px;
    color: #d86262;
  }
}
</style>
