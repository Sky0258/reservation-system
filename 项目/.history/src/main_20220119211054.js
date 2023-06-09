import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import store from '@/store'

import { From } from 'element-ui';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
