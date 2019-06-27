export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface PontusRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface PontusResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: PontusRequestConfig
  request: any
}

export interface PontusPromise extends Promise<PontusResponse> {}

export interface PontusError extends Error {
  isPontusError: boolean
  config: PontusRequestConfig
  code?: string | null
  request?: any
  response?: PontusResponse
}

export interface Pontus {
  request(config: PontusRequestConfig): PontusPromise

  get(url: string, config?: PontusRequestConfig): PontusPromise
  delete(url: string, config?: PontusRequestConfig): PontusPromise
  head(url: string, config?: PontusRequestConfig): PontusPromise
  options(url: string, config?: PontusRequestConfig): PontusPromise
  post(url: string, data?: any, config?: PontusRequestConfig): PontusPromise
  put(url: string, data?: any, config?: PontusRequestConfig): PontusPromise
  patch(url: string, data?: any, config?: PontusRequestConfig): PontusPromise
}

export interface PontusInstance extends Pontus {
  (config: PontusRequestConfig): PontusPromise

  (url: string, config?: PontusRequestConfig): PontusPromise
}
