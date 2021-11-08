// 文章评论相关请求模块
import Request from './request'
// 获取评论或评论回复
export const getCommenets = params => {
  return Request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
// 对评论或评论回复点赞
export const addCommentLike = commentId => {
  return Request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
// 取消对评论或评论回复点赞
export const deleteCommentLike = commentId => {
  return Request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${commentId}`
  })
}
// 添加评论或评论回复
export const addComment = data => {
  return Request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
