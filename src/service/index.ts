import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'

const req = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // 这个请求就没有添加拦截器, 用的就是默认拦截器
})

export const hyRequest = new HYRequest({
  // 传递特定拦截器
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 因为原本传递的类型中没有interceptors这个属性, 我们就要针对于原本类型进行拓展
  interceptors: {
    requestSuccessFn: (config) => {
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
