import { PontusPromise, PontusRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Pontus {
  request(config: PontusRequestConfig): PontusPromise {
    return dispatchRequest(config)
  }

  get(url: string, config?: PontusRequestConfig): PontusPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: PontusRequestConfig): PontusPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: PontusRequestConfig): PontusPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: PontusRequestConfig): PontusPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: PontusRequestConfig): PontusPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: PontusRequestConfig): PontusPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: PontusRequestConfig): PontusPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: PontusRequestConfig) {
    return this.request({
      ...config,
      ...{
        method,
        url
      }
    })
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: PontusRequestConfig) {
    return this.request({
      ...config,
      ...{
        method,
        url,
        data
      }
    })
  }
}
