import {
  USER,
  COLLECT_OR_HISTORY,
  COLLECT_DATA,
  HISTORY_DATA,
  BIRTHDAY
} from './state-type'
import {
  SET_USER,
  SET_COLLECT_OR_HISTORY,
  SET_CURRENT_USER,
  SET_CHOOSE_LIST,
  SET_COLLECT_DATA,
  SET_HISTORY_DATA,
  SET_BIRTHDAY,
  SET_MY_CHANNELS,
  ADD_CACHE_PAGE,
  REMOVE_CACHE_PAGE
} from './mutations-type'
import { setLocalStorage } from '../tools/index'
// import state from './state'
export default {
  [SET_USER] (state, flag) {
    state.user = flag
    setLocalStorage(USER, state.user)
  },
  [SET_COLLECT_OR_HISTORY] (state, num) {
    setLocalStorage(COLLECT_OR_HISTORY, num)
    state.collectOrHistory = num
  },
  [SET_CURRENT_USER] (state, obj) {
    state.currentUser = obj
  },
  [SET_CHOOSE_LIST] (state, flag) {
    state.isShowChooseList = flag
  },
  [SET_COLLECT_DATA] (state, list) {
    state.collectData = list
    setLocalStorage(COLLECT_DATA, list)
  },
  [SET_HISTORY_DATA] (state, list) {
    state.historyData = list
    setLocalStorage(HISTORY_DATA, list)
  },
  [SET_BIRTHDAY] (state, str) {
    state.birthday = str
    setLocalStorage(BIRTHDAY, str)
  },
  [SET_MY_CHANNELS] (state, list) {
    state.myChannels = list
  },
  // 添加缓存页面
  [ADD_CACHE_PAGE] (state, pageName) {
    if (!state.cachePages.includes(pageName)) {
      state.cachePages.push(pageName)
    }
  },
  // 移除缓存页面
  [REMOVE_CACHE_PAGE] (state, pageName) {
    const index = state.cachePages.includes(pageName)
    if (index !== -1) {
      state.cachePages.splice(index, 1)
    }
  }
}
