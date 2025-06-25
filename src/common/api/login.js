/**
 * @Description 登录
 */
import { _get, _post } from '../request';
const baseApi = process.env.BASE_API || 'https://didi.paysys.cn';
import { removeStorage } from '@/common/utils/cache';
/**
 * 登录获取个人信息及token
 */
export const login = (params) => {
  removeStorage('token');
  removeStorage('token_type');
  return _post('/login?grant_type=1', params, { proxyApi: baseApi, needHint: false });
};

/**
 * 获取手机号,成为会员
 */
export const getPhoneNumber = (params) => {
  return _post('/api1/member/bindByWxAuthV2', params, { proxyApi: baseApi, needHint: true });
};
/**
 * 获取油站名称及机构名称
 */
export const getProgramName = (params) => {
  return _get('/api/platform/getProgramName' + '/' + (process.env.APPID || 'wx21c2e8ca1f7fe33d'), params, {});
};

/**
 * @description 油站列表
 * @link https://didi.paysys.cn/webapi/doc.html#/%E4%BC%9A%E5%91%98/%E6%B2%B9%E7%AB%99%E4%BF%A1%E6%81%AF%E6%8E%A5%E5%8F%A3/stationListUsingPOST_1
 */
export const getStationList = (params) => {
  return _post('/api1/oilStation/stationList', params, { proxyApi: baseApi, needHint: false });
};

/**
 * @description 用户选择油站
 * @link https://didi.paysys.cn/webapi/doc.html#/%E4%BC%9A%E5%91%98/%E4%BC%9A%E5%91%98%E4%BF%A1%E6%81%AF%E6%8E%A5%E5%8F%A3/bindMerchantUsingPOST_1
 */
export const setBindMerchant = (params) => {
  return _post('/api1/member/bindMerchant', params, { proxyApi: baseApi, needHint: false });
};


/**
 * @description 会员卡单独售卖油站会员注册接口
 * @link https://didi.paysys.cn/webapi/doc.html#/ALL/%E4%BC%9A%E5%91%98%E5%8D%A1%E5%8D%95%E7%8B%AC%E5%94%AE%E5%8D%96-saas%E6%A1%94%E9%87%8F/memberRegisterForStationUsingPOST
 */
export const postMemberRegisterForStation = (params) => {
  return _post('/api1/juliang/card/self/memberRegisterForStation', params, { proxyApi: baseApi, needHint: false });
};
