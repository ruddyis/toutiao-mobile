<template>
  <div class="search-association">
    <van-cell
      icon="search"
      v-for="(association, index) in associations"
      :key="index"
      @click.stop="$emit('search', association)"
    >
      <div slot="title" v-html="highlight(association)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchAssociations } from '../../api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchAssociation',
  props: {
    searchText: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      associations: []
    }
  },
  watch: {
    // 监视的完整写法
    searchText: {
      // 当数据发生变化则会执行 handler 处理函数
      handler: debounce(async function () {
        // 找到数据接口
        // 请求获取数据
        // 模块绑定展示
        const { data } = await getSearchAssociations(this.searchText)
        // console.log(data)
        this.associations = data.data.options
      }, 200),

      // 该回调函数将会在侦听开始之后立即被执行
      immediate: true
    }
  },
  methods: {
    highlight (str) {
      // 正则表达式 /中间的内容/ 会被当做正则表达式匹配字符对待
      // RegExp是正则表达式的构造函数，参数1：字符串；参数2：匹配模式；返回值：正则对象
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color: red">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style></style>
