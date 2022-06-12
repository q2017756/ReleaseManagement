/**
 * 项目管理相关接口
 */

import httpRequest from '@/request/index.js'

// 列表查询
export const getPublishList = (params) => {
  return httpRequest({
    method: 'POST',
    url: '/v1/api/getPublishList',
    data: params
  })
}

// 列表查询
export const getPublishInfo = (params) => {
  return httpRequest({
    method: 'POST',
    url: '/v1/api/getPublishInfo',
    data: params
  })
}

// 部署
export const deployPublish = (params) => {
  return httpRequest({
    method: 'POST',
    url: '/v1/api/deploy',
    data: params
  })
}

// ssh连接情况
export const testGitSSH = (params) => {
  return httpRequest({
    method: 'POST',
    url: '/v1/api/testGitSSH',
    data: params
  })
}
