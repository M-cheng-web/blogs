# 小知识点
一些比较小的知识点备忘

## 编码-btoa & 解码-atob
``` ts
let encodedData = window.btoa("Hello, world"); // 编码
let decodedData = window.atob(encodedData);    // 解码
```

## 本地端口操作
+ 查看: sudo lsof -i:`8080`
+ 终止: sudo kill -9 `<pid>`

## ng
+ 启动: sudo nginx
+ 重启: sudo nginx -s reload
+ 停止: sudo nginx -s stop
+ 打开配置地址: 控制台 nginx -h, 然后command + 最后一位地址

## vuepress 图标地址
[https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

## mk文档输出目录树
mddir

https://www.cnblogs.com/xulinjun/p/13932609.html