# vue
<!-- ![框架简图](https://gitee.com/M-cheng-web/map-storage/raw/master/vue-img/12343ec292ca49588fee20ec003d4966_tplv-k3u1fbpfcp-watermark.webp) -->

## 组件通信方式


## nextTick
nextTick 主要使用了宏任务和微任务,根据执行环境分别尝试采用
+ Promise
+ MutationObserver
+ setImmediate
+ 如果以上都不行则采用 setTimeout

由于Vue的异步更新策略导致我们对数据的修改不会立马体现到都没变化上,此时如果想要立即获取更新后的dom的状态,就需要使用这个方法,比如以下代码
``` js
mounted() {
  this.name = 123
  // 具体意思不用管,知道这个打印输出的元素是负责展示 this.name 的就行
  console.log(this.$refs.name) // undefined
  setTimeOut(() => {
    console.log(this.$refs.name) // 123
  })
}
```

Vue在更新dom时是异步执行的,只要监听到数据变化,Vue将开启一个队列,并缓冲在同一事件循环中发生的所有数据变更
如果同一个watcher被多次触发,只会被推入到队列中一次,这种在缓存时去重对于避免不必要的计算和dom操作是非常重要的nextTick方法会在队列中加入一个回调函数,确保该函数在前面的dom操作完成后才调用

nextTick 就是利用任务队列的原理,为什么要用异步,因为数据更新后的DOM操作都是异步,我们要做的是在同一事件循环的末尾接上一个队列就行,有四个选项供我们选择

## 组件中的data为什么是一个函数
一个组件被复用多次的话,也就会创建多个实例
本质上,这些实例用的都是同一个构造函数,如果data是对象的话,对象属于引用类型,会影响到所有的实例
所以为了保证组件不同的实例之间data不冲突,data必须是一个函数

关于这一点可以参考原型链那一块知识点,自己试一下就知道改变 `Object.prototype.A属性` 会触发所有实例的 `A属性` 改变

## router
+ beforeEach afterEach
+ beforeEnter
+ beforeRouteEnter beofreRouteUpdate beforeRouteLeave

原理:

## key
能帮助vue高效 diff,比如在一个 `for` 循环渲染出的列表中,当这个列表某几条数据发生更改时,会经历以下步骤
(可以从第6步开始看)

1. 触发watcher,随之触发watcher对象的 update(), 然后再触发渲染函数
2. 渲染函数利用 h 函数生成这一块最新的虚拟DOM树
3. 随后会触发 patch 函数对比新旧虚拟DOM树
4. patch 函数内部会判断出父级没有变化,变化是子级
5. 随后会进行深层的 diff 算法比较(参考diff算法篇)
6. diff 算法内部会依赖于 `sel` 以及 `key` 来判断是不是同一个元素
7. 如果是同一个元素就会只改变其内容或者移一下位置就行
8. 这样就不用重复创建真实DOM元素了,能复用的都复用

## data值变化触发的动作


## v3,v2的依赖追踪的差别

