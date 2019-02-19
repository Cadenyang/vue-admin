import request from '@/utils/request'

export default {
  getUserList() {
    return request({
      url: '/user/security/get_security_info',
      method: 'post'
    })
  },
  getMessage(data) {
    return request({
      url: '/sms/send_auth/index',
      method: 'post',
      data
    })
  },
  changPassword(data) {
    return request({
      url: '/user/password/update',
      method: 'post',
      data
    })
  }
}
