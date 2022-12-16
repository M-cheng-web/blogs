# canvas

## 基础api
+ moveTo() 移动画笔，一开始就需要加上的
+ stroke() 使图形闭合，只有闭合了才能显现出之前画的图形
+ beginPath() 新建一条路径，也就是重开一个绘画
+ closePath() 闭合绘画，如果是半圆添加了闭合也会把口封掉
+ fill() 与上同理，但是会填充
+ fillStyle = 'red' 设置填充色
+ fillRect() 设置填充块
+ clearRect() 清除一片区域

### 绘制api
+ 描边 stroke() strokeRect() strokeStyle() strokeText()
+ 填充 fill() fillRect() fillStyle() fillText()
+ 闭合 closePath()
+ 清空 clearRect()

## 小知识点

### beginPath 与 closePath 的区别
canvas 的绘制方法(比如stroke,fill)会以 `beginPath` 为分割线，在 beginPath 之前的语法并不会计入绘制，只会从 beginPath 之后开始绘制，而这就要求 beginPath 之前的语法要自己先绘制(否则会无效不显示)

这也意味着如果想分段绘制的话没有 beginPath 是实现不了的(当然可以用 save)

> beginPath 和 closePath 没有任何关系，一个是用来开启新绘制，一个是用户给图像闭合

### canvas 在不支持其平台的体现效果是直接体现内容，比如
``` html
<canvas width="200" height="200">
  当前浏览器不支持canvas元素，请升级或更换浏览器！
</canvas>
```

+ translate 要在 arc 或者 fillRect 这种之前才有效

+ beginPath 更新不了旋转位移