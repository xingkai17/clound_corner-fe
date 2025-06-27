import mpx from '@mpxjs/core';
import UserInfo from '../models/UserInfo';
import API from '../utils/api';
import { showToast } from '../utils/toast';
import { getStorage, setStorage } from '../utils/cache';

class UserCTL {
  constructor() {
    this.userInfo = new UserInfo();
    this.isLoading = false;
  }

  // 获取用户信息
  async getUserInfo() {
    try {
      this.isLoading = true;
      const token = getStorage('token');

      if (!token) {
        return null;
      }

      const response = await API.getUserInfo();

      if (response && response.code === 1) {
        this.userInfo = new UserInfo(response.data);
        this.userInfo.saveToStorage();
        return this.userInfo;
      } else {
        showToast(response?.message || '获取用户信息失败');
        return null;
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      showToast('获取用户信息失败');
      return null;
    } finally {
      this.isLoading = false;
    }
  }

  // 更新用户信息
  async updateUserInfo(userData) {
    try {
      this.isLoading = true;
      const response = await API.updateUserInfo(userData);

      if (response && response.code === 1) {
        this.userInfo = new UserInfo(response.data);
        this.userInfo.saveToStorage();
        return this.userInfo;
      } else {
        showToast(response?.message || '更新用户信息失败');
        return null;
      }
    } catch (error) {
      console.error('更新用户信息失败:', error);
      showToast('更新用户信息失败');
      return null;
    } finally {
      this.isLoading = false;
    }
  }

  // 用户登录
  async login(loginData) {
    try {
      this.isLoading = true;
      const response = await API.login(loginData);

      if (response && response.code === 1) {
        // 保存 token
        setStorage('token', response.data.token);

        // 获取用户信息
        await this.getUserInfo();

        return response.data;
      } else {
        showToast(response?.message || '登录失败');
        return null;
      }
    } catch (error) {
      console.error('登录失败:', error);
      showToast('登录失败');
      return null;
    } finally {
      this.isLoading = false;
    }
  }

  // 用户登出
  logout() {
    setStorage('token', '');
    setStorage('userInfo', '');
    this.userInfo = new UserInfo();
    showToast('已退出登录');
  }

  // 检查登录状态
  isLoggedIn() {
    const token = getStorage('token');
    return !!token;
  }

  // 获取当前用户信息
  getCurrentUser() {
    if (!this.userInfo.id) {
      this.userInfo.loadFromStorage();
    }
    return this.userInfo;
  }

  // 微信登录
  async wxLogin() {
    return new Promise((resolve, reject) => {
      mpx.login({
        success: (res) => {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(new Error('微信登录失败'));
          }
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }

  // 获取手机号
  async getPhoneNumber(univerifyInfo) {
    try {
      const response = await mpx.request({
        url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login',
        method: 'POST',
        data: univerifyInfo,
      });

      if (response.data.success) {
        return response.data.phoneNumber;
      } else {
        throw new Error(response.data.message || '获取手机号失败');
      }
    } catch (error) {
      console.error('获取手机号失败:', error);
      throw error;
    }
  }
}

export default new UserCTL();
