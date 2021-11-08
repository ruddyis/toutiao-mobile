/*
搜索请求相关模块
*/
import Request from './request'
// 获取搜索联想建议
export const getSearchAssociations = q => {
  return Request({
    method: 'GET',
    url: 'v1_0/suggestion',
    params: {
      q // 联想建议关键词
    }
  })
}
// 获取搜索结果
export const getSearchResults = params => {
  return Request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
// 获取用户搜索历史
export const getSearchHistories = () => {
  return Request({
    method: 'GET',
    url: '/v1_0/search/histories'
  })
}
// 删除用户搜索历史
export const deleteSearchHistories = () => {
  return Request({
    method: 'DELETE',
    url: '/v1_0/search/histories'
  })
}
