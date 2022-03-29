import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import store from '@/store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'lib-flexible'
// import echarts from "echarts";
// Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
