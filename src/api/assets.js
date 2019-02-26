import request from '@/utils/request'

export default {
  getAssetsList() {
    return request({
      url: '/assets/amount/index',
      method: 'post'
    })
  },
  getWaterList(data) {
    return request({
      url: '/assets/amount/get_water_page',
      method: 'post',
      data: data
    })
  }
}

