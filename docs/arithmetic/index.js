

function arrayHandler(arr1, arr2) {
  const result = [[], [], [], [], []]
  const arr = Array.from(new Set(arr1.concat(arr2)))
    .filter(item => String(item)[String(item).length - 1] !== '4')
    .sort((a, b) => a - b)
  console.log(arr);

  if (arr.length < 5) {
    return result
  } else {
    const x = parseInt(arr.length / 5)
    let index = 0
    return result.map(cArr => {
      cArr.push(...arr.slice(index, index + x))
      index += x
      return cArr
    })
  }
}

console.log(x([1, 2, 3], [4, 5, 3, 6, 7, 8, 9, 10, 11]));