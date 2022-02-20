const a = ['john-reese', 'harold-finch', 'sameen-shaw'];
const fun = (name, arr) => {
  return a.map((item) => { return { [name]: item.split('-').join(' ') }})
}
const b = fun('name', a);

console.log(b);