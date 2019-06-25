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
  | 'pstch'
  | 'PATCH'

export interface PontusRequestConfig {
  url: string
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
