import request from '@/utils/index'

/**
 *登录
 * @param {*} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}

/**
 *获取用户列表
 * @param {*} param0
 * @returns
 */
export const getUserList = ({ pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      pagenum,
      pagesize
    }
  })
}

/**
 *添加用户数据
 * @param {添加用户数据} data
 * @returns
 */
export const setUserList = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}

/**
 *修改用户状态
 * @param {*} param0
 * @returns
 */
export const putUserList = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}

/**
 *根据id查找用户信息
 * @param {用户id} id
 * @returns
 */
export const searchUserInfo = (id) => {
  return request({
    url: `users/${id}`
  })
}

/**
 *修改用户信息
 * @param {*} data
 * @returns
 */
export const changeUserInfo = (data) => {
  return request({
    method: 'PUT',
    url: `users/${data.id}`,
    data
  })
}

/**
 *删除单个用户信息
 * @param {单个id} id
 * @returns
 */
export const delUserInfo = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}
