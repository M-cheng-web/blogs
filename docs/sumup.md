# 关键点总结

## Electron

## 看一遍红宝书的笔记

## 安全相关

## yarn npm cnpm

### vue3
setup 有什么作用,为什么这样设计

+ Proxy 观察者机制 相对于 Object.defineproperty 能观察到对象内属性的变化
+ 一块功能的逻辑都能写一起,不像2.0一样弄清楚一个模块要跳来跳去,特别是当混入多了后,根本不知道这个东西是从哪来的
+ 生命周期 销毁重命名为 unmounted beforeUnmount
+ v-model 的更改 .sync取消 可以多个v-model 但是内部不是 input而是 update:modeValue
``` html
<ChildComponent v-model = "title">
==>
<ChildComponent :modelValue = "title" @update:modelValue = "title = $event">


<ChildComponent v-model:title="title"  />
==>
<ChildComponent :title="title" @update:title = "title = $event" />
```

``` js
function add(...args) {
  let sum = args.reduce((acc, cur) => acc + cur);
  return function(...nextArgs) {
    return nextArgs.length ? add(sum, ...nextArgs) : sum
  }
}

console.log(add(1)(2)(3)()) // 6
console.log(add(1, 2, 3)(4)()) // 10
```

## 面筋
### bitmart
+ flex 左边固定,右边自适应 (calc, flex)
+ flex1 什么意思
+ 自适应的正方形实现一下
+ a.js 中 age为1并导出到b.js文件, 设置2秒age为2,问b.js文件中3秒后输出的age值是什么
+ 原型链讲一下
+ 设计模式说一下
+ vuex action操作后想要接着做一些操作怎么做
+ vue中 model是什么意思
+ vue 传值的几个方式
+ flex-basic 和 width的关系
+ width设置 100% 和不设置有什么关系
+ 对象为什么不能用for..of遍历

``` css
.content {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border: 1px solid red;
}


.content {
  width: 100%;
  border: 1px solid red;
}
.content::after {
  content: '';
  display: block;
  margin-top: 100%;
}
```

``` js
Vue.component('my-input',{
    model: {
        prop: 'uname',
        // 随便命名事件，对应下面$emit即可
        event: 'changeXXX'
    },
    props: {
        uname: {
            type: String,
            default: 'tom'
        }
    },
    methods: {
        updateVal(val){
            this.$emit('changeXXX',val)
        }
    }
})
```

### 仓力科技
+ == 原理
当进行双等号比较时候,先检查两个操作数数据类型,如果相同,则进行===比较,
如果不同,则愿意为你进行一次类型转换,转换成相同类型后再进行比较

``` js
function Foo() {
  Foo.a = function() {
    console.log(1);
  }
  this.a = function() {
    console.log(2);
  }
}
Function.prototype.a = function() {
  console.log(3);
}
Foo.prototype.a = function() {
  console.log(4);
}

Foo.a()
const foo = new Foo()
foo.a()
Foo.a()
```

``` js
function change(a) {
  a.age = 1
  const b = new Object()
  b.age = 2
  a = b
}
const a = new Object()
change(a)
console.log(a.age);
```

### 识度科技
+ 200张图片预加载,栈容量最多为6
+ ['qwe', 'qxc', 'qrt'] 数组内寻找最多重复的字符串

### B公司
+ 用户权限管理
第一种: 通过自定义指令,内部写个对象权限表,设置某些权限能展示某些dom
第二种: 全局路由权限管理
1. 添加全局路由拦截 beforeEach 来拦截全局路由
2. 首先判断vuex内token是否有值
   1. 有: 再次判断是否有用户权限信息
       1. 有: 直接next
       2. 没有: 请求用户权限信息,随后再拿到后端的路由表进行 addRouter
   2. 没有: 判断目标路径是否在白名单中,在的话直接next,不在则跳转到login

+ axios封装

### 数秦科技
+ webpack哪些功能点 (打包过程优化,生产优化)
+ http1 和 http2的区别
+ ssl协议是什么

### 微点
+ 扁平数据树形化

+ f(1,2)(4,5)()
``` js
function add(...args) {
  const sum = args.reduce((pre, item) => pre + item, 0)

  return function(...newArgs) {
    return newArgs.length ? add(sum, ...newArgs) : sum;
  } 
}
// 或者这样的形式
function foo(...args) {
  const add = (...newArgs) => foo(add.sum, ...newArgs);
  add.sum = args.reduce((pre, num) => pre + num, 0)
  add.getValue = () => add.sum;
  return add
}
```

+ a==1 && a==2 && a==3
``` js 
class A {
  constructor(num) {
    this.num = num;
  }
  toString() {
    return this.num++;
  }
  valueOf() {
    return this.num++;
  }
}
const a = new A(1)
if (a == 1 && a == 2 && a == 3) {
  console.log("Hi Eno!");
}
```

### 光云
+ v-if 和 v-show的差别
+ 重绘和回流是什么
+ v-if 会触发回流吗
+ history和hash的差别

### 鲁尔物联
+ 哪些微任务,宏任务
+ 浏览器异步和node异步

### 图书
+ promise为什么不支持ie8, 用了babel-loader也不支持,这是为什么
+ babel-loader的原理是什么
+ 组件平级传递数据