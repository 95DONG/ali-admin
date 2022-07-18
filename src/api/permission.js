import request from '@/utils/index'
export const getPermissionList = (type) => {
  return request({ url: `rights/${type}` })
}
