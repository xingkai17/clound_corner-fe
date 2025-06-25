import { UrlSuffix } from '@/common/enums/qiniu';

/**
 * @description: 根据七牛文件的 url，获取原图后缀
 * @param {*} url
 * @return {*}
 */
export function getQiniuFileOriSuffix(url) {
  if (!url) {
    return '';
  }
  if (url.includes('middle-file.linhuiba.com/')) {
    return '';
  } else if (url.includes('img.linhuiba.com')) {
    return UrlSuffix.Ori;
  } else if (url.includes('pmsimage.location.pub')) { // 来自 pms 的图片
    return UrlSuffix.PmsOri;
  } else if (url.includes('images.location.pub')) { // 来自 location 的图片
    return UrlSuffix.locationOri;
  } else {
    return '';
  }
}

/**
 * @description: 根据七牛文件的 url，获取原图链接
 * @param {*} url
 * @return {*}
 */
export function getQiniuFileOriUrl(url) {
  if (!url) {
    return '';
  }
  // 预处理掉链接本身的后缀
  url = url.replace(new RegExp(Object.values(UrlSuffix).join('|'), 'g'), '');
  return url + getQiniuFileOriSuffix(url);
}

/**
 * @description: 根据七牛文件的 url，获取预览后缀
 * @param {*} url
 * @return {*}
 */
export function getQiniuFilePreviewSuffix(url) {
  if (!url) {
    return '';
  }
  if (url.includes('middle-file.linhuiba.com')) {
    return '';
  } else if (url.includes('img.linhuiba.com')) { // 来自 邻汇吧场地 的图片
    // https://img.linhuiba.com/FpEPNhDNUt0QiRKG94_bjZhSR02Z-linhuiba_watermark?v=1
    return UrlSuffix.Wk;
  } else if (url.includes('pmsimage.location.pub')) { // 来自 pms 的图片
    return UrlSuffix.PmsLarge;
  } else if (url.includes('data-images.location.pub')) { // 来自 商业直租 的图片
    return '';
  } else if (url.includes('images.location.pub')) { // 来自 location 的图片
    return UrlSuffix.locationWx;
  } else {
    return '';
  }
}

/**
 * @description: 根据七牛文件的 url，获取预览链接
 * @param {*} url
 * @return {*}
 */
export function getQiniuFilePreviewUrl(url) {
  if (!url) {
    return '';
  }
  url = url.replace(/\?.*/, '');
  // 预处理掉链接本身的后缀
  url = url.replace(new RegExp(Object.values(UrlSuffix).join('|'), 'g'), '');
  return url + getQiniuFilePreviewSuffix(url);
}

/**
 * TODO 临时加上后面要修改，统一处理了下图片水印问题
 * @description: 根据七牛文件的 url，获取 5*4 中图
 * @param {*} url
 * @return {*}
 */
export function getQiniuFileMiddleUrl(url, suffix = 'PmsMiddle') {
  if (!url) {
    return '';
  }
  url = url.replace(/\?.*/, '');
  // 预处理掉链接本身的后缀
  url = url.replace(new RegExp(Object.values(UrlSuffix).join('|'), 'g'), '');
  return url + UrlSuffix[suffix];
}
