# call-apply-bind

## call
这样是最快捷的,但是这样在输出的时候会发现带有了 `tempFn` 方法,这是不符合预期的<br>
或者可以放到 `Object` 的原型对象上,像注释那里一样
``` js
const data = { age: 12 }
function pro() {
  console.log('pro', this);
}
Function.prototype.selfCall = function(selfThis, ...args) {
  if (!selfThis) selfThis = window;
  // Object.prototype.fun = this;
  selfThis.tempFn = this;
  const res = selfThis.tempFn(...args);
  // delete Object.prototype.fun;
  delete selfThis.tempFn;
  return res;
}
pro.selfCall(data) // {age: 12, tempFn: ƒ}
```

第二种<br>
这种是用到了`eval`函数,实际尽量避免这样用<br>
这里是换了个概念,相当于把函数内的this都给手动转换了一下,思路很巧妙
``` js
const data = { age: 12 }
function pro() {
  console.log('pro', this, arguments);
}
Function.prototype.myCall = function(context) { // 这里的context就是新作用域,在eval中会用到
  const str = this.toString().replace(/this/g, 'context'); // 将方法的this全部替换为context
  const newArguments = arguments.length > 1
    ? Array.from(arguments).slice(1).map((item, index) => `arguments[${index + 1}]`) // 要把第一个参数给排除掉
    : [];
  return eval(`(${ str })( ${ newArguments } )`)  
}
pro.myCall(data, 1, 2, 'ccc') // {age: 12}  [1, 2, 'ccc']
```

## apply
思路和 `call` 的实现思路相同
``` js
// 第一种
Function.prototype.selfApply = function(selfThis, args) {
  selfThis.fun = this;
  const res = selfThis.fun(...args)
  delete selfThis.fun
  return res;
}

// 第二种
Function.prototype.myApply = function(context) {
  const str = this.toString().replace(/this/g, 'context');
  const newArgs = arguments.length > 1
    ? arguments[1].map((item, index) => `arguments[1][${ index }]`)
    : []
  return eval(`(${ str })(${ newArgs })`)
}

console.log(fun.selfApply(obj, ['ccc']));
console.log(fun.myApply(obj, ['ccc']));
```

## bind
直接套这 `call` 就行
``` js
Function.prototype.selfBind = function(selfThis, ...selfarg) {
  return (...arg) => {
    return this.selfCall(selfThis, ...selfarg, ...arg)
  }
}
```