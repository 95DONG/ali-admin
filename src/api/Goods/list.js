import request from '@/utils/index'
export const getGoodsLists = (data) => {
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
