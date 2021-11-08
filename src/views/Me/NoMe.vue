// 只有非Vant版本
<template>
  <div class="no-me">
    <div class="top">
      <div class="box" @click="openLogin">
        <div class="phone-box">
          <i class="phone iconfont icon-shouji"></i>
        </div>
        <p class="reLogin">登陆 / 注册</p>
      </div>
    </div>
    <MeTip
      @openChat="toMeTip"
      @toCollect="toMeTip"
      @toHistory="toMeTip"
    ></MeTip>
    <LofOff v-show="isShowReTrueLof" @cancel="cancel" @reTrue="openLogin">
      <p slot="off-tip" class="off-tip">
        该功能需要登陆，确认登陆吗？
      </p>
    </LofOff>
  </div>
</template>

<script>
import MeTip from '../../components/Me/MeTip'
import LofOff from '../../components/LofOff'
export default {
  name: 'NoMe',
  components: {
    MeTip,
    LofOff
  },
  data () {
    return {
      isShowReTrueLof: false
    }
  },
  methods: {
    _changeShowLof (flag) {
      this.isShowReTrueLof = flag
    },
    _login () {
      this.$router.push('/login')
    },
    openLogin () {
      this._login()
    },
    toMeTip () {
      this._changeShowLof(true)
    },
    cancel () {
      this._changeShowLof(false)
    }
  }
}
</script>

<style lang="less" scoped>
.no-me {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 200px;
    background: url('../../assets/images/banner.png') no-repeat;
    background-size: cover;
    position: relative;
    text-align: center;
    .box {
      // width: 80px;
      height: 100px;
      // background: black;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      .phone-box {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: white;
        margin-left: 50%;
        transform: translateX(-50%);
        .phone {
          font-size: 35px;
          color: #1989fa;
          display: inline-block;
          margin-top: 10px;
        }
      }
      .reLogin {
        color: white;
        font-size: 15px;
      }
    }
  }
}
</style>
