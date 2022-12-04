# 预构建
vite是提倡 `no-bundle` 的构建工具,相比于webpack能做到开发时的模块代码按需编译,这里的模块代码分为源代码(业务代码)和第三方代码(node_modules中的代码),对于源代码vite才会采取 `no-bundle` ,对于第三方代码vite还是会打包,并且利用的是速度极快的esbuild来完成,打包第三方代码的过程可以理解为预构建

## 为什么需要预构建
1. 第三方插件不支持esm: 因为vite利用的是浏览器原生支持的esm规范实现的 `dev server`,所以内容应该都遵循esm规范,但是很多第三方的打包规范并没有支持esm版本,这个过程需要预构建来把包处理为esm版本
2. 插件内过多的引用: 因为资源的加载都是利用浏览器直接加载的,但是有些库会有非常多的基础引用,这有的时候会带来卡顿

依赖预构建主要做了两件事情:
1. 将其他格式(如 UMD 和 CommonJS)的产物转换为 ESM 格式,使其在浏览器通过 `<script type="module"><script>` 的方式正常加载
2. 是打包第三方库的代码,将各个第三方库分散的文件合并到一起,减少 HTTP 请求数量,避免页面加载性能劣化

而这两件事情全部由性能优异的 Esbuild 完成的

## 如何开启预构建
Vite 设置了本地文件系统的缓存,所有的预构建产物默认缓存在node_modules/.vite目录中,如果以下 3 个地方都没有改动,Vite 将一直使用缓存文件:
+ package.json 的 dependencies 字段
+ 各种包管理器的 lock 文件
+ optimizeDeps 配置内容

少数场景下我们不希望用本地的缓存文件,比如需要调试某个包的预构建结果,推荐使用下面任意一种方法清除缓存,还有手动开启预构建:
+ 删除node_modules/.vite目录
+ 在 Vite 配置文件中,将server.force设为true
+ 命令行执行npx vite --force或者npx vite optimize

> 对于依赖的请求结果,Vite 的 Dev Server 会设置强缓存(设置一年,表示缓存过期前浏览器对某个预构建产物的请求不会再经过 Vite Dev Server,直接用缓存结果)

## include
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

## 自定义 Esbuild
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
2. 解决2: 修改插件源代码后,通过 `patch-package` 插件同步第三方源代码更改