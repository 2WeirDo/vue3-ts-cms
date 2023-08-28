import hyRequest from '..'

// 获取所有角色
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

// 获取所有部门
export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}
