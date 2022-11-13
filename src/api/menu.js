import request from '@/utils/request'

export function buildMenus() {
  return request({
    url: 'menus/build',
    method: 'get'
  })
}
export function getMenusIdByRoleId(params) {
  return request({
    url: 'menus/getMenusIdByRoleId',
    method: 'get',
    params
  })
}

export function getRootAllocMenus() {
  return request({
    url: 'menus/getRootAllocMenus',
    method: 'get'
  })
}

export function getChildAllocMenus(params) {
  return request({
    url: 'menus/getChildAllocMenus',
    method: 'get',
    params
  })
}

export function getAllocMenus() {
  return request({
    url: 'menus/getAllocMenus',
    method: 'get'
  })
}

export function allocMenus(data) {
  return request({
    url: 'menus/allocMenus',
    method: 'post',
    data
  })
}

