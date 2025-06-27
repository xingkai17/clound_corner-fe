import { setStorage, getStorage } from '../utils/cache';

class UserInfo {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.phone = data.phone || '';
    this.avatar = data.avatar || '';
    this.isRegistered = data.isRegistered || false;
    this.memberInfo = data.memberInfo || {};
    this.createTime = data.createTime || Date.now();
    this.updateTime = data.updateTime || Date.now();
  }

  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  setPhone(phone) {
    this.phone = phone;
  }

  setAvatar(avatar) {
    this.avatar = avatar;
  }

  setIsRegistered(isRegistered) {
    this.isRegistered = isRegistered;
  }

  setMemberInfo(memberInfo) {
    this.memberInfo = memberInfo;
  }

  saveToStorage() {
    setStorage('userInfo', this.toJSON());
  }

  loadFromStorage() {
    const userInfo = getStorage('userInfo');
    if (userInfo) {
      Object.assign(this, userInfo);
    }
    return this;
  }

  clearStorage() {
    setStorage('userInfo', null);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      avatar: this.avatar,
      isRegistered: this.isRegistered,
      memberInfo: this.memberInfo,
      createTime: this.createTime,
      updateTime: this.updateTime,
    };
  }

  static fromJSON(json) {
    return new UserInfo(json);
  }

  static fromStorage() {
    return new UserInfo().loadFromStorage();
  }
}

export default UserInfo;
