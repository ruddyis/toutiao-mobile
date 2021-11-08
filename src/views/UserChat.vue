// 非Vant版本
<!--
<template>
  <div class="chat">
    <Header>
      <i slot="left" class="left iconfont icon-zuojiantou"></i>
      <div slot="center" class="center">小智同学</div>
    </Header>
    <div class="chat-box">
      <ScrollView>
        <ul>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
        </ul>
      </ScrollView>
    </div>
    <div class="dialog">
      <div class="dialog-chat">
        <input class="dialog-box" ref="dialog-box" v-model="isHasText" />
        <i
          v-show="isShowDel"
          class="del iconfont icon-guanbi"
          @click.stop="DelDialog"
        ></i>
      </div>
      <button class="send">发送</button>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import ScrollView from '../../components/ScrollView'
export default {
  name: 'Chat',
  components: {
    Header,
    ScrollView
  },
  data () {
    return {
      isHasText: ''
    }
  },
  computed: {
    isShowDel () {
      if (this.isHasText.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    DelDialog () {
      this.isHasText = ''
    }
  }
}
</script>

<style lang="less" scoped>
.chat {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .left {
    color: white;
  }
  .center {
    color: white;
  }
  .chat-box{
    position: fixed;
    top: 55px;
    bottom: 40px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .dialog {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    padding: 5px;
    box-sizing: border-box;
    .dialog-chat {
      width: 85%;
      background: white;
      display: flex;
      justify-content: space-between;
      margin-right: 5px;
      box-sizing: border-box;
      align-items: center;
      .dialog-box {
        width: 98%;
        // height: 50px;
        border: none;
        resize: none;
        font-size: 15px;
        padding: 5px;
        box-sizing: border-box;
        overflow-y: hidden;
      }
    }
    .send {
      width: 13%;
      background: rgb(66, 185, 66);
      color: white;
    }
  }
}
</style>
-->

<template>
  <div class="user-chat">
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-cell-group class="message-list" ref="message-list">
      <van-cell
        v-for="(item, index) in messages"
        :key="index"
        :title="item.msg"
      ></van-cell>
    </van-cell-group>
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入消息"></van-field>
      <van-button type="primary" size="small" @click="onSend">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters } from 'vuex'
import { setLocalStorage, getLocalStorage } from '../tools/index'
export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null, // websocket通信对象
      messages: getLocalStorage('chat-message') || [] // 消息列表
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created () {
    // 建立连接
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: this.user.token
      },
      transports: ['websocket']
    })
    this.socket = socket
    socket.on('connect', () => {
      console.log('连接建立成功了')
    })
    socket.on('disconnect', () => {
      console.log('断开连接')
    })
    socket.on('message', data => {
      // 将对方发送的消息放到数组中
      // console.log(data)
      this.messages.push(data)
    })
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    onSend () {
      // 请求发送消息
      const data = { msg: this.message, timestamp: Date.now() }
      this.socket.emit('message', data)
      // 把用户发出去的消息存储到数组中
      this.messages.push(data)
      // 清空输入框
      this.message = ''
    },
    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  },
  watch: {
    messages () {
      setLocalStorage('chat-message', this.messages)

      // 数据改变影响视图更新不是立即的
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  }
}
</script>

<style scoped lang="less">
.user-chat {
  .message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
  }
  .send-message-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 0 14px;
    align-items: center;
    .van-field {
      width: 85%;
    }
  }
}
</style>
