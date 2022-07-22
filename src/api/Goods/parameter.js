import request from '@/utils/index'
export const getCategoriesList = (id, sel) => {
  return request({
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}

export const postCategoriesTag = (data) => {
  return request({

    url: `categories/${data.id}/attributes/${data.attrId}`,
    method: 'PUT',
    data
  })
}

export const delCategoriesTag = (id, attrid) => {
  return request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'DELETE'
  })
}
