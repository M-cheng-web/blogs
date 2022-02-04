# Git

## commit 类别
+ feat：新功能（feature）
+ fix：修补bug
+ docs：文档（documentation）
+ style： 格式（不影响代码运行的变动）
+ refactor：重构（即不是新增功能，也不是修改bug的代码变动）
+ test：增加测试
+ chore：构建过程或辅助工具的变动

## 常用命令
### git clone
```
git clone <仓库URL>                         // 拉取远程仓库全部分支(默认在本地的master分支)
git clone -b dev <仓库URL>                  // 拉取远程仓库全部分支,且本地在dev分支下
git clone -b dev --single--branch <仓库URL> // 获取指定分支的代码
```

### git pull
```
git pull            // 拉取默认分支(当前在哪个分支就拉取哪个)
git pull origin dev // 拉取指定分支
```

### git add
```
git add App.vue             // 将App.vue页面添加到暂存区(如果同时存在两个App.vue,其中一个是会有别名的,这里只添加没有别名的那个)
git add App.vue api         // 会将 App.vue 以及 App.vue api 一起提交到暂存区
git add App.vue api assets  // 会将 App.vue 以及 App.vue api 以及 App.vue api assets 一起提交到暂存区
git add .                   // 将所有修改添加到暂存区
git add -A                  // 和 git add .一样的效果,有什么差别吗
git add -u                  // 提交被修改和被删除的文件,不包括新文件(-u == --update)
git add *Controller         // 将以Controller结尾的文件的所有修改添加到暂存区(注意名字相同文件会有别名,会被这个所捕获)
git add Hello*              // 将所有以Hello开头的文件的修改添加到暂存区(如果是两个App.vue文件被修改,那么第二个App.vue会有别名,就不会被这里所拿到)
```

### git commit
```
git commit -m                            // 提交暂存区所有文件到本地仓库
git commit [file1] [file2] -m            // 提交暂存区指定文件到仓库
git commit -a -m                         // 直接将工作区的修改提交到仓库
git commit --amend                       // 修改提交信息
git commit --amend -m '修改了最后一次提交'  // 快捷修改最后一次提交(只能修改最后一次的)
```

### git push
```
git push origin main = git push origin main:main  // 这两个是相同的意思
git push origin dev:main                          // 如果当前在 dev 分支,但是想提交到 main 分支
```

### git log & blame
```
git log            // 查看提交历史(commit历史)
git log -p <file>  // 查看指定文件的提交历史(不推荐用,内容会很多)
git blame <file>   // 以列表方式查看指定文件的提交历史(只能查看单个)
```

### git reset 回滚提交
```
git reset                 // 暂存区所有文件回到工作区
git reset <file>          // 暂存区目标文件回到工作区
git reset --hard HEAD^    // 撤销到最近一次提交,工作区中所有未提交文件清空
git reset --hard <commit> // 撤销到某个特定版本,工作区中所有未提交文件清空
git reset --soft <commit> // 撤销到某个特定版本,工作区保留(内容会放在暂存区)

git reset --hard ORIG_HEAD
// 执行git pull和git merge,git reset操作时,git都会把执行操作前的HEAD放入ORIG_HEAD中,以防回滚操作
// 但是在pull 后再执行这个命令会把工作区的代码给重置,所以用 git reset --merge ORIG_HEAD

刚提交的commit想要回退到暂存区,用git reset --soft HEAD^
用reset误删后可以用git reflog查看全部的分支,然后再用 git reset --hard 1a0053e 回滚
```

+ hard(回滚后本地代码就是回退版本的代码)
  - 移动本地库HEAD指针
  - 重置暂存区
  - 重置工作区
+ soft(内容会放在暂存区,不影响工作区)
  - 移动本地库HEAD指针
+ mixed(默认参数,会将所有的改动放到工作区中,即使之前在暂存区中有改动也会一起放回工作区)
  - 移动本地库HEAD指针
  - 重置暂存区
+ keep(本地代码就是回退版本的代码,而暂存区是没有任何改变)(调试不通,暂不用)
  - 移动本地库HEAD指针
  - 暂存区不变
  - 重置工作区

### git revert 撤销提交
建议加 -n 配置项,不让其自动提交(然后选择q来退出界面)
```
git revert <commit>        // 撤销某次历史提交(如果是比较久远的提交一般会产生冲突,届时就是与目标提交对比差异了)
git revert <HashA> <HashB> // 撤销多个历史提交
git revert A..B            // 撤销一连串历史提交(不包括A)
git revert A^..B           // 撤销一连串历史提交(包括A)
git revert --abort         // 取消撤销操作,撤回到合并之前到工作环境 
```

### git cherry-pick 合并提交
建议加 -n 配置项,不让其自动提交(然后选择q来退出界面)
```
git cherry-pick <commit>        // 合并某次历史提交
git cherry-pick <HashA> <HashB> // 合并多个历史提交
git cherry-pick A..B            // 合并一连串历史提交(不包括A)
git cherry-pick A^..B           // 合并一连串历史提交(包括A)
git cherry-pick --abort         // 取消合并,撤回到合并之前到工作环境 
```

### git remote 远端
```
git remote update origin -p                                    // 更新远程分支
git remote add origin git@github.com:M-cheng-web/git-demo.git  // 连接远程分支
```

### git stash 临时储藏
比如说我们在处理一个bug过程中又来了一个紧急需求,把bug处理过程中 的文件更改储藏起来(工作区和暂存区会变干净),然后开始新需求的编写
```
git stash -m '存储代码'  // 储藏暂存区和工作区的代码
git stash pop          // 提取最近一次储藏的,会删除被提取的版本(当有冲突时不会删除被提取的版本)
git stash pop n        // 提取目标储藏的版本,n代表序列号,会删除被提取的版本
git stash apply        // 提取最近一次储藏的版本,但不会删除
git stash apply n      // 提取目标储藏的版本,n代表序列号,例如 0 1 2 3
git stash list         // 查看储藏的版本
git stash drop         // 删除最近一个储藏的版本
git stash drop n       // 删除目标储藏的版本,n代表序列号,例如 0 1 2 3
git stash clear        // 删除所有储藏的版本
```

### git checkout 创建/切换分支
```
git checkout <file>     // 切换到指定分支或标签
git checkout -b <file>  // 创建并切换到指定分支或标签
```

### git branch 分支
```
git branch -a      // 查看所有的分支，包括本地的和远程的(不加 -a 代表只查询本地的)
git branch -m dev  // 重命名当前分支为 dev (如果已存在dev分支会报错)
git branch -d dev  // 删除 dev 分支，如果目标分支有内容未合并则需要用 -D 强行删除
```

### git tag 打标签
在`git checkout v0.0.3`后如果想要基于此tag进行一些功能扩展,应该执行`git checkout -b newBranch`来创建一个新分支然后基于此分支开发,因为在tag上进行的commit会被丢弃
```
git tag                              // 列出所有本地标签
git tag -l 'v0.0.*'                  // 列出筛选后的标签
git show v0.0.1                      // 查看目标tag的信息
git tag v0.0.1                       // 创建标签(基于最新提交创建标签)
git tag -a 'v0.0.1' -m '备注说明'     // -a指定标签名称,-m附加备注信息
git tag -a v0.0.3 07289a6 -m 'tag-3' // 为指定的 commithash 创建tag
git push origin v0.0.3               // 将目标tag推送到远端
git push origin --tags               // 将所有tag推送到远端
git checkout v0.0.3                  // 切换到目标tag
git checkout -                       // 切换到目标tag后想切回来用这个命令
git tag -d v0.0.1                    // 删除标签
git push origin :refs/tags/v0.0.1    // 删除远程标签(只能这样删)
```

### git merge 合并分支
建议加 -n 配置项,不让其自动提交(然后选择q来退出界面)
```
git merge <branch>        // 合并指定分支到当前分支
git merge --abort         // 取消当前合并,重建合并前状态
git merge dev -n -Xtheirs // 以合并dev分支到当前分支,有冲突则以dev分支为准
git rebase # 衍合指定分支到当前分支
```

## 操作场景
### 连接远程仓库
目的是将本地的项目文件链接到远程的仓库，这里以`github`为例

本地文件操作
```
git init  // 初始化

// 将此时所在的分支重命名为 main
// 这一步的目的是将本地的分支和远程分支设置相同名称(这里假设远程默认分支为main,如果是其他的这边也要相对应的更改)
git branch -m main

git remote add origin git@github.com:M-cheng-web/git-demo.git  // 连接远程分支
```

做完上面的操作后就可以正常提交代码到远程

### 创建分支推送远程
两种方式
+ 本地创建后推送到远程
  1. git checkout -b dev
  2. git push origin dev
+ 远程创建后本地更新下来
  1. 远程手动创建分支(或者已由他人推送新分支)
  2. 本地更新远程分支信息: git remote update origin -p

### 合并历史 commit
场景详情:
我在本地历史 commit 中有一块功能,然而我目前工作区中把这个功能删掉了,我该怎么做才能把这块功能快速补回来

解决:
```
// 可以让目标 commit 历史和当前工作区合并(前提是当前工作区是干净的)
git cherry-pick <commit hash>
```