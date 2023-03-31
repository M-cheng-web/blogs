# 埋点sdk
关于埋点的随时记录

+ 检查公网ip（开启了翻墙会被识别为翻墙后的ip）: http://myip.kkcha.com/
+ js检查ip（开启了翻墙不会被混淆） https://github.com/joeymalvinni/webrtc-ip
+ 这个能根据ip拿到具体地址（第一次进入会告诉你当前的ip） http://www.cip.cc/117.147.32.195 (http://www.cip.cc/ 后面拼你的ip，它会给你结果,暂时没找到api)

Grafana+Prometheus的详解以及使用(埋点) (https://zhuanlan.zhihu.com/p/351995351)

浏览器不是有个geolocation对象吗
直接就能拿到经纬度，不过是84坐标系的

有的，比较常用的是高德地图API和百度地图API，它们可以通过IP地址查询到对应的地理位置信息。
其中，高德地图API查询IP地址的接口为：https://restapi.amap.com/v5/ip
百度地图API查询IP地址的接口为：https://api.map.baidu.com/location/ip
使用这些API，您可以根据IP地址获取到城市、省份等位置信息，方便进行页面定位或相关业务处理。

## 编写过程中需参考
30. 内部：内部全局变量 GLOBAL_OBJ 的概念
30. 内部：fill(XMLHttpRequest.prototype, 'send', _wrapXHR); 这种替代方法不错
31. 内部：沿用 hub 的概念（单例模式，获取的都是同一个,getCurrentHub  getHubAndOptions）
32. 内部：劫持的方法应该也统一，封装一下


## 方案参考
1. ts重构
3. 流程应该再优化一下
4. 所用到的api应该再去调研一下，看看兼容性，有兼容性问题要做降级策略
5. 要适配web，uniapp，vue2，vue3，react（可以的话再适配一下Angular，nuxt）
7. 能达到让后台管理配置采集哪些数据的功能
8. readme 中英文版
9. 能不能做到给其他网站插入监控。。（找持久 xss 然后找 shell，基本各种 shell 都有，网站输入个东西都能拿到）
10. 用插件式的做法，参考神策(自己扩展了插件的话，怎么扩展回调呢，比如这个插件里面暴露了回调，我怎么在外面正常用呢)
11. 加密传输(动态加解密)
12. 神策的插件好像都可以用上，https://manual.sensorsdata.cn/sa/latest/web-17571615.html#id-%E6%8F%92%E4%BB%B6%E9%9B%86%E6%88%90(Web)-%E5%86%85%E7%BD%AE%E6%9C%AA%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6
13. 可不可以像cli一样，让用户自己选择想要的功能，我给他组装好，最后集成一套vue，react模板给用户快速上手也不错，接入其他cli
14. 可不可以考虑应该给用户一个选项，选择是否针对按钮，标签都给自动埋点，连标识都不用给（自动采集click事件，默认a input button textarea，当然可以扩展或者缩减，也可以根据层级来缩小范围）
15. 关于用户id (https://manual.sensorsdata.cn/sa/latest/page-109576379.html)
16. 用户信息这块应该多加点api给程序员
17. sendBeacon不支持有没有降级方案
18. 注册的公共属性应该也可以是个函数，sdk再通过函数去计算出来
19. 程序员想主动拿到sdk内部的信息时，提供一个api，比如可以获取（页面地址，页面标题，前向地址，SDK 类型及版本，屏幕宽高，路由记录，设备信息等）
20. 设置只采集哪些页面，这个好像Sentry提供了个类似的
21. 在每个事件触发之前，暴露api给用户，用户能传入回调去更改一些参数
22. 怎么满足用户对接自己后端或者直接给服务端，一个是用自己封装好的axios，一个是用sdk自带的image传这种(可以在真正发送的时候，暴露回调给用户,甚至这个也可以限定格式什么的)
23. 用户一定要可以控制什么时候加载sdk（涉及到隐私协议，同意之后再采集）
24. 客户在公司的4,5个网站之间跳转，怎么标识这是同一个客户，可以借鉴神策的多域名打通
25. 最终能不能达到，事件类型和参数用户都能自定义，而且能拿到现有的事件以及参数并且自定义(链式调用)
26. 未来希望能对代码层面进行监控(看看有没有github，引进来，给用户提示)
27. 支持动态设定一个按钮是否采集，比如属性后面挂一个false就是先不采集
28. try-catch 的异常我们能否自动捕捉(比如babel的ast节点中的catch节点类型，找到它，然后在traverse去添加上报函数,好像可以用 sentry的 Wrap函数? https://hellogithub2014.github.io/2018/07/22/sentry-source-code/)
29. jsx & tsx 的检测

插件式热加载
``` js
import sensors  from '/dist/web/sensorsdata.es6.js';
import sessionEvent  from '/dist/web/plugin/session-event/index.es6.js';

sensors.use(sessionEvent);
sensors.init({
	...初始化参数
})
```


``` js
function fill(obj, name, replacement, track) {
  if (obj == null) return;
  var orig = obj[name];
  obj[name] = replacement(orig);
  obj[name].__raven__ = true;
  obj[name].__orig__ = orig;
  if (track) {
    track.push([obj, name, orig]);
  }
}
```


## 问题
搞清楚这么多配置项，大的系统是怎么做的

1. 搞清楚分支管理，工作留，怎么打出alpha，beta，rc，正式版本
2. changelog (怎么快速回滚)
3. commitlint
4. eslint
5. 怎么减少服务端压力？ 1.前端日志抽样发送功能 2.前端可以将数据临时保存在Storage中并合并起来，隔一段时间发送一次日志（类似节流
6. 受网络和设备老化的影响，有一些数据并不能反映网站的性能，这时候可以过滤极值来保证数据的可靠性(这个得后台管理去过滤，采集端应该是纯净的，当然为了减少服务端压力也可以考虑这种)
7. 服务端可以暴露一个delete的接口，服务器自动删除老数据
8. 无埋点和全埋点
9. 做这个可能得去看看学习性能篇章了
11. 服务端怎么处理能查询2年以前的数据这种，怎么快查
12. 页面区域曝光度功能(牵扯到算法追踪规范？)
13. 埋点在线测试功能
14. 想在后台管理系统内取配置采集端应该采集什么数据
15. 报警策略设计-参考有赞天网-https://tech.youzan.com/mobileskynet/
16. 可以给vue2或者vue3提炼一些hooks，来方便采集，这个主意不错
17. 改进为无埋点的话，带来的流量消耗和数据计算成本也是业务不能接受的 - 这个度是多少，后期要调研一下
18. 将demo官网什么的放到自己的域名上
19. 报错的sourcemap-https://juejin.cn/post/7195496297150709821-https://github.com/getsentry/sentry-webpack-plugin（没有vite版本的，后续自己看看做个vite版本的吧，有现成的 https://github.com/ikenfin/vite-plugin-sentry）
20. 捕获到错误后，直接分配异常到代码编写者
21. 监控某些数据极速递增或者递减，不正常的访问量这些
22. lighthouse性能方向学习
23. sdk过大，加载慢怎么办
24. 设计类似生命周期的钩子一样的函数暴露出来
25. 或许可以不用多包的形式,做个类似于热拔插的样子，谁要用什么自取，而且sdk可以帮忙用户在取了不应该取的东西给出报错（在这个层面上，应该提供两个入口，一个是简易入口、让用户选择想要哪些，一个是复杂入口、用户需要自己配置需要的功能项）
26. 通过一个userId查询出用户的所有行为记录，以帮助开发者来复现用户的问题，如，用户细查，用户连线等
27. 站在产品和运营角度，考虑他们对各个系统需要怎样的监控、统计
28. img上传改为svg上传
29. Sentry: 如果启用 SDK，Vue 将不会在内部调用其 logError。因此，Vue 渲染器中发生的错误将不会显示在开发人员控制台中。要保留此功能，请传递 logErrors:true 选项。
30. Sentry: 设置环境变量
31. Sentry: 没有设置事件发送到哪的地址就不会触发
32. 区分多环境-链接事件地址不同
33. 区分不同事件类型设置不同的地址(比如错误捕捉和埋点捕捉分开)
34. Sentry：配置错误事件的采样率,事件是随机选择的（例如sampleRate: 0.25，后面可以提供一个方法供用户随时更改，或者说提供一个阈值sdk自己判断）
35. debug:在捕获到错误时控制台输出
36. Sentry:单个值在被截断之前可以具有的最大字符数（默认为 250）。
37. Sentry:是否开启Hooks
38. Sentry:此集成使用 Web 浏览器的在线和离线事件来检测何时没有可用的网络连接。如果离线，它会将事件保存到 Web 浏览器的客户端存储（通常是 IndexedDB），然后在网络连接恢复时自动上传事件。
39. Sentry:能否在后台完整展示用户的开始到结束，可以播放视频一样展示用户在线的时候做了什么（可参考：npm install --save @sentry/rrweb rrweb）
40. Sentry: release字段 是部署到环境中的代码版本(release: "my-project-name@2.3.12") 可以做到以下几点 +确定新版本中引入的问题和回归
+预测哪个提交导致了问题以及谁可能负责
+通过在提交消息中包含问题编号来解决问题
+部署代码时接收电子邮件通知
+此外，release用于将 source maps 应用于被压缩的 JavaScript 以查看原始的、未转换的源代码。
1.  后台管理系统应该能统计所有的错误，所有的用户信息这些
2.  Sentry: 设置过滤规则，错误过滤，统计过滤等等
``` js
Sentry.init({
  // ...
  // beforeSend 这些生命周期应该多设置一些，多调研一些
  beforeSend(event, hint) {
    const error = hint.originalException;
    if (
      error &&
      error.message &&
      error.message.match(/database unavailable/i)
    ) {
      event.fingerprint = ["database-unavailable"];
    }
    return event;
  },
  // 设置这个也行，然后里面也能兼容正则
  ignoreErrors: [
    // Random plugins/extensions
    "top.GLOBALS",
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    "originalCreateNotification",
    "canvas.co"
  ]
});
```
1.  放弃某些采集
``` js
Sentry.init({
 tracesSampler: samplingContext => {
    if ("...") {
      // Drop this transaction, by setting its sample rate to 0%
      return 0;
    } else {
      // Default sample rate for all others (replaces tracesSampleRate)
      return 0.1;
    }
  };
})
```
1.  本身提供了客户突然关闭网页的情况采集，但可以暴露一个生命周期来告诉程序员来做些什么
``` js
Sentry.close(2000).then(function() {
  // perform something after close
});
```
1.  针对敏感数据不想采集应该提供多个方式让用户去控制
2.  对错误的拦截的精细度可以让用户控制，由大到小
3.  Sentry 提供了一个方便的 Webpack 插件，可以配置 source maps 并自动将它们上传到 Sentry(@sentry/webpack-plugin) (这个好像很难,Sentry做了很多)
4.  用户在频繁发送请求，在阈值附近，这时候是否提供策略来等过后再发送采集数据
5.  客户使用时，登录了可以给出一个 setUserId，没有登录则用sdk自身随机创建的,setUserId后则将随机id和这个绑定 (核心问题还是怎么辨别唯一用户 - 可参考canvas 指纹追踪技术(Canvas指纹在相同设备的不同浏览器打开会不尽相同) - 这东西可以防止恶意刷票等行为，想想是吧，当然最后尽量和真实用户绑定在一起) 或者 通过浏览器的 可见配置、设置 等有辨识度的信息（比如语言、UA、地理位置等），经过一系列计算可以获取到一个唯一值 —— 浏览器指纹(这个可以作为一个降级策略)
6.  上面的指纹追踪，应该是一个真实用户绑定多个指纹，比如用户有多台设备。但是当切换真实用户时，我们能不能从哪个真实用户停留时间长或者其他维度来分析这台设备到底是谁的。或者把关系变为多对多也是可行的
7.  监听用户键盘输入，这东西实现了会不会有风险。。。。。
8.  关于用户设备这方面的采集也可以深入，提供给需要的公司来分辨用户的电脑硬件这些，然后指定不同的广告（也是个不错的思路）
9.  针对判断是否为同一个用户的功能，可以专门出一个sdk，github有蛮多这种开源，多参考一下 （https://juejin.cn/post/6844903970180169742#heading-1）(小满视频: https://www.bilibili.com/video/BV1dS4y1y7vd/?p=102&vd_source=7313597670b28c3c44c50e326d82d040)
10. 按钮的多种事件的监听，例如双击，点击，按下，松手这种 (https://blog.csdn.net/qq1195566313/article/details/125958100?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167937849516800222893893%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=167937849516800222893893&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-125958100-null-null.blog_rank_default&utm_term=%E5%9F%8B%E7%82%B9&spm=1018.2226.3001.4450)
11. 性能监控 (https://mp.weixin.qq.com/s/QZQ8-48MD3zgGmSrr_oWwQ)
12. 功能场景：当业务新增一张页面，原型图页面上有10个按钮，应该给这10个按钮点击附上10个全局唯一ID，然后这个id会给到前端，前端要把这个ID当做事件参数id给埋点系统（思考一下为什么需要此场景，还有什么更优解）
13. 一些关键性的api，例如监听网络状态的方法可以交由用户去替代，而不是写死sdk中，万一发生了更新或者不兼容了用户还能避过
14. LDAP登录
15. 在获取首屏数据时，应该增加一个标识来证明是用户刷新的首屏，否则第一次采集到的首屏和第二次采集到的数据肯定不一样
16. 页面白屏检测
17. 错误录屏+sourcemap(录屏后最好加个延迟，万一用户需要让使用者同意才能发这种)



1. Sentry SDK 有两个配置选项来控制发送到 Sentry 的 transaction 量，让您可以获取具有代表性的样本：

统一采样率（tracesSampleRate）：

提供均匀的事务横截面，无论它们在您的应用程序中的哪个位置或在什么情况下发生。

使用默认继承(inheritance)和优先(precedence)行为

采样函数（tracesSampler）其中：

以不同的速率采样不同的 transaction

完全过滤掉一些 transaction

修改默认优先级和继承行为


优先级
transaction 以多种方式结束抽样决策。

根据 tracesSampleRate 中设置的静态采样率随机采样

根据 tracesSampler 采样函数返回的采样率随机采样

tracesSampler 返回的绝对决策（100% 机会或 0% 机会）

如果 transaction 有父级，继承其父级的抽样决策

绝对决策传递给 startTransaction

当有可能不止一个发挥作用时，以下优先规则适用：

如果将抽样决策传递给 startTransaction（请参阅上面的强制抽样决策），则将使用该决策，而不管其他任何事情

如果定义了 tracesSampler，则将使用其决策。它可以选择保留或忽略任何父采样决策，或使用采样上下文数据来做出自己的决策或为 transaction 选择采样率。

如果未定义 tracesSampler，但存在父采样决策，则将使用父采样决策。

如果未定义 tracesSampler 并且没有父采样决策，则将使用 tracesSampleRate。



支持的浏览器
Sentry 的 JavaScript SDK 支持以下浏览器：
Android：4.4, 5.0, 6.0, 7.1, 8.1, 9.0, 10.0
Firefox：latest
Chrome：latest
IE：IE 10, IE 11
iPhone：iOS 12, IOS 13
Edge：latest
Safari：latest
支持 <= IE 11
在 5.7.0 版本之前，我们的 JavaScript SDK 需要一些 polyfills 用于旧版浏览器，如 IE 11 及更低版本。如果您正在使用它，请在加载我们的 SDK 之前升级到最新版本或添加下面的脚本标签。

<script src="https://polyfill.io/v3/polyfill.min.js?features=Promise%2CObject.assign%2CString.prototype.includes%2CNumber.isNaN"></script>
我们需要以下 polyfill：
Promise
Object.assign
Number.isNaN
String.prototype.includes
此外，请记住在 HTML 页面顶部定义有效的 HTML doctype，以确保 IE 不会进入兼容模式(compatibility mode)。


## 参考
[学习]https://juejin.cn/post/7007607369962094599#heading-2

技术参考
- 神策 https://github.com/sensorsdata
- sentry https://github.com/getsentry/sentry
- https://github.com/clouDr-f2e/monitor(拉到本地了，可参考结构，他的功能不多，埋点没有，但是有钩子)
- https://github.com/xy-sea/web-see(拉到本地了，功能不错，比monitor好，写法很整齐，非常易懂，厉害)
- https://opensource.sensorsdata.cn/category/opensource/
- https://github.com/wangweianger/zanePerfor
- https://github.com/wangweianger/web-report-sdk
- https://github.com/getsentry
- [元素曝光埋点]https://github.com/dcison/element-dig

文档参考
- [有赞天网]https://tech.youzan.com/mobileskynet/
- [字节埋点-推荐指数MAX]https://juejin.cn/post/7195496297150709821
- [性能检测名词]https://zhuanlan.zhihu.com/p/411409442
- [Sentry-很多api可以参考]https://mp.weixin.qq.com/s/_ubxtWBEyzfPtc20TSJp1w
- [阿里云案例-推荐指数MAX]https://mp.weixin.qq.com/s/YiKRY_LDURY0uONtEhkUfg

其他参考
- [growingIO]https://cloud.tencent.com/developer/article/1860008
- [sourcemap解码]https://www.webfunny.cn/blog/post/89
- [成熟产品-偏服务端]https://www.walkingfunny.com/

+ 流量分析的监控有：百度统计、谷歌分析、GrowingIo、友盟
+ 错误统计的监控有：sentry、fundebug、frontJs、岳鹰
+ 当然还有一些前端监控产品：OneApm、听云


## 待做功能点

### API打点
``` js
wd.track({
    eventId: '',
    eventType: '',
});
 
wd.trackError(e);
 
// 记录开始和结束，筛选统计开始和结束之间的事件行为
wd.mark('业务标题');
// mark和clear中间的手动和自动的打点都会可以被统计到一个分组中
wd.track({});
wd.clear('业务标题');
```

### 可配置
+ 可配置最大发送时长
+ 可配置最大缓存数量
+ 主动上报方法可配置同步触发

## 设置全局参数
新增由使用者来配置想要的参数名

### 其他
+ 缺少一个屏蔽埋点的属性
+ 错误拦截里面: 拦截了所有的promise的reject,看看怎么配置能让某些reject正常化
+ vue内的代码报错会触发两次报错, 一个是vue的报错,一个是console.error的报错, 看看这样的场景怎么样能屏蔽一个
+ 区分唯一用户,比如设备号+token,看看有没有把设备号和token都传给后端了,要不然后端无法区分唯一用户(https://blog.csdn.net/beyond__devil/article/details/82949147)
+ 曝光采集(指一个元素在视口停留了多久,例如淘宝,向下滑动的过程中如果在其中一屏停留超过2秒则会记录并埋点 IntersectionObserver)

### params
点击事件的 params 规则可以优化一下

### 时间
检查下每个采集事件是否都带上了当前时间, 发送时间

### error
+ 页面错误自动收集,可以设置相同错误重复发送的阈值,达到阈值不再上报,可以规避一些循环错误无限上报
需要记录所有已经发生的错误,错误重复发生的次数, 这里要想一个较好的方案
+ 相同的错误: 错误类型一致,报错信息一致(例如: 同一个文件位置、同一个接口和入参)
+ 比如说vue内也有报错机制,会再次触发`console.error`,产生两次相同的错误采集信息,需要在插件内就把这种重复的给去除

### 资源监控
需要对那一块的时间精度进行把控

### 请求
+ 没有加上区分 post 和 get
+ axios请求也要加上去，可配置，有些后端是不支持的，fetch，XHR也可以加上

### 代码
优化一下代码,还是感觉比较凌乱