import Aegis from 'aegis-mp-sdk';
import { getStorage } from '@/common/utils/cache';
import { Config } from './config';

// 区分环境的配置
const getAegisConfig = () => {
  // 根据 appID 判断环境
  const isProd = Config.appID === 'wxfeb7f65afd711324' ||
                 Config.appID === 'wx26cf2ad07297bb6a' ||
                 Config.appID === 'wx768505309a8cf5b9';

  return {
    id: isProd ? 'EPkvyhr2OqK5P7oJbY' : 'QVl10TJm3RVjPp3nqa',
    uin: isProd ? '146105' : '145061',
    reportApiSpeed: true,
    reportAssetSpeed: true,
    spa: true,
    hostUrl: 'https://rumt-zh.com',
    version: process.env.VERSION || '1.0.0',
    ext1: isProd ? 'prod' : 'test',
    api: {
      reportRequest: true,
      apiDetail: true,
    },
    ignore: [
      /Script error/i,
      /WeixinJSBridge is not defined/i,
    ],
    pagePerformance: true,
    offlineLog: true,
  };
};

// 创建实例
const aegis = new Aegis(getAegisConfig());

// 扩展方法
export const setUserInfo = (uid) => {
  aegis.setConfig({
    uid,
  });
};

// 自定义上报方法
export const reportCustomError = (error, extra) => {
  aegis.error(error, extra);
};

// 修改 reportEvent 方法，使用 ext1 替代 ext
export const reportCustomEvent = (name, ext1, ext2, ext3) => {
  aegis.reportEvent({
    name,
    ext1,
    ext2,
    ext3,
  });
};

// 匹配原始 app.js 的 reportEvent 方法
export const reportEvent = (name, txt, ext1) => {
  aegis.reportEvent({
    name: name,
    ext1: ext1 ? ext1 : 'wxMini',
    ext2: Config.appID,
    ext3: `${txt},source=wxMini,didiSelUid=${getStorage('didiSelUid')},phone=${getStorage('cellNum')},appId=${Config.appID},token=${getStorage('token')}`,
  });
};

export const infoAll = (tittle, txt) => {
  aegis.infoAll(`${tittle}~~`, new Date(),
    `~~${new Date()}~~${txt},source=wxMini,didiSelUid=${getStorage('didiSelUid')},phone=${getStorage('cellNum')},appId=${Config.appID},token=${getStorage('token')}`,
  );
};

// 修改 reportTime 方法，移除第三个参数
export const reportTiming = (name, duration) => {
  aegis.reportTime(name, duration);
};

export const reportTime = (name) => {
  aegis.time(name);
};

export const reportTimeEnd = (name) => {
  aegis.timeEnd(name);
};

export default aegis;
