# Demo-基础 编写

## 待完成
+ 如何在动画上面加跟随鼠标移动的圆?

## 编码-btoa & 解码-atob
``` ts
let encodedData = window.btoa("Hello, world"); // 编码
let decodedData = window.atob(encodedData);    // 解码
```

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

## 颜色动态渐变
``` ts
const canvas = document.getElementById('canvas');
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
```
