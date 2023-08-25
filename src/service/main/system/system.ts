import hyRequest from '@/service'

/** 用户的网络请求 */

// 请求用户列表
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

// 删除用户
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `users/${id}`
  })
}
