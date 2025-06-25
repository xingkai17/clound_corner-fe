/**
 * AJAX请求数据处理部分
 * @gourd
 */
const env = process.env.NODE_TYPE || 'ie';
const apiUrlObj = {
  default: 'https://iepmspc.lanhanba.net', // 默认
  ip: 'https://iepmspc.lanhanba.net', // 本地
  ie: 'https://iepmspc.lanhanba.net', // 集成
  te: 'https://pms.lanhanba.net', //  测试
  se: 'https://pms.lanhanba.com', // 预演
  pe: 'https://pms.locxx.com', // 生产
};

const baseUrl = apiUrlObj[env];


export const headers = (version = 1, boolean = false, apikey = '') => {
  // console.log(apikey, 'header里的apikey');

  if (!apikey) {
    apikey = uni.getStorageSync('token');
  }

  console.log('apikey', apikey);

  const config = {
    // 'Accept': 'application/vnd.linhuiba.v' + version + '+json',
    'Accept': 'application/json',
    // 'Authorization': `Bearer ${apikey}`,
    'token': `${apikey}`,
    'clientKey': 1001213,
    'UrlPart': `v${version}/`,
  };
  // console.log(config);
  if (boolean) {
    Object.assign(config, {
      'Content-Type': 'application/json',
    });
  }
  return config;
};

export const UPTOKEN_URL = 'https://api.location.pub/v1/api/qiniu/token/'; // 正式环境
export const UPLOAD_URL = 'https://upload.qiniup.com/';
export const QINIU_DOMAIN = {
  image: 'https://images.location.pub/', // 场地图片以及其他
  video: 'https://videos.location.pub/', // 视频
  cert: 'https://certs.location.pub/', // 证书
  temp: 'https://temps.location.pub/', // 临时文件（仅保存30天）
  file: 'https://files.location.pub/', // 文件
  cases: 'https://cases.location.pub/', // 案例
};
export const BUCKETS = {
  image: 'location-images',
  video: 'location-videos',
  cert: 'location-cert',
  temp: 'location-temp',
  file: 'location-files',
  cases: 'location-cases',
};

export const INIT_OPTIONS_QINIU = (type = 'image') => {
  const uptokenURL = `${baseUrl}/mirage/api/qiniu/token`;

  const options = {
    region: 'SCN',
    uptokenURL: uptokenURL,
    data: { bucket: BUCKETS[type] },
    domain: QINIU_DOMAIN[type],
    header: headers(1),
    bucket: BUCKETS[type],
  };
  // console.log(`options = `, options, type);
  return options;
};
// -pms_half：320*240     中图
// -pms_htn：180*180      缩略图
// -pms_wk： 1000*800   大图
// -pms_original 原图

/** 应用版本类型 */
export const AppVersionType = {
  /** 免费版 */
  FREE: 1,
  /** vip 版 */
  VIP: 2,
  /** 企业版 */
  BUSINESS: 3,
};

/** 认证状态 */
export const AuthStatusType = {
  /** 未认证 */
  AUTH_STATUS_NO: 1,
  /** 已认证 */
  AUTH_STATUS_OVER: 2,
  /** 待审核 */
  AUTH_STATUS_ING: 3,
};

/* 图表相关配置 */
export const themeColor = { // 主题的rgb颜色
  blue: ['#358AFF', '#39D3F9', '#FFA140', '#5366F6', '#80D6EB', '#FFEB58', '#A896EF'],
  blueRGB: [
    '53,138,255',
    '57,211,249',
    '255,161,64',
    '83,102,246',
    '128,214,235',
    '252,231,78',
    '168,150,239',
  ],
  blueGradient: ['#AED0FF', '#96C2FF', '#7EB4FF', '#65A6FF', '#4E98FF', '#358AFF'], // 漏斗图中的渐变主题色
  green: ['#0BB8AF', '#7BD2DE', '#FFD190', '#86CCFF', '#9FDEF4', '#FFBA96', '#FF8A8A'],
  greenRGB: [
    '11,184,175',
    '123,210,222',
    '255,209,144',
    '134,204,255',
    '159,222,244',
    '255,186,150',
    '255,138,138',
  ],
  greenGradient: ['#9DE3DF', '#80DAD5', '#63D2CC', '#45C9C2', '#29C1B9', '#0BB8AF'], // 漏斗图中的渐变主题色
  purple: ['#7087E4', '#C096E0', '#F3D296', '#F99090', '#BFC7FC', '#9298E9', '#FDB791'],
  purpleRGB: [
    '112,135,228',
    '192,150,224',
    '243,210,150',
    '249,144,144',
    '191,199,252',
    '146,152,233',
    '253,183,145',
  ],
  purpleGradient: ['#D3D6F6', '#C6C9F3', '#B9BDF1', '#ACB1EE', '#9FA5EC', '#9298E9'], // 漏斗图中的渐变主题色
};

/** vip领取弹窗拒绝原因 */
export const GetPrizeRejectType = {
  /** 1 "未登录", "请先登录" */
  UN_LOGIN: 1,
  /** 2 "已领取过系统赠送的VIP", "您已领取过vip" */
  HAS_SYS_GIFT: 2,
  /** 3 "未认证", "领VIP需要先认证品牌/项目招商身份" */
  UN_AUTH: 3,
  /** 4 "企业版", "您已是最高级VIP权限，无法领取额外权益" */
  ENTERPRISE_EDITION: 4,
  /** 5 "自己领自己分享的", "不可领取自己分享的VIP" */
  SELF_SHARE: 5,
  /** 6 "同一个好友，相互赠送多次", "同一好友，相互只能领取一次VIP" */
  INVALID_RELATIONSHIP: 6,
  /** 7 "分享失效", "分享链接已失效" */
  INVALID_SHARING: 7,
  /** 8 "你已经参与过活动啦！" */
  MAX_FRIEND_GIFT_ONE: 8,
};

/** 洞察报告类型 */
export const ReportType = {
  /** 1 周边分析 */
  ANALYSIS_REPORT: 1,
  /** 2 商圈洞察 */
  BUSINESS_DISTRICT: 2,
  /** 3 位置推荐 */
  LOCATION_RECOMMEND: 3,
};
