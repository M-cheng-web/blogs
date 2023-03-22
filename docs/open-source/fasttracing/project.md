# FastTracing
[FastTracing](https://github.com/FastTracing)组织下各个项目以及SDK（暂定）

## 仓库
### 前端-采集端(web-tracing)
技术栈【rollup + ts + vite + pnpm + vitepress】

#### 核心功能
+ 行为埋点
+ 性能采集
+ 异常采集
+ 请求采集
+ 路由采集

#### 计划兼容前端项目/平台
+ vue项目采集端(vue2+vue3)
+ uniapp项目采集端(支付宝小程序+微信小程序)
+ react项目采集端
+ nuxt项目采集端
+ next项目采集端
+ electron项目采集端

### 前端-后台管理(tracing-admin)
技术栈【vue3 + ts + vite】

主要功能
1. 演示功能(可现场采集后查看最新采集视图)
2. 使用者可从后台看埋点采集情况
3. 作为模板方便使用者一套移植

### 服务端-Java(tracing-manager)
技术栈【java + mysql】

主要功能
1. 用来记录前端传递过来的数据，落库
2. 作为模板方便使用者一套移植

### 服务端-NestJS(tracing-manager-nestjs)
技术栈【nestjs + ts + typeorm + mysql】

主要功能
1. 用来记录前端传递过来的数据，落库
2. 作为模板方便使用者一套移植

## SDK
采集端才有SDK

+ @web-tracing/vue
+ @web-tracing/vue3
+ @web-tracing/uniapp
+ @web-tracing/react
+ @web-tracing/nuxt
+ @web-tracing/nest
+ @web-tracing/electron