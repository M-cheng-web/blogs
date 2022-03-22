# react-router
这里参考的版本为 `6.x`

## 相关库
+ react-router: 路由的核心库,提供了很多的 组件、钩子
+ react-router-dom: 包含react-router所有内容,并添加一些专门用于 DOM 的组件,例如 `<BrowserRouter>`等
+ react-router-native: 包括react-router所有内容,并添加一些专门用于ReactNative的API,例如`<NativeRouter>`等

## 与 5.x 差异
+ 内置组件的变化: 移除`<Switch/>`,新增 `<Routes/>`等
+ 语法的变化: `component={About}` 变为 `element={<About/>}`等
+ 新增多个hook: `useParams`、`useNavigate`、`useMatch`等
+ **官方明确推荐函数式组件**

## Component
### BrowserRouter
说明: `<BrowserRouter>` 用于包裹整个应用
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);
```

### HashRouter
说明: 作用与 `<BrowserRouter>` 一样,但 `<HashRouter>` 修改的是地址栏的hash值,一个是history模式,一个是hash模式

> 备注: 6.x版本中`<HashRouter>` `<BrowserRouter> ` 的用法与 5.x 相同

### Routes & Route
+ v6版本中移出了先前的 `<Switch>` ,引入了新的替代者: `<Routes>`
+ `<Routes>` 和 `<Route>`要配合使用,且必须要用 `<Routes>` 包裹 `<Route>`
+ `<Route>` 相当于一个 if 语句,如果其路径与当前 URL 匹配,则呈现其对应的组件
+ `<Route caseSensitive>` 属性用于指定匹配时是否区分大小写 ( 默认为 false )
+ 当URL发生变化时,`<Routes>` 都会查看其所有子 `<Route>` 元素以找到最佳匹配并呈现组件
+ `<Route>` 也可以嵌套使用,且可配合 `useRoutes()` 配置 “路由表”,但需要通过 `<Outlet>` 组件来渲染其子路由

```jsx
<Routes>
  // path属性用于定义路径,element属性用于定义当前路径所对应的组件
  <Route path="/login" element={<Login />} />

  // 用于定义嵌套路由,home是一级路由,对应的路径/home
  <Route path="home" element={<Home />}>
    // test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2
    <Route path="test1" element={<Test/>} />
    <Route path="test2" element={<Test2/>} />
  </Route>

  // Route也可以不写element属性,这时就是用于展示嵌套的路由,所对应的路径是/users/xxx
  <Route path="users">
    <Route path="xxx" element={<Demo />} />
  </Route>
</Routes>
```

### Link
修改URL,且不发送网络请求 ( 纯路由链接 )

注意: 外侧需要用 `<BrowserRouter>` 或 `<HashRouter>` 包裹
```jsx
import { Link } from "react-router-dom";

function Test() {
  return (
    <div>
      <Link to="/login">按钮</Link>
    </div>
  );
}
```

### NavLink
与 `<Link>` 组件类似,额外可实现导航的`高亮`效果 ( `className`,`style` 都可以实现 )

> 注意: NavLink默认类名是active,如果此页面引入了 `active` 类会默认加上去
```jsx
<NavLink
  to="login"
  className={({ isActive }) => isActive ? 'base one' : 'base'}>
  login
</NavLink>

// 默认情况下,当Home的子组件匹配成功,Home的导航也会高亮
// 当NavLink上添加了end属性后,若Home的子组件匹配成功,则Home的导航没有高亮效果
<NavLink to="home" end >home</NavLink>
```

### Navigate
只要 `<Navigate>` 组件被渲染,就会修改路径,切换视图 ( 相当于DOM结构上的跳转语句 )

`replace` 属性用于控制跳转模式 ( push 或 replace,默认是push )
```jsx
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
export default function Home() {
  const [ sum, setSum ] = useState(1)
  return (
    <div>
      <h3>我是Home的内容</h3>
      {sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true}/>}
      <button onClick={()=>setSum(2)}>点我将sum变为2</button>
    </div>
  )
}
```

### Outlet
当`<Route>`产生嵌套时,负责渲染其对应的后续子路由
``` jsx
//根据路由表生成对应的路由规则
const element = useRoutes([
  {
    path: '/home',
    element: <Home/>,
    children:[
      {
        path: 'news',
        element: <News/>
      },
      {
        path: 'message',
        element: <Message/>,
      }
    ]
  }
])

//Home.js
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
export default function Home() {
return (
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul className="nav nav-tabs">
        <li>
          <NavLink className="list-group-item" to="news">News</NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="message">Message</NavLink>
        </li>
      </ul>
      {/* 指定路由组件呈现的位置 */}
      <Outlet />
    </div>
  </div>
)
}
```

## Hooks
### useRoutes()
根据路由表,动态创建 `<Routes>` 和 `<Route>`
```jsx
// 路由表配置: src/routes/index.js
import About from '../pages/About'
import Home from '../pages/Home'
import { Navigate } from 'react-router-dom'
export default [
  {
    path: '/about',
    element: <About/>
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/',
    element: <Navigate to="/about"/> // 这个就是重定向, '/' 重定向至 about页面
  }
]

// App.jsx
import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App() {
// 根据路由表生成对应的路由规则
const element = useRoutes(routes)
  return (
    <div>
      ......
        {element} // 注册路由
      ......
    </div>
  )
}
```

### useNavigate()
返回一个函数用来实现编程式导航
```jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Demo() {
  const navigate = useNavigate()
  const handle = () => {
    navigate('/login', { // 第一种使用方式：指定具体的路径
      replace: false,
      state: { a: 1, b: 2}
    })
    navigate(-1) //第二种使用方式: 传入数值进行前进或后退,类似于5.x中的 history.go()方法
  }
  return (
    <div>
      <button onClick={handle}>按钮</button>
    </div>
  )
}
```

### useParams()
回当前匹配路由的 `params` 参数,类似于5.x中的 `match.params`
```jsx
// App.jsx 页面定义params
import { Routes, Route, Link } from 'react-router-dom';
import User from './pages/User.jsx'
function App() {
  return (
    <Link to='/user/123' />
    <Routes>
      <Route path="/user/:id" element={<User />} />
    </Routes>
  );
}

// User 页面接收params
import { useParams } from 'react-router-dom';
function ProfilePage() {
  let { id } = useParams(); // 获取URL中携带过来的params参数
  return (
    <div>{id}</div> // 123
  )
}
```

### useSearchParams()
用于读取和修改当前位置的 URL 中的查询字符串 ( 返回一个包含两个值的数组,内容分别为: 当前的seaech参数、更新search的函数 )
```jsx
import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'

<Link to='detail?id=cheng&title=21&content=123123'/> // 跳转到 detail页面

export default function Detail() {
  const [ search, setSearch ] = useSearchParams()
  const id = search.get('id')
  const title = search.get('title')
  const content = search.get('content')
  return (
    <ul>
      <li>
        <button onClick={()=>setSearch('id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的search参数</button>
      </li>
      <li>消息编号：{id}</li>
      <li>消息标题：{title}</li>
      <li>消息内容：{content}</li>
    </ul>
  )
}
```

### useLocation()
获取当前 location 信息,对标5.x中的路由组件的 `location` 属性 ( 主要拿到内部 state 参数 )
```jsx
// 其他的跳转页面
const navigate = useNavigate()
const handle = () => {
  navigate('/detail', {
    replace: false,
    state: { a: 1, b: 2}
  })
}

// detail.jsx 页面
import React from 'react'
import {useLocation} from 'react-router-dom'
export default function Detail() {
  const x = useLocation()
  /*
    x: {
        hash: "",
        key: "ah9nv6sz",
        pathname: "/login",
        search: "?name=zs&age=18",
        state: { a: 1, b: 2 }
      }
  */
  return (
    <ul>
      <li>消息编号：{x.a}</li>
      <li>消息标题：{x.b}</li>
    </ul>
  )
}
```

### useMatch()
返回当前匹配信息,对标5.x中的路由组件的 `match` 属性

```jsx
<Route path="/login/:page/:pageSize" element={<Login />}/>
<NavLink to="/login/1/10">登录</NavLink>

export default function Login() {
  const match = useMatch('/login/:x/:y')
  /*
  match: {
      params: {x: '1', y: '10'}
      pathname: "/LoGin/1/10"  
      pathnameBase: "/LoGin/1/10"
      pattern: {
        path: '/login/:x/:y', 
        caseSensitive: false, 
        end: false
      }
    }
  */
  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}
```

### useInRouterContext()
如果组件在 `<Router>` 的上下文中呈现,则 `useInRouterContext` 钩子返回 true,否则返回 false

### useNavigationType()
返回当前的导航类型,返回值:
+ PUSH
+ REPLACE
+ POP (指在浏览器中直接打开了这个路由组件)

### useOutlet()
用来呈现当前组件中渲染的嵌套路由
```jsx
const result = useOutlet()
console.log(result)
// 如果嵌套路由没有挂载,则result为null
// 如果嵌套路由已经挂载,则展示嵌套的路由对象
```

### useResolvedPath()
给定一个 URL值,解析其中的 path、search、hash值