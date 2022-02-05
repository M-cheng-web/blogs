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