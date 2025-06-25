import { getStorage, setStorage } from '@/common/utils/cache';
import { isNotEmptyAny } from '@didi/func';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);
// import common from './common';// 公共store

export default new Store({
  state: {
    hasLogin: false,
    openid: null,
    token: null,
    userInfo: {} as any,
    routeParams: null, // 路由参数
    scene: null as number | null, // 新增场景值字段，用于区分不同的场景，例如分享、小程序入口等，默认为 null

  },
  mutations: {

    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    login(state, { provider, token } = {}) {
      state.hasLogin = true;
      state.token = token;
    },
    // 从 storage 中更新数据
    updateFromStorage(state, { token } = {}) {
      state.hasLogin = !!token;
      state.token = token;
    },
    // 退出登录
    logout(state, {
      needJump = true, // 是否需要跳转到首页 （h5 退出登录时调用）
    } = {}) {
      state.hasLogin = false;
      state.openid = null;
      state.token = null;
      state.userInfo = {};
      uni.setStorageSync('token', '');
      setStorage('refreshIm', true);
      uni.removeTabBarBadge({
        index: 1,
        fail() {}, // 解决当前路由不是底部菜单路由白名单下报错问题
      });

    },
    setOpenid(state, openid) {
      state.openid = openid;
    },
    /**
    * 更新路由参数
    */
    updateRouteParams(state, params: any) {
      state.routeParams = params;
    },
    /**
     * 更新用户信息
     */
    setUserInfo(state, userInfo) {
      console.log(userInfo);
      state.userInfo = {
        ...userInfo,
      };
    },
    setScene(state, scene: number) {
      state.scene = scene;
    },
  },
  getters: {
    /**
     * 获取用户信息
     */
    getUserInfo(state) {
      return isNotEmptyAny(state?.userInfo) ? state?.userInfo : {};
    },

    isRegistered(state) {
      const userInfo = isNotEmptyAny(state?.userInfo) ? state?.userInfo : {};
      return isNotEmptyAny(userInfo) ? userInfo.isRegistered : false;
    },
  },
  actions: {

    // lazy loading openid
    getUserOpenId: async function({ commit, state }) {
      return await new Promise((resolve, reject) => {
        if (state.openid) {
          resolve(state.openid);
        } else {
          uni.login({
            success: async(data) => {
              commit('login');
              setTimeout(function() { // 模拟异步请求服务器获取 openid
                const openid = '123456789';
                console.log('uni.request mock openid[' + openid + ']');
                commit('setOpenid', openid);
                resolve(openid);
              }, 1000);
            },
            fail: (err) => {
              console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err);
              reject(err);
            },
          });
        }
      });
    },
    getPhoneNumber: function({ commit }, univerifyInfo) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login',
          method: 'POST',
          data: univerifyInfo,
          success: (res) => {
            const data: any = res.data;
            if (data.success) {
              resolve(data.phoneNumber);
            } else {
              reject(res);
            }

          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    },
    updateUserInfo: async function({ commit }, userInfo) {
      commit('updateUserInfo', userInfo);
    },
    getUserInfo: async function({ commit, state }) {
      if (getStorage('token')) {
        if (!state.userInfo || !isNotEmptyAny(state.userInfo)) {
          return {};
        } else {
          return state.userInfo || {};
        }
      } else {
        return {};
      }
    },

  },
  modules: {
    // common,
  },
});
