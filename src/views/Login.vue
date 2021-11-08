// 非Vant版本
<!--
<template>
  <div class="login">
    <LoginHeader></LoginHeader>
    <LoginField @openContainer="openContainer"></LoginField>
  </div>
</template>

<script>
// 原生js版本
import LoginHeader from '../components/Login/LoginHeader'
import LoginField from '../components/Login/LoginField'
export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginField
  },
  methods: {
    openContainer () {
      this.$router.push('/container')
    }
  }
}
</script>

<style lang="less" scoped></style>
-->
// Vant版本

<template>
  <div class="login">
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="openContainer"
      @failed="onFailed"
    >
      <van-nav-bar title="登陆/注册" left-arrow @click-left="$router.back()" />
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          left-icon="phone-o"
          placeholder="请输入手机号"
          name="mobile"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          left-icon="music-o"
          placeholder="请输入验证码"
          name="code"
          :rules="formRules.code"
        >
          <template #button>
            <van-count-down
              :time="1000 * 60"
              format="ss s"
              v-if="isCountDownShow"
              @finish="isCountDownShow = false"
            />
            <van-button
              size="mini"
              type="primary"
              @click.prevent="onSendSms"
              :loading="isSendSmsLoading"
              v-else
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <van-button type="info" block>登陆</van-button>
    </van-form>
  </div>
</template>

<script>
import { getLogin, getSms } from '../api/index'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111110',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    ...mapActions(['setUser']),
    openContainer () {
      getLogin(this.user)
        .then(data => {
          // console.log('login', data)
          this.$toast('登陆成功')
          this.setUser(data.data)

          // 清除container的缓存，让它重新渲染
          this.$store.commit('REMOVE_CACHE_PAGE', 'Container')
          this.$router.push(this.$route.query.redirect || '/container')
        })
        .catch(function (err) {
          console.log('登陆失败', err)
          this.$toast('登陆失败')
        })
    },
    onFailed (error) {
      var that = this
      error.errors.forEach(function (obj) {
        // console.log(obj)
        that.$toast(obj.message)
      })
    },
    async onSendSms () {
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        // const res = await getSms(this.user.mobile)
        // console.log('send', res)
        this.isSendSmsLoading = true // 展示按钮的loading状态，防止网络慢用户多次点击
        await getSms(this.user.mobile)
        // 短信发送成功，隐藏发送按钮，显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 短信发送失败的错误提示
          message = '发送太频繁,请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          message = '未知错误，请稍后重试'
        }
        // console.dir(err)
        this.$toast(message)
      }
      this.isSendSmsLoading = false // 无论发送成功还是失败都需要关闭按钮的loading状态
    }
  }
}
</script>

<style lang="less">
.van-nav-bar__content {
  background: #3296fa;
  .van-icon-arrow-left {
    color: white;
  }
  .van-nav-bar__title {
    color: white;
  }
}
.van-button--primary {
  background: #fff;
  border: 0.02667rem solid #fff;
  color: black;
}
.van-button--info {
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
}
.van-field {
  align-items: center;
}
</style>
