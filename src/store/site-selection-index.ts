/*
 * @Description 洞察页面的业务交互暂存数据
 */
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);
export default new Store({
  state: {
    recommendLocation: { // // 洞察-位置推荐-获取推荐的查询表单（未认证时，点击需要暂存数据）
      formData: null, // 表单内容,仅当此参数存在时，回填才有意义
      formSelections: {}, // 已选项
      radius: null, // 地图圆形半径 单位m
      curLocation: {}, // 此参数同时也提供给 地址组件 用
      activeKey: null,
    },
  },
  mutations: {
    setRecommendLocation(state, data) {
      state.recommendLocation = data;
    },
  },
  actions: {
  },
});

