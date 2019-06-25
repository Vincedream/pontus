import { PontusRequestConfig, PontusPromise, PontusResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: PontusRequestConfig): PontusPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      console.log(request)

      const reponseHeaders = parseHeaders(request.getAllResponseHeaders())

      const responseData = responseType !== 'text' ? request.response : request.responseText

      const response: PontusResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: reponseHeaders,
        config,
        request
      }
      resolve(response)
    }

    // 网络错误捕获
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
