# promise

## 总结
短小而精悍,我是之前看过一些,然后再试着写,最后再看看完整思路再来修改自身的

不得不说,按照完整思路来写的确实很 nice,一句话总结就是有 `1+1>2` 的效果,而我自己写的却只能顾及某个功能,尤其是在发现 `finally` 的一些特性后,我能想到一些实现,可思路太死板了,我都不信原生实现会这么不优雅,于是看了下标准写法,真的是眼前一亮,充分利用了已有套路,只能说我要多刷点算法,多看点原生代码吧

## 代码
``` js
class promise {
  constructor(executor) {
    this.callbacks = [] // 回调
    this.status = 'pedding' // pedding resolve reject
    this.result = undefined // 结果    

    const self = this

    function resolve(val) {
      if (self.status !== 'pedding') return
      self.result = val
      self.status = 'resolve'
      setTimeout(() => {
        self.callbacks.forEach((callback) => {
          callback.resolveFun()
        })
      })
    }

    function reject(val) {
      if (self.status !== 'pedding') return
      self.result = val
      self.status = 'reject'
      setTimeout(() => {
        self.callbacks.forEach((callback) => {
          callback.rejectFun()
        })
      })
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  /**
   * 大致流程:
   * 1. 第一次 new promise 且内部 resolve()
   * 2. 会更改其状态且将回调放入异步队列,接着执行 then()
   * 3. 此时状态为 resolve,将 then 内的成功方法执行放入异步队列,然后返回新的 promise 实例
   * 4. 新的 promise 实例的状态依赖于上面的异步结果,所以此时其状态为 pedding
   * 5. 所以这个实例在执行完同步事件后,遇到其 then 方法时,会将成功与失败事件都放入回调数组
   * 6. 就这样循环下去,直到所有同步队列全部执行完
   * 7. 接着执行异步队列,带着状态慢慢解析下去
   */
  then(resolveFun, rejectFun) {
    // 一开始这两行默认赋值是传递链的精髓,如果不这样,当手动调用的时候只写了其中一个,那么另外一个的信息就传递不下去
    resolveFun = typeof resolveFun === 'function' ? resolveFun : (value) => value
    rejectFun = typeof rejectFun === 'function' ? rejectFun : (reason) => { throw reason }

    const self = this

    return new promise((resolve, reject) => {
      function callback(fun) {
        try {
          const res = fun(self.result)
          if (res instanceof promise) {
            res.then(r => {
              resolve(r)
            }, e => {
              reject(e)
            })
          } else {
            resolve(res)
          }
        } catch (e) {
          reject(e)
        }
      }

      if (self.status === 'resolve') {
        setTimeout(() => { callback(resolveFun) })
      }
      
      if (self.status === 'reject') {
        setTimeout(() => { callback(rejectFun) })
      }

      if (self.status === 'pedding') {
        self.callbacks.push({
          resolveFun: () => { callback(resolveFun) },
          rejectFun: () => { callback(rejectFun) }
        })
      }

    })
  }

  catch(rejectFun) {
    return this.then(undefined, rejectFun)
  }

  /**
   * 这一块很巧妙
   * 经过测试得知 finally 有两个特性
   * 1. 本身不接收任何参数
   * 2. 内部的 return 以及 新建 promise 链都不会影响下一个 then 的结果
   *    只会把上一个 promise 的结果给下一个,只有在自身内部抛出错误时才会将此错误信息传递给下个链
   */
  finally(cb) {
    return this.then((value) => {
      return promise.resolve(cb()).then(() => value)
    }, (err) => {
      return promise.resolve(cb()).then(() => { throw err })
    })
  }

  static resolve(value) {
    return new promise((resolve, reject) => {
      if (value instanceof promise) {
        value.then(r => {
          resolve(r)
        }, e => {
          reject(e)
        })
      } else {
        resolve(value)
      }
    })
  }

  static reject(reason) {
    return new promise((resolve, reject) => {
      reject(reason)
    })
  }

  /**
   * 在写 all、allSettled、any等这些需要遍历 promise 的静态方法时
   * 要考虑到无论内部加了多少延迟,输出顺序也要和进来的时候是一样的
   * 至于结束的时机就在每个 then 内加计数就行,满足进来时的长度就说明全部执行完了
   */
  static all(promises) {
    return new promise((resolve, reject) => {
      const arr = []
      let sum = 0
      promises.forEach((pro, index) => {
        pro.then((res) => {
          sum++
          arr[index] = res
          if (sum === promises.length) {
            resolve(arr)
          }
        }, (err) => {
          reject(err)
        })
      })
    })
  }

  static allSettled(promises) {
    return new promise((resolve, reject) => {
      const arr = []
      let sum = 0
      promises.forEach((pro, index) => {
        pro.then((res) => {
          arr[index] = {
            status: 'resolved',
            value: res
          }
        }, (err) => {
          arr[index] = {
            status: 'rejected',
            reason: err
          }
        }).finally(() => {
          sum++
          if (sum === promises.length) {
            resolve(arr)
          }
        })
      })
    })
  }

  static race(promises) {
    return new promise((resolve, reject) => {
      promises.forEach((pro) => {
        pro.then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    })
  }

  static any(promises) {
    return new promise((resolve, reject) => {
      let sum = 0
      promises.forEach((pro) => {
        pro.then((res) => {
          resolve(res)
        }).finally(() => {
          sum++
          if (sum === promises.length) {
            reject(new Error('All promises were rejected'))
          }
        })
      })
    })
  }
}
```

## 测试

``` js
// -------------------------- 整体测试
new promise((resolve, reject) => {
  console.log(1);
  resolve(2)
}).then(res => {
  console.log('then', res);
  return 3
}).then(res => {
  console.log('then2', res);
  throw new Error('finally') // 错误会传递
}).finally(() => {
  console.log('结速了');

  // 会保持上一个promise的结果 无论成功的还是失败的
  // finally自己创建的promise以及return 都不会传递给下一位
  // 除非创建错误

  // throw new Error('finally') // 错误会传递
  
  // new promise 和 return 都不能传递给下个then
  // return 'finally'
  // return new promise((resolve, reject) => {
  //   resolve('finally')
  // })
}).then((res) => {
  console.log(res + '还没有结束');
}).catch((e) => {
  console.log(e + '还没有结束');
})
```

``` js
// -------------------------- 测试 any race
const pr1 = new promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 1000)
})
const pr2 = new promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 200)
})

promise.race([pr1, pr2]).then((res) => {
  console.log('成功', res);
}).catch((err) => {
  console.log('失败', err);
})

promise.any([pr1, pr2]).then((res) => {
  console.log('成功', res);
}).catch((err) => {
  console.log('失败', err);
})

```

``` js
// -------------------------- 测试 all allSettled
const pr = [1, 2, 3, 4, 5].map((item) => {
  return new promise((resolve, reject) => {
    setTimeout(() => {
      if (item === 3) {
        reject(item)
      } else {
        resolve(item)
      }
    }, 5000 - item * 1000)
  })
})

promise.allSettled(pr).then(res => {
  console.log(res);
})

promise.all(pr).then(res => {
  console.log(res);
}).catch((err) => {
  console.log(err);
})
```