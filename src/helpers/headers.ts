import { isPlainObject } from './util'

// 格式化Header的key，比如normalizeHeaderName({content-type: xxx }, 'Content-Type'); 被转换后就是Content-Type: xxx
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any) {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    // 假如没有设置Content-Type，则初始化设置以下内容
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
