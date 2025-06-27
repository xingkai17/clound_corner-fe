import { setStorage, getStorage } from '../utils/cache';

class RespStatus {
  constructor(data = {}) {
    this.code = data.code || 0;
    this.message = data.message || '';
    this.data = data.data || null;
    this.staffId = data.staffId || getStorage('staffId') || '0';
    this.timestamp = Date.now();
  }

  setCode(code) {
    this.code = code;
  }

  setMessage(message) {
    this.message = message;
  }

  setData(data) {
    this.data = data;
  }

  setStaffId(staffId) {
    this.staffId = staffId;
    setStorage('staffId', staffId);
  }

  isSuccess() {
    return this.code === 1 || this.code === 200;
  }

  isError() {
    return this.code !== 1 && this.code !== 200;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      staffId: this.staffId,
      timestamp: this.timestamp,
    };
  }

  static fromJSON(json) {
    return new RespStatus(json);
  }

  static success(data = null, message = 'success') {
    return new RespStatus({
      code: 1,
      message,
      data,
    });
  }

  static error(message = 'error', code = 0) {
    return new RespStatus({
      code,
      message,
    });
  }
}

export default RespStatus;
