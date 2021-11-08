import Network from './network'
import Request from './request'
// import store from '../store/index'
export const getLogin = data => Network.post('v1_0/authorizations', data)
// 获取验证码
export const getSms = data => Network.get(`v1_0/sms/codes/${data}`)
// 获取登陆用户信息方法一（已在network文件的请求拦截器中手动添加了headers）
// export const getCurrentUser = () => Network.get('/app/v1_0/user')
// 获取登陆用户信息方法二
// export const getCurrentUser = () => {
//   return request({
//     method: 'GET',
//     url: '/app/v1_0/user',
//     headers: {
//       Authorization: `Bearer ${store.state.user.token}`
//     }
//   })
// }
// 获取登陆用户信息方法三（已在request文件的请求拦截器中手动添加了headers）
export const getCurrentUser = () => {
  return Request({
    method: 'GET',
    url: 'v1_0/user'
  })
}
// 获取用户个人资料（Edit界面）
export const getEdit = () => Network.get('v1_0/user/profile')
export const getCollect = () => Network.get('v1_0/article/collections')
export const getHistory = () => Network.get('v1_0/user/histories')
// 编辑用户个人资料
export const setUserData = data => {
  return Request({
    method: 'PATCH',
    url: `v1_0/user/profile?${data}`
  })
}
// 关注用户
export const addFollow = userId => {
  return Request({
    method: 'POST',
    url: 'v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
export const deleteFollow = userId => {
  return Request({
    method: 'DELETE',
    url: `v1_0/user/followings/${userId}`
  })
}
// 获取用户频道
export const getChannels = () => Network.get('v1_0/user/channels')
// 获取用户搜索历史
export const getSearchHistory = () => Network.get('v1_0/search/histories')
// 删除用户搜索历史
export const delSearchHistory = () => {
  return Request({
    method: 'DELETE',
    url: 'v1_0/search/histories'
  })
}
// 获取搜索联想
export const getSearchAssociations = data =>
  Network.get(`v1_0/suggestion?q=${data}`)
// 获取搜索的结果
export const getSearchResult = data => Network.get(`v1_0/search?q=${data}`)
// 获取新闻文章详情
export const getNewDetail = data => Network.get(`v1_0/articles/${data}`)
