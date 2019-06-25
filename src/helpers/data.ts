import { isPlainObject } from './util'

// 将object对象转换为JSON格式
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 将后端返回的json格式转换为Object
export function transformReponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // TODO
    }
  }
  return data
}

// 假设后端返回的数据符合json格式，则转换为object
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // todo
    }
  }
  return data
}
