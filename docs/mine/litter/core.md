# 随手而记

## 在线ps功能点
+ 吸色笔
+ 反相颜色图片
+ 移动图片
+ 坐标线
+ 缩小放大
+ 抠图(也就是白底图)
+ 旋转+裁剪(要带有量线)
+ 橡皮擦
+ 合成多个图片
+ 调整多个图片的层级(多图层)
+ 添加文字(双指操作等等)
+ 添加水印 (考虑是否做暗水印)
+ 消除笔
+ 添加贴纸(上传图片然后以特定形状展示合成)
+ 回退前进功能
+ 饱和度 + 清晰度 + 亮度 + 对比度 + 色温 + 色调
+ 滤镜
+ 添加一些自有的动画？webgl封装的？
+ 生成svg(是否生成动画,如果要做拼成动画的又是另外一个大类了)
+ 转换格式
+ 支持不同格式图片渲染,导出不同格式+生成链接的形式
+ 压缩图片
+ 快速选中区域
+ 粘贴转图片
+ 右键菜单功能
+ 图片AI分类 (https://github.com/alibaba/pipcook)
+ 图片转pdf (https://github.com/foliojs/pdfkit)

### 一期
1. 导入导出
2. 拖动放大缩小
3. 裁剪
4. 回退 + 前进
5. 反相颜色图片

## 编码-btoa & 解码-atob
``` ts
let encodedData = window.btoa("Hello, world"); // 编码
let decodedData = window.atob(encodedData);    // 解码
```

## 本地端口操作
+ 查看: sudo lsof -i:`8080`
+ 终止: sudo kill -9 `<pid>`

## ng
+ 启动: sudo nginx
+ 重启: sudo nginx -s reload
+ 停止: sudo nginx -s stop
+ 打开配置地址: 控制台 nginx -h, 然后command + 最后一位地址

## vuepress 图标地址
[https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

## mk文档输出目录树
mddir

https://www.cnblogs.com/xulinjun/p/13932609.html

## click & touchstart
### 前置知识点
+ click 点击事件,在H5中会有 `300ms` 的延迟 ( 为了判断双击事件 )
+ touchstart 手触碰元素事件,手在放上去时就会立即触发
+ touchmove 手移动事件
+ touchend 手放开事件
+ prevent 修饰符,阻止默认事件( 上面几个事件添加此修饰符会使click事件失效 )
+ stop 修饰符,阻止事件冒泡

### 事件的 捕获阶段 & 触发阶段
1. 事件的捕获阶段
在事件的捕获阶段时从最外层的祖先元素,向目标元素进行实践的捕获,但是默认此时不会触发事件
2. 事件的目标阶段
事件捕获到目标元素,捕获结束开始在目标元素上触发事件
3. 事件的冒泡阶段
事件从目标元素向它的祖先元素传递,分别依次触发祖先元素上的事件
4. 如果希望在捕获阶段就出发事件,可以将 `addEventListener()` 中第三个参数设置为true ( 一般情况下我们不会希望在补货阶段出发事件,所以这个参数一般都是false )

> 在IE8及以下的浏览器中没有捕获阶段

### 场景描述
目前我们需要在一个 `div` 上添加手动拖动需求以及点击需求,可以联想到的是 `click / touchstart / touchmove / touchend` 这几个事件来满足上诉需求,目前遇到的问题是,我们给元素附上 `@touchstart.prevent.stop="handleTouchStart"` 事件

已知的问题是:
1. `click` 事件会被 `prevent` 修饰符给弄失效
2. `click` 事件在第一次点击元素时不会触发 (因为 `touchstart.stop`,去掉 `stop` 就没有这种问题,具体我这边也不清楚为什么)
3. 不只是针对于 `@touchstart`,目前即使不给 `@touchstart` 事件添加 `prevent & stop`,给 `touchend` 添加这俩个修饰符也会导致同样的问题 (点击元素没有移动不会触发 `touchmove`,所以给移动事件添加那俩修饰符不会影响 `click`事件,理论上如果移动了就会影响到 `click`,但是按照实际场景移动了本身就不用触发点击事件~)

### 解决方案
1. 去除 `touchstart & touchend` 的 `prevent & stop` 俩修饰符, 添加 `@click.prevent.stop` ( 但是这样的话还会有300ms延迟,这是不可控的 )
2. 通过 `touchstart` 与 `touchend` 的时间间隔来判断用户是否点击,延迟时间也是完全可控的

## uniapp
+ click.stop 是无效的, 要用 click.native.stop
+ input type = number 时, 设置 maxlength 会出错,但是不报错 (在支付宝小程序)
+ 没有改动 (由于支付宝不支持formdata格式且 uni.uploadFile 的 filePath 是必传的,所以只能用另外一个接口)
+ uniapp 原生输入框在支付宝小程序有闪动问题,用uview的组件好一些
+ 假冒的 tabbar, 如果在所有的 pages 定义之前加了个额外的登录也,那么 switchto 这种是不能正常使用了,只能当做正常的页面跳转,否则会出现底部会空出一个 tabbar 栏的高度 (但是在安卓端是没问题的,ios端看支付宝小程序才有问题)
+ textarea focus 属性内部是watch 的，如果本身为true再次置为true是不会触发获取焦点的
+ 通过路由跳转传参的 布尔值会转化为 字符串
+ new date('2000-12-04') 这样的方式可能会失败，这样的格式能保证成功 '2000/12/04'

// ios screenWidth 是正常的, 安卓端 screenWidth 是不正常的,所以用 windowWidth
  // const screenWidth = uni.getSystemInfoSync().screenWidth;