# 待分配

## 埋点插件

node 执行 node aaa.js 时  aaa.js文件不能有 require (node版本为 16.13.0)
解决:
	1, 降版本
	2, 改用 import, 并且在 package.json加上 "type": "module",



cannot be republished until 24 hours have passed.  在node中删除了名称为AAA的包,再次发布此包名称必须要过24小时


--parallel 完全忽略并发和拓扑排序, 立即运行给定的命令或脚本
--stream 控制台输出信息, 主要是可以前缀为原始包名称, 在执行多个包的相同命令时加上这个能方便出哪个包的输出
--sort 拓扑排序执行
--conventional-commits 意思是使用"常规提交规范"来确定版本提升 (lerna version 使用)
--no-git-tag-version 不更改package.json 中的版本号信息以及不会提交

新建的包,首次发布没问题 lerna publish from-package


想要再次发布必须要执行 update-version 更改版本号, 运行这个命令的前提是对包有更改, 有 commit, 在更改版本号的时候是自动取下个
版本的, 比如 0.0.0 => 0.0.1     0.0.0-beta.0  => 0.0.0-beta.1  

update-version-p 这个命令来更改版本号能有更多选择,且可以自己自定义版本号, 推荐这个
选择 custom prerelease 能发布预览版
如果想自定义版本 选择 custom Version 





更改了版本号后, 再执行 publish-to-npm , 这个命令是不会再自动更改版本号, 会根据package.json 中的版本号来发布

发布成功前提: 工作区是与提交的 且 工作区没有需要提交的, 版本号符合规则



publish-beta: 提交测试包, 此命令并不会更新目标包的版本,是无痕的,只会在远程npm更新tag 为 beta的包
注意, 此命令会把当前工作区清空,回退, 请使用前提交好代码(commit)

vue 包的依赖 需要加在 dependencies 中 (外部引用的情况)



inquirer 在Mac m1系统有点问题，暂时不清楚什么原因导致的，后续提issues，现在发布流程：先运行命令更换版本号，然后再执行npm publish

同时发布多个版本，要是里面有同时依赖的怎么办？ 手动改吗？

Nom link 了解一下

## mk输出目录树

mddir

https://www.cnblogs.com/xulinjun/p/13932609.html


## npm install 后缀
+ 默认: 会安装在 dependencies 对象下,也就是打包会带上
+ --save-prod ( -P ) 安装在 dependencies 对象下
+ --save-dev ( -D ) 安装在 devDependencies 对象下, 打包时不会带上
+ --save-optional ( -O ) 安装在 optionalDependencies 对象下, 暂时不清楚啥作用
+ --no-save 防止保存到 dependencies 对象下, 暂时不清楚啥作用
+ -g 全局安装, 不会安装具体哪个项目下, 打包时也不会带上

## npm script 
如果太长可以写个文件来执行,然后 `node aaa.js`, 在这个文件里去加载你想做的

## git 提交规范

## 导出可以这样用
导出
``` js
const name = 'cccc'
const obj = {
  install: () => {
    console.log(123);
  }
}

export {
  obj as default, // 重点!!!! 这样等同于下面的default
  name
}

// export default obj
```

导入
``` js
import { name } from './aaa'

import xxx from './aaa'
```