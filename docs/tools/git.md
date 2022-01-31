# Git

## 需掌握点
+ 本地仓库链接远程已有仓库（一般这种情况下远程仓库是空的）
+ git commit 命令调优相关，例如合并他人代码时减少 commit 次数
+ 撤销刚刚拉下来的代码
+ tag 标签的应用
+ 临时 bug 分支的应用
+ 本地分支新建推送的应用
+ 正确的工作流
+ git commit 的管理工具

## commit 类别
+ feat：新功能（feature）
+ fix：修补bug
+ docs：文档（documentation）
+ style： 格式（不影响代码运行的变动）
+ refactor：重构（即不是新增功能，也不是修改bug的代码变动）
+ test：增加测试
+ chore：构建过程或辅助工具的变动

## 常用命令
### branch 分支
```
// 查看所有的分支，包括本地的和远程的
git branch -a

// 重命名当前分支为 dev (如果已存在dev分支会报错)
git branch -m dev

// 删除当前分支，前提是当前不在需要删除的那个分支
git branch -d dev
```

## 操作场景
### 连接远程仓库
> 目的是将本地的项目文件链接到远程的仓库，这里以`github`为例

本地文件操作
``` json
// 初始化
git init 

// 将此时所在的分支重命名为 main
// 这一步的目的是将本地的分支和远程分支设置相同名称(这里假设远程默认分支为main,如果是其他的这边也要相对应的更改)
// 相同分支才可以提交哦
git branch -m main

// 连接远程分支
git remote add origin git@github.com:M-cheng-web/git-demo.git
```

做完上面的操作后就可以正常提交代码到远程