# nestjs

[nest 中文文档](https://docs.nestjs.cn/8/introduction)

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
