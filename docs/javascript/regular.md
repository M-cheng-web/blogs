# 正则
这里不讲多,主要是放出来几个实践运用

## 分组与引用

### 捕获组
当我们用一对小括号 `()` 包住一个正则表达式时就形成了捕获组

作用:
1. 匹配括号内的正则表达式
2. 拆分匹配到的数据
3. 反向引用

``` js
const str = "12,12"
const patt = /^(\d{2}),\1$/ // \1 表示第一个括号内捕获到的值,同理可以有 \2, \3, 最多到 \9
console.log(str.match(patt)) // ['12,12', '12', index: 0, input: '12,12', groups: undefined]
// 12,12 表示匹配到的结果
// 12 表示第一个括号内捕获到的值
// index 表示结果字符串在完整字符串中的开始下标
// input 表示完整字符串
// groups 表示命命捕获组,会在后续讲到

// 注意: 当 patt = /^(\d{2}),(\d{2})$/ 时,结果为 ['12,12', '12', '12' index: 0, input: '12,12', groups: undefined], 不是因为用反向引用不会被当作一个捕获组,所以在结果中没有打印,而是因为反向引用的结果会隐藏
```

### 非捕获组
不能再使用 `\1` 这样的反向引用,在捕获组基础上,也就是 `()` 内前面加上 `?:` 就能变成非捕获组,

``` js
const str = "12,12"
const patt = /^(?:\d{2}),(?:\d{2})$/
console.log(str.match(patt)) // ['12,12', index: 0, input: '12,12', groups: undefined]
// 可以看到结果只显示了匹配结果,不会有各个捕获组的捕获结果
```

### 命名捕获组
``` js
const str = "abc,12,s,b,abc,abc12"
const patt = /(?<firstName>\w{3}),(\w{2}),(?:\w{1}),(\w{1}),\k<firstName>,\1\2/
console.log(str.match(patt))
// 结果为
[ 
  'abc,12,s,b,abc,abc12', 'abc', '12', 'b', index: 0, input: 'abc,12,s,b,abc,abc12',
  groups: {
    firstName: "abc"
  }
]

// 可以发现
// 1. 命名捕获组和普通捕获组能共存
// 2. 命名捕获组的结果在groups对象中会显现
// 3. 命名捕获组使用方式为 \k<name>
// 4. 命名捕获组的结果也能用 /1 的方式反向引用
```