import mpx from '@mpxjs/core';
import { Config } from './config';
import aegis, { reportEvent, infoAll } from './aegis';
import { removeStorage } from './cache';

// 全局数据
const globalData = {
  aegis: null,
  userInfo: null,
  memberInfo: null,
  test: 'test',
  userId: null,
  isSuccess: '',
  scene: null,
  selUid: '',
  selName: '',
  selAddress: '',
};

// 全局方法
const app = {
  // 获取全局数据
  getGlobalData() {
    return globalData;
  },

  // 设置全局数据
  setGlobalData(key, value) {
    globalData[key] = value;
  },

  // 获取场景值
  getScene() {
    return globalData.scene;
  },

  // 设置场景值
  setScene(scene) {
    globalData.scene = scene;
  },

  // 上报事件
  reportEvent(name, txt, ext1) {
    reportEvent(name, txt, ext1);
  },

  // 信息上报
  infoAll(tittle, txt) {
    infoAll(tittle, txt);
  },

  // 加载字体
  loadFontFace() {
    mpx.loadFontFace({
      family: 'BarlowSemiCondensed-Medium',
      global: true,
      source: `url("${Config.baseURI}fonts/BarlowSemiCondensed-Medium.ttf")`,
      success(res) {
        console.log('字体加载成功', res.status);
      },
      fail(res) {
        console.log('字体加载失败', res);
      },
      complete(res) {
        console.log('字体加载完成', res.status);
      },
    });
  },

  // 检查更新
  checkUpdate() {
    const updateManager = mpx.getUpdateManager();

    updateManager.onCheckForUpdate(function(res) {
      console.log('检查更新结果', res.hasUpdate);
    });

    updateManager.onUpdateReady(function() {
      mpx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });

    updateManager.onUpdateFailed(function() {
      console.log('新版本下载失败');
    });
  },

  // 清理存储
  clearStorage() {
    removeStorage('token');
    removeStorage('didiSelUid');
    removeStorage('SignIn');
  },

  // 初始化
  init() {
    // 初始化 Aegis
    globalData.aegis = aegis;

    // 清理存储
    this.clearStorage();

    // 加载字体
    this.loadFontFace();

    // 检查更新
    this.checkUpdate();
  },
};

export default app;
