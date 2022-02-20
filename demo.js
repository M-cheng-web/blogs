function Person() { }
Person.prototype.age = [1, 2, 3]
let a = new Person()
let b = new Person()
a.age.push(4)
console.log(b.age) 