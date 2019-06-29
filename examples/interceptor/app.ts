import pontus from '../../src/index'

pontus.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
pontus.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
pontus.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

pontus.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = pontus.interceptors.response.use(res => {
  res.data += '2'
  return res
})
pontus.interceptors.response.use(res => {
  res.data += '3'
  return res
})

pontus.interceptors.response.eject(interceptor)

pontus({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})
