import axios from 'axios';
import mpx from '@mpxjs/core';
// import { getStorage } from '@lhb/cache';
import { deepCopy, isDef } from '@didi/func';
import { useUserStore } from '@/store/user';
import { showToast } from '../utils/toast';
import { getStorage } from '@/common/utils/cache';

/**
 * 接口请求加密
 * @param encrypted 密文
 * @param key 公钥
 * @param iv 偏移量
 * @returns
 */
// function aesEncrypt(data, key, iv) {
//   // 将数据、密钥和向量转换为CryptoJS支持的格式
//   const dataToEncrypt = CryptoJS.enc.Utf8.parse(data);
//   const encryptedKey = CryptoJS.enc.Utf8.parse(key);
//   const encryptedIV = CryptoJS.enc.Utf8.parse(iv);

//   // 执行加密操作
//   const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, encryptedKey, {
//     iv: encryptedIV,
//   });

//   // 获取加密结果
//   const encryptedData = encrypted.toString();

//   return encryptedData;
// }


// import { Message, MessageBox } from 'element-ui';

// MockUrl
const mockUrl = 'https://yapi.lanhanba.com/mock/';
// 默认URL
const baseUrl = '';
const defaultProxyApi = '/webapi'; // 默认代理
const isMockDebugMode = true; // 是否开启mock调试模式，如果不开启，即使添加了isMock也不会生效
const baseApi = process.env.BASE_API;
/**
 * 请求基础配置
 */
const baseConfig = {
  needCancel: true, // 是否需要在下次请求发生时，对之前的请求进行 abortControl
  isMock: false, // 是否mock方式
  mockId: 560, // 其他后台mock的id
  needHint: true,
  proxyApi: baseApi, // 需要代理的其他 api目标， 会替换掉当前目标的 /lcnres
  errorConfig: {
    needHint: true,
    duration: 3000, // 报错后多久小时，毫秒
    showClose: false, // 是否显示关闭按钮，开启后报错弹窗将不会主动消失
  },
};

/**
 * 异常处理
 */
class ApiError extends Error {
  constructor(err) {
    const msg = err.message || err.msg || '';
    super(msg);
    Object.assign(this, err);
    this.code = err.code;
  }
}

/**
 * 获取header
 * @param version 版本号
 * @param isPost 是否是 Post 请求
 */
export function getHeader(version = 1) {
  // 约定所有项目，为避免信息污染其他项目，存放cookie内的信息，一律加前缀
  const token = getStorage('token') ? getStorage('token_type') + ' ' + getStorage('token') : '';

  const obj = {
    Authorization: token,
    clientKey: 1001213, // location-space-mp，使用location的clientKey
    // clientKey: clientKeyMap[source] || clientKeyMap.default, // PMS
  };

  return obj;
}

/**
 * 合并请求
 * @param extraConfig
 */
export function mergeConfig(extraConfig) {
  const _baseConfig = deepCopy(baseConfig);
  // 为了方便 第三个参数为boolean 值时可控制needHint值
  if (typeof extraConfig === 'boolean') {
    _baseConfig.errorConfig.needHint = extraConfig;
    return _baseConfig;
  } else if (typeof extraConfig.needHint === 'boolean') {
    _baseConfig.errorConfig.needHint = extraConfig.needHint;
  }

  return { ..._baseConfig, ...extraConfig };
}

/**
 * 返回配置后的请求URl
 */
export function getRequestUrl(serviceName, config) {
  return (process.env.NODE_ENV === 'development' && isMockDebugMode && config.isMock ? `${mockUrl}${config.mockId || baseConfig.mockId}` : `${config.proxyApi || defaultProxyApi}`) + baseUrl + serviceName;
}

/**
 * 错误的请求处理
 * @param err
 * @param config
 */
export function fail(err, config, serviceName) {
  // console.log('fail err', err);
  if (axios.isCancel(err)) {
    throw new ApiError({
      code: 'cancel',
      msg: `您取消了请求 ${serviceName}`,
    });
  }
  const { errorConfig: { needHint, duration = 300000, showClose = false }, codeArray = [] } = config;
  const errorOptions = {
    icon: 'error',
    duration,
    showClose,
  };
  if (err.response) {
    const { status, statusCode, data: { errMsg }, data } = err.response;
    const curStatus = status || statusCode; // 如果是h5为status ，小程序为statusCode

    // 对指定code值 返回正常结果 resolve ;
    let isResolve = false;
    // console.log(errMsg);
    for (const item of codeArray) {
      if (item === statusCode) {
        isResolve = true;
        break;
      }
    }
    if (isResolve) {
      throw new ApiError(err);
    }

    // 服务端 2022/06/14 版本接口约定
    if (needHint) {
      switch (curStatus) {
        case 401:
          errorOptions.title = '未登录';
          break;
        case 403:
          errorOptions.title = '没有权限';
          break;
        case 404:
          errorOptions.title = 'api不存在';
          break;
        case 500:
          errorOptions.title = errMsg || '系统错误';
          break;
        default:
          errorOptions.title = errMsg || data;
          break;
      }
    }
    console.log(errorOptions);
    console.log(curStatus);
    if (errorOptions.title) {
      if (curStatus === 401) {
        // token无效，建议踢出
        // dispatchLogout(true);
        useUserStore().logout();
        mpx.$emit('Login');
        showToast(errorOptions.title, 2000);
        // uni.showToast(errorOptions);
      } else {
        if (curStatus === 403 || curStatus === 500) {
          mpx.showToast({
            ...errorOptions,
            ...config.failShowToastConfig,
          });
        } else {
          // console.log(errorOptions.title);
          showToast(errorOptions.title, 2000);
        }
      }
    }
  }
  throw new ApiError(err);
}

/**
 * 成功请求处理
 * remark: 暂时未做处理，预留
 * @param res
 */
export function success(res, config) {
  let data = res.data;

  if (config.isMock) {
    return data;
  }

  if (isDef(data) && data.ret !== 1) {
    if (config.needHint) {
      showToast(data.msg, 2000);
    }
    throw new ApiError(data);
  }
  return data;
}

/**
 * 获取 axios 请求配置
 * @param requestConfig
 * @param axiosConfig
 */
export function getAxiosConfig(requestConfig, axiosConfig = {}) {
  const { needCancel = true, responseType } = requestConfig;
  // 需要cancel的时候，就加入cancelToken
  if (needCancel) {
    // axios会根据 cancelToken是否存在，进行打断。
    axiosConfig.cancelToken = {};
  }
  if (responseType) {
    axiosConfig.responseType = responseType;
  }

  return Object.assign(requestConfig, axiosConfig);
}
