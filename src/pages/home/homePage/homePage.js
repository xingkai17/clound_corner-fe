// pages/testPage/testPage.js
import UserCTL from "../../../mvp/UserInfo/UserCTL";
import AccountCTL from "../../../mvp/comAccount/accountCTL";
const accountCTL = new AccountCTL();
import RefuelGLCTL from "../../../mvp/refuel/refuelGLCTL";
import Interaction from "../../../utils/interaction";
import RespStatus from "../../../mvp/common/model/RespStatus";
import Config from "../../../utils/config";
import UserInfo from "../../../mvp/UserInfo/model/UserInfo.js";
const log = require('../../../log.js')
const respStatus = new RespStatus({
  code: 1
});
import SearchCTL from "../../../mvp/search/searchCTL";
const searchCTL = new SearchCTL();
import Refuel from "../../../mvp/refuel/model/refuel";
const rCtl = new RefuelGLCTL();
import ActivityCTL from "../../../mvp/activity/activityCTL.js";
const activityCTL = new ActivityCTL();
let ctl = new UserCTL();
import TeamCTL from "../../../mvp/teamCar/teamCTL";
const teamCTL = new TeamCTL();
import HeadURL from "../../../mvp/headurl/headurl";
const headURL = new HeadURL();
import QR from '../../../utils/weapp-qrcode';
// import { util } from "echarts";
let rbj;
//index.js
//获取应用实例
const app = getApp()
var timeIntervar1;
import util from "@/utils/util";
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: Config.imgBaseURI,
    touchDotY: 0, //y按下时坐标
    touchMoveY: 0, //y松下时候坐标
    tmY: 0, //y轴滑动距离
    interval: null, //计时器
    time: 0, //滑动时间
    heightH: 0, //二楼容器高度
    // heightB: wx.getSystemInfoSync().windowHeight, //内容容器高度
    dropdown: false, //二楼的显示状态
    scale: 1, //二楼容器大小缩放
    julichushi: 0, //手指滑动初始距离
    juli: 0, //手指滑动当前位置
    jisuanjuli: 0, //手指滑动的距离
    speed: 0, //动画的速度
    // pageHeight: wx.getSystemInfoSync().windowHeight, //页面高度
    // pageWidth: wx.getSystemInfoSync().windowWidth, //页面宽度
    playbool: true, //轮播开关
    btnShow: true, //播放开关
    //以上是下拉效果数据--------------------------------------------
    mobilePhone: '',
    getInfo: true, //数据加载
    memberInfo: '', //获取的会员信息
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    urlClick: 0,
    getphoneClick: 0,
    accountType: 1, //1表示单账户  >1表示多账户
    isNanyang: false, //本字段用于除永鑫小程序之外的权限关闭的功能(南阳车北)
    tipPopShow: false, // 是否显示提示弹窗
    tipPopTittle: '', // 提示弹窗标题
    tipPopTxt: '', // 提示弹窗内容
    showClose: false, // 是否显示提示弹窗关闭按钮
    tips: 'close', // 跳转判断 
    tippopClick: 0,
    GoldenEggsBool: false, // 是否显示砸金蛋小图标
    TurntableBool: false, // 是否显示大转盘小图标
    isDidi: false, //是否是滴滴项目
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 0,
    balance: 0,
    list: [],
    hasUserInfo: false,
    canGetHead: true,
    stationAgreement: null,
    nearoil: {}, //距离最近油站
    picList: [], //轮播图
    footshow: true,
    homeHeadIMG: '', //首页头部主题图片
    picTiele: {

    },
    videoCtx: '',

    schoolName: '',
    cellNum: '',
    userX: '',
    jURL: '1',
    hasCoupon: false,
    hasMall: false,
    hasRecharge: false,
    hasDzp: false,
    hasTicket: false,
    hasGroup: false, // 是否有车队卡
    hasCard: false, // 是否有储值卡
    hasPwdConfig: false, // 是否有密码管理
    hasCarAudit: false, // 专车认证
    hasOilPriceToday: false, // 是否有今日油价
    optionsData: "",
    subscribeActivities: "",
    recallActivities: false,
    qrcodeURL: "",
    showCodePop: false,
    stationTxt: '全部油站',
    oilTxt: '一键加油',
    todayDate: util.formatMouth(new Date()),
    isHideBalance: true,
    isLogin: false,
    noseluid: 0,
    showPrivacy: true,
  },
  /**
   * 组件的方法列表
   */
  methods: {},

  onLoad: function (e) {
    const vm = this
    console.log('onLoad')
    console.log(e)
    // app.globalData.aegis.infoAll('我是licongling');
    var globalData = respStatus.adata;
    console.log(globalData)
    if (e && e.workWx == '1') {
      getApp().reportEvent(`企业微信访问首页`)
    }
    if (Config.appID == 'wxb32acd158f675117') {
      this.setData({
        stationTxt: '全部商户',
        oilTxt: '去下单',
      })
    }
    globalData.selUid = wx.getStorageSync('didiSelUid')
    if (!globalData.selUid || globalData.selUid == 'undefined') {
      if (e && e.source && e.source=='mp') { // 从公众号点击卡片进入
        vm.data.optionsData = e
      }
      this.getTokenByCode() // 登录 
    } else {
      if (!wx.getStorageSync('token')) {
        if (e && e.source && e.source=='mp') { // 从公众号点1击卡片进入
          vm.data.optionsData = e
        }
        this.getTokenByCode() // 登录 
      }
      if (wx.getStorageSync('token')) {
        console.log('执行方法1')
        vm.setData({
          isLogin: true,
        })
        if (e && e.source && e.source=='mp') { // 从公众号点击卡片进入
          vm.getRunningSubscribeActivities()
        }
        vm.getmemberInfo();
        vm.recallCoupons()
        if (respStatus.adata.merchantPageConfig) {
          let merchantPageConfig = respStatus.adata.merchantPageConfig
          vm.setData({
            hasCoupon: merchantPageConfig.hasCoupon,
            hasMall: merchantPageConfig.hasMall,
            hasDzp: merchantPageConfig.hasDzp,
            hasGroup: merchantPageConfig.hasGroup,
            hasCard: merchantPageConfig.hasCard,
            hasPwdConfig: merchantPageConfig.hasPwdConfig,
            hasCarAudit: merchantPageConfig.hasCarAudit,
            hasOilPriceToday: merchantPageConfig.hasOilPriceToday,
            hasRecharge: merchantPageConfig.hasRecharge,
            hasTicket: merchantPageConfig.hasTicket,
            hasOil: merchantPageConfig.hasOil,
            homeHeadIMG: merchantPageConfig.advertisement && merchantPageConfig.advertisement.mainUrl ? merchantPageConfig.advertisement.mainUrl : '',
            picList: merchantPageConfig.advertisement && merchantPageConfig.advertisement.picList ? merchantPageConfig.advertisement.picList : '',
            picTiele: merchantPageConfig.advertisement && merchantPageConfig.advertisement
            // hasMall: true,
            // hasRecharge: true,
            // hasTicket: true,
          })
          console.log(this.data.hasOilPriceToday)
          // if (this.data.hasOilPriceToday) {
          //   vm.getBannerAndPriceNew()
          // }
          vm.getLoc(vm, globalData.selUid);
        } else {
          vm.getMerchantPageConfig()
        }
      }
      // if (respStatus.staffId != 0) {
      //   vm.getLoc(vm, globalData.selUid)
      // } else {
        
      // }

      // vm.getUserIdentity();
    }



    

    this.setData({
      stationAgreement: Config.stationAgreement,
    })

    if (Config.stationAgreement == 1 || Config.stationAgreement == 5 || Config.stationAgreement == 6 || Config.stationAgreement == 8 || Config.stationAgreement == 9 || Config.stationAgreement == 10 || Config.stationAgreement == 11) { //南阳车北
      vm.setData({
        isNanyang: true
      });
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // console.log(vm.data.userInfo, 'userInfo_jr');
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log( app.globalData)
    this.getSetting() // 获取用户信息
    // this.getoilList()  //获取油站列表
    // this.getTokenByCode() // 登录
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    // console.log('最近油站',wx.getStorageSync('nearoil'))
    const vm = this;
    console.log(1111111111 + respStatus.adata);
    console.log(respStatus.adata);
    this.setData({
      merchantId: respStatus.adata.merchantId,
      nearoil: wx.getStorageSync('nearoil')
    });

    if (wx.getStorageSync('headerImg') && wx.getStorageSync('headerImg') != 'undefined') {
      var userInfo = vm.data.userInfo ? vm.data.userInfo : {}
      userInfo.avatarUrl = wx.getStorageSync('headerImg')
      vm.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
    console.log(wx.getStorageSync('SignIn'))
    if(wx.getStorageSync('SignIn')==2){
      wx.removeStorageSync('SignIn')
            this.setData({
                cellNum:'',
                cacheStation:'',
                touchDotY:'',
                memberInfo:'',
                mobilePhone:''
            })
            this.getTokenByCode() // 登录 
    } else {
      if (!wx.getStorageSync('token')) {
        this.setData({
          cellNum: '',
          cacheStation: '',
          touchDotY: '',
          memberInfo: '',
          mobilePhone: ''
        })
      }
    }
    
    


    if (Config.stationAgreement == 3 || Config.stationAgreement == 4 || Config.stationAgreement == 5 || Config.stationAgreement == 7 || Config.stationAgreement == 9 || Config.stationAgreement == 11) { //暂时临沂 山东中海油 东岳特有
      // this.showDrawActive();
      this.setData({
        GoldenEggsBool: true,
        TurntableBool: true
      })
    }
    if (Config.ddFlag == 1) {
      this.setData({
        isDidi: true
      })
    }
    let pages = getCurrentPages();
    if (pages[pages.length - 1].data.schoolName) {
      vm.data.schoolName = pages[pages.length - 1].data.schoolName
    }
    var timer = setInterval(() => {
      if (vm.data.schoolName == '') {
        if (wx.getStorageSync('token')) {
          vm.getmemberInfo()
        }
        // console.log(vm.data.schoolName, 'onShow_on_TIme');
        clearInterval(timer)
      } else {
        pages[pages.length - 1].data.schoolName = ''
        clearInterval(timer)
      }
    }, 1000)
    // console.log(vm.data.schoolName, 'onShow_on_SHOW');
    // var timer=setInterval(() => {
    //   vm.getmemberInfo()
    //   clearInterval(timer)
    // }, 1000)


  },
  handleAgreePrivacyAuthorization(e) {
    console.log(e)
    // 用户同意隐私协议事件回调
    // 用户点击了同意，之后所有已声明过的隐私接口和组件都可以调用了
    // wx.getUserProfile()
    // wx.chooseMedia()
    // wx.getClipboardData()
    // wx.startRecord()
  },
  hideBanlanceFun(e) {
    console.log(e)
    let dataset = e.currentTarget.dataset
    this.setData({
      isHideBalance: !this.data.isHideBalance
    })
  },
  // 获取支付方式列表
  getRunningSubscribeActivities: function () {
    const vm = this;
    rCtl.getRunningSubscribeActivities().then(data => {
      Interaction.hideLoading()
      console.log(`getRunningSubscribeActivities获取会员~${vm.data.mobilePhone}~ ${respStatus.token} ~${JSON.stringify(data)}`)
      log.info(`getRunningSubscribeActivities获取会员~${vm.data.mobilePhone}~ ${respStatus.token} ~${JSON.stringify(data)}`)
      
      if(data && data.data) {
        vm.setData({
          subscribeActivities: data.data,
        });
      }
    })
  },
  // 获取会员召回活动优惠券
  recallCoupons: function () {
    const vm = this;
    rCtl.recallCoupons().then(data => {
      Interaction.hideLoading()
      log.info(`recallCoupons~${vm.data.mobilePhone}~ ${respStatus.token} ~${JSON.stringify(data)}`)
      if (data && data.data && data.data.length>0) {
        vm.setData({
          recallActivities: true,
        });
      } else {
        vm.setData({
          recallActivities: false,
        });
      }
    })
  },
  recallBtn() {
    this.setData({
      recallActivities: false,
    });
  },
  click() {
    this.setData({
      tests: 1
    })
  },

  // 监听轮播动画结束，关闭视频播放
  swiperchange() {
    // this.data.videoCtx.pause()
  },
  footshow() {
    console.log('点击了')
    var vm = this
    this.setData({
      footshow: false
    })
  },
  // 点击返回首页
  gohome() {
    console.log('点击了')
    this.setData({
      touchDotY: 0, //y按下时坐标
      touchMoveY: 0, //y松下时候坐标
      tmY: 0, //y轴滑动距离
      interval: null, //计时器
      time: 0, //滑动时间
      heightH: 0, //二楼容器高度
      dropdown: false, //二楼的显示状态
      scale: 1, //二楼容器大小缩放
      julichushi: 0, //手指滑动初始距离
      juli: 0, //手指滑动当前位置
      jisuanjuli: 0, //手指滑动的距离

    })
  },
  // 点击返回首页
  goupstairs() {
    console.log('点击了')
    // this.setData({
    //   speed: 0.5,
    //   heightH: wx.getSystemInfoSync().windowHeight, //二楼容器高度
    //   dropdown: true, //二楼的显示状态
    //   scale: 1, //二楼容器大小缩放
    // })
  },
  // 计时器
  timeFnn() {
    var vm = this;
    var timeFn;
    console.log(vm.setData)
    vm.setData({
      interval: setInterval(() => {
        vm.setData({
          time: vm.data.time + 1
        })
      }, 1000)
    })
  },
  // 触摸开始  记录触摸开始的y轴位置
  touchStart(e) {
    console.log('触摸开始', e.touches[0].pageY)
    this.setData({
      touchDotY: e.touches[0].pageY,
    })
    this.timeFnn(); //计时，暂时不用
  },
  //监听滑动  记录滑动距离
  touchMove(e) {
    console.log('正在滑动的手指位置', e.touches[0].pageY)
    var vm = this;
    //储存滑动的第一个距离
    if (vm.data.julichushi == 0) {
      vm.setData({
        julichushi: e.changedTouches[0].pageY
      })
    }

    //计算滑动的距离
    if (e.changedTouches[0].pageY > vm.data.julichushi) {
      vm.setData({
        jisuanjuli: e.changedTouches[0].pageY - vm.data.julichushi
      })
    }
    //监听向下滑动
    if (e.changedTouches[0].pageY > vm.data.juli) {
      console.log('滑动距离', vm.data.jisuanjuli)
      vm.setData({
        speed: 0 //渐变速度
      })
      vm.setData({
        heightH: vm.data.heightH + 1.5,
        juli: e.changedTouches[0].pageY
      })
    }
    //监听向上滑动
    if (e.changedTouches[0].pageY < vm.data.juli && vm.data.heightH > 0 && vm.data.dropdown == false) {
      console.log('向上滑动了')
      vm.setData({
        speed: 0
      })
      vm.setData({
        heightH: vm.data.heightH - 0.5,
        juli: e.changedTouches[0].pageY
      })
    }
    //滑动的时候如果二楼高度小于0了高度就是0
    if (vm.data.heightH <= 0 && vm.data.dropdown == false) {
      vm.setData({
        heightH: 0
      })
    }
    console.log('滑动了', e.changedTouches[0])
  },
  // 触摸结束
  touchEnd(e) {
    var vm = this;
    clearInterval(vm.data.interval) //先结束计时，查看操作的时间，暂时不用
    vm.setData({
      touchMoveY: e.changedTouches[0].pageY,
      tmY: parseInt(e.changedTouches[0].pageY) - parseInt(vm.data.touchDotY),
    })
    console.log('时间是', vm.data.time)
    // 监听向下滑 到达临界点
    if (this.data.tmY > 250 && vm.data.dropdown == false) {
      console.log('到达下拉临界点！！！！！！！')
      vm.setData({
        speed: 0.5 //动画速度
      })
      // vm.setData({
      //   heightH: wx.getSystemInfoSync().windowHeight, //设置二楼的高度
      //   // heightH:900,
      //   dropdown: true, //代表已经是二楼状态
      //   scale: 1 //设置渐变的时间
      // })
    }
    // 向上滑动的时候，如果滑动距离比-100还小就关闭二楼
    if (vm.data.tmY < -100 && vm.data.dropdown == true) {
      vm.setData({
        heightH: 0,
        dropdown: false,
        scale: 1,
        jisuanjuli: 0,
        tmY: 0,
        juli: 0,
        julichushi: 0,
        touchDotY: 0,
        touchMoveY: 0,
      })
    }
    // 
    // if(vm.data.tmY<0 && vm.data.tmY>-100 &&vm.data.dropdown==false){
    // console.log('没有到达上划临界点！！！！')
    // vm.setData({
    //     heightH:vm.data.pageHeight,
    //     scale:1,
    // })
    // }
    // 下拉时候没有滑动超出250的距离并大于0，需要回弹
    if (vm.data.tmY < 250 && vm.data.tmY > 0 && vm.data.dropdown == false) {
      vm.setData({
        heightH: 0,
        juli: 0,
        julichushi: 0,
        tmY: 0,
        touchDotY: 0,
        touchMoveY: 0,
      })
    }
    if (vm.data.tmY < -100 && vm.data.dropdown == false) {
      vm.setData({
        heightH: 0,
        dropdown: false,
        scale: 1,
        jisuanjuli: 0,
        tmY: 0,
        juli: 0,
        julichushi: 0,
        touchDotY: 0,
        touchMoveY: 0,
      })
    }
  },
  //以上是二楼效果事件

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getSetting() {
    wx.getSetting({
      success: res => {
        console.log(":::SetingInfo::::::::::" + JSON.stringify(res))
        // if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            console.log("::::::::getUserInfo:::::::::::  " + JSON.stringify(res))
            getApp().globalData.userInfo = res.userInfo
            console.log(":::info::::::::::" + JSON.stringify(getApp().globalData.userInfo))

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
        // }
      }
    })
  },
  getUserProfile(e) {
    const vm = this;
    console.log(e)
    if (!vm.data.canGetHead) {
      return
    }
    this.setData({
      canGetHead: false
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log('234567890-=')
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res, '头像')
        // userRbj = new UserInfo({name:res.userInfo.nickName,headerImg:res.userInfo.avatarUrl})
        // console.log(userRbj)
        wx.setStorageSync('nickName', res.userInfo.nickName)
        wx.setStorageSync('headerImg', res.userInfo.avatarUrl)
        wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
        respStatus.adata.memberInfo.firstName = respStatus.adata.memberInfo.firstName ? respStatus.adata.memberInfo.firstName : res.userInfo.nickName
        var getedInfo = vm.data.memberInfo
        console.log(getedInfo.firstName, 'getUserProfile')
        getedInfo.firstName = getedInfo.firstName ? getedInfo.firstName : res.userInfo.nickName
        vm.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          memberInfo: getedInfo,
          canGetHead: true
        })
      },
      fail: (res) => {
        console.log(res)
        this.setData({
          canGetHead: true
        })
      }
    })
  },
  showDrawActive() { //  查询当前页面应该显示什么活动(大转盘，砸金蛋)
    const vm = this
    activityCTL.showDrawActive({
      merchantId: vm.data.merchantId
    }).then(res => {
      Interaction.hideLoading()
      console.log(res)
      if (res && res.ret) {
        if (res.ret == 1) {
          vm.setData({
            GoldenEggsBool: res.GoldenEggsBool,
            TurntableBool: res.TurntableBool
          })
        } else if (res.ret == 2) {
          Interaction.toastNone(res.msg)
        } else {
          Interaction.toastNone(res.msg)
        }
      }
    });
  },
  onShareAppMessage: function () {
    this.setData({
      isHideBalance:true,
    })
    // return {
    //   imageUrl: '/assets/nodata.png'
    // }
  },
  onShareTimeline: function (res) {
    this.setData({
      isHideBalance:true,
    })
    // return {
    //   imageUrl: '/assets/nodata.png'
    // }
  },
  //获取油站列表
  getoilList: function () {

    const vm = this;
    if (Config.ddFlag == 1) { //滴滴
      var globalData = respStatus.adata;
      if (!globalData.selUid || globalData.selUid == 'undefined') {
        this.getTokenByCode() // 登录
      } else {
        if (!respStatus.adata.selUid) {
          respStatus.adata.selUid = 'undefined'
        }
        amapsdk = new amapFile.AMapWX({
          key: 'dcdd2396fc7cc70e807cd46de0619969'
        });
        amapsdk.getRegeo({
          success: function (data) {
            console.log(data);
            vm.setData({
              address: data[0].regeocodeData.formatted_address,
              userX: data[0].latitude,
              userY: data[0].longitude,
            })
            // 根据商户id查油品
            console.log(globalData)
            rCtl.getOilCodeList({
              merchantId: wx.getStorageSync('didiMerchantId')
            }).then(data => {
              if (data && data.ret) {
                Interaction.hideLoading()
                if (data.ret == 1) {
                  if (data.data.length <= 0) {
                    Interaction.toastNone('获取油品列表失败')
                    return
                  }
                  vm.setData({
                    oilList: data.data,
                    selectOil: data.data[0].fuleCode,
                    selectOilName: data.data[0].fuleName
                  })
                  // 根据经纬度 商户Id 油枪号 再查油站列表 oilCode:vm.data.selectOil,
                  searchCTL.getOilStationAll({
                    stationName: vm.data.searchKey,
                    merchantId: wx.getStorageSync('didiMerchantId'),
                    userX: vm.data.userX ? vm.data.userX : rbj.userX,
                    userY: vm.data.userY ? vm.data.userY : rbj.userY
                  }).then(data2 => {
                    console.log('获取')
                    Interaction.hideLoading()
                    if (data2 && data2.ret) {
                      if (data2.ret == 1) {
                        vm.setData({
                          stationList: data2.data
                        })
                      } else if (data2.ret == 2) {
                        Interaction.toastNone(data2.msg)
                      } else {
                        Interaction.toastNone(data2.msg)
                      }
                    }
                  });
                } else if (data.ret == 2) {
                  Interaction.toastNone(data.msg)
                } else {
                  Interaction.toastNone(data.msg)
                }
              }
            })
          },
          fail: function (info) {
            //失败回调
            console.log(info);
            rCtl.getOilCodeList({
              merchantId: wx.getStorageSync('didiMerchantId')
            }).then(data => {
              if (data && data.ret) {
                if (data.ret == 1) {
                  Interaction.hideLoading()
                  if (data.data.length <= 0) {
                    Interaction.toastNone('获取油品列表失败')
                    return
                  }
                  vm.setData({
                    oilList: data.data,
                    selectOil: data.data[0].fuleCode,
                    selectOilName: data.data[0].fuleName
                  })
                  // 根据经纬度 商户Id 油枪号 再查油站列表
                  searchCTL.getOilStationAll({
                    stationName: vm.data.searchKey,
                    oilCode: vm.data.selectOil,
                    merchantId: wx.getStorageSync('didiMerchantId')
                  }).then(data2 => {
                    Interaction.hideLoading()
                    if (data2 && data2.ret) {
                      if (data2.ret == 1) {
                        vm.setData({
                          stationList: data2.data
                        })
                      } else if (data2.ret == 2) {
                        Interaction.toastNone(data2.msg)
                      } else {
                        Interaction.toastNone(data2.msg)
                      }
                    }
                  });
                } else if (data.ret == 2) {
                  Interaction.toastNone(data.msg)
                } else {
                  Interaction.toastNone(data.msg)
                }
              }
            })
          }
        })

      }
    } else {
      if (!respStatus.adata.selUid) {
        respStatus.adata.selUid = 'undefined'
      }
      amapsdk = new amapFile.AMapWX({
        key: 'dcdd2396fc7cc70e807cd46de0619969'
      });
      amapsdk.getRegeo({
        success: function (data) {
          console.log(data)
          vm.setData({
            address: data[0].regeocodeData.formatted_address
          })
        },
        fail: function (info) {
          //失败回调
          console.log(info)
        }
      })
      rbj = new Refuel({});
      console.log(rbj);
      vm.setData({
        userX: rbj.userX,
        userY: rbj.userY,
        merchantId: rbj.merchantId,
      });
      // 根据商户id查油品
      rCtl.getOilCodeList({
        merchantId: rbj.merchantId
      }).then(data => {
        Interaction.hideLoading()
        if (data && data.ret) {
          if (data.ret == 1) {
            Interaction.hideLoading()
            if (data.data.length <= 0) {
              Interaction.toastNone('获取油品列表失败')
              return
            }
            vm.setData({
              oilList: data.data,
              selectOil: data.data[0].fuleCode,
              selectOilName: data.data[0].fuleName
            })
            // 根据经纬度 商户Id 油枪号 再查油站列表
            searchCTL.getOilStationAll({
              stationName: vm.data.searchKey,
              oilCode: vm.data.selectOil,
              merchantId: wx.getStorageSync('didiMerchantId'),
              userX: rbj.userX,
              userY: rbj.userY
            }).then(data2 => {
              Interaction.hideLoading()
              if (data2 && data2.ret) {
                if (data2.ret == 1) {
                  vm.setData({
                    stationList: data2.data
                  })
                } else if (data2.ret == 2) {
                  Interaction.toastNone(data2.msg)
                } else {
                  Interaction.toastNone(data2.msg)
                }
              }
            });
          } else if (data.ret == 2) {
            Interaction.toastNone(data.msg)
          } else {
            Interaction.toastNone(data.msg)
          }
        }
      })

    }
  },




  /**
   * 查看会员信息
   */
  getmemberInfo: function (type) {
    console.log('执行了 ：' + type)
    console.log(this.data.getInfo, '123', '1111');
    const vm = this

    if (vm.data.getInfo) {
      accountCTL.memberInfo().then(data => {
        Interaction.hideLoading()
        console.log(data, '执行了');
        vm.setData({
          getInfo: false
        })

        Interaction.hideLoading()
        if (data && data.ret) {
          if (data.ret == 1) {
            console.log(data, '执行了');
            respStatus.adata.memberInfo = data.data
            // vm.getMerchantAccountTypeList()
            console.log(data.data, 'userInfo');
            console.log(data.data.mobilePhone, 'mobilePhone4');
            if (data.data.mobilePhone) {
              vm.setData({
                memberInfo: data.data,
                mobilePhone: data.data.mobilePhone,
                duration: data.data.point,
                balance: data.data.balance
              })
            }

            wx.setStorageSync('accountList', JSON.stringify(data.data.accountList))
            console.log(vm.data.memberInfo)
            if (type == 'code') {
              Interaction.navigateTo('/pages/memberCode/memberCode?name=member');
            }
            if (type == 'oilCard') {
              Interaction.navigateTo('/pages/oilCard/oilCard?balance=' + data.data.balance + '&isSetPwd=true');
            }
          } else if (data.ret == 2) {
            if (data.msg == '会员未注册') {
              vm.setData({
                mobilePhone: '',
              })
            }
            Interaction.toastNone(data.msg)
          } else {
            vm.setData({
              mobilePhone: '',
            })
            Interaction.toastNone(data.msg)
          }
        }
      })
    } else {
      accountCTL.memberInfo().then(data => {
        Interaction.hideLoading()
        console.log(data, '执行力');
        vm.setData({
          getInfo: false
        })
        console.log(data.data.mobilePhone, 'mobilePhone11');
        if (data.data.mobilePhone) {
          vm.setData({
            memberInfo: data.data,
            mobilePhone: data.data.mobilePhone,
            duration: data.data.point,
            balance: data.data.balance
          })
        }
      })
    }

  },
  clickCode() {
    this.setData({
      showCodePop: true
    })
    this.memberPayQrcode()
  },
  memberPayQrcode: function () {
    const vm = this
    accountCTL.memberPayQrcode().then(data => {
      Interaction.hideLoading()
      
      if (data.ret == 1) {
        var imgData = QR.drawImg(data.payQrcode, {
          typeNumber: 6,
          errorCorrectLevel: 'M',
          size: 320
        })
        this.setData({
          qrcodeURL: imgData
        })
        vm.settimer()
      } else {
        Interaction.toastNone(data.msg)
      }
    })

  },
  closeCodePop() {
    console.log('1')
    if (timeIntervar1) {
      clearInterval(timeIntervar1);
    }
    this.setData({
      showCodePop: false,
      qrcodeURL: '',
    })
  },
  // 倒计时
  settimer() {
    const vm = this
    if (timeIntervar1) {
      clearInterval(timeIntervar1);
    }
    timeIntervar1 = setInterval(() => {
      vm.memberPayQrcode()
    }, 120000);
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toCom: function () {
    const vm = this;
    Interaction.navigateTo('/pages/cropper/cropper');
  },
  /**
   * 获取手机号
   */
  getPhoneNum(e) {
    console.log(e, 'getPhoneNum----------------111')
    const vm = this;
    if (e.timeStamp - vm.data.getphoneClick < 300) {
      return
    }
    vm.data.getphoneClick = e.timeStamp;
    let dataset = e.target.dataset
    let memberInfo = vm.data.memberInfo
    if (e.detail.code) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      rCtl.getPhoneNumV2({
        authCode: e.detail.code,
        mpOpenId: vm.data.optionsData.mpOpenId || "",
        staffId: vm.data.optionsData.staffId || "",
      }).then(data => {
        let cellNum = data.mobilePhone
        Interaction.hideLoading()
        console.log("PWD::::::::::" + data.isSetPwd)
        console.log("getPhoneNumUserLevel::::::::::" + data.userLevel)
        if (data instanceof UserInfo) {
          let tempMem;
          if (!cellNum || cellNum == "NAN") {
            tempMem = {
              'userLevel': data.userLevel,
              'isSetPwd': data.isSetPwd
            }
          } else {
            tempMem = {
              ...vm.data.memberInfo,
              'isSetPwd': data.isSetPwd
            }
          }

          vm.getTokenByCode((cellNum) => {})
          console.log("getPhoneNumtempMem::::::::::" + tempMem)
          vm.setData({
            subscribeActivities: false,
            mobilePhone: respStatus.cellNum,
            memberInfo: tempMem,
          });
          vm.bindMerchantStationzc()
          // if (dataset.type && dataset.type == 'openCard') {
          //   // Interaction.navigateTo('/pages/comAccountOpen/comAccountOpen')
          //   Interaction.navigateTo('/pages/setPaw/setPaw')
          // } else if (dataset.type && dataset.type == 'mall') {
          //   Interaction.navigateToMiniProgram({
          //     appId: Config.toAppID
          //   })
          // } else if (dataset.path == 'noninductive') {
          //   if (this.data.memberInfo.isSetPwd) {
          //     if (vm.data.memberInfo.isFreePwd) {
          //       Interaction.navigateTo('/pages/noninductive/noninductive/noninductive')
          //     } else {
          //       Interaction.navigateTo('/pages/noninductive/openNoninductive/openNoninductive')
          //     }
          //   } else {
          //     vm.setData({
          //       tipPopShow: true,
          //       tips: 'href',
          //       tipPopTittle: '提示',
          //       tipPopTxt: '您必须要开通电子储值卡，才能使用此功能',
          //       showClose: true,
          //     })
          //   }
          // } else if (dataset.type && dataset.type == 'code') {
          //   vm.setData({
          //     getInfo: true
          //   })
          //   console.log('执行方法3')
          //   vm.getmemberInfo('code');
          // } else if (dataset.type && dataset.type == 'oilCard') {
          //   if (vm.data.memberInfo.isSetPwd) {
          //     vm.getmemberInfo('oilCard')
          //   } else {
          //     Interaction.navigateTo("/pages/setPaw/setPaw?path=/pages/oilCard/oilCard&balance=0.00&phoneNum=" + vm.data.mobilePhone)
          //   }
          // } else {
          //   if (dataset.path == 'vehicle') {
          //     if (memberInfo.isCarAudit && memberInfo.isCarAudit != 1) {
          //       Interaction.navigateTo('/pages/car/vehicleInfo/vehicleInfo')
          //     } else {
          //       Interaction.navigateTo('/pages/car/vehicleCertification/vehicleCertification')
          //     }
          //     return
          //   }
          //   Interaction.navigateTo(`${dataset.path}?active=0`)
          // }
        }
      })

    } else {
      if (e.detail.encryptedData) {
        wx.login({
          success: res => {
            console.log(res)
            rCtl.getPhoneNum({mpOpenId: vm.data.optionsData.mpOpenId || "",
            staffId: vm.data.optionsData.staffId || "", authCode: res.code, encryptedData: e.detail.encryptedData, iv: e.detail.iv}).then(data => {
                Interaction.hideLoading()
                let cellNum = data.mobilePhone
                console.log("PWD::::::::::" + data.isSetPwd)
                console.log("getPhoneNumUserLevel::::::::::" + data.userLevel)
                if (data instanceof UserInfo) {
                  let tempMem;
                  if (!cellNum || cellNum == "NAN") {
                    tempMem = {
                      'userLevel': data.userLevel,
                      'isSetPwd': data.isSetPwd
                    }
                  } else {
                    tempMem = {
                      ...vm.data.memberInfo,
                      'isSetPwd': data.isSetPwd
                    }
                  }

                  vm.getTokenByCode((cellNum) => {})
                  console.log("getPhoneNumtempMem::::::::::" + tempMem)
                  vm.setData({
                    subscribeActivities: false,
                    mobilePhone: respStatus.cellNum,
                    memberInfo: tempMem
                  });
                  vm.bindMerchantStationzc()
                }
            })
            }
        })
      } else {
        Interaction.tipsModal('未获取到授权信息')
      }
    }
    
    
    // else {
    //   if (dataset.path == "/pages/transaction/transaction") {
    //     Interaction.navigateTo(`${dataset.path}?active=0`)
    //   }
    // }

  },
  /**
   * 提示弹窗关闭方法
   */
  tippopClose: function (e) {
    let tips = e.detail
    console.log(tips)
    this.setData({
      firstClick: true,
      tipPopShow: false,
    })
  },
  /**
   * 提示弹窗按钮方法
   */
  tippopBtn: function (e) {
    const vm = this
    if (e.timeStamp - vm.data.tippopClick < 300) {
      return
    }
    vm.data.tippopClick = e.timeStamp;
    vm.setData({
      firstClick: true,
      tipPopShow: false,
    })
    // if (this.data.memberInfo.idNo) {
    Interaction.navigateTo('/pages/setPaw/setPaw')
    // } else {
    //   Interaction.navigateTo('/pages/comAccountOpen/comAccountOpen')
    // }
  },
  /**
   * 跳转页面
   */
  tourl: function (e) {
    console.log(this.data.userInfo, 'userInfo');
    const vm = this;
    if (!this.data.isLogin) {
      Interaction.toastNone("登录中");
      return
    }
    if (e.timeStamp - vm.data.urlClick < 300) {
      return
    }
    vm.data.urlClick = e.timeStamp;
    let dataset = e.currentTarget.dataset
    let memberInfo = this.data.memberInfo
    if (dataset.type && dataset.type == 'searchStationList') {
      Interaction.navigateTo(dataset.path + '?type=1');
    } else if (dataset.type && (dataset.type == 'oilCard' || dataset.type == 'memberCode')) {
      console.log('油卡和会员码')
      if (vm.data.memberInfo.isSetPwd || (vm.data.memberInfo.hasOwnProperty('isHasPwdC') && !vm.data.memberInfo.isHasPwdC)) {
        Interaction.navigateTo(dataset.path + '?name=member&balance=' + memberInfo.balance + '&isSetPwd=' + memberInfo.isSetPwd);
      } else {
        var path = dataset.path + '&name=member&balance=' + memberInfo.balance + '&isSetPwd=' + memberInfo.isSetPwd;
        console.log(dataset.path)
        Interaction.navigateTo('/pages/setPaw/setPaw?path=' + path)
      }
    } else if (dataset.type && dataset.type == 'ticket') {
      Interaction.navigateTo(`${dataset.path}`)
    } else if (dataset.type && dataset.type == 'comRecharge') {
      console.log(vm.data.memberInfo.isSetPwd, 'isSetPwdmemberInfo');
      console.log(11111111111);
      // vm.getmemberInfo()
      if (vm.data.memberInfo.isSetPwd || (vm.data.memberInfo.hasOwnProperty('isHasPwdC') && !vm.data.memberInfo.isHasPwdC)) {
        // vm.haveCard()
        Interaction.navigateTo("/pages/rechargeAll/recharge/recharge")
      } else {
        Interaction.navigateTo('/pages/setPaw/setPaw?path=' + 'comRecharge')
      }
    } else if (dataset.path == 'noninductive') {
      console.log(vm.data.memberInfo.isFreePwd)
      if (vm.data.memberInfo.isSetPwd) {
        if (vm.data.memberInfo.isFreePwd) {
          if (vm.data.memberInfo.carNumbers.length > 0) {
            Interaction.navigateTo('/pages/noninductive/noninductive/noninductive')
          } else {
            Interaction.navigateTo('/pages/noninductive/addCarPlate/addCarPlate')
          }
        } else {
          Interaction.navigateTo('/pages/noninductive/openNoninductive/openNoninductive')
        }
      } else {
        vm.setData({
          tipPopShow: true,
          tips: 'href',
          tipPopTittle: '提示',
          tipPopTxt: '您必须要开通电子储值卡，才能使用此功能',
          showClose: true,
        })
      }
    } else if (dataset.path == 'changePsw') { //修改支付密码
      if (this.data.memberInfo.isSetPwd) {
        Interaction.navigateTo('/pages/changePsw/changePsw');
      } else {
        var path = dataset.path + '&name=member&balance=' + memberInfo.balance + '&isSetPwd=' + memberInfo.isSetPwd;
        console.log(dataset.path)
        Interaction.navigateTo('/pages/setPaw/setPaw?path=' + path)
        // vm.setData({
        //   tipPopShow: true,
        //   tips: 'href',
        //   tipPopTittle: '提示',
        //   tipPopTxt: '您必须要开通电子储值卡，才能使用此功能',
        //   showClose: true,
        // })
      }
    } else if (dataset.type == 'carAuth') { //专车认证
      if (this.data.memberInfo.isCarAudit == 1) {
        Interaction.navigateTo('/pages/car/vehicleCertification/vehicleCertification')
      } else {
        Interaction.navigateTo('/pages/car/vehicleInfo/vehicleInfo')
      }
    }  else if (dataset.path == 'addGarage') { //车库
      Interaction.navigateTo('/pages/car/addGarage/addGarage?oilInfoId=' + vm.data.memberInfo.oilInfoId + '&oilName=' + vm.data.memberInfo.oilName + '&carNum=' + vm.data.memberInfo.carNum + '&mobilePhone=' + vm.data.memberInfo.mobilePhone)
    } else if (dataset.type && dataset.type == 'mall') {
      console.log(respStatus.adata, 'respStatus');
      if (!wx.getStorageSync('didiSelUid')) {
        this.data.noseluid = this.data.noseluid + 1
        if (this.data.noseluid > 5) {
          this.data.noseluid = 0
          vm.bindMerchantStationzc()
        } else {
          Interaction.toastNone("正在获取油站信息，请稍等");
        }
        return
      }
      var userInfo = respStatus.adata;
      var nickName = '';
      if (respStatus.adata.memberInfo.firstName) {
        nickName = respStatus.adata.memberInfo.firstName
      } else {
        if (respStatus.adata.userInfo && respStatus.adata.userInfo.nickName) {
        nickName = respStatus.adata.userInfo.nickName
        }
      }
      // if (!userInfo.selUid) {
        userInfo.selUid = wx.getStorageSync('didiSelUid')
      // }
      // if (!userInfo.selName) {
        userInfo.selName = wx.getStorageSync('didiSelName')
      // }
      console.log(userInfo, this.data.userInfo, 'userInfo-userInfo');
      Interaction.navigateTo('/pages/mallWebview/mallWebview?token=' + wx.getStorageSync('AuthToken') + "&cellNum=" + this.data.userInfo.cellNum + '&merchantId=' + userInfo.merchantId + '&selUid=' + userInfo.selUid + '&selName=' + userInfo.selName + '&nickName=' + nickName + '&headPic=' + (userInfo.userInfo != null ? "userInfo.userInfo.avatarUrl" : ''))
      console.log('token', wx.getStorageSync('AuthToken'));
      console.log('cellNum', userInfo.cellNum);
      console.log('merchantId', userInfo.merchantId);
      console.log('selName', userInfo.selName);
      console.log('selUid', userInfo.selUid);
      console.log('nickName', nickName);
      // console.log('headPic', '头像', userInfo.userInfo.avatarUrl);
    } else if (dataset.type && dataset.type == 'todayOilPrices') {
      Interaction.navigateTo(`${dataset.path}?didiSelUid=${vm.data.nearoil.uid}`)
    } else if (dataset.type && dataset.type == 'invoice') {
      // const param = {
      //   token: wx.getStorageSync('AuthToken'),
      //   cellNum: this.data.mobilePhone,
      //   didiSelUid: wx.getStorageSync('didiSelUid'),
      //   source: "wxMini",
      // }
      const param = `${Config.cancelCouponUrl}/?appId=${Config.appID}#/invoice?appId=${Config.appID}&token=${wx.getStorageSync('AuthToken')}&cellNum=${this.data.mobilePhone}&didiSelUid=${wx.getStorageSync('didiSelUid')}&source=wxMini`
      console.log(encodeURIComponent(param))
      // token=${wx.getStorageSync('AuthToken')}&cellNum=${this.data.mobilePhone}&didiSelUid=${wx.getStorageSync('didiSelUid')}&source=wxMini
      Interaction.navigateTo(`/pages/pageTransitionalWebview/pageTransitionalWebview?url=${encodeURIComponent(param)}}`)
    }else {
      Interaction.navigateTo(`${dataset.path}?active=0`)
      // `${e.currentTarget.dataset.path}?firstName=`+firstName+'&mobilePhone='+mobilePhone+'&avatarUrl='+avatarUrl
    }
  },
  wait: function () {
    Interaction.toastLoading('敬请期待');
  },
  // 判断是否是多账户
  getMerchantAccountTypeList: function () {
    const vm = this;
    accountCTL.getMerchantAccountTypeList({}).then(data => {
      Interaction.hideLoading();
      if (data && data.ret) {
        if (data.ret == 1) {
          vm.setData({
            accountType: data.length
          });
          console.log(vm.data.accountType)
        } else if (data.ret == 2) {
          Interaction.toastNone(data.msg)
        } else {
          Interaction.toastNone(data.msg)
        }
      }
    })
  },
  // 三立菜单进入本页 定位使用方法
  //  登录
  getTokenByCode(callback) {
    // console.log("::::::::login callback :::::::::::::::::" + callback)
    const vm = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //access_token、memberId、merchantId、mobilePhone、token_type、userId
        //   setTimeout(()=>{
        ctl.getTokenByCode({
          code: res.code
        }).then(data => {
          if (callback != null) {
            vm.setData({
              isLogin: true,
            })
            callback(data.cellNum);
          }

          // this.getSwiperList()
          Interaction.hideLoading()
          if (data instanceof UserInfo) {
            console.info('登录操作1', data);
            // Interaction.umaUserId(data.userId);
            // wx.uma.setUserid(data.userId);
            console.info('umeng set uid', data.userId);
            console.log(data, 'getPhoneNum----------------2');
            vm.setData({
              cellNum: respStatus.cellNum,
              mobilePhone: data.cellNum,
              isLogin: true,
            })
            if (data.cellNum && data.cellNum != "NAN") {
              vm.getmemberInfo()
              // console.log('getPhoneNum----------------3InFO');
            }
            respStatus.adata.selUid = data.merchantId;
            wx.setStorageSync('didiMerchantId', data.merchantId)
            
          } else {
            vm.setData({
              isLogin: true,
            })
          }
          log.info(`获取活动${vm.data.optionsData}~~~${vm.data.optionsData.source}~~~`)
          if (vm.data.optionsData.source && vm.data.optionsData.source=='mp') { // 从公众号点击卡片进入
            vm.getRunningSubscribeActivities()
          }
          vm.getMerchantPageConfig()
          vm.recallCoupons()
        });
      }
    })
  },


  getMerchantPageConfig() {
    const vm = this
    accountCTL.getMerchantPageConfig().then(res => {
      console.log(2222222, res)
      console.log(`getMerchantPageConfig~${vm.data.mobilePhone}~ ${respStatus.token} ~${JSON.stringify(res)}`)
      log.info(`getMerchantPageConfig~${vm.data.mobilePhone}~ ${respStatus.token} ~${JSON.stringify(res)}`)
      if (res && res.ret == 1) {
        if (res.data) {
          let data = res.data
          // data.hasOilPriceToday = true
          // data.leastRechargeTag = true
          // data.leastRecharge = "10.00"
          respStatus.adata.merchantPageConfig = data
          console.log(respStatus)
          // data.hasDzp = true
          vm.setData({
            hasCoupon: data.hasCoupon,
            hasMall: data.hasMall,
            hasDzp: data.hasDzp,
            hasCard: data.hasCard,
            hasPwdConfig: data.hasPwdConfig,
            hasCarAudit: data.hasCarAudit,
            hasOilPriceToday: data.hasOilPriceToday,
            hasGroup: data.hasGroup,
            hasOil: data.hasOil,
            hasRecharge: data.hasRecharge,
            hasTicket: data.hasTicket,
            homeHeadIMG: data.advertisement && data.advertisement.mainUrl ? data.advertisement.mainUrl : '',
            picList: data.advertisement && data.advertisement.picList ? data.advertisement.picList : '',
            picTiele: data.advertisement && data.advertisement
            // hasMall: true,
            // hasRecharge: true,
            // hasTicket: true,
          })
          vm.getLoc(vm, respStatus.adata.selUid);
        }
      }
    })

  },
  getBannerAndPriceNew: function () { // 获取每升直降活动
    const vm = this
    if (!vm.data.nearoil.uid) {
      return
    }
    rCtl.getBannerAndPriceNew({merchantId: vm.data.nearoil.uid,fuelCode: '',payType: '',accountType: '',showAllDiscountPrice: true}).then(data => {
      Interaction.hideLoading()
      // data = {"ret":1,"msg":"成功","data":{"discountShowPrice":"6.60","banner":[{"stationPrice":"7.20","payType":14,"discountShowPrice":"6.60","banner":["满1元立减¥0.60/L"],"guidePrice":"7.20","tag":"92#","fuleCode":"1943603"}],"showAllDiscountPrice":true,"isShowBanner":true}}
      if (data.ret) {
        if (data.ret ==1) {
          vm.setData({
            directLists: data.data && data.data.banner ? data.data.banner.slice(0, 3) : [],
          })
          console.log(vm.data.directLists)
        } else {
          Interaction.toastNone(data.msg)
        }
      } else {
        vm.setData({
          discountShowPrice: '',
          directLists: []
        })
      }
    })
  },
  getLoc(vm, merchantId) {
    console.log(merchantId);
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userLocation'])
        if (res.authSetting['scope.userLocation'] == undefined) {
          vm.getOilStation('', '', merchantId)
        } else {
          wx.getLocation({
            type: 'gcj02',
            success(res) {
              const latitude = res.latitude
              const longitude = res.longitude
              const speed = res.speed
              const accuracy = res.accuracy
              vm.getOilStation(latitude, longitude, merchantId)
            },
            fail(res) {
              console.log(res);
              // 定位失败
              rbj = new Refuel({
                merchantId: merchantId,
                userX: vm.data.userX,
                userY: vm.data.userY
              });
              var globalData = respStatus.adata; //getApp().globalData
              globalData.selUid = '';
              globalData.selName = '';
              globalData.selAddress = '';
              vm.setData({
                name: '',
                address: ''
              });
              // vm.goStationLists()
              vm.getOilStation('', '', merchantId)
            }
          })
        }
      }
    })


  },
  // 视频开始播放
  play() {
    console.log('开始或继续事件')
    this.setData({
      playbool: false,

    })
  },
  pause() {
    var vm = this
    var imgllist = [...vm.data.picList]
    this.setData({
      picList: []
    })
    this.setData({
      playbool: true, //开启轮播
      picList: imgllist
    })
    console.log("暂停了")
  },
  // 视频播放结束
  ended(e) {
    var vm = this
    console.log('播放结束', e.currentTarget.dataset.uid)
    var imgllist = [...vm.data.picList]
    this.setData({
      picList: []
    })
    this.setData({
      playbool: true, //开启轮播
      picList: imgllist
    })
  },
  // 获取最近油站
  getOilStation(latitude, longitude, merchantId) {
    const vm = this
    vm.setData({
      userX: latitude,
      userY: longitude
    })
    rbj = new Refuel({
      // merchantId: merchantId,
      userX: latitude,
      userY: longitude
    });
    searchCTL.getOilStation({
      stationName: '',
      oilCode: '',
      userX: wx.getStorageSync('userX'),
      userY: wx.getStorageSync('userY'),
      merchantId: wx.getStorageSync('didiMerchantId')
    }).then(data => {
      console.log('获取油站11111111111', data)
      Interaction.hideLoading();
      if (data && data.data) {
        if (data.data.length > 0) {
          vm.setData({
            nearStationList: data.data,
            getNearStation: data.isLimitDistance,
            nearoil: data.data[0], //最近油站
  
          })
          if (vm.data.hasOilPriceToday) {
            vm.getBannerAndPriceNew()
          }
          wx.setStorageSync('nearoil', data.data[0])
          if (!data.isLimitDistance) {
            vm.setData({
              cacheStation: data.data[0],
              getInfo: true
            })
            vm.confirmNearStation();
            console.log('执行方法4')
            // vm.getmemberInfo()
            // vm.getUserIdentity()
          }
        } else if (data.data.length == 1) {
          vm.setData({
            getNearStation: false
          })
          vm.setData({
            cacheStation: data.data[0]
          })
          vm.confirmNearStation();
        } else {
          Interaction.toastNone('抱歉，您附近无油站！')
        }
      }
      
    });
  },
  // 前往选择油站
  goStationLists() {
    const vm = this
    wx.navigateTo({
      url: '/pages/searchStationList/searchStationList',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        selectionOilStation: function (data) {
          console.log(data)
          var globalData = respStatus.adata;
          vm.setData({
            address: globalData.selAddress,
            name: globalData.selName
          });
          console.log(globalData)
          rCtl.bindMerchantStation({
            merchantId: globalData.selUid
          }).then(data => {
            Interaction.hideLoading()
            vm.setData({
              getInfo: true
            })
            vm.data.jURL = data.url
            console.log('执行方法5')
            vm.getmemberInfo();
            if (Config.ddFlag == 1) {
              console.log('绑定')
            }
          })
          rCtl.getNozzleList({
            merchantId: globalData.selUid
          }).then(data => {
            Interaction.hideLoading()
            if (data && data.data) {
              var nozzlesOpen = data.data;
              for (var k = 0; k < nozzlesOpen.length; k++) {
                if (Number(k + 1) % 4 == 0) {
                  nozzlesOpen[k].ishaveMargin = 'true';
                } else {
                  nozzlesOpen[k].ishaveMargin = 'false';
                }
              }
              vm.setData({
                nozzles: data.data,
                nozzlesOpen: nozzlesOpen,
                searchTrades: data.searchTrades
              })
            }
          })
        }
      },
    })
  },
  // 从附近的油站中选择油站
  bindNearStation(e) {
    const vm = this;
    vm.setData({
      cacheStation: e.currentTarget.dataset.station
    })
  },
  // 确定选择附近油站
  confirmNearStation() {
    const vm = this;
    if (wx.getStorageSync('didiSelUid')) {
      return
    }
    var station = vm.data.cacheStation;
    if (!station) {
      return
    }
    vm.setData({
      address: station.address,
      name: station.stationName,
      selUid: station.uid,
      getNearStation: false
    })
    var globalData = respStatus.adata; //getApp().globalData
    console.log(respStatus.adata)
    new RespStatus({
      selUid: station.uid
    })
    globalData.selUid = station.uid;
    globalData.selName = station.stationName;
    globalData.selAddress = station.address;
    // 绑定油站 用户选择油站
    rCtl.bindMerchantStation({
      merchantId: station.uid
    }).then(data => {
      Interaction.hideLoading()
      if (Config.ddFlag == 1) {
        wx.setStorageSync('didiSelUid', station.uid)
        wx.setStorageSync('didiSelName', station.stationName)
        wx.setStorageSync('didiSelAddress', station.address)
        wx.setStorageSync('style', data.style)
        vm.data.jURL = data.url
      }
    });
    // 油品和油枪列表
    rCtl.getNozzleList({
      merchantId: station.uid
    }).then(data => {
      Interaction.hideLoading()
      var nozzlesOpen = data.data;
      for (var k = 0; k < nozzlesOpen.length; k++) {
        if (Number(k + 1) % 4 == 0) {
          nozzlesOpen[k].ishaveMargin = 'true';
        } else {
          nozzlesOpen[k].ishaveMargin = 'false';
        }
      }

      vm.setData({
        nozzles: data.data,
        nozzlesOpen: nozzlesOpen,
        searchTrades: data.searchTrades
      })
    })
  },
  bindMerchantStationzc() {
    const vm = this
    rCtl.bindMerchantStation({
      merchantId: vm.data.nearoil.uid
    }).then(data => {
      Interaction.hideLoading()
      wx.setStorageSync('didiSelUid', vm.data.nearoil.uid)
      wx.setStorageSync('didiSelName', vm.data.nearoil.stationName)
    });
  },
  //单选按钮  支付方式
  radioChange(e) {
    console.log(e);
    const radios = this.data.radios;
    if (e.detail.value == 4 || e.currentTarget.dataset.val == 998 || e.currentTarget.dataset.val == 999) {
      Interaction.toastLoading('敬请期待');
      return
    }
    for (let i = 0, len = radios.length; i < len; ++i) {
      if (e.currentTarget.dataset.val) {
        radios[i].checked = radios[i].value == e.currentTarget.dataset.val
        this.setData({
          radios,
          payType: e.currentTarget.dataset.val
        })
      }
      if (e.target.dataset.val) {
        radios[i].checked = radios[i].value == e.target.dataset.val
        this.setData({
          radios,
          payType: e.target.dataset.val
        })
      }
    }

  },
  //判断用户身份
  getUserIdentity(situation, path) {
    const vm = this;
    console.log("判断身份");
    console.log(situation, path);
    // return
    teamCTL.getUserIdentity({}).then(data => {
      Interaction.hideLoading();
      if (data && data.ret) {
        if (data.ret == 1) {
          console.log('1非会员，2会员，3司机，4单位，6单位正在审核，7司机正在审核')
          vm.setData({
            userIdentity: data.userIdentity
          });
          respStatus.adata.userIdentity = data.userIdentity

          // console.log(situation)
          // if(situation == 1){//单位
          //   if(this.data.userIdentity == 4 || this.data.userIdentity == 5){
          //     Interaction.navigateTo(`${path}?active=0`)
          //   }else{
          //     Interaction.navigateTo('/pages/teamCar/register/register')
          //   }
          //   return
          // }
          // if(situation == 2){//司机
          //   if(this.data.userIdentity == 3 || this.data.userIdentity == 5){
          //     Interaction.navigateTo(`${path}?active=0`)
          //   }else{
          //     console.log('111')
          //     Interaction.navigateTo('/pages/teamCar/addTeam/addTeam')
          //   }
          //   return
          // }
        } else if (data.ret == 2) {
          Interaction.toastNone(data.msg)
        } else {
          Interaction.toastNone(data.msg)
        }
      }
    })
  },
  // 获取领取的卡（开通的账户）
  haveCard: function () {
    const vm = this;
    accountCTL.getMemberAccountTypeList({}).then(data => {
      wx.hideLoading({
        success: (res) => {
          console.log('隐藏成功')
        },
      })
      if (data && data.ret) {
        if (data.ret == 1) {
          if (data.status ==1 ) {
            Interaction.navigateTo("/pages/cardList/cardList?type=1")
          } else {
            if (data.data.length == 1) {
              Interaction.navigateTo("/pages/comRecharge/comRecharge?uid=" + data.data[0].uid)
            } else {
              Interaction.navigateTo("/pages/cardList/cardList?type=1")
            }
          }
        } else if (data.ret == 2) {
          Interaction.toastNone(data.msg)
        } else {
          Interaction.toastNone(data.msg)
        }
      }
    })
  },

  //点击首页的一键加油
  backRefule: function (e) {
    var vm = this
    // wx.requestSubscribeMessage({
    //   tmplIds: ['hwHneM8AJBZd2RX_6i1ExpcePcoCoRm0sIZmoIZINFk','75VeMYR8H91FwRz_vaitbxH45vPdP2X5uYSaqD654uE','YrxTkHMOOkDDzPoQ8xNTC7JKV_Clb86PMIBisUU1Q3E'],
    //   success(res) {
    //     console.log(res)
    //   },
    //   fail(err) {
    //     console.log("!!!!!!! " + JSON.stringify(err));
    //     if (err.errCode == 20004) {
    //       Interaction.toastNone("您禁止了订阅消息");
    //     } else if (err.errCode == 20013) {
    //       Interaction.toastNone("不允许通过该接口订阅设备消息");
    //     } else if (err.errCode == 10003) {
    //       Interaction.toastNone("网络问题，订阅请求发送失败");
    //     } else if (err.errCode == 10002) {
    //       Interaction.toastNone("网络问题，请求消息列表失败");
    //     } else if (err.errCode == 10004) {
    //       Interaction.toastNone("参数类型错误");
    //     } else {
    //       Interaction.toastNone("订阅失败" + err.errCode);
    //     }
    //   }
    // })
    // return


    console.log(e.currentTarget.dataset.balance, 'balancebalance')
    wx.setStorageSync('didiSelUid', vm.data.nearoil.uid)
    wx.setStorageSync('didiSelName', vm.data.nearoil.stationName)
    wx.setStorageSync('didiSelAddress', vm.data.nearoil.address)
    wx.setStorageSync('didiSeldistance', vm.data.nearoil.distance)

    // wx.setStorageSync('didiSelUid', e.target.dataset.uid)
    // wx.setStorageSync('didiSelName', e.target.dataset.name)
    // wx.setStorageSync('didiSelAddress', e.target.dataset.address)
    // wx.setStorageSync('didiSeldistance', e.currentTarget.dataset.juli)
    wx.setStorageSync('didiSelPrice', vm.data.nearoil.oilPrice) //油品价格
    wx.setStorageSync('didiselectOil', '10005001') //油品代码
    wx.setStorageSync('didiselectoilname', '92号燃油') //油品名称
    wx.setStorageSync('didiSelx', vm.data.nearoil.lat) //油站纬度latitude
    wx.setStorageSync('didiSely', vm.data.nearoil.lon) //油站的经度
    console.log(vm.data.nearoil.lat, vm.data.nearoil.lon, '油站纬度latitude,油站的经度');
    Interaction.navigateTo(`../../JConfiguration/pages/oilTransitional/oilTransitional?didiSelUid=${vm.data.nearoil.uid}&continuePay=false`);
    // if (vm.data.jURL) {
    //   rCtl.bindMerchantStation({
    //     merchantId: vm.data.nearoil.uid
    //   }).then(data => {
    //     Interaction.hideLoading()
    //     if (data.url) {
    //       vm.data.jURL = data.url
    //       if (data.authorized) {
    //         Interaction.navigateTo(`../../JConfiguration/pages/JWebView/JWebView?url=${encodeURIComponent(data.url)}`);
    //       } else {
    //         Interaction.navigateTo(`../../JConfiguration/pages/oilTransitional/oilTransitional?didiSelUid=${vm.data.nearoil.uid}`);
    //       }
    //     } else {
    //       wx.navigateTo({
    //         url: '/pages/refuel/refuel?balance=' + e.currentTarget.dataset.balance,
    //       })
    //     }
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/refuel/refuel?balance=' + e.currentTarget.dataset.balance,
    //   })
    // }


    // Interaction.redirectTo("/pages/refuel/refuel")

  },
  toNavigation: function (e) {
    var vm = this;
    // if (wx.getStorageSync('headerImg')=='') {
    //   this.getUserProfile()
    //   return
    // }
    wx.getSetting({
      success(res) {
        console.log(res.authSetting, res.authSetting['scope.userLocation'], 'getSetting');
        if (res.authSetting['scope.userLocation'] == undefined) {
          wx.getLocation({
            type: 'gcj02',
            success(res) {
              const latitude = res.latitude
              const longitude = res.longitude
              const speed = res.speed
              const accuracy = res.accuracy
              vm.setData({
                userX: latitude,
                userY: longitude
              })
              rbj = new Refuel({
                userX: latitude,
                userY: longitude
              });
              wx.navigateTo({
                url: '/pages/mapNavigation/mapNavigation?lat=' + vm.data.nearoil.lat + '&lon=' + vm.data.nearoil.lon + '&stationName=' + vm.data.nearoil.stationName,
              })
            },
            fail(res) {
              console.log(res);
              // 定位失败

            }
          })
        } else if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            content: '请求获取位置权限',
            success: function (res) {
              if (res.confirm == false) {
                return false;
              }
              wx.openSetting({
                success(res) {
                  console.log(res, 'resres');
                  //如果再次拒绝则返回页面并提示
                  if (!res.authSetting['scope.userLocation']) {
                    wx.showToast({
                      title: '此功能需获取位置信息，请重新设置',
                      duration: 3000,
                      icon: 'none'
                    })
                  } else {
                    //允许授权，调用地图
                    cb() // 回调地址
                  }
                }
              })
            }

          })
        } else {
          console.log(e, 'eeeeeeee');
          if (vm.data.nearoil.lat == '' || vm.data.nearoil.lon == '') {
            return
          }
          console.log(vm);
          if (rbj.userX || rbj.userY) {
            wx.navigateTo({
              url: '/pages/mapNavigation/mapNavigation?lat=' + vm.data.nearoil.lat + '&lon=' + vm.data.nearoil.lon + '&stationName=' + vm.data.nearoil.stationName,
            })
          } else {
            console.log('经度或纬度是空，定位失败')
            wx.getLocation({
              type: 'gcj02',
              success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
                vm.setData({
                  userX: latitude,
                  userY: longitude
                })
                rbj = new Refuel({
                  userX: latitude,
                  userY: longitude
                });
                wx.navigateTo({
                  url: '/pages/mapNavigation/mapNavigation?lat=' + vm.data.nearoil.lat + '&lon=' + vm.data.nearoil.lon + '&stationName=' + vm.data.nearoil.stationName,
                })
              },
              fail(res) {
                console.log(res);
                // 定位失败

              }
            })
            // Interaction.toastNone('获取定位失败，请开启权限重新定位')
          }
        }

      }
    });


    // var vm = this;

    // if (rbj.userX || rbj.userY) {
    //   wx.navigateTo({
    //     url: '/pages/mapNavigation/mapNavigation?lat=' + vm.data.nearoil.lat + '&lon=' + vm.data.nearoil.lon + '&stationName=' + vm.data.nearoil.stationName,
    //   })
    // } else {
    //   console.log('经度或纬度是空，定位失败')
    //   Interaction.toastNone('获取定位失败，请开启权限重新定位')
    // }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('onReady')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (timeIntervar1) {
      clearInterval(timeIntervar1);
    }
  },
})