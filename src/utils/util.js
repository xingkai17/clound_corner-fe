import qrcode from './qrcode';
import barcode from './barcode';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatMouth = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()


  return `${month}月${formatNumber(day)}日`
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 插件内部是根据width, height参数的rpx值来进行绘画
// 把数字转换成条形码
var toBarcode = (canvasId, code, width, height) => {
  barcode.code128(wx.createCanvasContext(canvasId), code, width, height);
}
// 把数字转换成二维码
var toQrcode = (canvasId, code, width, height) => {
  console.log('二维码数据：' + code)
  qrcode.api.draw(code, {
    ctx: wx.createCanvasContext(canvasId),
    width,
    height
  }, 97)
}

// 解析链接中的参数
var getQueryString = function (url, name) {
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    return r[2]
  }
  return null;
}

var getHg = () => {
  // 获取手机系统信息
  let systemInfo = wx.getSystemInfoSync();

  // 屏幕顶部状态栏高度
  let statusBarHeight = Number(systemInfo.statusBarHeight);

  // 获取胶囊区信息
  let menu = wx.getMenuButtonBoundingClientRect();

  // 胶囊区高度
  let menuHeight = menu.height;

  // 胶囊区距离屏幕顶部的距离
  let menuTop = menu.top;

  // 屏幕顶部导航栏高度
  let navBarHeight = menu.height + (menu.top - statusBarHeight) * 2;

  // 屏幕顶部状态栏加导航栏高度
  let navStatusBarHeight = statusBarHeight + menu.height + (menu.top - statusBarHeight) * 2;

  // 屏幕底部安全区高度
  // css 可用 env(safe-area-inset-bottom) 或 constant(safe-area-inset-bottom)
  let iosSABottom = Number(systemInfo.screenHeight - systemInfo.safeArea.bottom);

  // let contentHeight = calc(100vh- env(safe-area-inset-bottom));

  // this.setData({
  //     // iosSABottom: iosSABottom,
  //     titleTopDistance: statusBarHeight - 2,
  //     navStatusBarHeight: navStatusBarHeight
  // })

  console.log("获取手机系统信息", systemInfo);
  console.log("获取胶囊区信息", menu);
  console.log("胶囊区高度", menuHeight);
  console.log("胶囊区距离屏幕顶部的距离", menuTop);
  console.log("屏幕顶部状态栏高度", statusBarHeight);
  console.log("屏幕顶部导航栏高度", navBarHeight);
  console.log("屏幕顶部状态栏加导航栏高度", navStatusBarHeight);
  console.log("屏幕底部安全区高度", iosSABottom);
}

module.exports = {
  formatTime: formatTime,
  formatNumber,
  formatMouth,
  toBarcode,
  toQrcode,
  getQueryString
}
