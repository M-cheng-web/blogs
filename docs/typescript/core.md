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
