import Request from './request'
// 获取用户个人资料
export const getUserProfile = () => {
  return Request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 修改用户个人资料
export const updateUserProfile = data => {
  return Request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
// 编辑用户头像，身份证照片
export const updateUserPhoto = data => {
  return Request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
