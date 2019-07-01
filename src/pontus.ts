import { PontusInstance, PontusRequestConfig } from './types'
import Pontus from './core/Pontus'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: PontusRequestConfig): PontusInstance {
  const context = new Pontus(config)
  const instance = Pontus.prototype.request.bind(context)

  extend(instance, context)

  return instance as PontusInstance
}

const pontus = createInstance(defaults)

export default pontus
