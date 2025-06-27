import Config from "config.js";

let uri = Config.baseURI + Config.baseAPI;
let groupApi = Config.baseURI + Config.groupApi;
let buriedPointuri = Config.baseURI + Config.billbaseAPI;
let homeHeadURL = "/api1/member/getAdvertisementMainPic"; //首页头部图片
let tokenByCodeURI = "login?grant_type=1"; //终端登录接口
let oilsByStationURI = "api1/oilStation/oilAndGunList";  //油品和油枪列表
let stationByLocURI = "api1/oilStation/stationList";  //油站列表
let stationByLocAllURI = "api1/oilStation/stationListAll";  //油站列表全部
let stationListByMerchantURI = "api1/oilStation/stationListByMerchant";  //油站列表全部
let createOrderURI = "api1/self/createOilOrder"; //一键加油创建订单接口
let createOrderMixURI = "api1/self/mix/createOilOrder"; //一键加油创建订单接口
let consumeMixURI = "api1/self/mix/consume"; //一键加油创建订单接口
let openCardURI = "api1/member/openCard"; //开通电子会员卡-绑定身份证
let sendURI = "api1/sms/send"; //发送验证码
let checkCodeURI = "api1/sms/checkCode"; //验证码验证接口
let setPayPwdURI = "api1/member/setPayPwd"; //设置支付密码
let memberInfoURI = "api1/member/memberInfo"; //查看会员信息接口
let memberInfoModifyURI = "api1/member/memberInfoModify"; //修改个人信息
let getPhoneNumURI = "api1/member/bindByWxAuth"; //微信授权绑定用户手机
let getPhoneNumV2URI = "api1/member/bindByWxAuthV2"; //微信授权绑定用户手机
let createRechageOraderURI = "api1/self/createRechargeOrder"; //创建充值订单接口
let rechargeURI = "api1/self/recharge"; //充值支付接口
let consumeURI = "api1/self/consume"; //一键加油支付接口
let transListURI = "api1/self/transListForDidi";  //查看交易记录接口
let transInfoURI = "api1/self/transInfo"; //查看交易详情
let savecCarAuditInfoURL = "api1/carAuditInfo/savecCarAuditInfo"; //添加专车认证
let getGarageInfoURL = "api1/carAuditInfo/getGarageInfo"; //查看专车认证信息接口
let cardAuditFileUploadURL = "api1/carAuditInfo/cardAuditFileUpload"; //专车认证上传图片
let oilListURL = "api1/oilStation/oilList"; //油品列表
let ticketURI = "api1/member/couponList"; //查看会员优惠券接口
let ticketCopyURI = "api1/self/couponList"; //查看会员优惠券列表-支付

let ticketDidiURI = "api1/member/didiCouponList"; //查看会员优惠券接口--滴滴使用
let ticketDetailURI = "api1/member/getCouponInfo";  //查看优惠券详情
let refreshQrcodeURI = "api1/member/refreshCheckCode";  //查看优惠券详情
let subscribeTmplIdsURI = "api1/wx/msg/sendSubscribeTmplIds";  //发送永久订阅消息接口
let updateCarAuditInfoURL = "api1/carAuditInfo/updateCarAuditInfo"; //重新申请专车认证
let bindMerchantURL = "api1/member/bindMerchant";  //用户选择油站
let oilCodeList = "api1/oilStation/oilCodeList";  //油品种类列表
let carOilListURL = "api1/carAuditInfo/oilList";  //专车认证油品列表
let userOpinionURL = "p/userOpinion/submit";  //用户意见反馈
let getShareActivityURI = "api1/shareActivity/getShareActivity"; // 根据机构id获取分享活动
let getUcustURI = "api1/self/getUcust"; // 获取员工信息
let getTradeListByFuelPointURI = "api1/oilStation/getTradeListByFuelPoint";//通过油枪号获取交易
let saveCarInfo = "api1/carAuditInfo/saveCarInfo";//我的车库添加
let getMemberAccountTypeList = "api1/account/getMemberAccountTypeList";//获取多账户类型列表
let getNonMemberAccountTypeList = "api1/account/getNonMemberAccountTypeList"//未开的卡列表
let openMemberAccount = "api1/account/openMemberAccount"//领取卡接口
let getMerchantAccountTypeList = "api1/account/getMerchantAccountTypeList"//获取是否是单或多账户的接口

let openMemberFreePwdURI = "api1/member/openMemberFreePwd"//开通车牌免密支付
let memberFreeAddCarNumberURI = "api1/member/memberFreeAddCarNumber"//添加车牌免密支付车牌
let getMemberFreePwdURI = "api1/member/getMemberFreePwd"//查询车牌免密支付
let removeFreeAddCarNumberURI = "api1/member/removeFreeAddCarNumber"//删除车牌免密支付车牌
let queryActiveURI = "api1/draw/queryActive"//查询活动
let shufflingDrawInfoURI = "api1/draw/shufflingDrawInfo"//中奖信息轮播
let luckyDrawURI = "api1/draw/luckyDraw"//抽奖接口
let showDrawActiveURI = "api1/draw/showDrawActive"//查询当前页面应该显示什么活动(大转盘，砸金蛋)
let changePayPwdURI = "api1/member/changePayPwd"//修改支付密码
let consumeOnceSubscribeTmplIds = "api1/wx/msg/getConsumeOnceSubscribeTmplIds";  //发送一次性订阅消息接口--消费消息
let rechargeOnceSubscribeTmplIds = "api1/wx/msg/getRechargeOnceSubscribeTmplIds";  //发送一次性订阅消息接口--充值消息
let createMutiOilOrder = "api1/self/createMutiOilOrder";//多笔交易创建订单
let getTitleList = "api1/invoice/getTitleList";//获取发票列表
let newOrUpdateTitle = "api1/invoice/newOrUpdateTitle";//添加修改发票
let getUnOpenTicketOilTradeList = "api1/invoice/getUnOpenTicketOilTradeList";//查询未开票油品消费交易
let getUnOpenTicketNonOilTradeList = "api1/invoice/getUnOpenTicketNonOilTradeList";//查询未开票非油品消费交易
let getTitleDetail = "api1/invoice/getTitleDetail";//查询发票抬头详情
let deleteTitle = "api1/invoice/deleteTitle";//删除发票抬头
let openTicketForOilTrades = "api1/invoice/openTicketForOilTrades";//开具youpin交易电子发票
let openTicketForNonOilTrades = "api1/invoice/openTicketForNonOilTrades";//开具便利店交易电子发票
let getHistoryTicketList = "api1/invoice/getHistoryTicketList";//开具便利店交易电子发票
let getWxTicketAuthLink = "api1/invoice/getWxTicketAuthLink";// 获取微信授权链接
let getCompanyInfo = "api1/invoice/getCompanyInfoList";//抬头模糊查询
let companyRegisterURI = 'api1/company/companyRegister'//单位注册接口
let getUserIdentityURI = 'api1/company/getUserIdentity';//获取当前用户身份 1：非会员，2：会员，3：司机，4：单位，5：司机和单位 
let getCompanyListURI = 'api1/company/getCompanyList'//单位列表
let driverRegisterURI = 'api1/companyDriver/driverRegister';//司机注册
let updateDriverByUid = 'api1/company/updateDriverByUid';//司机注册
let driverExamineURI = 'api1/companyDriver/driverExamine';//司机审核
let driverListURI = 'api1/companyDriver/driverList'//司机列表
let getCompanyInfoURI = 'api1/company/getCompanyInfo'//当前登录单位信息
let allotAccountURI = 'api1/company/allotAccount';//分账
let driverByUid = 'api1/companyDriver/driverByUid';//司机详情
let getAllGroupCardTypeURL = "api1/company/getAllGroupCardType" //获取卡片类型的列表
let getAllotRecordsURI = "api1/company/getAllotAndRecallRecords" //获取卡片类型的列表
let getTransList = "api1/companyDriver/getTransList" //获取卡片类型的列表
let requestAllotAccount = "api1/companyDriver/requestAllotAccount" //获取卡片类型的列表
let getcompanyTransList = "api1/company/getTransList" //获取卡片类型的列表
let rechargeExamineList = "api1/company/rechargeExamineList" //获取卡片类型的列表
let auditAllotAccount = "api1/company/auditAllotAccount" //获取卡片类型的列表
let recallAccount = "api1/company/recallAccount" //获取卡片类型的列表
let getTransInfo = "api1/companyDriver/getTransInfo" //获取卡片类型的列表
let getTransStat = "api1/company/getTransStat" //获取卡片类型的列表
let addDriver = "api1/company/driverRegister" //获取卡片类型的列表

let getAccountQrcode = "api1/company/getAccountQrcode" //获取司机/车队二维码
let rechargeExamineCount = "api1/company/rechargeExamineCount" //司机申请分账待审核记录数查询
let driverRegisterCount = "api1/company/driverRegisterCount" //待审核司机记录数查询
let companyTransfer = "api1/company/companyTransfer" //车队转让
let companyDelete = "api1/company/companyDelete" //车队转让
let unbindDriver = "api1/company/unbindDriver" //车队转让
let companyUpdate = "api1/company/companyUpdate" //车队信息编辑

let topupRule = "api1/oilStation/topupRule" //充值活动
let topupRuleNew = "api1/oilStation/topupRuleNew" //充值活动新
let calculatDiscount = "api1/self/calculatDiscount" // 一键加油重新计算优惠接口
let getMerchantPageConfig = "api1/member/merchantPageConfig" // 轮播图
let swiperImgList = "api1/memberImg/list" // 轮播图
let swiperadvertisementImgList = "api1/member/getAdvertisement" // 轮播图
let getStationOilCodeList = "api1/oilStation/getStationOilCodeList" // 油品列表
let gunList = "api1/oilStation/gunList"//获取油枪列表
let getMemberConsumeData = "api1/member/getMemberConsumeData" //查询会员消费金额、次数
let getDiDiOrder = "api1/didi/self/consume" //滴滴订单支付接口
let getDiDiOrderv2 = "api1/didi/self/v2/consume" //滴滴订单支付接口
let saveAuthorized = "api1/member/saveAuthorized" //保存是否授权
let cancelDidiOilOrder = "api1/didi/self/cancelDidiOilOrder" //取消订单接口
let cancelDidiOilOrderV2 = "api1/didi/self/v2/cancelDidiOilOrder" //取消订单接口
let queryOilOrder = "api1/didi/self/v2/queryOilOrder" //didi查询订单详情
let buriedPointSend = "api/buriedPoint/upload" //didi埋点
let memberGetDetails = "api1/member/getDetails" //获取会员章程里的油站名称手机号
let getstaffIdURI = "api1/self/employeeVerification" //获取加油站工作人员id接口
let JLSubscribeTmplIds = "api1/self/employeeVerification" //桔量订阅接口
let logout = "api1/member/logout" //退出登录
let payTypeList = 'api1/member/payTypeList';//获取支付方式列表
let payTypeAddList = 'api1/member/memberAccountList'//获取电子支付方式列表
let getRunningSubscribeActivities = 'api1/oilStation/getRunningSubscribeActivities';//活动查询接口
let recallCouponsApi= 'api1/member/memberRecall/showCoupons';//会员召回活动查询接口
let saveMemberDiscountTag= 'api1/self/saveMemberDiscountTag';//保存标签
let saveMemberDiscountTagNew= 'api1/self/saveMemberDiscountTagNew';//充值保存标签
let memberPayQrcode= 'api1/member/memberPayQrcode';//会员码
let gunListWithConfigApi = 'api1/oilStation/gunListWithConfig';//获取油站配置信息收单页
let listOfRefuelers = 'api1/oilStation/listOfRefuelers';//获取员工列表
let getBannerAndPrice = 'api1/self/getBannerAndPrice';//新增获取直降活动描述和优惠价接口
let changeMobilePhoneApi = 'api1/self/changeMobilePhone';//换绑接口
let changePhoneMsgURI = "api1/sms/changePhoneMsg"; //发送验证码
let checkChangePhoneMsgURI = "api1/sms/checkChangePhoneMsg"; //验证码验证接口
let rechargeResultURI = "api1/self/rechargeResult"; //充值结果
let getAccountTypeListWithMemberBalanceURI = "api1/account/getAccountTypeListWithMemberBalance"; //储值卡账户部分
let getRechargeRuleFormatURI = "api1/oilStation/getRechargeRuleFormat"; //展示充值优惠规则
let getRechargeAmountsURI = "api1/oilStation/getRechargeAmounts"; //获取自定义充值金额列表
let getRechargeRuleFormatTagURI = "api1/oilStation/getRechargeRuleFormatTag"; //充值规则列表
let getBannerAndPriceNewURI = "api1/self/getBannerAndPriceNew"; // 新的获取横幅接口
let getStationPageCustListURI = "api1/self/getStationPageCustList"; // 收单页加油员选择
let scanForOilOrderURI = "api1/self/scanForOilOrder"; // C扫B接口
let createOilOrderScanURI = "api1/self/createOilOrderScan"; // C扫B接口
let waitPayOrderURI = "api1/self/waitPayOrder"; // 查询是否有待支付订单
let getJlMemberTyingInfoURI = "api1/marketing/getJlMemberTyingInfo"; // 查询是否有加量包或者会员卡
let julaingcreateOilOrderURI = "api1/julaing/self/createOilOrder"; // 桔量创建订单
let julaingconsumeURI = "api1/julaing/self/consume"; // 桔量消费
let julainggetBannerAndPriceNewURI = "api1/marketing/getBannerAndPriceNew"; // 取横幅
let julaingqueryOilOrderURI = "api1/julaing/self/queryOilOrder"; // 成功
let getLinkUrlYGLURL = "api1/ygl/getLinkUrl"; // 驿公里
let queryOilOrderNewURI = "api1/julaing/self/queryOilOrderNew"; //订单信息查询（确认订单页）
let createOrderTradeFunAPI = "api1/julaing/self/createOilOrderNew"; //桔量零管下单接口
let memberDiscountComputeAPI = "api1/julaing/self/memberDiscountCompute"; //计算优惠接口
let sendCancelPaymentNoticeAPI = "api1/self/sendCancelPaymentNotice"; //微信、支付宝取消回调
let validationCardNumberAPI = "api1/companyDriver/validationCardNumber"; //微信、支付宝取消回调
let recentlyStationListAPI = "api1/oilStation/recentlyStationList"; //获取附近xx米内油站
let getRechargeRewardDetailAPI = "api1/oilStation/getRechargeRewardDetail"; //获取充值权益详情
let commitRateAPI = "api1/self/commit"; //sass提交评价
let commitRateJuLiangAPI = "api1/julaing/self/commit"; //桔量提交评价
let getProgramName = "api/platform/getProgramName"; //桔量提交评价
let receivedCoupon = "api1/marketing/receivedCoupon"; //会员券到账信息查询
let getPointRuleIconResult = "api1/julaing/self/getPointRuleIconResult"; //查询积分规则
let saveMemberCarNum = "api1/member/saveMemberCarNum"; //新增车牌号保存
class API {

  static _fullURI(iuri) {
    return API.fullURIApi + iuri;
  }
  static set fullURIApi(iuri) {
     uri = iuri;
  }
  static get fullURIApi() {
    return uri;
  }
  static _fullBuriedPointURI(iuri) {
    return API.fullBuriedPointURIApi + iuri;
  }
  static set fullBuriedPointURIApi(iuri) {
    buriedPointuri = iuri;
 }
 static get fullBuriedPointURIApi() {
   return buriedPointuri;
 }
 static _fullGroupApiURI(iuri) {
  return API.fullGroupApi + iuri;
}
  static set fullGroupApi(iuri) {
    groupApi = iuri;
 }
 static get fullGroupApi() {
   return groupApi;
 }
  static get tokenByCodeURI() {
    return API._fullURI(tokenByCodeURI);
  }

  static set tokenByCodeURI(param) {
    tokenByCodeURI = param;
  }
  static get homeHeadURL() {
    return API._fullURI(homeHeadURL);
  }

  static set homeHeadURL(param) {
    homeHeadURL = param;
  }

  static get oilsByStationURI() {
    return API._fullURI(oilsByStationURI);
  }

  static set oilsByStationURI(param) {
    oilsByStationURI = param;
  }

  static get stationByLocURI() {
    return API._fullURI(stationByLocURI);
  }

  static set stationByLocURI(param) {
    stationByLocURI = param;
  }

  static get createOrderURI() {
    return API._fullURI(createOrderURI);
  }

  static set createOrderURI(param) {
    createOrderURI = param;
  }

  static get createOrderMixURI() {
    return API._fullURI(createOrderMixURI);
  }
  static set createOrderMixURI(param) {
    createOrderMixURI = param;
  }

  static set consumeMixURI(param) {
    consumeMixURI = param;
  }
  static get consumeMixURI() {
    return API._fullURI(consumeMixURI);
  }

  static get openCardURI() {
    return API._fullURI(openCardURI);
  }

  static set openCardURI(param) {
    openCardURI = param;
  }

  static get sendURI() {
    return API._fullURI(sendURI);
  }

  static set sendURI(param) {
    sendURI = param;
  }

  static get checkCodeURI() {
    return API._fullURI(checkCodeURI);
  }

  static set checkCodeURI(param) {
    checkCodeURI = param;
  }

  static get setPayPwdURI() {
    return API._fullURI(setPayPwdURI);
  }

  static set setPayPwdURI(param) {
    setPayPwdURI = param;
  }

  static get memberInfoURI() {
    return API._fullURI(memberInfoURI);
  }

  static set memberInfoURI(param) {
    memberInfoURI = param;
  }

  static get memberInfoModifyURI() {
    return API._fullURI(memberInfoModifyURI);
  }

  static set memberInfoModifyURI(param) {
    memberInfoModifyURI = param;
  }

  static get getPhoneNumURI() {
    return API._fullURI(getPhoneNumURI);
  }

  static set getPhoneNumURI(param) {
    getPhoneNumURI = param;
  }
  static get getPhoneNumV2URI() {
    return API._fullURI(getPhoneNumV2URI);
  }

  static set getPhoneNumV2URI(param) {
    getPhoneNumV2URI = param;
  }
  static get createRechageOraderURI() {
    return API._fullURI(createRechageOraderURI);
  }

  static set createRechageOraderURI(param) {
    createRechageOraderURI = param;
  }
  static get rechargeURI() {
    return API._fullURI(rechargeURI);
  }

  static set rechargeURI(param) {
    rechargeURI = param;
  }

  static get consumeURI() {
    return API._fullURI(consumeURI);
  }

  static set consumeURI(param) {
    consumeURI = param;
  }

  static get transListURI() {
    return API._fullURI(transListURI);
  }

  static set transListURI(param) {
    transListURI = param;
  }
  static set transInfoURI(param) {
    transInfoURI = param;
  }

  static get transInfoURI() {
    return API._fullURI(transInfoURI);
  }

  static set transListURI(param) {
    transListURI = param;
  }

  static get savecCarAuditInfoURL() {
    return API._fullURI(savecCarAuditInfoURL);
  }

  static set savecCarAuditInfoURL(param) {
    savecCarAuditInfoURL = param;
  }
  static get getGarageInfoURL() {
    return API._fullURI(getGarageInfoURL);
  }

  static set getGarageInfoURL(param) {
    getGarageInfoURL = param;
  }
  static get cardAuditFileUploadURL() {
    return API._fullURI(cardAuditFileUploadURL);
  }

  static set cardAuditFileUploadURL(param) {
    cardAuditFileUploadURL = param;
  }
  static get oilListURL() {
    return API._fullURI(oilListURL);
  }

  static set oilListURL(param) {
    oilListURL = param;
  }
  static get ticketURI() {
    return API._fullURI(ticketURI);
  }

  static set ticketDidiURI(param) {
    ticketURI = param;
  }
  static get ticketDidiURI() {
    return API._fullURI(ticketDidiURI);
  }

  static set ticketDidiURI(param) {
    ticketDidiURI = param;
  }
  static get ticketDetailURI() {
    return API._fullURI(ticketDetailURI);
  }

  static set ticketDetailURI(param) {
    ticketDetailURI = param;
  }
  static get refreshQrcodeURI() {
    return API._fullURI(refreshQrcodeURI);
  }

  static set refreshQrcodeURI(param) {
    refreshQrcodeURI = param;
  }

  static get subscribeTmplIdsURI() {
    return API._fullURI(subscribeTmplIdsURI);
  }

  static set subscribeTmplIdsURI(param) {
    subscribeTmplIdsURI = param;
  }
  static get updateCarAuditInfoURL() {
    return API._fullURI(updateCarAuditInfoURL);
  }

  static set updateCarAuditInfoURL(param) {
    updateCarAuditInfoURL = param;
  }
  static get bindMerchantURL() {
    return API._fullURI(bindMerchantURL);
  }

  static set bindMerchantURL(param) {
    bindMerchantURL = param;
  }

  static get oilCodeList() {
    return API._fullURI(oilCodeList);
  }

  static set oilCodeList(param) {
    oilCodeList = param;
  }
  static get carOilListURL() {
    return API._fullURI(carOilListURL);
  }

  static set carOilListURL(param) {
    carOilListURL = param;
  }
  static get userOpinionURL() {
    return API._fullURI(userOpinionURL);
  }

  static set userOpinionURL(param) {
    userOpinionURL = param;
  }

  static get getShareActivityURI() {
    return API._fullURI(getShareActivityURI);
  }

  static set getShareActivityURI(param) {
    getShareActivityURI = param;
  }

  static get getUcustURI() {
    return API._fullURI(getUcustURI);
  }

  static set getUcustURI(param) {
    getUcustURI = param;
  }

  static get getTradeListByFuelPointURI() {
    return API._fullURI(getTradeListByFuelPointURI);
  }

  static set getTradeListByFuelPointURI(param) {
    getTradeListByFuelPointURI = param;
  }

  static get saveCarInfo() {
    return API._fullURI(saveCarInfo);
  }

  static set saveCarInfo(param) {
    saveCarInfo = param;
  }

  static get getMemberAccountTypeList() {
    return API._fullURI(getMemberAccountTypeList);
  }

  static set getMemberAccountTypeList(param) {
    getMemberAccountTypeList = param;
  }

  static get getNonMemberAccountTypeList() {
    return API._fullURI(getNonMemberAccountTypeList);
  }

  static set getNonMemberAccountTypeList(param) {
    getNonMemberAccountTypeList = param;
  }

  static get openMemberAccount() {
    return API._fullURI(openMemberAccount);
  }

  static set openMemberAccount(param) {
    openMemberAccount = param;
  }

  static get getMerchantAccountTypeList() {
    return API._fullURI(getMerchantAccountTypeList);
  }

  static set getMerchantAccountTypeList(param) {
    getMerchantAccountTypeList = param;
  }

  static get gunList() {
    return API._fullURI(gunList);
  }

  static set gunList(param) {
    gunList = param;
  }
  static get openMemberFreePwdURI() {
    return API._fullURI(openMemberFreePwdURI);
  }

  static set openMemberFreePwdURI(param) {
    openMemberFreePwdURI = param;
  }
  static get memberFreeAddCarNumberURI() {
    return API._fullURI(memberFreeAddCarNumberURI);
  }

  static set memberFreeAddCarNumberURI(param) {
    memberFreeAddCarNumberURI = param;
  }
  static get getMemberFreePwdURI() {
    return API._fullURI(getMemberFreePwdURI);
  }

  static set getMemberFreePwdURI(param) {
    getMemberFreePwdURI = param;
  }
  static get removeFreeAddCarNumberURI() {
    return API._fullURI(removeFreeAddCarNumberURI);
  }

  static set removeFreeAddCarNumberURI(param) {
    removeFreeAddCarNumberURI = param;
  }
  static get queryActiveURI() {
    return API._fullURI(queryActiveURI);
  }

  static set queryActiveURI(param) {
    queryActiveURI = param;
  }
  static get shufflingDrawInfoURI() {
    return API._fullURI(shufflingDrawInfoURI);
  }

  static set shufflingDrawInfoURI(param) {
    shufflingDrawInfoURI = param;
  }
  static get luckyDrawURI() {
    return API._fullURI(luckyDrawURI);
  }

  static set luckyDrawURI(param) {
    luckyDrawURI = param;
  }
  static get showDrawActiveURI() {
    return API._fullURI(showDrawActiveURI);
  }

  static set showDrawActiveURI(param) {
    showDrawActiveURI = param;
  }

  static get changePayPwdURI() {
    return API._fullURI(changePayPwdURI);
  }

  static set changePayPwdURI(param) {
    changePayPwdURI = param;
  }
  
  static get stationByLocAllURI() {
    return API._fullURI(stationByLocAllURI);
  }

  static set stationByLocAllURI(param) {
    stationByLocAllURI = param;
  }

  static get stationListByMerchantURI() {
    return API._fullURI(stationListByMerchantURI);
  }

  static set stationListByMerchantURI(param) {
    stationListByMerchantURI = param;
  }
  static get consumeOnceSubscribeTmplIds() {
    return API._fullURI(consumeOnceSubscribeTmplIds);
  }

  static set consumeOnceSubscribeTmplIds(param) {
    consumeOnceSubscribeTmplIds = param;
  }

  static get rechargeOnceSubscribeTmplIds() {
    return API._fullURI(rechargeOnceSubscribeTmplIds);
  }

  static set rechargeOnceSubscribeTmplIds(param) {
    rechargeOnceSubscribeTmplIds = param;
  }

  static get createMutiOilOrder() {
    return API._fullURI(createMutiOilOrder);
  }

  static set createMutiOilOrder(param) {
    createMutiOilOrder = param;
  }

  static get getTitleList() {
    return API._fullURI(getTitleList);
  }

  static set getTitleList(param) {
    getTitleList = param;
  }

  static get newOrUpdateTitle() {
    return API._fullURI(newOrUpdateTitle);
  }

  static set newOrUpdateTitle(param) {
    newOrUpdateTitle = param;
  }

  static get getUnOpenTicketOilTradeList() {
    return API._fullURI(getUnOpenTicketOilTradeList);
  }

  static set getUnOpenTicketOilTradeList(param) {
    getUnOpenTicketOilTradeList = param;
  }
  static get getUnOpenTicketNonOilTradeList() {
    return API._fullURI(getUnOpenTicketNonOilTradeList);
  }

  static set getUnOpenTicketNonOilTradeList(param) {
    getUnOpenTicketNonOilTradeList = param;
  }

  static get getTitleDetail() {
    return API._fullURI(getTitleDetail);
  }

  static set getTitleDetail(param) {
    getTitleDetail = param;
  }

  static get deleteTitle() {
    return API._fullURI(deleteTitle);
  }

  static set deleteTitle(param) {
    deleteTitle = param;
  }

  static get openTicketForOilTrades() {
    return API._fullURI(openTicketForOilTrades);
  }

  static set openTicketForOilTrades(param) {
    openTicketForOilTrades = param;
  }
  static get openTicketForNonOilTrades() {
    return API._fullURI(openTicketForNonOilTrades);
  }

  static set openTicketForNonOilTrades(param) {
    openTicketForNonOilTrades = param;
  }

  static get getHistoryTicketList() {
    return API._fullURI(getHistoryTicketList);
  }

  static set getHistoryTicketList(param) {
    getHistoryTicketList = param;
  }
  static get getWxTicketAuthLink() {
    return API._fullURI(getWxTicketAuthLink);
  }

  static set getWxTicketAuthLink(param) {
    getWxTicketAuthLink = param;
  }
  static get getCompanyInfo() {
    return API._fullURI(getCompanyInfo);
  }

  static set getCompanyInfo(param) {
    getCompanyInfo = param;
  }


  static get companyRegisterURI() {
    return API._fullGroupApiURI(companyRegisterURI);
  }

  static set companyRegisterURI(param) {
    companyRegisterURI = param;
  }

  static get getUserIdentityURI() {
    return API._fullGroupApiURI(getUserIdentityURI);
  }

  static set getUserIdentityURI(param) {
    getUserIdentityURI = param;
  }

  static get getCompanyListURI() {
    return API._fullGroupApiURI(getCompanyListURI);
  }

  static set getCompanyListURI(param) {
    getCompanyListURI = param;
  }

  static get driverRegisterURI() {
    return API._fullGroupApiURI(driverRegisterURI);
  }

  static set driverRegisterURI(param) {
    driverRegisterURI = param;
  }
  static get updateDriverByUid() {
    return API._fullGroupApiURI(updateDriverByUid);
  }

  static set updateDriverByUid(param) {
    updateDriverByUid = param;
  }

  static get driverExamineURI() {
    return API._fullGroupApiURI(driverExamineURI);
  }

  static set driverExamineURI(param) {
    driverExamineURI = param;
  }

  static get driverListURI() {
    return API._fullGroupApiURI(driverListURI);
  }

  static set driverListURI(param) {
    driverListURI = param;
  }

  static get getCompanyInfoURI() {
    return API._fullGroupApiURI(getCompanyInfoURI);
  }

  static set getCompanyInfoURI(param) {
    getCompanyInfoURI = param;
  }
  static get allotAccountURI() {
    return API._fullGroupApiURI(allotAccountURI);
  }

  static set allotAccountURI(param) {
    allotAccountURI = param;
  }

  static get driverByUid() {
    return API._fullGroupApiURI(driverByUid);
  }

  static set driverByUid(param) {
    driverByUid = param;
  }

  static get getAllGroupCardTypeURL() {
    return API._fullGroupApiURI(getAllGroupCardTypeURL);
  }

  static set getAllGroupCardTypeURL(param) {
    getAllGroupCardTypeURL = param;
  }
  static get getAllotRecordsURI() {
    return API._fullGroupApiURI(getAllotRecordsURI);
  }

  static set getAllotRecordsURI(param) {
    getAllotRecordsURI = param;
  }

  static get getTransList() {
    return API._fullGroupApiURI(getTransList);
  }

  static set getTransList(param) {
    getTransList = param;
  }

  static get requestAllotAccount() {
    return API._fullGroupApiURI(requestAllotAccount);
  }

  static set requestAllotAccount(param) {
    requestAllotAccount = param;
  }

  static get getcompanyTransList() {
    return API._fullGroupApiURI(getcompanyTransList);
  }

  static set getcompanyTransList(param) {
    getcompanyTransList = param;
  }
  static get rechargeExamineList() {
    return API._fullGroupApiURI(rechargeExamineList);
  }

  static set rechargeExamineList(param) {
    rechargeExamineList = param;
  }
  static get auditAllotAccount() {
    return API._fullGroupApiURI(auditAllotAccount);
  }

  static set auditAllotAccount(param) {
    auditAllotAccount = param;
  }
  static get recallAccount() {
    return API._fullGroupApiURI(recallAccount);
  }

  static set recallAccount(param) {
    recallAccount = param;
  }
  static get getTransInfo() {
    return API._fullGroupApiURI(getTransInfo);
  }

  static set getTransInfo(param) {
    getTransInfo = param;
  }
  static get getTransStat() {
    return API._fullGroupApiURI(getTransStat);
  }

  static set getTransStat(param) {
    getTransStat = param;
  }
  static get addDriver() {
    return API._fullGroupApiURI(addDriver);
  }

  static set addDriver(param) {
    addDriver = param;
  }

  static get getAccountQrcode() {
    return API._fullGroupApiURI(getAccountQrcode);
  }
  static set getAccountQrcode(param) {
    getAccountQrcode = param;
  }
  static get rechargeExamineCount() {
    return API._fullGroupApiURI(rechargeExamineCount);
  }
  static set rechargeExamineCount(param) {
    rechargeExamineCount = param;
  }
  static get driverRegisterCount() {
    return API._fullGroupApiURI(driverRegisterCount);
  }
  static set driverRegisterCount(param) {
    driverRegisterCount = param;
  }
  static get companyTransfer() {
    return API._fullGroupApiURI(companyTransfer);
  }
  static set companyTransfer(param) {
    companyTransfer = param;
  }
  static get companyDelete() {
    return API._fullGroupApiURI(companyDelete);
  }
  static set companyDelete(param) {
    companyDelete = param;
  }
  static get unbindDriver() {
    return API._fullGroupApiURI(unbindDriver);
  }
  static set unbindDriver(param) {
    unbindDriver = param;
  }
  static get companyUpdate() {
    return API._fullGroupApiURI(companyUpdate);
  }
  static set companyUpdate(param) {
    companyUpdate = param;
  }

  static get topupRule() {
    return API._fullURI(topupRule);
  }

  static set topupRule(param) {
    topupRule = param;
  }
  static get topupRuleNew() {
    return API._fullURI(topupRuleNew);
}
static set topupRuleNew(param) {
  topupRuleNew = param;
}
  static get calculatDiscount() {
    return API._fullURI(calculatDiscount);
  }

  static set calculatDiscount(param) {
    calculatDiscount = param;
  }
  static set swiperadvertisementImgList(param) {
    swiperadvertisementImgList = param;
  }
  static get swiperadvertisementImgList() {
    return API._fullURI(swiperadvertisementImgList);
  }
  static set getMerchantPageConfig(param) {
    getMerchantPageConfig = param;
  }
  static get getMerchantPageConfig() {
    return API._fullURI(getMerchantPageConfig);
  }
  static get swiperImgList() {
    return API._fullURI(swiperImgList);
  }

  static set swiperImgList(param) {
    swiperImgList = param;
  }
  static set getStationOilCodeList(param) {
    getStationOilCodeList = param;
  }
  static get getStationOilCodeList() {
    return API._fullURI(getStationOilCodeList);
  }
  static set getMemberConsumeData(param) {
    getMemberConsumeData = param;
  }
  static get getMemberConsumeData() {
    return API._fullURI(getMemberConsumeData);
  }
  static set ticketCopyURI(param) {
    ticketCopyURI = param;
  }
  static get ticketCopyURI() {
    return API._fullURI(ticketCopyURI);
  }
  static set getDiDiOrder(param) {
    getDiDiOrder = param;
  }
  static get getDiDiOrder() {
    return API._fullURI(getDiDiOrder);
  }
  static set getDiDiOrderv2(param) {
    getDiDiOrderv2 = param;
  }
  static get getDiDiOrderv2() {
    return API._fullURI(getDiDiOrderv2);
  }
  static set cancelDidiOilOrder(param) {
    cancelDidiOilOrder = param;
  }
  static get cancelDidiOilOrder() {
    return API._fullURI(cancelDidiOilOrder);
  }
  static set cancelDidiOilOrderV2(param) {
    cancelDidiOilOrderV2 = param;
  }
  static get cancelDidiOilOrderV2() {
    return API._fullURI(cancelDidiOilOrderV2);
  }
  static set saveAuthorized(param) {
    saveAuthorized = param;
  }
  static get saveAuthorized() {
    return API._fullURI(saveAuthorized);
  }
  static set queryOilOrder(param) {
    queryOilOrder = param;
  }
  static get queryOilOrder() {
    return API._fullURI(queryOilOrder);
  }
  static set buriedPointSend(param) {
    buriedPointSend = param;
  }
  static get buriedPointSend() {
    return API._fullBuriedPointURI(buriedPointSend);
  }
  static set memberGetDetails(param) {
    memberGetDetails = param;
  }
  static get memberGetDetails() {
    return API._fullURI(memberGetDetails);
  }
  static get getstaffIdURI() {
    return API._fullURI(getstaffIdURI);
  }
  
  static set getstaffIdURI(param) {
    getstaffIdURI = param;
  }

  static get JLSubscribeTmplIds() {
    return API._fullURI(JLSubscribeTmplIds);
  }  
  static set JLSubscribeTmplIds(param) {
    JLSubscribeTmplIds = param;
  }
  static get logout() {
    return API._fullURI(logout);
  }  
  static set logout(param) {
    logout = param;
  }
  static get payTypeList() {
    return API._fullURI(payTypeList);
  }  
  static set payTypeList(param) {
    payTypeList = param;
  }
  static get payTypeAddList() {
    return API._fullURI(payTypeAddList);
  }  
  static set payTypeAddList(param) {
    payTypeAddList = param;
  }
  static get getRunningSubscribeActivities() {
    return API._fullURI(getRunningSubscribeActivities);
  }  
  static set getRunningSubscribeActivities(param) {
    getRunningSubscribeActivities = param;
  }
  static get recallCouponsApi() {
    return API._fullURI(recallCouponsApi);
  }  
  static set recallCouponsApi(param) {
    recallCouponsApi = param;
  }
  static get saveMemberDiscountTag() {
    return API._fullURI(saveMemberDiscountTag);
  }  
  static set saveMemberDiscountTag(param) {
    saveMemberDiscountTag = param;
  }
  static get saveMemberDiscountTagNew() {
    return API._fullURI(saveMemberDiscountTagNew);
  }  
  static set saveMemberDiscountTagNew(param) {
    saveMemberDiscountTagNew = param;
  }
  static get memberPayQrcode() {
    return API._fullURI(memberPayQrcode);
  }  
  static set memberPayQrcode(param) {
    memberPayQrcode = param;
  }
  static get gunListWithConfigApi() {
    return API._fullURI(gunListWithConfigApi);
  }  
  static set gunListWithConfigApi(param) {
    gunListWithConfigApi = param;
  }
  static get listOfRefuelers() {
    return API._fullURI(listOfRefuelers);
  }  
  static set listOfRefuelers(param) {
    listOfRefuelers = param;
  }
  static get getBannerAndPrice() {
    return API._fullURI(getBannerAndPrice);
  }  
  static set getBannerAndPrice(param) {
    getBannerAndPrice = param;
  }
  static get changeMobilePhoneApi() {
    return API._fullURI(changeMobilePhoneApi);
  }  
  static set changeMobilePhoneApi(param) {
    changeMobilePhoneApi = param;
  }
  static get checkChangePhoneMsgURI() {
    return API._fullURI(checkChangePhoneMsgURI);
  }

  static set checkChangePhoneMsgURI(param) {
    checkChangePhoneMsgURI = param;
  }

  static get changePhoneMsgURI() {
    return API._fullURI(changePhoneMsgURI);
  }

  static set changePhoneMsgURI(param) {
    changePhoneMsgURI = param;
  }
  static get rechargeResultURI() {
    return API._fullURI(rechargeResultURI);
  }
  
  static set rechargeResultURI(param) {
    rechargeResultURI = param;
  }
  static get getAccountTypeListWithMemberBalanceURI() {
    return API._fullURI(getAccountTypeListWithMemberBalanceURI);
  }
  
  static set getAccountTypeListWithMemberBalanceURI(param) {
    getAccountTypeListWithMemberBalanceURI = param;
  }
  static get getRechargeRuleFormatURI() {
    return API._fullURI(getRechargeRuleFormatURI);
  }
  
  static set getRechargeRuleFormatURI(param) {
    getRechargeRuleFormatURI = param;
  }
  static get getRechargeAmountsURI() {
    return API._fullURI(getRechargeAmountsURI);
  }
  
  static set getRechargeAmountsURI(param) {
    getRechargeAmountsURI = param;
  }
  static get getRechargeRuleFormatTagURI() {
    return API._fullURI(getRechargeRuleFormatTagURI);
  }
  
  static set getRechargeRuleFormatTagURI(param) {
    getRechargeRuleFormatTagURI = param;
  }
  static get getBannerAndPriceNewURI() {
    return API._fullURI(getBannerAndPriceNewURI);
  }
  
  static set getBannerAndPriceNewURI(param) {
    getBannerAndPriceNewURI = param;
  }
  static get getStationPageCustListURI() {
    return API._fullURI(getStationPageCustListURI);
  }
  
  static set getStationPageCustListURI(param) {
    getStationPageCustListURI = param;
  }
  static get scanForOilOrderURI() {
    return API._fullURI(scanForOilOrderURI);
  }
  
  static set scanForOilOrderURI(param) {
    scanForOilOrderURI = param;
  }
  static get createOilOrderScanURI() {
    return API._fullURI(createOilOrderScanURI);
  }
  
  static set createOilOrderScanURI(param) {
    createOilOrderScanURI = param;
  }
  static get waitPayOrderURI() {
    return API._fullURI(waitPayOrderURI);
  }
  
  static set waitPayOrderURI(param) {
    waitPayOrderURI = param;
  }
  static get getJlMemberTyingInfoURI() {
    return API._fullURI(getJlMemberTyingInfoURI);
  }
  
  static set getJlMemberTyingInfoURI(param) {
    getJlMemberTyingInfoURI = param;
  }
  static get julaingconsumeURI() {
    return API._fullURI(julaingconsumeURI);
  }
  
  static set julaingconsumeURI(param) {
    julaingconsumeURI = param;
  }
  static get julaingcreateOilOrderURI() {
    return API._fullURI(julaingcreateOilOrderURI);
  }
  
  static set julaingcreateOilOrderURI(param) {
    julaingcreateOilOrderURI = param;
  }
  static get julainggetBannerAndPriceNewURI() {
    return API._fullURI(julainggetBannerAndPriceNewURI);
  }
  
  static set julainggetBannerAndPriceNewURI(param) {
    julainggetBannerAndPriceNewURI = param;
  }
  static get julaingqueryOilOrderURI() {
    return API._fullURI(julaingqueryOilOrderURI);
  }
  
  static set julaingqueryOilOrderURI(param) {
    julaingqueryOilOrderURI = param;
  }
  static get getLinkUrlYGLURL() {
    return API._fullURI(getLinkUrlYGLURL);
  }
  
  static set getLinkUrlYGLURL(param) {
    getLinkUrlYGLURL = param;
  }
  static get queryOilOrderNewURI() {
    return API._fullURI(queryOilOrderNewURI);
  }
  
  static set queryOilOrderNewURI(param) {
    queryOilOrderNewURI = param;
  }
  static get createOrderTradeFunAPI() {
    return API._fullURI(createOrderTradeFunAPI);
  }
  
  static set createOrderTradeFunAPI(param) {
    createOrderTradeFunAPI = param;
  }
  static get memberDiscountComputeAPI() {
    return API._fullURI(memberDiscountComputeAPI);
  }
  
  static set memberDiscountComputeAPI(param) {
    memberDiscountComputeAPI = param;
  }

  static get sendCancelPaymentNoticeAPI() {
    return API._fullURI(sendCancelPaymentNoticeAPI);
  }
  static set sendCancelPaymentNoticeAPI(param) {
    sendCancelPaymentNoticeAPI = param;
  }

  static get validationCardNumberAPI() {
    return API._fullGroupApiURI(validationCardNumberAPI);
  }
  static set validationCardNumberAPI(param) {
    validationCardNumberAPI = param;
  }

  static get recentlyStationListAPI() {
    return API._fullURI(recentlyStationListAPI);
  }
  static set recentlyStationListAPI(param) {
    recentlyStationListAPI = param;
  }

  static get getRechargeRewardDetailAPI() {
    return API._fullURI(getRechargeRewardDetailAPI);
  }
  static set getRechargeRewardDetailAPI(param) {
    getRechargeRewardDetailAPI = param;
  }

  static get commitRateJuLiangAPI() {
    return API._fullURI(commitRateJuLiangAPI);
  }
  static set commitRateJuLiangAPI(param) {
    commitRateJuLiangAPI = param;
  }

  static get commitRateAPI() {
    return API._fullURI(commitRateAPI);
  }
  static set commitRateAPI(param) {
    commitRateAPI = param;
  }
  static get getProgramName() {
    return API._fullURI(getProgramName);
  }
  static set getProgramName(param) {
    getProgramName = param;
  }
  static get receivedCoupon() {
    return API._fullURI(receivedCoupon);
  }
  static set receivedCoupon(param) {
    receivedCoupon = param;
  }
  static get getPointRuleIconResult() {
    return API._fullURI(getPointRuleIconResult);
  }
  static set getPointRuleIconResult(param) {
    getPointRuleIconResult = param;
  }
  static get saveMemberCarNum() {
    return API._fullURI(saveMemberCarNum);
  }
  static set saveMemberCarNum(param) {
    saveMemberCarNum = param;
  }
}
export default API;