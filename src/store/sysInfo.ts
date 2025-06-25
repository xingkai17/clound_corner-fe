/*
 * @Description 系统信息
 */
import { setStorage } from '@/common/utils/cache';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);
export default new Store({
  state: {
    // 自定义导航栏高度及距离顶部的距离
    statusBarHeight: 0,
    titleBarHeight: 44,
    bottomSaveAreaHeight: 0,
    customNav: 0, // 自定义头部导航是否支持
  },
  mutations: {
    updateNavInfo(state, data) {
      const { statusBarHeight, titleBarHeight, customNav, bottomSaveAreaHeight } = data;
      state.statusBarHeight = statusBarHeight;
      state.titleBarHeight = titleBarHeight;
      state.bottomSaveAreaHeight = bottomSaveAreaHeight;
      state.customNav = customNav;
      setStorage('_sysGlobalInfo', data);
    },
  },
  getters: {
    /**
     * 获取状态栏高度
     * @param state
     * @returns
     */
    getStatusBarHeight(state) {
      return state.statusBarHeight;
    },
    /**
     * 获取导航高度
     * @param state
     * @returns
     */
    getTitleBarHeight(state) {
      return state.titleBarHeight;
    },
    /**
     * 是否是自定义导航
     * @param state
     * @returns
     */
    getCustomNav(state) {
      return !!state.customNav;
    },
    /**
     * 获取底部安全距离的高度
     * @param state
     * @returns
     */
    getBottomSaveAreaHeight(state) {
      return state.bottomSaveAreaHeight;
    },
  },
  actions: {
    // 设置系统相关信息
    setSysInfo({ commit }) {
      try {
        const res = wx.getSystemInfoSync();
        const { model, safeArea, statusBarHeight, screenHeight } = res;
        console.log(res);
        let titleBarHeight = 44;
        if (model.indexOf('iPhone') !== -1) {
          titleBarHeight = 44;
        } else {
          titleBarHeight = 48;
        }
        const bottomSaveAreaHeight = screenHeight - safeArea.bottom;
        const customNav = safeArea.top;
        commit('updateNavInfo', {
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

