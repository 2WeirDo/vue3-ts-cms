import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { mapMenusToRoutes } from '@/utils/map-menus'

// 防止敲错
import { LOGIN_TOKEN } from '@/global/constants'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  // 如何指定state的类型?
  state: (): ILoginState => ({
    token: '',
    // 用户信息
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token
      // 注意这里我们要先获取到token才能进行后续操作
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      // console.log(this.userInfo.role)

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusResult.data

      // 4.进行本地缓存
      // 这里单纯不想存proxy对象
      localCache.setCache('userInfo', userInfoResult.data)
      localCache.setCache('userMenus', userMenusResult.data)

      // 5.请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 5.动态添加路由(重要)
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 6.页面跳转(main页面)
      router.push('/main')
      ElMessage.success('您已登录成功~~')
    },

    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        // 说明用户已经登录
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1.请求最新角色和部门数据(因为这两个很多地方会用到, 最好提前请求)(当然也可以缓存, 不过没必要, 因为时时刻刻会更新)
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
