import request from '@/utils/request'

export default {
  tradeSwitch (data) {
    return request({
      url: '/user/security/trade_switch',
			method: 'post',
			data
    })
	}
}
