import request from '@/utils/index'

/**
 *获取角色列表
 * @returns
 */
export const getRolesList = () => {
  return request({
    url: 'roles'
  })
}
/**
 *删除角色指定权限
 * @param {*} param0
 * @returns
 */
export const delRolesControl = (data) => {
  return request({
    url: `roles/${data.roleId}/rights/${data.rightId}`,
    method: 'DELETE'

  })
}

/**
 *角色授权
 * @param {角色ID} data
 * @returns
 */
export const postRolesControl = (roleId) => {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'POST'
  })
}

export const postRolesControls = (roleId, rids) => {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'POST',
    data: { rids }
  })
}

/**
 *添加角色
 * @returns
 */
export const postRoleName = ({ roleName }) => {
  return request({
    url: 'roles',
    method: 'POST',
    data: {
      roleName
    }
  })
}

/**
 *添加角色
 * @returns
 */
export const delRoleName = (id) => {
  return request({
    url: `roles/${id}`,
    method: 'DELETE'
  })
}
