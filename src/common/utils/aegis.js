import Aegis from 'aegis-mp-sdk';
import { getStorage } from '@/common/utils/cache';
// 区分环境的配置
const getAegisConfig = () => {
  const isProd = process.env.NODE_TYPE !== 'te';

  return {
    id: isProd ? 'r5kDdSlZQjdOzEzXkv' : 'YrKZdfb3Ke6aQj9wPz',
    reportApiSpeed: true,
    reportAssetSpeed: true,
    // 移除 spa
    hostUrl: 'https://rumt-zh.com',
    version: process.env.VERSION || '1.0.0',
    ext1: isProd ? 'prod' : 'test',
    // 修改 api 配置
    api: {
      reportRequest: true,
      apiDetail: true,
    },
    // delay: 1000,
    // repeat: 5,
    ignore: [
      /Script error/i,
      /WeixinJSBridge is not defined/i,
    ],
    pagePerformance: true,
    offlineLog: true,
    // aid: 'your-app-id',
    // uid: 'user-id',
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
export const infoAll = (name, ext1) => {
  aegis.infoAll(name, ext1, `appId=${process.env.APPID}`, `token=${getStorage('token')}`, new Date());
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
