# 发布 npm 包
> 这里主要是分享作者本人制作 JS 插件并发布到 npm 平台的过程

1. 注册 npm 用户
2. 本地终端 `npm login` (账号密码是 npm 用户的, `npm whoami` 可查看当前npm 用户)
3. `npm publish` 发布插件

## package.json 配置
``` json
{
  "name": "@web-tracing/vue", // npm 包名
  "version": "1.5.1", // 包的版本号
  "description": "一个支持 vue2 / vue3 的【 行为埋点 / 性能采集 / 异常采集 / 请求采集 / 路由采集 】 插件", // 包的描述信息
  "main": "dist/index.cjs.js", // 主入口
  "module": "dist/index.esm.js", // es模块入口（优先）
  "jsdelivr": "dist/index.umd.js", // jsdelivr 链接引入的入口
  "scripts": {
    "dev": "rollup --config build/rollup.config.dev.js -w",
    "build": "rollup --config build/rollup.config.build.js",
    "rm-dist": "rimraf dist"
  },
  "dependencies": { // 生产环境依赖
    "web-tracing": "^10.5.1"
  },
  "devDependencies": { // 开发环境依赖
    "@babel/core": "^7.10.2",
    "@babel/preset-env": "^7.10.2",
    "rimraf": "^3.0.2",
    "rollup": "^2.15.0",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-json": "^4.0.0",
    "rollup-plugin-livereload": "^2.0.5",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-serve": "^1.1.0",
    "rollup-plugin-uglify": "^6.0.4"
  },
  "publishConfig": { // 表示公共包（发布 npm 组织包必须的配置）
    "access": "public"
  },
  "files": [ // 提交指定的模块到 npm
    "dist"
  ],
  "keywords": [ // npm 包搜索时的关键字
    "埋点",
    "性能",
    "异常",
    "性能采集",
    "异常采集",
    "前端埋点",
    "前端性能采集"
  ]
}
```

## 注意
+ `.npmignore` 文件可设置某些文件不上传到 npm (一般通过 `package.json`文件配置就行了)
+ 发布单个独立的包直接`npm publish`就行，但是需要发布组织包就必须要先在npm官网创建组织，然后再配置`package -> publishConfig`(如上代码配置)