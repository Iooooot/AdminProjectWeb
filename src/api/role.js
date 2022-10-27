import request from '@/utils/request'

export function getAllRoles() {
  return request({
    url: '/role/getAllRoles',
    method: 'get'
  })
}
export function changeRoles(data) {
  return request({
    url: '/user/changeRoles',
    method: 'post',
    data
  })
}

