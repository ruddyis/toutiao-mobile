import { getLocalStorage } from '../tools/index'
import {
  USER,
  COLLECT_OR_HISTORY,
  COLLECT_DATA,
  HISTORY_DATA,
  BIRTHDAY
} from './state-type'
export default {
  user: getLocalStorage(USER),
  cachePages: ['Container'],
  collectOrHistory: getLocalStorage(COLLECT_OR_HISTORY),
  currentUser: {},
  isShowChooseList: false,
  collectData: getLocalStorage(COLLECT_DATA),
  historyData: getLocalStorage(HISTORY_DATA),
  birthday: getLocalStorage(BIRTHDAY),
  myChannels: []
}
