import{_ as i,c as o,C as l,N as a,x as t,a as n,o as c,D as r}from"./chunks/framework.78c68b71.js";const ut=JSON.parse('{"title":"实践一些简单效果","description":"","frontmatter":{},"headers":[],"relativePath":"graph/canvas/practice.md","lastUpdated":1671160240000}'),s={name:"graph/canvas/practice.md"},h=a("",4),d=t("h3",{id:"三角形",tabindex:"-1"},[n("三角形 "),t("a",{class:"header-anchor",href:"#三角形","aria-label":'Permalink to "三角形"'},"​")],-1),x=t("h3",{id:"矩形",tabindex:"-1"},[n("矩形 "),t("a",{class:"header-anchor",href:"#矩形","aria-label":'Permalink to "矩形"'},"​")],-1),u=t("ul",null,[t("li",null,"strokeRect(x, y, width, height) // 绘制一个矩形的边框")],-1),_=t("ul",null,[t("li",null,"fillRect(x, y, width, height) // 绘制一个填充的矩形")],-1),g=t("ul",null,[t("li",null,"clearRect(x, y, width, height) // 清除指定矩形区域，让清除部分完全透明")],-1),m=t("h3",{id:"圆弧和圆",tabindex:"-1"},[n("圆弧和圆 "),t("a",{class:"header-anchor",href:"#圆弧和圆","aria-label":'Permalink to "圆弧和圆"'},"​")],-1),p=t("p",null,"arc(x, y, radius, startAngle, endAngle, anticlockwise)",-1),f=t("ul",null,[t("li",null,"x和Y为圆心的坐标"),t("li",null,"radius 为半径"),t("li",null,"startAngle 为圆弧或圆的开始位置"),t("li",null,"endAngle 为圆弧或圆的结束位置"),t("li",null,"anticlockwise是绘制的方向（不写默认为false，从顺时针方向）")],-1),b=t("h3",{id:"椭圆",tabindex:"-1"},[n("椭圆 "),t("a",{class:"header-anchor",href:"#椭圆","aria-label":'Permalink to "椭圆"'},"​")],-1),P=t("p",null,"ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)",-1),T=t("ul",null,[t("li",null,"x、y：椭圆的圆心位置"),t("li",null,"radiusX、radiusY：x轴和y轴的半径"),t("li",null,"rotation：椭圆的旋转角度，以弧度表示"),t("li",null,"startAngle：开始绘制点"),t("li",null,"endAngle：结束绘制点"),t("li",null,"anticlockwise：绘制的方向（默认顺时针），可选参数")],-1),y=t("h3",{id:"贝塞尔曲线",tabindex:"-1"},[n("贝塞尔曲线 "),t("a",{class:"header-anchor",href:"#贝塞尔曲线","aria-label":'Permalink to "贝塞尔曲线"'},"​")],-1),k=t("p",null,"quadraticCurveTo(cp1x, cp1y, x, y)",-1),v=t("ul",null,[t("li",null,"cp1x，cp1y 表示为一个控制点"),t("li",null,"x，y 为结束点")],-1),C=t("h3",{id:"三次贝塞尔曲线",tabindex:"-1"},[n("三次贝塞尔曲线 "),t("a",{class:"header-anchor",href:"#三次贝塞尔曲线","aria-label":'Permalink to "三次贝塞尔曲线"'},"​")],-1),w=t("p",null,"bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)",-1),S=t("ul",null,[t("li",null,"cp1x，cp1y为一个控制点"),t("li",null,"cp2x，cp2y为第二个控制点"),t("li",null,"x，y为结束点")],-1),q=a("",6),I=t("h3",{id:"透明度",tabindex:"-1"},[n("透明度 "),t("a",{class:"header-anchor",href:"#透明度","aria-label":'Permalink to "透明度"'},"​")],-1),A=t("h3",{id:"渐变",tabindex:"-1"},[n("渐变 "),t("a",{class:"header-anchor",href:"#渐变","aria-label":'Permalink to "渐变"'},"​")],-1),R=t("h4",{id:"线性渐变",tabindex:"-1"},[n("线性渐变 "),t("a",{class:"header-anchor",href:"#线性渐变","aria-label":'Permalink to "线性渐变"'},"​")],-1),D=t("ul",null,[t("li",null,"ctx.createLinearGradient(x1, y1, x2, y2) 设置渐变范围,参数分别为 起点的坐标和终点的坐标"),t("li",null,"ctx.gradient.addColorStop(offset, color) 设置渐变颜色,color就是颜色,offset 则是颜色的偏移值(0-1)")],-1),M=t("h4",{id:"径向渐变",tabindex:"-1"},[n("径向渐变 "),t("a",{class:"header-anchor",href:"#径向渐变","aria-label":'Permalink to "径向渐变"'},"​")],-1),V=t("p",null,"ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)参数分别为开始圆的坐标和半径以及结束圆的坐标和半径",-1),N=t("h3",{id:"图案样式",tabindex:"-1"},[n("图案样式 "),t("a",{class:"header-anchor",href:"#图案样式","aria-label":'Permalink to "图案样式"'},"​")],-1),W=t("p",null,"createPattern(image, type) 参数分别为：Image 参数可以是一个 Image 对象，也可以是一个 canvas 对象，Type 为图案绘制的类型，可用的类型分别有",-1),E=t("ul",null,[t("li",null,"repeat // 平铺"),t("li",null,"repeat-x // 不平铺"),t("li",null,"repeat-y // y轴平铺"),t("li",null,"no-repeat // x轴平铺")],-1),O=t("p",null,"PS: image 为参数",-1),L=t("p",null,"PS: canvas 为参数",-1),Y=t("h2",{id:"绘制文本",tabindex:"-1"},[n("绘制文本 "),t("a",{class:"header-anchor",href:"#绘制文本","aria-label":'Permalink to "绘制文本"'},"​")],-1),X=t("p",null,"描边: strokeText(text, x, y, maxWidth)",-1),$=t("ul",null,[t("li",null,"text: 文本内容"),t("li",null,"x，y: 文本开始位置"),t("li",null,"maxWidth: 最大长度(可选，当超出时会等比缩小字体)")],-1),B=t("p",null,"填充: fillText(text, x, y, maxWidth) 参数意思同上",-1),H=t("h3",{id:"文本样式",tabindex:"-1"},[n("文本样式 "),t("a",{class:"header-anchor",href:"#文本样式","aria-label":'Permalink to "文本样式"'},"​")],-1),j=t("ul",null,[t("li",null,"font 绘制文本样式 (默认的字体是 10px sans-serif)"),t("li",null,"textAlign 文本对齐方式 (left right center start end 默认值是 start)"),t("li",null,"direction 文本方向: ltr（文本方向从左向右）、rtl（文本方向从右向左）、inherit（根据情况继承 Canvas元素或者 Document ）默认值是 inherit"),t("li",null,"textBaseline 垂直对齐方式 (top、hanging、middle、alphabetic、ideographic和bottom 默认值是 alphabetic)"),t("li",null,"measureText 测量文本，返回一个 TextMetrics对象")],-1),z=t("h3",{id:"阴影",tabindex:"-1"},[n("阴影 "),t("a",{class:"header-anchor",href:"#阴影","aria-label":'Permalink to "阴影"'},"​")],-1),G=t("ul",null,[t("li",null,"shadowColor 阴影颜色"),t("li",null,"shadowOffsetX, shadowOffsetY x和y轴的阴影扩散度"),t("li",null,"shadowBlur 阴影模糊程度")],-1),J=a("",5),F=a("",8),U=t("h3",{id:"平移-旋转-缩小",tabindex:"-1"},[n("平移 & 旋转 & 缩小 "),t("a",{class:"header-anchor",href:"#平移-旋转-缩小","aria-label":'Permalink to "平移 & 旋转 & 缩小"'},"​")],-1),K=t("ul",null,[t("li",null,"translate(x, y): 平移,参数分别为水平和垂直偏移量"),t("li",null,"rotate(x): 旋转"),t("li",null,"scale(x, y): 放大缩小,参数分别为x轴和y轴缩小,1为基础")],-1),Q=a("",6),Z=a("",4),tt=t("h3",{id:"裁剪-1",tabindex:"-1"},[n("裁剪 "),t("a",{class:"header-anchor",href:"#裁剪-1","aria-label":'Permalink to "裁剪"'},"​")],-1),et=t("ul",null,[t("li",null,"clip(): 只是暴露出能显示的视图(默认为圆形),其他区域会覆盖不可见"),t("li",null,[n("clip(path, fillRule) "),t("ul",null,[t("li",null,"path为需要剪切的 Path2D 路径"),t("li",null,"fillRule为判断是在路径内还是在路径外，允许的值有 nonzero（默认值）：非零环绕原则，evenodd：奇偶环绕原则")])])],-1),lt=t("p",null,"裁剪",-1),nt=a("",3),at=a("",6);function it(ot,ct,rt,st,ht,dt){const e=r("CanvasDemo");return c(),o("div",null,[h,l(e,{code:`
let ctx = canvas.getContext('2d');
ctx.moveTo(20, 20);
ctx.lineTo(60, 60);
ctx.stroke();
`}),d,l(e,{code:`
let ctx = canvas.getContext('2d');
ctx.moveTo(0, 0);
ctx.lineTo(200, 0);
ctx.lineTo(0, 100);
ctx.lineTo(0, 0);
ctx.stroke();
`}),x,u,l(e,{code:`
let ctx = canvas.getContext('2d');
ctx.strokeRect(0, 0, 100, 100);
`}),_,l(e,{code:`
let ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, 100, 100);
`}),g,l(e,{height:"150",code:`
let ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, 300, 130);
ctx.clearRect(0,0, 100, 100);
`}),m,p,f,l(e,{height:"300",width:"500",code:`
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
`}),b,P,T,l(e,{width:"500",height:"200",code:`
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.ellipse(200, 120, 100, 100, 0, 0, Math.PI, true);
ctx.closePath();
ctx.stroke();
`}),y,k,v,l(e,{height:"200",code:`
let ctx = canvas.getContext('2d');
ctx.moveTo(50, 50);
ctx.quadraticCurveTo(10, 200, 300, 50);
ctx.stroke();
`}),C,w,S,l(e,{height:"200",code:`
let ctx = canvas.getContext('2d');
ctx.moveTo(50, 50);
ctx.bezierCurveTo(10, 200, 200, -100, 300, 150);
ctx.stroke();
`}),q,l(e,{height:"200",code:`
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.lineWidth=6;
ctx.setLineDash([5, 10, 20]); // 此时 ctx.getLineDash() 结果为 [5, 10, 20, 5, 10, 20]
ctx.moveTo(30, 30);
ctx.lineTo(100, 180);
ctx.stroke();
ctx.closePath();
`}),I,l(e,{height:"300",code:`
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
`}),A,R,D,l(e,{width:"500",height:"300",code:`
let ctx = canvas.getContext('2d');
ctx.beginPath();
const gradient = ctx.createLinearGradient(0, 0, 500, 280)
gradient.addColorStop(0, '#000');
gradient.addColorStop(1, '#ff0000');
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 500, 280);
`}),M,V,l(e,{width:"200",height:"200",code:`
let ctx = canvas.getContext('2d');
ctx.beginPath();
const gradient1 = ctx.createRadialGradient(100, 100, 100, 100, 100, 60);
gradient1.addColorStop(0, '#000');
gradient1.addColorStop(1, '#ff0000');
ctx.fillStyle = gradient1;
ctx.fillRect(0, 0, 200, 200);
`}),N,W,E,O,l(e,{width:"200",height:"200",code:`
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/icon.3so9gi79i940.webp';
img.onload = () => {
  let ptrn = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = ptrn;
  ctx.fillRect(0, 0, 200, 200);
}
`}),L,l(e,{width:"400",height:"200",code:`
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
`}),Y,X,$,B,l(e,{code:`
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.strokeText('1. 我是 strokeText 绘制文本', 10, 20);
ctx.fillText('2. 我是 fillText 绘制文本', 10, 40);
`}),H,j,l(e,{width:"700",code:`
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
`}),z,G,l(e,{width:"700",code:`
let ctx = canvas.getContext('2d');
ctx.shadowColor='black';
ctx.shadowBlur=20;
ctx.shadowOffsetX=10;
ctx.shadowOffsetY=10;
ctx.fillStyle='blue';
ctx.fillRect(20, 20, 50, 50);
`}),J,l(e,{width:"700",height:"160",code:`
const imgsrc = 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/logo.ocqmygd2csw.webp'
let ctx = canvas.getContext('2d');
const img = new Image();
img.src = imgsrc
img.onload = function(){
  ctx.drawImage(img, 10, 10);
}
ctx.font='30px sans-serif';
ctx.fillText('123', 100, 100);
`}),F,l(e,{width:"700",height:"150",code:`
let ctx = canvas.getContext('2d');
ctx.fillStyle = '#ccc';
ctx.fillRect(10, 10, 100, 100);
ctx.save(); // 保存状态
ctx.fillStyle = '#ee7034';
ctx.fillRect(150, 10, 200, 100);
ctx.restore(); // 还原到上次保存的状态
ctx.fillRect(400, 10, 100, 100);
`}),U,K,l(e,{width:"700",height:"200",code:`
let ctx = canvas.getContext('2d');
ctx.fillStyle = '#ee7034';
ctx.translate(20, 40);
ctx.rotate(360 * Math.PI / 180); // 旋转360度
ctx.scale(2, 2);
ctx.fillRect(0, 0, 50, 50);
`}),Q,l(e,{width:"700",height:"460",code:`
let ctx = canvas.getContext('2d');
let sin = Math.sin(Math.PI / 6);
let cos = Math.cos(Math.PI / 6);
ctx.translate(250, 250);
let c = 0;
for (let i=0; i <= 12; i++) {
  c = Math.floor(255 / 12 * i);
  ctx.fillStyle = \`rgba(\${c}, \${c}, \${c})\`;
  ctx.beginPath() // 开启路径
  ctx.arc(60, 100, 100, 0, Math.PI*2);
  ctx.fill();
  ctx.transform(cos, sin, -sin, cos, 0, 0);
}
`}),Z,l(e,{width:"700",height:"200",code:`
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
`}),tt,et,lt,l(e,{width:"700",height:"200",code:`
let ctx = canvas.getContext('2d');
ctx.arc(100, 100, 100, 0, Math.PI * 2)
ctx.clip()
const img = new Image()
img.src = 'https://cdn.staticaly.com/gh/M-cheng-web/image-provider@main/blog/misty_forest_4k-wallpaper-1920x1080.4gmt2eh3anc0.webp';
img.onload = () => {
  ctx.drawImage(img, 0, 0, 500, 500)
}
`}),nt,l(e,{width:"700",height:"200",code:`
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
`}),at])}const _t=i(s,[["render",it]]);export{ut as __pageData,_t as default};
