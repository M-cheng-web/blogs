# typescript

![类型阶梯图](https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/image.1kovoelbc928.webp)

## 安装demo环境
安装完毕后执行 `ts-node index.ts` 就可以执行 index.ts 文件内容
```
npm i @types/node --save-dev （node环境支持的依赖必装）
npm i ts-node --g
```

+ `tsc --init` 生成 `tsconfig.json` 文件

## tsconfig.json 配置
具体配置项详解
```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息
  "target": "ES5", // 目标语言的版本 指定编译js 的版本例如es5  es6
  "module": "CommonJS", // 生成代码的模板标准 默认common.js  可选es6模式 amd  umd 等
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 是否在编译过程中删除文件中的注释
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}

// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

## 基础类型
基础类型：Boolean、Number、String、null、undefined 以及 ES6 的  Symbol 和 ES10 的 BigInt。

+ 字符串类型可以带上字符串模板
``` ts
let a: string = '123' // 普通声明
let str: string = `dddd${a}` // 也可以使用es6的字符串模板
```

+ 使用构造函数创造的对象并不等于基础类型（布尔、数字、字符串）
``` ts
const b:boolean = new Boolean(true) // ❎
const b:Boolean = new Boolean(true) // ✅

const n:number = new Number() // ❎
const n:Number = new Number() // ✅

const s:string = new String() // ❎
const s:String = new String() // ✅
```

+ void 表示空值无返回，也可以定义**undefined 和 null类型**

+ null和undefined类型
``` ts
let u: undefined = undefined; // 定义 undefined
let n: null = null; // 定义null
```

**与 void 的区别是，undefined 和 null 是所有类型的子类型。比方说 undefined 类型的变量，可以赋值给 string 类型的变量，void类型不可以分给其他类型**

## 顶级类型(any unknown)
Any 类型 和 unknown 顶级类型

### any特性
1. 没有强制限定哪种类型，可以随时切换类型
2. 声明变量的时候没有指定任意类型默认为any
3. 如果使用any 就失去了TS类型检测的作用(anyscript)
``` ts
let anys:any = 123
anys = '123'
anys = true

let anys
anys = '123'
anys = true
```

### unknown特性
+ 与 any 一样，所有类型都可以分配给unknown
+ 相比于 any 但它更安全
+ unknow类型比any更加严格当要使用any 的时候可以尝试使用unknow
+ unknown类型不能赋值给其他类型（可以接收任意类型但不能赋值其他类型，除了any）
+ 如果一个对象声明 unknow类型，此对象是不能调用属性和方法的
``` ts
//unknown 可以定义任何类型的值
let value: unknown;
value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = null;             // OK
value = undefined;        // OK
value = Symbol("type");   // OK

// 这样写会报错unknow类型不能作为子类型只能作为父类型 any可以作为父类型和子类型
// unknown类型不能赋值给其他类型
let names:unknown = '123'
let names2:string = names // ❎
// 这样就没问题 any类型是可以的
let names:any = '123'
let names2:string = names // ✅

// unknown可赋值对象只有unknown 和 any
let bbb:unknown = '123'
let aaa:any= '456'
aaa = bbb // ✅
bbb = aaa // ✅

// any类型在对象没有这个属性的时候还在获取是不会报错的
let obj:any = {b:1}
obj.a

// 如果是unknow 是不能调用属性和方法
let obj:unknown = {b:1,ccc:():number=>213}
obj.b // ❎
obj.ccc() // ❎
```

## 接口和对象
定义一种约束，让数据的结构满足约束的格式

### 基本使用
interface 遇到重名的会合并
``` ts
interface Person {
  a:string,
  b?:string, // 可选属性
  readonly c:string, // 只读属性
  [propName: string]: any; // 任意属性
  cb: () => void, // 函数类型
}

interface Person {
  d:string,
}

const person:Person  = {
  a: '123',
  d: '1234',
  c: '12345',
  cb: () => {
    console.log(123)
  }
}
```

### 函数接口
``` ts
interface Fn {
  (x: number, y: string): string
}
const fun: Fn = function(x: number, y: string) {
  return y;
}
```

## 数组类型
``` ts
let arr:number[] = [123] // 类型加中括号
let arr:number[] = [1,2,3,'1'] // 这样会报错定义了数字类型出现字符串是不允许的
let arr:number[] = [1,2,3,] // 操作方法添加也是不允许的
arr.unshift('1')

var arr: number[] = [1, 2, 3]; // 数字类型的数组
var arr2: string[] = ["1", "2"]; // 字符串类型的数组
var arr3: any[] = [1, "2", true]; // 任意类型的数组
var arr4: [number, string, boolean] = [1, "2", true]; // 限定个数以及类型
let data:number[][] = [[1,2], [3,4]]; // 多维数组

let arr:Array<number> = [1,2,3,4,5] // Array<类型>
```

### 用接口表示数组
``` ts
// 表示：只要索引的类型是数字时，那么值的类型必须是数字
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

### arguments类数组
``` ts
function Arr(...args:any): void {
  let arr:number[] = arguments // 错误的arguments 是类数组不能这样定义
}
Arr(111, 222, 333)

function Arr(...args:any): void {
  let arr:IArguments = arguments // ts内置对象 IArguments 定义
}
Arr(111, 222, 333)

//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
```

## 函数扩展
``` ts
// 参数不能多不能少，必须一一对应
const fn = (name: string, age:number): string => {
  return name + age
}

// 可选参数 & 默认参数
const fn = (name: string = '我是默认参数', age?:number): string => {
  return name + age
}

// 定义剩余参数
const fn = (array:number[], ...items:any[]):any[] => {
  return items
}

```

### 接口定义函数
``` ts
interface Add {
  (num:  number, num2: number): number
}
const fn: Add = (num: number, num2: number): number => {
  return num + num2
}
fn(5, 5)
```

### 函数重载
相当于根据函数入参不同可以有多种调用方式，函数重载只是把多种调用方式给显示声明了
``` ts
function fn(params: number): number;
function fn(params: number, params2: string): string;
function fn(params: any, params2?: any): number | string {
  if (typeof params === 'number') {
    return params
  }
  if (typeof params2 === 'string') {
    return params2
  }
  return params
}

fn(123);
fn(123, '456');
```

## 联合类型 | 交叉类型 | 类型断言
### 联合类型
指的是或的意思
``` ts
let myPhone: number | string  = '010-820'

const fn = (something:number | boolean):boolean => {
  return !!something
}
```

### 交叉类型
指的是合的意思
``` ts
interface People {
  age: number,
  height： number
}
interface Man{
  sex: string
}
const xiaoman = (man: People & Man) => {
  console.log(man.age)
  console.log(man.height)
  console.log(man.sex)
}
xiaoman({age: 18,height: 180,sex: 'male'});
```

### 断言
``` ts
interface A {
  run: string
}
interface B {
  build: string
}
const fn = (type: A | B): string => {
  // 这样写是有警告的应为B的接口上面是没有定义run这个属性的
  // return type.run

  // 这样就没问题
  return (type as A).run
}
```

针对any断言
``` ts
// 这样写会报错因为window没有abc这个东西
window.abc = 123

// 可以使用any临时断言在 any 类型的变量上，访问任何属性都是允许的
(window as any).abc = 123
```

as const
``` ts
const names = '小满'
names = 'aa' //无法修改

let names2 = '小满' as const
names2 = 'aa' //无法修改

let a1 = [10, 20] as const;
const a2 = [10, 20];

a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改
a2.unshift(30); // 通过，没有修改指针
```

## ts内置对象
### ECMAScript 内置对象
Boolean、Number、string、RegExp、Date、Error
``` ts
let b: Boolean = new Boolean(1)
let n: Number = new Number(true)
let s: String = new String('xxxx')
let d: Date = new Date()
let r: RegExp = /^1/
let e: Error = new Error("error!")
```

### DOM 和 BOM 的内置对象
``` ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
```

## Class 类
定义类，不允许直接在constructor 定义变量的 需要在constructor上面先声明，但是声明了可以不用
``` ts
class Per {
  name: string
  age: number = 0
  xxx: number
  constructor(name: string, age?: number) {
    this.name = name;
  }
}
const p = new Per('1')
```

### 修饰符
+ public 公共的
+ private 私有的
+ protected 受保护的
``` ts
class Per {
  public name: string // 内部外部都可以访问，默认是public
  private age: number = 0 // 只能在内部访问 不能在子类中访问
  protected xxx: number // 只能在内部和继承的子类中访问 不能在外部访问
  constructor(name: string, age?: number) {
    this.name = name;
    if (age) {
      this.age = age;
    }
  }
  // 内部变量可以通过这种方式获取
  getAge() {
    return this.age
  }
  // 受保护的变量也只能通过这样的方式获取
  getXxx() {
    return this.xxx
  }
}

class CPer extends Per {
  constructor() {
    super('1', 123)
  }
  getXxx() {
    return this.xxx
  }
}
```

### 静态属性 & 静态方法
直接通过类访问，不需要实例化
``` ts
class Per {
  static xxx: number 
  static getAge() {
    return this.xxx
  }
}
Per.xxx = 123
Per.getAge() // 123
```

### interface 定义类
这里展示了 继承+实现接口 (实现多个接口用逗号分隔)
``` ts
interface PerA {
  name: string
}
interface PerB {
  age: number
  getName(type: boolean): string
}
class A {
  xxx: string
  constructor() {
    this.xxx = 'xxx'
  }
}

class Per extends A implements PerA,PerB {
  name: string
  age: number
  constructor(name: string, age: number) {
    super()
    this.name = name
    this.age = age
  }
  getName(type: boolean): string {
    return this.name
  }
}
```

### 抽象类
抽象类的意义在于抽出多个类的公共类，抽象类不能实例化，抽象方法必须在派生类中实现
``` ts
abstract class A {
  xxx: string
  constructor() {
    this.xxx = 'xxx'
  }
  // 抽象类中方法不能写逻辑，只能定义
  abstract getXXX(): string
}

class Per extends A {
  constructor() {
    super()
  }
  getXXX() {
    return this.xxx
  }
}
```

## 元组
如果需要一个固定大小的不同类型值的集合，则需要使用元组
``` ts
let arr:[number,string] = [1,'string']

let arr2: readonly [number,boolean,string,undefined] = [1,true,'sring',undefined]

let a:[x:number, y?:boolean] = [1]

let excel: [string, string, number, string][] = [
  ['title', 'name', 1, '123'],
  ['title', 'name', 1, '123'],
  ['title', 'name', 1, '123'],
  ['title', 'name', 1, '123'],
  ['title', 'name', 1, '123'],
]
```

## 枚举

### 数字枚举
``` ts
// 不定义初始值，那么默认 - Red:0 Green:1 BLue:2
enum Types{
  Red,
  Green,
  BLue
}

// 定义初始值为一，其他值会递增 - Red:1 Green:2 BLue:3
enum Types{
  Red = 1,
  Green,
  BLue
}

// 全部自己定义
enum Types{
  Red = 1,
  Green = 3,
  BLue = 4
}
```

### 字符串定义
字符串定义或者混合定义 则需要每个值都显示声明
``` ts
enum Types{
  Red = 'red',
  Green = 'green',
  BLue = 'blue',
  Yes = 1
}
```

### 接口枚举
``` ts
enum Types {
  yyds,
  dddd
}
interface A {
  red: Types.yyds
}
let obj:A = {
  red: Types.yyds // 尽量这样定义
  // red: 2 // 当枚举值为数字类型时也不会报错，但为数字类型时则报错，所以进来还是用第一种方式
}
```

### const enum
const枚举可以减少生成的代码

+ const声明
``` ts
enum Ty {
  yyds,
  dddd = 'xxx'
}
console.log(Ty.dddd);

// 编译后的代码
console.log("xxx" /* Ty.dddd */);
```

+ 普通声明
``` ts
enum Ty {
  yyds,
  dddd = 'xxx'
}
console.log(Ty.dddd);

// 编译后的代码
var Ty;
(function (Ty) {
    Ty[Ty["yyds"] = 0] = "yyds";
    Ty["dddd"] = "xxx";
})(Ty || (Ty = {}));
console.log(Ty.dddd);
```

### 反向映射
在纯数字映射中，key和value能互相转换
``` ts
enum Enum {
  fall
}
let a = Enum.fall;
console.log(a); // 0
let nameOfA = Enum[0];
console.log(nameOfA); // fall
```

## 类型推论 & type 类型别名
``` ts
let str = "zxc" // 在没有明确指定类型的时候ts会推测出一个类型

let ste2 // 如果没定义类型也没有赋值，ts会推断为 any类型
```

### type 类型别名
type 和 interface 区别
1. interface可以继承  type 只能通过 & 交叉类型合并
2. type 可以定义 联合类型 和 可以使用一些操作符 interface不行
3. interface 遇到重名的会合并 type 不行
``` ts
type str = string
let s:str = "xxxx"

type str = () => string
let s: str = () => "xxxx"

type str = string | number
let s: str = 123
let s2: str = '123'
```

### type 高级用法
`1 extends number` 中的 `extends` 表示 1是否属于number，根据类型图我们可以知道1是属于number类型的
``` ts
type a = 1 extends number ? string : boolean
const b:a = 'asd'
```

## never 类型
never 类型表示不应该存在的状态
``` ts
// 返回never的函数必须存在无法达到的终点
// 因为必定抛出异常，所以 error 将不会有返回值
function error(message: string): never {
  throw new Error(message);
}

// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
  while (true) {}
}
```
### never 与 void 的差异
``` ts
// void类型只是没有返回值 但本身不会出错
function Void():void {
  console.log();
}

// 只会抛出异常没有返回值
function Never():never {
  throw new Error('aaa')
}
```

### 实际场景
``` ts
type A = 'a' | 'b' | 'c'
function isXiaoMan(value: A) {
   switch (value) {
      case "a":
        break
      case "b":
        break
      case "c":
        break
      default:
        // 用于场景兜底逻辑
        const error:never = value;
        return error
   }
}
```

## 泛型
### 函数泛型
当调用函数要求函数会根据入参类型而调整出参的类型时，可以用泛型解决此类问题
``` ts
function Add<T>(a: T, b: T): Array<T>  {
  return [a,b]
}
Add(1, 2) // 也可以直接这样，ts会自动判断泛型为 number
Add<number>(1, 2)
Add<string>('1', '2')
```

多泛型参数的场景
``` ts
function Sub<T, U>(a:T, b:U):Array<T | U> {
  const params:Array<T | U> = [a,b]
  return params
}
Sub(false, 1)
Sub<Boolean, number>(false, 1)
```

### 泛型接口
``` ts
interface MyInter<T> {
  (arg: T): T
}
function fn<T>(arg: T): T {
  return arg
}

// 这种直接限定 result 只能传入 number类型参数
let result: MyInter<number> = fn
result(123)

// 这种还是可以随意放入参
let result2 = fn
result('123')
```

### 泛型约束
``` ts
interface Len {
  length: number
}

// 如果不加继承Len会报错，因为ts不知道arg是否有length属性
function getLegnth<T extends Len>(arg:T) {
  return arg.length
}
```

### 使用 keyof 约束对象
``` ts
function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
let o = { a: 1, b: 2, c: 3 }

prop(o, 'a')
prop(o, 'd') // 此时就会报错发现找不到
```

### 泛型类
泛型类就要求手动声明泛型，ts自动推导会为 unknow
``` ts
class Sub<T>{
  attr: T[] = [];
  add (a:T):T[] {
     return [a]
  }
}

let s = new Sub<number>()
s.attr = [1,2,3]
s.add(123)

let str = new Sub<string>()
str.attr = ['1','2','3']
str.add('123')
```

## 命名空间
+ 内部模块，主要用于组织代码，避免命名冲突。
+ 命名空间内的类**默认私有**
+ 通过 export 暴露
+ 通过 namespace 关键字定义

``` ts
namespace a {
  export const Time: number = 1000;
  export const fn = <T>(arg: T): T => {
    return arg;
  };
  fn(Time);
}

namespace b {
  export const Time: number = 1000;
  export const fn = <T>(arg: T): T => {
    return arg;
  };
  fn(Time);
}

a.Time;
b.Time;
```

嵌套命名空间
``` ts
namespace a {
  export namespace b {
    export class Vue {
      parameters: string;
      constructor(parameters: string) {
        this.parameters = parameters;
      }
    }
  }
}
let v = a.b.Vue;

new v("1");
```

合并命名空间
``` ts
namespace a {
  export const b = 1
}
namespace a {
  export const c = 2
}
console.log(a.b); // 1
console.log(a.c); // 2
```

## 三斜线指令
与 `import` 类似，引入其他文件(三斜线指令仅可放在包含它的文件的最顶端)

a.ts
``` ts
namespace a {
  export const c = 2
}
```

index.ts
``` ts
/// <reference path="./a.ts" />

namespace a {
  export const b = 1
}
console.log(a); // 这个时候会发现 a有 c属性的ts提示
// 但是奇怪的是，当我在这输出没有c属性，当我编译为js时（tsconfig.json设置 "outFile": "./lib/index.js"），发现这个js文件的输出是带有c属性的
```

### 声明文件引入
根据上面的特性，可以发现很适合声明文件的引入
``` ts
/// <reference path="util.d.ts" />
/// <reference path="zlib.d.ts" />
```

## 声明文件 d.ts
``` ts
declare var a // 声明全局变量
declare function fn // 声明全局方法
declare class FF // 声明全局类
declare enum Li // 声明全局枚举类型
declare namespace home // 声明（含有子属性的）全局对象
interface 和 type  // 声明全局类型
/// <reference /> 三斜线指令
```

## Mixins混入
### 对象混入
这里使用 Object.assign 会使 people 类型会被ts自动推断为 Name & Age & Sex
``` ts
interface Name {
  name: string
}
interface Age {
  age: number
}
interface Sex {
  sex: number
}

let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }

const people = Object.assign(people1,people2,people3)
```

### 类混入
示例代码报错可将 `tsconfig.json -> "strict": false`
``` ts
class A {
  type: boolean = false;
  changeType() {
    this.type = !this.type;
  }
}
class B {
  name: string = "张三";
  getName(): string {
    return this.name;
  }
}
class C implements A, B {
  type: boolean;
  changeType: () => void;
  name: string = '张三';
  getName: () => string;
}
function Mixins(curCls: any, itemCls: any[]) {
  itemCls.forEach((item) => {
    Object.getOwnPropertyNames(item.prototype).forEach((name) => {
      curCls.prototype[name] = item.prototype[name];
    });
  });
}
Mixins(C, [A, B]); // 类似于抽象类的实现，把A，B的原型链属性附到C上面了

const c = new C()
c.getName() // 张三
c.type // undefined (因为针对于C来说并没有定义默认值)
```

## 装饰器 Decorator
要启用装饰器要 `tsconfig.json -> "experimentalDecorators": true`
1. 类装饰器 ClassDecorator
2. 属性装饰器 PropertyDecorator
3. 参数装饰器 ParameterDecorator
4. 方法装饰器 MethodDecorator PropertyDescriptor 'https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10'

装饰器工厂
``` ts
const watcher = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getParams = <T>(params: T): T => {
      return params;
    };
    target.prototype.getOptions = (): string => {
      return name;
    };
  };
};
const watcher2 = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getNames = (): string => {
      return name;
    };
  };
};
@watcher("name")
@watcher2("name2")
class A {
  constructor() {}
}

const a1 = new A();
console.log((a1 as any).getParams("123")); // 123
console.log((a1 as any).getOptions()); // name
console.log((a1 as any).getNames()); // name2
```

### 方法装饰器
返回三个参数
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. 成员的名字
3. 成员的属性描述符
``` ts
const met: MethodDecorator = (...args) => {
  console.log(args);
  // 输出:
  // [
  //   {},
  //   'getName',
  //   {
  //     value: [Function: getName],
  //     writable: true,
  //     enumerable: false,
  //     configurable: true
  //   }
  // ]
};
class A {
  @met
  getName(): string {
    return "小满";
  }
}

const a1 = new A();
```

### 属性装饰器
返回两个参数
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 属性的名字
``` ts
const met: PropertyDecorator = (...args) => {
  console.log(args); // [ {}, 'name', undefined ]
};
class A {
  @met
  name: string;
  constructor() {}
}
const a1 = new A();
```

### 参数装饰器
返回三个参数
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. 成员的名字
3. 参数在函数参数列表中的索引
``` ts
const met: ParameterDecorator = (...args) => {
  console.log(args); // [ {}, 'setParasm', 0 ]
};
class A {
  constructor() {}
  setParasm(@met name: string = "213") {}
}
const a1 = new A();
```

## 进阶 - Proxy & Reflect
``` ts
type Person = {
  name: string;
  age: number;
  text: string;
};

const proxy = (object: any, key: any) => {
  return new Proxy(object, {
    get(target, prop, receiver) {
      console.log(`get key======>${key}`);
      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value, receiver) {
      console.log(`set key======>${key}`);

      return Reflect.set(target, prop, value, receiver);
    },
  });
};

const logAccess = (object: Person, key: "name" | "age" | "text") => {
  return proxy(object, key);
};

let man: Person = logAccess(
  {
    name: "小满",
    age: 20,
    text: "我的很小",
  },
  "age"
);

// 这里会被拦截
man.age = 30;
```

## 进阶 - Partial & Pick
Partial - 将类型的所有属性设置为可选
``` ts
// Partial 源码
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type Person = {
  name: string,
  age: number
}
type p = Partial<Person>

// 此时p转化为此类型
type p = {
  name?: string | undefined;
  age?: number | undefined;
}
```

Pick - 选取指定一组属性，返回一个新的类型定义
``` ts
// Partial 源码
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Person = {
  name: string,
  age: number,
  text: string,
  address: string
}
type Ex = "text" | "age"
type A = Pick<Person, Ex>

// 此时A转化为此类型
type A = {
  text: string,
  age: number,
}
```

## 进阶 - Record & Readonly
Readonly - 将所有属性设置为只读(与Partial类似)
``` ts
// Readonly源码
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

Record - 约束对象的key，value
``` ts
// Record源码
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// 日常使用
const obj:Record<string, number> = {
  name: 123
}
```

## 进阶 - infer类型提取
infer 是TypeScript 新增到的关键字 充当占位符

例如我们要实现此功能：定义一个类型 如果是数组类型 就返回 数组元素的类型 否则 就传入什么类型 就返回什么类型
``` ts
// T[number] 中的number可以用任何数字代替，例如0、1、2，表示的是取数组中的所有下标内容(因为下标是数字)
type Infer<T> = T extends Array<any> ? T[number] : T

type A = Infer<(boolean | string)[]> // boolean | string 类型
type B = Infer<null> // unknow 类型
type C = Infer<string[]> // string 类型
type D = Infer<[string, boolean]> // boolean | string 类型
```

使用 infer 修改后则是这样
``` ts
type Infer<T> = T extends Array<infer U> ? U : T
type A = Infer<(string | Symbol)[]> // Symbol | string 类型
```

再来个例子
``` ts
type TupleToUni<T> = T extends Array<infer E> ? E : never

type TTuple = [string, number];
type ToUnion = TupleToUni<TTuple>; // string | number
type ToUnion2 = TupleToUni<string>; // never
```

## 进阶 - infer递归
例子 - 类型反转
``` ts
type Arr = [1, 2, 3, 4]

type ReveArr<T extends any[]> = T extends [infer First, ...infer rest] ? [...ReveArr<rest>, First] : T

type Res = ReveArr<Arr> // [4, 3, 2, 1]
```

## 类型兼容

### 协变(鸭子类型)
A B 两个类型完全不同但是竟然可以赋值并无报错B类型充当A类型的子类型，当子类型里面的属性满足A类型就可以进行赋值，也就是说不能少可以多，这就是协变
``` ts
interface A {
  name:string
  age:number
}
interface B {
  name:string
  age:number
  sex:string
}
let a1:A = {
  name:"老墨我想吃鱼了",
  age:33,
}
let b:B = {
  name:"老墨我不想吃鱼",
  age:33,
  sex:"女"
}

a1 = b // 不会报错
```

### 逆变
fna 赋值 给 fnb 其实最后执行的还是fna 而 fnb的类型能够完全覆盖fna 所以这一定是安全的，相反fna的类型不能完全覆盖fnb少一个sex所以是不安全的
``` ts
interface A {
  name:string
  age:number
}
interface B {
  name:string
  age:number
  sex:string
}
let fna = (params:A) => {
}
let fnb = (params:B) => {
}
fna = fnb // 错误
fnb = fna // 正确
```

需要在 `tsconfig.json` 中设置 `"strictFunctionTypes": true` 显示声明不支持协变上面demo才会报错，设置为false就是支持则不会报错