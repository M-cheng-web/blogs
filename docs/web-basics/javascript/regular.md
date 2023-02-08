# 正则
这里不讲多,主要是放出来几个实践运用

## 基础
### 转义字符
| key |          value           |    备注    |
| --- | :----------------------: | :--------: |
| \n  |        匹配换行符        |            |
| \r  |        匹配回车符        |            |
| \t  |        匹配tab键         |            |
| \v  |      匹配垂直制表符      |            |
| \w  |   匹配字母/数字/下划线   | [0-9a-Z_]  |
| \W  | 匹配非 字母/数字/下划线  | [^0-9a-Z_] |
| \s  | 匹配空白字符(空格,tab等) |  [\t\n\v]  |
| \S  |      匹配非空白字符      | [^\t\n\v]  |
| \d  |     匹配数字字符,0~9     |   [0-9]    |
| \D  |      匹配非数字字符      |   [^0-9]   |
| \b  |       匹配单词边界       |            |
| \B  |      匹配非单词边界      |            |
| \\\ |       匹配 \ 本身        |            |

### 量词
| key   |                        value                        |
| ----- | :-------------------------------------------------: |
| \{n}   |                      匹配 n 次                      |
| \{n,m} | 匹配n-m次,优先匹配m次,比如a{1,3},可以匹配aaa、aa、a |
| \{n,}  |  匹配n-∞次,优先匹配∞次,比如a{1,},可以匹配aaaaa....  |
| ?     |                 匹配0或1次,优先1次                  |
| +     |                  匹配1-n次,优先n次                  |
| *     |                  匹配0-n次,优先n次                  |
| .     |              匹配除 /n 之外的任意字符               |

### 修饰符
+ g: 全局修饰符
+ i: 忽略大小写
+ m: 匹配多行文本

## 相关api
### 验证
`search` `test` `match` `exec` 
``` js
var regex = /\d/;
var string = "abc123";
console.log( string.search(regex) ); // 3
console.log( regex.test(string) ); // true
console.log( string.match(regex) ); // ['1', index: 3, input: 'abc123', groups: undefined]
console.log( regex.exec(string) ); // ['1', index: 3, input: 'abc123', groups: undefined]
```

### 切分
`split`
``` js
var string = "html,css,javascript";
var regex = /,/;
console.log(string.split(regex)); // ['html', 'css', 'javascript']

var string = "2022-10-30";
var regex = /\D/;
console.log(string.split(regex)); // ['2022', '10', '30']
```

### 提取
基本上和上面的 `验证模块` 用的方法一样,不一样的是 `test` 和 `search` 获取值的方式,以及 `replace` 也可以使用正则提取
``` js
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
regex.test(string);
console.log( RegExp.$1, RegExp.$2, RegExp.$3 ); // "2017" "06" "26"

string.search(regex);
console.log( RegExp.$1, RegExp.$2, RegExp.$3 ); // "2017" "06" "26"
```

::: tip
这是 replace 提取的方式 <br>
注意它的第二个参数,也是把分组内捕获到的值传进来了
:::
``` js
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
var date = [];
string.replace(regex, (match, year, month, day) => {
	date.push(year, month, day);
});
console.log(date); // ["2017", "06", "26"]
```

### 替换
`replace`
``` js
var string = "2017-06-26";
var today = new Date( string.replace(/-/g, "/") );
console.log( today ); // Mon Jun 26 2017 00:00:00 GMT+0800 (中国标准时间)
```

### 注意点
1. `search` 和 `match` 会把字符串转为正则,例如将 `.` 转为通位符,需要这样: string.search('/\./')
2. `exec` 比 `match` 更强大, `match` 添加 `/g` 后不会显示捕获值,而 `exec` 还是可以展示

## 回溯法原理
回溯法也称试探法，它的基本思想是：从问题的某一种状态（初始状态）出发，搜索从这种状态出发所能达到的所有“状态”，当一条路走到“尽头”的时候（不能再前进），再后退一步或若干步，从另一种可能“状态”出发，继续搜索，直到所有的“路径”（状态）都试探过。这种不断“前进”、不断“回溯”寻找解的方法，就称作“回溯法”。（copy于百度百科）

所以我们在使用正则的时候要尽量精确一些,比如类似于 `.` 这样的少用一些...

产生回溯的地方
+ 贪婪量词(例如 `{1,2}` )
+ 惰性量词(例如 `{1,2}?` )
+ 分支结构(例如 `|` )

## 位置
### \b 和 \B
\b是单词边界，具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置

没搞懂什么意思,😭,感觉不像是在上面那句话一样直白,自己测了一下有点和想象中的出入

### 预搜索

``` js
// ?=  以 xxx(?=pattern)为例 就是捕获以pattern结尾的内容xxx
// ?!  以 xxx(?!pattern)为例 就是捕获不以pattern结尾的内容xxx
// ?<= 以(?<=pattern)xxx为例 就是捕获以pattern开头的内容xxx
// ?<! 以(?<!pattern)xxx为例 就是捕获不以pattern开头的内容xxx

const str = "123hell12ow#"
const patt = /(?<=.+)hell(?=.+)/;
console.log(str.match(patt)) // [hell]
```

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