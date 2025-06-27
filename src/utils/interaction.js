import Config from "./config";
import RefuelGLCTL from "../mvp/refuel/refuelGLCTL";
const rCtl = new RefuelGLCTL();
export default class Interaction {
  static toastLoading(msg) {
    wx.showToast({
      title: msg,
      icon: 'loading',
      duration: 1000
    })
  }
  static toastSuccess(msg) {
    wx.showToast({
      title: msg,
      duration: 2000,
      
    })
  }
  static toastNone(msg) {
    setTimeout(() => {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    },100)
  }
  // 隐藏loading
  static hideLoading() {
    // if(Config.isShowLoading) {
      wx.hideLoading({
        success(res) {
          Config.isShowLoading = false
        }
      });
    // }
  }
  // 带按钮的弹窗
  static tipsModal(msg,title) {
    wx.showModal({
      title: title || '',
      content: msg,
      showCancel: false,
      success(res) {
      }
    })
  }
  //  navigateBack返回带成功提示弹窗
  static BackToast(delta,msg,icon) {
    wx.navigateBack({
      delta: delta,
      complete(res) {
        wx.showToast({
          icon: icon,
          title: msg,
          success:function(){
            console.log('222222222222')
          }
        })
      },
    })
  }
  static BackToastNew(msg){
    wx.showModal({
      title: '',
      content: msg,
      showCancel: false,
      confirmText: "确定",
      success (res) {
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  }
  // navigateBack
  static navigateBack(delta) {
    wx.navigateBack({
      delta: delta,
      complete(res) {
      },
    })
  }
  // navigateTo跳转
  static navigateTo(url) {
    wx.navigateTo({
      url: url,
      success(res) {
      }
    })
  }
  //  redirectTo关闭当前页面跳转到
  static redirectTo(url) {
    wx.redirectTo({
      url: url
    })
  }
  //  redirectTo关闭当前页面跳转到带toast
  static redirectToToast(url,msg,icon) {
    wx.redirectTo({
      url: url,
      complete(res) {
        wx.showToast({
          icon: icon,
          title: msg,
        })
      },
    })
  }
  //  reLaunch带toast
  static reLaunchToast(url,msg,icon) {
    wx.reLaunch({
      url: url,
      complete(res) {
        wx.showToast({
          icon: icon,
          title: msg,
        })
      },
    })
  }
  //  reLaunch带toast
  static reLaunch(url,) {
    wx.reLaunch({
      url: url,
      complete(res) {
      },
    })
  }
  //  navigateToMiniProgram 跳转其他小程序
  static navigateToMiniProgram({appId,path=''}) {
    console.log(path)
    wx.navigateToMiniProgram({
      appId: appId,
      path: path,
      envVersion: 'trial',
      success(res) {
        // 打开成功
      },
      fail(error) {
        // wx.showToast({
        //   title: JSON.stringify(error),
        //   icon: 'none',
        // })
      }
    })
  }

  static umaEventSend(name, prop = {}) {
    // wx.uma.trackEvent(name, prop);
    // wx.uma.trackEvent('in_confirm_page', { 'inTime': time });
  }
  static umaUserId(id) {
    // wx.uma.setUserid(id);
    // wx.uma.trackEvent('in_confirm_page', { 'inTime': time });
  }
  static  buriedPoint(orderId,actionType,actionTimestamp) {
    // rCtl.buriedPointUpload({orderId : orderId,actionType: actionType,actionTimestamp:actionTimestamp}).then((data) => {
    //   console.log(data)
    // })
  }
}