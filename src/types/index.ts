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
  transformRequest?: PontusTransformer | PontusTransformer[]
  transformResponse?: PontusTransformer | PontusTransformer[]

  [propName: string]: any
}

export interface PontusResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: PontusRequestConfig
  request: any
}

export interface PontusPromise<T = any> extends Promise<PontusResponse<T>> {}

export interface PontusError extends Error {
  isPontusError: boolean
  config: PontusRequestConfig
  code?: string | null
  request?: any
  response?: PontusResponse
}

export interface Pontus {
  defaults: PontusRequestConfig
  interceptors: {
    request: PontusInterceptorManager<PontusRequestConfig>
    response: PontusInterceptorManager<PontusResponse>
  }

  request<T = any>(config: PontusRequestConfig): PontusPromise<T>

  get<T = any>(url: string, config?: PontusRequestConfig): PontusPromise<T>
  delete<T = any>(url: string, config?: PontusRequestConfig): PontusPromise<T>
  head<T = any>(url: string, config?: PontusRequestConfig): PontusPromise<T>
  options<T = any>(url: string, config?: PontusRequestConfig): PontusPromise<T>
  post<T = any>(url: string, data?: any, config?: PontusRequestConfig): PontusPromise<T>
  put<T = any>(url: string, data?: any, config?: PontusRequestConfig): PontusPromise<T>
  patch<T = any>(url: string, data?: any, config?: PontusRequestConfig): PontusPromise<T>
}

export interface PontusInstance extends Pontus {
  <T = any>(config: PontusRequestConfig): PontusPromise<T>

  <T = any>(url: string, config?: PontusRequestConfig): PontusPromise<T>
}

export interface PontusInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface PontusTransformer {
  (data: any, headers?: any): any
}
