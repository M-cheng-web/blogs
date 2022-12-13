# 杂乱

## 去除浏览器广告
```
1、先安装扩展 Tampermonkey

2、安装脚本 https://greasyfork.org/zh-CN/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97

3、在搜索界面的右上角会出现一个 蓝色的自定义 按键，点他进去设置
```

## uniapp
+ click.stop 是无效的, 要用 click.native.stop
+ input type = number 时, 设置 maxlength 会出错,但是不报错 (在支付宝小程序)
+ 没有改动 (由于支付宝不支持formdata格式且 uni.uploadFile 的 filePath 是必传的,所以只能用另外一个接口)
+ uniapp 原生输入框在支付宝小程序有闪动问题,用uview的组件好一些
+ 假冒的 tabbar, 如果在所有的 pages 定义之前加了个额外的登录也,那么 switchto 这种是不能正常使用了,只能当做正常的页面跳转,否则会出现底部会空出一个 tabbar 栏的高度 (但是在安卓端是没问题的,ios端看支付宝小程序才有问题)
+ textarea focus 属性内部是watch 的，如果本身为true再次置为true是不会触发获取焦点的
+ 通过路由跳转传参的 布尔值会转化为 字符串
+ new date('2000-12-04') 这样的方式可能会失败，这样的格式能保证成功 '2000/12/04'

// ios screenWidth 是正常的, 安卓端 screenWidth 是不正常的,所以用 windowWidth
  // const screenWidth = uni.getSystemInfoSync().screenWidth;