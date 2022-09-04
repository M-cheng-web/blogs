# Demo-进阶 编写

## 在线ps功能点
+ 吸色笔
+ 反相颜色图片
+ 移动图片
+ 坐标线
+ 缩小放大
+ 抠图(也就是白底图)
+ 旋转+裁剪(要带有量线)
+ 橡皮擦
+ 合成多个图片
+ 调整多个图片的层级(多图层)
+ 添加文字(双指操作等等)
+ 添加水印 (考虑是否做暗水印)
+ 消除笔
+ 添加贴纸(上传图片然后以特定形状展示合成)
+ 回退前进功能
+ 饱和度 + 清晰度 + 亮度 + 对比度 + 色温 + 色调
+ 滤镜
+ 添加一些自有的动画？webgl封装的？
+ 生成svg(是否生成动画,如果要做拼成动画的又是另外一个大类了)
+ 转换格式
+ 支持不同格式图片渲染,导出不同格式+生成链接的形式
+ 压缩图片
+ 快速选中区域
+ 粘贴转图片
+ 右键菜单功能

### 一期
1. 导入导出
2. 拖动放大缩小
3. 裁剪
4. 回退 + 前进
5. 反相颜色图片

## 待完成
+ 反相颜色
+ 像素数据
+ 刮刮乐(待完善)

## ps调色盘(当前颜色，更换主题色，浮动的圆圈)
![P899Ge.png](https://s6.jpg.cm/2022/08/30/P899Ge.png)
``` ts
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>canvas - 裁剪</title>
    <style>
      #canvas {
        box-shadow: 0px 0px 5px #ccc;
      }
      #canvas-color,
      #canvas-lucid {
        margin-left: 20px;
        box-shadow: 0px 0px 5px #ccc;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas" width="500" height="500"></canvas>
    <canvas id="canvas-color" width="40" height="500"></canvas>
    <canvas id="canvas-lucid" width="40" height="500"></canvas>
    <div id="rgb">rgb</div>
    <div id="rgba">rgba</div>
    <div id="hex">hex</div>
    <br />
    <div>设置主题色</div>
    R:<input
      id="r"
      oninput="changInput(event, 'r')"
      type="number"
      min="0"
      max="255"
      style="width: 100px"
    />
    G:<input
      id="g"
      oninput="changInput(event, 'g')"
      type="number"
      min="0"
      max="255"
      style="width: 100px"
    />
    B:<input
      id="b"
      oninput="changInput(event, 'b')"
      type="number"
      min="0"
      max="255"
      style="width: 100px"
    />

    <script>
      const r = document.getElementById("r");
      const g = document.getElementById("g");
      const b = document.getElementById("b");
      r.value = 255;
      g.value = 0;
      b.value = 0;

      function getColor(ctx, x, y) {
        const imageData = ctx.getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        const rs = pixel[0];
        const gs = pixel[1];
        const bs = pixel[2];
        let as = pixel[3] / 255;
        as = Math.round(as * 100) / 100;

        let rHex = rs.toString(16);
        let gHex = gs.toString(16);
        let bHex = bs.toString(16);
        rs < 16 && (rHex = "0" + rHex);
        gs < 16 && (gHex = "0" + gHex);
        bs < 16 && (bHex = "0" + bHex);

        const rgbaColor = "rgba(" + rs + "," + gs + "," + bs + "," + as + ")";
        const rgbColor = "rgb(" + rs + "," + gs + "," + bs + ")";
        const hexColor = "#" + rHex + gHex + bHex;

        setText(rgbColor, rgbaColor, hexColor);
        return [rs, gs, bs];
      }

      function setText(rgb, rgba, hex) {
        const a = document.getElementById("rgb");
        const b = document.getElementById("rgba");
        const c = document.getElementById("hex");
        rgb && (a.textContent = rgb)
        rgba && (b.textContent = rgba)
        hex && (c.textContent = hex)
      }

      function changInput(e, type) {
        const value = Number(e.target.value);
        if (value >= 0 && value <= 255) {
          switch (type) {
            case "r":
              colorObj.rgbx = value;
              break;
            case "g":
              colorObj.rgby = value;
              break;
            case "b":
              colorObj.rgbz = value;
              break;
          }
          // 这里暂时不改 step
          colorObj.drawBg();
        } else {
          e.target.value = "";
        }
      }
    </script>

    <script>
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      const colorObj = {
        rgbx: 255,
        rgby: 0,
        rgbz: 0,
        lucid: 1,
        step: 1,
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
              this.rgby++;
              if (this.rgby === 255) this.step = 2;
              break;
            case 2:
              this.rgbx--;
              if (this.rgbx === 0) this.step = 3;
              break;
            case 3:
              this.rgbz++;
              if (this.rgbz === 255) this.step = 4;
              break;
            case 4:
              this.rgby--;
              if (this.rgby === 0) this.step = 5;
              break;
            case 5:
              this.rgbx++;
              if (this.rgbx === 255) this.step = 6;
              break;
            case 6:
              this.rgbz--;
              if (this.rgbz === 0) this.step = 1;
              break;
          }
        },
        drawBg() {
          ctx.clearRect(0, 0, 500, 500);

          const gradient1 = ctx.createLinearGradient(0, 0, 500, 0);
          gradient1.addColorStop(0, "#fff");
          gradient1.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gradient1;
          ctx.fillRect(0, 0, 500, 500);

          ctx.globalCompositeOperation = "destination-over";

          ctx.beginPath();
          const gradient2 = ctx.createLinearGradient(0, 0, 0, 500);
          gradient2.addColorStop(
            0,
            `rgb(${this.rgbx}, ${this.rgby}, ${this.rgbz})`
          );
          gradient2.addColorStop(1, "#000000");
          ctx.fillStyle = gradient2;
          ctx.fillRect(0, 0, 500, 500);
        },
        drawBall(x, y) {
          ctx.clearRect(0, 0, 500, 500);
          colorObj.drawBg();
          ctx.beginPath();
          ctx.globalCompositeOperation = "source-over";
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          this.strokeStyle = "white";
          ctx.stroke();
          getColor(ctx, x, y);
        }
      };

      colorObj.drawBg();
      canvas.addEventListener("mousemove", function (e) {
        colorObj.drawBall(e.offsetX, e.offsetY);
      });
    </script>

    <script>
      const canvasColor = document.getElementById("canvas-color");
      const ctxColor = canvasColor.getContext("2d");

      const drawColor = {
        colorArr: [
          "255,0,0",
          "255,255,0",
          "0,255,0",
          "0,255,255",
          "0,0,255",
          "255,0,255",
          "255,0,0",
        ],
        drawBg() {
          const gradient = ctxColor.createLinearGradient(0, 0, 0, 500);
          for (let i = 0; i < this.colorArr.length; i++) {
            gradient.addColorStop(i / this.colorArr.length, `rgb(${this.colorArr[i]})`);
          }
          ctxColor.fillStyle = gradient;
          ctxColor.fillRect(0, 0, 40, 500);
        },
        drawRect(x, y) {
          if (y >= 494 || y <= 0) return;
          ctxColor.clearRect(0, 0, 40, 500);
          this.drawBg();
          ctxColor.beginPath();
          ctxColor.globalCompositeOperation = "source-over";
          ctxColor.strokeRect(0, y, 40, 6);
          ctxColor.strokeStyle = "#000";

          const colorRes = getColor(ctxColor, 20, y - 5);
          colorObj.rgbx = colorRes[0];
          colorObj.rgby = colorRes[1];
          colorObj.rgbz = colorRes[2];
          colorObj.drawBg();

          lucidObj.setRgb(colorRes.join())
        }
      }
      drawColor.drawBg();
      canvasColor.addEventListener("mousemove", function (e) {
        drawColor.drawRect(e.offsetX, e.offsetY);
      });
    </script>

    <script>
      const canvasLucid = document.getElementById("canvas-lucid");
      const ctxLucid = canvasLucid.getContext("2d");
      const lucidObj = {
        rgb: '255,0,0',
        setRgb(rgb) {
          this.rgb = rgb;
          this.drawBg()
        },
        drawBg() {
          const gradient = ctxLucid.createLinearGradient(0, 0, 0, 500);
          gradient.addColorStop(0, `rgb(${this.rgb})`);
          gradient.addColorStop(0.94, `rgb(255,255,255)`);
          ctxLucid.fillStyle = gradient;
          ctxLucid.fillRect(0, 0, 40, 500);
        },
        drawRect(x, y) {
          ctxLucid.clearRect(0, 0, 40, 500);
          this.drawBg();
          ctxLucid.beginPath();
          ctxLucid.globalCompositeOperation = "source-over";
          ctxLucid.strokeRect(0, y, 40, 6);
          ctxLucid.strokeStyle = "#000";

          colorObj.lucid = (500-y)/500;
          const { rgbx, rgby, rgbz, lucid } = colorObj;
          const rgbaColor = `rgba(${rgbx},${rgby},${rgbz},${lucid})`;
          document.getElementById("rgba").textContent = rgbaColor;
        }
      }
      lucidObj.drawBg()
      canvasLucid.addEventListener("mousemove", function (e) {
        lucidObj.drawRect(e.offsetX, e.offsetY);
      });
    </script>
  </body>
</html>
```

## 刮刮乐(待完善)
``` html
 <body>
<canvas id="canvas" width="500" height="500"></canvas>
<canvas id="canvasText" width="500" height="500"></canvas>

<script>
  const canvasText = document.getElementById("canvasText");
  const ctxText = canvasText.getContext("2d");
  ctxText.font = "40px 微软雅黑";
  ctxText.strokeText("zxczxc", 200, 200);
  ctxText.fill();
</script>

<script>
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 500, 500);

  canvas.addEventListener("mousemove", function (e) {
    ctx.clearRect(e.offsetX, e.offsetY, 50, 50)
  });
</script>
</body>

<style>
#canvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
}
</style>
```

## 保存图片
``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>canvas - 保存图片</title>
    <style>
      /* 给画布增加一个阴影和圆角的样式 */
      canvas {
        box-shadow: 0px 0px 5px #ccc;
        border-radius: 8px;
      }
      img {
        width: 500px;
        height: 500px;
        border: 1px solid red;
      }
      #btn {
        margin: 50px 0 50px 50px;
      }
      #btnDown {
        margin-left: 140px;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas" width="500" height="500"> </canvas>
    <img id="img" />
    <div>
      <button id="btn">转化为图片</button>
      <button id="btnDown">下载</button>
    </div>

    <script>
      const canvas = document.getElementById("canvas");
      const Img = document.getElementById("img");
      const Btn = document.getElementById("btn");
      const BtnDown = document.getElementById("btnDown");
      const ctx = canvas.getContext("2d");

      const ball = {
        x: 100,
        y: 100,
        vx: 1,
        vy: 3,
        radius: 25,
        color: "blue",
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.fillStyle = this.color;
          ctx.fill();
        },
      };
      function draw() {
        // 用带透明度的矩形代替清空
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ball.draw();
        // 添加加速度
        ball.vy *= 0.995;
        ball.vy += 0.15;
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

      Btn.addEventListener(
        "click",
        () => {
          const url = canvas.toDataURL("image/png");
          Img.src = url;
        },
        false
      );

      BtnDown.addEventListener(
        "click",
        () => {
          const url = Img.src;
          if (!url) return;
          const arr = url.split(",");
          const mime = arr[0].match(/:(.*?);/)[1]; // 此处得到的为文件类型
          const bstr = atob(arr[1]); // 此处将base64解码
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n); // 得到 UTF-16 字符串(例如 a -> 97)
          }

          const file = new File([u8arr], "filename", { type: mime });
          const aDom = document.createElement("a"); // 创建一个 a 标签
          aDom.download = file.name; // 设置文件名
          const href = URL.createObjectURL(file); // 得到本地获取 file 的链接
          aDom.href = href; // 放入href
          document.body.appendChild(aDom); // 将a标签插入 body
          aDom.click(); // 触发 a 标签的点击

          document.body.removeChild(aDom); // 移除刚才插入的 a 标签
          URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串 (释放了则通过生成的 href 是拿不到图片了的)
        },
        false
      );
    </script>
  </body>
</html>
```

## 反相颜色
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 保存图片</title>
  <style>
    /* 给画布增加一个阴影和圆角的样式 */
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      float: left;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="1000" height="500">
  </canvas>
  <button id="original">原本</button>
  <button id="grayscale">黑白</button>
  <button id="inverted">反相</button>
  <script>
    // 获取 canvas 元素
    const canvas = document.getElementById('canvas')
    const originalEl = document.getElementById('original')
    const grayscaleEl = document.getElementById('grayscale')
    const invertedEl = document.getElementById('inverted')
    const ctx = canvas.getContext('2d')

    const img = new Image()
    img.crossOrigin = 'anonymous' // 设置可以读取跨域图片的像素信息
    img.src = 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF'

    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      drawImg.original = () => {
        ctx.drawImage(img, 0, 0)
      }
    }

    const drawImg = {
      original() {},
      grayscale() {
        this.original()
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = img.data
        for (let i = 0; i < data.length; i += 4) {
          const arg = (data[i] + data[i + 1] + data[i + 2]) / 3
          data[i] = arg
          data[i + 1] = arg
          data[i + 2] = arg
        }
        ctx.putImageData(img, 0, 0)
      },
      inverted() {
        this.original()
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = img.data
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i]
          data[i + 1] = 255 - data[i + 1]
          data[i + 2] = 255 - data[i + 2]
        }
        ctx.putImageData(img, 0, 0)
      }
    }

    originalEl.addEventListener('click', () => {
      drawImg.original()
    })
    grayscaleEl.addEventListener('click', () => {
      drawImg.grayscale()
    })
    invertedEl.addEventListener('click', () => {
      drawImg.inverted()
    })
  </script>
</body>
</html>
```

## 像素数据
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>canvas - 保存图片</title>
  <style>
    canvas {
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="1000" height="500"></canvas>
  <div style="display: flex">
    <div id="bg" style="width: 200px; height: 500px;">划过的颜色</div>
    <div id="clickBg" style="width: 200px; height: 500px;">选中的颜色</div>
  </div>
  <script>
    // 获取 canvas 元素
    const canvas = document.getElementById('canvas')
    const bg = document.getElementById('bg')
    const clickBg = document.getElementById('clickBg')
    const ctx = canvas.getContext('2d')

    const img = new Image()
    img.crossOrigin = 'anonymous' // 设置可以读取跨域图片的像素信息
    img.src = 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF'

    img.onload = () => {
      ctx.drawImage(img, 0, 0)
    }

    const drawBG = (x, y, type) => {
      const data = ctx.getImageData(x, y, 1, 1).data
      const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
      bg.textContent = `划过的颜色: ${rgba}`
      bg.style.backgroundColor = rgba

      if (type === 'click') {
        clickBg.textContent = `选中的颜色: ${rgba}`
        clickBg.style.backgroundColor = rgba
      }
    }

    canvas.addEventListener('mousemove', e => {
      drawBG(e.offsetX, e.offsetY, 'move')
    })
    canvas.addEventListener('click', e => {
      drawBG(e.offsetX, e.offsetY, 'click')
    })
  </script>
</body>
</html>
```