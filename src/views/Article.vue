// 非Vant版本

<template>
  <div class="article-container">
    <Header>
      <i
        slot="left"
        class="left iconfont icon-zuojiantou"
        @click.stop="$router.back()"
      ></i>
      <span slot="center" class="center">文章详情</span>
    </Header>
    <div class="article-box">
      <ScrollView
        v-model="isPullMode"
        @load="handleGetComments"
      >
        <div slot="content">
          <h1 class="title">
            {{ articleDetail.title }}
          </h1>
          <div class="user-info">
            <div class="info-detail">
              <img class="avatar" :src="articleDetail.aut_photo" />
              <div class="info-label">
                <p class="author">{{ articleDetail.aut_name }}</p>
                <p class="pubdate">
                  {{ articleDetail.pubdate | relativeTime }}
                </p>
              </div>
            </div>
            <button
              class="follow-btn"
              :class="{ followActive: articleDetail.is_followed }"
              @click="onFollow()"
            >
              <span v-if="!articleDetail.is_followed" class="plus">+</span>
              {{ articleDetail.is_followed ? '已关注' : '关注' }}
            </button>
          </div>
          <div
            class="markdown-body"
            v-html="articleDetail.content"
            ref="article-content"
          ></div>
          <div class="article-over">正文结束</div>
          <CommentList
            :comments="comments"
            @reply-click="onReplyClick"
          ></CommentList>
        </div>
      </ScrollView>
    </div>
    <div class="article-bottom">
      <div class="commentInput" @click="isPostShow = true">发表评论</div>
      <span class="discuss iconfont icon-pinglun">
        <div class="discuss-num">{{ totalCommentCount }}</div>
      </span>
      <span
        class="iconfont icon-shoucang"
        :class="{ spanActive: articleDetail.is_collected }"
        @click="onCollect()"
      ></span>
      <span
        class="iconfont icon-dianzan"
        :class="{ goodActive: articleDetail.attitude === 1 }"
        @click="onLike()"
      ></span>
      <span class="iconfont icon-fenxiang"></span>
    </div>
    <PostComment
      :isPostShow="isPostShow"
      :target="articleId"
      @postSuccess="onPostSuccess"
      @clostPost="clostPost"
    ></PostComment>
    <CommentReply
      :isReplyShow="isReplyShow"
      :replyComment="replyComment"
      :articleId="articleId"
      @closeReply="isReplyShow = false"
    ></CommentReply>
  </div>
</template>

<script>
import {
  getArticleDetail,
  addCollectArticle,
  deleteCollectArticle,
  addLikeArticle,
  deleteLikeArticle
} from '../api/article'
import { addFollow, deleteFollow } from '../api/index'
import { getCommenets } from '../api/comment'
import Header from '../components/Header'
import ScrollView from '../components/ScrollView'
import CommentList from '../components/Article/CommentList'
import PostComment from '../components/Article/PostComment'
import CommentReply from '../components/Article/CommentReply'
import '../assets/css/github-markdown.css'
import { ImagePreview } from 'vant'
export default {
  name: 'Article',
  components: {
    Header,
    ScrollView,
    CommentList,
    PostComment,
    CommentReply
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      articleDetail: {},
      isPullMode: true,
      offset: null,
      limit: 10,
      comments: [],
      isPostShow: false,
      totalCommentCount: 0, // 评论总数量
      isReplyShow: false,
      replyComment: {}
    }
  },
  created () {
    this.loadArticleDetail()
  },
  methods: {
    async loadArticleDetail () {
      const { data } = await getArticleDetail(this.articleId)
      this.articleDetail = data.data

      // 数据articleDetail刚被赋值，在修改数据之后马上操作被该数据影响的视图DOM元素，需要把操作代码放到 $nextTick 中
      this.$nextTick(() => {
        this.handlePreviewImg()
      })
    },
    handlePreviewImg () {
      // 1.获取文章内容 DOM 容器
      const articleContent = this.$refs['article-content']
      // 2.得到所有的img元素
      const imgs = articleContent.querySelectorAll('img')
      // 3.循环img列表，给每一个img注册click事件
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          // 4.在事件处理函数中调用 ImagePreview() 预览
          ImagePreview({
            images: imgPaths,
            startPosition: index // 起始位置
          })
        }
      })
    },
    async onFollow () {
      if (this.articleDetail.is_followed) {
        // 已关注，取消关注
        await deleteFollow(this.articleDetail.aut_id)
      } else {
        // 未关注，进行关注
        await addFollow(this.articleDetail.aut_id)
      }
      this.articleDetail.is_followed = !this.articleDetail.is_followed
    },
    async onCollect () {
      this.$toast('操作中...')
      if (this.articleDetail.is_collected) {
        // 已收藏，取消收藏
        await deleteCollectArticle(this.articleId)
        this.$toast('取消收藏')
      } else {
        // 未收藏，进行收藏
        await addCollectArticle(this.articleId)
        this.$toast('收藏成功')
      }
      this.articleDetail.is_collected = !this.articleDetail.is_collected
    },
    async onLike () {
      this.$toast('操作中...')
      if (this.articleDetail.attitude === 1) {
        // 点赞状态，取消点赞
        await deleteLikeArticle(this.articleId)
        this.$toast('取消点赞')
        this.articleDetail.attitude = 0
      } else {
        // 没有点赞，添加点赞
        await addLikeArticle(this.articleId)
        this.$toast('点赞成功')
        this.articleDetail.attitude = 1
      }
    },
    async handleGetComments () {
      const { data } = await getCommenets({
        type: 'a',
        source: this.articleId,
        offset: this.offset,
        limit: this.limit
      })
      // console.log(data)
      this.totalCommentCount = data.data.total_count
      const { results } = data.data
      this.comments.push(...results)
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.isPullMode = false
      }
    },
    onPostSuccess (comment) {
      this.comments.unshift(comment)
      // 更新评论的总数
      this.totalCommentCount++
      this.isPostShow = false
    },
    clostPost () {
      this.isPostShow = false
    },
    onReplyClick (comment) {
      this.isReplyShow = true
      this.replyComment = comment
      // console.log('replyComment', this.replyComment)
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .left,
  .center {
    color: white;
  }
  .article-box {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    .title {
      font-size: 20px;
      color: #3a3a3a;
      padding: 14px;
      background: #fff;
      margin: 0;
    }
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px;
      background: #fff;
      .info-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .info-label {
          .author {
            font-size: 12px;
            color: rgb(75, 64, 64);
          }
          .pubdate {
            font-size: 11px;
            color: #b4b4b4;
          }
        }
      }
      .follow-btn {
        width: 85px;
        height: 29px;
        align-items: center;
        border-radius: 20px;
        border: none;
        background: rgb(73, 174, 241);
        color: white;
        .plus {
          color: white;
          font-size: 15px;
        }
      }
      .followActive {
        background: none;
        color: black;
        border: 1px solid #3a3a3a;
        .plus {
          color: black;
        }
      }
    }
    .markdown-body {
      padding: 14px;
      background-color: #fff;
    }
    .article-over {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: white;
      font-size: 15px;
      color: #777;
      &::before {
        content: '-----------------';
      }
      &::after {
        content: '-----------------';
      }
    }
  }
  .article-bottom {
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
    .discuss {
      position: relative;
      .discuss-num {
        position: absolute;
        top: -10px;
        left: 10px;
        background: red;
        border-radius: 35%;
        padding: 2px;
        font-size: 10px;
        box-sizing: border-box;
      }
    }
    .commentInput {
      width: 150px;
      height: 35px;
      line-height: 35px;
      color: #777;
      border: 1px solid #777;
      border-radius: 20px;
      box-sizing: border-box;
      padding-left: 10px;
      span {
        font-size: 30px;
        color: #777;
      }
    }
    .goodActive {
      color: #ff69b4;
    }
  }
}
</style>

// Vant版本
<!--
<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="article-wrap">
      <h1 class="title">
        {{ articleDetail.title }}
      </h1>
      <van-cell center class="user-info">
        <div class="author" slot="title">{{ articleDetail.aut_name }}</div>
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="articleDetail.aut_photo"
        />
        <div slot="label" class="pubdate">
          {{ articleDetail.pubdate | relativeTime }}
        </div>
        <van-button
          class="follow-btn"
          :icon="articleDetail.is_followed ? '' : 'plus'"
          :type="articleDetail.is_followed ? 'default' : 'info'"
          round
          size="small"
          :loading="isFollowLoading"
          @click="onFollow()"
        >
          {{ articleDetail.is_followed ? '已关注' : '关注' }}</van-button
        >
      </van-cell>
      <div
        class="markdown-body"
        v-html="articleDetail.content"
        ref="article-content"
      ></div>
      <CommentList
        :source="articleId"
        type="a"
        :list="commentList"
        @update-total-count="totalCommentCount = $event"
        @reply-click="onReplyClick"
      ></CommentList>
    </div>
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
      <van-icon
        :name="articleDetail.is_collected ? 'star' : 'star-o'"
        :color="articleDetail.is_collected ? 'red' : '#777'"
        @click.stop="onCollect()"
      />
      <van-icon
        :name="articleDetail.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="articleDetail.attitude === 1 ? '#ff69b4' : '#777'"
        @click="onLike()"
      />
      <van-icon name="share" color="#777" />
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment
        :target="articleId"
        @post-success="onPostSuccess"
      ></PostComment>
    </van-popup>
    <van-popup v-model="isReplyShow" position="bottom">
      <CommentReply
        v-if="isReplyShow"
        :replyComment="replyComment"
        @close="isReplyShow = false"
        :articleId="articleId"
      ></CommentReply>
    </van-popup>
  </div>
</template>

<script>
// 在组件中获取动态路由参数
//   方式一： this.$route.params.xxx
//   方式二： props传参，推荐
import {
  getArticleDetail,
  addCollectArticle,
  deleteCollectArticle,
  addLikeArticle,
  deleteLikeArticle
} from '../api/article'
import '../assets/css/github-markdown.css'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '../api/index'
import CommentList from '../components/Article/CommentList'
import PostComment from '../components/Article/PostComment'
import CommentReply from '../components/Article/CommentReply'
export default {
  name: 'Article',
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      articleDetail: {}, // 文章数据对象
      isFollowLoading: false, // 关注用户按钮的loading状态
      isPostShow: false, // 控制发布评论的显示状态
      commentList: [],
      totalCommentCount: 0, // 评论总数量
      isReplyShow: false,
      replyComment: {} // 控制评论回复的显示状态
    }
  },
  created () {
    this.loadArticleDetail()
  },
  methods: {
    async loadArticleDetail () {
      const { data } = await getArticleDetail(this.articleId)
      this.articleDetail = data.data

      // 数据改变影响视图（DOM元素）不是立即的，如果需要在修改数据之后马上操作被该数据影响的视图DOM元素，需要把这个代码放到 $nextTick 中
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    handlePerviewImage () {
      // 1.获取文章内容 DOM 容器
      const articleContent = this.$refs['article-content']

      // 2.得到所有的img标签
      const imgs = articleContent.querySelectorAll('img')

      // 3.循环img列表，给img注册点击事件
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          // 4.在事件处理函数中调用 ImagePreview() 预览
          ImagePreview({
            images: imgPaths,
            startPosition: index // 起始位置
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      if (this.articleDetail.is_followed) {
        // 已关注，取消关注
        await deleteFollow(this.articleDetail.aut_id)
      } else {
        // 未关注，进行关注
        await addFollow(this.articleDetail.aut_id)
      }
      this.articleDetail.is_followed = !this.articleDetail.is_followed
      this.isFollowLoading = false
    },
    async onCollect () {
      this.$toast('操作中...')
      if (this.articleDetail.is_collected) {
        // 已收藏，取消收藏
        await deleteCollectArticle(this.articleId)
        this.$toast('取消收藏')
      } else {
        // 未收藏，进行收藏
        await addCollectArticle(this.articleId)
        this.$toast('收藏成功')
      }
      this.articleDetail.is_collected = !this.articleDetail.is_collected
    },
    async onLike () {
      this.$toast('操作中...')
      if (this.articleDetail.attitude === 1) {
        // 点赞状态，取消点赞
        await deleteLikeArticle(this.articleId)
        this.$toast('取消点赞')
        this.articleDetail.attitude = 0
      } else {
        // 没有点赞，添加点赞
        await addLikeArticle(this.articleId)
        this.$toast('点赞成功')
        this.articleDetail.attitude = 1
      }
    },
    onPostSuccess (comment) {
      // console.log(comment)
      // 把发表成功的评论数据对象放到评论列表顶部
      this.commentList.unshift(comment)
      // 更新评论的zongshul
      this.totalCommentCount++
      // 关闭发布评论弹出层
      this.isPostShow = false
    },
    onReplyClick (comment) {
      console.log('reply', comment)
      // 显示回复内容
      this.isReplyShow = true
      this.replyComment = comment
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  overflow-y: auto;
  .app-nav-bar {
    background: #1989fa;
    /deep/.van-icon {
      color: white;
    }
    /deep/.van-nav-bar__title {
      color: white;
    }
  }
  .article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
    .title {
      font-size: 20px;
      color: #3a3a3a;
      padding: 14px;
      background: #fff;
      margin: 0;
    }
    .user-info {
      .author {
        font-size: 12px;
        color: #333;
      }
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .pubdate {
        font-size: 11px;
        color: #b4b4b4;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }
    .markdown-body {
      padding: 14px;
      background-color: #fff;
    }
  }
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
      width: 150px;
      height: 30px;
      border: 1px solid #777;
      border-radius: 20px;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 10px;
      }
    }
  }
}
</style>
-->
