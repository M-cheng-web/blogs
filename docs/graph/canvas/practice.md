# 实践一些简单效果

> 本文是对 https://juejin.cn/post/7119495608938790942#heading-97 的总结

## 绘制形状
### 直线
``` ts
let ctx = canvas.getContext("2d");
ctx.moveTo(50, 50);
ctx.lineTo(550, 550);
ctx.stroke()
```

### 三角形
``` ts
let ctx = canvas.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 0);
ctx.lineTo(0, 200);
ctx.lineTo(0, 0);
ctx.stroke();
```

### 矩形
``` ts
//绘制一个矩形的边框
strokeRect(x, y, width, height)

// 绘制一个填充的矩形
fillRect(x, y, width, height)

// 清除指定矩形区域，让清除部分完全透明
clearRect(x, y, width, height)
```

### 圆弧和圆
arc(x, y, radius, startAngle, endAngle, anticlockwise)
+ x和Y为圆心的坐标
+ radius 为半径
+ startAngle 为圆弧或圆的开始位置
+ endAngle 为圆弧或圆的结束位置
+ anticlockwise是绘制的方向（不写默认为false，从顺时针方向）

``` ts
let ctx = canvas.getContext("2d");
ctx.beginPath() // 新建一条路径，也就是重开一个绘画
ctx.arc(100, 100, 80, 20, Math.PI, false)
ctx.closePath() // 闭合绘画，如果是半圆添加了闭合也会把口封掉
ctx.stroke() // 描边

ctx.beginPath()
ctx.arc(200, 200, 80, 20, Math.PI, false)
ctx.closePath()
ctx.stroke()
```

### 椭圆
ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
+ x、y：椭圆的圆心位置
+ radiusX、radiusY：x轴和y轴的半径
+ rotation：椭圆的旋转角度，以弧度表示
+ startAngle：开始绘制点
+ endAngle：结束绘制点
+ anticlockwise：绘制的方向（默认顺时针），可选参数

``` ts
let ctx = canvas.getContext("2d");
ctx.beginPath()
ctx.ellipse(300, 300, 100, 100, 0, 0, Math.PI, true)
ctx.closePath()
ctx.stroke()
```

### 贝塞尔曲线
quadraticCurveTo(cp1x, cp1y, x, y)
+ cp1x，cp1y 表示为一个控制点
+ x，y 为结束点

``` ts
let ctx = canvas.getContext("2d");
ctx.moveTo(50, 50);
ctx.quadraticCurveTo(200, 200, 300, 50);
ctx.closePath()
ctx.stroke()
```

### 三次贝塞尔曲线
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
+ cp1x和cp1y为一个控制点
+ cp2x和cp2y为第二个控制点
+ x和y为结束点

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
``` ts
ctx.beginPath();
ctx.setLineDash([5, 10, 20])
console.log(ctx.getLineDash()); // [5, 10, 20, 5, 10, 20]
ctx.moveTo(300, 300);
ctx.lineTo(400, 200);
ctx.stroke()
ctx.closePath();
```

+ lineDashOffset 设置虚线样式的起始偏移量

### 透明度
``` ts
let ctx = canvas.getContext("2d");
// 绘制一个矩形
ctx.beginPath();
// 指定透明度的填充样式
ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
ctx.fillRect(10,10,300,100);

// 绘制一个矩形边框
ctx.beginPath();
// 指定透明度的描边样式
ctx.strokeStyle = "rgba(255, 0, 0, 0.7)";
ctx.strokeRect(10, 90, 100, 300);

// 绘制一个圆
ctx.beginPath()
ctx.fillStyle = "rgba(255, 255, 0, 1)";
// 设置透明度值
ctx.globalAlpha = 0.5;
ctx.arc(200, 200, 100, 0, Math.PI*2, true);
ctx.fill();
```

### 渐变
#### 线性渐变
+ ctx.createLinearGradient(x1, y1, x2, y2) 设置渐变范围,参数分别为 起点的坐标和终点的坐标
+ ctx.gradient.addColorStop(offset, color) 设置渐变颜色,color就是颜色,offset 则是颜色的偏移值(0-1)

``` ts
let ctx = canvas.getContext("2d");
ctx.beginPath();
const gradient1 = ctx.createLinearGradient(0,0,300,500)
gradient1.addColorStop(0, '#000');
gradient1.addColorStop(1, '#ff0000');
ctx.fillStyle = gradient1;
ctx.fillRect(10,10,300,500);
```

#### 径向渐变
ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)参数分别为开始圆的坐标和半径以及结束圆的坐标和半径
``` ts
let ctx = canvas.getContext("2d");
ctx.beginPath();
const gradient1 = ctx.createRadialGradient(100, 100, 100, 100, 100, 60);
gradient1.addColorStop(0, '#000');
gradient1.addColorStop(1, '#ff0000');
ctx.fillStyle = gradient1;
ctx.fillRect(0,0,600,600);
```

### 图案样式
createPattern(image, type) 参数分别为：Image 参数可以是一个 Image 对象，也可以是一个 canvas 对象，Type 为图案绘制的类型，可用的类型分别有：repeat，repeat-x，repeat-y 和 no-repeat (平铺，不平铺，y轴平铺，x轴平铺)

image 为参数:
``` ts
// 获取绘图上下文
var ctx = canvas.getContext('2d');
// 创建一个 image对象
var img = new Image();
img.src = "./image.png";
img.onload = function() {
  // 图片加载完以后
  // 创建图案
  var ptrn = ctx.createPattern(img, 'no-repeat');
  ctx.fillStyle = ptrn;
  ctx.fillRect(0, 0, 500, 500);
}
```

canvas 为参数:
``` ts
var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');
// 通过判断getContext方法是否存在来判断浏览器的支持性
if(canvas.getContext && canvas2.getContext) {
  // 获取绘图上下文
  var ctx = canvas.getContext('2d');
  var ctx2 = canvas2.getContext('2d');
  // 创建一个 canvas对象
  var img = new Image();
  img.src = "./image.png";
  img.onload = function() {
    // 图片加载完以后
    // 创建图案
    var ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 200, 200);
    // 用canvas来绘制canvas2
    var ptrn2 = ctx2.createPattern(canvas, 'repeat');
    ctx2.fillStyle = ptrn2;
    ctx2.fillRect(0, 0, 500, 500);
  }
}
```

## 绘制文本
描边: strokeText(text, x, y, maxWidth)
+ text: 文本内容
+ x,y: 文本开始位置
+ maxWidth: 最大长度(可选，当超出时会等比缩小字体)

填充: fillText(text, x, y, maxWidth) 参数意思同上

### 文本样式
+ font 绘制文本样式 (默认的字体是 10px sans-serif)
+ textAlign 文本对齐方式 (left right center start end 默认值是 start)
+ direction 文本方向: ltr（文本方向从左向右）、rtl（文本方向从右向左）、inherit（根据情况继承 Canvas元素或者 Document ）默认值是 inherit
+ textBaseline 垂直对齐方式 (top、hanging、middle、alphabetic、ideographic和bottom 默认值是 alphabetic)
+ measureText 测量文本，返回一个 TextMetrics对象

### 阴影
+ shadowColor 阴影颜色
+ shadowOffsetX, shadowOffsetY x和y轴的阴影扩散度
+ shadowBlur 阴影模糊程度

## 绘制图片
drawImage (根据参数不同,有三种使用方式)
+ image: 绘制到上下文的元素
+ sx、sy: 裁剪框的左上角X轴坐标和Y轴坐标
+ sWidth、sHeight: 裁剪框的宽度和高度
+ dx、dy: 绘制到上下文的元素，在上下文中左上角的X轴坐标和Y轴坐标
+ dWidth、dHeight: 绘制到上下文的元素，在上下文中绘制的宽度和高度,如果不说明，在绘制时image宽度和高度不会缩放

### 绘制
drawImage(image, dx, dy): 只有单纯的绘制功能，可以绘制图片、视频和别的Canvas对象等
``` ts
let canvas = document.getElementById("canvas");
const imgsrc = 'https://file.shangjinuu.com/image/lxcloud-vhr/user/icon202208/20220808152731000566293.jpg'

if (canvas.getContext) {
  let ctx = canvas.getContext("2d");
  var img = new Image();
  img.src = imgsrc
  img.onload = function(){
    ctx.drawImage(img, 0, 0);
  }
  ctx.fillText('123', 100, 100);
}
```

### 缩放
drawImage(image, dx, dy, dWidth, dHeight): 在绘制的基础上控制图片大小

### 裁剪
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight): 在缩放的基础上提供了裁剪功能

> 这种是按照原图大小进行裁剪后再根据 dx, dy, dWidth, dHeight 这些数据决定裁剪后的图片的 位置和大小

## 变形
### 保存状态
保存上一次状态，类似于栈结构
``` ts
ctx.fillStyle = "#cccccc";
ctx.fillRect(10, 10, 300, 100);
ctx.save(); // 保存状态
ctx.fillStyle = "#ee7034";
ctx.fillRect(10, 150, 300, 100);
ctx.restore(); // 还原到上次保存的状态
ctx.fillRect(10, 300, 300, 100);
```

### 平移 & 旋转 & 缩小
+ translate(x, y): 平移,参数分别为水平和垂直偏移量
+ rotate(x): 旋转
+ scale(x, y): 放大缩小,参数分别为x轴和y轴缩小,1为基础

``` ts
var ctx = canvas.getContext('2d');
ctx.fillStyle = "#ee7034";
ctx.translate(100, 200);
ctx.rotate(360*Math.PI/180); // 旋转360度
ctx.scale(1,2);
ctx.fillRect(10, 150, 300, 100);
```

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

``` ts
var ctx = canvas.getContext('2d');
var sin = Math.sin(Math.PI / 6);
var cos = Math.cos(Math.PI / 6);
ctx.translate(250, 250);
var c = 0;
for (var i=0; i <= 12; i++) {
  c = Math.floor(255 / 12 * i);
  ctx.fillStyle = `rgba(${c}, ${c}, ${c})`;
  ctx.beginPath() // 开启路径
  ctx.arc(60, 100, 100, 0, Math.PI*2, false);
  ctx.fill();
  ctx.transform(cos, sin, -sin, cos, 0, 0);
}
```

## 合成与裁剪
### 合成
合成篇幅有些长，可参考文章 [地址](https://juejin.cn/post/7119495608938790942#heading-36)

### 裁剪
+ clip(): 只是暴露出能显示的视图(默认为圆形),其他区域会覆盖不可见
+ clip(path, fillRule)
  + path为需要剪切的 Path2D 路径
  + fillRule为判断是在路径内还是在路径外，允许的值有 nonzero（默认值）：非零环绕原则，evenodd：奇偶环绕原则

裁剪
``` ts
ctx.arc(200, 200, 200, 0, Math.PI * 2, false)
ctx.clip()
const img = new Image()
img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191212%2F556cc408058d4c64a46468761406afe6.png&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660103116&t=8dd0c641e1e1890fa65ee80dfa428d34';
img.onload = () => {
  ctx.drawImage(img, 0, 0, 500, 500)
}
```

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
``` ts
let canvas = document.getElementById("canvas");
const imgsrc = 'https://file.shangjinuu.com/image/lxcloud-vhr/user/icon202208/20220808152731000566293.jpg'
const ctx = canvas.getContext('2d');

var img = new Image();
img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191212%2F556cc408058d4c64a46468761406afe6.png&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660103116&t=8dd0c641e1e1890fa65ee80dfa428d34';
img.onload = function(){
  // 创建圆形裁剪路径
  ctx.arc(250, 250, 200, 0, Math.PI*2, false);
  var path1 = new Path2D();
  path1.rect(100, 100, 300, 300);
  ctx.clip(path1);
  // 创建完后绘制
  ctx.drawImage(img, 0, 0, 500, 500);
}
```

## 动画
+ setInterval(function, delay): 定时器，当设定好间隔时间后，function 会定期执行
+ setTimeout(function, delay): 延时器，在设定好的时间之后执行函数
+ requestAnimationFrame(callback): 告诉浏览器你希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画

### demo
这边直接做一个地球太阳星际图demo来演示
``` ts
var ctx = canvas.getContext('2d');
var sun = new Image();
var moon = new Image();
var earth = new Image();
function init(){
  sun.src = 'https://img.lovepik.com/element/40097/4339.png_300.png';
  moon.src = 'https://www.freepnglogos.com/uploads/moon-png/moon-png-annual-celestial-overview-simone-matthews-18.png';
  earth.src = 'https://www.freepnglogos.com/uploads/moon-png/moon-png-annual-celestial-overview-simone-matthews-18.png';
  window.requestAnimationFrame(draw);

  var ctx = document.getElementById('canvas').getContext('2d');
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.globalCompositeOperation = 'destination-over'; // 让太阳为背景图的关键属性
  ctx.clearRect(0, 0, 700, 700);

  ctx.save(); // 第一次保存画布状态
  ctx.translate(350, 350);

  // 地球
  var time = new Date();
  var earthDeg = ((Math.PI * 2) / 60) * time.getSeconds() + ((Math.PI * 2) / 60000) * time.getMilliseconds()
  ctx.rotate(earthDeg);
  ctx.translate(200, 0);
  ctx.drawImage(earth, -20, -20, 40, 40);

  // 月亮
  var moonDeg = ((2 * Math.PI) / 2) * time.getSeconds() + ((2 * Math.PI) / 2000) * time.getMilliseconds()
  ctx.rotate(moonDeg);
  ctx.translate(0, 40);
  ctx.drawImage(moon, -10, -10, 20, 20);

  ctx.restore();

  // 海王星
  ctx.save();
  ctx.translate(350, 350);
  var time2 = new Date();
  var earthDeg = ((Math.PI * 2) / 6) * time2.getSeconds() + ((Math.PI * 2) / 6000) * time2.getMilliseconds()
  ctx.rotate(earthDeg);
  ctx.translate(300, 0);
  ctx.drawImage(earth, -40, -40, 80, 80);

  ctx.restore();

  // 轨迹线
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.arc(350, 350, 200, 0, 2*Math.PI )
  ctx.stroke()

  // 太阳
  ctx.drawImage(sun, 0, 0, 700, 700);

  window.requestAnimationFrame(draw);
}
init()
```
### 通过demo明确的问题
1. 如何把太阳系图片当做背景的
> ctx.globalCompositeOperation 属性可以规定上下层级，还可以规定显影等等

2. 地球是如何绕着中心走的
> 先旋转 + 后平移
> 这里有两个注意点：
> 1.旋转1度是这样写的 rotate(1*Math.PI/180),仔细思考下就知道为什么啦
> 2.先旋转是自转多少角度，然后平移，这个水平平移不是水平平移，而是以原先点为矩形的左上角绘制一个直线来进行平移，同理垂直平移也不是真正的垂直，都是按照那个矩形来进行平移

3. 月亮是如何绕着地球走的
> 因为月亮的绘制是在地球后的，而绘制地球时的旋转以及位移我们还没有保存释放它，所以绘制月亮可以接着用它，在此基础上我们再加上月亮的自转和位移，就能达到此效果

4. 地球和海王星是如何一个在内圈一个在外圈的
> 旋转玩平移的时候x设置的大一些就能达到此效果，注意不能设置y的值，否则圆心会改变，由上面问题可知y轴的位移并不会垂直位移~

5. 球体的一个快一个慢怎么搞
> (Math.PI * 2) / 60 表示60秒转一圈
> (Math.PI * 2) / 6 表示6秒转一圈
> 注意: 需要加上毫秒的位移，否则会出现闪现

6. 旋转加平移好像不是预想中的那样(先旋转再平移是按照普通画图那样，试着去理解)
> 就像上面说的，起点位于矩形的左上角，然后基于此进行位移

## 高级动画
这里直接用一个 `小球移动demo` 来演示
``` ts
var ctx = canvas.getContext('2d');
var ball = {
  x: 100,
  y: 100,
  vx: 10,
  vy: 3,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};
function draw() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.draw();

  // 添加加速度
  ball.vy *= .99;
  ball.vy += .25; // 设置重力值，越大掉的越快
  // 添加速率
  ball.x += ball.vx;
  ball.y += ball.vy;
  // 添加边界
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
ball.draw();
```

### 通过demo明确的问题
+ 如何工程化的在页面绘制一个球
> 类似于demo一样，创建一个 ball 对象，内部有坐标的偏移量以及具体的绘制方法，外部需要更改绘制路径只需更改对象某个属性然后执行其绘制方法就可以，集中管理的效果

> 需要注意的是：在不需要残影效果时，我们还是用 ctx.clearRect(0, 0, canvas.width, canvas.height) 来清除上一帧绘制的球

+ 怎么让这个球动起来
``` js
ball.x += ball.vx;
ball.y += ball.vy;
```

> 与上个demo一样，利用 window.requestAnimationFrame() 来达到动画效果，需要注意的是要在内部对 ball 对象中的x，y进行递增,而这个递增的速度取决于 vx，vy 的大小

+ 怎么做到反弹的效果
``` js
if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
  ball.vy = -ball.vy;
}
if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
  ball.vx = -ball.vx;
}
```
> 就上面面的关键代码，在判断触边后就使递增变量设反，因为实际的移动值会加上这个设反了的递增变量(vx,vy)，所以也巧妙的达到了触底后反向移动

+ 怎么做到重力(加速度)的效果
``` js
ball.vy *= .99; // 这个是固定不变的
ball.vy += .25; // 这个值来控制重力值，越大则重力越大
```
1. 给球加上重力的效果，只需要更改 y 轴上的变量，所以只需要更改 vy 递增变量
2. `vy *=.99` 作用是为了保证回弹时会越弹越小，如果写成 `vy *=.90` 都不行,看起来重力效果就不是很自然
3. `vy += .25` 作用是为了能达到不匀速下降的效果，看起来像重力效果，这个值的大小会直接影响下降速度，也就是重力的大小
4. 这两句话在一起很巧妙，因为有 `*=.99` 的存在所以最后的递增值肯定会越来越小，而因为有 `+=.25` 也造成了一开始的下降加速度的效果，再加上反弹的效果，看起来非常拟真

+ 怎么做残影
``` ts
// ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

> 舍弃 ctx.clearRect() 的方式去清除上一帧画面，采用 ctx.fillRect() + 背景0.3透明 的方式去达到残影的效果

暂时不懂为什么能达到此效果，后面会跟进研究，只知道 `ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'` 中的 0.3 是个临界点，如果设置为 0.2 那么拖影会更长，但是会有副作用(画布的背景色会被影响到)，反之设置 0.4 不会有这样的效果，但是拖影会更短