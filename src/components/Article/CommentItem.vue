// 非Vant版本

<template>
  <div class="comment-item">
    <div class="comment-info">
      <img class="avatar" :src="comment.aut_photo" alt="" />
      <div class="info-detail">
        <p class="name">{{ comment.aut_name }}</p>
        <div class="content">{{ comment.content }}</div>
        <div class="label">
          <span class="time">
            {{ comment.pubdate | datetime('MM-DD HH:mm') }}</span
          >
          <button class="reply-btn" @click="$emit('reply-click', comment)">{{ comment.reply_count }}回复</button>
        </div>
      </div>
    </div>
    <p @click="onCommentLike()" class="like">
      <span
        class="like-icon iconfont icon-dianzan"
        :class="{'liked': comment.is_liking}"
      ></span>
      <span class="like-count">{{ comment.like_count }}</span>
    </p>
  </div>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '../../api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    async onCommentLike () {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await deleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        await addCommentLike(commentId)
        this.comment.like_count++
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  .comment-info {
    display: flex;
    justify-content: flex-start;
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 13px;
    }
    .info-detail {
      .name {
        margin: 0;
        font-size: 14px;
        color: #406599;
        margin-bottom: 5px;
      }
      .content {
        font-size: 16px;
        color: #222;
        margin-bottom: 7px;
      }
      .label {
        display: flex;
        align-items: center;
        .time {
          font-size: 9px;
          color: #222;
          margin-right: 10px;
        }
        .reply-btn {
          border: none;
          background: white;
          font-size: 10px;
        }
      }
    }
  }
  .like {
    .like-icon {
      font-size: 15px;
      margin: 0;
      &.liked{
        color: #ff69b4;
      }
    }
    .like-count {
      font-size: 15px;
    }
  }
}
</style>

// Vant版本
<!--
<template>
  <van-cell class="comment-item">
    <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title">
      <div class="title-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap" @click="onCommentLike()">
          <van-icon
            class="like-icon"
            :color="comment.is_liking ? '#ff69b4' : '#777'"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          />
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>
      <div class="content">
        {{ comment.content }}
      </div>
    </div>
    <div slot="label" class="label">
      <span class="pubdate">{{
        comment.pubdate | datetime('MM:DD HH:mm')
      }}</span>
      <van-button
        class="reply-btn"
        round
        size="mini"
        @click="$emit('reply-click', comment)"
        >{{ comment.reply_count }}回复</van-button
      >
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '../../api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    async onCommentLike () {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await deleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        await addCommentLike(commentId)
        this.comment.like_count++
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .title {
    .title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 14px;
        color: #406599;
      }
      .like-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        .like-icon {
          margin-right: 5px;
        }
        .like-count {
        }
      }
    }
    .content {
      font-size: 16px;
      color: #222;
    }
  }
  .label {
    display: flex;
    align-items: center;
    .pubdate {
      font-size: 9px;
      color: #222;
      margin-right: 10px;
    }
    .reply-btn {
    }
  }
}
</style>
-->
