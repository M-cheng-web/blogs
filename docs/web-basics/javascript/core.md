# JS 基础

<!-- ![JS基础简图](https://gitee.com/M-cheng-web/map-storage/raw/master/vue-img/71e30bdc18b44272b5fa0e16b9c3f2e8_tplv-k3u1fbpfcp-watermark.webp) -->

## 执行上下文/作用域/闭包
### JS执行上下文
有三种执行上下文类型
1. 全局执行上下文 - 基础的上下文,任何不在函数内部的代码都在全局上下文中 会执行两件事: 创建一个全局的 window 对象(浏览器情况下),并且设置this 的值等于这个全局对象,一个程序中只会有一个全局执行上下文
2. 函数执行上下文 - 每当一个函数被调用时,都会生成一个函数执行上下文,然后这个函数执行上下文会执行这个函数
3. Eval函数执行上下文 - 执行Eval函数时也会生成属于它的执行上下文

### JS执行栈
是一种后进先出的数据结构,被用来存储执行上下文

当程序开始运行时,会将全局执行上下文压入栈底,随后在代码运行中发现新的需要执行的函数,就会生成这个函数的上下文并放入执行栈中并执行这个函数,如果这个函数内也有需要执行的函数,会继续生成并放入

当没有可以继续生成的函数上下文时或者是函数已经执行完毕,会将这个函数 从执行栈中弹出

> 比如说 A函数调用 B函数,B函数调用 C函数这样的执行就是依照着后进先出的模式

### JS作用域/作用域链
作用域规定了如何查找变量,也就是确定当前执行代码对变量的访问权限,JS采用词法作用域,也就是静态作用域

静态作用域与动态作用域
+ 静态作用域中的函数作用域在函数定义的时候就决定了
+ 动态作用域中的函数作用域在函数调用的时候才决定
``` js
var value = 1;
// 执行 foo 函数, 先从 foo 函数内部查找是否有局部变量 value
// 如果没有就根据书写的位置,查找上面一层的代码,也就是 value 等于 1,所以结果会打印 1
function foo() {
  console.log(value);
}
function bar() {
  var value = 2;
  foo();
}
bar(); // 1
```

**为什么函数作用域在函数定义的时候就决定了?**

这是因为函数有一个内部属性 [[scope]],当函数创建的时候,就会保存所有父变量对象到其中,
可以理解 [[scope]] 就是所有父变量对象的层级链
``` js
function foo() {
  function bar() {
    ...
  }
}
// 函数创建时,各自的[[scope]]为:
foo.[[scope]] = [
  globalContext.VO
];
bar.[[scope]] = [
  fooContext.AO,
  globalContext.VO
];
```

**作用域链**

当查找变量的时候,会先从当前上下文的变量对象中查找,如果没有找到,就会从父级(词法层面上的父级)执行上下文的变量对象中查找,
一直找到全局上下文的变量对象,也就是全局对象,
这样由多个执行上下文的变量对象构成的链表就叫做作用域链

### JS闭包
闭包是一个可以访问外部作用域中变量的内部函数,这些被引用的变量直到闭包被销毁时才会被销毁

应用场景: 私有变量,工程函数,vue中watch监听,promise等等


## this
### JS里的this
this为当前的执行环境,根据this可以拿到属性和函数,分为全局this和函数中的this
+ 全局的this指向它本身
+ 函数的this的指向,是在函数被调用的时候确定的( 也就是执行上下文被创建时确定的 )

在一个函数上下文中,this由调用者提供,由调用函数的方式来决定
+ 被调用的函数属于一个对象,那么该函数在调用时,内部的this指向该对象
+ 函数独立调用,那么该函数内部的this,则指向undefined( 但是在非严格模式中,当this指向undefined时,它会被自动指向全局对象 )

### 改变this指向
call,apply,bind,以及箭头函数
+ call和apply功能一样,只是传参的方式不一样,一个接收多个字符串,一个接收数组,bind会返回函数并不是运行
+ 箭头函数是在函数创建时就会绑定确定函数内容中的this指向,而不是在运行时确定

## 作用域
+ 全局作用域
+ 函数作用域
+ 块级作用域
    - if switch try-catch内定义的不能在外部使用
    - var定义的可以在外部使用(var没有块级作用域概念), const let不可以在外部使用

## 自由变量
在A函数中要用到的变量x并没有在A中声明,要到别的作用域中找到它,那么x就是自由变量
``` js
var x = 20
function A (b) { return x + b }
A(10)  // 30
```

这个x值是到父执行环境中找,指的是创建函数时候的父执行环境,而不是调用时候的父执行环境
``` js
var x = 10
function fn() { console.log(x) } // x 是自由变量
function show(f) {
  var x = 20
  f()
}
// 这里的自执行函数调用的 x是创建函数时候的父作用域的值 结果为10
show(fn) // 10
```

## Object 方法
+ hasOwnProperty
+ isPrototypeOf
+ toLocaleString
+ toString 返回类似于这样的字符串[object, Object]
+ setPrototypeOf(a,b) 将a的__proto__指向b
+ create(a) 创建一个新对象,且将这个新对象的__proto__指向a(比setPrototypeOf性能好)
+ getPrototypeOf(a) 获取对象的原型链，只支持获取上一级的

## 判断数据类型
+ 判断对象 ( typeof, instanceof, isPrototypeOf )
+ 判断数组 ( isArray, toString, instanceof, isPrototypeOf )
+ 判断字符串 ( typeof )
+ 判断是否为自身属性 ( hasOwnProperty )

> 多个窗口意味着多个全局环境,不同的全局环境拥有不同的全局对象,从而拥有不同的内置类型构造函数,所以会导致 instanceof 和 isPrototypeOf 不确定性,所以数组用专门的方法进行判断

### 判断数组
+ Array.isArray(myObj)
+ Object.prototype.toString.call(myObj) === "[object Array]"

``` js
var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length - 1].Array;
var arr = new xArray(1, 2, 3);
Array.isArray(arr); // true
arr instanceof Array; // false
console.log(Array.prototype.isPrototypeOf(arr)); // false
```

### instanceof
instanceof 检查一个对象的原型是否存在于另一个对象的原型链上

### isPrototypeOf
isPrototypeOf 检查一个对象是否存在于另一个对象的原型链上

``` js
function Say() { this.age = 123 }
const sa = new Say()
Say.prototype.isPrototypeOf(sa) // true
```

和 instanceof 的差异
> "object instanceof AFunction"中,object 的原型链是针对 AFunction.prototype 进行检查的,而不是针对 AFunction 本身
``` js
var subsuper = {}
var sub = Object.create(subsuper);
sub.someProp = 5;

var sub = Object.create(sub);

console.log(subsuper.isPrototypeOf(sub));  // true
console.log(sub instanceof subsuper);      // TypeError
```

## Object.create()
用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）
``` js
var subsuper = {}
var sub = Object.create(subsuper);
sub.someProp = 5;
console.log(subsuper.isPrototypeOf(sub));  // true
```

如果直接用此语法创建一个对象，那么此新的对象的原型是指向Object的。想要创建一个纯净的对象，可以加入额外参数
``` js
var sub = Object.create(); // {} 但是原型指向了 Object
var sub2 = Object.create(null); // {} 没有任何指向
var sub3 = Object.create(null, {name: 'cc'}); // {} 没有任何指向且自带name属性
```

## forof & forin
### `for..of`
+ 遍历的是 value
+ 要求遍历对象实现了迭代器对象 (比如 {} 没有实现则会报错)

### `for...in`
+ 遍历的是 key
+ 会顺着原型链一直遍历出 key,但是也分情况
  1. 遍历普通 `const b = {}` 这样的对象不会出现遍历出 object 对象的属性
  2. 对于 new 出来的对象则会将构造函数的原型链遍历出

## 双等与三等
`==`比较过程
1. 类型相同,再进行三等比较
2. 类型不同
   1. 一个是null,一个是undefined,那么相等
   2. 一个是字符串,一个是数值,把字符串转成数字再进行三等比较

`===`就是比较值了,类型不同也不会转换(除非是 `null === undefined`),也会比较引用地址

## 事件机制/Event Loop
### 如何实现一个事件的发布订阅

### 事件循环
JS是单线程的并且JS单线程执行方式是基于事件循环的,因为它在执行任务的时候会产生一个任务队列<br>
这个任务队列是先进先出的,分为宏任务和微任务,在遇到异步事件时会将事件先存入这个任务队列,在同步事件
都完成后才会开始执行任务队列,当这个任务队列里还存在异步事件还会接着存入任务队列,这个过程就是事件循环

### 宏任务和微任务区别
+ 宏任务与微任务都是异步队列,区别在于微任务比宏任务的优先级高,如果是在同一层级的话微任务是会在任务队列的最前面
+ 宏任务会在最后面,比如setTimeOut,setInterVal, 微任务比如Promise

## 字符串的一些方法
+ indexof search 以及差别

+ slice(indexStart, indexEnd)
  1. 若 indexStart 为负数,则将该值加上字符串长度后再进行计算,如果加上字符串的长度后还是负数则从0开始截取
  2. 若 indexStart 为正且大于字符串长度,则返回空字符串
  3. 如果 indexEnd 为负它被视为 strLength + indexEnd (strLength是字符串的长度)

+ substring(indexStart, indexEnd)
  1. 两个参数总是小的作为第一个参数,大的是第二个参数
  2. 两个参数当出现负数则视为0,出现大于最大长度的则被视为最大长度
  3. 如果 indexStart == indexEnd,返回一个空字符串

+ substr(indexStart, length)
  1. length 为负数则返回空字符串
  2. 如果 indexStart 是正的并且大于或等于字符串的长度,则返回空字符串
  3. 若 indexStart 为负数,则将该值加上字符串长度后再进行计算如果加上字符串的长度后还是负数则从0开始截取

+ replace /i /g
+ toUpperCase toLowerCase
+ split concat

## es6 常用方法
+ Object.assign()
+ 解构赋值
+ repeat(n) 字符串重复n次
+ 模板字符串
+ 扩展运算符

## 计算小数的解决方案
先把小数扩大至10的倍数,转为整数进行计算,计算好之后再缩写扩大的倍数就可以解决了