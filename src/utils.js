export function deepMerge( target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      target[key] = deepMerge(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}
