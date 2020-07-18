import request from '@/utils/request'

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

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
