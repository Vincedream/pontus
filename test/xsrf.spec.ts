import pontus from '../src/index'
import { getAjaxRequest } from './helper'

describe('xsrf', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
    document.cookie =
      pontus.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
  })

  test('should not set xsrf header if cookie is null', () => {
    pontus('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[pontus.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header if cookie is set', () => {
    document.cookie = pontus.defaults.xsrfCookieName + '=12345'

    pontus('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[pontus.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })

  test('should not set xsrf header for cross origin', () => {
    document.cookie = pontus.defaults.xsrfCookieName + '=12345'

    pontus('http://example.com/')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[pontus.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header for cross origin when using withCredentials', () => {
    document.cookie = pontus.defaults.xsrfCookieName + '=12345'

    pontus('http://example.com/', {
      withCredentials: true
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[pontus.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })
})
