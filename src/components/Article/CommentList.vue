// 非Vant版本

<template>
  <div class="comment-list">
    <h3>全部评论</h3>
        <CommentItem
          slot="content"
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
          @reply-click="$emit('reply-click', $event)"
        ></CommentItem>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.comment-list {
  padding: 14px;
  background: white;
}
</style>

// Vant版本
<!--
<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommenets } from '../../api/comment'
import CommentItem from './CommentItem'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a',
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getCommenets({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // console.log('commentList', data)
      this.$emit('update-total-count', data.data.total_count)
      // 2.把数据放到列表中
      const { results } = data.data
      // console.log(results)
      this.list.push(...results)
      // 3.将本次的loading关闭
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style></style>
-->
