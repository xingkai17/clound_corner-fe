import mpx from '@mpxjs/core';

/**
 * toast 提示
 * str： 提示内容
 * time：提示消失时间
 * fn：  回调函数
 */
export const showToast = (str, time, fn) => {
  mpx.showToast({
    title: str,
    icon: 'none',
    duration: time || 1000,
    complete() {
      if (fn) {
        fn();
      }
    },
  });
};

/**
 * toast 成功提示
 * str： 提示内容
 * time：提示消失时间
 * fn：  回调函数
 */
export const showSuccessToast = (str, time, fn) => {
  mpx.showToast({
    title: str || '成功',
    icon: 'success',
    duration: time || 1000,
    complete() {
      if (fn) {
        fn();
      }
    },
  });
};

/**
 * toast 失败提示
 * str： 提示内容
 * time：提示消失时间
 * fn：  回调函数
 */
export const showErrorToast = (str, time, fn) => {
  mpx.showToast({
    title: str || '成功',
    icon: 'error',
    duration: time || 1000,
    complete() {
      if (fn) {
        fn();
      }
    },
  });
};
/**
 * toast 加载中
 * str： 提示内容
 * time：提示消失时间
 * fn：  回调函数
 */
export const showLoading = (str, mask, fn) => {
  mpx.showLoading({
    title: str || '数据加载中',
    mask: mask || true,
    complete() {
      if (fn) {
        fn();
      }
    },
  });
};
/**
 * toast 隐藏加载框
 */
export const hideLoading = () => {
  mpx.hideLoading();
};

/**
 * showModal 显示模态对话框
 * str： 提示内容
 * time：提示消失时间
 * fn：  回调函数
 */
export const showModal = (content, title, fn) => {
  mpx.showModal({
    title: title || '',
    content,
    showCancel: false,
    success(res) {
      if (res.confirm) {
        fn && fn();
      }
    },
  });
};
