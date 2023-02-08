# 基础

## 常见类型
+ 基础类型 `string number boolean`
+ 对象类型 `array object`

### 接口 & 类型别名
大部分时候我们是可以选择这俩任意一个,他俩的区别是接口可以添加新的属性,而类型别名是固定死的
``` ts
// 类型别名
type Point = {
  x: number;
  y: number;
}

// 接口
interface Point {
  x: number;
  y: number;
}

// 接口继承
interface Bear extends Point {
  honey: boolean
}


function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
}
```

### 类型断言
可以使用类型断言将其指定为一个更具体的类型,比如ts知道 `document.getElementById` 会返回 `HTMLElement`, 但你知道你获取的是 `HTMLCanvasElement`, 可以用断言使其更加具体
``` ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// 也可以使用尖括号语法
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

类型断言转换为一个更加具体或者更不具体的类型,不可以对一个已知类型强加断言,这样会报错
``` ts
const x = "hello" as number; // error
```

### 字面量判断
``` ts
declare function handleRequest(url: string, method: "GET" | "POST"): void

// 这样定义 method 字段只会被当做字符串,不会被 ts 识别为 "GET" | "POST"
const req = { url: "https://example.com", method: "GET" };

// 所以会报错: 类型“string”的参数不能赋给类型“"GET" | "POST"”的参数。ts(2345)
handleRequest(req.url, req.method);
```

解决:
+ 添加一个类型断言改变推断结果
``` ts
const req = { url: "https://example.com", method: "GET" as "GET" };

// 上下两个任意一个更改就可以了

handleRequest(req.url, req.method as "GET");
```

+ 使用 as const 把整个对象转为一个类型字面量
``` ts
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

### 非空断言
表示它的值不可能是 null 或者 undefined
``` ts
console.log(x!.toFixed());
```



## 函数
### 泛型函数
下面这种情况只能对 arr 进行 any 限制,因为不确定会返回什么,用上泛型函数就能限制传入传出了

简而言之就是泛型会推断出你的入参类型,当然你也可以自己手动加上类型

原则:
  + 尽可能用更少的类型参数
  + 如果可能的话,直接使用类型参数而不是约束它
  + 如果一个类型参数仅仅出现在一个地方,强烈建议重新考虑是否真的需要它

``` ts
function firstElement(arr: any[]) {
  return arr[0];
}

// 泛型函数
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// 甚至还可以进行更多的泛型
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
```

如果想访问泛型下的某个属性,那要借助 extends 来达到相关目的
``` ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
```

手动声明类型参数
``` ts
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

const arr = combine([1, 2, 3], ["hello"]) // 这样会报错

const arr = combine<string | number>([1, 2, 3], ["hello"]) // 手动指定则不会
```

### 函数重载
为了能兼容一个函数因为参数的不同导致返回结果不同的校验
``` ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
```

## 对象类型
### readonly
对于声明了只读的属性是不能再更改的
``` ts
interface SomeType {
  readonly prop: string;
}
function doSomething(obj: SomeType) {
  obj.prop = "hello";
  // Cannot assign to 'prop' because it is a read-only property.
}
```

不过对于对象的只读是可以更改其内部的值
``` ts
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  home.resident.age++;
}

function evict(home: Home) {
  // Cannot assign to 'resident' because it is a read-only property.
  home.resident = {
    name: "Victor the Evictor",
    age: 42,
  };
}
```

对于普通属性也可以通过别名来修改
``` ts
interface Person {
  name: string;
  age: number;
}
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};
let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'
```

### 索引签名
有的时候不能提前知道一个类型里的所有属性的名字,但是知道这些值的特征就可以用上索引签名

``` ts
interface StringArray {
  [index: number]: string;
  name: string;
}
const myArray: StringArray = getStringArray();
const secondItem = myArray[1]; // const secondItem: string

// 这样也行
const obj: StringArray = { 1: 'c' }

// 这样也行
const obj: StringArray = ['a', 'b']
```

### 属性继承
能够对当前定义的类型再次扩展
``` ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
interface ColorfulCircle extends Colorful, Circle {
  sss: number
}
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
  sss: 22
};
```

### 交叉类型
可以融合两种类型
``` ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
type ColorfulCircle = Colorful & Circle;
```

与继承的差异:
``` ts
// 这种情况则会报错,因为相冲突了
interface Colorful {
  color: string;
}
interface ColorfulSub extends Colorful { // error
  color: number
}

// 用交叉的方式则不会报错,此时 color 类型是 never,取得是 string 和 number 的交集
interface Colorful {
  color: string;
}
type ColorfulSub = Colorful & {
  color: number
}
```

### 对象泛型
当不确定某个参数的类型的时候,并且内部也依赖此类型时,可以用上泛型
``` ts
interface Box<Type> {
  contents: Type;
}
let boxA: Box<string> = { contents: "hello" };
```

### 元组类型
明确知道数组包含多少个元素,并且每个位置元素的类型都明确知道的时候,就适合使用元组类型
``` ts
type StringNumberPair = [string, number];

// readonly 元组类型
type StringNumberPair = readonly [string, number];
```

## 泛型
可以支持多种类型,可以限制入参和出参相同
``` ts
function identity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg.slice(1);
}

identity<number>([123, 345]) // 正确
identity<string>([123, 345]) // 错误
```

类型参数推断: 编辑器能基于我们传入的参数自动推断和设置type值
``` ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity("myString"); // 自动判断为 string 类型
```

但如果是复杂的情况,类型参数推断就不能正确识别
``` ts
function identity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg.slice(0);
}

identity(['345', 123]) // ts 在这里就不会正确推断
```

### 泛型类
确保类中的所有属性都使用了相同的类型
``` ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

### 泛型约束
如果想早一些获取到泛型的属性,或者是提前断言会有此属性,可以用上泛型约束(也可以理解为,此泛型对应的实际类型一定是有哪些属性的)
``` ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length); // 这里会报错,因为ts不知道arg有length属性
  return arg;
}

interface Lengthwise {
  length: number;
}
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}
loggingIdentity(3); // 这样也会报错,因为3并没有length属性
```

### 泛型约束使用类型参数
如果想要约束某个入参为另一个入参的属性,那么就用此方法来约束
``` ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
getProperty(x, "m"); // error: m 不在 x属性中
```

### 泛型中使用类类型
限制参数必须是类,且返回值也是这个类的实例
``` ts
function create<Type>(c: { new(): Type }): Type {
  return new c();
}
class B {
  xxxx: boolean = true;
}
create(B)
create(2) // error
```

## 命名空间
内部模块,主要用于组织代码避免命名冲突
``` ts
namespace a {
    export class Pr {
        cheng(): void {
            console.log(1)
        }
    }
}
namespace b {
    export class Pr {
        cheng(): void {
            console.log(2)
        }
    }
}
export {a, b}
```




