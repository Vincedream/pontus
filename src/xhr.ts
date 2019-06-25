import { PontusRequestConfig } from './types'

export default function xhr(config: PontusRequestConfig) {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)
  Object.keys(headers).forEach(name => {
    request.setRequestHeader(name, headers[name])
  })

  request.send(data)
}
