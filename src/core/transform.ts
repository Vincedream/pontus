import { PontusTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: PontusTransformer | PontusTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
