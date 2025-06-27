import mpx from '@mpxjs/core';

// 添加账户信息配置
let envVersion = 'platformApi-prod';

// 获取小程序账户信息
export const getAccountInfo = () => {
  try {
    return mpx.getAccountInfoSync();
  } catch (e) {
    console.error('获取账户信息失败', e);
    return {
      miniProgram: {
        appId: 'unknown',
        envVersion: envVersion,
      },
    };
  }
};

// 获取方法
export const getVersion = () => {
  return envVersion;
};

// 添加版本设置方法
export const setEnvVersion = (version) => {
  envVersion = version || 'platformApi-prod';
};

// 应用配置
export const Config = {
  appID: '',
  baseURI: '',
  imgBaseURI: '',
  baseAPI: 'didiApi/',
  billbaseAPI: 'didiBillAdminApi/',
  groupApi: 'didiGroupApi/',
  didiWebViewUrl: '',
  mallUrl: '',
  cancelCouponUrl: '',

  // 从账户信息中获取真实版本，失败时回退本地版本
  get version() {
    return getVersion();
  },
};

// 初始化配置
export const initConfig = () => {
  try {
    const accountInfo = getAccountInfo();
    Config.appID = accountInfo.miniProgram.appId;

    // 根据 appID 设置不同的配置
    if (Config.appID === 'wxfeb7f65afd711324' ||
        Config.appID === 'wx26cf2ad07297bb6a' ||
        Config.appID === 'wx768505309a8cf5b9') {
      Config.baseURI = 'https://didi.paysys.cn/';
      Config.imgBaseURI = 'https://didi.paysys.cn/';
      Config.didiWebViewUrl = 'https://didi.paysys.cn/didiPay/#/';
      Config.mallUrl = 'https://didi.paysys.cn/h5mall/dist/index.html?';
      Config.cancelCouponUrl = 'https://didi.paysys.cn/didiH5Pay';
    } else {
      // 其他环境的配置
      Config.baseURI = 'https://test.didi.paysys.cn/';
      Config.imgBaseURI = 'https://test.didi.paysys.cn/';
      Config.didiWebViewUrl = 'https://test.didi.paysys.cn/didiPay/#/';
      Config.mallUrl = 'https://test.didi.paysys.cn/h5mall/dist/index.html?';
      Config.cancelCouponUrl = 'https://test.didi.paysys.cn/didiH5Pay';
    }
  } catch (error) {
    console.error('初始化配置失败:', error);
  }
};

// 添加应用基础信息配置
export const APP_CONFIG = {
  // 从账户信息中获取真实版本，失败时回退本地版本
  get version() {
    return getVersion();
  },
};

export default Config;
