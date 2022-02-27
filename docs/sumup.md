# 关键点总结

## Electron

### 了解websocket

### 看一遍红宝书的笔记


## 页面加载和渲染过程
+ 加载过程
  - DNS解析: 域名 -> IP地址
  - 浏览器根据 IP地址向服务器发起 http请求
  - 服务器处理 http请求 并返回给浏览器

+ 渲染过程
  - 根据 CSS代码生成 CSSOM
  - 根据 HTML代码生成 DOM Tree
  - 将 DOM Tree和 CSSOM整合形成 Render Tree
  - 根据 Render Tree渲染页面
  - 遇到 <script>则暂停渲染 优先加载并执行 JS代码 完成再继续
  - 直至把 Render Tree渲染完成

+ 重点
  - css代码导入要在 html代码之前,避免重复整合 Render Tree
  - js要放在 body最后, 因为加载 js会暂停渲染

可以参考渲染那一块, 还有一个关于渲染的步骤

## 性能优化
+ 多使用内存 缓存或其他方法
+ 减少 CPU计算量 减少网络加载耗时
+ 空间换时间
+ 减少资源体积: 压缩代码
+ 减少访问次数: 合并代码 SSR服务器端渲染 缓存
    - 服务器端渲染: 将网页和数据一起加载 一起渲染
    - 非 SSR(前后端分离): 先加载网页 再加载数据 再渲染数据
+ 使用更快的网络: CDN
+ 懒加载
+ 节流 防抖
+ DOM操作放到缓存中
+ 多个 DOM操作一起插入到 DOM结构

## 安全相关

## 浏览器相关

### 浏览器缓存跨域问题

+ 跨域
    - 同源策略: 协议,主机,端口号,主域名相同
    - 动态创建script 因为script标签不受同源策略影响
    - JSONP 在axios请求参数内加个 jsonp
    - CORS 配置 axios.defaults.withCredentials = true 允许跨域携带cookie信息
    - websocket

+ HTTP 和 HTTPS HTTPS是加密的

+ 页面存储
    - cookie 数据自动携带于请求中(过期之前有效,浏览器关闭无效)
    - sessionStorage(关闭浏览器就会消失)
    - localStorage(永久存储,只能手动删除)


## css 
+ margin 重合解决
+ bfc

## yarn npm cnpm

## vue


### vue3的一些特性


### vue3
setup 有什么作用,为什么这样设计

+ Proxy 观察者机制 相对于 Object.defineproperty 能观察到对象内属性的变化
+ 一块功能的逻辑都能写一起,不像2.0一样弄清楚一个模块要跳来跳去,特别是当混入多了后,根本不知道这个东西是从哪来的
+ 生命周期 销毁重命名为 unmounted beforeUnmount
+ v-model 的更改 .sync取消 可以多个v-model 但是内部不是 input而是 update:modeValue

## vite 熟悉一下流程

## 项目

+ app流程
    - 购买页面: 限价买入,市价买入 倍数 滑块输入手数 币种切换
    - 账单页面: 浮动盈亏,风险率  委托中,已取消,平仓记录 一键平仓

### 总结一下以前区块链的代码