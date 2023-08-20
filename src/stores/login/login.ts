import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'

// 防止敲错
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: () => ({
    // 没有值就是空字符串
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {}
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token

      // 2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 4.页面跳转(main页面)
      router.push('/main')
    }
  }
})

export default useLoginStore
