import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getSysMenusPage(data) {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/menus/getSysMenusPage', // 假地址 自行替换
    method: 'post',
    data
  })
}

export function getSysMenusList() {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/menus/getSysMenusList', // 假地址 自行替换
    method: 'get'
  })
}

export function saveOrUpdate(data) {
  return request({
    headers: {
      'Authorization': getToken()
    },
    url: '/whale-user/menus/saveOrUpdate', // 假地址 自行替换
    method: 'post',
    data
  })
}
