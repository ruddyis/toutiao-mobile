import {
  SET_USER,
  SET_COLLECT_OR_HISTORY,
  SET_CURRENT_USER,
  SET_CHOOSE_LIST,
  SET_COLLECT_DATA,
  SET_HISTORY_DATA,
  SET_BIRTHDAY,
  SET_MY_CHANNELS
} from './mutations-type'
export default {
  setUser ({ commit }, flag) {
    commit(SET_USER, flag)
  },
  setCollectOrHistory ({ commit }, num) {
    commit(SET_COLLECT_OR_HISTORY, num)
  },
  setCurrentUser ({ commit }, obj) {
    commit(SET_CURRENT_USER, obj)
  },
  setChooseList ({ commit }, flag) {
    commit(SET_CHOOSE_LIST, flag)
  },
  setCollectData ({ commit }, list) {
    commit(SET_COLLECT_DATA, list)
  },
  setHistoryData ({ commit }, list) {
    commit(SET_HISTORY_DATA, list)
  },
  setBirthday ({ commit }, str) {
    commit(SET_BIRTHDAY, str)
  },
  setMyChannels ({ commit }, list) {
    commit(SET_MY_CHANNELS, list)
  }
}
