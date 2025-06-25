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
// 添加应用基础信息配置
export const APP_CONFIG = {
  // 从账户信息中获取真实版本，失败时回退本地版本
  get version() {
    return getVersion();
  },
};
