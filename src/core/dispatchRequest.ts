import { PontusRequestConfig, PontusPromise, PontusResponse } from '../types'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'
import xhr from './xhr'

export default function dispatchRequest(config: PontusRequestConfig): PontusPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 前置处理请求config
function processConfig(config: PontusRequestConfig): void {
  // 顺序不能变
  config.url = transFormURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 调用buildURL，将params转换为url
function transFormURL(config: PontusRequestConfig): string {
  const { url, params, paramsSerializer } = config
  return buildURL(url!, params, paramsSerializer)
}

// // 处理Headers
// function transformHeaders(config: PontusRequestConfig): any {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

// // 调用transformRequest，将object类型转换为JSON，赋给post请求中的data
// function transformRequestData(config: PontusRequestConfig): any {
//   return transformRequest(config.data)
// }

function transformResponseData(res: PontusResponse): PontusResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: PontusRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
