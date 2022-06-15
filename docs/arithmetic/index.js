const run = (haystack, needle) => {
  if (!needle.length) return 0
  if (needle.length > haystack.length) return -1
  let isPass = false
  for (let a = 0; a < haystack.length; a++) {
    if (haystack[a] === needle[0]) {
      for (let b = 0; b < needle.length; b++) {
        if (haystack[a + b] !== needle[b]) {
          isPass = false
          break
        } else {
          isPass = true
        }
      }
      if (isPass) return a
    }
  }
  return -1
}

console.log(run("mississippi", 'issip'));