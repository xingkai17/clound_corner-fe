/**
 * @Description 缓存
 */
import mpx from '@mpxjs/core';

/**
 * 获取本地存储
 */
export const getStorage = (key) => {
  if (!key) {
    return false;
  }
  return mpx.getStorageSync(key);
};
/**
 * 设置本地存储
 */
export const setStorage = (key, data) => {
  if (!key && !data) {
    return false;
  }
  mpx.setStorageSync(key, data);
};
/**
 * 移除本地存储
 */
export const removeStorage = (key) => {
  if (!key) {
    return false;
  }
  return mpx.removeStorageSync(key);
};
