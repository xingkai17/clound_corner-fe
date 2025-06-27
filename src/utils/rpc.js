import Config from "./config.js";
import Interaction from "./interaction";

class RPC {
  constructor({url, data = {}, method="POST", login=false,isShowLoading = true}) {
    this.url = url;
    this.data = data;
    this.method = method.toUpperCase();
    this.login = login;
    this.isShowLoading = isShowLoading;
    // this.req = new Promise((resolve, reject) => {
    //   this._req(url, data, method, resolve, reject);
    // })

  }

  req() {
    // console.log("--------" + Config.baseURI);
    if (Config.isNotHideShowLoading && this.isShowLoading) {
        wx.showLoading({
            title: '加载中',
            mask:true,
            success(res) {
              Config.isShowLoading = true
            }
        })
    }


    return new Promise((resolve, reject) => {
      // console.warn("::::::::params:::::::::: " + JSON.stringify(this.data))
      this._req(this.url, this.data, this.method, resolve, reject);
    })
  }

  reqImg({uri, data = {}}) {

    return new Promise((resolve, reject) => {
      console.warn("::::::::params:::::::::: " + JSON.stringify(data))
      this._reqImg(uri, data, resolve, reject);
    })
  }

  _req(url, data = {}, method = "POST", resolve, reject) {
    const vm = this
    console.log("::::::::Uri:::::::::: " + url)
    console.log(this.url)
    // if (this.url.includes('getJlMemberTyingInfo') && wx.getStorageSync('cellNum') == '13223458505') {
    //   this.url = "http://192.168.1.22:8080/webapi/api1/marketing/getJlMemberTyingInfo"
    // }
    // if (this.url.includes('receivedCoupon') && wx.getStorageSync('cellNum') == '13223458505') {
    //   this.url = "http://192.168.1.22:8080/webapi/api1/marketing/receivedCoupon"
    // }
    wx.request({
      url: this.url,
      data: this.data,
      method: this.method,
      header: {
        'content-type': this.method != "GET" ? 'application/json' : 'application/x-www-form-urlencoded', // 默认值
        'Authorization': this.login ? '' : wx.getStorageSync('token'),
        'X-Request-Version': Config.version,
        'X-Request-AppId': Config.appID,
        'X-Request-AppType': 'wxMini',
      },
      success: (res) => {
        console.log(":::::::::: Http Success :::::::::::::" + JSON.stringify(res))
        resolve(res.data);
        if(!res.data.ret) {
          if (vm.url.indexOf("buriedPoint/upload")==-1) {
            console.log(vm.url)
            Interaction.toastNone("网络异常，请稍后重试");
          }
        }
      },
      fail: (err) => {
        // reject(new Error(err.data));
        console.error(":::::::::: Http Error :::::::::::::" + JSON.stringify(err))
        let data = {
          ret: 6,
          msg: "网络异常，请稍后重试",
          data: [],
        }
        reject(data);
      },
      complete: (res) => {
        // console.log(res);
        if (this.isShowLoading) {
          setTimeout(function () {
            Interaction.hideLoading();
            // wx.hideLoading()
          }, 50)
        }

      }
    })
  }

  _reqImg(url, data = {}, resolve, reject) {
    console.warn(":::::::: Upload Uri :::::::::: " + url)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        wx.showLoading({
          title: '上传中...',
          success(res) {
            Config.isShowLoading = true
          }
        })
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(":::::::::: Choose Image Success :::::::::::::" + JSON.stringify(res))
        wx.uploadFile({
          url: url,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: data,
          success (res){
            const data = res.data
            //do something
            console.log(":::::::::: Upload Image Success :::::::::::::" + JSON.stringify(res))
            resolve(data);
          },
          fail (err) {
            console.error(":::::::::: Upload Image Error :::::::::::::" + JSON.stringify(err))
            reject(err.data);
          },
          complete () {
            setTimeout(function () {
              Interaction.hideLoading();
              // wx.hideLoading()
            }, 500)
          }
        })
      },
      fail (err) {

      },
      complete (res) {

      }
    })
  }

}

export default RPC;