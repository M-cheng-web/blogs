# 渲染
[模板语法解析 https://github.com/M-cheng-web/vue-sound-snabbdom](https://github.com/M-cheng-web/vue-sound-snabbdom)

[ast抽象语法树 https://github.com/M-cheng-web/vue-sound-ast](https://github.com/M-cheng-web/vue-sound-ast)

[模板字符串引擎 https://github.com/M-cheng-web/vue-sound-mustache](https://github.com/M-cheng-web/vue-sound-mustache)<br>
(这个并没有实际应用,只是扩展视野)

## vue 的渲染过程
模板语法 => 抽象语法树ast => 渲染函数(h函数) => 虚拟节点 => 界面

## AST抽象语法树
将模板语法转化为JS对象

在vue中所有的html代码会视为字符串,需要将这些类似html代码的字符串转换为ast<br>
得到一个js对象后再进行渲染函数(h函数),再由patch函数上树,显示到页面
``` html
<div class="box">
  <h3 class="title">我是一个标题</h3>
  <ul>
    <li v-for="item in arr" :key="index">
      {{item}}
    </li>
  </ul>
</div>
```

会转化为
``` js
const ast = {
  tag: "div",
  attrs: [{ name: "class", value: "box" }],
  type: 1, 
  children: [
    {
      tag: "h3",
      attrs: [{ name: "class", value: "title" }], 
      type: 1,
      children: [{ text: "我是一个标题", type: 3 }]
    },
    {
      tag: "ul",
      attrs: [],
      type: 1, 
      children: [
        {
          tag: "li",
          for: "arr",
          key: "index",
          alias: "item", 
          type: 1, 
          children: []
        }
      ]
    }
  ]
}
```

## 渲染函数(h函数)
根据模板语法得到的JS对象再由 `h()` 转化一下,主要是生成利于做 `diff算法` 比较的虚拟DOM,还有就是会将页面中用到
的变量转为实际值

## patch函数
对比新旧节点,遵循下面的流程图(会有递归调用到最底层)

## diff算法示例
这里我示例一下程序是怎么走的(只示例一下复杂的情况),可能表达有点问题,自己跑一遍就很清晰了<br>
oldCh: 旧子节点   newCh: 新子节点

+ 新增的情况
``` js
oldCh = [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
]
newCh = [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),
]
```

+ 删除的情况
``` js
oldCh = [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
]
newCh = [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'D' }, 'D'),
]
```

+ 多删除的情况
``` js
oldCh = [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),
]
newCh = [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'D' }, 'D'),
]
```

+ 复杂的情况
``` js
oldCh = [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),
]
newCh = [
  h('li', { key: 'E' }, 'E'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'M' }, 'M'),
]
```
1. 对比 newCh的第一位E, 不满足 新前与旧前相等,新后与旧后相等,新后与旧前相等
2. 满足 新前与旧后相等
3. 调用 patchVnode传入新旧vnode,如果新旧vnode还有children,会再次进入 updateChildren.js, 间接递归,这里不进行深入
4. 因为是新前与旧后相等,并且经过 patchVnode方法操作后,新vnode的属性是已经赋值给旧vnode的真实dom上了,但是旧vnode它的位置并不是在第一位,所以要调用 parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm) 把E这个节点放到第一个节点A之前
5. 进行完上面的真实dom操作后,要对指针进行移位
6. --oldEndIdx(旧后往上移一位) ++newStartIdx(新前往下移一位)
7. 重新赋值 oldEndVnode 与 newStartVnode
8. 对比 newCh的第二位C, 不满足 新前与旧前相等,新后与旧后相等,新后与旧前相等,新前与旧后相等
10. 四种情况都没有命中,创建 keyMap对象,并将oldCh当前的 oldStartIdx 至 oldEndIdx 的vnode的key作为 keyMap的键,值为vnode的下标
11. 创建了 keyMap对象后查找 C这个vnode的key, 发现存在,则把这个旧节点拿过来复用
12. 复用了后要oldCh中这个 C代表的vnode置为undefined,代表这个节点已经被处理了,无需再次处理
13. 然后还要处理位置关系,因为只是把旧节点内容换了,并没有调整位置
14. 调用 parentElm.insertBefore(C.elm, oldStartVnode.elm) 把C节点位置移到旧A之前(注意,是A之前,并不是E之前,这个E是之前插入的)
15. 对比 newCh的第三位M, 不满足 新前与旧前相等,新后与旧后相等,新后与旧前相等,新前与旧后相等
16. 在 keyMap对象中查找 M这个vnode的key, 发现不存在,则新建一个DOM再移位放入旧A之前
17. 做完了上面的步骤后, newStartVnode 是大于 newEndVnode 的,所以退出while, 此时旧节点数组是这样的 [E, C, M, A, B, D] 
18. 继续看看有没有剩余的,然后选择新增或者删除
19. 发现 oldStartIdx <= oldEndIdx, 也就是旧节点数组还没有处理完,但是新节点数组处理完了
20. 这就代表旧节点数组从 oldStartIdx开始到 oldEndIdx 的节点都要删除
21. 遍历删除,然后结果就变成了 [E, C, M], 中间只新建了M这个真实DOM,精彩!!!!

## 流程图
![DIFF算法流程图](https://gitee.com/M-cheng-web/map-storage/raw/master/vue-img/diff%E7%AE%97%E6%B3%95%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

[DIFF算法流程图https://gitee.com/M-cheng-web/map-storage/raw/master/vue-img/diff%E7%AE%97%E6%B3%95%E6%B5%81%E7%A8%8B%E5%9B%BE.png](https://gitee.com/M-cheng-web/map-storage/raw/master/vue-img/diff%E7%AE%97%E6%B3%95%E6%B5%81%E7%A8%8B%E5%9B%BE.png)