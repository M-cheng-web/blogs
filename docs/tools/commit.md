# 标准化 git 的 Commit Message + CHANGELOG 生成

> tips: 强烈建议按照文档流程走完<br>
> commitizen (必装)<br>
> commitlint 与 husky 配套安装 (可选)<br>
> 自定义提交样式 (推荐,可以美化本地命令行)<br>
> 自动生成changelog (必装),且最好参照文档底部的推荐工作流提交代码<br>

## 需求
历史提交场景:
+ git add .
+ git commit -m 'ababab'
+ git push
+ 这样当我们想查找某次修改的时候会很困难

---

使用`commitizen`,在`git commit`时规范提交信息
+ git add .
+ git cz
+ git push
+ 按照规范提交信息能帮助我们查看历史提交记录

## commitizen
### 安装
```
npm i -D commitizen cz-conventional-changelog
npm i -g commitizen cz-conventional-changelog
```
```
### package.json

"config":{
  "commitizen":{
    "path":"node_modules/cz-conventional-changelog"
  }
}
```
#### 全局安装
在全局根目录下建立.czrc文件
```
### .czrc

{"path":"cz-conventional-changelog"}
```
#### 项目安装
只需要在项目package.json 中
```
### package.json

"scripts":{
  "commit":"git-cz"
}
```
### 使用
执行git add后执行git cz进入interactive模式<br>
会依次出现下面几种选项:
1. Select the type of change that you're committing 选择改动类型(type)(必填)
2. What is the scope of this change (e.g. component or file name)? 填写改动范围(scope)
3. Write a short, imperative tense description of the change: 写一个精简的描述(subject)(必填)
4. Provide a longer description of the change: (press enter to skip) 对于改动写一段长描述(body)
5. Are there any breaking changes? (y/n) 是破坏性修改吗？默认n(footer)
6. Does this change affect any openreve issues? (y/n) 改动修复了哪个问题？默认n(footer)

#### 详细规则
**1. type**
```
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动,例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动,例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改,例如构建过程或辅助工具的变动
```
**2. scope**<br>
用于描述改动的范围，格式为项目名/模块名，例如：node-pc/common rrd-h5/activity，而we-sdk不需指定模块名。如果一次commit修改多个模块，建议拆分成多次commit，以便更好追踪和维护

**3. subject**<br>
精简描述

**4. body**<br>
填写详细描述，主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等必须添加body来作说明

**5. break changes**<br>
指明是否产生了破坏性修改，涉及break changes的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等

**6. affect issues**<br>
指明是否影响了某个问题。例如我们使用jira时，我们在commit message中可以填写其影响的JIRA_ID

#### 提示
+ ctrl + c 中途取消提交
+ 也可以绕过这个规范,直接git commit


## commitlint 校验
一般情况下默认的规则足够了,但可以自定义规则,一般和husky配合使用

### 安装
在项目根目录创建commitlint.config.js 或者 .commitlintrc.js
``` 
npm i -D @commitlint/config-conventional @commitlint/cli
```

**rule配置说明**<br>
rule由name和配置数组组成，如：'name':[0, 'always', 72]<br>
第一位为level，可选0,1,2  0:disable 1:warning 2:error<br>
第二位为应用与否，可选 always | never<br>
第三位该rule的值
```
### .commitlintrc.js

module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    // Header 
    'header-max-length': [2, 'always', 200],
    // <type>枚举
    'type-enum': [2, 'always', [
      'init',
      'feat',
      'fix',
      'ui',
      'refactor',
      'replace',
      'deploy',
      'docs',
      'test',
      'chore',
      'style',
      'revert',
      'add',
      'minus',
      'del'
    ]],
    'type-empty': [2, 'never'], // <type> 不能为空
    'type-case': [2, 'always', 'lower-case'], // <type> 格式 小写 
    'scope-empty': [2, 'never'], // <scope> 不能为空
    'scope-case': [2, 'always', 'lower-case'], // <scope> 格式 小写
    'subject-empty': [2, 'never'], // <subject> 不能为空
    'subject-full-stop': [2, 'never', '.'], // <subject> 以.为结束标志
    // <subject> 格式
    // 可选值
    // 'lower-case' 小写 lowercase
    // 'upper-case' 大写 UPPERCASE
    // 'camel-case' 小驼峰 camelCase
    // 'kebab-case' 短横线 kebab-case
    // 'pascal-case' 大驼峰 PascalCase
    // 'sentence-case' 首字母大写 Sentence case
    // 'snake-case' 下划线 snake_case
    // 'start-case' 所有首字母大写 start-case
    'subject-case': [2, 'never', []],
    'body-leading-blank': [1, 'always'], // <body> 以空行开头
    'footer-leading-blank': [1, 'always'] // <footer> 以空行开头
  }
}
```

## husky
与commitlint配合,会在用户提交时根据规则校验,不符合规则会报错
### 安装
```
npm install -D husky@4.3.8
```
``` json
### packgae.json

"husky": {
  "hooks": {
    "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
  }
}
```
### 使用
例子:
```
git commit -m 'cccc' // 报错

git commit -m 'fix: asdasd' // 正确
```
### 提示
husky已经有最新V6版本,但是配置跨度比较大且应用需要有shell基础,作者尝试失败<br>
如果有新版本尝试成功的期待补充

## 自定义提交样式 / 规范
如果不适应git cz后的样式/英文,我们可以汉化并且自定义提交样式<br>
配置后直接执行git cz可以看到效果
### 安装
在项目根目录创建.cz-config.js
```
npm i -D  cz-customizable
```
``` json
### package.json(这样更改并不会影响commitizen的相关配置)

"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```
``` js
// .cz-config.js

'use strict';
module.exports = {
  // 项目中使用的 type 和默认描述
  types: [
    {      value: 'init',      name: 'init:     初始提交'    },
    {      value: 'feat',      name: 'feat:     增加新功能'    },
    {      value: 'fix',      name: 'fix:      修复bug'    },
    {      value: 'ui',      name: 'ui:       更新UI'    },
    {      value: 'refactor',      name: 'refactor: 代码重构'    },
    {      value: 'release',      name: 'release:  发布'    },
    {      value: 'deploy',      name: 'deploy:   部署'    },
    {      value: 'docs',      name: 'docs:     修改文档'    },
    {      value: 'test',      name: 'test:     增删测试'    },
    {      value: 'chore',      name: 'chore:    更改配置文件'    },
    {      value: 'style',      name: 'style:    样式修改不影响逻辑'    },
    {      value: 'revert',      name: 'revert:   版本回退'    },
    {      value: 'add',      name: 'add:      添加依赖'    },
    {      value: 'minus',      name: 'minus:    版本回退'    },
    {      value: 'del',      name: 'del:      删除代码/文件'    }
  ],
  // 预设项目中使用的可选 scope 
  scopes: [
    { name: '模块1' },
    { name: '模块2' },
    { name: '模块3' },
    { name: '模块4' }
  ],
  // 当想重写特定提交类型的作用域时，使用此方法 如：在类型为“fix”时指定范围
  // scopeOverrides: {
  //   fix: [
  //     { name: 'merge' },
  //     { name: 'style' },
  //     { name: 'e2eTest' },
  //     { name: 'unitTest' }
  //   ]
  // },
  messages: {
    type: '选择更改类型:\n',
    scope: '更改范围 (可选):\n',
    customScope: 'Denote the SCOPE of this change:',
    subject: '简短描述:\n',
    body: '详细描述,使用"|"换行(可选)：\n',
    breaking: '非兼容性说明(可选):\n',
    footer: '关联关闭的issue,例如：#31, #34(可选):\n',
    confirmCommit: '确定提交?'
  },
  allowCustomScopes: true, // 增加自定义 scope 选项
  // allowBreakingChanges: ['特性', '修复'], // 配置想要 breaking change 弹出提示的scope列表
  subjectLimit: 100 // 限制主题长度
};
```

网文汉化版,但是不能正常使用,会一直被commitlint检测报错subject为空,作者尝试失败<br>
有兴趣的可以试试
``` js
// .cz-config.js

'use strict';
module.exports = {
  // 项目中使用的 type 和默认描述
  types: [
    { value: '✨特性', name: '特性:    一个新的特性' },
    { value: '🐛修复', name: '修复:    修复一个Bug' },
    { value: '📝文档', name: '文档:    变更的只有文档' },
    { value: '💄格式', name: '格式:    空格, 分号等格式修复' },
    { value: '♻️重构', name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: '⚡️性能', name: '性能:    提升性能' },
    { value: '✅测试', name: '测试:    添加一个测试' },
    { value: '🔧工具', name: '工具:    开发工具变动(构建、脚手架工具等)' },
    { value: '⏪回滚', name: '回滚:    代码回退' }
  ],
  // 预设项目中使用的可选 scope 
  scopes: [
    { name: '模块1' },
    { name: '模块2' },
    { name: '模块3' },
    { name: '模块4' }
  ],
  // 当想重写特定提交类型的作用域时，使用此方法 如：在类型为“fix”时指定范围
  // scopeOverrides: {
  //   fix: [
  //     { name: 'merge' },
  //     { name: 'style' },
  //     { name: 'e2eTest' },
  //     { name: 'unitTest' }
  //   ]
  // },
  messages: {
    type: '选择更改类型:\n',
    scope: '更改范围 (可选):\n',
    customScope: 'Denote the SCOPE of this change:',
    subject: '简短描述:\n',
    body: '详细描述,使用"|"换行(可选)：\n',
    breaking: '非兼容性说明(可选):\n',
    footer: '关联关闭的issue,例如：#31, #34(可选):\n',
    confirmCommit: '确定提交?'
  },
  allowCustomScopes: true, // 增加自定义 scope 选项
  // allowBreakingChanges: ['特性', '修复'], // 配置想要 breaking change 弹出提示的scope列表
  subjectLimit: 100 // 限制主题长度
};
```

## 自动生成change log
### 安装
```
npm install -g conventional-changelog-cli
```
``` json
### package.json

{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s" 
  } 
}
```
### 使用
运行`npm run changelog`就行<br>
这个时候会在项目根目录出现一个CHANGELOG.md文档(PS:如果你的提交不规范,那么在最开始使用的时候这个文档可能什么都没有)

### 作者疑问
**CHANGELOG.md内永远不会有本次push记录,这个怎么解决**

## 推荐的工作流
1. 改动代码
2. 提交这些改动
3. 改变package.json中的版本号
4. 使用conventional-changelog工具
5. 提交 package.json和CHANGELOG.md文件
6. 创建tag
7. push代码

**version 运用**
```
npm version prerelease -m "这里你可以添加此次更新版本号的描述"
```
执行完之后，package.json的版本号则会变成1.1.1-0，同时，在git中会多一个commit log<br>
**更改版本号会自动commit,而这个commit会被husky拦截,所以要找解决方案(可以在被拦截报错后手动提交)**
注意的是，执行npm version必须保证工作目录是干净的，没有任何未提交的文档，否则会报错