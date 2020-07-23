import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getRoutesPage(data) {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/sysRole/getRolesPage',
    method: 'post',
    data
  })
}

export function getRolesList() {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/sysRole/getRolesList',
    method: 'get'
  })
}

export function saveOrUpdate(data) {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/sysRole/saveOrUpdate',
    method: 'post',
    data
  })
}

export function deleteById(id) {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: `/whale-user/sysRole/deleteById`,
    method: 'get',
    params: { id: id }
  })
}

