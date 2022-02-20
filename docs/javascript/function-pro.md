# 函数式编程
+ 命令式编程是将参数一股脑传进来,然后在里面做多种逻辑处理
+ 函数式编程是将一条逻辑的步骤都拆开为一个个函数,以函数为最小单位去调用

例子: 将数组字符串转换为数组对象
``` js
['john-reese', 'harold-finch', 'sameen-shaw'] 
// 转换成 ( name 是根据参数控制的 )
[{name: 'John Reese'}, {name: 'Harold Finch'}, {name: 'Sameen Shaw'}]


// 命令式编程场景
const a = ['john-reese', 'harold-finch', 'sameen-shaw'];
const fun = (name, arr) => {
  return a.map((item) => { return { [name]: item.split('-').join(' ') }})
}
const b = fun('name', a);


// 函数式编程场景
// 尽管这样看起来是很多余的,但是从复用的角度还是不错的( 也可以看看下面的复杂场景 )
const a = ['john-reese', 'harold-finch', 'sameen-shaw'];
const fun = propName => arr => arr.map((item) => { return { [propName]: item }})
const fun1 = fun('name')
const b = fun1(a)
```

## 函数式编程特点
### 函数是"一等公民"
类似于字符串或者数组一样,对于函数也是要达到类似的基本操作,意思是可以赋值,可以作为参数,又或者当做别的函数的返回值
``` js
const convert2Obj = compose(genObj('name'), capitalizeName)
```

### 声明式编程
函数式编程大多时候都在声明我需要做什么,而不是像命令式编程一样怎么去做
这样的好处是代码的可读性特别高,sql语句也是声明式的,vue的组件也是声明式的

### 惰性执行
函数只在需要时执行,不会产生无意义的变量

### 无状态和数据不可变
+ 无状态: 不管何时运行,只要传入的参数一样就必须给出相同的输出,完全不依赖于外部状态的变化(通俗讲就是函数内部不能有this)
+ 数据不可变: 要求所有的数据都是不可变的,也就是当参数是引用传递时内部函数要新建一个对象用来修改,而不是直接修改
+ 没有副作用: 不会因为参数为引用地址而改变传入的参数,要严格遵守数据不可变

错误示例
``` js
// 修改 list 中的 type 和 age
const list = [...];
list.map(item => {
  item.type = 1;
  item.age++;
})
```

正确示例
``` js
// 修改 list 中的 type 和 age
const list = [...];
const newList = list.map(item => ({...item, type: 1, age:item.age + 1}));
```

### 纯函数
+ 不依赖外部状态
+ 没有副作用

错误示例
``` js
const curUser = { name: 'Peter' }
const saySth = str => curUser.name + ': ' + str;   // 引用了全局变量
const changeName = (obj, name) => obj.name = name;  // 修改了输入参数
changeName(curUser, 'Jay');  // { name: 'Jay' }
saySth('hello!'); // Jay: hello!
```

正确示例
``` js
const curUser = { name: 'Peter' }
const saySth = (user, str) => user.name + ': ' + str;   // 不依赖外部变量
const changeName = (user, name) => ({...user, name });  // 未修改外部变量
const newUser = changeName(curUser, 'Jay');  // { name: 'Jay' }
saySth(curUser, 'hello!'); // Peter: hello!
```

**优点**
+ 便于测试和优化: 由于没有复杂的情况,我们可以轻松断言函数的执行结果
+ 可缓存性: 可以缓存之前放入的参数(参考柯里化)
+ 更少的bug: 不会受环境的影响,排除起来很快

## 流水线构建 & 柯里化

### 加工站 -- 柯里化
**柯里化的意思是将一个多元函数,转换成一个依次调用的单元函数**
``` js
f(a,b,c) → f(a)(b)(c)
```

### 部分函数应用与柯里化区别
俩者的区别,柯里化一定是单元函数,也就是单输入单输出
``` js
f(a,b,c) → f(a)(b)(c) // 柯里化
f(a,b,c) → f(a)(b,c) / f(a,b)(c) // 部分函数调用
```

柯里化例子:
``` js
var add = function(x) {
  return function(y) {
    return x + y;
  }; 
};
const increment = add(1);
increment(10); // 11
```

部分函数应用例子:
``` js
// 假设一个通用的请求 API
const request = (type, url, options) => ...
request('GET', 'http://....') // GET 请求
request('POST', 'http://....') // POST 请求

// 但是通过部分调用后，我们可以抽出特定 type 的 request
const get = request('GET');
get('http://', {..})
```

### 高级柯里化
我们使用的 Lodash,Ramda 这些库中实现的 curry 函数的行为看似和柯里化不太一样
``` js
const add = R.curry((x, y, z) =>  x + y + z);
const add7 = add(7);
add7(1,2) // 10
const add1_2 = add(1,2);
add1_2(7) // 10 
```
其实,这些库中的 curry 函数都做了很多优化,导致这些库中实现的柯里化其实不是纯粹的柯里化,我们可以把他们理解为“高级柯里化”。

这些版本实现可以根据你输入的参数个数,返回一个柯里化函数/结果值。即，如果你给的参数个数满足了函数条件,则返回值。这样可以解决一个问题,就是如果一个函数是多输入,就可以避免使用 (a)(b)(c) 这种形式传参了

所以上面的 add7(1, 2) 能直接输出结果不是因为 add(7) 返回了一个接受 2 个参数的函数，而是你刚好传了 2 个参数,满足了所有参数,因此给你计算了结果,下面的代码就很明显了：
``` js
const add = R.curry((x, y, z) =>  x + y + z);
const add7 = add(7);
add(7)(1) // function
```
因此,记住这句话**我们可以用高级柯里化去实现部分函数应用,但是柯里化不等于部分函数应用**

### 流水线 -- 函数组合
函数组合的目的是将多个函数组合成一个函数,下面来看一个简化版的实现
``` js
const compose = (f, g) => x => f(g(x))
const f = x => x + 1;
const g = x => x * 2;
const fg = compose(f, g);
fg(1) //3
```

## 读后思考
### 柯里化利弊分析
函数式编程的那几个特点会帮助我们解决大部分低级bug,而且可以想象的是一旦熟练应用且放在合适的项目中迸发出的能量和效率会直线飙升,但是以我现在初学者的身份会考虑到几个问题:
1. 函数式编程是否能应用在项目层面? 我觉得是不能的,在项目前期使用会有较大的心理负担,如果leader对项目把控不到位或者
  是组员之间水平有差异又或者是新人进团队,都会导致最终形成的代码是乱糟糟的,而且我也有一个疑问,如果说专门把一个个基础函数
  放到一个公共的地方,然后其他地方想用的话从这引入,然后再堆叠出二级,三级这种私有化的函数,那么要不要给某些很多地方重用了的二级
  三级乃至四级的函数再封装呢,封装了的话又放到一个公共文件吗? 很显然这是我的疑问,所以在我的水平来看,它并不适合项目层面
2. 可能更适合某些大型函数,入口函数用上这个会比较有性能优化(例如vue)
3. 插件或者组件库这种轻量的可能会比较适合整体使用柯里化,想想应该很爽吧
4. 其实本质上柯里化是使用了大量闭包概念的,那么怎么解决资源占用问题? 多层级的话咋整
5. 性能上其实这样函数式编程会有很大缺陷,函数式的方式必然比直接写语句指令慢(引擎会针对很多指令做特别优化),就拿原生方法`map`说
  它就比纯循环语句实现迭代慢8倍

### 值得借鉴的思想
1. 上面的例子中有个封装`http`的部分,这是部分函数应用的场景,但是我们在封装的时候也可以这样用,虽然会产生闭包资源,但是场景多呀,值得!
2. 函数式编程没有副作用(无状态,数据不可变)这个概念要熟练应用,在项目中很多这种引用传递导致莫名其妙bug的,每个函数要争取做到隔离性
  也就是要函数内部最好不要用到外部属性(当然了,很多时候我们没办法避免,例如vue...)
3. 要少在函数内为了运算创建多个变量,比如可以使用reduce这样的函数式原生方法