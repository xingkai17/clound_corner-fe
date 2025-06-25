/*
* 项目业务级功能方法汇总文件
* 通用性公共方法记得迭代到 @didi/func 方法库
*/
import { floorKeep, isNotEmpty } from '@didi/func';
import mpx from '@mpxjs/core';
// import { BRAND_SIDE } from 'src/views/center/index/config';

/**
 * 递归遍历对象，清空参数前后空格
 * @param {type} obj 递归遍历对象
 * @param {type} isDelEmptyObject 是否删除空内容（空值、空对象、空数组），默认不删除
 * @returns {any}
 * @demo deepTrim({ id: ' 1 ' }); // { id: '1' }
 */
export function deepTrim(obj, isDelEmptyObject = false) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  const keys = Object.keys(obj);
  for (const key of keys) {
    const val = obj[key];
    if (!isNotEmpty(val)) {
      isDelEmptyObject && Reflect.deleteProperty(obj, key);
    } else if (typeof val === 'string') {
      // 去空格
      obj[key] = val.trim();

      // 判断是否需要删除空值
      isDelEmptyObject && !isNotEmpty(obj[key]) && Reflect.deleteProperty(obj, key);
    } else if (Array.isArray(val)) {
      isDelEmptyObject && val.length === 0 && Reflect.deleteProperty(obj, key);
    } else if (val instanceof Object) {
      // 属性值为对象，递归调用
      deepTrim(obj[key], isDelEmptyObject);

      // 如某属性的值为不包含任何属性的独享，则将该属性删除，即 如果是空数组或空对象，删除该属性
      isDelEmptyObject && Object.keys(obj[key]).length === 0 && Reflect.deleteProperty(obj, key);
    }
  }
  return obj;
}

// 获取文件名后缀名
export const getFileExtension = (str) => str?.split('.').pop().toLowerCase();

// 图片格式
export const ImageType = ['png', 'jpg', 'gif', 'jpeg', 'bmp'];

// 文档格式
export const DocumentType = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'];

// 视频格式
export const VideoType = ['rm', 'rmvb', 'mpeg1-4', 'mov', 'mtv', 'dat', 'wmv', 'avi', '3gp', 'amv', 'dmv', 'flv', 'mp4'];

/**
 * @description 根据文件类型获取图标
 * @param fileType 文件类型
 * @param isImage 是否返回图标图片，true 返回图标图片，false 返回图标 icon
 */
export const getFileTypeIcon = (fileType, isImage = false) => {
  let val = `file_icon_unknow`;
  switch (fileType) {
    case 'image/png':
    case 'png':
    case 'image/jpg':
    case 'jpg':
    case 'image/jpeg':
    case 'jpeg':
    case 'image/webp':
    case 'webp':
      val = 'file_icon_picture';
      break;
    case 'video/mp4':
    case 'mp4':
      val = 'file_icon_video';
      break;
    case 'application/pdf':
    case 'pdf':
      val = 'file_icon_pdf';
      break;
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'ppt':
    case 'pptx':
      val = 'file_icon_ppt';
      break;
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'xls':
    case 'xlsx':
      val = 'file_icon_excel';
      break;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/msword':
    case 'doc':
    case 'docx':
      val = 'file_icon_word';
      break;
  }
  return isImage ? `https://staticres.linhuiba.com/project-custom/location-space-mp/icon/${val}.png` : `locxx-wap-${val}`;
};

/**
 * @description 获取当前定位
 * @return
 */
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    mpx.getLocation({
      type: 'gcj02',
      success(res) {
        resolve(res);
      },
      fail(result) {
        reject(result);
      },
    });
  });
};

// 圆圈半径对应的scale(ios includePoints方法无效)
const scaleMap = {
  '500': 15.2,
  '600': 14.92,
  '700': 14.66,
  '800': 14.43,
  '900': 14.24,
  '1000': 14.07,
  '1100': 13.92,
  '1200': 13.77,
  '1300': 13.66,
  '1400': 13.54,
  '1500': 13.43,
  '1600': 13.33,
  '1700': 13.24,
  '1800': 13.15,
  '1900': 13.07,
  '2000': 12.99,
  '2100': 12.92,
  '2200': 12.85,
  '2300': 12.78,
  '2400': 12.72,
  '2500': 12.66,
  '2600': 12.6,
  '2700': 12.54,
  '2800': 12.48,
  '2900': 12.43,
  '3000': 12.38,
  '3100': 12.33,
  '3200': 12.29,
  '3300': 12.24,
  '3400': 12.2,
  '3500': 12.15,
  '3600': 12.11,
  '3700': 12.07,
  '3800': 12.03,
  '3900': 11.99,
  '4000': 11.96,
  '4100': 11.92,
  '4200': 11.88,
  '4300': 11.85,
  '4400': 11.81,
  '4500': 11.78,
  '4600': 11.75,
  '4700': 11.72,
  '4800': 11.69,
  '4900': 11.66,
  '5000': 11.63,
};

export const getMapScale = (range) => {
  if (range < 500) { // 小于 500 一律给15.5
    return 15.5;
  } else if (range <= 5000) {
    // 矫正range
    const _range = parseInt(floorKeep(range, 100, 4) + '');
    return scaleMap[floorKeep(_range, 100, 3)];
  } else { // 大于5000，一律给 11
    return 11;
  }
};

/**
 *
 * @description 二维码入参解构为对象
 * @param scene
 * @return
 * @demo
 */
export const handleScene = (scene) => {
  if (!scene) return;
  const newScene = decodeURIComponent(scene);
  // 去掉问好
  const trimmedStr = newScene.substring(1);

  // 将参数字符串分割成键值对数组
  const paramArray = trimmedStr.split('&');

  // 创建空对象
  const paramObj = {};

  // 遍历键值对数组，将每个键值对解析为对象的属性
  for (const param of paramArray) {
    const [key, value] = param.split('=');
    if (key && value) {
      paramObj[key] = value;
    }
  }

  return paramObj;
};

/**
 * @description 重构七牛图片链接
 * @param url 原链接
 * @param w 宽度
 * @param h 高度
 * @return
 */
export const refactorQiniuImageUrl = (url, w = 48, h = 48) => {
  if (!url) return '';
  return `${url}?imageView2/1/w/${w}/h/${h}`;
};
