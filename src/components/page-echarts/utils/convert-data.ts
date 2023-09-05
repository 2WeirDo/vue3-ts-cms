import { coordinateData } from './coordinate-data'

// 将输入数据中的特定元素与地理坐标信息关联，
// 并将它们重新组织为一个新的数组，以便后续使用
export function convertData(data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
