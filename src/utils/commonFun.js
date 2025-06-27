import Config from "./config";
import Interaction from "./interaction";
import RefuelGLCTL from "../mvp/refuel/refuelGLCTL";
const rCtl = new RefuelGLCTL();
var app = getApp()
export default class commonFun {
  static async  payment({data = {},isJuLiangMemberStation=false,txt='',type='refuel',cancelPayNotice=true,}) {
    let params={
      a: 123
    };
    console.log(`data = ${JSON.stringify(data)},isJuLiangMemberStation=${isJuLiangMemberStation},`)
    console.log(data.subscribeMessageTemplateIdList)
    if (data.zeroOrder) {
      goUrl({data:data,isJuLiangMemberStation: isJuLiangMemberStation,type:type})
      return params;
    }  else if (data.paySign) {
      getApp().reportEvent(`${txt}拉起收银台` , `orderId= ${data.orderId}`)
      try {
        const paymentResult = await new Promise((resolve, reject) => {
          wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.packageValue,
            signType: data.signType,
            paySign: data.paySign,
            success(res) {
              getApp().reportEvent(`${txt}收银台支付成功` , `orderId= ${data.orderId}`)
              if (data.subscribeMessageTemplateIdList && data.subscribeMessageTemplateIdList.length > 0) {
                wx.requestSubscribeMessage({
                  tmplIds: data.subscribeMessageTemplateIdList,
                  success(res) {
                    getApp().infoAll(`${txt}付款订阅成功` , `${JSON.stringify(res)}orderId= ${data.orderId}~~~data.subscribeMessageTemplateIdList${data.subscribeMessageTemplateIdList}`)
                    goUrl({data:data,isJuLiangMemberStation: isJuLiangMemberStation,type:type})
                    resolve(params)
                  },
                  fail(err) {
                    console.log("!!!!!!! " + JSON.stringify(err));
                    getApp().infoAll(`${txt}付款订阅失败` , `${JSON.stringify(err)}orderId= ${data.orderId}`)
                    Interaction.redirectTo(`../JPayinfoResult/JPayinfoResult?orderId=${data.orderId}&source=JL&isJuLiangMemberStation=true`);
                    if (err.errCode == 20004) {
                      Interaction.toastNone("您禁止了订阅消息");
                    } else if (err.errCode == 20013) {
                      Interaction.toastNone("不允许通过该接口订阅设备消息");
                    } else if (err.errCode == 10003) {
                      Interaction.toastNone("网络问题，订阅请求发送失败");
                    } else if (err.errCode == 10002) {
                      Interaction.toastNone("网络问题，请求消息列表失败");
                    } else if (err.errCode == 10004) {
                      Interaction.toastNone("参数类型错误");
                    } else {
                      Interaction.toastNone("订阅失败" + err.errCode);
                    }
                    goUrl({data:data,isJuLiangMemberStation: isJuLiangMemberStation,type:type})
                    resolve(params)
                  }
                })
              } else {
                goUrl({data:data,isJuLiangMemberStation: isJuLiangMemberStation,type:type})
                resolve(params)
              }
            },
            fail(res) {
              // vm.data.firstClick = true
              console.log(":::::::::::微信支付失败::::::::::" + JSON.stringify(res))
              // goUrl({data:data,isJuLiangMemberStation: isJuLiangMemberStation,type:type})
              if (res.errMsg) {
                if ( res.errMsg.indexOf("fail cancel") == -1) {
                  wx.showModal({
                    content: res.errMsg,
                    showCancel: false,
                    confirmText: "关闭",
                    success(res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                  getApp().infoAll(`${txt}收银台微信支付失败` , `原因：${JSON.stringify(res)}；orderId= ${data.orderId};consume=${JSON.stringify(data)}`)
                } else {
                  // wx.showModal({
                  //   content: res.errMsg,
                  //   showCancel: false,
                  //   confirmText: "关闭",
                  //   success(res) {
                  //     if (res.confirm) {
                  //       console.log('用户点击确定')
                  //     } else if (res.cancel) {
                  //       console.log('用户点击取消')
                  //     }
                  //   }
                  // })
                  if (cancelPayNotice) {
                    // wx.showModal({
                    //   content: res.errMsg,
                    //   showCancel: false,
                    //   confirmText: "关闭",
                    //   success(res) {
                    //     if (res.confirm) {
                    //       console.log('用户点击确定')
                    //     } else if (res.cancel) {
                    //       console.log('用户点击取消')
                    //     }
                    //   }
                    // })
                    console.log('~~~~~~~~~~~')
                    rCtl.sendCancelPaymentNotice({tradeId : data.orderId}).then((data) => {
                      console.log(data)
                    console.log('1111~~~~~~~~~~~')
                    })
                    // goUrl({data:data,isJuLiangMemberStation: isJuLiangMemberStation,type:type})
                    // if (data.subscribeMessageTemplateIdList && data.subscribeMessageTemplateIdList.length > 0) {
                    //   Interaction.tipsModal('~~~~~~~~~~~')
                    // }
                  }
                  
                }
              } else {
                Interaction.toastNone('您已取消支付')
              }
              resolve(res);
            },
            complete(res) {
              // vm.data.firstClick = true
            }
          })
        });
        console.log(paymentResult);
        return paymentResult
        // 在这里可以执行支付成功后的代码
      } catch (error) {
        Interaction.toastNone("Payment failed out")
        return params;
      }
    } else {
      Interaction.toastNone("没有支付参数，请重试")
      return params;
    }
  }
  static async getLocation({}) {
    let params = {
      ret: 2,
      latitude: 0,
      longitude: 0,
    }
    try {
      const paymentResult = await new Promise((resolve, reject) => {
        wx.getLocation({
          type: 'gcj02',
          success (res) {
            console.log(res)
            getApp().infoAll(`获取位置success` , `原因：${JSON.stringify(res)}；}`)
            params= {
              ret: 1,
              latitude: res.latitude,
              longitude: res.longitude,
            }
            resolve(params);
          },
          fail(res) {
            getApp().infoAll(`获取位置fail` , `原因：${JSON.stringify(res)}；}`)
            console.log(res)
            // if (res.errMsg.includes('fail auth deny')) {
            //   params.ret = 2
            // }
            resolve(params);
          }
         })
      })
      console.log(paymentResult);
      return paymentResult;
    } catch (error) {
      getApp().infoAll(`获取位置Catch` , `原因：${JSON.stringify(error)}；}`)
      Interaction.toastNone("Location failed out")
      return params;
    }
    
  }
}
let goUrl = function({data = {},isJuLiangMemberStation=false,type='refuel',}) {
  console.log('123')
  if (type == 'refuel') {
    if (isJuLiangMemberStation) {
      Interaction.redirectTo(`../JPayinfoResult/JPayinfoResult?orderId=${data.orderId1 ? data.orderId1 : data.orderId}&source=JL&isJuLiangMemberStation=true`);
    } else {
      wx.redirectTo({
        url: '/pages/result/result?tradeId=' + data.orderId,
      })
    }
  }  else if(type == 'back') {
    Interaction.navigateBack(1)
  } else if(type == 'transaction') {
    Interaction.navigateTo(`/pages/JConfiguration/pages/JPayinfoResult/JPayinfoResult?orderId=${data.orderId1 ? data.orderId1 : data.orderId}&source=JL&isJuLiangMemberStation=${isJuLiangMemberStation}`);
  } else if(type == 'JL') {
    Interaction.redirectTo(`/pages/JConfiguration/pages/JPayinfoResult/JPayinfoResult?orderId=${data.orderId1 ? data.orderId1 : data.orderId}&source=JL&sourceType=${data.sourceType}`);
  }
}