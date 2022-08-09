# vite
## 创建项目
安装 pnpm 后,执行下面的命令,选择相对应的框架即可自动生产
```
pnpm create vite
```
## 配置 css
为什么需要配置css打包,如果不用配置任何css方案会出现哪些问题?
1. 老生常谈,基础的css是不支持选择器嵌套的
2. 样式很可能会存在污染,使用心智徒增
3. 浏览器兼容问题,某些css属性为了兼容大部分浏览器需要增加前缀
4. 打包后的css代码是无删减的,不能做到抛弃无用的css

针对于以上问题,目前已有的解决方案有:
1. sass/scss 和 less
2. vue 的 style scoped
3. react 更改文件名 .module.scss
4. PostCSS (打包时自动添加浏览器前缀)
5. windicss 和 unocss 也是不错的原子化css方案

那么想用这些解决方案就需要利用这些方案提供的插件对原生css进行打包,生成最终能在生产环境使用的css,同时开发环境也能屏蔽以上那些问题
``` ts
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
  },
};
```

## 批量引入文件
比如在 Header 中分别引入 5 个 svg 文件:
``` ts
import Logo1 from '@assets/icons/logo-1.svg';
import Logo2 from '@assets/icons/logo-2.svg';
import Logo3 from '@assets/icons/logo-3.svg';
import Logo4 from '@assets/icons/logo-4.svg';
import Logo5 from '@assets/icons/logo-5.svg';
```

Vite 中提供了import.meta.glob的语法糖来解决这种批量导入的问题,如上述的 import 语句可以写成下面这样:
``` ts
const icons = import.meta.glob('../../assets/icons/logo-*.svg');
```

## 预构建
vite是提倡 `no-bundle` 的构建工具,相比于webpack能做到开发时的模块代码按需编译,这里的模块代码分为源代码(业务代码)和第三方代码(node_modules中的代码),对于源代码vite才会采取 `no-bundle` ,对于第三方代码vite还是会打包,并且利用的是速度极快的esbuild来完成,打包第三方代码的过程可以理解为预构建

### 为什么需要预构建
1. 第三方插件不支持esm: 因为vite利用的是浏览器原生支持的esm规范实现的 `dev server`,所以内容应该都遵循esm规范,但是很多第三方的打包规范并没有支持esm版本,这个过程需要预构建来把包处理为esm版本
2. 插件内过多的引用: 因为资源的加载都是利用浏览器直接加载的,但是有些库会有非常多的基础引用,这有的时候会带来卡顿

依赖预构建主要做了两件事情:
1. 将其他格式(如 UMD 和 CommonJS)的产物转换为 ESM 格式,使其在浏览器通过 `<script type="module"><script>` 的方式正常加载
2. 是打包第三方库的代码,将各个第三方库分散的文件合并到一起,减少 HTTP 请求数量,避免页面加载性能劣化

而这两件事情全部由性能优异的 Esbuild 完成的

### 如何开启预构建
Vite 设置了本地文件系统的缓存,所有的预构建产物默认缓存在node_modules/.vite目录中,如果以下 3 个地方都没有改动,Vite 将一直使用缓存文件:
+ package.json 的 dependencies 字段
+ 各种包管理器的 lock 文件
+ optimizeDeps 配置内容

少数场景下我们不希望用本地的缓存文件,比如需要调试某个包的预构建结果,推荐使用下面任意一种方法清除缓存,还有手动开启预构建:
+ 删除node_modules/.vite目录
+ 在 Vite 配置文件中,将server.force设为true
+ 命令行执行npx vite --force或者npx vite optimize

> 对于依赖的请求结果,Vite 的 Dev Server 会设置强缓存(设置一年,表示缓存过期前浏览器对某个预构建产物的请求不会再经过 Vite Dev Server,直接用缓存结果)

### include
强制预构建的依赖项
``` ts
// vite.config.ts
optimizeDeps: {
  // 配置为一个字符串数组,将 `lodash-es` 和 `vue`两个包强制进行预构建
  include: ["lodash-es", "vue"];
}
```

使用场景:
1. 动态 import
2. 某些包被手动 exclude

场景1: 在动态引入时,vite会重新走一遍预构建(也叫做二次预构建),还会刷新页面,还会重新请求所有模块,这在大型项目中是很浪费性能的,所以我们可以先对其进行预构建,在真正使用到的时候可以避免二次预加载

场景2: exclude是排除一些包,不让其进入预构建,比如通过cdn引入的插件就不需要加入构建过程,但是如果引入的这个插件又用到了其他插件,而这个插件又不支持esm格式,那么vite就会打包报错,这时候需要主动 include 引入此插件先

### 自定义 Esbuild
``` ts
// vite.config.ts
{
  optimizeDeps: {
    esbuildOptions: {
       plugins: [
        // 加入 Esbuild 插件
      ];
    }
  }
}
```

使用场景例如: 第三方包出现问题
1. 解决1: Esbuild插件替换
2. 解决2: 修改插件源代码后,通过 patch-package 插件同步第三方源代码更改
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