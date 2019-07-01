import pontus, { PontusTransformer } from '../../src/index'
import qs from 'qs'

// pontus.defaults.headers.common['test2'] = 123

// pontus({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// pontus({
//   transformRequest: [(function(data) {
//     return qs.stringify(data)
//   }), ...(pontus.defaults.transformRequest as PontusTransformer[])],
//   transformResponse: [...(pontus.defaults.transformResponse as PontusTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })

const instance = pontus.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(pontus.defaults.transformRequest as PontusTransformer[])],
  transformResponse: [...(pontus.defaults.transformResponse as PontusTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
