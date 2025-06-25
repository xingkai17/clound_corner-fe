import axios from 'axios';
import { getFullURL } from './http';
import { APP_CONFIG } from '@/common/utils/config';
// import router from '@/router';
import { deepTrim } from '../utils/ways';

// axios 默认配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['x-client-version'] = process.env.xClientVersion || '0.0.1';
axios.defaults.headers['X-Request-AppId'] = process.env.APPID || '';
axios.defaults.headers['X-Request-Version'] = APP_CONFIG.version;
axios.defaults.headers['X-Request-AppType'] = process.env.APP_TYPE || '';
axios.defaults.headers['Authorization'] = process.env.APP_TYPE || '';
axios.defaults.timeout = 30000; // 设置30s为超时
// 超时用法：get('/placeList/detail', { id }, { isMock: false, timeout: 200 })

// #ifdef MP_WEIXIN
// 真机获取 解决app上adapter is not a function问题
// 解决 uniapp 适配axios请求，避免报adapter is not a function错误
axios.defaults.adapter = function(config: any) {
  const { url, method, data, params, headers, baseURL, paramsSerializer } = config;
  return new Promise((resolve, reject) => {
    uni.request({
      method: method!.toUpperCase() as any,
      url: getFullURL(process.env.API_URL || baseURL || '', url!, params, paramsSerializer),
      header: headers,
      data,
      dataType: 'json',
      responseType: config.responseType,
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject({ response: res });
        }
      },
      fail: (err: any) => {
        console.log('fail', err);
        reject(err);
      },
    });
  });
};
// #endif

// 存储路由跳转时，需要cancel的接口
const requestMap = new Map();
const instance = axios.create();

/**
 * 请求拦截
 */
instance.interceptors.request.use(
  (config: any) => {
    // get 请求时，清空参数前后空格
    if (config.method.toUpperCase() === 'GET') {
      config.params = deepTrim(config.params);
    }

    if (config.cancelToken) {
      const source = axios.CancelToken.source();
      config.axiosKey = config.url.split('?')[0];
      config.cancelToken = source.token;
      // 如果存在就未完结的就cancel
      if (requestMap.has(config.axiosKey)) {
        requestMap.get(config.axiosKey).cancel();
      }
      requestMap.set(config.axiosKey, source);
    }
    return config;
  },
);

/**
 * 结果拦截
 */
instance.interceptors.response.use(
  (response: any) => {
    const { config } = response;
    config && config.axiosKey && requestMap.delete(config.axiosKey);
    return response;
  },
);

// /**
//  * 监听路由变化，取消全部待取消的请求
//  */
// router?.beforeEach((to, from, next) => {
//   // 遍历全部取消
//   // console.log('待取消请求的数目：', requestMap.size);
//   if (requestMap.size > 0) {
//     requestMap.forEach((item: any, key: any) => {
//       item.cancel();
//       requestMap.delete(key);
//     });
//   }
//   next();
// });

export default instance;
