# TCP

## 三次握手
这里假设 A(client) 以及 B(server)

A和B握手过程:
1. A 发送 `syn` 报文给B ( 此时A状态为 `syn_sent` )
2. B 收到 `syn` 报文,并发送 `ack + syn` 报文给 A ( 此时B状态为 `syn_rcvd` )
3. A 发送 `ack` 报文给B ( `ack`可以理解为确定收到了的意思 )

syn_sent和syn_rcvd,这两个状态叫着「半打开」状态,就是向对方招手了,但是还没得到对方回应(rcvd = received)
+ syn_sent是主动打开方的「半打开」状态
+ syn_rcvd是被动打开方的「半打开」状态
+ 这里A是主动打开方,B是被动打开方

## 数据传输
接着A和B开始互相传递数据,会一直重复着这样的场景:<br>
A发送data给B,B接收到后需要回复A `ack` 报文,表示已收到数据

+ tcp重传
在上面的场景中,如果A发送给B的数据丢失了或者A没有接收到B的回复,那么A不管是发生了什么都会重新传一遍给B

+ tcp去重
接着上面的重传场景,那么A有可能会发送两次数据给B,这样就会有数据重复了,不过 `重传 & 去重` 的工作操作系统网络模块已经帮我们处理好了

+ 批量ack
A如果连续发很多次数据给B,B也不会每个都回一句 `ack`,它会统一回复一次 `ack` 表示收到数据

+ tcp窗口大小
但是A不能一次发太多数据,A和B要保持一定的发送和接收频率,这个叫做 `tcp` 窗口大小

## 四次挥手
挥手过程:
1. A 发送 `fin` 报文给B (此时A状态为 `fin_wait_1`)
2. B 发送 `ack` 报文给A (此时A状态为 `fin_wait_2`, B状态为 `close_wait`)
3. B 发送 `fin` 报文给A (此时A状态为 `time_wait`, B状态为 `last_ack` )
4. A 发送 `ack` 报文给B (此时B状态为 `close`)

这里tcp存在半关闭状态,也就是单向关闭,比如A已经取消发送了,但是不会取消接收,B可以接着发没有发送完的数据,等B也不发送数据且回复A `ack` 报文,那么才代表彻底结束

+ `time_wait`状态解释:<br>
是主动关闭的一方在接收到对方挥手后才进入的长期状态,时长为4分钟,4分钟过后主动关闭的一方才进入 `close` 状态,它的作用是重传最后一个 `ack` 报文,确保对方收到,对方没有收到则会重传 `fin` 报文

+ 4分钟解释:<br>
4分钟是2个MSL,MSL是最长报文寿命,数据的来回一下就是两个了


本篇参考此博文 [https://juejin.cn/post/6844903625513238541#comment](https://juejin.cn/post/6844903625513238541#comment)