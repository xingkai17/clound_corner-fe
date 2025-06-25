import { _post } from '../request';
import mpx from '@mpxjs/core';

// 小程序消息订阅模板id
export const templateId = process.env.NODE_ENV === 'production' && ['pe', 'se'].includes(process.env.NODE_TYPE) ? 'QK7_-ZGJAN9tRRQ-oACpO2QeSyDLaUuPQWvS_qBYqTw' : '3Y_FHhk_gk95CJ6R6KwMnybjMpE1SQ14SJhdw5a6Njg';


// 获取是否需要小程序消息订阅
export const getIsNeedToSubscribe = async() => {
  const res = await _post('/api/common/user/subscribeMessage/isNeedToSubscribe', {}, true);
  mpx.setStorageSync('isNeedToSubscribe', res.subscribeToday);
};

// 消息订阅
export const subscribeMessage = async() => {
  return new Promise((resolve) => {
    const isNeedToSubscribe = mpx.getStorageSync('isNeedToSubscribe');
    if (!isNeedToSubscribe) {
      resolve(null);
    } else {
      mpx.requestSubscribeMessage({
        tmplIds: [templateId],
        async success(res) {
          console.log(res);
          await _post('/api/common/user/subscribeMessage/subscribe', { templateIds: [templateId] }, true);
          resolve(null);
        },
        fail(res) {
          console.log(res);
          resolve(null);
        },
      });
    }
  });

};
