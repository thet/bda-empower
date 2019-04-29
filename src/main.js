import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'intersection-observer'; // W3C Polyfill
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';
import '@/assets/styles/main.css'
import utils from '@/utils';

import axios_setup from '@/axios_setup';
axios_setup();

Vue.config.productionTip = false;

Vue.filter('format_date', function (value) {
  if (!value) {
    return '';
  }
  let date = new Date(value);
  let date_string = `${utils.zeropad(date.getDate())}.${utils.zeropad(date.getMonth() + 1)}.${date.getFullYear()}`;
  let time_string = `${utils.zeropad(date.getHours())}:${utils.zeropad(date.getMinutes())}`;
  return `${date_string}, ${time_string}`;
})

Vue.use(Vuetify, {
  iconfont: 'md'
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
