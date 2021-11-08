// import { getLocalStorage } from '../tools/index'
export default {
  user (state) {
    return state.user
  },
  collectOrHistory (state) {
    return state.collectOrHistory
  },
  currentUser (state) {
    return state.currentUser
  },
  isShowChooseList (state) {
    return state.isShowChooseList
  },
  collectData (state) {
    return state.collectData
  },
  historyData (state) {
    return state.historyData
  },
  birthday (state) {
    return state.birthday
  },
  myChannels (state) {
    return state.myChannels
  }
}
