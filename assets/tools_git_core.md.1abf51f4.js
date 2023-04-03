import{_ as s,c as a,o as n,N as l}from"./chunks/framework.78c68b71.js";const d=JSON.parse('{"title":"Git","description":"","frontmatter":{},"headers":[],"relativePath":"tools/git/core.md","lastUpdated":1675691846000}'),e={name:"tools/git/core.md"},p=l(`<h1 id="git" tabindex="-1">Git <a class="header-anchor" href="#git" aria-label="Permalink to &quot;Git&quot;">​</a></h1><h2 id="commit-类别" tabindex="-1">commit 类别 <a class="header-anchor" href="#commit-类别" aria-label="Permalink to &quot;commit 类别&quot;">​</a></h2><ul><li>feat：新功能（feature）</li><li>fix：修补bug</li><li>docs：文档（documentation）</li><li>style： 格式（不影响代码运行的变动）</li><li>refactor：重构（即不是新增功能，也不是修改bug的代码变动）</li><li>test：增加测试</li><li>chore：构建过程或辅助工具的变动</li></ul><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h2><h3 id="git-clone" tabindex="-1">git clone <a class="header-anchor" href="#git-clone" aria-label="Permalink to &quot;git clone&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git clone &lt;仓库URL&gt;                         // 拉取远程仓库全部分支(默认在本地的master分支)</span></span>
<span class="line"><span style="color:#A6ACCD;">git clone -b dev &lt;仓库URL&gt;                  // 拉取远程仓库全部分支,且本地在dev分支下</span></span>
<span class="line"><span style="color:#A6ACCD;">git clone -b dev --single--branch &lt;仓库URL&gt; // 获取指定分支的代码</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-pull" tabindex="-1">git pull <a class="header-anchor" href="#git-pull" aria-label="Permalink to &quot;git pull&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git pull            // 拉取默认分支(当前在哪个分支就拉取哪个)</span></span>
<span class="line"><span style="color:#A6ACCD;">git pull origin dev // 拉取指定分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-add" tabindex="-1">git add <a class="header-anchor" href="#git-add" aria-label="Permalink to &quot;git add&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git add App.vue             // 将App.vue页面添加到暂存区(如果同时存在两个App.vue,其中一个是会有别名的,这里只添加没有别名的那个)</span></span>
<span class="line"><span style="color:#A6ACCD;">git add App.vue api         // 会将 App.vue 以及 App.vue api 一起提交到暂存区</span></span>
<span class="line"><span style="color:#A6ACCD;">git add App.vue api assets  // 会将 App.vue 以及 App.vue api 以及 App.vue api assets 一起提交到暂存区</span></span>
<span class="line"><span style="color:#A6ACCD;">git add .                   // 将所有修改添加到暂存区</span></span>
<span class="line"><span style="color:#A6ACCD;">git add -A                  // 和 git add .一样的效果,有什么差别吗</span></span>
<span class="line"><span style="color:#A6ACCD;">git add -u                  // 提交被修改和被删除的文件,不包括新文件(-u == --update)</span></span>
<span class="line"><span style="color:#A6ACCD;">git add *Controller         // 将以Controller结尾的文件的所有修改添加到暂存区(注意名字相同文件会有别名,会被这个所捕获)</span></span>
<span class="line"><span style="color:#A6ACCD;">git add Hello*              // 将所有以Hello开头的文件的修改添加到暂存区(如果是两个App.vue文件被修改,那么第二个App.vue会有别名,就不会被这里所拿到)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-commit" tabindex="-1">git commit <a class="header-anchor" href="#git-commit" aria-label="Permalink to &quot;git commit&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git commit -m                            // 提交暂存区所有文件到本地仓库</span></span>
<span class="line"><span style="color:#A6ACCD;">git commit [file1] [file2] -m            // 提交暂存区指定文件到仓库</span></span>
<span class="line"><span style="color:#A6ACCD;">git commit -a -m                         // 直接将工作区的修改提交到仓库</span></span>
<span class="line"><span style="color:#A6ACCD;">git commit --amend                       // 修改提交信息</span></span>
<span class="line"><span style="color:#A6ACCD;">git commit --amend -m &#39;修改了最后一次提交&#39;  // 快捷修改最后一次提交(只能修改最后一次的)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-push" tabindex="-1">git push <a class="header-anchor" href="#git-push" aria-label="Permalink to &quot;git push&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git push origin main = git push origin main:main  // 这两个是相同的意思</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin dev:main                          // 如果当前在 dev 分支,但是想提交到 main 分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-log-blame" tabindex="-1">git log &amp; blame <a class="header-anchor" href="#git-log-blame" aria-label="Permalink to &quot;git log &amp; blame&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git log            // 查看提交历史(commit历史)</span></span>
<span class="line"><span style="color:#A6ACCD;">git log -p &lt;file&gt;  // 查看指定文件的提交历史(不推荐用,内容会很多)</span></span>
<span class="line"><span style="color:#A6ACCD;">git blame &lt;file&gt;   // 以列表方式查看指定文件的提交历史(只能查看单个)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-reset-回滚提交" tabindex="-1">git reset 回滚提交 <a class="header-anchor" href="#git-reset-回滚提交" aria-label="Permalink to &quot;git reset 回滚提交&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git reset                 // 暂存区所有文件回到工作区</span></span>
<span class="line"><span style="color:#A6ACCD;">git reset &lt;file&gt;          // 暂存区目标文件回到工作区</span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard HEAD^    // 撤销到最近一次提交,工作区中所有未提交文件清空</span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard &lt;commit&gt; // 撤销到某个特定版本,工作区中所有未提交文件清空</span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --soft &lt;commit&gt; // 撤销到某个特定版本,工作区保留(内容会放在暂存区)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard ORIG_HEAD</span></span>
<span class="line"><span style="color:#A6ACCD;">// 执行git pull和git merge,git reset操作时,git都会把执行操作前的HEAD放入ORIG_HEAD中,以防回滚操作</span></span>
<span class="line"><span style="color:#A6ACCD;">// 但是在pull 后再执行这个命令会把工作区的代码给重置,所以用 git reset --merge ORIG_HEAD</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">刚提交的commit想要回退到暂存区,用git reset --soft HEAD^</span></span>
<span class="line"><span style="color:#A6ACCD;">用reset误删后可以用git reflog查看全部的分支,然后再用 git reset --hard 1a0053e 回滚</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>hard(回滚后本地代码就是回退版本的代码) <ul><li>移动本地库HEAD指针</li><li>重置暂存区</li><li>重置工作区</li></ul></li><li>soft(内容会放在暂存区,不影响工作区) <ul><li>移动本地库HEAD指针</li></ul></li><li>mixed(默认参数,会将所有的改动放到工作区中,即使之前在暂存区中有改动也会一起放回工作区) <ul><li>移动本地库HEAD指针</li><li>重置暂存区</li></ul></li><li>keep(本地代码就是回退版本的代码,而暂存区是没有任何改变)(调试不通,暂不用) <ul><li>移动本地库HEAD指针</li><li>暂存区不变</li><li>重置工作区</li></ul></li></ul><h3 id="git-revert-撤销提交" tabindex="-1">git revert 撤销提交 <a class="header-anchor" href="#git-revert-撤销提交" aria-label="Permalink to &quot;git revert 撤销提交&quot;">​</a></h3><p>建议加 -n 配置项,不让其自动提交(然后选择q来退出界面)</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git revert &lt;commit&gt;        // 撤销某次历史提交(如果是比较久远的提交一般会产生冲突,届时就是与目标提交对比差异了)</span></span>
<span class="line"><span style="color:#A6ACCD;">git revert &lt;HashA&gt; &lt;HashB&gt; // 撤销多个历史提交</span></span>
<span class="line"><span style="color:#A6ACCD;">git revert A..B            // 撤销一连串历史提交(不包括A)</span></span>
<span class="line"><span style="color:#A6ACCD;">git revert A^..B           // 撤销一连串历史提交(包括A)</span></span>
<span class="line"><span style="color:#A6ACCD;">git revert --abort         // 取消撤销操作,撤回到合并之前到工作环境 </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-cherry-pick-合并提交" tabindex="-1">git cherry-pick 合并提交 <a class="header-anchor" href="#git-cherry-pick-合并提交" aria-label="Permalink to &quot;git cherry-pick 合并提交&quot;">​</a></h3><p>建议加 -n 配置项,不让其自动提交(然后选择q来退出界面)</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git cherry-pick &lt;commit&gt;        // 合并某次历史提交</span></span>
<span class="line"><span style="color:#A6ACCD;">git cherry-pick &lt;HashA&gt; &lt;HashB&gt; // 合并多个历史提交</span></span>
<span class="line"><span style="color:#A6ACCD;">git cherry-pick A..B            // 合并一连串历史提交(不包括A)</span></span>
<span class="line"><span style="color:#A6ACCD;">git cherry-pick A^..B           // 合并一连串历史提交(包括A)</span></span>
<span class="line"><span style="color:#A6ACCD;">git cherry-pick --abort         // 取消合并,撤回到合并之前到工作环境 </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-remote-远端" tabindex="-1">git remote 远端 <a class="header-anchor" href="#git-remote-远端" aria-label="Permalink to &quot;git remote 远端&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git remote update origin -p                                    // 更新远程分支</span></span>
<span class="line"><span style="color:#A6ACCD;">git remote add origin git@github.com:M-cheng-web/git-demo.git  // 连接远程分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-stash-临时储藏" tabindex="-1">git stash 临时储藏 <a class="header-anchor" href="#git-stash-临时储藏" aria-label="Permalink to &quot;git stash 临时储藏&quot;">​</a></h3><p>比如说我们在处理一个bug过程中又来了一个紧急需求,把bug处理过程中 的文件更改储藏起来(工作区和暂存区会变干净),然后开始新需求的编写</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git stash -m &#39;存储代码&#39;  // 储藏暂存区和工作区的代码</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash pop          // 提取最近一次储藏的,会删除被提取的版本(当有冲突时不会删除被提取的版本)</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash pop n        // 提取目标储藏的版本,n代表序列号,会删除被提取的版本</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash apply        // 提取最近一次储藏的版本,但不会删除</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash apply n      // 提取目标储藏的版本,n代表序列号,例如 0 1 2 3</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash list         // 查看储藏的版本</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash drop         // 删除最近一个储藏的版本</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash drop n       // 删除目标储藏的版本,n代表序列号,例如 0 1 2 3</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash clear        // 删除所有储藏的版本</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-checkout-创建-切换分支" tabindex="-1">git checkout 创建/切换分支 <a class="header-anchor" href="#git-checkout-创建-切换分支" aria-label="Permalink to &quot;git checkout 创建/切换分支&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git checkout &lt;file&gt;     // 切换到指定分支或标签</span></span>
<span class="line"><span style="color:#A6ACCD;">git checkout -b &lt;file&gt;  // 创建并切换到指定分支或标签</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-branch-分支" tabindex="-1">git branch 分支 <a class="header-anchor" href="#git-branch-分支" aria-label="Permalink to &quot;git branch 分支&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git branch -a      // 查看所有的分支，包括本地的和远程的(不加 -a 代表只查询本地的)</span></span>
<span class="line"><span style="color:#A6ACCD;">git branch -m dev  // 重命名当前分支为 dev (如果已存在dev分支会报错)</span></span>
<span class="line"><span style="color:#A6ACCD;">git branch -d dev  // 删除 dev 分支，如果目标分支有内容未合并则需要用 -D 强行删除</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-tag-打标签" tabindex="-1">git tag 打标签 <a class="header-anchor" href="#git-tag-打标签" aria-label="Permalink to &quot;git tag 打标签&quot;">​</a></h3><p>在<code>git checkout v0.0.3</code>后如果想要基于此tag进行一些功能扩展,应该执行<code>git checkout -b newBranch</code>来创建一个新分支然后基于此分支开发,因为在tag上进行的commit会被丢弃</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git tag                              // 列出所有本地标签</span></span>
<span class="line"><span style="color:#A6ACCD;">git tag -l &#39;v0.0.*&#39;                  // 列出筛选后的标签</span></span>
<span class="line"><span style="color:#A6ACCD;">git show v0.0.1                      // 查看目标tag的信息</span></span>
<span class="line"><span style="color:#A6ACCD;">git tag v0.0.1                       // 创建标签(基于最新提交创建标签)</span></span>
<span class="line"><span style="color:#A6ACCD;">git tag -a &#39;v0.0.1&#39; -m &#39;备注说明&#39;     // -a指定标签名称,-m附加备注信息</span></span>
<span class="line"><span style="color:#A6ACCD;">git tag -a v0.0.3 07289a6 -m &#39;tag-3&#39; // 为指定的 commithash 创建tag</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin v0.0.3               // 将目标tag推送到远端</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin --tags               // 将所有tag推送到远端</span></span>
<span class="line"><span style="color:#A6ACCD;">git checkout v0.0.3                  // 切换到目标tag</span></span>
<span class="line"><span style="color:#A6ACCD;">git checkout -                       // 切换到目标tag后想切回来用这个命令</span></span>
<span class="line"><span style="color:#A6ACCD;">git tag -d v0.0.1                    // 删除标签</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin :refs/tags/v0.0.1    // 删除远程标签(只能这样删)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-merge-合并分支" tabindex="-1">git merge 合并分支 <a class="header-anchor" href="#git-merge-合并分支" aria-label="Permalink to &quot;git merge 合并分支&quot;">​</a></h3><p>建议加 -n 配置项,不让其自动提交(然后选择q来退出界面)</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git merge &lt;branch&gt;        // 合并指定分支到当前分支</span></span>
<span class="line"><span style="color:#A6ACCD;">git merge --abort         // 取消当前合并,重建合并前状态</span></span>
<span class="line"><span style="color:#A6ACCD;">git merge dev -n -Xtheirs // 以合并dev分支到当前分支,有冲突则以dev分支为准</span></span>
<span class="line"><span style="color:#A6ACCD;">git rebase # 衍合指定分支到当前分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>强制覆盖分支,再强制提交分支</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git checkout b    //切换到需要被覆盖的分支</span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard a//把分支覆盖到b分支</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin b --force</span></span>
<span class="line"><span style="color:#A6ACCD;">\`\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">## 操作场景</span></span>
<span class="line"><span style="color:#A6ACCD;">### 连接远程仓库</span></span>
<span class="line"><span style="color:#A6ACCD;">目的是将本地的项目文件链接到远程的仓库，这里以\`github\`为例</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">本地文件操作</span></span>
<span class="line"><span style="color:#A6ACCD;">\`\`\`</span></span>
<span class="line"><span style="color:#A6ACCD;">git init  // 初始化</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 将此时所在的分支重命名为 main</span></span>
<span class="line"><span style="color:#A6ACCD;">// 这一步的目的是将本地的分支和远程分支设置相同名称(这里假设远程默认分支为main,如果是其他的这边也要相对应的更改)</span></span>
<span class="line"><span style="color:#A6ACCD;">git branch -m main</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git remote add origin git@github.com:M-cheng-web/git-demo.git  // 连接远程分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">git remote update origin -p // 更新远程分支</span></span>
<span class="line"><span style="color:#A6ACCD;">\`\`\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">做完上面的操作后就可以正常提交代码到远程</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### 创建分支推送远程</span></span>
<span class="line"><span style="color:#A6ACCD;">两种方式</span></span>
<span class="line"><span style="color:#A6ACCD;">+ 本地创建后推送到远程</span></span>
<span class="line"><span style="color:#A6ACCD;">  1. git checkout -b dev</span></span>
<span class="line"><span style="color:#A6ACCD;">  2. git push origin dev</span></span>
<span class="line"><span style="color:#A6ACCD;">+ 远程创建后本地更新下来</span></span>
<span class="line"><span style="color:#A6ACCD;">  1. 远程手动创建分支(或者已由他人推送新分支)</span></span>
<span class="line"><span style="color:#A6ACCD;">  2. 本地更新远程分支信息: git remote update origin -p</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">### 合并历史 commit</span></span>
<span class="line"><span style="color:#A6ACCD;">场景详情:</span></span>
<span class="line"><span style="color:#A6ACCD;">我在本地历史 commit 中有一块功能,然而我目前工作区中把这个功能删掉了,我该怎么做才能把这块功能快速补回来</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">解决:</span></span>
<span class="line"><span style="color:#A6ACCD;">\`\`\`</span></span>
<span class="line"><span style="color:#A6ACCD;">// 可以让目标 commit 历史和当前工作区合并(前提是当前工作区是干净的)</span></span>
<span class="line"><span style="color:#A6ACCD;">git cherry-pick &lt;commit hash&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">\`\`\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">注意: 如果只想要获取历史某次提交的某几个文件,参照此文章的解决方案</span></span>
<span class="line"><span style="color:#A6ACCD;">[https://www.itranslater.com/qa/details/2103374620475786240](https://www.itranslater.com/qa/details/2103374620475786240)</span></span></code></pre></div>`,42),t=[p];function i(o,c,r,A,C,g){return n(),a("div",null,t)}const y=s(e,[["render",i]]);export{d as __pageData,y as default};
