import { defineStore } from 'pinia';
import { getStorage, setStorage } from '@/common/utils/cache';
import { isNotEmptyAny } from '@/common/request/tools';
import mpx from '@mpxjs/core';

export const useUserStore = defineStore('user', {
  state: () => ({
    hasLogin: false,
    openid: null,
    token: null,
    userInfo: {},
    routeParams: null,
    scene: null,
  }),
  getters: {
    getUserInfo(state) {
      return isNotEmptyAny(state.userInfo) ? state.userInfo : {};
    },
    isRegistered(state) {
      const userInfo = isNotEmptyAny(state.userInfo) ? state.userInfo : {};
      return isNotEmptyAny(userInfo) ? userInfo.isRegistered : false;
    },
  },
  actions: {
    updateUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    login({ provider, token } = {}) {
      this.hasLogin = true;
      this.token = token;
    },
    updateFromStorage({ token } = {}) {
      this.hasLogin = !!token;
      this.token = token;
    },
    logout({ needJump = true } = {}) {
      this.hasLogin = false;
      this.openid = null;
      this.token = null;
      this.userInfo = {};
      mpx.setStorageSync('token', '');
      setStorage('refreshIm', true);
    },
    setOpenid(openid) {
      this.openid = openid;
    },
    updateRouteParams(params) {
      this.routeParams = params;
    },
    setUserInfo(userInfo) {
      this.userInfo = { ...userInfo };
    },
    setScene(scene) {
      this.scene = scene;
    },
    async getUserOpenId() {
      if (this.openid) return this.openid;
      return await new Promise((resolve, reject) => {
        mpx.login({
          success: async(data) => {
            this.login();
            setTimeout(() => {
              const openid = '123456789';
              this.setOpenid(openid);
              resolve(openid);
            }, 1000);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    },
    getPhoneNumber(univerifyInfo) {
      return new Promise((resolve, reject) => {
        mpx.request({
          url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login',
          method: 'POST',
          data: univerifyInfo,
          success: (res) => {
            const data = res.data;
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
    async updateUserInfoAction(userInfo) {
      this.updateUserInfo(userInfo);
    },
    async getUserInfoAction() {
      if (getStorage('token')) {
        if (!this.userInfo || !isNotEmptyAny(this.userInfo)) {
          return {};
        } else {
          return this.userInfo || {};
        }
      } else {
        return {};
      }
    },
  },
});
