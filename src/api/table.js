import request from '@/utils/request'

export function getTableData(data) {
  return request({
    url: '/table/getTableData',
    method: 'post',
    data
  })
}

export function getTableTotal(params) {
  return request({
    url: '/table/getTableTotal',
    method: 'get',
    params
  })
}

export function addTableData(data) {
  return request({
    url: '/table/addTableData',
    method: 'post',
    data
  })
}

export function getOneTableData(data) {
  return request({
    url: '/table/getOneTableData',
    method: 'post',
    data
  })
}

export function updateTableData(data) {
  return request({
    url: '/table/updateTableData',
    method: 'put',
    data
  })
}

export function delTableData(data) {
  return request({
    url: '/table/delTableData',
    method: 'delete',
    data
  })
}

export function excelExport(data) {
  return request({
    url: '/table/excelExport',
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function getChildrenData(data) {
  return request({
    url: '/table/getChildrenData',
    method: 'post',
    data
  })
}
