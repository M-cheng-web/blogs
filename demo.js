// var str = "F:\\study\\javascript\\regex\\regular expression.pdf"
// '02:03' '2:3' '0:3' '0001-02-03'
// var patt1 = /^(?:[0-1][0-9]|2[0-3]):(?:[0-5][0-9])$/;
// var patt1 = /^(?:[0-1][0-9]|2[0-3]|[0-9]):(?:[0-5][0-9]|[0-9])$/;

// var patt1 = /^[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])$/;

// var patt1 = /^[a-zA-Z]:\\(?:[^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/

const str = "1hell2"
// const patt = /(?=.+)hell/;
const patt = /(?<=.+)hell/;
// const patt = /(?<=.+)hell(?=.+)/;
// console.log(str.match(patt))

// var result = "123456781235".replace(/(?=\d{3}$)/g, ',')


// var string = "abc";
// var regex = /([abc]{3})+/;
// console.log( string.match(regex) );



var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/g;
var string = "2017-06-26";
console.log(string.match(regex));
console.log(regex.exec(string));



// 这两种有什么区别

// var regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
// console.log( regex.test("F:\\study\\javascript\\regex\\regular expression.pdf") ); 
// console.log( regex.test("F:\\study\\javascript\\regex\\") ); 
// console.log( regex.test("F:\\study\\javascript") ); 
// console.log( regex.test("F:\\") ); 
