const num1 = [1, 11, 5, 3, 4, 3, 3]
const num2 = [1, 1, 3, 3, 4]

const run = (nums1, nums2) => {
  const arr1 = nums1.sort((a, b) => a - b)
  const arr2 = nums2.sort((a, b) => a - b)
  const arr = []

  for (let x = 0; x < arr1.length;) {
    for (let y = 0; y < arr2.length;) {
      if (!(arr1[x] && arr2[y])) return arr
      if (arr1[x] === arr2[y]) {
        arr.push(arr1[x])
        x++
        y++
      } else if (arr1[x] > arr2[y]) {
        y++
      } else {
        x++
      }
    }
  }
}

console.log(run(num1, num2));

