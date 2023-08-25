import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// 因为这里由于服务器返回的时间是零时区的时间，而中国的时间是东八区的，也就是时间需要偏移8个小时
// 所以我们要用到utc模式转换时间
dayjs.extend(utc)

export function formatUTC(utcString: string, format: string = 'YYYY/MM/DD HH:mm') {
  // 这里传入的格式是个默认值, 用户可以自己决定传入的格式
  // 这里utcOffset(8)就是给加上八个小时
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
