import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function login(data) {
  return request({
    headers: {
      'Authorization': 'Basic YXBwOmFwcA==',
      'tenant_code': 0
    },
    url: '/whale-auth/oauth/token',
    method: 'post',
    data
  })
}

export function getMenus(roleIds) {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/menus/getSysMenuByRoleIds',
    method: 'post',
    data: roleIds
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
