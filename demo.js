var numbers1 = [45, 4, 9, 16, 25];
var sum = numbers1.reduceRight((total, value, index, array) => total + value);

console.log(sum);