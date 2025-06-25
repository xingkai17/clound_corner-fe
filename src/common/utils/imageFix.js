/*
 * @Description 图片显示处理
 */
// 图片过滤，加上私有后缀 320*240     中图
export const half = (imgurl) => {
  (imgurl.indexOf('-pms_') !== -1 || imgurl.indexOf('-linhuiba_') !== -1) || (imgurl += '-pms_half');
  return imgurl;
};
// 图片过滤，加上私有后缀 180*180      缩略图
export const btn = (imgurl) => {
  (imgurl.indexOf('-pms_') !== -1 || imgurl.indexOf('-linhuiba_') !== -1) || (imgurl += '-pms_thn');
  return imgurl;
};
// 图片过滤，加上私有后缀 1000*800   大图
export const wk = (imgurl) => {
  (imgurl.indexOf('-pms_') !== -1 || imgurl.indexOf('-linhuiba_') !== -1) || (imgurl += '-pms_wk');
  return imgurl;
};
export const origin = (imgurl) => {
  (imgurl.indexOf('-pms_') !== -1 || imgurl.indexOf('-linhuiba_') !== -1) || (imgurl += '-pms_original');
  return imgurl;
};

const IMAGE_SIZE = {
  origin: '-pms_original',
  small: '-pms_thn',
  middle: '-pms_half',
  large: '-pms_wk',
};
export const format = function(url, type = 'small') {
  if (!url) return '';
  if (url.indexOf('-pms_') !== -1 || url.indexOf('-linhuiba_') !== -1) {
    return url;
  }
  return url + IMAGE_SIZE[type];
};
