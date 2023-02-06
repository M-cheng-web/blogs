# 节流防抖

## 节流
设定一个时间点例如1秒,在一秒内的重复请求不会被执行<br>
如果连续10秒都在发送这个请求,那么会出现每隔1秒执行一次这个请求<br>
使用场景
+ 监听页面滚动
+ 监听DOM拖拽
+ 抢购疯狂点击

这里还加上了是否需要首次运行
``` js
function throttle(fn, time, isFirst = false) {
  let timeer = '';
  return function(...arg) {
    if (isFirst) {
      fn.call(this, ...arg); // 为了让函数内部的this正确指向
      isFirst = false;
    }
    if (timeer) return;
    timeer = setTimeout(() => {
      fn.call(this, ...arg);
      timeer = null
    }, time)
  }
}
```

测试
``` js
// 这里要用function,不能用箭头函数(箭头函数会导致this在初始化时就确定为window)
const fn = throttle(function(name, age) { 
  console.log(name, age, this);
}, 1000, true)

const obj = { age: 123 }

setInterval(() => {
  console.log(111);
  fn.call(obj, '程', 100);
}, 200);
```

## 防抖
设定一个时间点例如1秒,在一秒内的再次请求都会让请求延迟一秒执行<br>
如果连续10秒都在发送这个请求,那么会出现10秒后才会执行一次这个请求<br>
使用场景
+ 输入框实时搜索

这里还加上了是否需要首次运行
``` js
function debounce(fn, time, isFirst = false) {
  let timeer = '';
  return function(...arg) {
    if (isFirst) {
      fn.call(this, ...arg);
      isFirst = false;
    }
    if (timeer) clearTimeout(timeer)
    timeer = setTimeout(() => {
      fn.call(this, ...arg);
    }, time)
  }
}
```

测试
``` js
const fn = debounce(function(name) {
  console.log(name, this);
}, 1000, true)

const obj = { age: 123 }
let inter = setInterval(() => {
  console.log(111);
  fn.call(obj, '程');
}, 100);
setTimeout(() => {
  clearInterval(inter)
}, 2000);
```

## 额外的需求
time = 1000 的情况下<br>
首次点击运行一次,一秒内的连续点击会清空上一次计时器,也就是首次点击后一秒内的连续点击是无效的<br>
必须要再过一秒才能再次运行(与防抖不同的是: 防抖永远会执行一次,而此需求要的是一秒内的点击是无效的)
``` js
function selfDebounce(fn, time) {
  let timmer = '';
  return function (...arg) {
    if (timmer) {
      clearTimeout(timmer);
      timmer = setTimeout(() => {
        timmer = null;
      }, time);
      return;
    }
    timmer = setTimeout(() => {
      timmer = null;
    }, time);

    fn.call(this, ...arg);
  };
}
```