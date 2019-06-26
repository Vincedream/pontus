import { PontusRequestConfig, PontusResponse } from '../types'

export class PontusError extends Error {
  isPontusError: boolean
  config: PontusRequestConfig
  code?: string | null
  request?: any
  response?: PontusResponse

  constructor(
    message: string,
    config: PontusRequestConfig,
    code?: string | null,
    request?: any,
    response?: PontusResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isPontusError = true

    Object.setPrototypeOf(this, PontusError.prototype)
  }
}

export function createError(
  message: string,
  config: PontusRequestConfig,
  code?: string | null,
  request?: any,
  response?: PontusResponse
) {
  const error = new PontusError(message, config, code, request, response)
  return error
}
