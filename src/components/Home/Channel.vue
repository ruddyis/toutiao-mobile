// 非Vant版本
<!--
<template>
  <div class="channel">
    <div class="channel-view">
      <ScrollView
        v-model="isPullMode"
        @load="handleData"
        @refresh="refreshData"
      >
        <ul slot="content">
          <li v-for="(value, index) in articles" :key="index">
            <ChannelItem :article="value"></ChannelItem>
          </li>
        </ul>
        <i class="explain" v-if="isShowExplain">无内容更新</i>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import { getChannelNew } from '../../api/article.js'
import ScrollView from '../ScrollView'
import ChannelItem from './Channel/ChannelItem'
export default {
  name: 'Channel',
  components: {
    ScrollView,
    ChannelItem
  },
  props: {
    channelID: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      articlesData: {},
      articles: [],
      timestamp: null,
      changeChannelID: false,
      isPullMode: true, // 是否是上拉加载下拉刷新模式
      isRefresh: false, // 判定是否是下拉刷新状态
      isShowExplain: false
    }
  },
  watch: {
    channelID (newValue, oldValue) {
      this.timestamp = Date.now()
      this.changeChannelID = true
      this.handleData()
      sessionStorage.setItem('channelID', newValue)
    }
  },
  methods: {
    refreshData () {
      this.timestamp = Date.now()
      this.isRefresh = true
      this.handleData()
    },
    handleData () {
      if (!isNaN(this.channelID)) {
        getChannelNew(this.channelID, this.timestamp || Date.now(), 1)
          .then(data => {
            const { results } = data.data
            if (this.changeChannelID) {
              this.isPullMode = true
              this.articles = results
              this.changeChannelID = false
            } else if (!this.isRefresh && !this.changeChannelID) {
              this.articles.push(...results)
            }
            if (results.length) {
              this.timestamp = data.data.pre_timestamp
            } else {
              this.isPullMode = false // 退出加载与刷新模式
              this.$toast('无更多更新')
            }
            if (this.isRefresh) {
              this.articles.unshift(...results)
              this.isRefresh = false
              this.$toast(`更新了${results.length}条数据`)
            }
            // console.log('articles', this.articles)
          })
          .catch(() => {
            this.$toast('加载失败')
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel {
  .channel-view {
    position: fixed;
    top: 90px;
    bottom: 50px;
    left: 0;
    right: 0;
    background: white;
    overflow: hidden;
    .explain {
      text-align: center;
      font-size: 30px;
    }
  }
}
</style>
-->
// Vant版本

<template>
  <div class="channel" ref="channel">
    <van-pull-refresh
      v-model="isRefreshloading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ChannelItem
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        ></ChannelItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelNew } from '../../api/article.js'
import ChannelItem from './Channel/ChannelItem'
import { debounce } from 'lodash'
export default {
  name: 'Channel',
  components: {
    ChannelItem
  },
  data () {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载中的loading状态
      finished: false, // 控制加载状态的结束，true表示不再触发加载更多
      timestamp: null, // 获取下一页数据的时间戳
      isRefreshloading: false, // 下拉刷新的loading状态
      refreshSuccessText: '', // 下拉刷新成功的提示文字
      scrollTop: 0 // 列表滚动到顶部的距离
    }
  },
  methods: {
    async onLoad () {
      // load方法当加载一次的数据不铺满一屏时，会重新加载数据直到铺满一屏
      // 1.请求获取数据
      const { data } = await getChannelNew({
        channel_id: this.channel.id, // 推荐频道id
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳,
        // timestamp相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
        with_top: 1
      })
      // 2.把数据放到list数组中
      // 注意点：采用push方法
      const { results } = data.data
      this.articles.push(...results)
      // 3.设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远停在这里
      this.loading = false
      // 4.数据全部加载完成
      if (results.length) {
        // 还有数据，更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据，将加载状态设置为结束，不再触发加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新，组件自己会展示loading状态
      // 1.请求获取数据
      const { data } = await getChannelNew({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 在该项目学习过程中，只要传递不同的时间戳就一定会返回不同的数据，且数据不为0
        with_top: 1
      })
      // 2.将数据放到数据列表中（往顶部追加）
      const { results } = data.data
      this.articles.unshift(...results)
      // 3.关闭刷新的状态loading
      this.isRefreshloading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  mounted () {
    const channelRef = this.$refs.channel
    channelRef.onscroll = debounce(() => {
      this.scrollTop = channelRef.scrollTop
    }, 50)
  },
  activated () {
    // 把记录的到顶部的距离重新设置回去
    this.$refs.channelRef.scrollTop = this.scrollTop
  }
}
</script>

<style lang="less" scoped>
.channel {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
