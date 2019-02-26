import request from '@/utils/request'

export function login(name, pwd, code) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      name,
      pwd,
      code
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
