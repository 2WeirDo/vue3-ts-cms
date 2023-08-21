import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'

// 防止敲错
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  // 如何指定state的类型?
  state: (): ILoginState => ({
    // 没有值就是空字符串
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    // 用户信息
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
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

      // 5.页面跳转(main页面)
      router.push('/main')
    }
  }
})

export default useLoginStore
