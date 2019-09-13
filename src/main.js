import '@/assets/styles/main.css';
import 'intersection-observer'; // W3C Polyfill
import App from '@/App.vue';
import axios_setup from '@/plugins/axios';
import bubble from '@/plugins/bubble';
import config from '@/config';
import router from '@/router';
import store from '@/store';
import utils from '@/utils';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';

axios_setup();

Vue.config.productionTip = !config.DEVELOPMENT;
Vue.config.silent = !config.DEVELOPMENT;
//Vue.config.devtools = config.DEVELOPMENT;

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
  bubble,
  render: h => h(App)
}).$mount('#app');
