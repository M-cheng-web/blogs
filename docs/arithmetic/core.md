# 算法

移动 0 , 可以用这种比较巧妙的方法,因为在添加或者删除数组元素时,会影响遍历执行时的动作,所以添加变量 a 来抵消这种影响
``` js
const run = (nums) => {
  const len = nums.length
  let a = 0
  for (let index = 0; index < len; index++) {
    if (nums[index - a] === 0) {
      nums.splice(index - a, 1)
      nums.push(0)
      a++
    }
  }
  return nums
}
```

或者直接从最后一位开始遍历,这样就不会影响了
``` js
const run = (nums) => {
  const len = nums.length
  for (let index = nums.length; index >= 0; index--) {
    if (nums[index] === 0) {
      nums.splice(index, 1)
      nums.push(0)
    }
  }
  return nums
}
```