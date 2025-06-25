/*
 * @Author: conling_li 775056397@qq.com
 * @Date: 2025-03-11 15:25:20
 * @LastEditors: conling_li 775056397@qq.com
 * @LastEditTime: 2025-03-12 16:12:03
 * @FilePath: \didi-market-platform\src\common\request\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RequestConfig } from '@/../types/interface/config';
import { getHeader, mergeConfig, getRequestUrl, success, fail, getAxiosConfig } from './utils';
import instance from './instance';
import { deepTrim } from '../utils/ways';

/**
 * Get 请求
 * @param serviceName 请求地址 | 接口path
 * @param param 接口参数
 * @param extraConfig 自定义配置
 * @param version 接口版本
 */
export async function axiosGet(
  serviceName: string,
  param = {},
  extraConfig: RequestConfig = {},
  version: 1,
): Promise<any> {
  instance.defaults.headers = { ...instance.defaults.headers, ...getHeader(version), ...extraConfig.headers };
  const config = mergeConfig(extraConfig);
  const requestUrl = getRequestUrl(serviceName, config);
  const axiosConfig: any = getAxiosConfig(config, { params: param });
  try {
    const response: any = await instance.get(requestUrl, axiosConfig);
    return success(response, config);
  } catch (err) {
    return fail(err, config, serviceName);
  }
}

/**
 * Post 请求
 * @param serviceName 请求地址 | 接口path
 * @param data 接口参数
 * @param extraConfig 自定义配置
 * @param version 接口版本
 */
export async function axiosPost(
  serviceName: string,
  data = {},
  extraConfig: RequestConfig = {},
  version: 1,
): Promise<any> {
  instance.defaults.headers = { ...instance.defaults.headers, ...getHeader(version), ...extraConfig.headers };
  const config = mergeConfig(extraConfig);
  const requestUrl = getRequestUrl(serviceName, config);
  const axiosConfig: any = getAxiosConfig(config);
  if (axiosConfig.isTrim) {
    data = deepTrim(data);
  }
  try {
    const response: any = await instance.post(requestUrl, data, axiosConfig);
    return success(response, config);
  } catch (err) {
    return fail(err, config, serviceName);
  }
}

/**
 * Put 请求
 * @param serviceName 请求地址 | 接口path
 * @param data 接口参数
 * @param extraConfig 自定义配置
 * @param version 接口版本
 */
export async function axiosPut(
  serviceName: string,
  data = {},
  extraConfig: RequestConfig = {},
  version: 1,
): Promise<any> {
  instance.defaults.headers = { ...instance.defaults.headers, ...getHeader(version), ...extraConfig.headers };
  const config = mergeConfig(extraConfig);
  const requestUrl = getRequestUrl(serviceName, config);
  const axiosConfig: any = getAxiosConfig(config);
  try {
    const response: any = await instance.put(requestUrl, data, axiosConfig);
    return success(response, config);
  } catch (err) {
    return fail(err, config, serviceName);
  }
}
