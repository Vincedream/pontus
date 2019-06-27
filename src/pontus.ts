import { PontusInstance } from './types'
import Pontus from './core/Pontus'
import { extend } from './helpers/util'

function createInstance(): PontusInstance {
  const context = new Pontus()
  const instance = Pontus.prototype.request.bind(context)

  extend(instance, context)

  return instance as PontusInstance
}

const pontus = createInstance()

export default pontus
