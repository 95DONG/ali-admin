import request from '@/utils/index'
export const getOrderList = (params) => {
  return request({
    url: 'orders',
    params
  })
}
