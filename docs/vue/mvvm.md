# MVVM总结
代码实现地址: [https://github.com/M-cheng-web/vue-sound-mvvm](https://github.com/M-cheng-web/vue-sound-mvvm)

## 简介
这套代码简单实现了 vue框架的双向绑定核心功能<br>
实现功能点:
+ 模拟 Vue,通过创建 Vue实例对象的方式完成数据的渲染以及双向绑定的配置
+ watch监听(可以拿到新值旧值)
+ data值渲染页面
+ computed属性渲染到页面
+ computed属性缓存
+ computed属性没用到时不会计算
+ computed属性依赖于多重属性(计算属性A = 计算属性B + dataA, 计算属性B = dataB + dataC)
+ methods方法
+ v-model   {{data}}   v-on  功能的简单完成

## 项目运行
1. vscode内下载`Live Server`插件
2. 项目拉到本地后点开 www => index.html,右键选择`Open With Live Server`

## 关于模板字符串
内部的 v-model,事件以及模板字符串的实现可以先不用在意(这里只是简单应用,并不是vue实际实现方式)<br>
建议直接看 compole.js中compileText() 以及 compileModel()方法<br>
这俩个方法是将 v-model='title' 以及 {{ title }} 中的title转化为实际值并且渲染页面的关键方法<br>
如果对模板字符串感兴趣的话可以参考我关于这一块的源码实现 [https://github.com/M-cheng-web/vue-sound-mustache](https://github.com/M-cheng-web/vue-sound-mustache)

## 什么是计算属性缓存?
例如当A计算属性 = B计算属性 + C计算属性, 而C计算属性 = dataA + dataB<br>
如果C计算属性先于A计算属性执行,那么运算A计算属性的时候并不会再次去运算C计算属性,而是去拿它的缓存(除非在这个过程中dataA或者dataB发生改变)<br>
如果A计算属性先于C计算属性执行,那么运算A计算属性的时候会去运算C计算属性,当其他地方用到C的时候同样也会去拿C的缓存,而不是再次运算(除非dataA或者dataB发生改变)<br>

## 核心概念了解
### Object.defineProperty
这个就是基础原理,了解 `api` 后我们能知道依赖于这个能让我们知道某个值依赖于某些值,然后才能让我们拿到依赖的值接着再做一些依赖项的绑定

在实际运用中,我们会给 `data` 内的所有值以及值内的对象都套上 `Object.defineProperty` 来截取其 `get() set()`,
`computed` 也会套上用来截取其 `get()`

### Watcher
双向绑定核心对象<br>
主要完成以下功能:<br>
1. 融合data,computed,watch需要的功能(渲染,更改,获取,缓存)
2. 生成所有值的实例对象,在某个属性依赖其他属性时会将其属性的watcher实例放入自身,以此来实现查找功能

### dep依赖收集器
我们都知道通过 `Object.defineProperty` 能让我们知道谁用到了这个值,可具体实现是依赖于 `Dep` 构造函数的,内部其实很简单,
就只有一个 `dep` 数组属性,里面会存放依赖于这个值的 `watcher` 实例,打个比方: `a = b + c`,那么b的 dep 内会存放着 a 的watcher实例对象

在实际运用中,我们会给每个 `data`, `computed` 属性都创建一个 `Dep` 实例(如果某个data值内是对象也会给其创建Dep实例,会一直递归到非对象的属性),这样在拦截到某个属性被 `get` 时,我们就可以利用闭包原理,在其 `dep` 数组中加入那个调用此属性的 `watcher` 实例

以此就完成了依赖收集的作用,然后在当某个属性发生变化时,会触发 `Object.defineProperty` 的 `set`,内部会循环 `dep` 数组用来通知依赖此值的
`watcher` 实例对象要做出动作

### 管理全局唯一的收集栈
`Dep` 构造函数有一个静态属性 `target`

+ 为什么需要这个属性?
在上面我们讲到 `Dep` 是专门用来收集依赖的,可我们需要一个载体来先存储着那个需要被收集的 `watcher`,
因为我们并不能做到实时的存储依赖,只能通过第三方来中转一下( 类似于把 A值赋值给B,需要C来中转一下 )

+ 为什么是静态属性? 因为保证了全局唯一

+ 怎么去管理它?
假设一个场景: `计算属性 A = 计算属性 B + 普通属性 C` `计算属性B = 普通属性 D + 普通属性 E`

我们在得到A的过程中会将A的 `watcher` 对象存入 `Dep.target`,然后刚刚存入的会放到B和C的 `dep` 数组中(肯定会先计算B,我这边只是先这样概括),目前为止都是没问题的,但是,接着在得到B的过程中, `Dep.target` 中放的还是 A的 `watcher` 对象,然后在D和E中的 `dep` 数组中放入,
预期应该是在D和E中的 `dep` 数组中放入B的 `wathcer` 对象

直接将 `Dep.target` 替换为B的 `watcher` 对象也不合理,那么在后续的C的 `dep` 数组中放入的也会是B的 `watcher` 对象,预期也应该是放入A的

结论: 这就要求我们有一个机制可以存储 `Dep.target`,在我们需要的时候给出目标对象,在不需要的时候就弹出它,那就是栈结构<br>
解决方案: 还是接着上面的例子,在存储 `Dep.target` 之前,我们可以先判断当前 `Dep.target` 有没有值,如果有值的话会将此值保存到栈结构后再进行替换,用完了之后再替换回来

### targetStack
对Dep.target静态属性操作的封装<br>

应用场景: A计算属性 = B计算属性 + C计算属性, B计算属性 = dataA + dataB, C计算属性 = dataC + dataD<br>
在算A的时候会将A的watcher实例放入Dep.target,然后再执行A的获取值的方法(B计算属性 + C计算属性)<br>
在算B的时候会将当前Dep.target存的值放入B的subs中(也就是存储了A的依赖,在B变化时会能通知到A也更新的操作)<br>
然后将B的watcher实例放入全局的Dep.target,注意,这个时候如果直接替换会把之前存入Dep.target的A的watcher实例给替换掉<br>
在计算(dataA + dataB)的过程中,这俩个值都能正确存储依赖他们的值<br>
最后再算C的时候,也会将当前Dep.target存的值放入C的subs中,但是这个时候Dep.target存的是B的watcher,按道理这个时候Dep.target应该存的是
A的watcher,这样C才能知道当C改变的时候需要通知A<br>

结论: 我们需要一个能自动控制当前Dep.target值的算法,且当前Dep.target有值的时候要存储起来,不能直接替换<br>
解决: targetStack利用栈原理很好的解决了这个问题

## 各个模块解析
### index.js
项目入口<br>
MVVM实例对象(下面统称vue实例)的创建,在实例化对象中会初始化data,computed,watch<br>
会将data中的所有属性附加到vue实例上,并与data中所有属性互相绑定(vue实例中这个属性改变也会触发data的这个属性改变)

### observer.js
为所有data属性添加响应式<br>
会在 `vue实例` 以及 `vue实例.data` 中挂载所有的data值<br>
之所以也要在 `vue实例.data` 挂载是因为程序内部其他地方都是通过 `data[key]` 的方式调用 data属性,并不是通过 `this[key]` 的方式<br>
通过 `this[key]` 的方式最终都会转移到 `this.data[key]` 中

### computed.js
为所有computed属性添加响应式<br>

特性:
1. 没有调用的时候不会执行内部方法
2. 有缓存,重复调用会直接取其缓存值
3. 计算属性的依赖值发生更改后不会立刻重新运算这个计算属性,而是等需要它的时候才会再次执行(如果是在DOM上的计算属性就会立刻重新运算)

在为所有computed属性生成watcher实例后,会开启对属性的监听,当这个属性被get的时候会判断这个属性的值是否为最新值<br>
如果是最新值则不需要再进行运算,直接取旧值(注意,取旧值也要将当前Dep.target所存的watcher实例放入这个计算属性的subs中)<br>
如果不是最新值则需要再次运算,先将当前Dep.target存入subs,然后再运算这个计算属性的值,在运算结束后会将这个值标记为最新值,且存储了这个最新值<br>
如果这个标记不变的话,以后会直接用这个存储的最新值(只有当这个值所依赖的值发生改变才会改变这个值的标记)

### watcher.js
为需要的属性创建watcher实例<br>
充当着观察者的身份,给 `computed`, `watch` 还有渲染函数使用的,在创建时就会给每个属性或者watch绑定一个watcher实例,里面记录了一些关于属性的信息以及必要的方法,然后会把这个实例放入其依赖的属性的 dep数组中,在被依赖属性发生改变时就会通知到这个watcher实例

> 其实在我看来就是一个统一管理的地方,当属性创建的时候要绑定此实例,在更改时也通知此实例,整个双向绑定就是围绕着这个关键的watcher

它的原型链上有四个方法,分别为: `update` `get` `watchGet` `depend`,详细代码在文件中
+ update: 在依赖的属性发生变化时会通知到这个方法,通过此方法来执行相对应操作
+ get: 获取值,并处理 `Dep.target` 的出栈入栈,从而达到绑定依赖项
+ watchGet: 给监听使用,在watch初始化时会调用目标属性然后让其收集此监听的 `watcher`,以达到在值发生改变通知到监听
+ depend: 给计算属性添加 dep的

### watch.js
实现监听<br>
遍历所有watch,将被watch的属性改变后需要触发的函数放入watcher的callback回调中<br>
在第一次加载的时候就会调用一次被监听的属性,以达到被这个属性存放在其subs中,当这个属性变化时自然能通知到watch

> watch 监听一个 computed 属性,如果这个属性一开始并不会执行,那么也应该在被监听的时候也不要执行,但是我写的这一块还是会执行的,后续康康把...

### compile.js
html页面的功能实现,主要实现了v-model,v-on,{{title}}模板字符串功能<br>
对页面DOM做了处理,使其可以支持类似于vue的 `v-model` `v-on:click`,同样也对这些方法进行了事件绑定
比如使用了 `v-on:click`会监听那个元素的点击事件,触发后会执行目标方法<br>
比如使用了 `v-model`会为其创建一个 `watcher` 实例并标明此是渲染函数,然后会执行内部的 update方法使依赖属性的dep中存放此 `watcher`<br>

同理一般的计算属性或者data值放在页面中通过 `{{ name }}` 的方式也会被检测到此DOM元素需要将name转化为真实值,在转化的过程中会得到真实name
的值,同时也会将下面的更改DOM元素textContent方法暴露出去,以便在值发生变化后能执行此方法来改变页面的值
``` js
updateText: function (node, value) {
  node.textContent = typeof value == 'undefined' ? '' : value;
},
```

::: tip
渲染这一块我也是看网上的例子拿到的,真实渲染并不是这样,但这是最快的方式,所以仅供参考,最主要的是双向绑定那一块逻辑
:::
