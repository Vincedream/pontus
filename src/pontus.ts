import { PontusRequestConfig, PontusStatic } from './types'
import Pontus from './core/Pontus'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: PontusRequestConfig): PontusStatic {
  const context = new Pontus(config)
  const instance = Pontus.prototype.request.bind(context)

  extend(instance, context)

  return instance as PontusStatic
}

const pontus = createInstance(defaults)

pontus.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default pontus
