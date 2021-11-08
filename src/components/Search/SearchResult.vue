<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in results"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '../../api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      results: [],
      loading: false,
      finished: false,

      page: 1, // 页码
      perPage: 10 // 每页大小
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })
      console.log(data)
      // 2.将数据放到数据列表中
      const { results } = data.data
      this.results.push(...results)
      // 3.关闭本次的loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        // 如果有，则更新获取下一页数据的页码
        this.page++
      } else {
        // 没有，把finished设置为true，关闭加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  top: 54px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
