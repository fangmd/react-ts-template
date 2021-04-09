// function sum(a: any, b: any) {
//   return a + b
// }
// var sum2 = sum(1, 2)
// console.log(sum2)

let fn = () => {
  console.log("箭头函数")
}
fn()

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  }, 1000)
})

promise.then((res) => {
  console.log(res)
})
