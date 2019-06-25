import pontus from '../../src/index'

pontus({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

pontus({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

pontus({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

pontus({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

pontus({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

pontus({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

pontus({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

// pontus({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// pontus({
//   method: 'post',
//   url: '/base/post',
//   // headers: {
//   //   'content-type': 'application/json;charset=utf-8'
//   // },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])

// pontus({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })


// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// pontus({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// pontus({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// }).then((res) => {
//   console.log(res)
// })

// pontus({
//   method: 'post',
//   url: '/base/post',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then((res) => {
//   console.log(res)
// })
