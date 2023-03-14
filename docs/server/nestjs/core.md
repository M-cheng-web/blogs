# nestjs

:::tip
目前只在写了demo和简单的项目，后面熟悉了再系统复习总结
:::

[nest 中文文档](https://docs.nestjs.cn/8/introduction)

问题
1. Controller 中 host 有什么用 (子域路由)
2. RxJS observable 流是什么，异步章节
3. 模板代码生成器 https://docs.nestjs.cn/8/recipes?id=crud%e7%94%9f%e6%88%90%e5%99%a8
4. 管道是什么
5. 拦截器，守卫，中间件关系


练习
1. 爬虫
2. 用户创建+登录
3. 用户增删改查

## 开始
```
// 安装全局nest脚手架
npm i -g @nestjs/cli

// 创建nest项目
nest new project-name

// 执行
npm run start:dev

// 打开端口
http://localhost:3000/
```

## 控制器 Controller
使用 `nest g controller cats` 来创建一个`cats`控制器（我这边没有效果）

常用请求头装饰器
|  完整   | 缩写  |
|  ----  | ----  |
| @Request()，@Req()  | req |
| @Response()，@Res()*  | res |
| @Next()  | next |
| @Session()  | req.session |
| @Param(key?: string)  | req.params/req.params[key] |
| @Body(key?: string)  | req.body/req.body[key] |
| @Query(key?: string)  | req.query/req.query[key] |
| @Headers(name?: string)  | req.headers/req.headers[name] |
| @Ip()  | req.ip |
| @HostParam()  | req.hosts |


Nest 为所有标准的 HTTP 方法提供了相应的装饰器：@Put()、@Delete()、@Patch()、@Options()、以及 @Head()。此外，@All() 则用于定义一个用于处理所有 HTTP 请求方法的处理程序。

## 提供者 Providers

## 模块 Module
@module() 装饰器接受一个描述模块属性的对象：

+ providers	由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
+ controllers	必须创建的一组控制器
+ imports	导入模块的列表，这些模块导出了此模块中所需提供者
+ exports	由本模块提供并应在其他模块中可用的提供者的子集。

## 中间件

forRoutes() 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类

apply() 方法可以使用单个中间件，也可以使用多个参数来指定多个多个中间件

## 异常过滤器
内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。

## 管道

Nest 自带八个开箱即用的管道，即

ValidationPipe
ParseIntPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
DefaultValuePipe
ParseEnumPipe
ParseFloatPipe

## 守卫
守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。


