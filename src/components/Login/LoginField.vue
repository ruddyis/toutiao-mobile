<template>
  <div class="login-field">
    <div class="field">
      <div class="tip iconfont icon-shouji"></div>
      <input
        type="text"
        class="text"
        placeholder="请输入手机号"
        label="文本"
        v-model="user.mobile"
        ref="mobile"
      />
    </div>
    <div class="field">
      <div class="tip iconfont icon-yanzhengma"></div>
      <input
        type="text"
        class="text"
        placeholder="请输入验证码"
        label="文本"
        v-model="user.code"
        ref="code"
      />
      <span class="field-count" v-if="this.isCountDownShow"
        >{{ countDownNum }} s</span
      >
      <button class="field-button" @click="sendSms" v-else>发送验证码</button>
    </div>
    <button class="login-button" @click="openContainer">登陆</button>
    <p class="private" @click.stop="openPrivate">隐私条款</p>
    <div class="private-box" ref="privateBox">
      <Header>
        <i
          slot="left"
          class="left iconfont icon-zuojiantou"
          @click.stop="close"
        ></i>
      </Header>
      <h1>隐私条款</h1>
      <p>隐私条款具体内容</p>
    </div>
  </div>
</template>

<script>
import Header from '../Header'
import { getLogin, getSms } from '../../api/index'
import { mapActions } from 'vuex'
export default {
  name: 'LoginField',
  components: {
    Header
  },
  data () {
    return {
      user: {
        mobile: '13911111110',
        code: '246810'
      },
      mobilePattern: /^1[3|5|7|8|9]\d{9}$/,
      codePattern: /^\d{6}$/,
      countDownNum: 60,
      isCountDownShow: false
    }
  },
  methods: {
    ...mapActions(['setUser']),
    openPrivate () {
      //   console.log('隐私')
      this.$refs.privateBox.style.display = 'block'
    },
    openContainer () {
      if (this.user.mobile.replace(/\s/g, '') === '') {
        this.$toast('手机号不能为空')
      } else if (!this.mobilePattern.test(this.user.mobile)) {
        this.$toast('手机号格式错误')
      } else if (this.user.code.replace(/\s/g, '') === '') {
        this.$toast('验证码不能为空')
      } else if (!this.codePattern.test(this.user.code)) {
        this.$toast('验证码格式错误')
      } else {
        // this.isCountDownShow = true
        getLogin(this.user)
          .then(data => {
            // console.log(data)
            this.$emit('openContainer')
            this.setUser(data.data)
            this.$toast('登陆成功')
          })
          .catch(err => {
            this.$toast('登陆失败')
            console.log('登陆失败', err)
          })
      }
    },
    close () {
      this.$refs.privateBox.style.display = 'none'
    },
    async sendSms () {
      if (
        this.mobilePattern.test(this.user.mobile) &&
        this.user.mobile.replace(/\s/g, '') !== ''
      ) {
        try {
          const sms = await getSms(this.user.mobile)
          this.isCountDownShow = true
          setInterval(() => {
            this.countDownNum -= 1
            if (this.countDownNum <= 0) {
              this.isCountDownShow = false
            }
          }, 100)
          console.log(sms)
        } catch (err) {
          if (err && err.response && err.response.status === 429) {
            this.$toast('发送太频繁')
          } else {
            this.$toast('未知错误')
          }
        }
      } else {
        this.$toast('手机号错误，请重新输入')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-field {
  text-align: center;
  .field {
    height: 40px;
    display: flex;
    line-height: 40px;
    align-items: center;
    background: white;
    border-bottom: 1px solid #f5f7f9;
    .tip {
      width: 20%;
      text-align: center;
    }
    .text {
      width: 50%;
      border: none;
      resize: none;
    }
    .field-button,
    .field-count {
      width: 76px;
      height: 24px;
      // margin-top: 8px;
      line-height: 24px;
      color: #666666;
      background: #ededed;
      font-size: 11px;
      border: 0.02667rem solid #fff;
      border-radius: 15px;
    }
  }
  .login-button {
    margin-top: 20px;
    width: 90%;
    height: 40px;
    background: #1989fa;
    border-radius: 8px;
    color: white;
  }
  .private {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    color: black;
  }
  .private-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    display: none;
    .left {
      color: white;
      margin-left: -80px;
    }
  }
}
</style>
