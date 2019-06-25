import { PontusRequestConfig, PontusPromise } from './types'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

function pontus(config: PontusRequestConfig): PontusPromise {
  processConfig(config)
  return xhr(config)
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
  return buildURL(url, params)
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

export default pontus
