# webpack

::: tip
此模板还配置了类似于 vue-cli 对于多种环境变量的使用,在最底部有介绍
:::

## 模板地址
[https://github.com/M-cheng-web/template-webpack](https://github.com/M-cheng-web/template-webpack)

## 目录
```
|-- example-webpack
    |-- .eslintrc.js (eslint 配置文件)
    |-- .gitignore
    |-- package.json
    |-- yarn.lock
    |-- config (webpack配置项及环境变量)
    |   |-- .env.development
    |   |-- .env.production
    |   |-- .env.test
    |   |-- define-properties.js
    |   |-- webpack.config.base.js (基础配置)
    |   |-- webpack.config.dev.js (dev配置)
    |   |-- webpack.config.prod.js (prod配置)
    |-- src (被打包模块)
        |-- index.html
        |-- css
        |   |-- index.css
        |   |-- index.less
        |-- img
        |   |-- angular.jpg
        |   |-- react.png
        |-- js
            |-- demo.js
            |-- index.js
```

## 基础配置
+ 打包样式
+ 打包html
+ 打包图片
+ 打包其他资源
+ devserver

## 生产配置
+ css 提取为单独文件
+ css 兼容性处理 (需要在 package.json 中定义 browserslist 来明确开发环境和生产环境的兼容度)
+ css 压缩
+ eslint
+ js 兼容性处理 (这里用的是 corejs 来保证兼容)
+ js 压缩
+ html 压缩

### css 压缩
mode = production 模式时,<br>
html 和 js 都会自动压缩,但是 css 不会压缩,所以需要专门的css压缩库,<br>
而且它可以合并相同的 css 类或者 id, 也能删除空的 css 类

### eslint
这里是用 eslint-webpack-plugin 插件<br>
步骤: 根目录创建 .eslintrc.js 并在其内编写eslint 规则<br>
使用airbnb,需要安装 eslint-config-airbnb-base eslint-plugin-import eslint

### js 兼容性
1. 基本js兼容性处理 --> @babel/preset-env<br>
   问题: 只能转换基本语法,如promise高级语法不能转换
2. 全部js兼容性处理 --> @babel/polyfill<br>
   问题: 我只要解决部分兼容性问题,但是将所有兼容性代码全部引入,体积太大了~
3. 需要做兼容性处理的就做：按需加载  --> core-js

## 优化配置
+ 热更新
+ source-map
+ oneOf
+ 缓存
+ tree-shaking
+ code-split
+ 懒加载 & 预加载
+ 多进程打包
+ externals (排查某些文件不打包)
+ dll
+ 优先处理

### 热更新
当一个模块发生变化,只会重新打包这一个模块,极大提升构建速度
``` js
devServer: {
  port: 3000,
  // 开启HMR功能
  // 当修改了webpack配置,新配置要想生效,必须重启webpack服务
  hot: true
}
```

### source-map
提供源代码到打包后代码的映射关系(如果构建后代码出错了,通过映射可以追踪源代码错误)

有很多种模式,这里开发版本推荐 `eval-source-map / eval-cheap-module-souce-map`
生产环境推荐 `source-map / cheap-module-souce-map`或者生产模式直接不要加入映射

``` js
{
  devtool: 'eval-source-map'
}
```

### oneOf
当打包一个js文件时,其会遍历所有的 `loader` 查看是否匹配,即使其已经被某一个loader处理过,
而利用 `oneOf` 可以手动将那些只会会有一个对应上的 `loader` 放一起,那么在其中一个匹配上后就开始
下一个文件打包,提升效率  

### 缓存
#### babel 缓存
`cacheDirectory: true` 让第二次打包构建速度更快

#### 文件资源缓存
+ hash
  每次wepack构建时会生成一个唯一的hash值,
  但是重新打包会生成新的hash值,导致缓存失效(即使只改动一个代码)

+ chunkhash
  根据模块生成的hash值,如果打包来源于同一个chunk那么hash值是一样的

+ contenthash
  根据文件的内容生成hash值,不同文件hash值一定不一样,且没有发生更改重新打包也不会更改hash值

### tree-shaking
使用前提:
1. 使用ES6模块化
2. 开启production 环境

注意: 需要在 `package.json` 文件中设置 `"sideEffects": ["*.css", "*.less"]` 用来屏蔽对样式文件的树摇

### code-split
1. 可以将node_modules中代码单独打包一个chunk最终输出(也就是将第三方包和本项目代码剥离)
2. 自动分析多入口chunk中,有没有公共的文件. 如果有会打包成单独一个chunk,而不是每个入口文件都单独引入了目标库
``` js
optimization: {
  splitChunks: {
    chunks: 'all'
  }
},
```

### 懒加载 & 预加载
+ 懒加载: 当文件需要使用时才加载
+ 预加载: 一般会在使用之前提前加载js文件(等其他资源加载完毕,浏览器空闲了再偷偷加载资源)
``` js
document.getElementById('btn').onclick = function() {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};
```

### 多进程打包
开启多进程打包,进程启动大概为600ms进程通信也有开销. 只有工作消耗时间比较长,才需要多进程打包
``` js
{
  loader: 'thread-loader',
  options: {
    workers: 2 // 进程2个
  }
},
```

### externals
选择哪个库不进行打包(通过cdn引入的资源可以选择不进行打包)
``` js
externals: {
  jquery: 'jQuery',
},
```

### dll
如果版本不易发生更改的库,可以先把它打包缓存起来,当运行命令打包项目时不会对目标库再次打包,而是
去拿那个缓存的包

### 优先处理
当一个文件要被多个loader处理,最好指定loader执行的先后顺序,
否则执行顺序可能不是预期的,如果没有指定执行顺序默认是从下往上的
``` js
{
  test: /\.less$/,
  use: ['style-loader', 'css-loader', 'less-loader'],
  enforce: 'pre',
// pre 优先处理
// normal 正常处理（默认）
// inline 其次处理
// post 最后处理
},
```

## 环境变量
此模板做了一个类似于 `vue-cli` 对于环境变量处理的小东西,以下是其的使用场景以及规则

场景: 需要创建一个 `qa` 的环境,而且有一些变量是在此环境中
步骤:
1. package.json 中添加打包或者运行规则,加入 cross-env BUILD_ENV=qa
2. 在config文件夹下创建 `.env.qa` 文件,并在其中编写你的变量

注意: 如果第一步不指定 BUILD_ENV, 那么默认为 BUILD_ENV=development

## 环境变量相关备注
+ npm script 中设置 --mode production
会让内部的 process.env.NODE_ENV = 'production'
会让内部的 mode = production

+ 如果不设置 process.env.NODE_ENV 默认为 production

+ 在 webpack.config.js 这样的配置文件中不能访问到 process.env.NODE_ENV

+ cross-env 并不能帮助我们定义浏览器中的变量,它作用是跨平台(mac,linux,window)定义可在
node环境中访问的变量

+ 然后我们可以依赖于 cross-env 定义的变量再用 definePlugin 来定义可在浏览器中访问的变量

+ vuecli 的mode配置方式 [https://cli.vuejs.org/zh/guide/mode-and-env.html] (https://cli.vuejs.org/zh/guide/mode-and-env.html)