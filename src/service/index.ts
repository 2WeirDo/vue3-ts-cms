import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

export const hyRequest = new HYRequest({
  // 传递特定拦截器
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 因为原本传递的类型中没有interceptors这个属性, 我们就要针对于原本类型进行拓展
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer' + localCache.getCache(LOGIN_TOKEN)
      }
      return config
    },
    requestFailureFn: (err) => {
      return err
    },
    responseSuccessFn: (res) => {
      return res
    },
    responseFailureFn: (err) => {
      return err
    }
  }
})

export default hyRequest
