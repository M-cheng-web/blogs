# Esbuild 插件开发

## 为什么其性能极高
1. 使用 Go 开发，构建逻辑代码直接被编译为原生机器码，而不用像 JS 一样先代码解析为字节码，然后转换为机器码
2. 多核并行，得益于 Go 当中多线程共享内存的优势
3. 从零造轮子，几乎所有第三方库都自己编写，保证极致的代码性能
4. 高效的内存利用，从头到尾尽可能地复用一份 AST 节点数据

## 项目打包
Build API主要用来进行项目打包，包括 `build, buildSync, serve` 三个方法。

+ build 和 buildSync 作用一样，一个是同步一个是异步
> 推荐用 build，因为 esbuild 是多线程的，buildSync 会使其丧失并发任务处理的优势，打个我在某个场景获取了 buildSync的结果，然后在下面进行一些其他方法的调用，但是在 buildSync 的结果返回之前这一块我是不能再做其他处理了，如果是单线程的则无所谓，但是在多线程中就浪费了性能增加了执行时间

+ serve
1. 开启 serve 模式后，将在指定的端口和目录上搭建一个静态文件服务，这个服务器用原生 Go 语言实现，性能比 Nodejs 更高
2. 类似 webpack-dev-server，所有的产物文件都默认不会写到磁盘，而是放在内存中，通过请求服务来访问
3. 每次请求到来时，都会进行重新构建(rebuild)，永远返回新的产物 **(触发 rebuild 的条件并不是代码改动，而是新的请求到来)**

> 后续每次在浏览器请求都会触发 Esbuild 重新构建，而每次重新构建都是一个增量构建的过程，耗时也会比首次构建少很多(一般能减少 70% 左右)

``` ts
const { build, buildSync, serve } = require("esbuild");

async function runBuild() {
  // 异步方法，返回一个 Promise
  const result = await build({
    // ----  如下是一些常见的配置  ---
    absWorkingDir: process.cwd(), // 当前项目根目录

    entryPoints: ["./src/index.jsx"], // 入口文件列表，为一个数组

    outdir: "dist", // 打包产物目录

    bundle: true, // 是否需要打包，一般设为 true

    format: "esm", // 模块格式，包括`esm`、`commonjs`和`iife`

    external: [], // 需要排除打包的依赖列表

    splitting: true, // 是否开启自动拆包

    sourcemap: true, // 是否生成 SourceMap 文件

    metafile: true, // 是否生成打包的元信息文件

    minify: false, // 是否进行代码压缩

    watch: false, // 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包

    write: true, // 是否将产物写入磁盘

    // Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
    // 针对一些特殊的文件，调用不同的 loader 进行加载
    loader: {
      '.png': 'base64',
    }
  });
  console.log(result);
}

runBuild();
```

## 插件钩子
简单例子
``` ts
let envPlugin = {
  name: 'env', // 插件名
  setup(build) {
    // 在引入资源时会进行拦截，函数返回的对象相当于被拦截的资源的身份信息
    // filter: 正则筛选目标文件 (必传) 不支持前瞻(?<=)、后顾(?=)和反向引用(\1)这三种规则
    build.onResolve({ filter: /^env$/ }, args => ({
      path: args.path,
      namespace: 'env-ns',
    }))

    // 加载资源时会进行拦截，返回一个对象，contents 表示返回的模块内容，loader表示文件格式
    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }))
  },
}

require('esbuild').build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'out.js',
  // 应用插件
  plugins: [envPlugin],
}).catch(() => process.exit(1))
```

### onResolve 钩子详解
``` ts
build.onResolve({ filter: /^env$/ }, (args: onResolveArgs): onResolveResult => {
  console.log(args.path) // 模块路径
  console.log(args.importer) // 父模块路径
  console.log(args.namespace) // namespace 标识
  console.log(args.resolveDir) // 基准路径
  console.log(args.kind) // 导入方式，如 import、require
  console.log(args.pluginData) // 额外绑定的插件数据

  return {
      errors: [], // 错误信息
      external: false; // 是否需要 external
      namespace: 'env-ns'; // namespace 标识
      path: args.path, // 模块路径
      pluginData: null, // 额外绑定的插件数据
      pluginName: 'xxx', // 插件名称
      sideEffects: false, // 设置为 false，如果模块没有被用到，模块代码将会在产物中会删除。否则不会这么做
      suffix: '?xxx', // 添加一些路径后缀，如`?xxx`
      warnings: [], // 警告信息

      // 仅仅在 Esbuild 开启 watch 模式下生效
      watchDirs: [], // 告诉 Esbuild 需要额外监听哪些文件的变化
      watchFiles: [] // 告诉 Esbuild 需要额外监听哪些目录的变化
  }
}

```

### onLoad 钩子详解
``` ts
build.onLoad({ filter: /.*/, namespace: 'env-ns' }, (args: OnLoadArgs): OnLoadResult => {
  console.log(args.path); // 模块路径
  console.log(args.namespace); // namespace 标识
  console.log(args.suffix); // 后缀信息
  console.log(args.pluginData); // 额外的插件数据

  return {
      contents: '省略内容', // 模块具体内容
      errors: [], // 错误信息
      loader: 'json', // 指定 loader，如`js`、`ts`、`jsx`、`tsx`、`json`等等
      pluginData: null, // 额外的插件数据
      pluginName: 'xxx', // 插件名称
      resolveDir: './dir', // 基准路径
      warnings: [], // 警告信息

      // 仅仅在 Esbuild 开启 watch 模式下生效
      watchDirs: [], // 告诉 Esbuild 需要额外监听哪些文件的变化
      watchFiles: [] // 告诉 Esbuild 需要额外监听哪些目录的变化
  }
});
```

### 其他钩子
除了onResolve和onLoad，还有 onStart 和 onEnd 两个钩子用来在构建开启和结束时执行一些自定义的逻辑
+ onStart 的执行时机是在每次 build 的时候，包括触发 watch 或者 serve模式下的重新构建
+ onEnd 钩子中如果要拿到 metafile，必须将 Esbuild 的构建配置中 metafile 属性设为 true
``` ts
let examplePlugin = {
  name: 'example',
  setup(build) {
    build.onStart(() => {
      console.log('build started')
    });
    build.onEnd((buildResult) => {
      if (buildResult.errors.length) return;
      // 构建元信息
      // 获取元信息后做一些自定义的事情，比如生成 HTML
      console.log(buildResult.metafile)
    })
  },
}
```

## 插件开发
### 一: CDN链接引入第三方插件
``` ts
module.exports = () => ({
  name: "esbuild:http",
  setup(build) {
    let https = require("https");
    let http = require("http");

    // 针对于第一次引入的库进行处理，但是这些库可能会带有额外的依赖项，所以需要下面第二个 onResolve 进行处理
    build.onResolve({ filter: /^https?:\/\// }, (args) => {
      return {
        path: args.path,
        namespace: "http-url",
      }
    });

    // 在第一个 onResolve 后如果库带有一些额外的依赖项，并不会重复触发第一个 onResolve，所以这里增加第二个 onResolve 专门对额外的依赖项进行处理
    build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => {
      return {
        // 重写路径
        path: new URL(args.path, args.importer).toString(),
        namespace: "http-url",
      }
    });

    // 2. 通过 fetch 请求加载 CDN 资源
    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      let contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          let lib = url.startsWith("https") ? https : http;
          let req = lib
            .get(url, (res) => {
              if ([301, 302, 307].includes(res.statusCode)) {
                // 重定向的情况需要重新发送新的请求，然后取消此次请求
                fetch(new URL(res.headers.location, url).toString());
                req.abort(); // 终止此请求
              } else if (res.statusCode === 200) {
                // 响应成功，因为文件的请求分片获取，所以要循环push
                let chunks = [];
                res.on("data", (chunk) => chunks.push(chunk));
                res.on("end", () => resolve(Buffer.concat(chunks)));
              } else {
                reject(
                  new Error(`GET ${url} failed: status ${res.statusCode}`)
                );
              }
            })
            .on("error", reject);
        }
        fetch(args.path);
      });
      return { contents };
    });
  },
});
```

### 二: CDN链接引入第三方插件
``` ts
// utils.js
const createScript = (src) => `<script type="module" src="${src}"></script>`;
const createLink = (src) => `<link rel="stylesheet" href="${src}"></link>`;
const generateHTML = (scripts, links) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Esbuild App</title>
  ${links.join("\n")}
</head>

<body>
  <div id="root"></div>
  ${scripts.join("\n")}
</body>

</html>
`;

module.exports = { createLink, createScript, generateHTML };
```

``` ts
// core.js
const fs = require("fs/promises");
const path = require("path");
const { createScript, createLink, generateHTML } = require('./util');

module.exports = () => {
  return {
    name: "esbuild:html",
    setup(build) {
      build.onEnd(async (buildResult) => {
        if (buildResult.errors.length) return;
        const { metafile } = buildResult;
        // 1. 拿到 metafile 后获取所有的 js 和 css 产物路径
        const scripts = [];
        const links = [];
        if (metafile) {
          const { outputs } = metafile;
          const assets = Object.keys(outputs);

          assets.forEach((asset) => {
            if (asset.endsWith(".js")) {
              scripts.push(createScript(asset));
            } else if (asset.endsWith(".css")) {
              links.push(createLink(asset));
            }
          });
        }
        // 2. 拼接 HTML 内容
        const templateContent = generateHTML(scripts, links);
        // 3. HTML 写入磁盘
        const templatePath = path.join(process.cwd(), "index.html");
        await fs.writeFile(templatePath, templateContent);
      });
    },
  };
}
```

