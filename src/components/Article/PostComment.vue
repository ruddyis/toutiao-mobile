// 非Vant版本

<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="post-comment" v-if="isPostShow">
      <div class="overlay" @click="clostPost"></div>
      <div class="post-wrap">
        <textarea
          class="text-box"
          type="text"
          rows="50"
          v-model="message"
          :maxLength="maxLength"
        />
        <span class="checkWord">{{ tempLength }} / {{ maxLength }}</span>
        <button class="text-btn" :disabled="!message" @click.prevent="onPost()">
          发布
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { addComment } from '../../api/comment'
export default {
  name: 'PostComment',
  data () {
    return {
      message: '', // 输入框内容
      maxLength: 50 // 输入框的最大字符限制
    }
  },
  computed: {
    // 输入框的字符长度
    tempLength () {
      return this.message.length
    }
  },
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: false,
      default: null
    },
    isPostShow: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async onPost () {
      this.$toast(['发布中...'])
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      // console.log(data)
      this.$emit('postSuccess', data.data.new_obj)
      this.$toast(['发布成功'])
      this.message = ''
    },
    enter (el, done) {
      Velocity(el, 'transition.slideUpBigIn', { duration: 1000 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideUpBigOut', { duration: 1000 }, function () {
        done()
      })
    },
    clostPost () {
      this.$emit('clostPost')
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(122, 122, 124, 0.5);
  .overlay{
    width: 100%;
    height: 100%;
  }
  .post-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    padding: 14px;
    box-sizing: border-box;
    .text-box {
      width: 75%;
      height: 80%;
      padding: 14px;
      margin-right: 15px;
      border: 1px solid rgba(122, 122, 124, 0.5);
    }
    .checkWord {
      position: absolute;
      left: 70%;
      bottom: 10px;
      color: rgba(122, 122, 124, 0.8);
    }
    .text-btn {
      background: none;
      border: 1px solid 1px solid rgba(122, 122, 124, 0.5);
    }
  }
}
</style>

// Vant版本
<!--
<template>
  <div class="post-comment">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button size="mini" @click="onPost()" :disabled="!message"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '../../api/comment'
export default {
  name: 'PostComment',
  data () {
    return {
      message: ''
    }
  },
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
      required: false
    }
  },
  methods: {
    async onPost () {
      this.$toast(['发布中...'])
      // 找到数据接口
      // 请求提交数据
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      // console.log(data)
      // 处理响应结果
      this.$emit('post-success', data.data.new_obj)
      this.$toast(['发布成功'])
      // 发布成功，清空文本框内容
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 14px;
  .van-field {
    width: 90%;
  }
}
</style>
-->
