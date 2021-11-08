/*
频道相关请求列表
*/
import Request from './request'
// 获取所有的频道
export const getAllChannels = () => {
  return Request({
    method: 'GET',
    url: 'v1_0/channels'
  })
}
// 批量修改用户频道列表（部分覆盖）
// 本接口对收到的用户频道 新增的保存，原有的覆盖顺序序号，但不会删除未涉及到的用户频道。
export const addUserChannel = data => {
  return Request({
    method: 'PATCH',
    url: 'v1_0/user/channels',
    data
  })
}
// 删除用户指定频道
export const deleteUserChannel = channelId => {
  return Request({
    method: 'DELETE',
    url: `v1_0/user/channels/${channelId}`
  })
}
