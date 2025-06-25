import buildURL from 'axios/lib/helpers/buildURL';
// import type { AxiosRequestConfig } from 'axios'

// type ParamsSerializer = AxiosRequestConfig['paramsSerializer']

export function getFullURL(
  baseURL: string,
  url: string,
  params: Record<string, any>,
  paramsSerializer?: any,
) {
  if (url.startsWith('http')) {
    return buildURL(url, params, paramsSerializer);
  }
  baseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
  // 和 vue.config.js 同步
  url = (url.startsWith('/') ? url.slice(1) : url)
    .replace(/lcn-api\//, 'lcnres/')
    .replace(/mirage-api\//, 'mirage/');
  // console.log('baseURL', baseURL);
  // console.log('url', url);

  return buildURL(`${baseURL}${url}`, params, paramsSerializer);
}
