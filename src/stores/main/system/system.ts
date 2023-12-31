import {
  deleteUserById,
  editUserData,
  newUserData,
  postUsersListData,
  deletePageById,
  editPageData,
  newPageData,
  postPageListData
} from '@/service/main/system/system'
// import { postStoryListData } from '@/service/main/story/story'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import { ElMessage } from 'element-plus'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    // 我们要指定userList的类型, 否则是拿不到东西的
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = parseInt(totalCount)
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      // 删完后更新一下用户列表
      this.postUsersListAction({ offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)
      if (newResult.code === 400) {
        ElMessage.warning('新建用户失败~')
      }
      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },

    // 呵呵呵
    // 呵呵呵
    ///额呵呵呵
    // 这是针对页面
    /** 针对页面的数据: 增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = parseInt(totalCount)
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
    // async postStoryListAction() {
    //   const storyListResult = await postStoryListData()
    //   const { totalCount, list } = storyListResult.data

    //   this.storyList = list
    //   this.storyTotalCount = totalCount
    // }
  }
})

export default useSystemStore
