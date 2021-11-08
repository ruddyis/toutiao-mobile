// 非Vant版本
<!--
<template>
  <div class="me">
    <MeTop></MeTop>
    <MeBottom></MeBottom>
  </div>
</template>

<script>
import MeTop from '../components/Me/MeTop'
import MeBottom from '../components/Me/MeBottom'
import { getCurrentUser } from '../api/index'
import { mapActions } from 'vuex'
export default {
  name: 'Me',
  data () {
    return {
      currentUser: {}
    }
  },
  components: {
    MeTop,
    MeBottom
  },
  methods: {
    ...mapActions(['setCurrentUser']),
    async loadCurrentUser () {
      const data = await getCurrentUser()
      this.currentUser = data.data.data
      this.setCurrentUser(this.currentUser)
      // console.log('me', this.currentUser)
    }
  },
  created () {
    this.loadCurrentUser()
  }
}
</script>

<style scoped lang="less">
.me {
  width: 100%;
  height: 100%;
}
</style>
-->
// Vant版本

<template>
  <div class="me">
    <van-cell-group v-if="user" class="me-info">
      <van-cell class="base-info" center :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button
          slot="label"
          size="mini"
          round
          class="update-btn"
          to="/UserProfile"
          >编辑资料</van-button
        >
        <div slot="right-icon" class="nowRead">
          <i class="book iconfont icon-yuedu"></i>
          <div class="book-tip">
            <i>今日阅读</i>
            <i>5分钟</i>
          </div>
        </div>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-else>
      <div
        class="not-login-box"
        @click="
          $router.push({
            path: '/login',
            query: {
              redirect: '/container/me'
            }
          })
        "
      >
        <img src="../assets/images/phone.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <van-grid clickable :column-num="2" class="nav-grid md-4">
      <van-grid-item
        icon-prefix="iconfont icon"
        icon="shoucang"
        text="收藏"
        to=""
        class="nav-grid-item"
      />
      <van-grid-item
        icon-prefix="iconfont icon"
        icon="lishi"
        text="历史"
        url=""
        class="nav-grid-item"
      />
    </van-grid>
    <van-cell title="消息通知" is-link url="" />
    <van-cell title="小智同学" class="md-4" is-link to="/UserChat" />
    <van-cell
      v-if="user"
      title="退出登陆"
      class="logout-cell"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { removeLocalStorage } from '../tools/index'
import { getCurrentUser } from '../api/index'
export default {
  name: 'Me',
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['setUser']),
    onLogout () {
      // 提示用户确认退出
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出吗？'
        })
        .then(() => {
          // on confirm
          // console.log('ok')
          this.setUser(null)
          // removeLocalStorage('user')
        })
        .catch(() => {
          // on cancel
          console.log('nook')
        })
    }
    // async loadCurrentUser () {
    //   const { data } = await getCurrentUser()
    //   this.currentUser = data.data
    //   console.log(this.currentUser)
    // }
  },
  created () {
    // this.loadCurrentUser()
    getCurrentUser()
      .then(data => {
        this.currentUser = data.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
.me {
  width: 100%;
  height: 100%;
  .me-info {
    background: url('../assets/images/banner.png') no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115x;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      padding-right: 0;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
      .nowRead {
        display: flex;
        justify-content: space-between;
        .book {
          width: 40px;
          height: 40px;
          font-size: 20px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 40px;
          text-align: center;
          background: rgba(255, 255, 255, 0.3);
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
          box-sizing: border-box;
        }
        .book-tip {
          display: flex;
          flex-direction: column;
          height: 40px;
          background: rgba(255, 255, 255, 0.3);
          box-sizing: border-box;
          i {
            color: rgba(255, 255, 255, 0.8);
            font-style: normal;
            line-height: 20px;
          }
        }
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 16px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    //  /deep/是深度作用操作符， >>> 也是深度作用操作符 ::-moz-ui-valid也是 >>>的别名
    /deep/.van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    background: url('../assets/images/banner.png') no-repeat;
    background-size: cover;
    height: 180px;
    position: relative;
    .not-login-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      img {
        width: 66px;
        height: 66px;
      }
      p {
        color: #fff;
        font-size: 14px;
      }
    }
  }
  /deep/.nav-grid {
    .nav-grid-item {
      height: 70px;
      .van-grid-item__icon {
        font-size: 22px;
        &.icon-shoucang {
          color: #eb5253;
        }
        &.icon-lishi {
          color: #ff9d1d;
        }
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .md-4 {
    margin-bottom: 4px;
  }
}
</style>
