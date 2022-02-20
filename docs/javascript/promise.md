# promise
## 介绍
主要是为了解决回调地狱(多个串联的异步操作),在日常工作中主要是配合axios请求以及vuex中的一些操作

## 注意点
+ new promise内的语法是同步的,在.then()中的语句才是异步的,且是微队列
+ .then()返回状态之前new promise会返回一个promise实例,但是这个实例的状态会一直是padding
+ promise中如果不指定错误默认返回的都是reslove状态(直接throw error会退出执行)
+ promise.then .catch 这些返回的也是promise,如果不加状态也会默认为reslove状态
+ 想要中断promise链式,返回空promise: new Promise(() => {})

## 静态方法
+ Promise.all([promiseA, promiseB])
会等到这些promise全部有正确返回后才会触发回调,如果其中一个有错误会直接弹出错误信息,返回的是一个数组,记录的是各个promise的返回
+ Promise.allSettled([promiseA, promiseB])
会等这些promise全部返回才会触发回调(不管其中是否有失败promise),返回的是一个数组,记录的是各个promise的状态以及返回
+ Promise.any([promiseA, promiseB])
当其中的一个 promise 成功,就返回那个成功的promise的值,都不成功则返回undefined
+ Promise.race([promiseA, promiseB])
当其中的一个 promise `成功或者失败`,就返回第一个先成功或者失败的promise状态以及值
+ Promise.reject
返回一个状态为失败的Promise对象
+ Promise.resolve
返回一个状态为成功的Promise对象

## 手写简易promise
参考 [手写promise](../writingcode/promise.md)