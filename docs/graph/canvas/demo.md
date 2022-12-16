# 基础Demo

## 三角形 (填充三角形,描边三角形,拼接一起的正方形)
<CanvasDemo
height="220"
code="
const ctx = canvas.getContext('2d');
ctx.moveTo(100, 100);
ctx.lineTo(100, 200);
ctx.lineTo(200, 100);
ctx.closePath();
ctx.stroke();
ctx.beginPath();
ctx.fillStyle = 'red'
ctx.moveTo(200, 100);
ctx.lineTo(200, 200);
ctx.lineTo(100, 200);
ctx.fill();
" />

## 笑脸
<CanvasDemo
width="600"
height="500"
code="
const ctx = canvas.getContext('2d');
ctx.arc(250, 250, 200, 0, Math.PI*2);
ctx.strokeStyle = 'red';
ctx.stroke();
ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.arc(150, 200, 50, 0, Math.PI, true);
ctx.moveTo(400, 200);
ctx.arc(350, 200, 50, 0, Math.PI, true);
ctx.moveTo(300, 350);
ctx.arc(250, 350, 50, 0, Math.PI, false);
ctx.stroke();
" />

## 多个小型圆形填充，且颜色渐变
<CanvasDemo
width="600"
height="500"
code="
const ctx = canvas.getContext('2d');
for (let x = 1; x < 25; x++) {
  for (let y = 1; y < 25; y++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${255-y*10}, ${255-x*10}, 255)`;
    ctx.arc(25 * x, 25 * y, 12, 0, Math.PI * 2);
    ctx.stroke();
  }
}
" />

## 太阳系地球月亮以及其他行星(动画)
<CanvasDemo
width="700"
height="700"
code="
const ctx = canvas.getContext('2d');
const sun = new Image();
const earth = new Image();
sun.src = 'https://img.lovepik.com/element/40097/4339.png_300.png';
earth.src = 'https://www.freepnglogos.com/uploads/moon-png/moon-png-annual-celestial-overview-simone-matthews-18.png';
function draw() {
  ctx.globalCompositeOperation = 'destination-over'
  ctx.clearRect(0, 0, 700, 700)
  ctx.save()
  // 地球
  ctx.translate(350, 350)
  const time1 = new Date()
  const x1 = (Math.PI*2 / 6) * time1.getSeconds() + (Math.PI*2 / 6000) * time1.getMilliseconds()
  ctx.rotate(x1)
  ctx.translate(170, 0)
  ctx.drawImage(earth, 0, 0, 40, 40)
  ctx.restore()
  ctx.save()
  // 行星
  ctx.translate(350, 350)
  const time = new Date()
  const x = (Math.PI*2 / 60) * time.getSeconds() + (Math.PI*2 / 60000) * time.getMilliseconds()
  ctx.rotate(x)
  ctx.translate(300, 0)
  ctx.arc(0, 0, 30, 0, Math.PI*2)
  ctx.fillStyle = 'blue'
  ctx.fill()
  // 月球
  ctx.beginPath()
  const time2 = new Date()
  const x2 = (Math.PI*2 / 6) * time2.getSeconds() + (Math.PI*2 / 6000) * time2.getMilliseconds()
  ctx.rotate(x2)
  ctx.translate(50, 0)
  ctx.arc(0, 0, 10, 0, Math.PI*2)
  ctx.fillStyle = 'yellow'
  ctx.fill()
  ctx.restore()
  // 圆环
  ctx.beginPath()
  ctx.arc(350, 350, 300, 0, Math.PI*2)
  ctx.strokeStyle = 'red'
  ctx.stroke()
  // 太阳
  ctx.beginPath()
  ctx.drawImage(sun, 0, 0, 700, 700);
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
" />

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

## 区域内的球的运动(变色+反弹+拖影+重力)
<CanvasDemo
width="700"
height="300"
code="
const ctx = canvas.getContext('2d');
const ball = {
  x: 0,
  y: 0,
  vx: 4,
  vy: 5,
  rgbaX: 0,
  rgbaY: 0,
  rgbaZ: 0,
  rgbaV: 1,
  draw: function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 20, 0, Math.PI*2)
    ctx.fillStyle = `rgba(${this.rgbaX}, ${this.rgbaY}, ${this.rgbaZ}, ${1})`
    const max = this.rgbaV === 1 ? 255 : 0;
    if (this.rgbaX === max && this.rgbaY === max && this.rgbaZ === max) {
      this.rgbaV = this.rgbaV === 1 ? -1 : 1
    } else if (this.rgbaY === max && this.rgbaZ === max) {
      this.rgbaX += this.rgbaV
    } else if (this.rgbaZ === max) {
      this.rgbaY += this.rgbaV
    } else {
      this.rgbaZ += this.rgbaV
    }
    ctx.fill()
    ctx.beginPath()
  }
}
function draw() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.fillRect(0, 0, 700, 700)
  ball.x += ball.vx
  ball.y += ball.vy
  if (ball.x > 700 || ball.x < 0) {
    ball.vx = -ball.vx
  }
  if (ball.y > 300 || ball.y < 0) {
    ball.vy = -ball.vy
  }
  // ball.vy *= .99 // 重力
  // ball.vy += 0.25
  ball.draw()
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
" />

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

## 琉璃灯
<CanvasDemo
width="700"
height="500"
code="
const ctx = canvas.getContext('2d');
let activeX = 1
let activeY = 1
let vx = 1
let vy = 1
let down = true
let color = 0
const num = 15
function changeColor() {
  color = color > 255 ? 0 : color + num
}
for (let x = 1; x <= num; x++) {
  for (let y = 1; y <= num; y++) {
    ctx.beginPath()
    ctx.strokeStyle = `rgb(${255-y*10},${255-x*10},255)`
    ctx.arc(30*x, 30*y, 15, 0, Math.PI*2)
    ctx.stroke()
  }
}
function draw() {
  for (let y = 1; y <= num; y++) {
    for (let x = 1; x <= num; x++) {
      if (x === activeX && y === activeY) {
        ctx.beginPath()
        ctx.arc(30*x, 30*y, 15, 0, Math.PI*2)
        ctx.fillStyle = down
          ? `rgb(${255-y*Math.floor(color/num)}, ${255-x*Math.floor(color/num)}, 255)`
          : `rgb(${255-y*Math.floor(color/num)}, ${255-x*Math.floor(color/num)}, 255)`
        ctx.fill()
      }
    }
  }
  if (activeX === num+1) {
    activeY += vy
    vx = -1
  } else if (activeX === 0) {
    activeY += vy
    vx = 1
  }
  if (activeY === num+1) {
    changeColor()
    down = false
    vy = -1
  } else if (activeY === 0) {
    changeColor()
    down = true
    vy = 1
  }
  activeX += vx
  ctx.beginPath()
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
"
/>

## 颜色动态渐变
<CanvasDemo
width="700"
height="500"
code="
const ctx = canvas.getContext('2d');
const colorObj = {
  rgbx: 255,
  rgby: 0,
  rgbz: 0,
  step: 1,
  lucid: 1,
  changeRGB() {
    // 颜色周期变化规则为:
    // 1: 255,0,0
    // 2: 255,255,0
    // 3: 0,255,0
    // 4: 0,255,255
    // 5: 0,0,255
    // 6: 255,0,255
    // 7: 255,0,0
    switch (this.step) {
      case 1:
        this.rgby++
        if (this.rgby === 255) this.step = 2
        break;
      case 2:
        this.rgbx--
        if (this.rgbx === 0) this.step = 3
        break;
      case 3:
        this.rgbz++
        if (this.rgbz === 255) this.step = 4
        break;
      case 4:
        this.rgby--
        if (this.rgby === 0) this.step = 5
        break;
        case 5:
          this.rgbx++
          if (this.rgbx === 255) this.step = 6
        break;
      case 6:
        this.rgbz--
        if (this.rgbz === 0) this.step = 1
        break;
    }
  },
  draw() {
    ctx.clearRect(0, 0, 500, 500)
    ctx.globalCompositeOperation = 'destination-over';
    const gradient1 = ctx.createLinearGradient(0, 0, 500, 0)
    gradient1.addColorStop(0, '#fff');
    gradient1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, 500, 500);
    ctx.beginPath();
    const gradient2 = ctx.createLinearGradient(0, 0, 0, 500)
    gradient2.addColorStop(0, `rgb(${this.rgbx}, ${this.rgby}, ${this.rgbz})`);
    gradient2.addColorStop(1, '#000000');
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, 500, 500);
  }
}
function draw() {
  colorObj.changeRGB()
  colorObj.draw()
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
"
/>




