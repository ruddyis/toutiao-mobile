// 非Vant版本
<!--
<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="channel-edit" v-show="isShowChannelEdit">
      <Header class="header">
        <i
          slot="left"
          class="left iconfont icon-guanbi1"
          @click.stop="closeChannelEdit"
        ></i>
        <i slot="center" class="iconfont icon-magento">编辑频道</i>
      </Header>

      <div
        class="edit-channels"
        v-for="(value, index) in editChannel"
        :key="index"
      >
        <div class="edit-channels-label">
          <span class="edit-channels-title">{{ value }}</span>
          <button
            class="edit-channels-btn"
            v-if="index === 0"
            @click.stop="isEdit = !isEdit"
          >
            {{ isEdit ? '完成' : '编辑' }}
          </button>
        </div>
        <ul class="edit-channels-items" v-if="index === 0">
          <li
            class="edit-channels-item"
            :class="{ active: channelID === userChannel.id }"
            v-for="(userChannel, index) in userChannels"
            :key="userChannel.id"
            @click.stop="switchUserChannel(userChannel.id, index)"
          >
            {{ userChannel.name }}
            <span
              class="closeEditIcon iconfont icon-guanbi"
              v-if="isEdit && index !== 0"
              @click.stop="deleteUserChannel(index, userChannel.id)"
            ></span>
          </li>
        </ul>
        <ul class="edit-channels-items" v-if="index === 1">
          <li
            class="edit-channels-item"
            v-for="recommendChannel in recommendChannels"
            :key="recommendChannel.id"
            @click.stop="onAddMyChannel(recommendChannel)"
          >
            {{ recommendChannel.name }}
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import Header from '../../components/Header'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '../../api/channel'
import { mapState } from 'vuex'
import { setLocalStorage } from '../../tools/index'
export default {
  name: 'ChannelEdit',
  components: {
    Header
  },
  data () {
    return {
      isShowChannelEdit: false,
      editChannel: ['我的频道', '推荐频道'],
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    userChannels: {
      type: Array,
      default: () => [],
      required: true
    },
    channelID: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  methods: {
    closeChannelEdit () {
      this.isShowChannelEdit = false
    },
    enter (el, done) {
      Velocity(el, 'transition.slideUpBigIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideUpBigOut', { duration: 500 }, function () {
        done()
      })
    },
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAddMyChannel (channel) {
      this.userChannels.push(channel)
      // TODO: 添加数据持久化
      if (this.user) {
        // 账号已登陆，数据存储到线上服务器
        await addUserChannel({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ]
        })
      } else {
        // 未登录，数据存储到本地
        setLocalStorage('user-channels', this.userChannels)
      }
    },
    async deleteUserChannel (index, id) {
      this.userChannels.splice(index, 1)
      if (id === this.channelID) {
        this.$emit('openChannelDetail', this.userChannels[0].id, index)
      }
      // 删除数据持久化
      if (this.user) {
        await deleteUserChannel(id)
      } else {
        setLocalStorage('user-channels', this.userChannels)
      }
    },
    switchUserChannel (id, index) {
      this.isShowChannelEdit = false
      this.$emit('openChannelDetail', id, index)
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: white;
  overflow-y: auto;
  .header {
    background: rgba(255, 255, 255, 0.8);
    margin-bottom: 40px;
    .left {
      color: #3296fa;
    }
  }
  .edit-channels {
    margin: 20px;
    .edit-channels-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .edit-channels-title {
        font-size: 16px;
        color: #333;
      }
      .edit-channels-btn {
        width: 40px;
        height: 30px;
        font-size: 10px;
        color: red;
        border-radius: 40%;
        border-color: red;
        background: white;
      }
    }
    .edit-channels-items {
      .edit-channels-item {
        display: inline-block;
        width: 70px;
        height: 43px;
        line-height: 43px;
        text-align: center;
        background: #ccc;
        margin: 0 5px 5px 0;
        position: relative;
        &.active {
          color: red;
        }
        .closeEditIcon {
          width: 15px;
          height: 15px;
          position: absolute;
          top: -20px;
          right: -5px;
          color: #333;
        }
      }
    }
  }
}
</style>
-->
// Vant版本

<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-edit-title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="small"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in userChannels"
        :key="channel.id"
        :text="channel.name"
        :icon="isEdit && index !== 0 ? 'close' : ''"
        :class="{ active: index === active }"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-edit-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="recommendChannel in recommendChannels"
        :key="recommendChannel.id"
        :text="recommendChannel.name"
        @click="onAddMyChannel(recommendChannel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '../../api/channel'
import { mapState } from 'vuex'
import { setLocalStorage } from '../../tools/index'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      default: () => [],
      required: true
    },
    active: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道数据列表
      isEdit: false // 控制编辑频道的显示状态
    }
  },
  // 计算属性会观测内部依赖的数据变化而重新求值
  computed: {
    ...mapState(['user']),
    // 推荐的频道列表
    recommendChannels () {
      // filter方法：过滤数据，根据方法返回的布尔值true来搜集数据
      // filter方法：查找满足条件的所有元素
      return this.allChannels.filter(channel => {
        // 判断channel是否属于用户频道
        // find方法查找满足条件的单个元素
        return !this.userChannels.find(userChannel => {
          // 找到满足条件的元素
          return userChannel.id === channel.id
        })
      })

      // 第二种方法
      // const arr = []
      // // 遍历所有频道
      // this.allChannels.forEach(channel => {
      //   let flag = false
      //   for (let i = 0; i < this.userChannels.length; i++) {
      //     if (this.userChannels[i].id === channel.id) {
      //       // 所有频道中的频道项属于用户频道
      //       flag = true
      //       break
      //     }
      //   }
      //   if (!flag) {
      //     arr.push(channel)
      //   }
      // })
      // return arr
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAddMyChannel (channel) {
      // console.log(channel)
      this.userChannels.push(channel)

      // TODO: 数据持久化
      if (this.user) {
        // 账号已登陆，数据存储到线上服务器
        await addUserChannel({
          channels: [{ id: channel.id, seq: this.userChannels.length }]
        })
      } else {
        // 账号未登陆，数据存储到本地
        // console.log('未登录')
        setLocalStorage('user-channels', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态：删除频道
        this.deleteChannel(channel, index)
        // 如果删除的是当前的激活频道之前的频道
        if (index < this.active) {
          // 更新激活频道的索引
          this.$emit('update-active', index)
        }
      } else {
        // 非编辑状态，切换频道
        this.switchChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      this.userChannels.splice(index, 1)

      // 删除数据持久化
      if (this.user) {
        // 登陆状态，持久化到线上
        await deleteUserChannel(channel.id)
      } else {
        // 未登录状态，持久化到本地
        setLocalStorage('user-channels', this.userChannels)
      }
    },
    switchChannel (index) {
      console.log('切换频道')
      // 切换频道
      this.$emit('update-active', index)
      // 关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-edit-title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    // background: #f4f5f6&
    &.active {
      /deep/.van-grid-item__text {
        color: red !important;
      }
    }
    /deep/.van-grid-item__content {
      background: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: unset;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 15px;
      color: #ccc;
    }
  }
}
</style>
