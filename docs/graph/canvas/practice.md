# 实践一些简单效果

> 本文是对 https://juejin.cn/post/7119495608938790942#heading-97 的总结

## 绘制形状
### 直线
<CanvasDemo
code="
let ctx = canvas.getContext('2d');
ctx.moveTo(20, 20);
ctx.lineTo(60, 60);
ctx.stroke();
" />

### 三角形
<CanvasDemo
code="
let ctx = canvas.getContext('2d');
ctx.moveTo(0, 0);
ctx.lineTo(200, 0);
ctx.lineTo(0, 100);
ctx.lineTo(0, 0);
ctx.stroke();
" />

### 矩形
+ strokeRect(x, y, width, height) // 绘制一个矩形的边框
<CanvasDemo
code="
let ctx = canvas.getContext('2d');
ctx.strokeRect(0, 0, 100, 100);
" />

+ fillRect(x, y, width, height) // 绘制一个填充的矩形
<CanvasDemo
code="
let ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, 100, 100);
" />

+ clearRect(x, y, width, height) // 清除指定矩形区域，让清除部分完全透明
<CanvasDemo
height="150"
code="
let ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, 300, 130);
ctx.clearRect(0,0, 100, 100);
" />

### 圆弧和圆
arc(x, y, radius, startAngle, endAngle, anticlockwise)
+ x和Y为圆心的坐标
+ radius 为半径
+ startAngle 为圆弧或圆的开始位置
+ endAngle 为圆弧或圆的结束位置
+ anticlockwise是绘制的方向（不写默认为false，从顺时针方向）
<CanvasDemo
height="300"
width="500"
code="
let ctx = canvas.getContext('2d');
ctx.beginPath(); // 新建一条路径，也就是重开一个绘画
ctx.arc(100, 100, 80, 20, Math.PI);
ctx.closePath(); // 闭合绘画，如果是半圆添加了闭合也会把口封掉
ctx.stroke(); // 描边
ctx.beginPath();
ctx.arc(200, 200, 80, 20, Math.PI, true);
<!-- ctx.closePath(); --> // 这里不用闭合，anticlockwise=true也能自动闭合
ctx.stroke();
ctx.beginPath();
ctx.arc(400, 10, 80, 20, Math.PI);
ctx.stroke();
" />

### 椭圆
ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
+ x、y：椭圆的圆心位置
+ radiusX、radiusY：x轴和y轴的半径
+ rotation：椭圆的旋转角度，以弧度表示
+ startAngle：开始绘制点
+ endAngle：结束绘制点
+ anticlockwise：绘制的方向（默认顺时针），可选参数
<CanvasDemo
width="500"
height="200"
code="
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.ellipse(200, 120, 100, 100, 0, 0, Math.PI, true);
ctx.closePath();
ctx.stroke();
" />

### 贝塞尔曲线
quadraticCurveTo(cp1x, cp1y, x, y)
+ cp1x，cp1y 表示为一个控制点
+ x，y 为结束点
<CanvasDemo
height="200"
code="
let ctx = canvas.getContext('2d');
ctx.moveTo(50, 50);
ctx.quadraticCurveTo(10, 200, 300, 50);
ctx.stroke();
" />

### 三次贝塞尔曲线
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
+ cp1x，cp1y为一个控制点
+ cp2x，cp2y为第二个控制点
+ x，y为结束点
<CanvasDemo
height="200"
code="
let ctx = canvas.getContext('2d');
ctx.moveTo(50, 50);
ctx.bezierCurveTo(10, 200, 200, -100, 300, 150);
ctx.stroke();
" />

## 绘制样式
### 线条样式
+ lineWidth 线的粗细
+ lineCap 线段端点 (butt round square) 默认 butt
+ lineJoin 连接处的样式 (round bevel miter) 默认 miter
+ miterLimit
限制当两条线相交时交接处最大长度

线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。

如果交点距离大于miterLimit值，连接效果会变成了 lineJoin = bevel 的效果

+ setLineDash/getLineDash 设置虚线
绘制虚线/获取已绘制的虚线数组(如果是奇数的话会默认补位双数,这也是为什么下面的会补长)

+ lineDashOffset 设置虚线样式的起始偏移量
<CanvasDemo
height="200"
code="
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.lineWidth=6;
ctx.setLineDash([5, 10, 20]); // 此时 ctx.getLineDash() 结果为 [5, 10, 20, 5, 10, 20]
ctx.moveTo(30, 30);
ctx.lineTo(100, 180);
ctx.stroke();
ctx.closePath();
" />

### 透明度
<CanvasDemo
height="300"
code="
let ctx = canvas.getContext('2d');
// 绘制一个矩形，指定透明度的填充样式
ctx.beginPath();
ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
ctx.fillRect(10,10,300,100);
// 绘制一个矩形边框，指定透明度的描边样式
ctx.beginPath();
ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
ctx.strokeRect(10, 90, 100, 200);
// 绘制一个圆，设置透明度值
ctx.beginPath()
ctx.fillStyle = 'rgba(255, 255, 0, 1)';
ctx.globalAlpha = 0.5;
ctx.arc(200, 200, 100, 0, Math.PI*2, true);
ctx.fill();
" />

### 渐变
#### 线性渐变
+ ctx.createLinearGradient(x1, y1, x2, y2) 设置渐变范围,参数分别为 起点的坐标和终点的坐标
+ ctx.gradient.addColorStop(offset, color) 设置渐变颜色,color就是颜色,offset 则是颜色的偏移值(0-1)
<CanvasDemo
width="500"
height="300"
code="
let ctx = canvas.getContext('2d');
ctx.beginPath();
const gradient = ctx.createLinearGradient(0, 0, 500, 280)
gradient.addColorStop(0, '#000');
gradient.addColorStop(1, '#ff0000');
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 500, 280);
" />

#### 径向渐变
ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)参数分别为开始圆的坐标和半径以及结束圆的坐标和半径
<CanvasDemo
width="200"
height="200"
code="
let ctx = canvas.getContext('2d');
ctx.beginPath();
const gradient1 = ctx.createRadialGradient(100, 100, 100, 100, 100, 60);
gradient1.addColorStop(0, '#000');
gradient1.addColorStop(1, '#ff0000');
ctx.fillStyle = gradient1;
ctx.fillRect(0, 0, 200, 200);
" />

### 图案样式
createPattern(image, type) 参数分别为：Image 参数可以是一个 Image 对象，也可以是一个 canvas 对象，Type 为图案绘制的类型，可用的类型分别有
+ repeat // 平铺
+ repeat-x // 不平铺
+ repeat-y // y轴平铺
+ no-repeat // x轴平铺

PS: image 为参数
<CanvasDemo
width="200"
height="200"
code="
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/icon.3so9gi79i940.webp';
img.onload = () => {
  let ptrn = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = ptrn;
  ctx.fillRect(0, 0, 200, 200);
}
" />

PS: canvas 为参数
<CanvasDemo
width="400"
height="200"
code="
let ctx = canvas.getContext('2d');
let ctx2 = canvas.getContext('2d');
let img = new Image();
img.src = 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/icon.3so9gi79i940.webp';
img.onload = function() {
  // 图片加载完以后,创建图案
  let ptrn = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = ptrn;
  ctx.fillRect(0, 0, 400, 200);
  // 用canvas来绘制canvas2
  let ptrn2 = ctx2.createPattern(canvas, 'repeat');
  ctx2.fillStyle = ptrn2;
  ctx2.fillRect(0, 0, 400, 200);
}
" />

## 绘制文本
描边: strokeText(text, x, y, maxWidth)
+ text: 文本内容
+ x，y: 文本开始位置
+ maxWidth: 最大长度(可选，当超出时会等比缩小字体)

填充: fillText(text, x, y, maxWidth) 参数意思同上
<CanvasDemo
code="
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.strokeText('1. 我是 strokeText 绘制文本', 10, 20);
ctx.fillText('2. 我是 fillText 绘制文本', 10, 40);
" />

### 文本样式
+ font 绘制文本样式 (默认的字体是 10px sans-serif)
+ textAlign 文本对齐方式 (left right center start end 默认值是 start)
+ direction 文本方向: ltr（文本方向从左向右）、rtl（文本方向从右向左）、inherit（根据情况继承 Canvas元素或者 Document ）默认值是 inherit
+ textBaseline 垂直对齐方式 (top、hanging、middle、alphabetic、ideographic和bottom 默认值是 alphabetic)
+ measureText 测量文本，返回一个 TextMetrics对象
<CanvasDemo
width="700"
code="
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.font='30px sans-serif';
ctx.textAlign='end'
ctx.direction='rtl'
ctx.strokeText('我是文本', 300, 40);
ctx.strokeText('我是文本阿萨德', 300, 80);
ctx.direction='ltr'
ctx.strokeText('我是文本', 300, 40);
ctx.strokeText('我是文本阿萨德', 300, 80);
" />

### 阴影
+ shadowColor 阴影颜色
+ shadowOffsetX, shadowOffsetY x和y轴的阴影扩散度
+ shadowBlur 阴影模糊程度
<CanvasDemo
width="700"
code="
let ctx = canvas.getContext('2d');
ctx.shadowColor='black';
ctx.shadowBlur=20;
ctx.shadowOffsetX=10;
ctx.shadowOffsetY=10;
ctx.fillStyle='blue';
ctx.fillRect(20, 20, 50, 50);
" />

## 绘制图片
drawImage (根据参数不同,有三种使用方式)
+ image: 绘制到上下文的元素
+ sx、sy: 裁剪框的左上角X轴坐标和Y轴坐标
+ sWidth、sHeight: 裁剪框的宽度和高度
+ dx、dy: 绘制到上下文的元素，在上下文中左上角的X轴坐标和Y轴坐标
+ dWidth、dHeight: 绘制到上下文的元素，在上下文中绘制的宽度和高度,如果不说明，在绘制时image宽度和高度不会缩放

### 绘制
drawImage(image, dx, dy): 只有单纯的绘制功能，可以绘制图片、视频和别的Canvas对象等
<CanvasDemo
width="700"
height="160"
code="
const imgsrc = 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/logo.ocqmygd2csw.webp'
let ctx = canvas.getContext('2d');
const img = new Image();
img.src = imgsrc
img.onload = function(){
  ctx.drawImage(img, 10, 10);
}
ctx.font='30px sans-serif';
ctx.fillText('123', 100, 100);
" />

### 缩放
drawImage(image, dx, dy, dWidth, dHeight): 在绘制的基础上控制图片大小

### 裁剪
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight): 在缩放的基础上提供了裁剪功能

> 这种是按照原图大小进行裁剪后再根据 dx, dy, dWidth, dHeight 这些数据决定裁剪后的图片的 位置和大小

## 变形
### 保存状态
保存上一次状态，类似于栈结构
<CanvasDemo
width="700"
height="150"
code="
let ctx = canvas.getContext('2d');
ctx.fillStyle = '#ccc';
ctx.fillRect(10, 10, 100, 100);
ctx.save(); // 保存状态
ctx.fillStyle = '#ee7034';
ctx.fillRect(150, 10, 200, 100);
ctx.restore(); // 还原到上次保存的状态
ctx.fillRect(400, 10, 100, 100);
" />

### 平移 & 旋转 & 缩小
+ translate(x, y): 平移,参数分别为水平和垂直偏移量
+ rotate(x): 旋转
+ scale(x, y): 放大缩小,参数分别为x轴和y轴缩小,1为基础
<CanvasDemo
width="700"
height="200"
code="
let ctx = canvas.getContext('2d');
ctx.fillStyle = '#ee7034';
ctx.translate(20, 40);
ctx.rotate(360 * Math.PI / 180); // 旋转360度
ctx.scale(2, 2);
ctx.fillRect(0, 0, 50, 50);
" />

### transform setTransform resetTransform
+ transform(a, b, c, d, e, f): 方法能将当前的变形矩阵乘上一个基于自身参数的矩阵
+ setTransform(a, b, c, d, e, f): 方法会将当前变形矩阵重置为单位矩阵，然后用相同的参数调用 transform 方法
+ resetTransform(): 方法为重置当前变形为单位矩阵。效果等同于调用 setTransform(1, 0, 0, 1, 0, 0)

> 需要注意的是transform方法和setTransform方法中如果任意一个参数是无限大（Infinity），那么变形矩阵也必须被标记为无限大，否则会抛出异常

> 暂时不明白这一块含义

参数说明
+ a：水平方向的缩放
+ b：竖直方向的倾斜偏移
+ c：水平方向的倾斜偏移
+ d：竖直方向的缩放
+ e：水平方向的移动
+ f：竖直方向的移动

<CanvasDemo
width="700"
height="460"
code="
let ctx = canvas.getContext('2d');
let sin = Math.sin(Math.PI / 6);
let cos = Math.cos(Math.PI / 6);
ctx.translate(250, 250);
let c = 0;
for (let i=0; i <= 12; i++) {
  c = Math.floor(255 / 12 * i);
  ctx.fillStyle = `rgba(${c}, ${c}, ${c})`;
  ctx.beginPath() // 开启路径
  ctx.arc(60, 100, 100, 0, Math.PI*2);
  ctx.fill();
  ctx.transform(cos, sin, -sin, cos, 0, 0);
}
" />

## 合成与裁剪
### 合成
合成的图形受限于绘制的顺序。如果我们不想受限于绘制的顺序，可以利用 globalCompositeOperation 属性来改变这种情况
+ source-over // 默认值,在现有画布上下文之上绘制新图形
+ source-in   // 新图形只在新图形和目标画布重叠的地方绘制,其他的都是透明的
+ source-out  // 在不与现有画布内容重叠的地方绘制新图形
+ source-atop // 新图形只在与现有画布内容重叠的地方绘制
+ destination-over // 在现有的画布内容后面绘制新的图形
+ destination-in // 现有的画布内容保持在新图形和现有画布内容重叠的位置,其他的都是透明的
+ destination-out // 现有内容保持在新图形不重叠的地方
+ destination-atop // 现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的
+ lighter // 两个重叠图形的颜色是通过颜色值相加来确定的
+ copy // 只显示新图形
+ xor // 图像中，那些重叠和正常绘制之外的其他地方是透明的
+ multiply // 将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片
+ screen // 像素被倒转，相乘，再倒转，结果是一幅更明亮的图片
+ overlay // multiply 和 screen 的结合，原本暗的地方更暗，原本亮的地方更亮
+ darken // 保留两个图层中最暗的像素
+ lighten // 保留两个图层中最亮的像素
+ color-dodge // 将底层除以顶层的反置
+ color-burn // 将反置的底层除以顶层，然后将结果反过来
+ hard-light // 屏幕相乘（A combination of multiply and screen）类似于叠加，但上下图层互换了
+ soft-light // 用顶层减去底层或者相反来得到一个正值
+ difference // 一个柔和版本的强光（hard-light）,纯黑或纯白不会导致纯黑或纯白
+ exclusion // 和 difference 相似，但对比度较低
+ hue // 保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调（hue）
+ saturation // 保留底层的亮度（luma）和色调（hue），同时采用顶层的色度（chroma）
+ color // 保留了底层的亮度（luma），同时采用了顶层的色调 (hue) 和色度 (chroma)
+ luminosity // 保持底层的色调（hue）和色度（chroma），同时采用顶层的亮度（luma）
<CanvasDemo
width="700"
height="200"
code="
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 300, 100);
ctx.globalCompositeOperation = 'source-over'
ctx.beginPath();
ctx.fillStyle = 'green';
ctx.fillRect(50, 100, 150, 50);
ctx.globalCompositeOperation = 'source-over'
ctx.beginPath();
ctx.fillStyle = 'yellow';
ctx.fillRect(150, 100, 150, 30);
" />

### 裁剪
+ clip(): 只是暴露出能显示的视图(默认为圆形),其他区域会覆盖不可见
+ clip(path, fillRule)
  + path为需要剪切的 Path2D 路径
  + fillRule为判断是在路径内还是在路径外，允许的值有 nonzero（默认值）：非零环绕原则，evenodd：奇偶环绕原则

裁剪
<CanvasDemo
width="700"
height="200"
code="
let ctx = canvas.getContext('2d');
ctx.arc(100, 100, 100, 0, Math.PI * 2)
ctx.clip()
const img = new Image()
img.src = 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/misty_forest_4k-wallpaper-1920x1080.4gmt2eh3anc0.webp';
img.onload = () => {
  ctx.drawImage(img, 0, 0, 500, 500)
}
" />

Path2D 构造函数的一些方法
+ addPath(): 添加一条新路径到对当前路径
+ closePath(): 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。 如果图形已经是封闭的或者只有一个点，那么此函数不会做任何操作
+ moveTo(): 将一个新的子路径的起始点移动到 (x，y) 坐标
+ lineTo(): 使用直线连接子路径的终点到 x, y 坐标
+ bezierCurveTo(): 添加一条三次贝赛尔曲线到当前路径。 该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改
+ quadraticCurveTo(): 添加一条二次贝赛尔曲线到当前路径
+ arc(): 添加一条圆弧路径。 圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束
+ arcTo(): 根据控制点和半径添加一条圆弧路径，使用直线连接前一个点
+ ellipse(): 添加一条椭圆路径。椭圆的圆心在（x,y）位置，半径分别是radiusX 和 radiusY ，按照anticlockwise （默认顺时针）指定的方向，从 startAngle 开始绘制，到 endAngle 结束
+ rect(): 创建一条矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height

示例: Path2D生成矩形裁剪图形
<CanvasDemo
width="700"
height="200"
code="
const ctx = canvas.getContext('2d');
var img = new Image();
img.src = 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/misty_forest_4k-wallpaper-1920x1080.4gmt2eh3anc0.webp';
img.onload = function(){
  // 创建圆形裁剪路径
  ctx.arc(50, 50, 100, 0, Math.PI*2, false);
  let path1 = new Path2D();
  path1.rect(50, 50, 300, 60);
  ctx.clip(path1);
  // 创建完后绘制
  ctx.drawImage(img, 0, 0, 300, 200);
}
" />

## 动画
+ setInterval(function, delay): 定时器，当设定好间隔时间后，function 会定期执行
+ setTimeout(function, delay): 延时器，在设定好的时间之后执行函数
+ requestAnimationFrame(callback): 告诉浏览器你希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画
