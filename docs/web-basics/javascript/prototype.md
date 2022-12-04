# 原型
## 构造函数 & 原型对象 & 实例对象
+ 构造函数指的是函数,可以被new的,有prototype属性的
+ 原型对象指的是构造函数的prototype(默认这个属性有constructor属性,且这个属性指针指向构造函数对象),手动向构造函数的prototype属性添加属性,那么原型对象会有这个添加的属性
+ 实例对象指的是对构造函数 new 之后所得到的对象
``` js
let A = function() { // 构造函数
  this.name = 'xin'
  this.xxx = 'han'
}
A.prototype // {constructor:f} 原型对象 默认只有一个 constructor指针(指向本身)

// 向 prototype添加 age属性
A.prototype.age = 123 // 添加后原型对象: {age: 123, constructor:f}

let person1 = new A() // 此时的person1 称为A的一个实例对象 { name: 'xin', xxx: 'han' }
```

## 构造函数的一些问题
像下面这种问题,调用了两次构造函数,但是sayName不是同一个Function实例<br>
这是执行了两次一样的代码且结果都是做了一样的事,而且还在实例对象中添加了 `sayName` 方法,这都是没有必要的
``` js
let Person = function(name, age, job) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name);
  };
}
let person1 = new Person("a", 29, "Software Engineer");
let person2 = new Person("a", 29, "Software Engineer");
```

解决: 把函数放在外面,这样sayName只是指向了构造函数外部的一个地址<br>
但是如果需要多个sayName会导致自定义类型引用的代码不能很好的聚集,可以通过原型链的方式解决
``` js
let Person = function(name, age, job) {
  this.name = name;
  this.sayName = sayName;
}
function sayName() {
  console.log(this.name);
};
let person1 = new Person("a", 29, "Software Engineer");
let person2 = new Person("a", 29, "Software Engineer");
```

最终解决: 利用`prototype`实现原型链
``` js
let Person = function(name, age, job) {
  this.name = name;
}
Person.prototype.sayName = function() {
  console.log(this.name);
}
```

## new操作符做了什么
1. 在内存中创建一个新对象
2. 让新对象的 `__proto__` 指向构造函数的 `prototype`
3. 把新对象的 `this` 赋值给构造函数内部的 `this`(即this指向新对象)
4. 执行构造函数内部的代码(即给新对象添加属性)
5. 如果构造函数返回对象,则返回该对象(无论这个对象是否为空); 否则返回刚创建的对象
``` js
const Sub = function() {
  this.age = 123
}
Sub.prototype.type = 1

// 方式一
let a = {};
a.__proto__ = Sub.prototype // 需要这一步的理由是拿到 Sub原型链上的属性
Sub.call(a)
return a

// 方式二
function F() {}
F.prototype = new Sub()
return new F()
```

## 原型相关方法
+ delete
如果想要一个实例对象不使用本身的属性,而是想用原型链上的属性<br>
可以用 `delete` 删除自身的这个属性,然后再去调用这个属性的时候会顺着 `__proto__` 去查找这个属性
+ isPrototypeOf()
确定两个对象之间的关系,判断原型链中是否包含某个实例对象<br>
**instanceof是判断某个实例对象是否能指向某个构造函数,但是instanceof在多窗口的情况下(例如iframe)并不是一个可靠的数组检测方法**
``` js
let a = new Person()
let b = {}
console.log(Person.prototype.isPrototypeOf(a)); // true
console.log(Person.prototype.isPrototypeOf(b)); // false
console.log(Object.prototype.isPrototypeOf(Person)); // true

console.log(Array.prototype.isPrototypeOf({})); // false
console.log(Array.prototype.isPrototypeOf([])); // true
```

+ Object.getPrototypeOf()
获取实例对象的 `__proto__`,也就是构造函数的`prototype`
``` js
let a = new Person()
let b = {}
console.log(Object.getPrototypeOf(a) === Person.prototype); // true
console.log(Object.getPrototypeOf(a) === a.__proto__); // true
```

+ Object.create(a)
创建一个新对象,且将这个新对象的 `__proto__` 指向a
``` js
let a = {
  name: 'cheng'
}
let b = Object.create(a)
b.age = 11

console.log(b); // {age: 11}
console.log(b.__proto__ === a); // true
```

+ hasOwnProperty()
用于确定某个属性是实例上还是原型对象上, 如果是不存在的属性也会返回false
``` js
function Person() {} 
Person.prototype.name = 'Nicholas' 
let person1 = new Person()
person1.age = 2
console.log(person1.hasOwnProperty('age')) // true
console.log(person1.hasOwnProperty('name')) // false
console.log(person1.hasOwnProperty('ccc')) // false
```

## 原型的一些知识点
+ 动态的原型链
这边是先创建实例,再添加原型对象,但结果还是可以拿到name属性,
原因是在没有找到的情况下,运行时会继续搜索原型对象,因为实例和
原型之间的链接就是简单的指针,而不是保存副本这样
``` js
function Person() { }
let a = new Person()
Person.prototype.name = 'cccc'

console.log(a.name) // cccc
```

+ 不要通过直接覆盖原型对象的方式赋值,对赋值之前的实例是破坏性的
> 记住如果是通过覆盖的方式赋值,那么实例对象的原型链指向创建时的原型对象
``` js
function Person() { }
let a = new Person()
Person.prototype = {
  name: 'cccc'
}
let b = new Person()
Person.prototype = {
  name: 'aaa'
}
// 如果是通过添加属性的方式就不会有问题
console.log(a.name) // undefined  这里就不能正常取值,意思是只能取实例对象创建时的原型对象
console.log(b.name) // cccc   这里就取的不是正常的值,意思是只能取实例对象创建时的原型对象
```

+ 有多个实例的情况下,其中一个实例更改原型上的属性,如果这个属性是对象或者数组就会影响其他实例的获取
``` js
function Person() { }
Person.prototype.age = [1, 2, 3]
let a = new Person()
let b = new Person()
a.age.push(4)
console.log(b.age) // [1, 2, 3, 4]
```

## 原型的缺陷
1. 实例对象在更改原型对象的值时会影响其他实例对象(不针对基础变量)
2. 子类型在实例化时不能给父类型的构造函数传参

### 盗用构造函数(解决问题一以及问题二)
解决问题一
> 这样的写法很糙,很符合"盗用"这个词,就是让父级构造函数替子级构造函数往this赋值而已~<br>
> 这样写是没有灵魂的,本质上每开辟一个新的实例都会在内部创建一个自身的color属性,没有原型链的灵魂了,但好像也没啥办法
``` js
function SuperType() {
  this.colors = ["red", "blue", "green"];
  this.name = 1
}
function SubType() {
  SuperType.call(this); // 继承 SuperType 
  this.name = 2
}
let instance1 = new SubType();
let instance2 = new SubType();
console.log(instance1) // {colors: Array(3), name: 2}
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black" 
console.log(instance2.colors); // "red,blue,green"
```

解决问题二
> 同理,加上参数即可食用
``` js
function SuperType(name) {
  this.name = name
}
function SubType(name) {
  SuperType.call(this, name);
}
let instance1 = new SubType(3);
console.log(instance1); // {name: 3}
```

暴露的问题
> 不能使用父级构造函数的原型对象中的属性
``` js
function SuperType(name) {
  this.name = name
}
SuperType.prototype.sub = 1
function SubType(name) {
  SuperType.call(this, name);
  this.age = 2
}
let instance1 = new SubType(3);
console.log(instance1.sub); // undefined 
```

### 组合继承
为了解决上面两种问题,使用组合继承,将两者的优点集中起来
+ 使用盗用构造函数解决实例间原型链属性互相影响问题
+ 使用原型链指向解决盗用构造函数不能访问父类原型对象问题

**核心是将 SubType.prototype.__proto__ 指向了 SuperType.prototype,这样实例对象就能找到 SuperType.prototype 上的方法**
``` js
function SuperType(name) {
  this.name = name
}
SuperType.prototype.sub = 1
function SubType(name) {
  SuperType.call(this, name);
  this.age = 2
}
SubType.prototype = new SuperType()
let instance1 = new SubType(3);
console.log(instance1); // {name: 3, age: 2}
console.log(instance1.sub); // 1
```

## 总结
盗用构造函数和组合继承都不能解决某个实例改变原型对象上的属性而不影响其他实例的问题,没办法就是引用传递,除非给每个实例创建这个属性,看取舍,如果是一定要隔离的那就在构造函数中直接写属性,如果是要共享的可以接受被其他实例更改那就写在原型对象上(除非是方法,某个实例更改原型对象上的方法不会影响其他实例)