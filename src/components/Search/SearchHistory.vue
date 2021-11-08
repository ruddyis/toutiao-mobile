<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click.stop="$emit('update-histories')">全部删除</span>&nbsp;
        <span @click.stop="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    &nbsp;&nbsp;
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click.stop="$emit('search', history)"
    >
      <van-icon
        v-show="isDeleteShow"
        name="close"
        @click.stop="onDelete(index)"
      />
    </van-cell>
  </div>
</template>

<script>
// import { setLocalStorage } from '../../tools/index'
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteShow: false // 删除的显示状态
    }
  },
  props: {
    searchHistories: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    onDelete (index) {
      this.searchHistories.splice(index, 1)
      // 数据持久化
      // 1.删除本地存储的数据；2.请求接口，删除线上数据
      // 无论是否登陆，都先将数据持久化到本地；如果已登陆，删除线上的历史记录
      // 没有删除单个历史记录的接口，只有删除全部历史记录的接口
      // setLocalStorage('searchHistories', this.searchHistories) //通过父组件的watch加载了
    }
  }
}
</script>
<style></style>
