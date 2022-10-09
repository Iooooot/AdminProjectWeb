import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/basicInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function sendEmail(data) {
  return request({
    url: '/user/sendFindPwdEmail',
    method: 'post',
    data
  })
}

export function getCodeImg() {
  return request({
    url: '/user/verifyCode',
    method: 'get'
  })
}

export function verifyEmail(data) {
  return request({
    url: '/user/verifyEmail',
    method: 'post',
    data
  })
}


export function resetPwd(data) {
  return request({
    url: '/user/resetPwd',
    method: 'post',
    data
  })
}
