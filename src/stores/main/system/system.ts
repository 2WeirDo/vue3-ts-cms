import { postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    // 我们要指定userList的类型, 否则是拿不到东西的
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await this.deleteUserByIdAction(id)
      // 删完后更新一下用户列表
      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
