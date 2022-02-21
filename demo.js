function deep(data, map = new Map) {
  if (data !== null && typeof data === 'object') {
    let res = map.get(data)
    if (res) return res
    if (data instanceof Array) {
      res = []
      map.set(data, res)
      data.forEach((item, index) => { res[index] = deep(item, map) })
    } else {
      res = {}
      map.set(data, res)
      Object.keys(data).forEach((key) => { res[key] = deep(data[key], map) })
    }
    return res;
  }
  return data
}

const a = {
  name: 'asd',
  age: 12,
}

console.log(deep(a));