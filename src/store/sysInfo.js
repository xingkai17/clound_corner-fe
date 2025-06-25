/*
 * @Description 系统信息
 */
import { defineStore } from 'pinia';
import mpx from '@mpxjs/core';
import { setStorage } from '@/common/utils/cache';

export const useSysInfoStore = defineStore('sysInfo', {
  state: () => ({
    statusBarHeight: 0,
    titleBarHeight: 44,
    bottomSaveAreaHeight: 0,
    customNav: 0,
  }),
  getters: {
    getStatusBarHeight(state) {
      return state.statusBarHeight;
    },
    getTitleBarHeight(state) {
      return state.titleBarHeight;
    },
    getCustomNav(state) {
      return !!state.customNav;
    },
    getBottomSaveAreaHeight(state) {
      return state.bottomSaveAreaHeight;
    },
  },
  actions: {
    updateNavInfo(data) {
      const { statusBarHeight, titleBarHeight, customNav, bottomSaveAreaHeight } = data;
      this.statusBarHeight = statusBarHeight;
      this.titleBarHeight = titleBarHeight;
      this.bottomSaveAreaHeight = bottomSaveAreaHeight;
      this.customNav = customNav;
      setStorage('_sysGlobalInfo', data);
    },
    setSysInfo() {
      try {
        const res = mpx.getSystemInfoSync();
        const { model, safeArea, statusBarHeight, screenHeight } = res;
        let titleBarHeight = 44;
        if (model.indexOf('iPhone') !== -1) {
          titleBarHeight = 44;
        } else {
          titleBarHeight = 48;
        }
        const bottomSaveAreaHeight = screenHeight - safeArea.bottom;
        const customNav = safeArea.top;
        this.updateNavInfo({
          statusBarHeight,
          titleBarHeight,
          customNav,
          bottomSaveAreaHeight,
        });


      } catch (err) {
        console.log(err);
      }
    },
  },
});
