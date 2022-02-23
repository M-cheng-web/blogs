# css

## 行内元素/块级元素
### 有哪些
行内: a img span b strong input select<br>
块级: div p table ul lo li h1-h6
### 俩者的区别
1. 行内元素会在一条直线上排列(默认宽度只与内容相关)
2. 块级元素各占据一行(默认宽度是它父级容器的100%)
3. 块级元素可以包含行内元素和块级元素,行内元素不能包含块级元素,只能包含文本或者其它行内元素(如果包含了会出现溢出的情况,且本身宽高不会扩大)
4. 行内元素设置`width`,`height`,`margin上下`,`padding上下`都是无效的

## div的宽高由什么决定
div的宽高 = width + padding + border<br>
如果padding大了或者是border很大,只会往外部扩展,不会压缩内部设置的width
1. 行内元素的宽高: 高度是由行高决定的,宽度=内容+border+margin+padding
2. 块级元素的宽高: 高度是由内部文档流元素的高度总和,宽度默认为父元素的100%

## flex
基本属性
1. flex-direction `row | row-reverse | column | column-reverse` 项目的排列方向
2. flex-wrap `nowrap | wrap | wrap-reverse` 项目内是否可以换行
4. justify-content `flex-start | flex-end | center | space-between | space-around` 水平对齐方式(会受排列方向影响)
5. align-items `flex-start | flex-end | center | baseline` 垂直对齐方式(会受排列方向的影响)
6. align-content `flex-start | flex-end | center | space-between | space-around` 定义多根轴线的对齐方式(也就是当可以换行时有多根轴线,操作的就是这些轴线的对齐方式)

flex子元素属性
1. order 定义项目在容器中排列顺序,数值越小越靠前(-1, -10这些)
2. align-self `auto | flex-start | flex-end | center | baseline` 允许单个项目有与其他项目不一样的对齐方式

### flex实现九宫格布局

不保证有九个格子且最后一行左对齐
1. flex,父级 `display: flex; flex-warp: warp;`,然后子元素 `width: 30%`
3. 浮动,父级 `overflow: hidden`, 子级 `float: left; width: 30%`
2. 强行补齐源数据,并且给出属性标识,然后在渲染的时候设内容为空(额,还是用上面的套路)

### 圣杯布局
两边固定宽度,中间设置 `flex: 1`

## rem
::: tip
可以通过 px2rem loader来达到在项目中还是正常使用 px,打包的时候会替换成 rem <br>

也可以通过 cssrem vscode插件的方式达到在书写样式的时候写上px能给出rem的提示
:::

rem单位都是相对于根元素html的 `font-size` 来决定大小的,通过媒体查询或者监听页面的窗口变化事件来动态更改这个 `font-size` (font-size默认为 16px,也就是设置`font-size = 62.5%`的话,`1rem = 10px`)
```
font-size = 20 * (clientWidth / 375) + 'px'
==>
在 375 屏中 1rem = 20px,往后就会根据这个动态调整
```

### vm
vm表示的是相对于屏幕的百分之一宽度,还有vh是百分之一高度,用以解决多层元素带来的百分号不确定关系

## 浏览器渲染过程
1. 解析HTML生成DOM树
2. 解析CSS生成CSSOM规则树
3. 解析JS 操作 DOM 树和 CSSOM 规则树
4. 将DOM树与CSSOM规则树合并在一起生成渲染树
5. 遍历渲染树开始布局,计算每个节点的位置大小信息
6. 浏览器将所有图层的数据发送给GPU,GPU将图层合成并显示在屏幕上

## 重绘回流
会引起元素位置变化的就会回流,窗口大小改变、字体大小改变、以及元素位置改变，都会引起周围的元素改变他们以前的位置<br>
不会引起位置变化的，只是在以前的位置进行改变背景颜色等，只会重绘

**回流必将引起重绘，重绘不一定会引起回流**

### 两者对性能影响
**回流比重绘的代价要更高**<br>
有时即使仅仅回流一个单一的元素,它的父元素以及任何跟随它的元素也会产生回流<br>

现代浏览器会对频繁的回流或重绘操作进行优化:<br>
浏览器会维护一个队列,把所有引起回流和重绘的操作放入队列中,如果队列中的任务数量或者时间间隔达到一个阈值的,浏览器就会将队列清空,进行一次批处理,这样可以把多次回流和重绘变成一次

### 如何避免重绘和回流
**CSS**
+ 避免使用table布局
+ 避免设置多层内联样式
+ 将动画效果应用到position属性为absolute或fixed的元素上

**JS**
+ 避免频繁操作样式,或者最好一次性重写style
+ 避免频繁操作DOM,创建一个documentFragment,在上面做一些操作,最后才把它添加到文档中