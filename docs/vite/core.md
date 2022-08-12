# vite

> 此章节是本人对 掘金小册-vite深入浅出 的总结笔记

## 学习问题
1. esbuild的插件执行顺序

## 创建项目
安装 pnpm 后,执行下面的命令,选择相对应的框架即可自动生产
```
pnpm create vite
```

## vite 的大概实现
预构建
+ Vite 1.x 版本中使用 Rollup 来做这件事
+ Vite 2.x 果断采用 Esbuild 来完成第三方依赖的预构建

Esbuild 存在的几个缺陷
+ 不支持降级到 es5 的代码，这意味着在低端浏览器跑不起来
+ 不提供操作打包产物的接口，Esbuild 的打包极简化，并不像 rollup 一样灵活
+ 不支持自定义代码分割

**所以 vite 的思路是：在开发环境用 Esbuild 编译打包，在生产环境用 rollup 打包**

### Esbuild 在 vite 中的作用
1. 对于第三方依赖，会将非 ESM 格式转换为 ESM 格式 (开发阶段用这个，生产环境用 rollup稳定)
2. 作为 TS 和 JSX 的编译工具 (生产环境)

在对这些文件的编译时 vite 会使用 Esbuild 进行语法转译，也就是将 Esbuild 作为 Transformer 来用，但是并不支持 TS 的类型检查，也就是 Esbuild 并没有实现 ts 的类型检查，所以在编译时仅仅抹掉了类型相关的代码，暂时没有能力实现类型检查，因此 `vite build` 之前会先执行tsc命令，也就是借助 TS 官方的编译器进行类型检查

3. 代码压缩 (生产环境)
> Vite 从 2.6 版本开始，默认使用 Esbuild 来进行生产环境的代码压缩 (包括 JS 代码和 CSS 代码)

传统压缩方式（webpack，rollup）都是使用 Terser 这种 JS 开发的压缩库进行压缩，但是其有两个大缺陷
+ 压缩涉及大量的 AST 操作，但是 AST 无法在各个工具之间共享，比如 Terser 无法与 babel 共享同一个 AST，造成了很多重复解析过程
+ JS 性能比不上 Golang 这种原生语言

**针对以上情况进行实际测试会发现 Esbuild 的压缩速度是传统方式的 20 倍**

### Rollup 在 vite 中的作用
生产环境打包
+ css 代码分割（提高缓存复用率）
+ 自动为入口 chunk 添加预加载
``` html
<!--  自动预加载入口 chunk 所依赖的 chunk-->
<link rel="modulepreload" href="/assets/vendor.293dca09.js">
```

+ 异步 chunk 加载优化
一般情况下，Rollup 打包之后，会先请求 A，然后浏览器在加载 A 的过程中才决定请求和加载 C，但 Vite 进行优化之后，请求 A 的同时会自动预加载 C，通过优化 Rollup 产物依赖加载方式节省了不必要的网络开销

### 兼容插件机制
在开发阶段，Vite 借鉴了 WMR 的思路，自己实现了一个 Plugin Container，用来模拟 Rollup 调度各个 Vite 插件的执行逻辑，而 Vite 的插件写法完全兼容 Rollup，因此在生产环境中将所有的 Vite 插件传入 Rollup 也没有问题

**反过来说，Rollup 插件却不一定能完全兼容 Vite**
