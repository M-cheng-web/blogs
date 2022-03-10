# 优化

![性能优化简图](https://gitee.com/M-cheng-web/map-storage/raw/master/vue-img/58082bb8d51e463291a98012efd26c55_tplv-k3u1fbpfcp-watermark.webp)

## 优化webpack
参考 [webpack](../tools/webpack.md)

## 优化DOM
+ 删除不必要的代码和注释包括空格,尽量做到最小化文件
+ 可以利用 GZIP 压缩文件 (这个主要是服务器端压缩,浏览器自动解压)
+ 结合 HTTP 缓存文件 (一般情况资源用协商缓存,依赖用强缓存)

## 优化CSSOM
DOM 和 CSSOM 通常是并行构建的,所以 CSS 加载不会阻塞 DOM 的解析,但是渲染树是依赖于 DOM Tree 和 CSSOM Tree 的,所以他必须等待到 CSSOM Tree 构建完成,也就是 CSS 资源加载完成(或者 CSS 资源加载失败)后,才能开始渲染

**因此,CSS 加载会阻塞 Dom 的渲染,由此可见对于 CSSOM 缩小、压缩以及缓存同样重要**

+ 减少关键 CSS 元素
+ 骨架屏

## 优化JS
+ 路由懒加载(预加载)
+ 不重要资源设置浏览器空闲加载
+ script标签设置
  - async: 浏览器遇到这个 script 标记时会继续解析 DOM,同时脚本也不会被 CSSOM 阻止 (可以理解为标记此标签内无DOM操作)
  - defer: 标记此脚本内容在文档解析后再执行
+ link标签预加载 -- preload & prefetch (预加载和其他页面的预加载,prefetch还可以缓存至少5分钟)
+ dns预加载 -- dns-prefetch (意思是在本页面提前设定几个dns预加载,让用户进行页面跳转时再请求的资源能被dns先预加载)
+ 节流防抖

### preload & prefetch
+ preload
场景: 如果网站使用一种特殊字体,我们在css里面定义了字体的url,那么直到浏览器开始解析CSS了才会识别出来需要加载这个资源,会影响首屏出来的速度,可以让浏览器提前下载好此资源

``` html
<link rel="preload" href="fonts/cicle_fina-webfont.woff" as="font" type="font/woff" crossorigin="anonymous">

1. rel ="preolad" 声明这是一个preload
2. href指明资源的位置
3. as指明资源类型 (这是为了让浏览器精确设置优先级,设置正确的CSP,Accept头部)
4. crossorigin 指明使用的跨域设置
```

注意: preload 并不会阻塞正常的渲染流程,它只是在浏览器初次请求时把这个资源的请求加进去了,然后等待这个资源被调用

还可以响应式预加载
``` html
<link rel="preload" href="bg-image-narrow.png" as="image" media="(max-width: 600px)">
<link rel="preload" href="bg-image-wide.png" as="image" media="(min-width: 800px)">
```

+ prefetch
预先加载下个页面的资源<br>
比如这里就是预先加载 `main.js` 的页面资源( 用户此时并不在main页面 )
``` html
<link rel="prefetch" href="main.js">
```

注意: 这个预加载是在浏览器空闲的时候加载的,并不占用初始请求资源

## vue优化
### 服务端渲染
vue是单页面应用,首屏会出来的较慢,可以考虑用服务端渲染和预渲染(Nuxt)

+ 服务端渲染: 发送请求 -> 服务端请求数据渲染html -> 返回包含首屏的html
+ 预渲染: 发送请求 -> 返回包含首屏的html
+ 客户端渲染: 发送请求 -> 拿到html -> js加载并动态渲染

### 按需加载组件
[https://juejin.cn/post/6844903496102199304#comment](https://juejin.cn/post/6844903496102199304#comment)

### 提取各个组件css到单独文件
当使用单文件组件时,组件内的 CSS 会以 `<style>` 标签的方式通过 JavaScript 动态注入
这有一些小小的运行时开销,将所有组件的 CSS 提取到同一个文件可以避免这个问题,也会让 CSS 更好地进行压缩和缓存

这一点通过webpack实现,提取到一个文件还可以去重

### Object.freeze()
Object.freeze() 可以冻结一个对象,冻结之后不能向这个对象添加新的属性,不能修改其已有属性的值,不能删除已有属性,以及不能修改该对象已有属性的可枚举性、可配置性、可写性,该方法返回被冻结的对象

**在vue中, `Object.defineProperty` 不会为冻结的对象添加数据劫持,个人感觉可以在项目中高效使用了**