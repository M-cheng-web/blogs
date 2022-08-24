# Demo 编写

## 待完成
+ ps调色盘 (正放形 / 圆形)
+ 太阳系地球月亮以及其他行星
+ 区域内的球的运动
+ 琉璃灯

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