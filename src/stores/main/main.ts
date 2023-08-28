// 可能会在很多地方用到的, 我们放在main主目录下

import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    // 我们可以提前准备好这些数据, 比如在登录成功后就发起这些请求
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentsResult = await getEntireDepartments()

      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsResult.data.list
    }
  }
})

export default useMainStore
