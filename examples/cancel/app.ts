import pontus, { Canceler } from '../../src/index'

const CancelToken = pontus.CancelToken
const source = CancelToken.source()

pontus.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (pontus.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  pontus.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (pontus.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

pontus.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (pontus.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
