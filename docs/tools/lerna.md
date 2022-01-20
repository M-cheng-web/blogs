# lerna

## 作用
在制作库时如果需要支持不同平台的版本(例如vue,react,uniapp),为此一般有俩种方案
1. 分多个项目,每个项目都分别对应一个平台
2. 都在一个项目里面,然后分成多个目录开发

第一种方案是最恶心的,每个版本只有发布后才能让其他版本使用,如果不依赖核心版本的话重复代码又多,而且到时候有功能变动直接多仓库改代码,人都要没....
<br>
第二种方案又不方便代码复用,当然你也可以重复打包然后给目标版本当做依赖用,但是都不够优雅,而且要自己维护这种关系,不易于其他人上手

这样一比较,lerna给予我们的就非常优雅了

## 优势
制作支持不同平台的库必备~~~
+ 可以帮我们管理多个版本的依赖关系,核心版本更改后可以直接动态的让其他版本开发环境使用
+ 批量执行打包,`npm script`命令
+ 批量更改版本号
+ 批量发布

## 模板地址
[https://github.com/M-cheng-web/template-lerna](https://github.com/M-cheng-web/template-lerna)

## 实践
此实践假设要发布`web-tracing`以及`@web-tracing/react`这俩包(后续你可以自己添加`@web-tracing/uniapp`等等),需要用到 lerna + rollup,

注意
+ 这里不会详细介绍`lerna`的各个命令
+ 如果是确定了以后只想要发布`web-tracing`那就没必要用`lerna`
+ 这里只介绍与`lerna`相关的操作,关于内部`rollup`的操作请移步`Rollup`篇哦
+ 如果想知道如何发布`npm包组织`(也就是类似`@web-tracing/react`这样的),请移步`发布npm库`篇

### 目录和准备
``` js
|-- demo
    |-- lerna.json // lerna 配置文件
    |-- package.json
    |-- packages
        |-- react // react分支包
        |   |-- package.json
        |   |-- build
        |   |   |-- rollup.config.build.js
        |   |   |-- rollup.config.dev.js
        |   |   |-- rollup.config.js
        |   |-- dist
        |   |   |-- index.cjs.js
        |   |   |-- index.esm.js
        |   |   |-- index.umd.js
        |   |-- example
        |   |   |-- index.html
        |   |-- src
        |       |-- index.js
        |-- web-tracing // 核心包
            |-- package.json
            |-- build
            |   |-- rollup.config.build.js
            |   |-- rollup.config.dev.js
            |   |-- rollup.config.js
            |-- dist
            |   |-- index.cjs.js
            |   |-- index.esm.js
            |   |-- index.umd.js
            |-- example
            |   |-- index.html
            |-- src
                |-- index.js
```

安装对应编译的npm模块
```
## 安装 lerna.js 基础模块
npm i lerna -D
```

### package.json 配置
``` json
{
  "name": "web-tracing",
  "private": true, // 表示这个包不会发布
  "devDependencies": {
    "lerna": "^4.0.0"
  },
  "scripts": {
    // 运行这个命令会将lerna的依赖构造起来,也会安装各个包所需的依赖
    // (注意: 在拉取别人的lerna项目下来时只需要在根目录运行这个命令就行了,不要手动去各个包目录下安装依赖)
    "install": "lerna bootstrap",

    // 在各个包下面执行`npm run dev`,lerna exec比lerna run更灵活
    "dev": "lerna exec --scope=web-tracing -- npm run dev",

    // 在各个包下面执行`npm run dev`
    "dev:vue": "lerna run --scope=web-tracing --scope=@web-tracing/vue dev --parallel",

    // 在各个包下执行`npm run build`命令
    "build": "lerna run build --sort --stream",

    // 更改各个包的版本号
    "update-version": "lerna version --conventional-commits --no-push --no-changelog --no-git-tag-version",

    // 更改各个包的版本号,不同于上一个,此命令能让你自由选择想要的版本号
    "update-version-p": "lerna version --conventional-prerelease --no-push --no-changelog --no-git-tag-version",

    // 发布各个包,发布版本会依赖于当前 package.json 中的 version
    "publish-to-npm": "lerna publish from-package",

    // 发布各个包,也要求有提交记录,此发布是发布到 beta 测试版本
    "publish-beta": "lerna publish --no-git-tag-version --dist-tag beta"
  },
  "workspaces": [
    "packages/*"
  ]
}
```
此配置中后缀含义:
+ --parallel 完全忽略并发和拓扑排序, 立即运行给定的命令或脚本
+ --stream 控制台输出信息, 主要是可以前缀为原始包名称, 在执行多个包的相同命令时加上这个能方便出哪个包的输出
+ --sort 拓扑排序执行
+ --conventional-commits 意思是使用"常规提交规范"来确定版本提升 (lerna version 使用)
+ --no-git-tag-version 不更改package.json 中的版本号信息以及不会提交

### 使用
+ 创建包
```
lerna init
lerna create web-tracing
lerna create @web-tracing/react
```

> 此时会发现在 packages 文件夹中有 react & web-tracing 两个文件夹,并且有各自的 package.json 文件
> 我只保留了 package.json 文件,其他都删掉了换成自己的东西,放心这不会导致然后问题

+ 各个包配置
需要配置各个包的 package.json 文件,比如 script 命令,以及 rollup 所需要的的依赖及配置(怎么配置的去参考`rollup`篇哦),其实在这个库中这俩配置的差异是不大的,因为本身代码差异就不大

web-tracing 配置如下:
``` json
{
  "name": "web-tracing",
  "version": "1.0.0",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "jsdelivr": "dist/index.umd.js",
  "scripts": {
    "dev": "rollup -c build/rollup.config.dev.js -w",
    "build": "rollup -c build/rollup.config.build.js"
  },
  "devDependencies": {
    "@babel/core": "^7.10.2",
    "@babel/preset-env": "^7.10.2",
    "rollup": "^2.15.0",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-json": "^4.0.0",
    "rollup-plugin-livereload": "^2.0.5",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-serve": "^1.1.0",
    "rollup-plugin-uglify": "^6.0.4"
  },
  "dependencies": {
    "web-tracing": "^10.4.0"
  }
}
```

@web-tracing/react 配置如下:
``` json
{
  "name": "@web-tracing/react",
  "version": "1.0.0",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "jsdelivr": "dist/index.umd.js",
  "scripts": {
    "dev": "rollup -c build/rollup.config.dev.js -w",
    "build": "rollup -c build/rollup.config.build.js"
  },
  "publishConfig": { // 一定要加入这个,负责会上传不成功
    "access": "public"
  },
  "devDependencies": {
    "@babel/core": "^7.10.2",
    "@babel/preset-env": "^7.10.2",
    "rollup": "^2.15.0",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-json": "^4.0.0",
    "rollup-plugin-livereload": "^2.0.5",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-serve": "^1.1.0",
    "rollup-plugin-uglify": "^6.0.4"
  }
}
```

**如果你是复制进去的,复制后可以直接在根目录执行`yarn install`下载依赖**

然后运行`yarn build`试试发生了啥吧<br>
发现`packages / react`以及`packages / web-tracing`下产生了dist文件,里面就是打包后的代码,原理是
lerna调用了他们各自的`build`命令

**如果想达到把`web-tracing`作为核心包,然后在`react`中引入这个核心包,这样进行开发该怎么做?**
这就是`lerna`的魅力所在,直接在根目录执行这样的命令`lerna add web-tracing --scope=@web-tracing/react`(如果想要所有的包都依赖于这个核心包,直接去掉scope)

可以发现 react 的配置中 dependencies 引入了 web-tracing
``` json
"dependencies": {
  "web-tracing": "^1.0.0"
}
```
> 当更改了核心包后需要执行`yarn build`,其他依赖的才会更新

### 更改版本
执行`yarn update-version` 或者 `yarn update-version-p`

### 发布
执行`yarn publish-to-npm` 或者 `yarn yarn publish-beta`

> 发布之前一定要先打包! ! ! ! !
> 当然你也可以配置更适合你的,我这个可能还是比较复杂了

### 补充
+ update-version 在更改版本号的时候是自动取下个版本的,例如 0.0.0 => 0.0.1 / 0.0.0-beta.0  => 0.0.0-beta.1 
+ update-version-p 更改版本号能有更多选择,选项中选择 custom prerelease 能发布预览版,如果想自定义版本选项中选择 custom Version
+ 执行 publish-to-npm,这个命令是不会再自动更改版本号,会根据 package.json 中的版本号来发布
+ publish-beta: 提交测试包, 此命令并不会更新目标包的版本,是无痕的,只会在远程npm更新tag 为 beta的包
注意, 此命令会把当前工作区清空,回退, 请使用前提交好代码(commit)
+ 在某个库的分支包中如果依赖于核心包,一定要放在 dependencies 中