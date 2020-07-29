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

export function getUserById() {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/sysCustomer/getUserById',
    method: 'get'
  })
}

export function getUserPage(data) {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/sysCustomer/getUserPage',
    method: 'post',
    data
  })
}

export function addCustomer(data) {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/sysCustomer/saveOrUpdate',
    method: 'post',
    data
  })
}

export function deleteCustomer(userId) {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/sysCustomer/deleteUser',
    method: 'get',
    params: { userId: userId }
  })
}
