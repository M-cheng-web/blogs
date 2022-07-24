# vite

## 介绍
传统打包构建工具,在服务器启动之前,需要从入口文件完整解析构建整个应用

因此有大量的时间都花在了依赖生成构建编译上

而vite主要遵循的是使用ESM(Es modules模块)的规范来执行代码,由于现代浏览器基本上都支持了ESM规范,所以在开发阶段并不需要将代码打包编译成es5模块即可在浏览器上运行

我们只需要从入口文件出发,在遇到对应的 import 语句时,将对应的模块加载到浏览器中就可以了

因此这种不需要打包的特性也是vite的速度能够如此快速的原因,同时ts/jsx等文件的转译工作也会借助了esbuild来提升速度

在 yarn dev 命令后 Vite就会启动一个dev server,然后加载各种中间件,进而监听对应的前端访问请求

由于vite打包是让浏览器一个个模块去加载的,因此就很容易存在http请求的瀑布流问题 ( 浏览器并发一次最多6个请求 ) vite内部为了解决这个问题主要采取了3个方案
+ 预打包,确保每个依赖只对应一个请求/文件,比如lodash
+ 代码分割code split,可以借助rollup内置的 manualChunks 来实现
+ Etag 304状态码,让浏览器在重复加载的时候直接使用浏览器缓存

问题:
1. 什么是模块预构建
2. vite打包过程: 模块预构建(esbuild)+重写 url(把引入地址改为 node_modules/....)


## 缓存
vite 在模块预构建之后会对构建好的模块进行缓存
### 文件系统缓存
默认会在 node_modules/.vite 中放置缓存的包,除了以下三种情况都不会进行重新运行预构建
+ 更改 package.json 中的 dependencies/devDependencies 列表 (也就是卸载/下载了其他库)
+ 更改包管理器的 .lock 文件 (比如 yarn.lock 文件更改)
+ vite.config.js 相关字段更改了,比如 cacheDir 指向变了也会导致文件缓存失效,重新运行预构建

### 浏览器缓存
HTTP 头 max-age=31536000,immutable 强缓存,同样的也会有以下几个场景导致缓存失效
+ 浏览器调试工具 network - 禁用缓存
+ 重启 vite dev server,并执行 `vite --force` 命令重新构建
+ 重新载入页面 (刷新页面)

## HMR (热更新)
vite已经内置了 vue,react,preact 这些HMR模块



## 创建项目
```
npm init @vitejs/app => 选择自己想要的项目(可选vue,react...)

npm init @vitejs/app my-vite-demo --template react => 直接取名并且指定用什么技术栈
```

## alias别名
``` js
import path from 'path'

resolve: {
  alias: {
    '@': `${path.resolve(__dirname, 'src')}`,
  },
},
```

## 环境变量
1. 根目录创建 `.env.production` 和 `.env.development`
2. 分别内容填充为 `VITE_APP_CCC = 'aaa'` 和 `VITE_APP_CCC = 'bbb'` (必须要 VITE_APP 开头)
3. package.json 文件配置启动命令 `"dev": "vite"` 和 `"dev:prod": "vite --mode production"` 分别表示测试环境和生产环境
4. 在项目中通过 `import.meta.env` 进行获取变量

想要在 vite.config.ts 中拿到环境变量,需要下面配置
``` js
import { defineConfig, loadEnv } from 'vite'
export default ({ mode }) =>{
  const env=loadEnv(mode, process.cwd());  // 获取.env文件里定义的环境变量
  // console.log(12, env)
  return defineConfig({
   // ...
  })
}
```

## 本地请求代理
``` js
server:{
  proxy:{
    '/api': {
      target: 'https://live.xxx.cc',
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(/^\/api/, ''),
    }
  }
}
```