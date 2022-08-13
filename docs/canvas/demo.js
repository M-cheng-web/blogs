// var str = 'abbbccccccxxxxxx';

// function max(str) {
//   let maxObj = '';

//   for (let index = 0; index < str.length; index++) {
    
//   }
// }

// console.log(max(str));
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