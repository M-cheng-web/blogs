# rollup

## 作用
用来打包你的 JS 代码,我是用来打包我的插件然后发布到npm

## 优势
+ 可以在应用和库中使用ES模块
+ 配置简单,上手快
+ Tree-shaking

## 模板地址
[https://github.com/M-cheng-web/template-rollup](https://github.com/M-cheng-web/template-rollup)

## 实践
### 目录和准备
``` 
|-- example-rollup
    |-- .babelrc                    # babel配置文件
    |-- package-lock.json
    |-- package.json
    |-- yarn.lock
    |-- build                       # 打包配置文件
    |   |-- rollup.config.build.js  # 生产模式配置
    |   |-- rollup.config.dev.js    # 开发模式配置
    |   |-- rollup.config.js        # 基础打包配置
    |-- dist                        # 包的输出目录
    |-- example                     # 测试目录
    |   |-- index.html
    |-- src                         # 包的源代码
        |-- index.js
```

安装对应编译的npm模块
```
## 安装 rollup.js 基础模块
npm i rollup -D

## babel核心实现
npm i @babel/core -D

## es6转es5,使用这个包要基于 @babel/core
npm i @babel/preset-env -D

## babel 插件
npm i rollup-plugin-babel -D

## 读取 json 文件插件
npm i rollup-plugin-json -D

## 帮助 rollup 查找外部模块,否则在打包的时候不会打包外部模块
npm i rollup-plugin-node-resolve -D

## 帮助 rollup 进行代码压缩
npm i rollup-plugin-uglify -D

## 帮助 rollup 开启本地服务
npm i rollup-plugin-serve -D

## 帮助 rollup 热更新,默认监听根文件夹
## `-w`是在文件更改时自动打包,此插件是在监听到页面所引入的包发生改变时自动热更新页面
npm i rollup-plugin-livereload -D
```

### package.json 配置
-w 的意思是当入口文件发生改变时会自动再次打包
``` js
"scripts": {
  "dev": "rollup -c build/rollup.config.dev.js -w",
  "build": "rollup -c build/rollup.config.build.js"
}
```
上面的分为测试和生产两种模式,可以指定默认配置文件,然后在其内部指定不同的环境加载不同的插件(需要在同级目录创建`rollup.config.js`)
``` js
"scripts": {
  "serve": "rollup -c",
}
```

### .babelrc 配置
与 babel 配合使用,缺少这个文件内容将导致包不能正确转为ES5
``` js
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

### rollup 配置
+ `build/rollup.config.js` 配置
``` js
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import pkg from '../package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: pkg.jsdelivr,
      format: 'umd',
      name: 'webtracing',
      sourcemap: true,
      // 提供映射给 rollup
      // 当使用了外部模块并且放在 external中时,需要提供这样的映射关系给 rollup
      globals: {
        'web-tracing': 'webtracing',
      },
    },
  ],
  plugins: [
    resolve(),
    json(),
    babel({
      exclude: 'node_modules/**'
    }),
  ],
  // 表示 web-tracing 作为外部模块,打包时不会放入
  // 但是同时也要把这个包放入 package.json/dependencies 依赖中
  // 这样应用到项目时,应用项目只会显现此包名,但是实际上在 node_modules 中能找到 web-tracing 模块作为此包的依赖
  external: ['web-tracing'],
};
```

+ rollup.config.dev.js 配置
``` js
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import coreConfig from './rollup.config'

coreConfig.output.forEach((item) => {
  item.sourcemap = true
})

coreConfig.plugins = [
  ...coreConfig.plugins,
  livereload(),
  serve({
    open: true, // 自动打开页面
    port: 3001, 
    openPage: '/example/index.html', // 打开的页面
    contentBase: ''
  })
]

export default coreConfig;
```

+ rollup.config.build.js 配置
``` js
import { uglify } from 'rollup-plugin-uglify';
import coreConfig from './rollup.config'

coreConfig.output.forEach((item) => {
  item.sourcemap = false;
})

coreConfig.plugins = [
  ...coreConfig.plugins,
  uglify(),
]

export default coreConfig;
```
