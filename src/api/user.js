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

export const putUserList = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}
