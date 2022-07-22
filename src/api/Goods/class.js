import request from '@/utils/index'
export const getGoodsList = ({ type, pagenum, pagesize }) => {
  return request({
    url: 'categories',
    params: { type, pagenum, pagesize }
  })
}

export const postAddGoods = (data) => {
  return request({
    url: 'categories',
    method: 'POST',
    data
  })
}
