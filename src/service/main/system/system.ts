import hyRequest from '@/service'

/** 用户的网络请求 */
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
