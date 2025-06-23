# didi-marketing-background

## Project setup

```javascript
// development
npm run serve // 小程序本地开发构建


// production
npm run build // 小程序生产环境构建

```

## 开发注意事项

## 需要安装mpx插件

- https://marketplace.visualstudio.com/items?itemName=pagnkelly.mpx
- 禁用其他的插件比如vetur等。
- 右下角的文件显示类型切换到mpx 
![切换类型](https://g-gjdc0791.coding.net/api/project/12716895/files/49458688/imagePreview)



### 使用Mixin，不要使用behaviors

- behaviors有兼容问题，其他小程序不太兼容

## 分包注意事项

当我们使用分包加载时，依赖包内的跳转路径需注意，比如要跳转到other2页面

不用分包时会是：/pages/other/other2
使用分包后应为：/test/pages/other/other2
即前面会多?root={rootKey}的rootKey这一层

为了解决这个问题，有三种方案：

- import的时候在最后加'?resolve', 例如: import testPagePath from '../pages/testPage.mpx?resolve' , 编译时就会把它处理成正确的完整的绝对路径。

- 使用相对路径跳转。

- 定死使用的分包路径名，直接写/{rootKey}/pages/xxx （极度不推荐，尤其在分包可能被多方引用的情况时）

这里我们建议使用第一种方式。

### 分包异步化

https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/async.html
https://www.mpxjs.cn/guide/advance/async-subpackage.html

支持的版本：

- 安卓微信：7.0.13
- iOS 微信：7.0.12
- 微信开发者工具：1.05.2104272
- PC 微信：3.4.5
- macOS 微信：3.4.1
- 安卓企业微信：3.1.23
- iOS 企业微信：4.0.8
