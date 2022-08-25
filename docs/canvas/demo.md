# Demo 编写

## 待完成
+ 琉璃灯
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



## 区域内的球的运动
``` ts

```

## asdasd
## asdasd
## asdasd