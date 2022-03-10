function deep(target, map = new Map()) {
  if (target && typeof target === 'object') {
    let val = map.get(target);
    if (val) return val;
    if (Array.isArray(target)) {
      val = [];
      map.set(target, val)
      target.forEach((item, index) => {
        val[index] = deep(item, map)
      })
    } else {
      val = {}
      map.set(target, val)
      Object.keys(target).forEach(key => {val[key] = deep(target[key], map)})
    }
    return val;
  } else {
    return target;
  }
}

const obj = {
  a: 1,
  b: ['e', 'f', 'g'],
  c: { h: { i: 2 } },
  d: function() { }
}
obj.b.push(obj.c)
obj.c.j = obj.b

const a4 = deep(obj)
console.log(a4);