# 设计模式

## 工厂模式
遇到 new 时,就要考虑是否该使用工厂模式

>`Create`类就相当于一个工厂,避免了使用者和被调用的直接接触

比如说被调用者`Work`更改了名字,只需要更改工厂内的调用就行,没有使用工厂的话,要去一个个更改
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

## 观察者模式
+ 发布 & 订阅
+ 一对多

绑定事件,promise监听,watch用到了,vue生命周期

>示例</br>
示例中每更改了被观察的对象属性,就会触发观察者的`update`方法</br>
可以存在多个观察者,但要确保能触发目标观察者的对应方法
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
console.log(p1)
s.setState(1) // 在更改值的时候,会监听到并执行其他任务
```

## 装饰器模式
为对象添加新功能,不改变其原有的结构和功能</br>
>基本概念
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
``` js
npm install babel-plugin-transform-decorators-legacy --save-dev
```
+ 配置 bable
``` js
plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
```
+ 打开设置 -> 搜索tsconfig.json -> 勾选禁用 experimentalDecorators 设置

>mixins 的类装饰器模式</br>
和 ts 差不多,可以去参考
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

>方法装饰器
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
系统中被唯一使用,一个类只有一个实例</br>
vuex中的state就是使用单例的

>这样`p1`,`p2`操作的都是同一个实例</br>
但是如果使用者强行`new Work`就破坏了单例
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
>也可以这样实现</br>

这样更好
``` js
class Singleton {
  constructor (name) {
    this.name = name
  }

  // 构造一个广为人知的接口，供用户对该类进行实例化
  static getInstance (name) {
    if (!this.instance) { // 判断静态方法内 instance 是否存在
      this.instance = new Singleton(name) // 不存在则创建
    }
    return this.instance
  }
}

const p1 = Singleton.getInstance('xxx')
const p2 = Singleton.getInstance('xxx')
console.log(p1 === p2) // true
```

## 状态模式
+ 一个对象有状态变化
+ 每次状态变化都会触发一个逻辑
+ 不能总是用 if ... else 来控制

>如此就打打减少了ifelse 使用量，当状态模式使用到极致时，程序中是没有if else出现的</br>
当然如果需求很稳定，很简单的一个分支判断就可以搞定的情况下</br>
如果采用状态模式实现，这样开发成本会很高，所以应该根据项目实际情况制定相应的实现方案
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
+ 顺序访问一个集合
+ 使用者无需知道集合的内部结构(封装)

使用场景
+ jq each
+ ES6 Iterator
+ ES6 Generator
+ 解构
+ for .. of

>Interator 就相当于 ES6的Interator,只不过ES6的Interator也经过一些封装,也就是我们经常用的 
for...of

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
为子系统中的一组接口提供了一个高层接口,使用者使用这个高层接口

>也就是说,多个逻辑块应该被一个高层接口统一调度,使用者需要用到这方面逻辑时</br>
直接调用这个高层接口

## 代理模式
使用者无权访问目标对象
中间加代理,通过代理做授权和控制</br>
proxy就是典型的代理模式
``` js
class Work {
  constructor (name) {
    this.fileName = name
    this.loadFromDisk() // 初始化从硬盘中加载 模拟
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
旧接口格式和使用者不兼容,中间加一个适配器转换接口</br>
封装旧接口可以用这种模式</br>
vue component 使用了这种模式
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