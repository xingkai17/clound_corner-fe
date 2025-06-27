import mpx from '@mpxjs/core';
import { getStorage } from './cache';
import { showToast } from './toast';

class RPC {
  constructor() {
    this.baseURL = '';
    this.timeout = 10000;
  }

  setBaseURL(url) {
    this.baseURL = url;
  }

  setTimeout(timeout) {
    this.timeout = timeout;
  }

  request(options) {
    const { url, method = 'GET', data = {}, header = {} } = options;

    // 添加默认请求头
    const defaultHeader = {
      'Content-Type': 'application/json',
      ...header,
    };

    // 添加 token
    const token = getStorage('token');
    if (token) {
      defaultHeader.Authorization = `Bearer ${token}`;
    }

    return new Promise((resolve, reject) => {
      mpx.request({
        url: this.baseURL + url,
        method,
        data,
        header: defaultHeader,
        timeout: this.timeout,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res);
          }
        },
        fail: (err) => {
          showToast('网络请求失败');
          reject(err);
        },
      });
    });
  }

  get(url, params = {}) {
    return this.request({
      url,
      method: 'GET',
      data: params,
    });
  }

  post(url, data = {}) {
    return this.request({
      url,
      method: 'POST',
      data,
    });
  }

  put(url, data = {}) {
    return this.request({
      url,
      method: 'PUT',
      data,
    });
  }

  delete(url, data = {}) {
    return this.request({
      url,
      method: 'DELETE',
      data,
    });
  }
}

export default new RPC();
