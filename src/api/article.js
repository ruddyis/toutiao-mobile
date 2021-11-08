/*
文章相关请求模块
*/
// import Network from './network'
import Request from './request'

// 频道新闻推荐/获取频道文章列表
// export const getChannelNew = (id, time, topOrNot) =>
//   Network.get(
//     `v1_1/articles?channel_id=${id}&timestamp=${time}&with_top=${topOrNot}`
//   ) // 在channnel组件的非vant版本中使用
export const getChannelNew = params => {
  return Request({
    method: 'GET',
    url: 'v1_1/articles',
    params
  })
}
// 获取文章详情
export const getArticleDetail = articleId => {
  return Request({
    method: 'GET',
    url: `v1_0/articles/${articleId}`
  })
}
// 收藏文章
export const addCollectArticle = articleId => {
  return Request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}
// 取消收藏文章
export const deleteCollectArticle = articleId => {
  return Request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${articleId}`
  })
}
// 点赞文章
export const addLikeArticle = articleId => {
  return Request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
// 取消点赞
export const deleteLikeArticle = articleId => {
  return Request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${articleId}`
  })
}
