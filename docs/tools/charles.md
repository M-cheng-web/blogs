# Charles
抓包工具的安装

## 下载
[Charles 下载](https://www.charlesproxy.com/latest-release/download.do)

## 配置
打开 `Charles`,此时是不能正常使用的,需要以下配置

+ 勾选 `Proxy > macos proxy`,勾选后则可以捕捉到网络请求,但此时只是捕捉到了并不能正常给我们展示
+ 点击 `Proxy > SSL Proxy Settings`, 添加 `host: *` 以及 `post: *` 的一条规则
+ 点击 `Help > SSL Proxying > install Charles Root Certificate` 会自动下载安装证书 (如出现不受信任标识,需要设置为全信任)

### 捕捉移动端请求
+ 移动设备以及电脑需在一个局域网内
+ pc端点击 `Help > SSL Proxying > install Charles Root Certificate on a Mobile Device or Remote Browser` 会有弹出框
+ 按照框内提示,移动端设置WIFI代理IP以及HOST
+ 移动端浏览器访问框内提示的地址去下载证书,如: `chls.pro/ssl`
+ 下载完成后在设置中可以看到 `已下载描述文件`,点击进入安装刚下载的描述文件
+ 安装好后进入 `设置 > 通用 > 关于本机 > 证书信任设置`, 开启对刚安装好的证书的完全信任
+ 此时就可以在pc端 Charles 看到移动端的请求信息了

## 注意
1. 证书会过期，大概周期是一年，届时 Charles 将不能正常使用，需要考虑到证书的更新
2. 免费版的进入会有10s等待，以及不能连续使用30分钟
