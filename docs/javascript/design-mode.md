# 设计模式

## 工厂模式

::: tip
`Create` 类就相当于一个工厂,避免了使用者和被调用的直接接触

优势:
1. 降低耦合<br>
如果没有这个工厂类我们使用 `Work` 类时需要一个个引用,当我们需要更改 `Work` 类名会需要在全局一个个去修改,这无疑是特别麻烦的,还有内部逻辑的不兼容改动迫使外部使用者的逻辑改动,如果场景繁多且逻辑复杂需要一个个去辨别,对于改动者和使用者都是浪费时间和心智
2. 降低使用负担<br>
不用关心内部实现原理,使用者需要什么直接向工厂拿,所以一些逻辑复杂但是目的明确的功能都可以放到工厂中
:::

``` js
class Work {
  constructor (name) {
    this.name = name
  }
  init () {
    alert('init')
  }
  fun1 () {
    alert(this.name)
  }
  fun2 () {
    alert('fun2')
  }
}

class Create {
  create (name) {
    return new Work(name)
  }
}

var p = new Create().create('cheng')
p.fun1()
```

## 发布订阅模式

::: tip
观察者模式是观察者直接观察目标对象,没有中介层,而发布订阅模式多了一个中介层,发布者和订阅者依赖于中介层,并不直接通信

优势:
1. 低耦合
2. 无约束(发布者和订阅者没有其他约束)

实际场景: vue的 `$on` 和 `$emit`
:::

``` js
class Vue {
  constructor() {
    this.obList = {}
  }
  // 发布事件
  $on(name, fun) {
    if (!this.obList[name]) this.obList[name] = []
    this.obList[name].push(fun)
  }
  // 订阅事件
  $emit(name, ...args) {
    if (this.obList[name]) {
      this.obList[name].forEach(obs => { obs(...args) })
    } else {
      console.log('没有此事件')
    }
  }
  // 关闭某种事件下的某个发布
  $off(name, fun) {
    if (this.obList[name]) {
      const index = this.obList[name].findIndex(obs => fun === obs)
      if (index === -1) {
        console.log('没有此事件')
      } else {
        this.obList[name].splice(index, 1)
      }
    }
  }
  // 关闭某种事件
  $offAll(name) {
    delete this.obList[name]
  }
}

// 测试
const vue = new Vue()

vue.$on('show', (name, age) => {
  console.log('show - 01', name, age);
})
vue.$on('show', (name, age) => {
  console.log('show - 02', name, age);
})

vue.$emit('show', '成新', 1223)
```

## 观察者模式

::: tip
demo中每更改了被观察的对象属性,就会触发观察者的 `update` 方法

优势:
1. 被观察元素改变时主动通知<br>
每个被观察类内部的元素发生改变都会触发观察者对应方法,目前 demo 不够自动,如果加上 `proxy` 或者 `object.defineProperty` 监听元素改变后触发被观察者的 `setState` 方法,然后其再触发观察者 `update` 方法,这样一套流程就很自动了
2. 一对多<br>
其是一对多的关系,意思是有多个观察者监听着同一个数据,当这个数据发生改变时会通知到每个观察者然后作出不同动作

实际场景: MVVM,promise监听,watch(vue),vue生命周期
:::

``` js
class Subject {
  constructor () {
    this.state = 0
    this.observers = []
  }
  getState () {
    return this.state
  }
  setState (state) {
    this.state = state
    this.notAllObser()
  }
  notAllObser () {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
  attach (observer) {
    this.observers.push(observer)
  }
}

// 观察者
class Observer {
  constructor (name, subject) {
    this.name = name
    this.subject = subject
    this.subject.attach(this)
  }
  update () {
    console.log(`${this.name} update`)
  }
}

// 测试
const s = new Subject()
const p1 = new Observer('p1', s)
const p2 = new Observer('p2', s)
const p3 = new Observer('p3', s)
s.setState(1) // 在更改值的时候,会监听到并执行其他任务
```

## 装饰器模式

::: tip
优势:
1. 为对象添加新功能,不改变其原有的结构和功能
2. 在提炼公共方法中很好用,特别是一些公共提示
:::

``` js
class Circle {
  draw () {
    console.log('系统在画圈')
  }
}

class Decorator {
  constructor (circle) {
    this.circle = circle
  }
  setRed () {
    console.log('系统在设置红色边框')
  }
  draw () {
    this.circle.draw()
    this.setRed()
  }
}

// 测试
const circle = new Circle()
circle.draw()

const dec = new Decorator(circle)
dec.draw()
```

### vue-cli 项目使用装饰器
+ 配置 npm
```
npm install babel-plugin-transform-decorators-legacy --save-dev
```

+ 配置 bable
``` js
plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
```

+ 打开设置 -> 搜索tsconfig.json -> 勾选禁用 experimentalDecorators 设置

mixins 的类装饰器模式(和 ts 差不多,可以去参考)
``` js
function mixins (...list) {
  return function (target) {
    // 将解构后的放入 target原型链中
    Object.assign(target.prototype, ...list)
  }
}
const Foo = {
  foo () {
    alert('foo')
  }
}

@mixins(Foo)
class MyClass {}

const p = new MyClass()
p.Foo()
```

方法装饰器
``` js
function mixins (params) {
  return function (target, methodName, desc) {
    const oMethod = desc.value
    desc.value = function () {
      console.log(`calling ${methodName} width ${[...arguments]}`)
      return oMethod.apply(this, arguments)
    }
  }
}
class MyClass {
  @mixins('cc') // 不加这个有时候还找不到目标装饰器
  logData (a, b) {
    return a + b
  }
}

const p = new MyClass()
console.log(p.logData(1, 2))
```

### 安装装饰器库
```
npm install core-decorators --save
```

使用装饰器库
``` js
import { readonly, deprecate } from 'core-decorators'

class MyClass {
  @readonly
  name = '111' // 只读

  @deprecate('我们快要弃用这个API了', { url: 'http://www.baidu.com' })
  logData (a, b) { // 添加警告,警告这个方法快要被弃用了,不加参数则默认警告
    return a + b
  }
}

const p = new MyClass()
p.name = 2 // 更改会报错
p.logData(1, 2)
```

## 单例模式

::: tip
系统中被唯一使用,一个类只有一个实例,防止内存泄露

实际场景: vuex中的state就是使用单例的
:::

这样`p1`,`p2`操作的都是同一个实例,但是如果使用者强行`new Work`就破坏了单例
``` js
class Work {
  login () {
    console.log('login....')
  }
}

Work.getWork = (() => { // 必须要是自执行函数
  let works
  return () => {
    if (!works) {
      works = new Work()
    }
    return works
  }
})()

const p1 = Work.getWork()
p1.login()
const p2 = Work.getWork()
p2.login()
console.log(p1 === p2) // true
```

也可以这样实现,这样更好
``` js
class Singleton {
  constructor (name) {
    this.name = name
  }

  // 构造一个广为人知的静态方法,供用户对该类进行实例化
  static getInstance (name) {
    if (!this.instance) {
      this.instance = new Singleton(name)
    }
    return this.instance
  }
}

const p1 = Singleton.getInstance('xxx')
const p2 = Singleton.getInstance('xxx')
console.log(p1 === p2) // true
```

## 状态模式

::: tip
优势:
1. 在多层 `if...else`, `switch` 中适用,易于管理
2. 大大减少了 `if...else` ,当状态模式使用到极致时,程序中是没有 `if...else` 出现的
3. 每次状态变化都会触发一个逻辑
:::

当然如果需求很稳定,很简单的一个分支判断就可以搞定的情况下,如果采用状态模式实现,这样开发成本会很高,所以应该根据项目实际情况制定相应的实现方案
``` js
class ExecuteState {
  stateFn = {
    state_2 (data, current) {
      console.log('state_2')
    },
    state_4 (data, current) {
      console.log('state_4')
    },
    state_5 (data, current) {
      console.log('state_5')
    },
    state_9 (data, current) {
      console.log('state_9')
    }
  }

  executeFun (state, data, current) {
    this.stateFn[`state_${state}`] && this.stateFn[`state_${state}`](data, current)
  }
}

const p = new ExecuteState()
p.executeFun(4, 1, 2) // state_4
```

## 迭代器模式

::: tip

概况:
+ 顺序访问一个集合
+ 使用者无需知道集合的内部结构(封装)

实际场景:
+ jq each
+ ES6 Iterator
+ ES6 Generator
+ 解构
+ for .. of
:::

Interator 就相当于 ES6的Interator,只不过ES6的Interator也经过一些封装,也就是我们经常用的 for...of
``` js
class Interator {
  constructor (con) {
    this.list = con.list
    this.index = 0
  }
  next () {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
  }
  hasNext () {
    return !(this.index >= this.list.length)
  }
}

class Container {
  constructor (list) {
    this.list = list
  }
  getInterator () {
    return new Interator(this)
  }
}

const con = new Container([0, 1, 2, 3, 4])
const ator = con.getInterator()
while (ator.hasNext()) {
  console.log(ator.next())
}
```

## 外观模式

::: tip
为子系统中的一组接口提供了一个高层接口,使用者使用这个高层接口,也就是说,多个逻辑块应该被一个高层接口统一调度,使用者需要用到这方面逻辑时直接调用这个高层接口

其实有点像个大型的工厂,使用者可以不用关注内部详细逻辑

概况:
1. 隐藏系统的复杂性
2. 减少暴露的逻辑,保证安全
3. 为复杂的模块暴露出一个简便的接口给别人使用
4. 各个模块相互独立
:::

## 代理模式

::: tip
使用者无权访问目标对象,中间加代理,通过代理做授权和控制

概括:
1. 隐藏真正对象
2. 扩展性高
:::

``` js
class Work {
  constructor (name) {
    this.fileName = name
    this.loadFromDisk()
  }
  display () {
    console.log('display...' + this.fileName)
  }
  loadFromDisk () {
    console.log('loading...' + this.fileName)
  }
}

class Play {
  constructor (fileName) {
    this.work = new Work(fileName)
  }
  display () {
    this.work.display()
  }
}

const p = new Play('cheng')
p.display()
```

## 适配器模式

::: tip
旧接口格式和使用者不兼容,中间加一个适配器转换接口,还有就是可以将两个互不兼容的类汇总在一个新的类中,也可以理解为适配器模式

概括:
1. 封装旧接口可以用这种模式
2. vue component 使用了这种模式
:::

``` js
class ClasA {
  requestA () {
    return '德国插口'
  }
}

// 相当于一个适配器,将原始类封装一下,然后给使用者
class Target {
  constructor () {
    this.clasA = new ClasA()
  }
  request () {
    return `${this.clasA.requestA()} ----  中国插口`
  }
}

const p = new Target()
console.log(p.request())
```