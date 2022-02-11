const str = "abc,12,s,b,abc,abc12"

// var str = "F:\\study\\javascript\\regex\\regular expression.pdf"
// '02:03' '2:3' '0:3' '0001-02-03'
// var patt1 = /^(?:[0-1][0-9]|2[0-3]):(?:[0-5][0-9])$/;
// var patt1 = /^(?:[0-1][0-9]|2[0-3]|[0-9]):(?:[0-5][0-9]|[0-9])$/;

// var patt1 = /^[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])$/;

// var patt1 = /^[a-zA-Z]:\\(?:[^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/

// var patt1 = /^\d+(?<numb>,\d+)*$/  命名捕获组 / 捕获组 / 非捕获组

// var patt1 = /^(?<num>\d{2}),\k<num>$/  命名捕获组反向使用
// var patt1 = /^(?<num>\d{2}),\k<num>$/

const patt = /(?<firstName>\w{3}),(\w{2}),(?:\w{1}),(\w{1}),\k<firstName>,\1\2/


console.log(str.match(patt))
// console.log(Array.from(str.match(patt)))




// 这两种有什么区别

// var regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
// console.log( regex.test("F:\\study\\javascript\\regex\\regular expression.pdf") ); 
// console.log( regex.test("F:\\study\\javascript\\regex\\") ); 
// console.log( regex.test("F:\\study\\javascript") ); 
// console.log( regex.test("F:\\") ); 
