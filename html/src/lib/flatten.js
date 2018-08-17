function flattenObject (ob) {
  let toReturn = {}

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) {
      continue
    }

    if ((typeof ob[i]) === 'object') {
      let flatObject = flattenObject(ob[i])
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue
        }
        toReturn[i + '.' + x] = flatObject[x]
      }
    } else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}

module.exports = {
  tree (signalKState) {
    const flat = flattenObject(signalKState)

    return Object
      .keys(flat)
      .reduce((list, key) => {
        if (key.includes('value')) {
          list.push(key)
        }
        return list
      }, [])
      .reduce((obj, key) => {
        obj[key.replace('.value', '')] = flat[key]
        return obj
      }, {})
  },

  delta (payload) {
    const result = {
      context: Object.isObject(payload, 'context') ? payload.context : 'vessels.self',
      mutations: {}
    }

    if (Object.isObject(payload) && Array.isArray(payload.updates)) {
      payload.updates.forEach(update => {
        if (Object.isObject(update) && Array.isArray(update.values)) {
          update.values.forEach(mutation => {
            if (!Object.isObject(mutation.value)) {
              result.mutations[mutation.path] = mutation.value
            } else {
              Object.keys(mutation.value).forEach(leaf => {
                result.mutations[`${mutation.path}.${leaf}`] = mutation.value[leaf]
              })
            }
          })
        }
      })
    }

    return result
  }
}
