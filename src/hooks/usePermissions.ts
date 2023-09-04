import useLoginStore from '@/stores/login/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  // 转为bool值
  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
