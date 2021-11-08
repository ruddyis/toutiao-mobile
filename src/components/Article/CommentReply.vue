// 非Vant版本

<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="comment-reply" v-if="isReplyShow">
      <div class="overlay" @click.stop="closeReply"></div>
      <div class="reply-box">
        <Header class="header">
          <i
            slot="left"
            class="header-left iconfont icon-guanbi1"
            @click.stop.prevent="closeReply"
          ></i>
          <span class="header-center" slot="center"
            >{{ replyComment.reply_count }}条回复</span
          >
        </Header>
        <div class="reply-content">
          <ScrollView v-model="isPullMode" @load="handleGetReplyComments">
            <div slot="content">
              <CommentItem :comment="replyComment"></CommentItem>
              <CommentList :comments="replyComments"></CommentList>
            </div>
          </ScrollView>
        </div>
        <div class="reply-bottom">
          <div class="commentInput" @click="isPostShow = true">发表评论</div>
        </div>
      </div>
      <PostComment
        :isPostShow="isPostShow"
        :target="replyComment.com_id"
        :articleId="articleId"
        @clostPost="clostPost"
        @postSuccess="onPostSuccess"
      ></PostComment>
    </div>
  </transition>
</template>

<script>
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import Header from '../Header'
import CommentItem from './CommentItem'
import CommentList from './CommentList'
import ScrollView from '../ScrollView'
import PostComment from './PostComment'
import { getCommenets } from '../../api/comment'
export default {
  name: 'CommentReply',
  components: {
    Header,
    CommentItem,
    CommentList,
    ScrollView,
    PostComment
  },
  props: {
    isReplyShow: {
      type: Boolean,
      default: false,
      required: true
    },
    replyComment: {
      type: Object,
      default: () => {},
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      isPullMode: true,
      offset: null,
      limit: 10,
      replyComments: [],
      isPostShow: false
    }
  },
  methods: {
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
    closeReply () {
      this.$emit('closeReply')
    },
    async handleGetReplyComments () {
      const { data } = await getCommenets({
        type: 'c',
        source: this.replyComment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // console.log('getReplyComments', data)
      const { results } = data.data
      this.replyComments.push(...results)
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.isPullMode = false
      }
    },
    clostPost () {
      this.isPostShow = false
    },
    onPostSuccess (comment) {
      this.replyComments.unshift(comment)
      this.replyComment.reply_count++
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-reply {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(122, 122, 124, 0.5);
  .overlay {
    width: 100%;
    height: 100%;
  }
  .reply-box {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    .header {
      background: white;
      .header-left {
        color: #3296fa;
      }
    }
    .reply-content {
      position: fixed;
      top: 150px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 14px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .reply-bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 50px;
      background: white;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #777;
      .commentInput {
        width: 150px;
        height: 35px;
        line-height: 35px;
        color: #777;
        border: 1px solid #777;
        border-radius: 20px;
        box-sizing: border-box;
        text-align: center;
        span {
          font-size: 30px;
          color: #777;
        }
      }
    }
  }
}
</style>

// Vant版本
<!--
<template>
  <div class="comment-reply">
    <van-nav-bar :title="`${replyComment.reply_count}` + '条回复'">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <CommentItem :comment="replyComment"></CommentItem>
    <van-cell title="所有回复"> </van-cell>
    <CommentList
      :source="replyComment.com_id"
      :list="replyCommentList"
      type="c"
    ></CommentList>
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment
        :target="replyComment.com_id"
        :articleId="articleId"
        @post-success="onPostSuccess"
      ></PostComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import CommentList from './CommentList'
import PostComment from './PostComment'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    replyComment: {
      type: Object,
      default: () => {},
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      replyCommentList: []
    }
  },
  methods: {
    onPostSuccess (newReplyComment) {
      this.replyCommentList.unshift(newReplyComment)
      this.replyComment.reply_count++
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
.article-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #777;
  .comment-btn {
    width: 200px;
    height: 30px;
    border: 1px solid #777;
    border-radius: 20px;
  }
}
</style>
-->
