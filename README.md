Appium MiniProgram Driver
----

Appium MiniProgram Driver is a test automation tool for WeiXin(a.k.a. WeChat) MiniProgram. 

Appium MiniProgram Driver 是针对微信小程序的测试自动化工具。将微信官方自动化接口封装为 Appium Driver，借助 Appium 框架与 WebDriver API，我们可以使用多种编程语言编写小程序自动化脚本。

## 现状

试验性完成了：

- 截图
- css selector 获取单个、多个 element
- tap 指定 element
- longPress 指定 element
- pageScrollTo
- scroll-view 的 scrollTo
- swiper 的 swipeTo

## 障碍

#### 手势 API 不标准

只是简单尝试一下就遇到了 scroll-view 和 swiper 两个标签有自己的特殊 API。不过解决起来也还好，暂时不算坑。

#### 截图 API 有问题

miniprogram-automator 的 screenshot 本身就有问题，一开始好好的突然开始截图失败。

```
> mpProgram.screenshot()
Promise { <pending> }
> (node:50420) UnhandledPromiseRejectionWarning: Error: fail to capture screenshot
    at Transport.Connection.onMessage (/PATH_TO_PROJECT/appium-mp-driver/node_modules/miniprogram-automator/out/Connection.js:1:986)
    at Transport.emit (events.js:315:20)
    at Transport.EventEmitter.emit (domain.js:505:15)
    at WebSocket.<anonymous> (/PATH_TO_PROJECT/appium-mp-driver/node_modules/miniprogram-automator/out/Transport.js:1:219)
    at WebSocket.onMessage (/PATH_TO_PROJECT/appium-mp-driver/node_modules/miniprogram-automator/node_modules/ws/lib/event-target.js:120:16)
    at WebSocket.emit (events.js:315:20)
    at WebSocket.EventEmitter.emit (domain.js:505:15)
    at Receiver.receiverOnMessage (/PATH_TO_PROJECT/appium-mp-driver/node_modules/miniprogram-automator/node_modules/ws/lib/websocket.js:789:20)
    at Receiver.emit (events.js:315:20)
    at Receiver.EventEmitter.emit (domain.js:505:15)
(node:50420) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 14)
```
