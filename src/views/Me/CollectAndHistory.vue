// 非Vant版本
<template>
  <div class="collect-history">
    <Header>
      <i slot="left" class="left iconfont icon-zuojiantou"></i>
    </Header>
    <div class="tabbar">
      <div
        class="item"
        :class="{ active: collectOrHistory === 0 }"
        @click.stop="changeCollectOrHistory(0)"
      >
        <span>收藏</span>
      </div>
      <div
        class="item"
        :class="{ active: collectOrHistory === 1 }"
        @click.stop="changeCollectOrHistory(1)"
      >
        <span>历史</span>
      </div>
    </div>
    <div class="collect-or-history">
      <ScrollView ref="scrollView" v-model="isPullMode">
        <CollectOrHistory slot="content"></CollectOrHistory>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import CollectOrHistory from '../../components/Me/CollectAndHistory/CollectOrHistory'
import ScrollView from '../../components/ScrollView'
import { mapGetters, mapActions } from 'vuex'
import { getCollect, getHistory } from '../../api/index'
export default {
  name: 'CollectAndHistory',
  data () {
    return {
      isPullMode: true
    }
  },
  components: {
    Header,
    CollectOrHistory,
    ScrollView
  },
  computed: {
    ...mapGetters(['collectOrHistory'])
  },
  methods: {
    ...mapActions(['setCollectOrHistory', 'setCollectData', 'setHistoryData']),
    changeCollectOrHistory (num) {
      this.setCollectOrHistory(num)
    }
  },
  created () {
    if (this.collectOrHistory === 0) {
      getCollect()
        .then(data => {
          this.setCollectData(data.data.results)
        })
        .catch(function (err) {
          console.log(err)
        })
    } else {
      getHistory()
        .then(data => {
          this.setHistoryData(data.data.results)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  watch: {
    collectOrHistory (newValue, oldValue) {
      // 根据导航变化更新取消导航内容滚动的变化
    }
  }
}
</script>

<style lang="less" scoped>
.collect-history {
  .left {
    color: white;
  }
  .tabbar {
    width: 100%;
    height: 40px;
    background: white;
    display: flex;
    .item {
      width: 50%;
      text-align: center;
      line-height: 40px;
      span {
        display: inline-block;
        width: 50px;
        height: 100%;
        font-size: 15px;
      }
      &.active {
        span {
          border-bottom: 5px solid #3296fa;
          box-sizing: border-box;
        }
      }
    }
  }
  .collect-or-history {
    position: fixed;
    // top: 0;
    top: 90px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
