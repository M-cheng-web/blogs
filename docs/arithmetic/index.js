const run = (digits) => {
  digits = digits.reverse()
  let needAdd = false
  for (let index = 0; index < digits.length; index++) {
    if (digits[index] === 9) {
      digits[index] = 0
      needAdd = true
    } else {
      digits[index] += 1
      return digits.reverse()
    }
  }
  if (needAdd) digits.push(1)
  return digits.reverse()
}

console.log(run([9, 9]));

