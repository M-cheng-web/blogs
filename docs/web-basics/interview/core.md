# 面试笔记

## 面试准备
https://juejin.cn/post/6844903928442667015

1. 把JS基础巩固一下，还有计算机网络tcp和http部分，最后把简历里的项目都好好复盘一下，梳理一下项目的难点和解决方案
2. 你觉得你最亮眼的地方(停不下来，喜欢在提效方面做出成绩，小到平时的博客编写利用脚本快速排版，大到公司的项目快速部署，再比如模板工程，这点在本人github仓库中很多体现，一方面是为了以后快速上手，二方面是担心以后遗忘)
3. js内存回收算法
4. 浏览器调试
5. 每个项目都要复盘，开源项目也要复盘
6. 未来计划，体现在个人技术与在公司层面想做什么
7. 跨域，为什么有跨域的说法，怎么解决
8. 数组扁平
9. webpack 的懒加载优化以及代码分割（是否可以达到根据用户权限来分割js，css文件这些）
10. koa洋葱模型，Express服务怎么启动（优先级最后）
11. 虚拟长列表解决方案

## 速记

### 项目常用/难点
1. 维护项目整体不乱，该提炼的就要提，提炼出来的东西一定要考虑到可扩展性，不能有定制化的东西，最重要的一点是要站在使用者的角度去看待组件，如果要多出很多繁琐的东西，那还不如不抽组件
2. 由于我们支持多端，且多角色，然后每个端都是不同的登录，这些需要统一一个流程来规范登录以及登录成功后的一系列流程
3. uniapp中提炼表单组件，因为uniapp的兼容性以及我们需求的特别，所以我们需要自己做一个表单组件，能支持校验错误
4. uniapp编写程序会有一些兼容性问题，比如支付宝小程序录制视频时，如果录制框不是全屏，则在大部分安卓机中用户看到的都是放大版的视频，导致我们这一块功能并不能上线

### 工具类
+ git 有哪些命令
+ git reset 的四种参数
+ webpack 通用的配置有哪些,生产环境配置又是哪些
+ vite 为什么能这么快
+ axios 封装了哪些功能,分别怎么实现的

### js
+ object有哪些方法
+ 哪些方法能判断数据类型 (数组,对象,字符串)
+ 宏任务和微任务
+ 数组有哪些方法,各返回什么,会不会修改原数组
+ Map,Set,WeakSet,WeakMap这些
+ promise 有哪些原型方法,静态方法
+ promise 的大概实现原理
+ new 操作符做了什么
+ 原型链的缺陷,解决办法
+ 设计模式讲几个
+ 基本正则
+ forin forof
+ class 和 function创建的原型有什么不一样
+ 大屏方案

### css
+ rem 怎么用
+ flex 说几个基本属性
+ flex: 1 代表什么

### vue
+ 双向绑定原理
+ nextTick 原理
+ 虚拟DOM
+ diff算法

### 网络 & 性能优化
+ 页面加载和渲染过程
+ DNS解析
+ DNS缓存
+ http缓存
+ 回流重绘
+ 跨域
+ http 比较 https
+ 页面存储的比较 (cookie这些)
+ tcp协议 三次握手,四次挥手
+ webpack 的优化点
+ 其他优化点

### 手写
+ promise 任务调度
+ call/apply/bind
+ 深拷贝完全方案
+ 节流防抖


## vue3
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
为什么请求会先发一个option请求?
其实就是header里边带了自定义数据后,浏览器会默认你这个请求为“非简单请求”,会向后端先行发送一个“options”类型的请求,只有这个请求被通过了跨域问题就解决了(顺带说一下，application/json也会触发这个玩意，所以跨域嘛，是必须的，基础增删查改外类型也会触发)

但是,这就导致每次解决跨域都需要先发送一次“options”请求,也就是所谓的两次请求,那如何避免呢,这个嘛,看这个的估计都是前端吧,不过很可惜,我并不知道有前端解决的方法,毕竟我不能不带token,不过后端的倒有一个

就是后端在请求的返回头部添加:
Access-Control-Max-Age:时间, 这个时间代表预检结果可以被缓存多久,这样在第一次请求时会先请求option,其他就不用了 (只针对请求url以及参数完全相同的请求)

### 大杂烩
+ 对token 的看法
+ history 和 hash 模式的区别
+ http状态码
+ 跨域
+ jsonp原理
+ cookie 和本地的区别
+ react useContext 是什么
+ react keep-alive 怎么实现
+ 多个tab页切换通信的方案
+ react class 生命周期, useEffect对应什么
+ interface 和 type 区别


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