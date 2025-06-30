// 公共方法

import Vue from 'vue';
import { Message } from 'element-ui';
import moment from 'moment';
import Viewer from 'viewerjs'; // 图片预览

/**
 * @description: 将date-picker时间范围选择器选择的时间进行格式处理，默认格式为YYYY-MM-DD
 * @param {type} time         时间格式的字符串，或能被解析的时间（Tue Aug 08 2017 00:00:00 GMT+0800 (中国标准时间)）
 * @param {type} formatString 转换格式，默认 YYYY-MM-DD
 * @return:
 */
export function filterTime(time, format = 'YYYY-MM-DD') {
  if (time) {
    // 时间格式处理，默认格式为YYYY-MM-DD
    return moment(time).format(format);
  } else {
    return '';
  }
}

/**
 * 获得日期为周几
 * @return {[type]} [description]
 */
export function getDay(date) {
  if (!date) {
    return '未知';
  }
  const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const day = new Date(date).getDay();
  return weekday[day];
}

/**
 * [setViewer 使用图片预览]
 * @param {[type]}  vm         [vue实例]
 * @param {String}  data       [监听的参数，默认为 data_items]
 * @param {String}  viewerNode [对该元素节点下的图片进行预览，默认为 document.getElementById('body')]
 * @param {Boolean} need_watch [是否需要使用watch监听对象变化，否则调用时直接进行预览]
 */
export function setViewer(vm, data = 'data_items', viewerNode, need_watch = true) {
  const viewerOptions = {
    url: 'data-original',
    zoomRatio: 0.2,
    minZoomRatio: 0.2,
    maxZoomRatio: 6,
    rotatable: true, // 旋转
    scalable: false, // 水平/垂直翻转
  };

  if (!viewerNode) {
    viewerNode = document.getElementById('body');
  }

  // 预览器属性设置
  if (vm.viewer_option) {
    Object.assign(viewerOptions, vm.viewer_option);
  }

  if (need_watch) {
    vm.$watch(data, (val, oldVal) => {
      // 监听 data （覆盖）更新后，重新设置 viewer
      vm.$nextTick(() => {
        setView(viewerNode, viewerOptions);
      });
    }, {
      immediate: true,
    });
  } else {
    setView(viewerNode, viewerOptions);
  }

  // 设置 viewer 容器
  function setView(node, options) {
    // 数据为空或不存在时，返回
    if (!node) {
      return null;
    }
    let viewer = node.viewer;
    // 如果存在旧的预览容器，进行销毁重新创建
    if (viewer) {
      viewer.destroy();
    }
    viewer = new Viewer(node, options);
    return viewer;
  }
}

/**
 * 根据关键词，从已有json数组数据中筛选结果
 * @param  {[type]} data_items 要过滤的数据
 * @param  {[type]} keyword    过滤关键词
 * @param  {String} param      关键词对应的参数名
 * @return {[type]}            [description]
 */
export function filterByKeyword(data_items, keyword, param = 'display_name') {
  keyword = keyword.trim();
  if (data_items.length <= 0 || !keyword) {
    return data_items;
  }
  const arr = [];
  for (const item of data_items) {
    if (item[param] && item[param].indexOf(keyword) >= 0) {
      arr.push(item);
    }
  }

  return arr;
}

/**
 * 延迟操作（如，输入停顿0.6s后，快速查询）
 * @param  {Function} callback 输入停顿后执行的方法
 * @return {[type]}            [description]
 */
export function dataBrief(callback, pause_time = 600) {
  // 当用户停顿输入（0.6s）后，开始搜索，防止频繁调取接口导致报错或查询结果不对
  const self = this;
  if (!self.t_start_brief) {
    self.t_start_brief = null;
  }

  clearTimeout(self.t_start_brief);
  self.t_start_brief = setTimeout(function() {
    // console.log('停止输入，开始搜索')
    // 停止输入，开始搜索
    callback();
  }, pause_time);
}

/**
 * 从对象中剔除指定值的参数
 * 如，剔除为null的参数，不进行传递
 * @param  {[type]} data  对象
 * @param  {[type]} value 指定值，默认剔除为null的元素
 * @return {[type]}       [description]
 */
export function removeParam(data, value = null) {
  if (!data || !(data instanceof Object)) {
    return data;
  }
  const dataIsArray = Array.isArray(data);
  // 剔除为null的参数，不进行传递
  for (const key in data) {
    if (data[key] === value) {
      // 数组
      if (dataIsArray) {
        data.splice(key, 1);
      } else {
        Reflect.deleteProperty(data, key);
      }
    }
  }
  return data;
}

/**
 * 对对象中指定值进行替换
 * 可以将空值替换为null，防止数值型的参数传递空字符串将保存为0
 * @param  {[type]} data      [对象]
 * @param  {String} value     [指定值]
 * @param  {[type]} new_value [替换值]
 * @return {[type]}           [description]
 */
export function replaceParam(data, value, new_value) {
  if (value === undefined && new_value === undefined) {
    return false;
  }
  for (const item in data) {
    if (data[item] === value) {
      data[item] = new_value;
    }
  }
}

/**
 * 监听页面图片是否加载完毕
 * @param  {[type]}   self     [this 指向的vue]
 * @param  {Function} callback [所有图片加载完成回调函数]
 * @return {[type]}            [description]
 */
export function watchImageLoaded(self, callback) {
  self.img_count = self.img_count ? self.img_count : 0;
  self.img_loaded_count = self.img_loaded_count ? self.img_loaded_count : 0;

  const imgs = document.querySelectorAll('img');
  // console.log(imgs)
  self.img_count = imgs.length;
  Array.from(imgs).forEach((item) => {
    // let img = new Image()
    // img.src = item.getAttribute('src')

    item.onload = () => {
      // console.log(item, ' 已加载')
      self.img_loaded_count++;
      if (self.img_loaded_count >= self.img_count) {
        // console.log("加载完毕")
        callback();
      }
    };
    item.onerror = () => {
      // console.log(item, ' 加载失败')
      self.img_loaded_count++;
      if (self.img_loaded_count >= self.img_count) {
        // console.log("加载完毕")
        callback();
      }
    };
  });
}

/**
 * [jumpToNode 页面滚动到节点所在位置]
 * @param  {[type]} self    [vue实例]
 * @param  {[type]} jump_to [节点]
 * @return {[type]}         [description]
 */
export function jumpToNode(self, jumpNode, scrollNode = '#body') {
  self.$nextTick(function() {
    if (jumpNode && document.querySelector(jumpNode)) {
      const top = document.querySelector(jumpNode).getBoundingClientRect().top - document.querySelector(scrollNode).getBoundingClientRect().top;
      document.querySelector(scrollNode).scrollTop += top;
    }
  });
}

/**
 * 求两个数组的并集
 * @param  {[type]} ori_arr [description]
 * @param  {[type]} tar_arr [description]
 * @return {[type]}         [description]
 */
export function arrUnion(ori_arr, tar_arr) {
  if (!ori_arr || !tar_arr) {
    return false;
  }
  const a = new Set(ori_arr);
  const b = new Set(tar_arr);
  const unionSet = new Set([...a, ...b]);

  return [...unionSet];
}

/**
 * 求两个数组的交集
 * @param  {[type]} ori_arr [description]
 * @param  {[type]} tar_arr [description]
 * @return {[type]}         [description]
 */
export function arrIntersection(ori_arr, tar_arr) {
  if (!ori_arr || !tar_arr) {
    return false;
  }
  const a = new Set(ori_arr);
  const b = new Set(tar_arr);
  const intersectionSet = new Set([...a].filter(x => b.has(x)));

  return [...intersectionSet];
}

/**
 * 求两个数组的差集，ori_arr不存在于tar_arr的数据
 * 如 ori_arr=a=[1,2,3]，tar_arr=b=[2,5]，结果：[1,3]
 * @param  {[type]} ori_arr [description]
 * @param  {[type]} tar_arr [description]
 * @return {[type]}         [description]
 */
export function arrDifference(ori_arr, tar_arr) {
  if (!ori_arr || !tar_arr) {
    return false;
  }
  const a = new Set(ori_arr);
  const b = new Set(tar_arr);
  const differenceABSet = new Set([...a].filter(x => !b.has(x)));

  return [...differenceABSet];
}

/**
 * 判断图片是否存在
 * @param  {[type]}   pathImg  [图片链接]
 * @param  {Function} success [能访问（图片加载完毕后）的回调事件]
 * @param  {Function} error [不能能访问（图片加载失败后）的回调事件]
 * @return {Boolean}           [description]
 */
export async function isHasImage(pathImg, success, error) {
  const ImgObj = new Image();
  ImgObj.src = pathImg;
  let result = null;
  await new Promise((resolve, reject) => {
    ImgObj.onload = () => {
      result = true;
      if (typeof success === 'function') {
        success();
      }
      resolve();
    };
    ImgObj.onerror = () => {
      result = false;
      if (typeof error === 'function') {
        error();
      }
      reject();
    };
  }).finally(() => {
    // return result;
  }).catch(e => {});
  return result;
}

/**
 * [nodeWatermark 在某元素上添加水印]
 * @param  {[type]} settings           [水印配置]
 * @param  {String} opeartor_node_name [被添加水印的元素，默认 #body]
 * @return {[type]}                    [description]
 */
export function nodeWatermark(settings = {}, opeartor_node_name = '#body') {
  const opeartor_node = document.querySelector(opeartor_node_name);
  if (!opeartor_node) {
    return false;
  }

  // 默认设置
  var defaultSettings = {
    watermark_txt: 'text',
    watermark_x: 20, // 水印起始位置x轴坐标
    watermark_y: 20, // 水印起始位置Y轴坐标
    watermark_rows: 20, // 水印行数
    watermark_cols: 20, // 水印列数
    watermark_x_space: 100, // 水印x轴间隔
    watermark_y_space: 50, // 水印y轴间隔
    watermark_color: 'red', // 水印字体颜色
    watermark_alpha: 0.4, // 水印透明度
    watermark_fontsize: '15px', // 水印字体大小
    watermark_font: '微软雅黑', // 水印字体
    watermark_width: 210, // 水印宽度
    watermark_height: 80, // 水印长度
    watermark_angle: 15, // 水印倾斜度数
    watermark_position: 'absolute', // 水印的position
    watermark_z_index: 9999, // 水印的z_index
  };
  if (typeof settings === 'object') {
    Object.assign(defaultSettings, settings);
  }

  // console.log(arguments)
  // //采用配置项替换默认值，作用类似jquery.extend
  // if(arguments.length===1 && typeof arguments[0] ==="object" )
  // {
  //     var src=arguments[0]||{};
  //     for(let key in src)
  //     {
  //         if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key])
  //             continue;
  //         else if(src[key])
  //             defaultSettings[key]=src[key];
  //     }
  // }

  var oTemp = document.createDocumentFragment();

  // 获取页面最大宽度
  var page_width = Math.max(opeartor_node.scrollWidth, opeartor_node.clientWidth);
  // var cutWidth = page_width*0.0150;
  // var page_width=page_width-cutWidth;
  // 获取页面最大高度
  var page_height = Math.max(opeartor_node.scrollHeight, opeartor_node.clientHeight);
  // var page_height = document.body.scrollHeight+document.body.scrollTop;
  // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  if (+defaultSettings.watermark_cols === 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
    defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
    defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
  }
  // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  if (+defaultSettings.watermark_rows === 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
    defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
    defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
  }
  var x;
  var y;
  for (var i = 0; i < defaultSettings.watermark_rows; i++) {
    y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
    for (var j = 0; j < defaultSettings.watermark_cols; j++) {
      x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

      var mask_div = document.createElement('div');
      mask_div.id = 'mask_div' + i + j;
      mask_div.className = 'mask_div';
      mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
      // 设置水印div倾斜显示
      mask_div.style.webkitTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
      mask_div.style.MozTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
      mask_div.style.msTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
      mask_div.style.OTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
      mask_div.style.transform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
      mask_div.style.visibility = '';
      mask_div.style.position = defaultSettings.watermark_position;
      mask_div.style.left = x + 'px';
      mask_div.style.top = y + 'px';
      mask_div.style.overflow = 'hidden';
      mask_div.style.zIndex = defaultSettings.watermark_position;
      mask_div.style.pointerEvents = 'none'; // pointer-events:none  让水印不遮挡页面的点击事件
      // mask_div.style.border="solid #eee 1px";
      mask_div.style.opacity = defaultSettings.watermark_alpha;
      mask_div.style.fontSize = defaultSettings.watermark_fontsize;
      mask_div.style.fontFamily = defaultSettings.watermark_font;
      mask_div.style.color = defaultSettings.watermark_color;
      mask_div.style.textAlign = 'center';
      mask_div.style.width = defaultSettings.watermark_width + 'px';
      mask_div.style.height = defaultSettings.watermark_height + 'px';
      mask_div.style.display = 'block';
      oTemp.appendChild(mask_div);
    }
  }
  // 删除旧的水印
  const old_oTemp = document.querySelectorAll('.mask_div');
  if (old_oTemp && old_oTemp.length > 0) {
    old_oTemp.forEach(node => node.parentNode ? node.parentNode.removeChild(node) : null);
  }
  opeartor_node.appendChild(oTemp);
}

/**
 * [dealAmount 金额数字格式化实现代码（三位加逗号处理保留两位小数）]
 * @param  {[type]} amount [金额，单位分]
 * @param  {[type]} point_default [小数部分默认 '00']
 * @return {[type]}        [description]
 */
export function dealAmount(amount, point_default = '00') {
  const str_num = amount ? String(amount) : '0';

  const str_num_arr = str_num.split('.');
  const integer_num = str_num_arr[0] && +str_num_arr[0] !== 0 ? str_num_arr[0] : '0'; // 整数部分
  const point_num = str_num_arr[1] ? str_num_arr[1] : point_default; // 小数部分

  let str_amount = '';
  if (integer_num.length <= 3) {
    str_amount = integer_num === '' ? '0' : integer_num;
  } else {
    const mod = integer_num.length % 3;
    str_amount = (mod === 0 ? '' : (integer_num.substring(0, mod))); // 从0位置取出除3后多余的位数字符
    for (let i = 0; i < Math.floor(integer_num.length / 3); i++) {
      if ((mod === 0) && (i === 0)) {
        str_amount += integer_num.substring(mod + 3 * i, mod + 3 * i + 3);
      } else {
        str_amount += ',' + integer_num.substring(mod + 3 * i, mod + 3 * i + 3);
      }
    }
  }

  str_amount = str_amount + '.' + point_num;

  return str_amount;
}

/**
 * [ellipsisStr 对字符串进行规定长度的省略，超出的部分显示为省略号]
 * @param  {[type]} str [字符串]
 * @param  {[type]} len [规定长度]
 * @return {[type]}     [description]
 */
export function ellipsisStr(str, len = 100) {
  if (typeof str !== 'string') {
    return str;
  }
  len = parseInt(len);
  if (!isNaN(len) && len > 0) {
    str = str.length > len ? (str.substr(0, len) + '...') : str;
  }
  return str;
}

/**
 * [showInvalidFieldMsg 解析el-form校验未通过的字段信息]
 * @param  {[type]} object    未通过校验的字段
 * @param  {[type]} maxLength 提示内容的最大个数，默认 -1无限制
 * @return {[type]}        [description]
 */
export function showInvalidFieldMsg(object, maxLength = -1) {
  // 遍历未通过校验的字段
  const new_vue = new Vue(); // 新实例化vue
  const p = new_vue.$createElement;
  const arr_result = [];
  let index = 0;
  for (const key in object) {
    if (maxLength > 0 && index >= maxLength) {
      break;
    }
    index++;
    const value = object[key];
    if (Array.isArray(value)) {
      value.forEach(item => {
        arr_result.push(p('div', { style: 'color: #eb9e05' }, item.message));
      });
    }
  }
  Message({
    type: 'warning',
    message: p('p', null, arr_result),
  });
}

/**
 * @description: 替换空值
 * @param {type} value    传入的值
 * @param {type} replacer 被替换的值，默认'-'
 * @return:
 */
export function replaceEmpty(value, replacer = '-') {
  if (value === '' || value === undefined || value === null) {
    value = replacer;
  }
  return value;
}

/**
 * @description: 遍历对象的key将value替换为空值（null/undefined）
 * @param {type} obj      传入的对象
 * @param {type} replacer 被替换的值，默认'-'
 * @return:
 */
export function replaceEmptyForObject(obj, replacer = '-') {
  if (!(obj instanceof Object)) {
    return obj;
  }
  Object.keys(obj).forEach(key => {
    obj[key] = replaceEmpty(obj[key], replacer);
  });
  return obj;
}

/**
 * 规范显示银行卡号
 * @param {*} account [传入的值]
 */
export function parseBankNumber(account) {
  if (account && /\S{5}/.test(account)) {
    account = account.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
  }
  return account;
}

/**
 * @description: 从对象数组中取出ids数组
 * @param {type} arr 数组
 * @param {type} key 对象指向id的key，默认 id
 * @return:
 */
export function getIdsFromArray(arr, key = 'id') {
  return Array.isArray(arr) && arr.length > 0 ? arr.map(item => item[key]) : [];
}

/**
 * @description: 数组转为对象
 * @param {string} valueKey value键名，默认 value
 * @param {string} labelKey label键名，默认 label
 * @return {*}
 */
export function parseArrayToObject(arr = [], valueKey = 'value', labelKey = 'label') {
  if (!Array.isArray(arr) || arr.length === 0) {
    return {};
  }
  return arr.reduce((result, item) => {
    result[item[valueKey]] = item[labelKey];
    return result;
  }, {});
}

/**
 * @description: 对数组数据以符号分隔显示为字符串
 * @param {type} data      json数组数据，如 data = ['张三', '李四']
 * @param {type} separator 用于分割的符号，如 separator = '、'
 * @return:
 */
export function parseArrayToString(data = [], separator = '、') {
  return Array.isArray(data) ? data.join(separator) : '';
}

/**
 * @description: 对json数组数据以符号分隔显示为字符串
 * @param {type} data      json数组数据，如 data = [{ id: 1, name: '张三' }]
 * @param {type} key       提取的键值，如 key = 'name'
 * @param {type} separator 用于分割的符号，如 separator = '、'
 * @return:
 */
export function parseArrayJsonToString(data = [], key = 'name', separator = '、') {
  let result = '';
  if (data && Array.isArray(data)) {
    result = data.map(item => item[key]).join(separator);
  }
  return result;
}

/**
 * @description: 判断浏览器是否处于缩放状态
 * @param {type}
 * @return: 打印 100 是默认缩放级别，大于 100 是放大，小于 100 是缩小。
 */
export function getDetectZoom() {
  let ratio = 0;
  const screen = window.screen;
  const ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }

  return ratio;
}

// 转浮点
export function float(data) {
  return parseFloat(data) || 0;
}

/**
 * @description: 对数字的n位小数位四舍五入/向上取整/向下取整
 * @param {type} num          数字
 * @param {type} decimalDigit 小数位数，默认2位
 * @param {type} decimalDigit 取数方法：round 四舍五入/ceil 向上取整/floor 向下取整
 * @return:
 */
export function parseNumberByRound(num, decimalDigit = 2, operation = 'round') {
  if (!['round', 'ceil', 'floor'].includes(operation) || !Math.hasOwnProperty(operation)) {
    throw new Error('请传入正确的取数方法');
  }
  num = parseFloat(num) || 0;
  const pow = Math.pow(10, decimalDigit); // 10的n次，用于num取整
  const result = ((Math[operation](num * pow)) / pow).toFixed(decimalDigit);
  return parseFloat(result);
}

/**
 * @description: 传入时间段，获取开始、结束时间
 * @param {type} parent     父属性名
 * @param {type} param_date 父属性名内的时间段字段名
 * @param {type} param_from 父属性名内的开始时间字段名
 * @param {type} param_to   父属性名内的结束时间字段名
 * @param {type} callback   回调函数
 * @return:
 */
export function changeDate(parent, param_date, param_from, param_to, callback, format = 'YYYY-MM-DD') {
  !parent[param_date] && (parent[param_date] = []);
  parent[param_from] = filterTime(parent[param_date][0], format);
  parent[param_to] = filterTime(parent[param_date][1], format);
  if (callback && typeof callback === 'function') {
    callback();
  }
}

/**
 * @description: 获取元素距离浏览器顶部、左侧的距离
 * @param {type} node     元素节点
 * @param {type} lastNode 最终元素节点，不传则默认递归到根元素
 * @return:
 */
export function getNodeOffsetToBrowser(node, lastNode = null) {
  if (!node) {
    return 0;
  }
  let top = node.offsetTop; // 获取该元素相对父容器的上边距
  let left = node.offsetLeft; // 获取该元素相对父容器的左边距
  while (node.offsetParent && node.offsetParent !== lastNode) {
    node = node.offsetParent;
    top += node.offsetTop; // 叠加父容器的上边距
    left += node.offsetLeft; // 叠加父容器的左边距
  }
  return { top, left };
}

/**
 * @description: 获取元素占满视图（指定参考系视图，默认为 #body）的高度
 * @param {type} targetNode    设置的目标元素，如 设置 el-table 的高度为可视高度，document.querySelector('.data-items')
 * @param {type} referenceNode 可视区的参考系元素，如 可视区为body，则该元素为body，目标元素的高度 = body的高度
 * @param {type} extraHeight   额外需要裁剪的高度，默认10px，比如说margin占有的高度
 * @return {type}
 */
export function getFillscreenHeight({
  targetNode = document.querySelector('.data-items'),
  referenceNode = document.getElementById('body'),
  extraHeight = 10, // 额外需要减去的高度，比如说margin占有的高度
} = {}) {
  if (!targetNode) {
    return false;
  }
  // 页面的高度
  const documentHeight = document.body.clientHeight;
  // body元素距离浏览器顶部的距离
  const { top: bodyOffsetTop } = getNodeOffsetToBrowser(referenceNode);
  // 页面的高度 - body元素距离浏览器顶部的距离 = table高度 + 需要裁剪的高度
  return documentHeight - bodyOffsetTop - extraHeight;
}

/**
 * @description: 根据body（可视区的参考系元素）距离浏览器顶部的距离，设置table（目标元素）的高度
 * 目的是为了table的元素在页面缩放的时候，高度动态适应body的可视区域
 * @param {type} targetNode        设置的目标元素，如 设置 el-table 的高度为可视高度，document.querySelector('.data-items')
 * @param {type} fillScreenBoxNode 父级元素：如果其他相邻元素要和目标元素一起显示在可视区内，那么 fillScreenBoxNode 则为这些元素的父级元素（此时必传，否则无法包容其他元素），且元素之间无margin
 * @param {type} referenceNode     可视区的参考系元素，如 可视区为body，则该元素为body，目标元素的高度 = body的高度
 * @param {type} tailoringHeight   额外需要裁剪的高度，默认10px
 * 需要裁剪的高度
 * @return:
 */
export function setNodeHeightByReferenceNode({
  targetNode = document.querySelector('.data-items'),
  fillScreenBoxNode = document.querySelector('.fill-screen-box'),
  referenceNode = document.getElementById('body'),
  tailoringHeight = 10,
} = {}) {
  if (!targetNode) {
    return false;
  }
  // 页面的高度
  const documentHeight = document.body.clientHeight;
  // body元素距离浏览器顶部的距离
  const { top: bodyOffsetTop } = getNodeOffsetToBrowser(referenceNode);
  // 获取需要和table占满屏幕的元素的高度和
  let fillScreenHeight = 0;
  if (fillScreenBoxNode && fillScreenBoxNode.children && fillScreenBoxNode.children.length > 0) {
    let targetNodeIsInBoxNode = false; // 目标元素是否在父级元素内，如果不在，则 不设置 fillScreenHeight
    for (const node of fillScreenBoxNode.children) {
      if (node === targetNode) {
        targetNodeIsInBoxNode = true;
      } else { // 累加父级元素除了目标元素的子元素的高度
        fillScreenHeight += +node.clientHeight;
      }
    }
    if (!targetNodeIsInBoxNode) {
      fillScreenHeight = 0;
    }
  }
  // 页面的高度 - body元素距离浏览器顶部的距离 = table高度 + 要和table占满屏幕的元素的高度和 + 需要裁剪的高度
  const calculateHeight = documentHeight - bodyOffsetTop - fillScreenHeight - tailoringHeight;
  // 设置 目标元素 的高度
  targetNode.style.height = `${calculateHeight}px`;
}

/**
 * @description: 总和100（total），根据数组前几个key，计算指定key的值（因为对象无法按照预期的顺序进行遍历），并返回填补后的对象
 * @param {type} total    必填，总值，整数，默认100
 * @param {type} obj      必填，对象，至少2个key， { num1: 10, num2: 20, num3: null }，其中 num3 是需要计算的key
 * @param {type} last_key 选填，指定key
 * @return: calculationLastValue({ num1: 10, num2: 20, num3: null })
 * 已知对象 { num1: 10, num2: 20, num3: null }，计算num3，将返回：
 * { num1: 10, num2: 20, num3: 70 }
 */
export function calculationLastValue(obj, last_key = null, total = 100) {
  if (!/^\d*$/.test(total)) { // total整数
    return false;
  }
  if (!(obj instanceof Object) || Object.keys(obj).length < 2) { // arr数组，至少2个长度
    return false;
  }
  if (last_key && obj.hasOwnProperty(last_key)) { // last_key存在，从数组中剔除，防止后续计算将其算入
    Reflect.deleteProperty(obj, last_key);
  } else { // last_key为空，则last_key默认为数组的最后一个键
    for (const key in obj) {
      last_key = key;
    }
    Reflect.deleteProperty(obj, last_key);
  }

  // 如果有值，则累加1，如果大于-1说明填写了值，进行赋值；如果其他key未填写，则赋值null
  let has_data_index = -1;
  let last_value = total;
  for (const key in obj) {
    const item = obj[key];
    if (has_data_index === -1 && item) {
      has_data_index++;
    }
    last_value -= parseFloat(item) || 0;
  }

  // 如果计算出的最后一个值在0-100（total）范围内，赋值给最后一个值
  if (has_data_index > -1 && last_value >= 0 && last_value <= total) {
    obj[last_key] = last_value;
  } else {
    obj[last_key] = null;
  }
  return obj;
}

/**
 * @description: 富文本会在内容末添加一段广告html，通过下面的函数清除广告html，并返回清除后的html内容
 * @param {type} html 富文本编辑器编辑后，保存表单前将html内容传入 clearFroalaEditorAdHtml
 * @return:
 */
export function clearFroalaEditorAdHtml(html) {
  var obj = document.createElement('div');
  obj.innerHTML = html;
  const adNode = obj.querySelector('[data-f-id="pbf"]');
  adNode && adNode.remove();
  return obj.innerHTML || '';
}

/**
 * @description: 递归遍历对象 ——过滤对象中为 null undefined '' 的属性值
 * @param {type} obj 递归遍历对象
 * @param {type} del_empty_object 是否删除空对象 [] {}，默认不删除
 * @return:
 */
export function clearDeep(obj, del_empty_object = false) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const keys = Object.keys(obj);
  for (var key of keys) {
    const val = obj[key];
    // 如属性值为null或undefined或''，则将该属性删除
    if (
      typeof val === 'undefined' ||
      ((typeof val === 'object' || typeof val === 'string') && !val)
    ) {
      Reflect.deleteProperty(obj, key);
    } else if (typeof val === 'object') {
      // 属性值为对象，递归调用
      clearDeep(obj[key]);

      // 如某属性的值为不包含任何属性的独享，则将该属性删除，即 如果是空数组或空对象，删除该属性
      if (del_empty_object && Object.keys(obj[key]).length === 0) {
        Reflect.deleteProperty(obj, key);
      }
    }
  }
  return obj;
}

/**
 * @description: 下载文件
 * @param {type} name 文件名
 * @param {type} url 文件路径
 * @param {type} preview 是否预览：true 预览，false 直接下载
 * @param {type} downloadUrl 文件下载路径
 * @param {type} anyFileExt 是否任何文件都可以被预览，默认true（主要是针对没有文件名的七牛图片）
 * 如果预览文件类型可能有多种情况（可能是 jpg 可能是 excel），需求传入 name 并且设置 anyFileExt = false，根据文件后缀判断文件类型能否被预览
 * @return:
 */
export function downloadFile({ name, url, preview = false, downloadUrl, anyFileExt = true }) {
  // 可预览的文件后缀
  const fileExt = [
    '.png', '.jpg', '.jpeg', '.bmp', '.gif',
    '.txt', '.html',
    '.pdf',
  ];
  let isDownload = true;
  // 如果选择预览，通过文件名后缀判断能否预览，不能预览则进行下载
  if (preview && (anyFileExt || stringExtMatch(name, fileExt))) {
    // console.log('准备预览', url);
    isDownload = false;
  } else {
    // console.log('准备下载', downloadUrl);
    isDownload = true;
  }
  const href = isDownload ? (downloadUrl || url) : url;

  const link = document.createElement('a');
  link.setAttribute('href', href);
  link.setAttribute('download', name);
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  link.remove();

  // 获取文件名后缀名
  function stringExtension(str) {
    let ext = null;
    const name = str.toLowerCase();
    const i = name.lastIndexOf('.');
    if (i > -1) {
      ext = name.substring(i);
    }
    // console.log(ext)
    return ext;
  }
  // 判断类型Array中是否包含某个值（文件后缀）
  function arrayContain(arr, str) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === str) {
        return true;
      }
    }
    return false;
  }
  // 判断文件名的后缀是否存在于传入的文件类型数组中
  function stringExtMatch(str, extType) {
    if (arrayContain(extType, stringExtension(str))) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * @description: 对象数组合并，并去重
 * @param {type} arr1 数组1
 * @param {type} arr2 数组2
 * @param {type} key  去重的唯一key值，默认 id
 * @return:
 */
export function concatJsonArray(arr1, arr2, key = 'id') {
  const hash = {};
  return arr1.concat(arr2).reduce((acc, cur) => {
    const value = cur[key];
    if (value && !hash[value]) {
      hash[value] = true;
      acc.push(cur);
    }
    return acc;
  }, []);
}

/**
 * @description: 将秒转换成几天几小时几分几秒
 * @param {Number} second      传入的时长，单位秒 580320
 * @param {Array} unitArr     显示的时间单位数组 ['day', 'hour', 'minute']
 * @param {Boolean} is_complete 是否显示完整时长（为0也显示） true
 * @return: 6天17小时12分钟
 */
export function getDuration(second, unitArr = ['day', 'hour', 'minute', 'second'], is_complete = true) {
  if (!second || second < 0 || !Array.isArray(unitArr) || unitArr.length === 0) {
    return '';
  }

  // 是否显示改时间段：有值显示；无值且 is_complete = true 时显示
  function isShow(num) {
    return num > 0 || (num === 0 && is_complete);
  }

  return unitArr.reduce((result, unit) => {
    let tempDur = '';
    switch (unit) {
      case 'day': {
        const num = Math.floor(second / 86400);
        if (isShow(num)) {
          tempDur = num + '天';
        }
        break;
      }
      case 'hour': {
        const num = Math.floor((second % 86400) / 3600);
        if (isShow(num)) {
          tempDur = num + '小时';
        }
        break;
      }
      case 'minute': {
        const num = Math.floor(((second % 86400) % 3600) / 60);
        if (isShow(num)) {
          tempDur = num + '分钟';
        }
        break;
      }
      case 'second': {
        const num = Math.floor(((second % 86400) % 3600) % 60);
        if (isShow(num)) {
          tempDur = num + '秒';
        }
        break;
      }
      default:
        break;
    }
    result += tempDur;
    return result;
  }, '');
}
/**
 * @description: 根据id匹配下拉项获取中文name
 * @param {type} value 下拉选项的id值
 * @param {type} data  下拉选项数据集合（数组）
 * @param {type} valueKey 下拉选项的键名中文名
 * @param {type} labelKey 下拉选项的中文名
 * @return:
 */
export function getSelectionName(value, data = [], valueKey = 'id', labelKey = 'display_name') {
  if (!Array.isArray(data) || data.length === 0) {
    return '';
  }
  let result = '';
  const item = data.find(item => item[valueKey] === value);
  if (item) {
    result = item[labelKey];
  }
  return result;
}

/**
 * @description: 计算起止时间相隔月数/天数
 * @param {type} startDate 开始时间 2012-5-10
 * @param {type} endDate 结束时间 2012-5-12
 * @return:
 */
export function handleDiffDays(startDate, endDate) {
  const flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
  const start = new Date(startDate);
  const end = new Date(endDate);
  let year = end.getFullYear() - start.getFullYear();
  let month = end.getMonth() - start.getMonth();
  let day = end.getDate() - start.getDate() + 1;
  if (month < 0) {
    year--;
    month = end.getMonth() + (12 - start.getMonth());
  }
  if (day < 0) {
    month--;
    const index = flag.findIndex((temp) => {
      return temp === start.getMonth() + 1;
    });
    let monthLength;
    if (index <= 6) {
      monthLength = 31;
    } else if (index > 6 && index <= 10) {
      monthLength = 30;
    } else {
      monthLength = 28;
    }
    day = end.getDate() + (monthLength - start.getDate()) + 1;
  }
  let result = '';
  if (12 * year + month === 0) {
    result = `${day}天`;
  } else {
    if (day === 0) {
      result = `${12 * year + month}个月`;
    } else {
      result = `${12 * year + month}个月${day}天`;
    }
  }
  return result;
}

// 判断值是否为数字
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * [深拷贝对象或者数组]
 * @param  {any} obj
 */
export function deepCopy(value) {
  if (Array.isArray(value)) {
    return value.map(deepCopy);
  } else if (value && typeof value === 'object') {
    const res = {};
    for (const key in value) {
      res[key] = deepCopy(value[key]);
    }
    return res;
  } else {
    return value;
  }
}

/**
 * [isDef 是否有定义内容 非null/undefined]
 */
export function isDef(value) {
  return value !== undefined && value !== null;
}

// 判断值不为空
export function isNotEmpty(value) {
  return value !== '' && value !== null && value !== undefined;
}

/**
 * [contrast 用来处理详情返回参数输出]
 * @param  {[type]} data [数据]
 * @param  {[type]} key [数据内的指针]
 * @param  {[type]} defaultReturn [默认的返回值]
 * @return {[type]} defaultValue [description]
 */
export function contrast(data, key, defaultValue = null) {
  if (!data) {
    return defaultValue;
  }
  const keys = key.split('.');
  if (keys.length > 1) { // 多键值对，比如 user.name
    let result = null;
    for (let i = 0; i < keys.length; i++) {
      if (i) {
        result = result[keys[i]];
      } else {
        result = data[keys[i]];
      }
      if (!isDef(result)) {
        result = defaultValue;
        break;
      }
    }
    return deepCopy(result);
  } else { // 一级键值对
    return isDef(data[key]) ? deepCopy(data[key]) : defaultValue;
  }
}

/**
 * [日期相关函数方法]
 */
// 计算记忆  减少重复计算   毫秒
// ps:   dateFns.year,dateFns.day
const timeTypes = [
  { value: 'year', unit: '年' },
  { value: 'day', unit: '天' },
  { value: 'hour', unit: '时' },
  { value: 'minute', unit: '分' },
  { value: 'second', unit: '秒' },
];
function DateFn() {
  this.second = 1000;
  this.minute = this.second * 60;
  this.hour = this.minute * 60;
  this.day = this.hour * 24;
  this.year = this.day * 365;
}
// 获取  '01' 格式的日期
// ps:   dateFns.doubleDigit(8)=>'08'
// n: string | number
DateFn.prototype.doubleDigit = function(n) {
  // @ts-ignore
  const r = parseInt(n);
  if (r > 9) {
    return r;
  } else {
    return '0' + r;
  }
};
// 日期转换
// ps:   dateFns.changeTime(n,'/')=> 2019/09/03 23:59:59
// ps:   dateFns.changeTime(n,null,true)=> 2019-09-03
// t: any
// divider?: string
// nohour?: boolean
DateFn.prototype.changeTime = function(t, divider, nohour) {
  const d = divider || '-'; // 默认分隔符
  if (t) {
    const date = new Date(t);
    const Y = date.getFullYear() + d;
    const M = dateFns.doubleDigit(date.getMonth() + 1) + d;
    const D = dateFns.doubleDigit(date.getDate());
    const h = dateFns.doubleDigit(date.getHours()) + ':';
    const m = dateFns.doubleDigit(date.getMinutes()) + ':';
    const s = dateFns.doubleDigit(date.getSeconds());
    return nohour ? Y + M + D : Y + M + D + ' ' + h + m + s;
  } else {
    return '';
  }
};
DateFn.prototype.durationStr = function(t) {
  let res = '';
  timeTypes.forEach(item => {
    if (t >= this[item.value]) {
      // @ts-ignore
      res += (parseInt(t / this[item.value]) + item.unit);
      t %= this[item.value];
    }
  });
  return res;
};
export const dateFns = new DateFn();

/**
 * 日期时间增加天数
 * @param {[type]} date 日期格式：2017-01-01
 * @param {Number} days 增加天数，默认1天
 */
export function addDays(date, days = 0) {
  date = new Date(date);
  date.setDate(date.getDate() + days);
  return dateFns.changeTime(date, null, true);
}

// 判断当前浏览器是否IE9
export function isIE9() {
  return navigator.appName === 'Microsoft Internet Explorer' && navigator.appVersion.split(';')[1].replace(/[ ]/g, '') === 'MSIE9.0';
}

/**
 * 对一个字符串转成驼峰格式，如 user_name -> userName
 */
export function toCamelCase(target = '') {
  return target.replace(/_([a-z]|[0-9])/ig, (word, letter) => `${letter}`.toUpperCase());
}

/**
 * 对一个字符串反驼峰，如 userName -> user_name
 */
export function toSnakeCase(target = '') {
  return target.replace(/[A-Z]/g, (letter, index) => `${index ? '_' : ''}${letter}`.toLowerCase());
}

// 处理返回有内容的字段（并去除内容前后空格）
export function parseDefParams(value) {
  if (Array.isArray(value)) {
    return value.map(parseDefParams);
  } else if (value && typeof value === 'object') {
    const res = {};
    for (const key in value) {
      const curValue = parseDefParams(value[key]);
      if (curValue !== null && curValue !== undefined && curValue !== '') {
        res[key] = curValue;
      }
    }
    return res;
  } else {
    return typeof value === 'string' ? value.trim() : value;
  }
}

/**
 * [是否是对象]
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * @description: 创建消息提示去重函数，即 重复的消息文案只显示一次（通过闭包缓存变量/封装私有变量，防止 messageSet 被污染）
 * @param {*}
 * @return {*}
    const fn = createNoRepeatMessageFunction();
    fn('message', 'error');
    fn('message');
    fn('message');
  // message 只出现一次
 *
 */
export function createNoRepeatMessageFunction() {
  const messageSet = new Set();

  return function(message, type = 'warning') {
    if (messageSet.has(message)) {
      return;
    }
    // 如果消息池中没有重复消息，添加并在消息关闭后删除
    messageSet.add(message);
    Message({
      type,
      message,
      onClose: () => {
        messageSet.delete(message);
      },
    });
  };
}

/**
* @description: 从对象数组中寻找相同值的项
* @param {*} arr 对象数组
* @param {*} value 值
* @param {*} valueKey 值键名
* @return {*}
*/
export function findItemInArray(arr, value, valueKey = 'value') {
  if (!Array.isArray(arr) || !valueKey || !value) {
    return null;
  }
  return arr.find(item => item[valueKey] === value);
}

/**
* @description: 从对象数组中寻找相同值的项的label
* @param {*} arr 对象数组
* @param {*} value 值
* @param {*} valueKey 值键名
* @param {*} labelKey 名称键名
* @return {*}
*/
export function findItemLabelInArray(arr, value, valueKey = 'value', labelKey = 'label') {
  if (!Array.isArray(arr) || !valueKey || !isNotEmpty(value)) {
    return null;
  }
  const item = arr.find(item => item[valueKey] === value);
  return item ? item[labelKey] : null;
}

/**
 * @description: 获取开始结束日期之间的所有日期（包括开始、结束）
 * @param {*} stime 开始日期时间戳
 * @param {*} etime 结束日期时间戳
 * @param {*} toDate 输出结果是否转换为日期（年-月-日）
 * @return {*}
 */
export function getSectionDate(stime, etime, toDate = false) {
  if (!stime || !etime) {
    return [];
  }
  // 初始化日期列表，数组
  var section = [];
  // 开始日期小于等于结束日期,并循环
  while (stime <= etime) {
    section.push(toDate ? dateFns.changeTime(stime, null, true) : stime);
    // 增加一天时间戳后的日期
    stime = stime + (24 * 60 * 60 * 1000);
  }
  return section;
}

/**
 * 将首字母大写
 * Capitalize a string.
 * 来自 vue
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// iframe 跨域获取父页面的 URL
export function getIframeParentUrl() {
  let url = null;
  if (parent !== window) {
    try {
      url = parent.location.href;
    } catch {
      url = (document.referrer || '').replace(/\/?$/, '');
    }
  }
  return url;
}

/**
 * @description: 跳转到 LCN
 * @param {number} href 链接
 * @return {*}
 *
  import { linkToLcn } from 'src/plugins/tools.js'
 */
export function linkToLcn(href) {
  const url = process.env.LCN_DEMAND_URL;
  if (href) {
    window.open(url + href);
  } else {
    window.open(url);
  }
}

/**
 * @description: 深度优先递归查询数组第一个叶子节点项
 * @param {*} items 对象数组
 * @param {*} childrenKey children 键名
 * @return {*}
 * arr = [
    {
      id: 1,
      children: [
        {
          id: 11,
          children: [
            {
              id: 111,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 2,
      children: []
    }
  ]

  dfsFirstLeafItem(arr); // { id: 111, children: [] }
 */
export const dfsFirstLeafItem = (items, childrenKey = 'children') => {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return dfsFirstLeafItem(items[0][childrenKey]) || items[0];
};

/**
 * @description: 深度优先递归查询包含 value 的第一级数组项
 * @param {*} items 对象数组
 * @param {*} value 查找的值
 * @param {*} valueKey value 键名
 * @param {*} childrenKey children 键名
 * @return {*}
 * arr = [
    {
      value: 1,
      children: [
        {
          value: 2,
          children: [
            {
              value: 111,
              children: []
            }
          ]
        },
        {
          value: 12,
          children: []
        }
      ]
    },
    {
      value: 2,
      children: []
    },
    {
      value: 3,
      children: [
        {
          value: 33,
          children: []
        }
      ]
    }
  ]

  dfsContainValue(arr, 2); // { value: 1, ... }
 */
export const dfsContainValue = (items, value, valueKey = 'value', childrenKey = 'children') => {
  if (!isNotEmpty(value)) {
    return false;
  }
  if (!Array.isArray(items) || !items.length) {
    return null;
  }
  const item = items.find(item => item[valueKey] === value || dfsContainValue(item[childrenKey], value, valueKey, childrenKey));
  return item;
};

// 判断浏览区是否支持canvas
export function isSupportCanvas() {
  const elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

/**
 * [处理小数的加减乘除]
 * @param  {Number|String} num1 数字1
 * @param  {Number|String} num2 数字2
 * @param  {Number} type 类型：1-减，2-加，3-乘，4-除
 * @param  {Number} digits 小数点后位数
 * @return  {Number|String} 计算后的值
 * @example
 * floorKeep(0.3, 0.01, 1); // 0.29
 * floorKeep(0.3, 0.01, 2); // 0.31
 * floorKeep(0.3, 2, 3); // 0.6
 * floorKeep(0.3, 2, 4); // 0.15
 */
export function floorKeep(num1, num2, type, digits) {
  num1 = +num1;
  num2 = +num2;
  if (isNaN(num1)) {
    num1 = 0;
  }
  if (isNaN(num2)) {
    num2 = 0;
  }
  const c1 = num1 + '';
  const c2 = num2 + '';
  let c = c1;
  if (c1.length > 0 || c2.length > 0) {
    if (c1.length >= c2.length) {
      c = c1;
    } else {
      c = c2;
    }
  }
  c = Math.pow(10, c.length + 1);
  digits = (isNotEmpty(digits) ? digits * 1 : 3);
  let r = 0;
  const n1 = Math.round(num1 * c);
  const n2 = Math.round(num2 * c);
  if (type === 1) { // 减
    r = (n1 - n2) / c;
  } else if (type === 2) { // 加
    r = (n1 + n2) / c;
  } else if (type === 3) { // 乘
    r = (n1 * n2) / c / c;
  } else if (type === 4) { // 除
    r = n1 / n2;
  }
  if ((r + '').indexOf('.') > -1 && (r + '').split('.')[1].length > digits) {
    r = r.toFixed(digits);
  }
  return r;
}
/**
 * 多数值累加
 * @param  {Array<Number|String>} arr 累加值数组
 * @return  {Number} 计算后的值
 * @example
 * accumulation([1, 2, 3]); // 6
 * accumulation([1.1, 2.2, 3.3]); // 6.6
 */
export function accumulation(arr) {
  if (!Array.isArray(arr)) {
    return;
  }
  let result = arr[0] || 0;
  for (let i = 1; i < arr.length; i++) {
    result = floorKeep(result, arr[i], 2);
  }
  return result;
}
