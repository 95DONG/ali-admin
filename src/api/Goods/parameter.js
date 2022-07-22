import request from '@/utils/index'
export const getCategoriesList = (id, sel) => {
  return request({
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}
