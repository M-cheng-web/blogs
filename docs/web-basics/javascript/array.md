# JS数组方法总结
vue中重写了这些数组方法,以便实现对数组的响应式
+ push
+ pop
+ shift
+ unshift
+ splice
+ sort
+ reverse

## 数组遍历

### Array.forEach()
为每个数组元素调用一次回调函数

``` js
var txt = ‘’;
var numbers = [45, 4, 9, 16, 25];

// value 为项目值  index 为项目索引   array 为数组本身
numbers.forEach((value, index, array) => {
  txt = txt + value + "<br>"
});
```

### Array.map()
对每个数组元素执行回调函数后以数组的方式返回

``` js
// 将每个数组值乘以2

var numbers1 = [45, 4, 9, 16, 25];
var numbers2 = numbers1.map((value, index, array) => value * 2);
```

### Array.filter()
过滤数组内符合条件的元素后以数组的方式返回

``` js
// 过滤出大于18的数值

var numbers = [45, 4, 9, 16, 25];
var over18 = numbers.filter((value, index, array) => value > 18);
```

### Array.reduce()
在需要计算总数或者将一个对象转换为数组时需要用到

``` js
// 计算数组总和
var numbers1 = [45, 4, 9, 16, 25];
var sum = numbers1.reduce((total, value, index, array) => total + value);

// 所有数组*2
var sum2 = numbers1.reduce((total, value) => {
  total.push(value * 2)
  return total
}, [])

// 数组转对象
var sum3 = numbers1.reduce((total, value, index) => {
  total[index] = value
  return total
}, {})
```

### Array.reduceRight()
reduce()是从左到右,reduceRight是从右到左

``` js
var numbers1 = [45, 4, 9, 16, 25];
var sum = numbers1.reduceRight((total, value, index, array) => total + value);
```

### Array.every()
检查数组内所有值是否经由回调函数后为 true

``` js
// 检查所有数组值是否大于 18

var numbers = [45, 4, 9, 16, 25];
var allOver18 = numbers.every((value, index, array) => value > 18);
```

### Array.some()
检查数组内是否有值经由回调函数后为 true

``` js
// 检查某些数组值是否大于 18

var numbers = [45, 4, 9, 16, 25];
var allOver18 = numbers.some((value, index, array) => value > 18);
```

### Array.find()
返回通过测试函数的第一个数组元素的值

``` js
var numbers = [4, 9, 16, 25, 29];
var first = numbers.find((value, index, array) => value > 18);
```

### Array.findIndex()
返回通过测试函数的第一个数组元素值的索引

``` js
var numbers = [4, 9, 16, 25, 29];
var first = numbers.findIndex((value, index, array) => value > 18);
```

## 其他数组方法

### Array.from()
将伪数组转换为真正的数组

``` js
const arrLike = {
  length: 2,
  0: 1,
  1: 2,
}

Array.from(arrLike) // [1, 2]
```

### Array.of()
用以创建特殊数组

``` js
Array(2) // ['', '']
Array.of(2) // [2]
```

### Array.fill()
数组填充

arr.fill(value, start, end) <br>
value: 填充值 <br>
start: 填充起始位置,可以省略 <br>
end: 填充结束位置,可以省略,实际结束位置是end-1

``` js
const arr1 = [1, 2, 3, 4, 5, 6, 7]
arr1.fill(7) // [7, 7, 7, 7, 7, 7, 7]
arr1.fill(7, 1, 4) // [1, 7, 7, 7, 5, 6, 7]
arr1.fill(7, 2) // [1, 2, 7, 7, 7, 7, 7]
```

### Array.indexOf()
indexOf(item, start) 方法在数组中搜索元素值并返回其位置
strat参数可选,表示从哪里开始搜索

``` js
var fruits = ["Apple", "Orange", "Apple", "Mango"];
var a = fruits.indexOf("Apple"); // 0
```

### Array.lastIndexOf()
与 `Array.indexOf()` 类似,不过是从数组结尾开始搜索

**注意: 如果添加第二个参数的话,代表从目标位置向后去找**

``` js
var fruits = ["Apple", "Orange", "Apple", "Mango"];
var a = fruits.lastIndexOf("Apple"); // 2
```

### toString()
``` js
[1, 2, 3].toString() // 1,2,3
```

### join()
``` js
[1, 2, 3].join() // 1,2,3
[1, 2, 3].join('?') // 1?2?3
```

### pop()
删除数组最后一位,返回被删除元素

``` js
const arr = [1, 2, 3]
const num = arr.pop()
```

### push()
添加数组最后一位,返回数组添加后的长度

``` js
const arr = [1, 2, 3]
const num = arr.push(5) // num = 4; arr = [1, 2, 3, 5]
```

### shift()
删除数组第一位,返回被删除元素

``` js
const arr = [1, 2, 3]
const num = arr.shift() // num = 1; arr = [2, 3]
```

### unshift()
增加数组第一位,返回数组添加后的长度

``` js
const arr = [1, 2, 3]
const num = arr.unshift(5)
```

### splice()
// index 表示开始位置下标, num 表示删除的个数, item 表示在此位置增加的值
// 返回被删除的元素组成的数组
splice(index, num, item)

``` js
const arr = [1, 2, 3]
const num = arr.splice(0, 1) // num = [1], arr = [2, 3]
const num2 = arr.splice(0, 0, 1) // num2 = [], arr = [1, 1, 2, 3]
```

### concat()
合并两个数组,并不会改变原始数组,且会将二维数组拍平

``` js
const arr = [1, 2, 3]
const arr2 = [4, 5, 6]
const sum = arr.concat(arr2, 7, 8) // sum = [1, 2, 3, 4, 5, 6, 7, 8]
```

### flat()
flat(x) 拍平数组,x默认为2,代表默认将二维数组拍平

> 如果单纯想拍平二维数组可以用 Array.prototype.concat.apply([], [1, [2, 3]])

``` js
const arr = [1, [2, 3, [4, 5]]]

const sum = arr.flat() // [1, 2, 3, [4, 5]]
const sum2 = arr.flat(3) // [1, 2, 3, 4, 5]
```

### slice()
切割数组, 不会改变原数组

``` js
const arr = [1, 2, 3, 4, 5, 6]
const sum = arr.slice(2, 5) // sum = [3, 4, 5], arr = [1, 2, 3, 4, 5, 6]
```

## 数组排序

### sort()
数组排序,会改变原数组,返回的也是排序后的元素组

默认排序是按照 `ASCII码` 来从小到大进行排序,首位比完比次位这样依次比下去
> 例如: 'ab' < 'abc'   'ab' < 'ac'   'Abc' < 'abc'   'abc' === 'abc'

``` js
var arr = ['Banana', 'Orange', 'Apple', 'Mango'];
const sum = arr.sort() // sum = arr = ['Apple', 'Banana', 'Mango', 'Orange']

var arr2 = [100, 2, 10, 25];
const sum2 = arr2.sort() // sum2 = arr2 = [10, 100, 2, 25]
```

但是 `25` 和 `100` 按照这样的规则会有问题,因为 `sort` 默认是将数字转换为字符串了,然后 `1` 比 `2` 小,所以 `100` 排前面,但是我们的预期时想 `100` 在 `25` 之前,所以这里要用到自定义排序

::: tip
自定义排序规则: <br>
返回大于0的值  =>  b在前 <br>
返回小于0的值  =>  a在前 <br>
返回0         =>  a和b位置不变
:::

``` js
// 纯数字数组排序
var arr = [100, 2, 10, 25]
arr.sort((a, b) => a - b) // arr = [2, 10, 25, 100] 升序
arr.sort((a, b) => b - a) // arr = [100, 25, 10, 2] 降序

// 混合排序
var arr = [100, 10, 'abc', 2, 'ab', 25, 'Ac']

function sortfun(a, b) {
  const typeA = typeof a
  const typeB = typeof b
  
  if (typeA === 'number' && typeB === 'number') {
    return a - b
  } else if (typeA === 'string' && typeB === 'string') {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  } else if (typeA === 'string' && typeB === 'number') {
    return 1
  } else if (typeA === 'number' && typeB === 'string') {
    return -1
  }
}

arr.sort(sortfun) // [2, 10, 25, 100, 'Ac', 'ab', 'abc']
```

排序对象数组
``` js
var cars = [
  { type: "Volvo", year: 2016 },
  { type: "Saab", year: 2001 },
  { type: "BMW", year: 2010 }
]

cars.sort((a, b) => a.year - b.year) // 按照年份升序

cars.sort((a, b) => { // 按照字符大小升序
  const x = a.type.toLowerCase()
  const y = b.type.toLowerCase()
  if (x > y) return 1
  if (x < y) return -1
  return 0
})
```


### reverse()
数组反转顺序,会改变原数组,返回的也是排序后的元素组

``` js
var arr = ['Banana', 'Orange', 'Apple', 'Mango'];
const sum = arr.reverse() // sum = arr = ['Mango', 'Apple', 'Orange', 'Banana']
```

## 其他

### 找出数组最大 & 最小值
1. sort() 的升序 / 降序后取第一位
2. Math.max.apply(null, arr)
3. Math.min.apply(null, arr)

### 数组去重
+ Set
+ for循环,includes判断有没有重复的,重新push进一个新的

### 识别数组
+ Array.isArray
+ Object.prototype.toString.call(arr) === '[object Array]'
+ [] instanceof Array (局限性,在iframe中的父子页面的Array的引用地址是不一样的)
+ Array.prototype.isPrototypeOf(arr) 也有上面的局限性问题

### 删除数组
+ splice
+ slice
+ pop
+ shift
+ delete
删除数组目标下表的值,使其变为空
``` js
const arr = [1, 2, 3]
delete arr[0] // arr = ['', 2, 3]
```

+ 操作length
``` js
var arr = [1, 2, 3]
arr.length = 2 // arr = [1, 2] 
```