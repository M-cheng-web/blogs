# 变量提升
> JS中有一个特性,就是在变量和函数声明之前就可以使用它们,就像是变量声明和函数声明被JS提升到了代码顶部,实际中JS并不会移动我们的代码,所以这并不是真正意义上的提升

JS是单线程语言,会先进行编译阶段然后才是执行阶段<br>
在编译阶段会检测到所有的变量以及函数声明,这些变量和函数声明都被添加到词法环境(Lexical Environment)
这个对象中(此对象存放在JS数据结构内的内存中),所以这些变量和函数能在它们真正声明之前使用

**其实都有变量提升,但只有var才会在编译阶段默认赋值为undefined**

## 函数提升
``` js
// 函数声明方式
sayHi() // Hi there!
function sayHi() {
  console.log('Hi there!')
}

// 函数表达式方式
sayNo() // 报错
var sayNo = function() {
  console.log('No there!')
}
```
函数声明: 在编译阶段会被添加到`词法环境(Lexical Environment)`中,当JS引擎遇到sayHi()函数时,它会从词法环境中找到这个函数并执行它

函数表达式: 在编译阶段会被添加到词法环境且初始化为`undefined`,对undefined执行方法肯定会报错

编辑阶段的词法环境对象
``` js
var lexicalEnvironment = {
  sayHi: < func >
}
```

## var 变量提升
为什么name会初始化为undefined? 因为JS在编译阶段会找到var关键字声明的变量并添加到 `词法环境` 中并初始化为 `undefined` ,在后面的赋值语句时才会把这个值赋值到这个变量
``` js
console.log(name)   // 'undefined'
var name = 'John Doe'
console.log(name)   // 'John Doe'
```

此时的词法环境对象
``` js
// 编译阶段
lexicalEnvironment = {
  name: undefined
}

// 执行阶段
lexicalEnvironment = {
  name: 'John Doe'
}
```

## let & const 提升
所有的声明( `function, var, let, const, class` )都会变量提升,但是只有使用 `var` 关键字声明的变量,才会被初始化为 `undefined` ,而 `let` 和 `const` 是不会被初始化的,意味着只有在声明之后才能正常访问该变量,如果 `let` 和 `const` 在被声明的地方还找不到值的话,就会被赋值为 `undefined` (就是 `let a` 这样的)
``` js
console.log(a)  // ReferenceError: a is not defined
let a = 3
```

编译阶段的词法环境对象
``` js
var lexicalEnvironment = {
  a: < uninitialized > // 表示未初始化状态
}
```

## class 提升
同let和const一样,class在JavaScript中也是会被提升的,在被真正赋值之前都不会被初始化值
``` js
let peter = new Person('Peter', 25) // ReferenceError: Person is not defined
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
let John = new Person('John', 25); 
console.log(John) // Person { name: 'John', age: 25 }
```

## 隐式声明提升
JS中的变量声明分显式声明和隐式声明
``` js
var age = 12 // 显式声明
bigAge = 'cccc' // 隐式声明
```

如果都是在全局范围内,这俩声明都会声明为window下的变量,但是如果在编译阶段这两种声明是不同的表现
``` js
console.log(age) // undefined
console.log(bigAge) // 报错(未声明)

var age = 12 // 显式声明
bigAge = 'cccc' // 隐式声明
```
age的输出是符合预期的 `undefined` ,bigAge因为在编译阶段并没有初始化,所以会报错

**所以要牢记只有var才会在编译阶段默认赋值为undefined**