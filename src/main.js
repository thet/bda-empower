import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'intersection-observer'; // W3C Polyfill
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';
import '@/assets/styles/main.css'

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: 'md'
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
