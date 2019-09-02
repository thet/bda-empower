import '@/assets/styles/main.css'
import 'intersection-observer'; // W3C Polyfill
import App from './App.vue';
import Vue from 'vue';
import router from './router';
import store from './store';
import utils from '@/utils';
import vuetify from '@/plugins/vuetify';


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


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
