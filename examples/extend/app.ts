import pontus from '../../src/index'

// pontus({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// pontus.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// pontus.get('/extend/get')

// pontus.options('/extend/options')

// pontus.delete('/extend/delete')

// pontus.head('/extend/head')

// pontus.post('/extend/post', { msg: 'post' })

// pontus.put('/extend/put', { msg: 'put' })

// pontus.patch('/extend/patch', { msg: 'patch-post' }, { method: 'post' })

// pontus({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// pontus('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return pontus<ResponseData<T>>('/extend/user')
    .then(res=>res.data)
    .catch(err => {console.log(err)})
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.age)
  }
}

test()