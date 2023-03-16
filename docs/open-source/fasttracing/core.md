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

## 参考

技术参考
- 神策 https://github.com/sensorsdata
- https://github.com/clouDr-f2e/monitor
- https://github.com/getsentry/sentry
- https://github.com/xy-sea/web-see
- https://opensource.sensorsdata.cn/category/opensource/
- https://github.com/wangweianger/zanePerfor

文档参考
- https://zhuanlan.zhihu.com/p/96215664


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

