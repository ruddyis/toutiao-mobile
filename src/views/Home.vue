// 非Vant版本
<!--
<template>
  <div class="home">
    <div class="header">
      <div class="header-logo">
        <img src="../assets/images/logo.png" />
      </div>
      <div class="header-search" @click.stop="openSearch">
        <div class="search-box">
          <i class="search-icon iconfont icon-sousuo"></i>
          <span class="search-tip">搜索</span>
        </div>
      </div>
    </div>
    <div class="my-channels">
      <ul class="channels" ref="channels">
        <li
          class="channel"
          v-for="(value, index) in channels"
          :key="index"
          @click.stop="openChannelDetail(value.id, index, $event)"
        >
          <div class="channel-name" :ref="`channel${index}`">
            {{ value.name }}
          </div>
        </li>
        <li class="channel-underLine" ref="channel-underLine"></li>
      </ul>
      <i
        class="channel-more iconfont icon-gengduo"
        @click="openEditChannels"
      ></i>
    </div>
    <Channel :channelID="channelID"></Channel>
    <ChannelEdit
      ref="ChannelEdit"
      :user-channels="channels"
      :channelID="channelID"
      @openChannelDetail="openChannelDetail"
    ></ChannelEdit>
  </div>
</template>

<script>
import { getChannels } from '../api/index'
import { mapState, mapActions } from 'vuex'
import Channel from '../components/Home/Channel'
import ChannelEdit from '../views/Home/ChannelEdit'
import { getLocalStorage } from '../tools/index'

export default {
  name: 'Home',
  components: {
    Channel,
    ChannelEdit
  },
  data () {
    return {
      channels: [],
      channelID: NaN
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      // 登陆状态，请求获取线上用户的频道列表
      getChannels()
        .then(data => {
          this.channels = data.data.channels
          this.setMyChannels(data.data.channels)
          this.channelID =
            Number(sessionStorage.getItem('channelID')) || this.channels[0].id
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      // 没有登陆，判断是否有本地存储的频道列表数据
      if (getLocalStorage('user-channels')) {
        this.channels = getLocalStorage('user-channels')
      } else {
        // 用户未登录，也没有本地存储的频道列表数据，那就请求获取默认推荐的频道列表
        getChannels()
          .then(data => {
            this.channels = data.data.channels
            this.setMyChannels(data.data.channels)
            this.channelID =
              Number(sessionStorage.getItem('channelID')) || this.channels[0].id
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  updated () {
    for (let i = 0; i < this.channels.length; i++) {
      if (this.channelID === this.channels[i].id) {
        this.openChannelDetail(this.channels[i].id, i)
      }
    }
  },
  methods: {
    ...mapActions(['setMyChannels']),
    openSearch () {
      this.$router.push('/Search')
    },
    // 设置导航底部滚动条的位置
    openChannelDetail (id, index, $event) {
      // 设置导航条底部滚动条的位置
      // var position = $event.path[1].offsetLeft
      // var position = $event.path[0].offsetLeft // 获取被点击的li的offsetLeft

      var position
      if ($event) {
        position = $event.path[0].offsetLeft // 获取被点击的li的offsetLeft
      } else {
        position = this.$refs[`channel${index}`][0].offsetLeft
        // console.log(position)
      }

      // console.log(position, this.$refs[`channel${index}`][0].offsetWidth, this.$refs[`channel${index}`][0].offsetWidth)
      // 获取li宽度的方式一
      var liWidth = this.$refs[`channel${index}`][0].offsetWidth
      // 获取li宽度的方式二
      // const childNodes = this.$refs.channels.childNodes
      // const liWidth = childNodes[index].clientWidth

      // var ulLeft = this.$refs.channels.scrollLeft
      var ulWidth = this.$refs.channels.offsetWidth
      this.$refs.channels.scrollLeft = position - ulWidth / 2 + liWidth / 2
      const activeChannelLeft = this.$refs[`channel${index}`][0].offsetLeft
      // this.$refs['channel-underLine'].style.width = liWidth + 'px'
      this.$refs['channel-underLine'].style.left =
        activeChannelLeft +
        (liWidth - this.$refs['channel-underLine'].offsetWidth) / 2 +
        'px'

      // 给Channels组件传递不同的数据
      this.channelID = id
    },
    openEditChannels () {
      this.$refs.ChannelEdit.isShowChannelEdit = true
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  .header {
    width: 100%;
    height: 45px;
    background: #1989fa;
    display: flex;
    justify-content: space-between;
    .header-logo {
      height: 45px;
      width: 50%;
      margin-left: 10px;
      img {
        height: 40px;
        width: auto;
        margin-top: 5px;
      }
    }
    .header-search {
      margin-right: 15px;
      width: 50%;
      .search-box {
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin-top: 7.5px;
        background: rgba(255, 255, 255, 0.4);
        text-align: center;
        border: none;
        border-radius: 15px;
        color: white;
        .search-icon {
          font-size: 10px;
          margin-right: 5px;
        }
      }
    }
  }
  .my-channels {
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    .channels {
      overflow-x: auto;
      height: 45px;
      line-height: 45px;
      position: relative;
      display: flex;
      &::-webkit-scrollbar {
        display: none;
      }
      .channel {
        display: inline-block;
        background: white;
        padding: 0 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        flex-basis: percentage(100%);
        &:not(:first-child) {
          border-left: 1px solid #ccc;
        }
        .channel-name {
          min-width: 80px;
          font-size: 15px;
          color: #333;
          text-align: center;
        }
      }
      .channel-underLine {
        position: absolute;
        left: 10px;
        bottom: 5px;
        width: 20px;
        height: 2px;
        background: #1989fa;
        transition: all 0.2s linear 0s;
        border: none;
      }
    }
    .channel-more {
      width: 25px;
      text-align: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      background: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
-->
// Vant版本

<template>
  <div class="home-container">
    <van-nav-bar class="van-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
        to="/Search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 标签页组件有一个功能，只有第一次查看标签页的时候才会渲染里面的内容 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        v-for="(value, index) in channels"
        :key="index"
        :title="value.name"
      >
        <Channel :channel="value"></Channel>
      </van-tab>
      <!-- 汉堡按钮定位把列表最后的位置挡住了，解决的办法就是在这里添加一个占位元素 -->
      <div slot="nav-right" class="wap-nav-palceholder"></div>
      <div
        slot="nav-right"
        @click="isChannelEditShow = true"
        class="wap-nav-wrap"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      class="channel-edit-popup"
      teleport="body"
      style="height:100%"
    >
      <!-- 模版中的$event表示事件参数 -->
      <ChannelEdit
        :userChannels="channels"
        :active="active"
        @close="isChannelEditShow = false"
        @update-active="active = $event"
      ></ChannelEdit>
    </van-popup>
    <router-view></router-view>
  </div>
</template>

<script>
import { getChannels } from '../api/index'
import Channel from '../components/Home/Channel'
import ChannelEdit from '../views/Home/ChannelEdit'
import { mapState } from 'vuex'
import { getLocalStorage } from '../tools/index'
export default {
  name: 'Home',
  components: {
    Channel,
    ChannelEdit
  },
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: [],
      isChannelEditShow: false // 控制编辑频道的显示状态
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      // 已登录，请求获取线上的用户频道列表数据
      // 请求获取频道数据
      getChannels()
        .then(data => {
          this.channels = data.data.channels
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      // 没有登陆，判断是否有本地存储的频道列表数据
      if (getLocalStorage('user-channels')) {
        this.channels = getLocalStorage('user-channels')
      } else {
        // 用户未登录，也没有本地存储的频道列表数据，那就请求获取默认推荐的频道列表
        getChannels()
          .then(data => {
            this.channels = data.data.channels
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  .van-nav-bar {
    background: #1989fa;
    /deep/.van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 277px;
      height: 32px;
      border: none;
      background: rgba(255, 255, 255, 0.3);
      /deep/ .van-icon-search {
        font-size: 16px;
        &.van-icon {
          color: unset;
        }
      }
      .van-button__text {
        font-size: 14px;
      }
    }
  }
  .channel-tabs {
    /deep/.van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
  .wap-nav-palceholder {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    line-height: 44px;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon-wap-nav {
      font-size: 24px;
    }
    &:before {
      content: '';
      width: 1px;
      height: 30px;
      background: rgba(37, 36, 36, 0.2);
      left: 0;
    }
  }
}
</style>
