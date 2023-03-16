# 埋点sdk

## 问题
1. 搞清楚分支管理，工作留，怎么打出alpha，beta，rc，正式版本
2. changelog
3. commitlint
4. eslint
5. 怎么减少服务端压力？ 1.前端日志抽样发送功能 2.前端可以将数据临时保存在Storage中并合并起来，隔一段时间发送一次日志（类似节流
6. 受网络和设备老化的影响，有一些数据并不能反映网站的性能，这时候可以过滤极值来保证数据的可靠性(这个得后台管理去过滤，采集端应该是纯净的，当然为了减少服务端压力也可以考虑这种)
7. 服务端可以暴露一个delete的接口，服务器自动删除老数据
8. 无埋点和全埋点
9. 做这个可能得去看看学习性能篇章了
10. 得详细诺列出和旧版的不一样
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
25. 或许可以不用多包的形式,做个类似于热拔插的样子，谁要用什么自取，而且sdk可以帮忙用户在取了不应该取的东西给出报错
26. 通过一个userId查询出用户的所有行为记录，以帮助开发者来复现用户的问题，如，用户细查，用户连线等

## 参考
[学习]https://juejin.cn/post/7007607369962094599#heading-2

技术参考
- 神策 https://github.com/sensorsdata
- https://github.com/clouDr-f2e/monitor
- https://github.com/getsentry/sentry
- https://github.com/xy-sea/web-see
- https://opensource.sensorsdata.cn/category/opensource/
- https://github.com/wangweianger/zanePerfor
- https://github.com/getsentry

文档参考
- https://zhuanlan.zhihu.com/p/96215664
- [有赞天网]https://tech.youzan.com/mobileskynet/
- [字节埋点]https://juejin.cn/post/7195496297150709821
- [性能检测名词]https://zhuanlan.zhihu.com/p/411409442

其他参考
- [growingIO]https://cloud.tencent.com/developer/article/1860008
- [神策]https://mp.weixin.qq.com/s?__biz=MzIxMjE1ODAzOA==&mid=2650630727&idx=1&sn=52715f9297bb8933ac95a680eded6149&chksm=8f43997eb834106812dd9afaf244d59af3e87ec4a906b3b079554b030567a55338bea39e829d&token=733598983&lang=zh_CN&scene=21#wechat_redirect
- [sourcemap解码]https://www.webfunny.cn/blog/post/89
- [成熟产品]https://www.walkingfunny.com/

流量分析的监控有：百度统计、谷歌分析、GrowingIo、友盟
错误统计的监控有：sentry、fundebug、frontJs、岳鹰
当然还有一些前端监控产品：OneApm、听云


## 项目集
1. 前台项目仓库 - 核心系统 + 文档系统
2. 后台管理系统仓库 - 后台管理
3. 服务端系统仓库 - 服务端系统

## 取名
### 组织名: FastTracing
+ 采集端项目名: web-tracing (此项目涵盖所有采集端。vue项目采集端、uniapp项目采集端、react项目采集端、nuxt项目采集端、next项目采集端、electron项目采集端)
+ 后台管理系统项目名: web-tracing-admin
+ 服务端系统项目名(java): web-tracing-manager
+ 服务端系统项目名(nestjs): web-tracing-manager-nestjs

### 采集端的sdk名列表(其他项目不需要npm包)
+ @web-tracing/vue
+ @web-tracing/uniapp
+ @web-tracing/react
+ @web-tracing/nuxt
+ @web-tracing/nest
+ @web-tracing/electron



## 项目具体分析
### 核心系统(rollup + ts + lerna -> pnpm + vuepress -> vitepress)
1. 埋点核心代码实现
2. ts重构
3. 流程应该再优化一下
4. 所用到的api应该再去调研一下，看看兼容性，有兼容性问题要做降级策略
5. 要适配web，uniapp，vue2，vue3，react（可以的话再适配一下Angular，nuxt）
6. api文档
7. 能达到让后台管理配置采集哪些数据的功能
8. readme 中英文版

### 后台管理系统(vue3 + ts + vite)
1. 从后台看埋点采集情况，相当于个演示官网
2. 同时也是给使用者快速上手的后台模板
3. 功能场景：当业务新增一张页面，原型图页面上有10个按钮，应该给这10个按钮点击附上10个全局唯一ID，然后这个id会给到前端，前端要把这个ID当做事件参数id给埋点系统（思考一下为什么需要此场景，还有什么更优解）

### 服务端系统(docker + nestjs + typeorm + mysql)
1. 用来记录前端传递过来的数据，落库
2. 同时也是给使用者快速上手的服务端模板

----------------------------------------------------------

# 待做

## API打点
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

## 可配置
+ 可配置最大发送时长
+ 可配置最大缓存数量
+ 主动上报方法可配置同步触发

## 设置全局参数
新增由使用者来配置想要的参数名

## 备注
+ 缺少一个屏蔽埋点的属性
+ 错误拦截里面: 拦截了所有的promise的reject,看看怎么配置能让某些reject正常化
+ vue内的代码报错会触发两次报错, 一个是vue的报错,一个是console.error的报错, 看看这样的场景怎么样能屏蔽一个
+ 区分唯一用户,比如设备号+token,看看有没有把设备号和token都传给后端了,要不然后端无法区分唯一用户(https://blog.csdn.net/beyond__devil/article/details/82949147)
+ 曝光采集(指一个元素在视口停留了多久,例如淘宝,向下滑动的过程中如果在其中一屏停留超过2秒则会记录并埋点 IntersectionObserver)

## params
点击事件的 params 规则可以优化一下

## 时间
检查下每个采集事件是否都带上了当前时间, 发送时间

## error
+ 页面错误自动收集,可以设置相同错误重复发送的阈值,达到阈值不再上报,可以规避一些循环错误无限上报
需要记录所有已经发生的错误,错误重复发生的次数, 这里要想一个较好的方案
+ 相同的错误: 错误类型一致,报错信息一致(例如: 同一个文件位置、同一个接口和入参)
+ 比如说vue内也有报错机制,会再次触发`console.error`,产生两次相同的错误采集信息,需要在插件内就把这种重复的给去除

## 资源监控
需要对那一块的时间精度进行把控

## 请求
+ 没有加上区分 post 和 get
+ axios请求也要加上去，可配置，有些后端是不支持的

## 代码 
优化一下代码,还是感觉比较凌乱 
