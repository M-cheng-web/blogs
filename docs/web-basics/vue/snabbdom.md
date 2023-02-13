
# vue-sound-snabbdom
[模板语法解析 https://github.com/M-cheng-web/vue-sound-snabbdom](https://github.com/M-cheng-web/vue-sound-snabbdom)

Vue的Diff算法以及虚拟DOM的实现原理-snabbdom

## 虚拟DOM
### 什么是虚拟DOM
⽤ JS 对象表示 DOM 信息和结构,更新后使之与真实dom保持同步,核心是diff算法

### 为什么要用虚拟DOM
原生DOM操作很慢,轻微的操作都可能导致⻚面重新排版,⾮常耗性能<br>
相对于DOM对象,js对象处理起来更快,而且更简单<br>
通过diff算法对比新旧vdom之间的差异,可以批量的、最⼩化的执行dom操作,从而提高性能

### 虚拟DOM属性
``` js
{
  children: undefined, // 子节点
  data: {}, // props等一些属性
  elm: undefined, // 指向真实DOM
  key: undefined, // 同级唯一Key
  sel: 'div', // 标签类型
  text: '我是文本', // 文本内容
}
```

## DIFF算法
对比虚拟DOM新旧节点的算法,达到最小化更新操作(我的理解就是尽全力避免创建新DOM的过程~)

### DIFF算法的各个模块
+ patch - 入口文件,判断新旧虚拟DOM是否key和sel相等,相等的话会调用patchVnode来进一步比对,不相等的情况下会暴力删除老节点
+ patchVnode - 对比同一个虚拟节点(存在对真实DOM的更新)
+ updateChildren - 对虚拟节点的children节点进行循环比对(存在对真实DOM的更新)
+ 工具模块
  + createElement - 真正创建节点,将vnode创建为DOM
  + vnode - 将传入的参数转化为vnode对象
  + checkSameVnode - 对比俩个vnode的sel以及key是否相等

#### patch.js
入参: oldVnode, newVnode (旧节点, 新节点)
+ 首先会判断 oldVnode 是否为虚拟DOM,如果不是则转换为vnode(因为会存在第一次渲染上树的行为)
+ 然后再判断 oldVnode 与 newVnode 的key以及sel是否相等
  + 相等: 调用 patchVnode.js 进行更加细致的对比(children或者text属性的对比)
  + 不相等: 意味着不是同一个节点,直接删掉旧节点插入新节点

#### createElement.js
入参: vnode (虚拟节点)
+ 根据 vnode 的 sel 创建一个DOM节点
+ 如果 vnode 为文本节点: 将刚创建的DOM的 innerText 赋值为 text
+ 如果 vnode 的 children 属性有值: 遍历 children,递归调用 createElement 创建所有子节点真实DOM后上树(DOM.appendChild(chDOM))
+ 将刚创建真实DOM指向为 vnode 的 elm 属性
+ 返回真实DOM

#### patchVnode.js
入参: oldVnode, newVnode (旧节点, 新节点)
+ 如果新旧 vnode 为同一个对象则直接返回
+ 判断 newVnode 是否文本节点(text属性有值且无子节点)
  + 是: 如果新旧vnode的text属性不一样则将newVnode.text 赋值给 oldVnode.text
  + 否: 判断 oldVnode 有没有子节点
    + 有: 调用 updateChildren.js 专门来进行对子节点的更新
    + 没有: 遍历并创建 newVnode 子节点的真实DOM,并放入 oldVnode 所代表的真实DOM中

#### updateChildren.js
入参: parentElm, oldCh, newCh (真实父级DOM, 旧节点子节点数组, 新节点子节点数组)

首先我们要先了解一下经典的diff算法优化策略(普遍应用,不只是diff算法用到了)
四种命名查找:(要严格按照这种顺序)
1. 新前与旧前
2. 新后与旧后
3. 新后与旧前(在发生这种情况时要移动节点至 旧后之后)
4. 新前与旧后(在发生这种情况时要移动节点至 旧前之前)

命中一种就不再进行命中判断了<br>
如果都没有命中,将 oldVnodeChildren映射到一个新对象keyMap中,然后再根据当前新节点的key来判断是否能复用旧节点(如果
keyMap对象中有对应Key,会复用旧节点并且移动节点至旧前之前, 没有对应Key的话只能创建新对象再移动节点至旧前之前)<br>


1. 创建变量
``` js
let oldStartIdx = 0; // 旧前
let newStartIdx = 0; // 新前
let oldEndIdx = oldCh.length - 1; // 旧后
let newEndIdx = newCh.length - 1; // 新后
let oldStartVnode = oldCh[0]; // 旧前节点
let oldEndVnode = oldCh[oldEndIdx]; // 旧后节点
let newStartVnode = newCh[0]; // 新前节点
let newEndVnode = newCh[newEndIdx]; // 新后节点
```

2. 创建keyMap对象(在四种情况都没有命中的情况下会用到)
``` js
let keyMap = null;
```

3. 设置while(新前<=新后&&旧前<=就后){} 开始循环遍历!
``` js
while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
  // 首先不是判断①②③④命中，而是要略过已经加undefined标记的东西
  if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
    oldStartVnode = oldCh[++oldStartIdx];
  } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
    oldEndVnode = oldCh[--oldEndIdx];
  } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
    newStartVnode = newCh[++newStartIdx];
  } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
    newEndVnode = newCh[--newEndIdx];
  } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
    // 新前和旧前
    console.log('①新前和旧前命中');
    patchVnode(oldStartVnode, newStartVnode);
    oldStartVnode = oldCh[++oldStartIdx];
    newStartVnode = newCh[++newStartIdx];
  } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
    // 新后和旧后
    console.log('②新后和旧后命中');
    patchVnode(oldEndVnode, newEndVnode);
    oldEndVnode = oldCh[--oldEndIdx];
    newEndVnode = newCh[--newEndIdx];
  } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
    // 新后和旧前
    console.log('③新后和旧前命中');
    patchVnode(oldStartVnode, newEndVnode);
    // 当③新后与旧前命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧后的后面
    // 如何移动节点？？只要你插入一个已经在DOM树上的节点，它就会被移动
    parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
    oldStartVnode = oldCh[++oldStartIdx];
    newEndVnode = newCh[--newEndIdx];
  } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
    // 新前和旧后
    console.log('④新前和旧后命中');
    patchVnode(oldEndVnode, newStartVnode);
    // 当④新前和旧后命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧前的前面
    parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
    // 如何移动节点？？只要你插入一个已经在DOM树上的节点，它就会被移动
    oldEndVnode = oldCh[--oldEndIdx];
    newStartVnode = newCh[++newStartIdx];
  } else {
    // 四种命中都没有命中
    // 制作keyMap一个映射对象，这样就不用每次都遍历老对象了
    if (!keyMap) {
      keyMap = {};
      // 从oldStartIdx开始，到oldEndIdx结束，创建keyMap映射对象
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        const key = oldCh[i].key;
        if (key != undefined) {
          keyMap[key] = i;
        }
      }
    }
    // 寻找当前这项（newStartIdx）这项在keyMap中的映射的位置序号
    const idxInOld = keyMap[newStartVnode.key];
    if (idxInOld == undefined) {
      // 判断，如果idxInOld是undefined表示它是全新的项
      // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
      parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
    } else {
      // 如果不是undefined，不是全新的项，而是要移动
      const elmToMove = oldCh[idxInOld];
      patchVnode(elmToMove, newStartVnode);
      // 把这项设置为undefined，表示我已经处理完这项了
      oldCh[idxInOld] = undefined;
      // 移动，调用insertBefore也可以实现移动。
      parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
    }
    // 指针下移，只移动新的头
    newStartVnode = newCh[++newStartIdx];
  }
}
```

4. 在while 循环后要再判断一下是否需要删除或者批量新增的
``` js
// 继续看看有没有剩余的。循环结束了start还是比old小
if (newStartIdx <= newEndIdx) {
  console.log('new还有剩余节点没有处理，要加项。要把所有剩余的节点，都要插入到oldStartIdx之前');
  // 遍历新的newCh，添加到老的没有处理的之前
  for (let i = newStartIdx; i <= newEndIdx; i++) {
    // insertBefore方法可以自动识别null，如果是null就会自动排到队尾去。和appendChild是一致了。
    // newCh[i]现在还没有真正的DOM，所以要调用createElement()函数变为DOM
    parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
  }
} else if (oldStartIdx <= oldEndIdx) {
  console.log('old还有剩余节点没有处理，要删除项');
  // 批量删除oldStart和oldEnd指针之间的项
  for (let i = oldStartIdx; i <= oldEndIdx; i++) {
    if (oldCh[i]) {
      parentElm.removeChild(oldCh[i].elm);
    }
  }
}
```

#### updateChildren的示例
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
![diff算法流程图](https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/diff算法流程图.32p1uz61oq40.webp)