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
}
