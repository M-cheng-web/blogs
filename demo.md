1. foo 为何值时能输出 'check in'
不太了解...

2. 什么是事件循环
个人理解就是因为js是单线程的,而dom渲染是必须先执行的,如果我们想要在dom渲染时触发一些事件,这个
事件可能是一个请求,那么js不可能等这个请求返回结果了再接着渲染dom,所以提出异步的概念,而dom渲染或者其他普通代码的调用就被理解为同步,由此js的执行规则就是先同步再异步(同一事件循环内),同步执行完了才执行异步,而异步又分为宏任务和微任务,同一事件循环内微任务永远先于宏任务执行

3. 输出
2,1,1,2

为什么这样输出面试时可以说

4. 防抖
``` js
const fang = (fun, time) => {
  let timmer = null;
  return function(...args) {
    if (timmer) {
      clearTimeout(timmer);
    }
    timmer = setTimeout(() => {
      fun.call(this, ...args)
    }, time)
  }
}
```

5. 完成代码
``` js
const func = (function() {
  let num = 0
  return function() {
     return ++num;
  } 
})()

  console.log(func()); // -> 1
  console.log(func()); // -> 2
  console.log(func()); // -> 3
```

6. 代码输出
[6,7,8]
2
world

最后一个实际输出了一下知道了为hello,之前疏忽了,为什么这样输出可以在面试时说