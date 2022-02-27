# flex

## 基本属性
1. flex-direction `row | row-reverse | column | column-reverse` 项目的排列方向
2. flex-wrap `nowrap | wrap | wrap-reverse` 项目内是否可以换行
4. justify-content `flex-start | flex-end | center | space-between | space-around` 水平对齐方式(会受排列方向影响)
5. align-items `flex-start | flex-end | center | baseline` 垂直对齐方式(会受排列方向的影响)
6. align-content `flex-start | flex-end | center | space-between | space-around` 定义多根轴线的对齐方式(也就是当可以换行时有多根轴线,操作的就是这些轴线的对齐方式)

## flex: 1
flex: 1等于
1. flex-grow: 1
2. flex-shrink: 1
3. flex-basis: 0%

::: tip
解释: 也就是舍去元素本身的宽度( flex-basis优先级比width高 ),然后将收缩和扩大都设置1,等比缩放<br>
注意: flex: 2 时, flex-grow = 2 且 flex-shrink = 2
:::

## flex-grow
决定了父元素在空间分配方向上还有剩余空间时,如何分配这些剩余空间,**默认为 0**

比如父元素剩余空间x,其三个子元素flex-grow分别为a, b, c <br>
设 `sum = a+b+c`,则这三个元素各自将要得到的剩余空间(也就是权重)分别为: `x*a/sum` `x*b/sum` `x*c/sum`

::: tip
子级的 max-width 以及 min-width 有些场景会覆盖 flex-grow 生成的宽度
:::

### 场景1: 子元素无初始宽度
``` html
<div class="content">
  <div class="left"></div>
  <div class="cen"></div>
  <div class="right"></div>
</div>

<style type="text/css">
.content {
  display: flex;
  width: 100px;
  height: 200px;
  border: 1px solid red;
}
.left {
  flex-grow: 1;
  background-color: green;
}
.cen {
  flex-grow: 2;
  background-color: yellow;
}
.right {
  flex-grow: 3;
  background-color: red;
}
<script>
```

这里可以知道父级元素有三个子元素,都没有设置基础宽度且各自 `flex-grow` 设置为 1,2,3<br>
那么可以得到它们各自分别按照比例分摊父级元素剩余内容: 1/6, 2/6, 3/6<br>
也就是最终各个子元素的宽度为:
+ left.width = (100 * 1/6)px
+ cen.width = (100 * 2/6)px
+ right.width = (100 * 3/6)px

### 场景2: 子元素有初始宽度
``` html
<style type="text/css">
.content {
  display: flex;
  width: 100px;
  height: 200px;
  border: 1px solid red;
}
.left {
  flex-grow: 1;
  width: 10px;
  background-color: green;
}
.cen {
  flex-grow: 2;
  width: 20px;
  background-color: yellow;
}
.right {
  flex-grow: 3;
  width: 30px;
  background-color: red;
}
<script>
```

接着场景1的布局,只是给每个子元素设定初始宽度<br>
按照上面的公式,可以得到它们各自分别按照比例分摊父级元素剩余内容: 1/6, 2/6, 3/6<br>
不同的是,此时父级剩余内容为 `100 - 10 - 20 - 30 = 40px`<br>
所以最终各个子元素能分到的宽度分别为: `1/6 * 40` `2/6 * 40` `3/6 * 40`<br>
也就是最终各个子元素宽度为: 
+ left.width = (10 + 6.66)px
+ cen.width = (20 + 13.34)px
+ right.width = (30 + 20)px

### 场景3: flex-grow之和小于1
当所有元素的 flex-grow 之和小于 1 的时候,sum会按照1来算,而不是sum等于各个子元素的 `flex-grow` 总和,也就是剩余空间不会全部分配给各个元素
``` html
<style type="text/css">
.content {
  display: flex;
  width: 100px;
  height: 200px;
  border: 1px solid red;
}
.left {
  flex-grow: 0.1;
  background-color: green;
}
.cen {
  flex-grow: 0.2;
  background-color: yellow;
}
.right {
  flex-grow: 0.3;
  background-color: red;
}
<script>
```

所以这里各个子元素宽度分配为:
+ left.width = (100 * 0.1/1)px
+ cen.width = (100 * 0.2/1)px
+ right.width = (100 * 0.3/1)px

### 场景4: 和小于1且有初始宽度
**注意:这里的子元素初始宽度和上面几个例子不一样的**
``` html
<style type="text/css">
.content {
  display: flex;
  width: 100px;
  height: 200px;
  border: 1px solid red;
}
.left {
  flex-grow: 0.1;
  width: 30px;
  background-color: green;
}
.cen {
  flex-grow: 0.2;
  width: 20px;
  background-color: yellow;
}
.right {
  flex-grow: 0.3;
  width: 10px;
  background-color: red;
}
<script>
```

父级的剩余宽度为: (100 - 30 - 20 - 10) = 40px

所以这里各个子元素宽度分配为:
+ left.width = (30 + 40 * 0.1/1)px
+ cen.width = (20 + 40 * 0.2/1)px
+ right.width = (10 + 40 * 0.3/1)px

## flex-shrink
在空间不够时让各个子元素收缩以适应有限的空间,**默认为 1**

::: tip
子级的 max-width 以及 min-width 有些场景会覆盖 flex-grow 生成的宽度
:::

### 场景1: flex-shrink总和大于1
``` html
<style type="text/css">
.content {
  display: flex;
  width: 100px;
  height: 200px;
  border: 1px solid red;
}
.left {
  flex-shrink: 1;
  width: 30px;
  background-color: green;
}
.cen {
  flex-shrink: 2;
  width: 40px;
  background-color: yellow;
}
.right {
  flex-shrink: 3;
  width: 50px;
  background-color: red;
}
<style>
```

溢出宽度: `100 - 30 - 40 - 50 = -20px`<br>
总权重: `1*30 + 2*40 + 3*50 = 260`<br>
三个子元素分别收缩:
+ left: 20 * 1 * 30/260 = 2.3
+ cen: 20 * 2 * 40/260 = 6.16
+ right: 20 * 3 * 50/260 = 11.54

最终宽度:
+ left: 30 - 2.3 = 27.7
+ cen: 40 - 6.16 = 33.84
+ right: 50 - 11.54 = 38.46

### 场景2: flex-shrink总和小于1
``` html
<style type="text/css">
.content {
  display: flex;
  width: 100px;
  height: 200px;
  border: 1px solid red;
}
.left {
  flex-shrink: 0.1;
  width: 30px;
  background-color: green;
}
.cen {
  flex-shrink: 0.2;
  width: 40px;
  background-color: yellow;
}
.right {
  flex-shrink: 0.3;
  width: 50px;
  background-color: red;
}
<style>
```

溢出宽度: `100 - 30 - 40 - 50 = -20px`<br>
总权重: `0.1*30 + 0.2*40 + 0.3*50 = 26`<br>
注意: 这里不再按照溢宽度20全部收回去,只会收缩 `20 * (0.1+0.2+0.3)/1 = 12` 的空间<br>
三个子元素分别收缩:
+ left: 12 * 0.1 * 30/26 = 1.38
+ cen: 12 * 0.2 * 40/26 = 3.7
+ right: 12 * 0.3 * 50/26 = 6.92

最终宽度:
+ left: 30 - 1.38 = 28.62
+ cen: 40 - 3.7 = 36.3
+ right: 50 - 6.92 = 43.08

## flex子元素属性
1. order 定义项目在容器中排列顺序,数值越小越靠前(-1, -10这些)
2. align-self `auto | flex-start | flex-end | center | baseline` 允许单个项目有与其他项目不一样的对齐方式
3. flex-basis `auto | 数值` 表示flex items 在被放进一个flex容器之前的大小,width是其一个回退选项

## 布局实现
### 九宫格
( 不保证有九个格子且最后一行左对齐 )
1. flex,父级 `display: flex; flex-warp: warp;`,然后子元素 `width: 30%`
3. 浮动,父级 `overflow: hidden`, 子级 `float: left; width: 30%`
2. 强行补齐源数据,并且给出属性标识,然后在渲染的时候设内容为空(额,还是用上面的套路)

### 圣杯布局
两边固定宽度,中间设置 `flex: 1`

### 置顶 & 置底
+ 中心内容设置 `margin-bottom: -50px`,底部高度也是50px
+ 中心内容设置 `padding-bottom: 50px`,底部设置 `margin-top: -50px`
+ 中心内容设置 `height: calc(100vh - 50px)`,底部高度50px
+ 父级设置 `flex-direction: column`,中心内容设置 `flex: 1`,底部高度随意变化

> [https://segmentfault.com/a/1190000008516654](https://segmentfault.com/a/1190000008516654)
