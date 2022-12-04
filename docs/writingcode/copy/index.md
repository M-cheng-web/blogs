# 深浅拷贝实现

## 浅拷贝
浅拷贝实现的方式很多,但都是鸡肋的,毕竟没有哪个需求是专门需要浅拷贝的吧...
``` js
function clone1(target) {
  if (target!=null && typeof target==='object') {
    if (target instanceof Array) {
      // return target.slice()
      // return target.filter(() => true)
      // return target.map(item => item)
      return [...target]
    } else {
      // return Object.assign({}, target)
      return {...target}
    } 
  }
  return target
}
```

## 深拷贝
### 极简版
存在的问题:
+ 函数属性会丢失
+ 循环引用会出错(互相引用对方)
``` js
function deepClone1(target) {
  return JSON.parse(JSON.stringify(target))
}
```

### 基础版
解决问题: 函数属性会丢失
存在的问题: 循环引用会出错
``` js
function deepClone2(target) {
  if (target !== null && typeof target === 'object') {
    const cloneTarget = target instanceof Array ? [] : {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = deepClone2(target[key])
      }
    }
    return cloneTarget
  }
  return target
}
```

### 加强版
解决问题: 循环引用正常
``` js
function deepClone3(target, map = new Map()) {
  if (target !== null && typeof target === 'object') {
    let cloneTarget = map.get(target); // 从缓存容器中读取克隆对象
    if (cloneTarget) return cloneTarget; // 如果存在, 返回前面缓存的克隆对象
    cloneTarget = target instanceof Array ? [] : {}; // 创建克隆对象(可能是{}或者[])
    map.set(target, cloneTarget) // 缓存到map中
    for (const key in target) {
      // 递归调用, 深度克隆对象, 且传入缓存容器map
      if (target.hasOwnProperty(key)) cloneTarget[key] = deepClone3(target[key], map);
    }
    return cloneTarget
  }
  return target
}
```

### 最终版
解决问题: 上面的俩个问题都解决了,此外优化了`for in`的循环,因为`for in`会一直遍历到`Object`
``` js
function deep4(target, map = new Map) {
  if (target !== null && typeof target === 'object') {
    let res = map.get(target)
    if (res) return res;
    if (target instanceof Array) {
      res = []
      map.set(target, res)
      target.forEach((item, index) => { res[index] = deep4(item, map) })
    } else {
      res = {}
      map.set(target, res)
      Object.keys(target).forEach((key) => { res[key] = deep4(target[key], map) })
    }
    return res
  }
  return target
}
```

### 自测
``` js
const obj = {
  a: 1,
  b: ['e', 'f', 'g'],
  c: { h: { i: 2 } },
  d: function() { }
}
obj.b.push(obj.c)
obj.c.j = obj.b

const a4 = deep4(obj)
console.log(a4);
```
