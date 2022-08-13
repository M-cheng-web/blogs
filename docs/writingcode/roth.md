# 算法

## 智能重复
试编写“智能重复”smartRepeat函数，实现:
+ 将3[abc]变为abcabcabc
+ 将3[2[a]2[b]]变为aabbaabbaabb
+ 将2[1[a]3[b]2[3[c]4[d]]]变为abbbcccddddcccddddabbbcccddddcccdddd

``` js
const str = "2[1[a]3[b]2[3[c]4[d]]]";

function smartRepeat(str) {
  const numArr = [];
  const strArr = [];

  str.split("").forEach((item) => {
    if (/\d/.test(item)) {
      numArr.push(item);
      strArr.push("");
    } else if (/[a-zA-Z]/.test(item)) {
      strArr[strArr.length - 1] = item;
    } else if (item === "[") {
    } else if (item === "]") {
      let letter = strArr.pop();
      let num = numArr.pop();

      if (strArr.length > 0) {
        strArr[strArr.length - 1] += letter.repeat(num);
      } else {
        strArr.push(letter.repeat(num));
      }
    } else {
      throw new Error("非法字符串");
    }
  });

  return strArr[0];
}

console.log(smartRepeat(str));
```

## 斐波那契数列
注意点
1. 斐波那契数列第0项是0,但是这个数列是从1开始的,0并不算在内(维基百科)
2. fib(10) 代表我们想要斐波那契数列的第十项,而数组是从0位开始的,它的第十项实际上是数组的下标为9的那个值,所以需要在这里加上初始 -1 的操作
3. retArr 代表是否需要返回数组
``` js
function fib(num, retArr = false, startNum = num - 1, cache = [], minus = true) {
  if (minus) num = num - 1;
  if (cache[num]) return cache[num];
  const v = num === 0 || num === 1
    ? 1
    : fib(num - 1, retArr, startNum, cache, false) + fib(num - 2, retArr, startNum, cache, false)
  cache[num] = v;
  if (retArr && num === startNum) return cache;
  return v
}

console.log(fib(10, false));
```

## 递归解析数组
转换数组的形式[1, 2, 3, [4, 5]]要变为这样的对象
``` js
{
  chidren: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      {
        children: [
          { value: 4 },
          { value: 5 },
        ]
      }
  ]
}
```

实现代码:
``` js
var arr = [1, 2, 3, [4, 5], [[[6], 7, 8], 9], 10];
function convert(arr) {
  return {
    children: arr.map(val => Array.isArray(val) ? convert(val) : { value: val })
  }
}
console.log(convert(arr));
```

## 字符串最大重复次数
``` js
var str = 'abbbccccccxxxxxx';

function max(str) {
  let i = 0;
  let j = 0;

  let maxCount = 0;
  let maxStr = '';

  while(str[i]) {
    if (str[i] !== str[j]) {
      let count = j - i;
      if (count > maxCount) {
        maxCount = count;
        maxStr = str[i]
      }
      i = j;
    }
    j++
  }

  console.log(maxStr, maxCount);
}

max(str)
```