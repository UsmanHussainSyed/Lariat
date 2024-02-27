export function mapSyncModel(data = 'model', prop = 'value') {
  return {
    [prop](propValue) {
      this[data] = propValue
    },
    [data](dataValue) {
      if (prop === 'value') this.$emit('input', dataValue)
      else this.$emit(`update:${prop}`, dataValue)
    },
  }
}

export function debounce(func, wait) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

export function makeMutations(...arr) {
  return arr.reduce((obj, key) => {
    obj[key] = (state, value) => assignValue(state, key, value)

    return obj
  }, {})
}

function assignValue(src, key, value) {
  const paths = key.split('.')

  if (!src) return

  if (paths.length === 1) src[paths[0]] = value
  else assignValue(src[paths[0]], paths.slice(1).join('.'), value)
}

let timeout
export function _debounce(func, wait) {
  clearTimeout(timeout)
  timeout = setTimeout(func, wait)
}
// clones an object or nested object
export function clone(obj) {
  if (obj === null || typeof obj !== 'object' || obj instanceof File) return obj

  const temp = new obj.constructor()
  for (const key in obj) temp[key] = clone(obj[key])

  return temp
}
export function checkIsEqual(val, newval) {
  //  check two nestesd data structure is equal
  return JSON.stringify(val) === JSON.stringify(newval)
}
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '')
}
/**
 * Date a end day
 * Date b start day
 * @param DateA Date @param DateB Date
 * @returns Date difference
 */
export function getDateDifference(dateA, DateB, type = 'month') {
  const END_DAY = new Date(dateA)
  const START_DAY = new Date(DateB)
  let calculatedDateBy
  let returnDateDiff
  if (type === 'month') {
    const startMonth = START_DAY.getMonth()
    const endMonth = END_DAY.getMonth()
    calculatedDateBy = startMonth - endMonth
    returnDateDiff = Math.abs(
      calculatedDateBy + 12 * (START_DAY.getFullYear() - END_DAY.getFullYear())
    )
  } else {
    calculatedDateBy = Math.abs(START_DAY - END_DAY)
    returnDateDiff = Math.ceil(calculatedDateBy / (1000 * 60 * 60 * 24))
  }
  return returnDateDiff
}
