import {
  PontusPromise,
  PontusRequestConfig,
  PontusResponse,
  Method,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest, { transFormURL } from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<PontusRequestConfig>
  response: InterceptorManager<PontusResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: PontusRequestConfig) => PontusPromise)
  rejected?: RejectedFn
}

export default class Pontus {
  defaults: PontusRequestConfig
  interceptors: Interceptors

  constructor(initConfig: PontusRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<PontusRequestConfig>(),
      response: new InterceptorManager<PontusResponse>()
    }
  }

  request(url: any, config?: any): PontusPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config)
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptors => {
      chain.unshift(interceptors)
    })

    this.interceptors.response.forEach(interceptors => {
      chain.push(interceptors)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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

  getUri(config?: PontusRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transFormURL(config!)
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
