# vuepress

## 作用
能快速帮助我们搭建博客或者是项目文档系统

## 优势
真的很快~~~

## 模板地址
[https://github.com/M-cheng-web/template-vuepress](https://github.com/M-cheng-web/template-vuepress)

## 模板线上地址
[https://m-cheng-web.github.io/template-vuepress/](https://m-cheng-web.github.io/template-vuepress/)

## 实践
### 目录和准备
``` js
|-- template-vuepress
    |-- .gitignore
    |-- deploy.sh // 推送到部署分支的配置文件
    |-- package.json
    |-- yarn.lock
    |-- docs
        |-- README.md // 入口文件
        |-- .vuepress
        |   |-- config.js // 配置页面路由关系
        |   |-- styles
        |       |-- index.styl // 更改全局样式
        |-- demo01
        |   |-- core.md
        |-- demo02
            |-- core.md
```

安装模块
``` json
// 核心模块
yarn add -D vuepress

// 主题
yarn add vuepress-theme-reco
```

### package.json 配置
``` json
"scripts": {
  "dev": "vuepress dev docs --temp .temp",
  "build": "vuepress build docs"
},
"devDependencies": {
  "vuepress": "^1.9.5"
},
"dependencies": {
  "vuepress-theme-reco": "^1.6.10" // 这个是主题,可以下载其他主题
}
```

### 目录配置
在 `docs > .vuepress > config.js` 中配置各个页面

### 部署
会在你的 github 项目仓库中创建一个分支或者在目标分支中提交
``` 
windows: 在项目根路径进入`Git Bash`后执行 - `sh deploy.sh`
macOs: 直接执行 - `sh deploy.sh`
```

需要在 GitHub 目标仓库中 settings > pages 中设置
![](https://gitee.com/M-cheng-web/map-storage/raw/master/code-img/20220121163921.png)

::: tip
当然你也可以部署到 Gitee 中等类似平台
:::

::: danger
注意: `docs > config.js` 中的base字段一定要设置为项目名
:::