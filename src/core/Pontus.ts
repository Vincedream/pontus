import {
  PontusPromise,
  PontusRequestConfig,
  PontusResponse,
  Method,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'

interface Interceptors {
  request: InterceptorManager<PontusRequestConfig>
  response: InterceptorManager<PontusResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: PontusRequestConfig) => PontusPromise)
  rejected?: RejectedFn
}

export default class Pontus {
  interceptors: Interceptors

  constructor() {
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
