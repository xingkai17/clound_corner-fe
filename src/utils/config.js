
// 测试环境请求域名
// let baseURI = 'https://vchat.paysys.cn/';

// let baseURI = 'https://didi.paysys.cn/';
// let baseAPI = 'didiApi/';
// let billbaseAPI = 'didiBillAdminApi/';
// let didiWebViewUrl = "https://vchat.paysys.cn/didiPay/#/"
// let cancelCouponUrl = 'https://didi.paysys.cn/didiH5Pay'; //洗车券核券跳转路径
// 生产环境请求域名 更换sass2.0后 下列接口地址及appid不需要改变
// 暂用暂用暂用暂用暂用暂用
// let baseURI = 'https://pre.didi.joilpay.com/'//17 专用;
// let baseAPI = 'webapi/';
// let billbaseAPI = 'billAdminApi/';
// let didiWebViewUrl = "https://pre.didi.joilpay.com/didiPay/#/"
// let mallUrl = 'https://pre.didi.joilpay.com/h5mall/dist/index.html?';//H5积分商城外跳路径

// let baseURI = 'https://xiaoju.joilpay.com/'//17 专用;
// let baseAPI = 'webapi/';
// let billbaseAPI = 'billAdminApi/';
// let didiWebViewUrl = "https://xiaoju.joilpay.com/didiPay/#/"
// let mallUrl = 'https://xiaoju.joilpay.com/h5mall/dist/index.html?';//H5积分商城外跳路径

let baseURI = 'https://didi.joilpay.com/'//17 专用;
let baseAPI = 'webapi/';
let billbaseAPI = 'billAdminApi/';
let didiWebViewUrl = "https://didi.joilpay.com/didiPay/#/"
let mallUrl = 'https://didi.joilpay.com/h5mall/dist/index.html?';//H5积分商城外跳路径
let cancelCouponUrl = 'https://didi.joilpay.com/didiH5Pay'; //洗车券核券跳转路径
// let imgBaseURI = 'https://img.paysys.cn/'
let imgBaseURI = 'https://didi.joilpay.com/'


let groupApi = 'groupApi/'; // 车队卡api
// let version = 'didiApi-V2.0';
// let version = 'didiApi-V2.2.4';
// let version = 'didiApi-V2.3-marketing';
// let version = 'didiApi-V2.9';
let version = '3.0.4-SNAPSHOT';
// 15 杰嘉迪（滴滴测试版小程序 不涉及BP）
let appID = "";

// let appID = "wxefd623e6f82cd97a"; // 杰嘉迪
// let isShowLoading = true;
// 17 泉塘县加油站(支付方式只显示微信)
// let mallUrl = '';//H5积分商城外跳路径
let isShowLoading = true;
let isNotHideShowLoading = true;
let ddFlag = 1;//1 滴滴项目 0其他项目


let stationType = 1;//(油站权限判断使用&支付流程区分) 0 永鑫（默认）   1 南阳流程
let stationAgreement = 9;//(控制油站会员协议显示&除支付流程外的定制功能) 9滴滴&BP 15杰嘉迪（滴滴测试版小程序 不涉及BP (支付方式只显示微信)）17泉塘县加油站(支付方式只显示微信)
// let wxEnv = "develop"; //开发版
// let wxEnv = "trial"; //体验版
let wxEnv = "release"; //生产版
class Config {

  constructor() {
    
  }

  static get baseURI() {
    return baseURI;
  }

  static set baseURI(uri) {
    baseURI = uri;
  }
  static get baseAPI() {
    return baseAPI;
  }

  static set baseAPI(uri) {
    baseAPI = uri;
  }
  static get billbaseAPI() {
    return billbaseAPI;
  }

  static set billbaseAPI(uri) {
    billbaseAPI = uri;
  }
  static get groupApi() {
    return groupApi;
  }

  static set groupApi(uri) {
    groupApi = uri;
  }
  static get imgBaseURI() {
    return imgBaseURI;
  }

  static set imgBaseURI(uri) {
    imgBaseURI = uri;
  }
  static get didiWebViewUrl() {
    return didiWebViewUrl;
  }

  static set didiWebViewUrl(uri) {
    didiWebViewUrl = uri;
  }

  static get cancelCouponUrl() {
    return cancelCouponUrl;
  }

  static set cancelCouponUrl(uri) {
    cancelCouponUrl = uri;
  }

  static get appID() {
    return appID;
  }

  static set appID(id) {
    appID = id;
  }
  static get version() {
    return version;
  }

  static set version(version) {
    version = version;
  }


  static get isShowLoading() {
    return isShowLoading;
  }

  static set isShowLoading(status) {
    isShowLoading = status;
  }
  static get isNotHideShowLoading() {
    return isNotHideShowLoading;
  }

  static set isNotHideShowLoading(status) {
    isNotHideShowLoading = status;
  }
  
  static get stationType() {
    return stationType;
  }

  static set stationType(id) {
    stationType = id;
  }
  
  static get stationAgreement() {
    return stationAgreement;
  }

  static set stationAgreement(id) {
    stationAgreement = id;
  }
  
  static get ddFlag() {
    return ddFlag;
  }

  static set ddFlag(id) {
    ddFlag = id;
  }
  
  static get mallUrl() {
    return mallUrl;
  }

  static set mallUrl(id) {
    mallUrl = id;
  }
  static get wxEnv() {
    return wxEnv;
  }

  static set wxEnv(env) {
    wxEnv = env;
  }
}

export default Config;