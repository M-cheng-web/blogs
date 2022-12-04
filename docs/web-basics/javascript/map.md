# Map/Set/weakMap

## Set
创建一个空集合,并不是键值对形式,会去重
``` js
// 其他的API和 Map一致 没有get方法
let a = new Set(['val1', 'val2', 'val2'])
```

### WeakSet
和 WeakMap 类似是弱映射,只能传入对象,当传入的对象没有被引用的时候就会被垃圾回收
``` js
const a = new WeakSet()
const b = { name: { age: 123 }, xxx: 333 }
const c = { name: { xx: 111 } }
a.add(c.name)
a.add(b.name)
a.add({})

console.log('start', a); // 长度为3
delete c.name

setTimeout(() => {
  console.log('end', a); // 长度为1, 只保留 b.name
}, 10000)
```

## Map
是强映射,键值都可以是基础值也可以是对象,这就导致了它与 WeakMap 的差异( 并不能做到自动回收,需要手动清除 )
``` js
// 当重复的时候,后面的键值会替换前面的
let key1 = { id: 1 }
let a = new Map([
  [key1, 'val1'],
  ['key1', 'val1'],
  ['key1', 'val2'],
  ['key3', 'val3'],
])
console.log(a.size); // 3
console.log(a.has('key1')); // true
console.log(a.get('key1')); // val1
console.log(a.delete('key1')); // true
console.log(a.set('key4', 'val4')); // 返回添加后的map
console.log(a.clear()); // 清空所有键值对
```

选择Object 还是 Map
+ Map 比 Object 多存储50%的键值对
+ 插入 Map 在所有浏览器中一般会稍微快一点,如果涉及大量插入推荐Map
+ 大量删除操作,选择Map

## WeakMap
弱映射,一种新的集合类型,**键只能是Object或者继承Object的类型**

::: tip
WeakMap 之所以限制只能用对象作为键,是为了保证只有通过键对象的引用才能取得值<br>
如果允许原始值那就没办法区分初始化时使用的字符串字面量和初始化之后使用的一个相等的字符串了

因为 WeakMap 是凭借引用值作为键,当这个引用值地址没有任何对象维护就会被回收,然后就会将 WeakMap 中对应的键值删除,如果是按照值传递做不到这一点
:::

``` js
// 其他用法和Map类似 没有 clear 和 size
let key1 = { id: 1 }
let a = new WeakMap([
  [key1, 'val1'],
])
console.log(a.get(key1)); // val1
```

### 弱键
键不属于正式的引用,不会阻止垃圾回收<br>
但是值并不是这样,**只要键存在**,键/值就会存在于映射中,并被当做对值的引用,因此不会被垃圾回收
``` js
// 这里直接将 {} 作为键,因为没有指向这个对象的引用所以在这行代码执行完后这个对象会被
// 当做垃圾回收,然后这个键值对就从弱映射中消失,使其成为一个空映射
// 因为值也没有被引用,所以在这对键值对被破坏后,值本身也会成为垃圾回收的目标
let a = new WeakMap()
a.set({}, 'val')
console.log(a); // 这里还是会有的,还没有被回收
setTimeout(() => {
  console.log(a); // 这里就完全边空了,已被回收
}, 10000)
```

这里因为 key1对象维护着一个弱映射键的引用,所以这个对象不会被回收<br>
如果调用了 removeId就会被回收程序清理
``` js
let key1 = {id:{}}
let a = new WeakMap()
a.set(key1.id, 'val')
console.log(a);
setTimeout(() => {
  console.log(a);
}, 10000)

function removeId() {
  key1.id = null
}
```

### 使用例子
下面的代码执行后页面会被改变,原来的DOM树会被删掉,但Map中还保存着按钮的引用,
所以对应的DOM节点会一直在内存中,除非手动删除或者等到Map实例被销毁
``` js
const m = new Map(); 
const loginButton = document.querySelector('#login'); 
m.set(loginButton, {disabled: true});
```

如果用的是WeakMap,垃圾回收程序就可以释放其内存
``` js
const wm = new WeakMap(); 
const loginButton = document.querySelector('#login'); 
wm.set(loginButton, {disabled: true});
```