import request from '@/utils/request'

export function getRechargeList(data) {
  return request({
    url: '/business/order/get_recharge_list',
    method: 'post',
    data: data
  })
}

export function getWithdrawalList(data) {
  return request({
    url: '/business/order/get_withdrawal_list',
    method: 'post',
    data: data
  })
}

export function getPayList(data) {
  return request({
    url: '/business/order/get_pay_list',
    method: 'post',
    data: data
  })
}

export function getRewardList(data) {
  return request({
    url: '/business/order/get_reward_list',
    method: 'post',
    data: data
  })
}

