# canvas
https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors

## 练习
+ 三角形 (填充三角形,描边三角形 或者做成拼接一起的正方形)
+ 笑脸
+ ps调色盘 (正放行 / 圆形的)

## 函数

+ fillStyle
+ fillRect
+ strokeRect
+ clearRect

``` js
const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(0, 0, 200, 1)";
ctx.fillRect(30, 30, 100, 100);
ctx.clearRect(50, 50, 40, 40);
ctx.strokeRect(60, 60, 20, 20);
```

+ beginPath
+ closePath
+ stroke
+ fill
+ arc

+ strokeStyle
+ fillStyle

## 提示

```
注意：当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo（），无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置
```