// 非Vant版本
<!--
<template>
  <div class="search">
    <div class="search-header">
      <input
        type="text"
        class="header-search"
        placeholder="请输入搜索关键词"
        v-model="keywords"
        v-throttle="openAssociation"
        @keyup.enter="getSearchResult"
        @focus="onFocus"
      />
      <i
        class="search-icon-close iconfont icon-guanbi"
        v-show="keywords !== ''"
        @click.stop="delSearchKeyworks"
      ></i>
      <i class="search-icon-sousuo iconfont icon-sousuo"></i>
      <div class="header-close" @click.stop="closeSearch">取消</div>
    </div>
    <div class="search-result-box" v-if="isShowResult">
      <ScrollView v-model="isPullMode" @load="getSearchResultMethod">
        <ul slot="content" class="search-result">
          <li
            class="result-item"
            v-for="(value, index) in searchResult"
            :key="index"
            @click.stop="resultToDetail(value.art_id)"
          >
            {{ value.title }}
          </li>
        </ul>
      </ScrollView>
    </div>
    <ul class="search-association" v-else-if="keywords">
      <li
        class="association-item"
        v-for="value in searchAssociation"
        :key="value"
        @click="increaseKeywords(value)"
      >
        <i class="association-item-sousuo iconfont icon-sousuo"></i>
        <span class="association-title" v-html="highlight(value)"></span>
      </li>
    </ul>
    <ul class="search-history" v-else>
      <li class="history-item-title history-item">
        <span class="history-title">历史记录</span>
        <div v-if="isDeleteShow" class="history-icon">
          <span @click="delSearchHistory">全部删除</span>&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <i
          v-else
          class="history-icon iconfont icon-shanchu"
          @click.stop="isDeleteShow = true"
        ></i>
      </li>
      <li
        class="history-item"
        v-for="(value, index) in searchHistories"
        :key="index"
        @click.stop="increaseKeywords(value)"
      >
        <span class="history-title">{{ value }}</span>
        <i
          v-show="isDeleteShow"
          class="history-icon iconfont icon-guanbi"
          @click.stop="onDelete(index)"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getSearchHistory,
  delSearchHistory,
  getSearchAssociations,
  getNewDetail
} from '../api/index'
import { getSearchResults } from '../api/search'
import ScrollView from '../components/ScrollView'
import { setLocalStorage, getLocalStorage } from '../tools/index'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data () {
    return {
      searchHistories: [],
      keywords: '',
      searchAssociation: [],
      isShowResult: false,
      isPullMode: true,
      searchResult: [],
      page: 1,
      perPage: 10,
      isDeleteShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 退出搜索界面
    closeSearch () {
      this.$router.back()
    },
    // 向后台传达删除搜索历史
    async delSearchHistory () {
      await delSearchHistory()
      this.searchHistories.splice(0)
      setLocalStorage('searchHistories', [])
    },
    onDelete (index) {
      this.searchHistories.splice(index, 1)
      setLocalStorage('searchHistories', this.searchHistories)
    },
    // 开启搜索联想
    openAssociation () {
      if (this.keywords !== '') {
        getSearchAssociations(this.keywords)
          .then(data => {
            this.searchAssociation = data.data.options
            // console.log('搜索联想', this.searchAssociation)
            this.isShowResult = false
          })
          .catch(function (error) {
            console.log(error)
          })
      } else if (this.keywords === '') {
        this.isShowResult = false
      }
    },
    // 高亮关键词
    highlight (str) {
      return str.replace(
        new RegExp(this.keywords, 'gi'),
        `<span style="color: red">${this.keywords}</span>`
      )
    },
    // 按下搜索联想词或历史记录改变关键词
    increaseKeywords (value) {
      this.keywords = value
      this.getSearchResult()
    },
    // 获取搜索结果，添加搜索历史记录到本地
    getSearchResult () {
      this.isShowResult = true

      const index = this.searchHistories.indexOf(this.keywords)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }

      // 将最新的历史记录放到顶部
      this.searchHistories.unshift(this.keywords)
      // 如果用户已登陆，则把搜索历史记录存储到线上
      // 提示：只要调动湖区历史记录的数据接口，后端会自动存储用户的历史记录
      // 如果未登陆，则把搜索历史记录存储到本地
      setLocalStorage('searchHistories', this.searchHistories)
    },
    // 获取搜索历史记录
    loadSearchHistories () {
      getSearchHistory()
        .then(data => {
          let mergeSearchHistories = getLocalStorage('searchHistories') || []
          // this.searchHistories = data.data.keywords
          // console.log('searchHistory', this.searchHistory)
          if (this.user) {
            // console.log(
            //   new Set([...mergeSearchHistories, ...data.data.keywords])
            // )
            mergeSearchHistories = [
              ...new Set([...mergeSearchHistories, ...data.data.keywords])
            ]
          }
          this.searchHistories = mergeSearchHistories
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取搜索的结果
    async getSearchResultMethod () {
      if (this.keywords !== '') {
        try {
          const { data } = await getSearchResults({
            page: this.page,
            per_page: this.perPage,
            q: this.keywords
          })
          console.log(data)
          const { results } = data.data
          this.searchResult.push(...results)

          if (results.length) {
            this.page++
          } else {
            this.isPullMode = false
          }
        } catch (e) {
          this.isPullMode = false
        }
      }
    },
    // 删除关键词
    delSearchKeyworks () {
      this.keywords = ''
    },
    // 获取新闻详情
    resultToDetail (id) {
      getNewDetail(id)
        .then(data => {
          console.log('detail', data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onFocus () {
      this.isShowResult = false
    }
  },
  created () {
    // 获取搜索历史
    this.loadSearchHistories()
  },
  watch: {
    keywords (newValue, oldValue) {
      if (newValue === '') {
        this.isShowResult = false
      }
    }
  },
  directives: {
    throttle: {
      inserted: function (el, obj) {
        let timer = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timer && clearTimeout(timer)
          timer = setTimeout(function () {
            flag = true
            obj.value()
          }, 200)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f7f9;
  .search-header {
    width: 100%;
    height: 50px;
    background: #1989fa;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: space-between;
    .header-search {
      width: 90%;
      height: 30px;
      line-height: 30px;
      padding-left: 25px;
      padding-right: 25px;
      box-sizing: border-box;
    }
    .search-icon-sousuo,
    .search-icon-close {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      // left: 15px;
      color: rgba(0, 0, 0, 0.3);
    }
    .search-icon-sousuo {
      left: 15px;
    }
    .search-icon-close {
      right: 50px;
    }
    .header-close {
      color: white;
      line-height: 30px;
      font-size: 15px;
    }
  }
  .search-result-box {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    overflow: hidden;
    .search-result {
      .result-item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid #f5f7f9;
        box-sizing: border-box;
        padding-left: 15px;
        overflow: hidden;
      }
    }
  }
  .search-history {
    width: 100%;
    .history-item-title {
      .history-title {
        font-size: 15px;
      }
    }
    .history-item {
      width: 100%;
      height: 30px;
      background: white;
      margin-bottom: 2px;
      box-sizing: border-box;
      position: relative;
      .history-title {
        line-height: 30px;
        font-size: 13px;
        margin-left: 10px;
        color: #333;
      }
      .history-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(0, 0, 0, 0.5);
        font-size: 13px;
      }
    }
  }
  .search-association {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    background: white;
    .association-item {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid #f5f7f9;
      box-sizing: border-box;
      padding-left: 15px;
      overflow: hidden;
      .association-item-sousuo {
        color: rgba(0, 0, 0, 0.5);
        margin-right: 5px;
      }
      .association-title {
      }
    }
  }
}
</style>
-->
// Vant版本

<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <SearchAssociation
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></SearchAssociation>
    <SearchHistory
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @update-histories="deleteAllSearchHistories"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchAssociation from '../components/Search/SearchAssociation'
import SearchHistory from '../components/Search/SearchHistory'
import SearchResult from '../components/Search/SearchResult'
import { setLocalStorage, getLocalStorage } from '../tools/index'
import { mapState } from 'vuex'
import { getSearchHistories, deleteSearchHistories } from '../api/search'
export default {
  name: 'Search',
  components: {
    SearchAssociation,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索输入框的内容
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistories: [] // 搜索历史记录
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onFocus () {
      this.isResultShow = false
    },
    onSearch (searchText) {
      this.searchText = searchText

      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }
      // 将最新的搜索记录放到顶部
      this.searchHistories.unshift(searchText)

      // 如果用户已登陆，则把搜索历史记录存储到线上
      // 提示：只要调动湖区历史记录的数据接口，后端会自动存储用户的历史记录
      // 如果未登陆，则把搜索历史记录存储到本地
      // setLocalStorage('searchHistories', this.searchHistories)

      // 展示搜索结果
      this.isResultShow = true
    },
    async loadSearchHistories () {
      // 后端存储的搜索历史记录太少了，现在将本地的历史记录与后端记录的历史记录合并
      let mergeSearchHistories = getLocalStorage('searchHistories') || []

      if (this.user) {
        const { data } = await getSearchHistories()
        // console.log(data)
        mergeSearchHistories = [
          ...new Set([...mergeSearchHistories, ...data.data.keywords])
        ]
      }
      this.searchHistories = mergeSearchHistories
    },
    async deleteAllSearchHistories () {
      this.searchHistories = []
      await deleteSearchHistories()
    }
  },
  created () {
    this.loadSearchHistories()
  },
  watch: {
    searchHistories () {
      setLocalStorage('searchHistories', this.searchHistories)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
}
</style>
