import request from '@/utils/index'
export const getGoodsList = (data) => {
  return request({
    url: 'goods',
    params: data
  })
}

export const dleGoodsList = (id) => {
  return request({
    url: `goods/${id}`,
    method: 'DELETE'
  })
}
