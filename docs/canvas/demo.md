# Demo 编写

## 在线ps功能点
+ 保存图片到本地下载 + 生成链接
+ 吸色笔
+ 反相颜色图片
+ 抠图(也就是白底图)
+ 旋转+裁剪(要带有量线)
+ 橡皮擦
+ 合成多个图片
+ 调整多个图片的层级
+ 添加文字(双指操作等等)
+ 添加水印 (考虑是否做暗水印)
+ 消除笔
+ 添加贴纸(上传图片然后以特定形状展示合成)
+ 回退前进功能
+ 饱和度 + 清晰度 + 亮度 + 对比度 + 色温 + 色调
+ 滤镜
+ 生成svg(是否生成动画，如果要做拼成动画的又是另外一个大类了)

## 待完成
+ ps调色盘 (正放形 / 圆形)


## 三角形 (填充三角形,描边三角形,拼接一起的正方形)
![](https://s6.jpg.cm/2022/08/23/PVSGyi.png)
``` ts
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.moveTo(100, 100);
ctx.lineTo(100, 200);
ctx.lineTo(200, 100);
ctx.closePath()
ctx.stroke()
ctx.beginPath()
ctx.fillStyle = 'red'
ctx.moveTo(200, 100);
ctx.lineTo(200, 200)
ctx.lineTo(100, 200)
ctx.fill()
```

## 笑脸
![](https://s6.jpg.cm/2022/08/23/PVSYYW.png)
``` ts
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.arc(250, 250, 200, 0, Math.PI*2)
ctx.strokeStyle = 'red'
ctx.stroke()
ctx.beginPath()
ctx.strokeStyle = 'blue'
ctx.arc(150, 200, 50, 0, Math.PI, true)
ctx.moveTo(400, 200)
ctx.arc(350, 200, 50, 0, Math.PI, true)
ctx.moveTo(300, 350)
ctx.arc(250, 350, 50, 0, Math.PI, false)
ctx.stroke()
```

## 多个小型圆形填充，且颜色渐变
![](https://s6.jpg.cm/2022/08/23/PVrYLH.png)
``` ts
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
for (let x = 1; x < 25; x++) {
  for (let y = 1; y < 25; y++) {
    ctx.beginPath()
    ctx.strokeStyle = `rgb(${255-y*10},${255-x*10},255)`
    ctx.arc(25*x, 25*y, 12, 0, Math.PI*2);
    ctx.stroke()
  }
}
```

## 太阳系地球月亮以及其他行星(动画)
![](https://s6.jpg.cm/2022/08/24/PV0ruU.png)
``` ts
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sun = new Image();
const earth = new Image();
sun.src = 'https://img.lovepik.com/element/40097/4339.png_300.png';
earth.src = 'https://www.freepnglogos.com/uploads/moon-png/moon-png-annual-celestial-overview-simone-matthews-18.png';

function draw() {
  ctx.globalCompositeOperation = 'destination-over';
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
```



## 区域内的球的运动(变色+反弹+拖影+重力)
![](https://s6.jpg.cm/2022/08/25/PVZVey.gif)
``` ts
const canvas = document.getElementById('canvas');
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
```

## 琉璃灯
``` ts
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let activeX = 1
let activeY = 1
let vx = 1
let vy = 1
let down = true
let color = 0
const num = 15
changeColor = () => {
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
```


## asdasd
## asdasd