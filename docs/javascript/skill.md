# 技巧

## 导出 & 导入
导出
``` js
const name = 'cccc'
const obj = {
  install: () => {
    console.log(123);
  }
}

export {
  obj as default, // 重点!!!! 这样等同于下面的default
  name
}

// export default obj
```

导入
``` js
import { name } from './aaa'

import xxx from './aaa'
```

## 动态 provide
https://blog.csdn.net/weixin_46533797/article/details/121552421

## ts 类型
``` ts
interface EmployeeType {
    id: number
    fullname: string
    role: string
}
 
let employees: Record<number, EmployeeType> = {
    0: { id: 1, fullname: "John Doe", role: "Designer" },
    1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
    2: { id: 3, fullname: "Sara Duckson", role: "Developer" },
}
 
// 0: { id: 1, fullname: "John Doe", role: "Designer" },
// 1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
// 2: { id: 3, fullname: "Sara Duckson", role: "Developer" }
```

``` ts
场景：想设置Content-Type为application/x-www-form-urlencoded，但是无效。

当请求体data为空时，此时的Content-Length=0，出于优化的层面，headers里的Content-Type自动缺省，也就是说无需向服务端提供Content-Type字段。

若硬要设置Content-Type，可以在data中随便写个参数，就可以向后端发送啦
```