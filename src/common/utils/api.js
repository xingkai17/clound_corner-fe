import RPC from './rpc';

class API {
  constructor() {
    this.fullURIApi = '';
    this.fullBuriedPointURIApi = '';
    this.fullGroupApi = '';
  }

  setFullURIApi(url) {
    this.fullURIApi = url;
  }

  setFullBuriedPointURIApi(url) {
    this.fullBuriedPointURIApi = url;
  }

  setFullGroupApi(url) {
    this.fullGroupApi = url;
  }

  // 用户相关 API
  async login(data) {
    return RPC.post('/api/login', data);
  }

  async getUserInfo() {
    return RPC.get('/api/user/info');
  }

  async updateUserInfo(data) {
    return RPC.put('/api/user/info', data);
  }

  // 油站相关 API
  async getStationList(params) {
    return RPC.get('/api/stations', params);
  }

  async getStationDetail(id) {
    return RPC.get(`/api/stations/${id}`);
  }

  // 订单相关 API
  async createOrder(data) {
    return RPC.post('/api/orders', data);
  }

  async getOrderList(params) {
    return RPC.get('/api/orders', params);
  }

  async getOrderDetail(id) {
    return RPC.get(`/api/orders/${id}`);
  }

  // 支付相关 API
  async createPayment(data) {
    return RPC.post('/api/payments', data);
  }

  async getPaymentStatus(id) {
    return RPC.get(`/api/payments/${id}/status`);
  }

  // 优惠券相关 API
  async getCouponList(params) {
    return RPC.get('/api/coupons', params);
  }

  async useCoupon(data) {
    return RPC.post('/api/coupons/use', data);
  }

  // 通用请求方法
  request(options) {
    return RPC.request(options);
  }

  get(url, params) {
    return RPC.get(url, params);
  }

  post(url, data) {
    return RPC.post(url, data);
  }

  put(url, data) {
    return RPC.put(url, data);
  }

  delete(url, data) {
    return RPC.delete(url, data);
  }
}

export default new API();
