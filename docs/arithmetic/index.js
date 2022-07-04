

const fun = (...args) => {
  const sum = args.reduce((pre, item) => pre += item, 0)
  return function(...newArgs) {
    return newArgs.length ? fun(sum, ...newArgs) : sum
  }
}

console.log(fun(1, 2, 3)(4, 5)());


















// function useCountdown(targetDate) {
//   const oldDate = new Date(targetDate)
//   const [x, setX] = useState(0)
//   const [day, setDay] = useState(0)
//   const [hour, setHour] = useState(0)
//   const [minute, setMinute] = useState(0)
//   const [sec, setSec] = useState(0)

//   setInterval(() => {
//     const newDate = new Date()
//     setX((newDate - oldDate) / 1000)
//   }, 1000)

//   useEffect(() => {
//     setDay(parseInt(x / (24 * 60 * 60)))
//     setHour(parseInt(x / 3600) - 24 * parseInt(x / (24 * 60 * 60)))
//     setMinute(parseInt(x % 3600 / 60))
//     setSec(parseInt(x % 60))
//   }, [x])
//   return { day, hour, minute, sec }
// }

// useCountdown("2023-12-12 00:00:00")