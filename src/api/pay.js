import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getPayQr(data) {
  return request({
    url: '/whale-pay/payOrder/createPay',
    method: 'post',
    data
  })
}

export function getPagePay(data) {
  return request({
    url: '/whale-pay/payOrder/createPage',
    method: 'post',
    data
  })
}

export function refundOrder(data) {
  return request({
    url: '/whale-pay/payOrder/refund',
    method: 'post',
    data
  })
}

export function downLoadBillURL(data) {
  return request({
    url: '/whale-pay/payOrder/downLoadBillURL',
    method: 'post',
    data
  })
}

export function getBill(url) {
  return request({
    url: url,
    method: 'get',
    responseType: 'blob'
  })
}
