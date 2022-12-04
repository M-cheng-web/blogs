# React 基础知识

## 面试题
### react 和 vue 区别
1. vue (这一点在数据的监听上可以发现不同,vue中只用关心数据的赋值,具体怎么)
2. vue 中我们组合不同功能的方式是通过 mixin,而在 react 中我们通过 hoc
3. 组件传值不同,子组件向父组件传递消息有两种方式: 事件和回调函数,vue更倾向于使用事件,
但是在 React 中都是使用回调函数的
4. vue有 v-model 语法糖等

### react无状态组件和class类组件的区别
1. 函数组件代码量较少，相比类组件更加简洁
2. 函数组件看似只是一个返回react元素的函数，其实体现的是无状态组件的思想，函数组件中没有this，
没有state，也没有生命周期
3. 因为函数组件不需要考虑组件状态和组件生命周期方法中的各种比较校验，所以有很大的性能提升空间

### react useContext

### react怎么做鉴权系统
重点复习

### 高阶组件
重点复习

### react 和 vue 的 diff 算法区别
重点复习

### react class 与 hooks 组件生命周期对比
| class组件                | Hooks组件                 |
| ------------------------ | ------------------------- |
| constructor              | useState                  |
| getDerivedStateFromProps | useState 中的 update 函数 |
| shouldComponentUpdate    | useMemo                   |
| render                   | 函数返回值                |
| componentDidMount        | useEffect                 |
| componentDidUpdate       | useEffect                 |
| componentWillUnmount     | useEffect内返回的函数     |
| componentDidCatch        | 无                        |
| getDerivedStateFromError | 无                        |

### 生命周期
挂载阶段:
+ constructor: 构造函数,最先被执行,通常在构造函数里初始化state对象或者给自定义方法绑定this
+ getDerivedStateFromProps: static getDerivedStateFromProps(nextProps, prevState),当我们接收到新的属性想去修改我们state可以使用这个,在调用 render 方法之前调用,并且在初始挂载及后续更新时都会被调用
+ render: render函数是纯函数,只返回需要渲染的东西,不应该包含其它的业务逻辑,可以返回原生的DOM、React组件
+ componentDidMount: 组件装载之后调用,此时我们可以获取到DOM节点并操作,比如对canvas,svg的操作,服务器请求,订阅都可以写在这个里面,但是记得在componentWillUnmount中取消订阅

更新阶段:
+ getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用
+ shouldComponentUpdate: shouldComponentUpdate(nextProps, nextState),有两个参数nextProps和nextState表示新的属性和变化之后的state,返回一个布尔值,true表示会触发重新渲染，false表示不会触发重新渲染,默认返回true,我们通常利用此生命周期来优化React程序性能
+ render: 更新阶段也会触发此生命周期
+ getSnapshotBeforeUpdate: getSnapshotBeforeUpdate(prevProps, prevState),这个方法在render之后,componentDidUpdate之前调用,有两个参数prevProps和prevState表示之前的属性和之前的state,这个函数有一个返回值,会作为第三个参数传给componentDidUpdate,如果你不想要返回值,可以返回null,此生命周期必须与componentDidUpdate搭配使用
+ componentDidUpdate: componentDidUpdate(prevProps, prevState, snapshot),该方法在getSnapshotBeforeUpdate方法之后被调用,有三个参数prevProps,prevState,snapshot,表示之前的props,之前的state,和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态,则将对比或计算的过程迁移至 getSnapshotBeforeUpdate,然后在 componentDidUpdate 中统一触发回调或更新状态

卸载阶段:
componentWillUnmount: 在组件卸载及销毁之前直接调用

### React中setState做了什么
setState不会立刻改变react组件中state的值,多次setState函数调用产生的效果会合并,会构建一个新的react元素树,为了弄清 UI 如何响应新的状态而改变,React 会将这个新树与上一个元素树相比较 (这个过程可能是 react 的 diff 算法)

### redux-thunk redux-saga有什么作用
redux-thunk就是dispatch一个action之后,到达reducer之前,进行一些额外的操作,用来异步操作,比如接口请求等

redux-saga通过创建sagas将所有异步操作逻辑收集在一个地方集中处理,可以用来代替redux-thunk中间件

### React中如何做性能优化
优化关键 shouldComponentUpdate: 有俩个参数,一个是nextProps,另一个是nextState,而我们就用这俩个上一次的props和state与这一次的props和state去做比较,如果俩者相同那么就return false 不让它进行更新就可以了,传参优化以及key值合理使用

### react如何做到和vue中keep-alive的缓存效果
+ react-keep-alive 库
+ react-activation 库

### react中要实现一键换ui样式有哪些方案
1. 准备不同主题色的样式文件
2. 将用户的选择记录在本地缓存中
3. 每次进入应用时读取缓存,根据缓 存的信息判断要加载哪个样式文件即可


### 路由监听
```
componentDidMount(){
  this.context.router.history.listen(route => {
    if(route.pathname === '/xxx') { console.log(1) }
  })
}
```

### react有哪几种方式改变state
+ this.forceUpdate
+ this.setState
+ replaceState (替换作用)

forceUpdate就是重新render,有些变量不在state上,但是又想达到这个变量更新的时候刷新render;或者state里的某个变量层次太深更新的时候没有自动触发render,这些时候都可以手动调用forceUpdate自动触发render

## 安装
```
create-react-app react-demo

npx create-react-app react-demo

npx create-react-app react_ts_demo  --template typescript
```
