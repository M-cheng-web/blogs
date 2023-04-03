import{_ as i,c as o,C as l,N as a,x as t,a as n,o as c,D as r}from"./chunks/framework.78c68b71.js";const ut=JSON.parse('{"title":"实践一些简单效果","description":"","frontmatter":{},"headers":[],"relativePath":"graph/canvas/practice.md","lastUpdated":1671160240000}'),s={name:"graph/canvas/practice.md"},h=a('<h1 id="实践一些简单效果" tabindex="-1">实践一些简单效果 <a class="header-anchor" href="#实践一些简单效果" aria-label="Permalink to &quot;实践一些简单效果&quot;">​</a></h1><blockquote><p>本文是对 <a href="https://juejin.cn/post/7119495608938790942#heading-97" target="_blank" rel="noreferrer">https://juejin.cn/post/7119495608938790942#heading-97</a> 的总结</p></blockquote><h2 id="绘制形状" tabindex="-1">绘制形状 <a class="header-anchor" href="#绘制形状" aria-label="Permalink to &quot;绘制形状&quot;">​</a></h2><h3 id="直线" tabindex="-1">直线 <a class="header-anchor" href="#直线" aria-label="Permalink to &quot;直线&quot;">​</a></h3>',4),d=t("h3",{id:"三角形",tabindex:"-1"},[n("三角形 "),t("a",{class:"header-anchor",href:"#三角形","aria-label":'Permalink to "三角形"'},"​")],-1),x=t("h3",{id:"矩形",tabindex:"-1"},[n("矩形 "),t("a",{class:"header-anchor",href:"#矩形","aria-label":'Permalink to "矩形"'},"​")],-1),u=t("ul",null,[t("li",null,"strokeRect(x, y, width, height) // 绘制一个矩形的边框")],-1),_=t("ul",null,[t("li",null,"fillRect(x, y, width, height) // 绘制一个填充的矩形")],-1),g=t("ul",null,[t("li",null,"clearRect(x, y, width, height) // 清除指定矩形区域，让清除部分完全透明")],-1),m=t("h3",{id:"圆弧和圆",tabindex:"-1"},[n("圆弧和圆 "),t("a",{class:"header-anchor",href:"#圆弧和圆","aria-label":'Permalink to "圆弧和圆"'},"​")],-1),p=t("p",null,"arc(x, y, radius, startAngle, endAngle, anticlockwise)",-1),f=t("ul",null,[t("li",null,"x和Y为圆心的坐标"),t("li",null,"radius 为半径"),t("li",null,"startAngle 为圆弧或圆的开始位置"),t("li",null,"endAngle 为圆弧或圆的结束位置"),t("li",null,"anticlockwise是绘制的方向（不写默认为false，从顺时针方向）")],-1),b=t("h3",{id:"椭圆",tabindex:"-1"},[n("椭圆 "),t("a",{class:"header-anchor",href:"#椭圆","aria-label":'Permalink to "椭圆"'},"​")],-1),P=t("p",null,"ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)",-1),T=t("ul",null,[t("li",null,"x、y：椭圆的圆心位置"),t("li",null,"radiusX、radiusY：x轴和y轴的半径"),t("li",null,"rotation：椭圆的旋转角度，以弧度表示"),t("li",null,"startAngle：开始绘制点"),t("li",null,"endAngle：结束绘制点"),t("li",null,"anticlockwise：绘制的方向（默认顺时针），可选参数")],-1),y=t("h3",{id:"贝塞尔曲线",tabindex:"-1"},[n("贝塞尔曲线 "),t("a",{class:"header-anchor",href:"#贝塞尔曲线","aria-label":'Permalink to "贝塞尔曲线"'},"​")],-1),k=t("p",null,"quadraticCurveTo(cp1x, cp1y, x, y)",-1),v=t("ul",null,[t("li",null,"cp1x，cp1y 表示为一个控制点"),t("li",null,"x，y 为结束点")],-1),C=t("h3",{id:"三次贝塞尔曲线",tabindex:"-1"},[n("三次贝塞尔曲线 "),t("a",{class:"header-anchor",href:"#三次贝塞尔曲线","aria-label":'Permalink to "三次贝塞尔曲线"'},"​")],-1),w=t("p",null,"bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)",-1),S=t("ul",null,[t("li",null,"cp1x，cp1y为一个控制点"),t("li",null,"cp2x，cp2y为第二个控制点"),t("li",null,"x，y为结束点")],-1),q=a('<h2 id="绘制样式" tabindex="-1">绘制样式 <a class="header-anchor" href="#绘制样式" aria-label="Permalink to &quot;绘制样式&quot;">​</a></h2><h3 id="线条样式" tabindex="-1">线条样式 <a class="header-anchor" href="#线条样式" aria-label="Permalink to &quot;线条样式&quot;">​</a></h3><ul><li>lineWidth 线的粗细</li><li>lineCap 线段端点 (butt round square) 默认 butt</li><li>lineJoin 连接处的样式 (round bevel miter) 默认 miter</li><li>miterLimit 限制当两条线相交时交接处最大长度</li></ul><p>线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。</p><p>如果交点距离大于miterLimit值，连接效果会变成了 lineJoin = bevel 的效果</p><ul><li><p>setLineDash/getLineDash 设置虚线 绘制虚线/获取已绘制的虚线数组(如果是奇数的话会默认补位双数,这也是为什么下面的会补长)</p></li><li><p>lineDashOffset 设置虚线样式的起始偏移量</p></li></ul>',6),I=t("h3",{id:"透明度",tabindex:"-1"},[n("透明度 "),t("a",{class:"header-anchor",href:"#透明度","aria-label":'Permalink to "透明度"'},"​")],-1),A=t("h3",{id:"渐变",tabindex:"-1"},[n("渐变 "),t("a",{class:"header-anchor",href:"#渐变","aria-label":'Permalink to "渐变"'},"​")],-1),R=t("h4",{id:"线性渐变",tabindex:"-1"},[n("线性渐变 "),t("a",{class:"header-anchor",href:"#线性渐变","aria-label":'Permalink to "线性渐变"'},"​")],-1),D=t("ul",null,[t("li",null,"ctx.createLinearGradient(x1, y1, x2, y2) 设置渐变范围,参数分别为 起点的坐标和终点的坐标"),t("li",null,"ctx.gradient.addColorStop(offset, color) 设置渐变颜色,color就是颜色,offset 则是颜色的偏移值(0-1)")],-1),M=t("h4",{id:"径向渐变",tabindex:"-1"},[n("径向渐变 "),t("a",{class:"header-anchor",href:"#径向渐变","aria-label":'Permalink to "径向渐变"'},"​")],-1),V=t("p",null,"ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)参数分别为开始圆的坐标和半径以及结束圆的坐标和半径",-1),N=t("h3",{id:"图案样式",tabindex:"-1"},[n("图案样式 "),t("a",{class:"header-anchor",href:"#图案样式","aria-label":'Permalink to "图案样式"'},"​")],-1),W=t("p",null,"createPattern(image, type) 参数分别为：Image 参数可以是一个 Image 对象，也可以是一个 canvas 对象，Type 为图案绘制的类型，可用的类型分别有",-1),E=t("ul",null,[t("li",null,"repeat // 平铺"),t("li",null,"repeat-x // 不平铺"),t("li",null,"repeat-y // y轴平铺"),t("li",null,"no-repeat // x轴平铺")],-1),O=t("p",null,"PS: image 为参数",-1),L=t("p",null,"PS: canvas 为参数",-1),Y=t("h2",{id:"绘制文本",tabindex:"-1"},[n("绘制文本 "),t("a",{class:"header-anchor",href:"#绘制文本","aria-label":'Permalink to "绘制文本"'},"​")],-1),X=t("p",null,"描边: strokeText(text, x, y, maxWidth)",-1),$=t("ul",null,[t("li",null,"text: 文本内容"),t("li",null,"x，y: 文本开始位置"),t("li",null,"maxWidth: 最大长度(可选，当超出时会等比缩小字体)")],-1),B=t("p",null,"填充: fillText(text, x, y, maxWidth) 参数意思同上",-1),H=t("h3",{id:"文本样式",tabindex:"-1"},[n("文本样式 "),t("a",{class:"header-anchor",href:"#文本样式","aria-label":'Permalink to "文本样式"'},"​")],-1),j=t("ul",null,[t("li",null,"font 绘制文本样式 (默认的字体是 10px sans-serif)"),t("li",null,"textAlign 文本对齐方式 (left right center start end 默认值是 start)"),t("li",null,"direction 文本方向: ltr（文本方向从左向右）、rtl（文本方向从右向左）、inherit（根据情况继承 Canvas元素或者 Document ）默认值是 inherit"),t("li",null,"textBaseline 垂直对齐方式 (top、hanging、middle、alphabetic、ideographic和bottom 默认值是 alphabetic)"),t("li",null,"measureText 测量文本，返回一个 TextMetrics对象")],-1),z=t("h3",{id:"阴影",tabindex:"-1"},[n("阴影 "),t("a",{class:"header-anchor",href:"#阴影","aria-label":'Permalink to "阴影"'},"​")],-1),G=t("ul",null,[t("li",null,"shadowColor 阴影颜色"),t("li",null,"shadowOffsetX, shadowOffsetY x和y轴的阴影扩散度"),t("li",null,"shadowBlur 阴影模糊程度")],-1),J=a('<h2 id="绘制图片" tabindex="-1">绘制图片 <a class="header-anchor" href="#绘制图片" aria-label="Permalink to &quot;绘制图片&quot;">​</a></h2><p>drawImage (根据参数不同,有三种使用方式)</p><ul><li>image: 绘制到上下文的元素</li><li>sx、sy: 裁剪框的左上角X轴坐标和Y轴坐标</li><li>sWidth、sHeight: 裁剪框的宽度和高度</li><li>dx、dy: 绘制到上下文的元素，在上下文中左上角的X轴坐标和Y轴坐标</li><li>dWidth、dHeight: 绘制到上下文的元素，在上下文中绘制的宽度和高度,如果不说明，在绘制时image宽度和高度不会缩放</li></ul><h3 id="绘制" tabindex="-1">绘制 <a class="header-anchor" href="#绘制" aria-label="Permalink to &quot;绘制&quot;">​</a></h3><p>drawImage(image, dx, dy): 只有单纯的绘制功能，可以绘制图片、视频和别的Canvas对象等</p>',5),F=a('<h3 id="缩放" tabindex="-1">缩放 <a class="header-anchor" href="#缩放" aria-label="Permalink to &quot;缩放&quot;">​</a></h3><p>drawImage(image, dx, dy, dWidth, dHeight): 在绘制的基础上控制图片大小</p><h3 id="裁剪" tabindex="-1">裁剪 <a class="header-anchor" href="#裁剪" aria-label="Permalink to &quot;裁剪&quot;">​</a></h3><p>drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight): 在缩放的基础上提供了裁剪功能</p><blockquote><p>这种是按照原图大小进行裁剪后再根据 dx, dy, dWidth, dHeight 这些数据决定裁剪后的图片的 位置和大小</p></blockquote><h2 id="变形" tabindex="-1">变形 <a class="header-anchor" href="#变形" aria-label="Permalink to &quot;变形&quot;">​</a></h2><h3 id="保存状态" tabindex="-1">保存状态 <a class="header-anchor" href="#保存状态" aria-label="Permalink to &quot;保存状态&quot;">​</a></h3><p>保存上一次状态，类似于栈结构</p>',8),U=t("h3",{id:"平移-旋转-缩小",tabindex:"-1"},[n("平移 & 旋转 & 缩小 "),t("a",{class:"header-anchor",href:"#平移-旋转-缩小","aria-label":'Permalink to "平移 & 旋转 & 缩小"'},"​")],-1),K=t("ul",null,[t("li",null,"translate(x, y): 平移,参数分别为水平和垂直偏移量"),t("li",null,"rotate(x): 旋转"),t("li",null,"scale(x, y): 放大缩小,参数分别为x轴和y轴缩小,1为基础")],-1),Q=a('<h3 id="transform-settransform-resettransform" tabindex="-1">transform setTransform resetTransform <a class="header-anchor" href="#transform-settransform-resettransform" aria-label="Permalink to &quot;transform setTransform resetTransform&quot;">​</a></h3><ul><li>transform(a, b, c, d, e, f): 方法能将当前的变形矩阵乘上一个基于自身参数的矩阵</li><li>setTransform(a, b, c, d, e, f): 方法会将当前变形矩阵重置为单位矩阵，然后用相同的参数调用 transform 方法</li><li>resetTransform(): 方法为重置当前变形为单位矩阵。效果等同于调用 setTransform(1, 0, 0, 1, 0, 0)</li></ul><blockquote><p>需要注意的是transform方法和setTransform方法中如果任意一个参数是无限大（Infinity），那么变形矩阵也必须被标记为无限大，否则会抛出异常</p></blockquote><blockquote><p>暂时不明白这一块含义</p></blockquote><p>参数说明</p><ul><li>a：水平方向的缩放</li><li>b：竖直方向的倾斜偏移</li><li>c：水平方向的倾斜偏移</li><li>d：竖直方向的缩放</li><li>e：水平方向的移动</li><li>f：竖直方向的移动</li></ul>',6),Z=a('<h2 id="合成与裁剪" tabindex="-1">合成与裁剪 <a class="header-anchor" href="#合成与裁剪" aria-label="Permalink to &quot;合成与裁剪&quot;">​</a></h2><h3 id="合成" tabindex="-1">合成 <a class="header-anchor" href="#合成" aria-label="Permalink to &quot;合成&quot;">​</a></h3><p>合成的图形受限于绘制的顺序。如果我们不想受限于绘制的顺序，可以利用 globalCompositeOperation 属性来改变这种情况</p><ul><li>source-over // 默认值,在现有画布上下文之上绘制新图形</li><li>source-in // 新图形只在新图形和目标画布重叠的地方绘制,其他的都是透明的</li><li>source-out // 在不与现有画布内容重叠的地方绘制新图形</li><li>source-atop // 新图形只在与现有画布内容重叠的地方绘制</li><li>destination-over // 在现有的画布内容后面绘制新的图形</li><li>destination-in // 现有的画布内容保持在新图形和现有画布内容重叠的位置,其他的都是透明的</li><li>destination-out // 现有内容保持在新图形不重叠的地方</li><li>destination-atop // 现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的</li><li>lighter // 两个重叠图形的颜色是通过颜色值相加来确定的</li><li>copy // 只显示新图形</li><li>xor // 图像中，那些重叠和正常绘制之外的其他地方是透明的</li><li>multiply // 将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片</li><li>screen // 像素被倒转，相乘，再倒转，结果是一幅更明亮的图片</li><li>overlay // multiply 和 screen 的结合，原本暗的地方更暗，原本亮的地方更亮</li><li>darken // 保留两个图层中最暗的像素</li><li>lighten // 保留两个图层中最亮的像素</li><li>color-dodge // 将底层除以顶层的反置</li><li>color-burn // 将反置的底层除以顶层，然后将结果反过来</li><li>hard-light // 屏幕相乘（A combination of multiply and screen）类似于叠加，但上下图层互换了</li><li>soft-light // 用顶层减去底层或者相反来得到一个正值</li><li>difference // 一个柔和版本的强光（hard-light）,纯黑或纯白不会导致纯黑或纯白</li><li>exclusion // 和 difference 相似，但对比度较低</li><li>hue // 保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调（hue）</li><li>saturation // 保留底层的亮度（luma）和色调（hue），同时采用顶层的色度（chroma）</li><li>color // 保留了底层的亮度（luma），同时采用了顶层的色调 (hue) 和色度 (chroma)</li><li>luminosity // 保持底层的色调（hue）和色度（chroma），同时采用顶层的亮度（luma）</li></ul>',4),tt=t("h3",{id:"裁剪-1",tabindex:"-1"},[n("裁剪 "),t("a",{class:"header-anchor",href:"#裁剪-1","aria-label":'Permalink to "裁剪"'},"​")],-1),et=t("ul",null,[t("li",null,"clip(): 只是暴露出能显示的视图(默认为圆形),其他区域会覆盖不可见"),t("li",null,[n("clip(path, fillRule) "),t("ul",null,[t("li",null,"path为需要剪切的 Path2D 路径"),t("li",null,"fillRule为判断是在路径内还是在路径外，允许的值有 nonzero（默认值）：非零环绕原则，evenodd：奇偶环绕原则")])])],-1),lt=t("p",null,"裁剪",-1),nt=a("<p>Path2D 构造函数的一些方法</p><ul><li>addPath(): 添加一条新路径到对当前路径</li><li>closePath(): 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。 如果图形已经是封闭的或者只有一个点，那么此函数不会做任何操作</li><li>moveTo(): 将一个新的子路径的起始点移动到 (x，y) 坐标</li><li>lineTo(): 使用直线连接子路径的终点到 x, y 坐标</li><li>bezierCurveTo(): 添加一条三次贝赛尔曲线到当前路径。 该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改</li><li>quadraticCurveTo(): 添加一条二次贝赛尔曲线到当前路径</li><li>arc(): 添加一条圆弧路径。 圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束</li><li>arcTo(): 根据控制点和半径添加一条圆弧路径，使用直线连接前一个点</li><li>ellipse(): 添加一条椭圆路径。椭圆的圆心在（x,y）位置，半径分别是radiusX 和 radiusY ，按照anticlockwise （默认顺时针）指定的方向，从 startAngle 开始绘制，到 endAngle 结束</li><li>rect(): 创建一条矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height</li></ul><p>示例: Path2D生成矩形裁剪图形</p>",3),at=a('<h2 id="动画" tabindex="-1">动画 <a class="header-anchor" href="#动画" aria-label="Permalink to &quot;动画&quot;">​</a></h2><ul><li>setInterval(function, delay): 定时器，当设定好间隔时间后，function 会定期执行</li><li>setTimeout(function, delay): 延时器，在设定好的时间之后执行函数</li><li>requestAnimationFrame(callback): 告诉浏览器你希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画</li></ul><p><a href="/blogs/graph/canvas/demo#区域内的球的运动-变色-反弹-拖影-重力">查看Demo</a></p><h2 id="高级动画" tabindex="-1">高级动画 <a class="header-anchor" href="#高级动画" aria-label="Permalink to &quot;高级动画&quot;">​</a></h2><p>高级动画就是在初级动画的基础上加上一些符合物理的运动，这样就能使动画更生动而不是那么的呆板</p><p><a href="/blogs/graph/canvas/demo#太阳系地球月亮以及其他行星-动画">查看Demo</a></p>',6);function it(ot,ct,rt,st,ht,dt){const e=r("CanvasDemo");return c(),o("div",null,[h,l(e,{code:`
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
