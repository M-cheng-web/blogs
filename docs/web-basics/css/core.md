# css

## 行内元素/块级元素
行内: a img span b strong input select

块级: div p table ul lo li h1-h6

俩者的区别
1. 行内元素会在一条直线上排列(默认宽度只与内容相关)
2. 块级元素各占据一行(默认宽度是它父级容器的100%)
3. 块级元素可以包含行内元素和块级元素,行内元素不能包含块级元素,只能包含文本或者其它行内元素(如果包含了会出现溢出的情况,且本身宽高不会扩大)
4. 行内元素设置`width`,`height`,`margin上下`,`padding上下`都是无效的

## css选择器以及优先级
+ !important
+ 内联样式（1000）
+ ID选择器（0100）
+ 类选择器/属性选择器/伪类选择器（0010）
+ 元素选择器/伪元素选择器（0001）
+ 关系选择器/通配符选择器（0000）

## div的宽高
div的宽高 = width + padding + border<br>
如果padding大了或者是border很大,只会往外部扩展,不会压缩内部设置的width
1. 行内元素的宽高: 高度是由行高决定的,宽度=内容+border+margin+padding
2. 块级元素的宽高: 高度是由内部文档流元素的高度总和,宽度默认为父元素的100%

## 清除浮动
+ 父级 `overflow: hidden`
+ 子级末尾添加元素以及设置样式 `clear: both`
+ 父级添加伪元素
``` css
.box::after {
  content: '.';
  height: 0;
  display: block;
  clear: both;
}
```

## BFC
CSS将HTML的每一个元素都当成一个盒子,而且它进一步的认为每一个盒子里面都有一套正常的语法规则或者叫渲染规则,它能根据这个规则将写的HTML元素绘制出来,但是我们可以通过一些特定的手段触发BFC,让其遵循另一套语法规则

**可以说BFC就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里box的布局与这个容器外的box毫不相干**

解决了这些问题:
1. 垂直外边距重叠问题
2. 去除浮动

触发BFC
+ float: left/right
+ overflow: hidden (父级设置)
+ position: absolute/fixed (父级设置)
+ display: inline-block (父级设置)

## margin 塌陷
父子级关系中子级 `margin-top` 会导致作用到父级上,解决:
1. 子级用padding
2. 父级添加 border
3. 父级添加 overflow: hidden
4. 父级添加 position: fixed/absolute

兄弟级关系中,垂直方向的互相 `margin-bottom margin-top` 会导致重叠,解决:
1. 用padding避免
2. 设置 float: left/right

## 自适应
+ 媒体查询 @media 适合小型网页,交互较少的页面,页面多了不方便维护
+ GitHub上有个项目,将vue分为移动端和手机端
+ rem vm vh (搭配媒体查询来达到动态适配)

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

## vm
vm表示的是相对于屏幕的百分之一宽度,还有vh是百分之一高度,用以解决多层元素带来的百分号不确定关系