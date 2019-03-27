import request from '@/utils/request'

export function login(name, pwd, areaCode, authcode) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      name,
      pwd,
      areaCode,
      authcode
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/app/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
