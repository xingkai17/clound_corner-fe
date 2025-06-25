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
  serviceName,
  param = {},
  extraConfig = {},
  version = 1,
) {
  instance.defaults.headers = { ...instance.defaults.headers, ...getHeader(version), ...extraConfig.headers };
  const config = mergeConfig(extraConfig);
  const requestUrl = getRequestUrl(serviceName, config);
  const axiosConfig = getAxiosConfig(config, { params: param });
  try {
    const response = await instance.get(requestUrl, axiosConfig);
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
  serviceName,
  data = {},
  extraConfig = {},
  version = 1,
) {
  instance.defaults.headers = { ...instance.defaults.headers, ...getHeader(version), ...extraConfig.headers };
  const config = mergeConfig(extraConfig);
  const requestUrl = getRequestUrl(serviceName, config);
  const axiosConfig = getAxiosConfig(config);
  if (axiosConfig.isTrim) {
    data = deepTrim(data);
  }
  try {
    const response = await instance.post(requestUrl, data, axiosConfig);
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
  serviceName,
  data = {},
  extraConfig = {},
  version = 1,
) {
  instance.defaults.headers = { ...instance.defaults.headers, ...getHeader(version), ...extraConfig.headers };
  const config = mergeConfig(extraConfig);
  const requestUrl = getRequestUrl(serviceName, config);
  const axiosConfig = getAxiosConfig(config);
  try {
    const response = await instance.put(requestUrl, data, axiosConfig);
    return success(response, config);
  } catch (err) {
    return fail(err, config, serviceName);
  }
}
