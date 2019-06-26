import { PontusRequestConfig, PontusPromise, PontusResponse } from '../types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import xhr from './xhr'

export default function dispatchRequest(config: PontusRequestConfig): PontusPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 前置处理请求config
function processConfig(config: PontusRequestConfig): void {
  // 顺序不能变
  config.url = transFormURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 调用buildURL，将params转换为url
function transFormURL(config: PontusRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 处理Headers
function transformHeaders(config: PontusRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 调用transformRequest，将object类型转换为JSON，赋给post请求中的data
function transformRequestData(config: PontusRequestConfig): any {
  return transformRequest(config.data)
}

function transformResponseData(res: PontusResponse): PontusResponse {
  res.data = transformResponse(res.data)
  return res
}