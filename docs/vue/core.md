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

## key
能帮助vue高效 diff,比如在一个 `for` 循环渲染出的列表中,当这个列表某几条数据发生更改时,会经历以下步骤
(可以从第6步开始看),在知道渲染过程后,可以假设这样的场景: 有一个列表渲染,都是拿index作为key,当插入一条数据的时候,后面的key都会发生变化,都会重新渲染,这样是不符合key的初衷的

1. 触发watcher,随之触发watcher对象的 update(), 然后再触发渲染函数
2. 渲染函数利用 h 函数生成这一块最新的虚拟DOM树
3. 随后会触发 patch 函数对比新旧虚拟DOM树
4. patch 函数内部会判断出父级没有变化,变化是子级
5. 随后会进行深层的 diff 算法比较(参考diff算法篇)
6. diff 算法内部会依赖于 `sel` 以及 `key` 来判断是不是同一个元素
7. 如果是同一个元素就会只改变其内容或者移一下位置就行
8. 这样就不用重复创建真实DOM元素了,能复用的都复用

## data值变化触发的动作
### 值的动作
+ 场景一 data的值没有在页面渲染
+ 场景二 data的值在页面上有使用
+ 场景三 data的值在页面上有使用,且被computed属性调用
+ 场景四 data的值在页面上有使用,且被computed属性调用,且computed属性被页面使用

### 渲染的动作
模板语法 => 抽象语法树ast => 渲染函数(h函数) => 虚拟节点 => 界面

在data值改变之前,页面就已经经过了上面的步骤( 在生成虚拟DOM时会把data的真实时放在虚拟DOM对象中 ),此时更改会触发以下步骤( 这里的前提是data属性被页面调用 ):
1. data值的变化会触发拦截,随后会触发渲染 `watcher`对象的update
2. update方法又会触发其渲染函数
3. 渲染函数内部又会由 h 函数转化为虚拟DOM
4. 随后比较新旧虚拟DOM
5. 由于这里只是更改了内容,并不涉及子级的比较,所以不用 diff算法
6. 在对比过程中发现新旧虚拟DOM只是内容发生了变化
7. 将新虚拟DOM的内容赋值给旧虚拟DOM,并不会重新创建个新元素
8. 也就是这样的操作: `oldVnode.elm.innerText = newVnode.text`

## 其他
### v2 和 v3 的 slot
+ 在vue2.0中,被解析到 this.$slots.default[0].data.attrs 这个对象中
+ 在vue3.0中,被解析到 this.$slots.default()[0].props 这个对象中

像这个组件的默认插槽里面还有默认插槽

+ 在vue2.0中,会被解析到 this.$slots.default[0].data.scopedSlots 这个对象中
+ 在vue3.0中,会被解析到 this.$slots.default()[0].children 这个数组中

错误场景:
``` html
// 父级
<slot :selfTextArr="selfTextArr" :fontStyle="fontStyle" :isCenterLine="isCenterLine" />

// 子级
<template v-slot:default="slotProps">
  <div class="drag-area">
    <div v-show="slotProps.selfTextArr.length === 0" :class="{'drag-area-text': slotProps.isCenterLine}" :style="slotProps.fontStyle">
      点击输入文字
    </div>
  </div>
</template>
```

父级通过 `this.$slots.default()[0]` 语句发现会报错, `isCenterLine is undefined` 这样的,无奈只能给父级 slot 外层加个 div,然后通过那个div去获取到插槽作用域

后续: 可以通过 `useSlots` hook函数获取到(没试过,应该可以)

### v3的命名问题
``` js
this.originCanvas

// 下面这种命名会导致赋值失效

this.$originCanvas
```

### 其他问题
vue3的语法,怎么区分块呢? 还是万物都是函数式?

vue3的语法,应该很容易导致接手一张别人写好的新页面时,很难一眼就知道页面初始做了写什么把? 要不然修改程序的时候,错误信息很隐晦的话,找错很难