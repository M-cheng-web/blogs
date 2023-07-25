# 我的一纸人生
哥们来干了这杯，再来伍佰杯

## 突发奇想
+ [pc端右键](https://github.com/buuing/right-menu)
+ 比如说项目内有一些文件需要加密还是怎么滴,就是不想放在github上被别人看到,该做个什么插件来搞呢 (AES对称加密,看看自己写还是搞个插件)
+ 上面说的加密,可以运用在埋点插件内
+ 把加密的脚本做成vscode插件,或者谷歌插件
+ qq音乐: 在播放音乐时,有个3d的跳动,会跟着音乐的旋律跳动
+ github readme 改造 https://juejin.cn/post/7022299474458312718
+ 自动把后端提供的api文档转为 ts，用node可以做吗，探索下
+ 面试最应该问的几个问题：https://www.ruanyifeng.com/blog/2012/08/questions_you_need_to_ask_in_an_interview.html
+ 暗水印 https://blog.csdn.net/petertanjinjie/article/details/123887802?spm=1001.2014.3001.5502
+ Jenkins+Node+Vue 实战前端自动化部署平台 https://juejin.cn/post/7145027529789669384
+ ui自动生成 https://juejin.cn/post/7215772473166217272
+ 等尘埃落定，该好好复习下基础啦 https://github.com/USTC-Resource/USTC-Course （中国科学技术大学课程）(数据结构可以重头复习下)
+ 优化一下Jenkins打包，不想每次改了一点点代码就从头打包
+ github CI 自动打包文章 https://juejin.cn/post/7218482973979443261
+ 视频流学习一下，怎么让前端大批量视频快速加载这种，应用在公司
+ threejs: 【1. https://www.bilibili.com/video/BV1aS4y127gz/?vd_source=e1ed7629938790b50c9b57ae6672f6e2  2.https://www.youtube.com/@akella_】
+ 上传图片自动切割工具
+ 想做个自动上传当月图片或者一些备用文件的工具，就类似于系统的自动备份，我想备份到github
+ https://github.com/mayswind/AriaNg Aria下载工具可以了解一下
+ 算法+数据结构 https://github.com/labuladong/fucking-algorithm
+ 后面做个栏目收集一些图片什么的把 例如 https://start.gtimg.com/web/www/static/resource/engine-bg.d9c83f08.mp4
+ https://github.com/pomber/stargazer 用这个库生成star视频
+ https://www.bilibili.com/read/cv21266100 前端友好的Docker和Kubernetes教程，通过Node.js应用来循序渐进的学习Dockerfile、Docker Compose、Kubernetes知识
+ https://github.com/XingangPan/DragGAN 这个图像处理库，无敌了！ai改图，例如改变图片内人物的表情
+ [视频处理](https://github.com/wangrongding/tiny-player)
+ [nest练习，后续看看这个学习一波](https://github.com/kuangshp/nestjs-mysql-api/tree/nest9)
+ https://gradio.app/ ai作图蛮不错
+ https://github.com/palxiao/poster-design 类似于稿定设计这样的，后面可以考虑加入开发

### 上传图片自动切割工具
现在我公司的官网有h5和pc两套，分别都有各自的老年版，现在的问题是后台配置图片的时候，很多地方的图片可能要配四张同样的图片不同的尺寸，这种我前端能怎么解决呢，能自动的话最好，或者说可以自己搭建个平台自动生产这些图片 (简单来说，如果我们技术不提供任何便捷的话，运营得切图，把一张图切成四种大小分辨率，然后再分别上传到图片管理里面)

现在我是想直接生产四种固定的大小，自动切图上传，切图涉及到中心点，比如中心在右上角，我怎么自动切，应该先ai判断+自动批量切，然后人工复查这种

### 待学习库
很多有意思的库只知道一些可能性的概念，我想专门出一个系列来记录他们，去研究他们的原理

+ 超大图片的秒开技术探索 - 自己去找找有没有类似库
+ 刻度线 https://github.com/gorkys/vue-ruler-tool
+ 流行框架与库的源码分析与最简实现 https://github.com/shfshanyue/mini-code
+ vue 延迟挂载 https://github.com/antfu/v-lazy-show



## 2022回顾 - 人生小低谷
+ 持续记录博客
+ 重构博客
  - 原先目录形式交互不友好，换了种表现方式
  - 技术栈vuepress -> vitepress，更快更简洁！
  - 内部用脚本来分类以及排序，不需要手动操作，更方便
+ morehook项目的创建以及内容填充，以后一下公共的utils，hook，组件都往这里面放
+ 经历了两次裁员，阿西吧

## 2023年度计划 - 奋起直追
1. 英语
2. ts重点复习总结 ✅
3. 埋点系统 - 前端、后端重构 (参考各大平台的源码，期间要把nestjs、typeorm、docker学好)
4. 自己写个cli，nestjs搭配远程更新
5. 服务器用起来，把现有的项目都挂上面去
6. vue3 vue2 系统复习 (往源码层面系统复习、要求有产出、例如笔记可以达到出小册的程度)
7. vite、webpack (源码层面复习、要求有产出、例如笔记可以达到出小册的程度)
8. nuxt 学习 (这个简单学习就可，产出个demo就ok)
9. electron 学习（做出个项目吧，要做出什么还待定）

加餐[https://github.com/woai3c](https://github.com/woai3c)

### 3月计划
+ 小满 ts ✅
+ 看别人的埋点插件，写出具体差异在哪，这个过程要求不停提出为什么以及未来我想要做出什么的设想 ✅
  - 神策
  - https://github.com/clouDr-f2e/monitor
  - https://github.com/getsentry/sentry
  - https://github.com/xy-sea/web-see
+ 观摩公司组件库 ✅

### 4月计划
+ 开始英语打卡(未开始)
+ 埋点系统 - 前端采集端大致内容完成，四月底进入编辑文档阶段

### 5月计划
+ 埋点系统 - 拖工期了，五月底才能完成编辑文档阶段

### 6月计划
+ 埋点系统 - 完成全部功能点了，正在编辑文档以及重构文档系统
